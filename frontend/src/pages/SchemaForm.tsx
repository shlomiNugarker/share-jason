import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dynamicSchemaService, Field } from "@/services/dynamicSchema.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import { Label } from "@/components/ui/label";

interface SchemaFormData {
  name: string;
  description: string;
  fields: Field[];
}

const SchemaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [formData, setFormData] = useState<SchemaFormData>({
    name: "",
    description: "",
    fields: [{ name: "", type: "string", required: false }],
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchSchema = async () => {
        try {
          setFetchLoading(true);
          const response = await dynamicSchemaService.getById(id);
          const { name, description, fields } = response.schema;
          setFormData({ name, description, fields });
        } catch (error) {
          console.error("Failed to fetch schema:", error);
          toast.error("Failed to load schema data");
          navigate("/schemas");
        } finally {
          setFetchLoading(false);
        }
      };

      fetchSchema();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const newFields = [...prev.fields];
      newFields[index] = { ...newFields[index], [field]: value };
      return { ...prev, fields: newFields };
    });
  };

  const addField = () => {
    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, { name: "", type: "string", required: false }],
    }));
  };

  const removeField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    const emptyFields = formData.fields.filter(field => !field.name.trim());
    if (emptyFields.length > 0) {
      toast.error("All field names must be filled");
      return;
    }
    
    // Check for duplicate field names
    const fieldNames = formData.fields.map(field => field.name.trim());
    const hasDuplicates = fieldNames.some((name, index) => 
      fieldNames.indexOf(name) !== index
    );
    
    if (hasDuplicates) {
      toast.error("Field names must be unique");
      return;
    }
    
    setLoading(true);

    try {
      if (isEditMode && id) {
        await dynamicSchemaService.update(id, formData);
        toast.success("Schema updated successfully");
      } else {
        await dynamicSchemaService.create(formData);
        toast.success("Schema created successfully");
      }

      navigate("/schemas");
    } catch (error) {
      console.error("Failed to save schema:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} schema`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="border-border bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Schema" : "Create New Schema"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="mb-1">
                Schema Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g. Product, Customer, Project"
                className="bg-background border-input"
              />
            </div>

            <div>
              <Label htmlFor="description" className="mb-1">
                Description *
              </Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full min-h-[100px] p-2 border rounded-md bg-background border-input text-foreground"
                placeholder="Describe what this schema will be used for"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Fields</h3>
                <Button 
                  type="button" 
                  onClick={addField} 
                  variant="outline" 
                  size="sm"
                  disabled={loading}
                >
                  Add Field
                </Button>
              </div>
              
              {formData.fields.map((field, index) => (
                <div 
                  key={index} 
                  className={`p-4 border border-border rounded-md mb-4 ${
                    isDark ? 'bg-muted/30' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Field #{index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removeField(index)}
                      variant="destructive"
                      size="sm"
                      disabled={loading || formData.fields.length <= 1}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`field-name-${index}`} className="mb-1">
                        Field Name *
                      </Label>
                      <Input
                        id={`field-name-${index}`}
                        value={field.name}
                        onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                        required
                        disabled={loading}
                        placeholder="e.g. title, price, date"
                        className="bg-background border-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`field-type-${index}`} className="mb-1">
                        Field Type *
                      </Label>
                      <select
                        id={`field-type-${index}`}
                        value={field.type}
                        onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                        disabled={loading}
                        className={`w-full p-2 border border-input rounded-md ${
                          isDark ? 'bg-background text-foreground' : 'bg-white text-gray-900'
                        }`}
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="date">Date</option>
                        <option value="image">Image</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="relative flex items-center">
                      <input
                        id={`required-field-${index}`}
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                        disabled={loading}
                        className={`h-4 w-4 rounded border-input ${
                          isDark ? 'accent-primary' : 'accent-primary'
                        }`}
                      />
                    </div>
                    <Label 
                      htmlFor={`required-field-${index}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      Required field
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/schemas")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : isEditMode ? "Update Schema" : "Create Schema"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemaForm; 