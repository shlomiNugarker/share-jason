import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dynamicItemService } from "@/services/dynamicItem.service";
import { dynamicSchemaService, DynamicSchema, Field } from "@/services/dynamicSchema.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const DynamicItemForm = () => {
  const navigate = useNavigate();
  const { id, schemaId } = useParams<{ id?: string; schemaId?: string }>();
  const isEditMode = Boolean(id);

  const [schema, setSchema] = useState<DynamicSchema | null>(null);
  const [name, setName] = useState("");
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);

        if (isEditMode && id) {
          // Edit mode - fetch item and its schema
          const response = await dynamicItemService.getById(id);
          setName(response.item.name);
          setData(response.item.data);
          setSchema(response.schema);
        } else if (schemaId) {
          // Create mode - fetch schema only
          const response = await dynamicSchemaService.getById(schemaId);
          setSchema(response.schema);
          
          // Initialize data object with empty values based on schema fields
          const initialData: Record<string, any> = {};
          response.schema.fields.forEach((field: Field) => {
            initialData[field.name] = getDefaultValueForType(field.type);
          });
          setData(initialData);
        } else {
          // No schema ID provided, redirect to schemas page
          toast.error("Schema ID is required");
          navigate("/schemas");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load necessary data");
        navigate(isEditMode ? "/schemas" : `/dynamic-items/schema/${schemaId}`);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, [id, schemaId, isEditMode, navigate]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDataChange = (fieldName: string, value: any, type: string) => {
    // Convert value based on type
    let processedValue = value;
    if (type === "number" && value !== "") {
      processedValue = Number(value);
    } else if (type === "boolean") {
      processedValue = value === "true";
    }

    setData((prev) => ({
      ...prev,
      [fieldName]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schema) return;

    setLoading(true);

    try {
      const itemData = {
        name,
        data,
        ...(isEditMode ? {} : { schemaId: schema._id }),
      };

      if (isEditMode && id) {
        await dynamicItemService.update(id, itemData);
        toast.success("Item updated successfully");
      } else {
        await dynamicItemService.create(itemData as any);
        toast.success("Item created successfully");
      }

      navigate(`/dynamic-items/schema/${schema._id}`);
    } catch (error) {
      console.error("Failed to save item:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} item`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!schema) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Schema not found</p>
          <Button onClick={() => navigate("/schemas")} variant="link">
            Back to schemas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Edit Item" : `New ${schema.name} Item`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Item Name *
              </label>
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                required
                disabled={loading}
                placeholder={`Name for this ${schema.name}`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Fields</h3>
              {schema.fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`field-${field.name}`}
                    className="block text-sm font-medium mb-1"
                  >
                    {field.name} {field.required && "*"}
                    <span className="text-xs text-gray-500 ml-1">
                      ({field.type})
                    </span>
                  </label>
                  {renderFieldInput(
                    field,
                    data[field.name],
                    (value) => handleDataChange(field.name, value, field.type),
                    loading
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/dynamic-items/schema/${schema._id}`)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : isEditMode ? "Update Item" : "Create Item"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to render the appropriate input based on field type
function renderFieldInput(
  field: Field,
  value: any,
  onChange: (value: any) => void,
  disabled: boolean
) {
  switch (field.type) {
    case "string":
      return (
        <Input
          id={`field-${field.name}`}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          disabled={disabled}
        />
      );
    case "number":
      return (
        <Input
          id={`field-${field.name}`}
          type="number"
          value={value === undefined || value === null ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          disabled={disabled}
        />
      );
    case "boolean":
      return (
        <select
          id={`field-${field.name}`}
          value={value === true ? "true" : "false"}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          disabled={disabled}
          className="w-full p-2 border rounded-md"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );
    case "date":
      return (
        <Input
          id={`field-${field.name}`}
          type="date"
          value={value ? formatDateForInput(value) : ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          disabled={disabled}
        />
      );
    default:
      return (
        <Input
          id={`field-${field.name}`}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          disabled={disabled}
        />
      );
  }
}

// Helper function to format date for date input
function formatDateForInput(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
}

// Helper function to get default value based on type
function getDefaultValueForType(type: string): any {
  switch (type) {
    case "string":
      return "";
    case "number":
      return null;
    case "boolean":
      return false;
    case "date":
      return null;
    default:
      return null;
  }
}

export default DynamicItemForm; 