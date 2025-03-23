import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { dynamicItemService, DynamicItem } from "@/services/dynamicItem.service";
import { DynamicSchema, Field } from "@/services/dynamicSchema.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

const DynamicItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<DynamicItem | null>(null);
  const [schema, setSchema] = useState<DynamicSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await dynamicItemService.getById(id);
        setItem(response.item);
        setSchema(response.schema);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        toast.error("Failed to load item data");
        navigate("/schemas");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleEdit = () => {
    if (item) {
      navigate(`/dynamic-items/edit/${item._id}`);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this item?")) return;
    
    try {
      await dynamicItemService.delete(id);
      toast.success("Item deleted successfully");
      if (schema) {
        navigate(`/dynamic-items/schema/${schema._id}`);
      } else {
        navigate("/schemas");
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!item || !schema) {
    return <div className="flex justify-center p-8">Item not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{item.name}</CardTitle>
          <div className="text-sm text-gray-500">
            Schema: {schema.name}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {schema.fields.map((field) => (
            <div key={field.name} className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">{field.name}</h3>
              {renderFieldValue(item.data[field.name], field)}
            </div>
          ))}
          
          <div className="text-sm text-gray-500 space-y-1 border-t pt-4 mt-4">
            <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            <p>Last updated: {new Date(item.updatedAt).toLocaleString()}</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/dynamic-items/schema/${schema._id}`)}
          >
            Back to List
          </Button>
          <Button 
            variant="default" 
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Helper function to render field values based on type
function renderFieldValue(value: any, field: Field) {
  if (value === undefined || value === null) {
    return <div className="text-gray-400">Not set</div>;
  }

  switch (field.type) {
    case "boolean":
      return <div>{value ? "Yes" : "No"}</div>;
      
    case "date":
      return <div>{new Date(value).toLocaleDateString()}</div>;
      
    case "image":
      return value ? (
        <div className="w-full">
          <img 
            src={value} 
            alt={field.name} 
            className="max-h-[300px] w-auto rounded-md object-contain border p-2" 
          />
          <div className="mt-2 text-sm text-gray-500">
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View full image
            </a>
          </div>
        </div>
      ) : (
        <div className="text-gray-400">No image</div>
      );
      
    default:
      return <div className="whitespace-pre-line">{String(value)}</div>;
  }
}

export default DynamicItemDetail; 