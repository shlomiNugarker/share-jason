import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { dynamicItemService, DynamicItem } from "@/services/dynamicItem.service";
import { DynamicSchema } from "@/services/dynamicSchema.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Copy, Check } from "lucide-react";

const DynamicItems = () => {
  const { schemaId } = useParams<{ schemaId: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<DynamicItem[]>([]);
  const [schema, setSchema] = useState<DynamicSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (!schemaId) {
      navigate("/schemas");
      return;
    }

    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await dynamicItemService.getAllBySchema(schemaId);
        setItems(response.items);
        setSchema(response.schema);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        toast.error("Failed to load items");
        navigate("/schemas");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [schemaId, navigate]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await dynamicItemService.delete(id);
        toast.success("Item deleted successfully");
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Failed to delete item:", error);
        toast.error("Failed to delete item");
      }
    }
  };

  const handleDownloadJson = () => {
    try {
      // Create a JSON string from the items
      const jsonData = JSON.stringify(items, null, 2);
      
      // Create a blob with the JSON data
      const blob = new Blob([jsonData], { type: "application/json" });
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary download link
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${schema?.name || "items"}-${new Date().toISOString().split("T")[0]}.json`;
      
      // Append to the document, click it, and remove it
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Release the object URL
      URL.revokeObjectURL(url);
      
      toast.success("JSON file downloaded successfully");
    } catch (error) {
      console.error("Failed to download JSON:", error);
      toast.error("Failed to download JSON");
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedStates(prev => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [key]: false }));
        }, 2000);
        toast.success("Copied to clipboard");
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast.error("Failed to copy to clipboard");
      });
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!schema) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Schema not found</p>
          <Link to="/schemas" className="text-blue-500 hover:underline">
            Back to schemas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/schemas" className="text-blue-500 hover:underline mb-1 block">
            ← Back to schemas
          </Link>
          <h1 className="text-2xl font-bold">{schema.name} Items</h1>
          <p className="text-gray-600">{schema.description}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleDownloadJson}
            disabled={items.length === 0}
            className="flex items-center gap-1"
          >
            <Download size={16} />
            Download JSON
          </Button>
          <Link to={`/dynamic-items/new/${schemaId}`}>
            <Button>Add New Item</Button>
          </Link>
        </div>
      </div>

      <div className="mb-6 p-2 bg-gray-50 rounded border text-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-700">API Endpoint for all {schema.name} items:</h3>
        </div>
        <div className="flex items-center justify-between">
          <code className="block overflow-x-auto text-xs p-2 bg-gray-100 rounded flex-grow">
            GET /api/dynamic-items/schema/{schemaId}
          </code>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => copyToClipboard(`GET /api/dynamic-items/schema/${schemaId}`, `schema-all-${schemaId}`)}
            className="ml-2"
          >
            {copiedStates[`schema-all-${schemaId}`] ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No items found for this schema.</p>
          <p className="mt-2">
            <Link to={`/dynamic-items/new/${schemaId}`} className="text-blue-500 hover:underline">
              Create your first item
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item._id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Data:</h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {schema.fields.map((field) => (
                      <div key={field.name} className="col-span-2 sm:grid sm:grid-cols-3">
                        <dt className="font-medium text-gray-700">{field.name}:</dt>
                        <dd className="text-gray-900 sm:col-span-2">
                          {renderFieldValue(item.data[field.name], field.type)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="mb-4 p-2 bg-gray-50 rounded border text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-700">API Endpoint:</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="block overflow-x-auto text-xs p-2 bg-gray-100 rounded flex-grow">
                      GET /api/dynamic-items/{item._id}
                    </code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(`GET /api/dynamic-items/${item._id}`, `item-${item._id}`)}
                      className="ml-2"
                    >
                      {copiedStates[`item-${item._id}`] ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Link to={`/dynamic-items/edit/${item._id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  {user?.role === "admin" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to render field values based on type
function renderFieldValue(value: any, type: string) {
  if (value === undefined || value === null) {
    return <span className="text-gray-400">Not set</span>;
  }

  switch (type) {
    case "boolean":
      return value ? "Yes" : "No";
    case "date":
      return new Date(value).toLocaleDateString();
    case "image":
      return value ? (
        <img 
          src={value} 
          alt="Field image" 
          className="max-h-20 max-w-full object-contain rounded-md" 
        />
      ) : (
        <span className="text-gray-400">No image</span>
      );
    default:
      return String(value);
  }
}

export default DynamicItems; 