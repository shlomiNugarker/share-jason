import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dynamicSchemaService, Field } from "@/services/dynamicSchema.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface SchemaFormData {
  name: string;
  description: string;
  fields: Field[];
}

const SchemaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

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
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Schema" : "Create New Schema"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Schema Name *
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g. Product, Customer, Project"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full min-h-[100px] p-2 border rounded-md"
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
                <div key={index} className="p-4 border rounded-md mb-4 bg-gray-50">
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
                      <label htmlFor={`field-name-${index}`} className="block text-sm font-medium mb-1">
                        Field Name *
                      </label>
                      <Input
                        id={`field-name-${index}`}
                        value={field.name}
                        onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                        required
                        disabled={loading}
                        placeholder="e.g. title, price, date"
                      />
                    </div>
                    <div>
                      <label htmlFor={`field-type-${index}`} className="block text-sm font-medium mb-1">
                        Field Type *
                      </label>
                      <select
                        id={`field-type-${index}`}
                        value={field.type}
                        onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                        disabled={loading}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="date">Date</option>
                        <option value="image">Image</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                        disabled={loading}
                      />
                      <span className="text-sm">Required field</span>
                    </label>
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