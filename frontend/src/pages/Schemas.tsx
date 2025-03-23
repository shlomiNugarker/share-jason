import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { dynamicSchemaService, DynamicSchema } from "@/services/dynamicSchema.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Schemas = () => {
  const [schemas, setSchemas] = useState<DynamicSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const fetchSchemas = async () => {
    try {
      setLoading(true);
      const response = await dynamicSchemaService.getAll();
      setSchemas(response.schemas);
    } catch (error) {
      console.error("Failed to fetch schemas:", error);
      toast.error("Failed to load schemas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemas();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this schema?")) {
      try {
        await dynamicSchemaService.delete(id);
        toast.success("Schema deleted successfully");
        setSchemas((prevSchemas) => prevSchemas.filter((schema) => schema._id !== id));
      } catch (error) {
        console.error("Failed to delete schema:", error);
        toast.error("Failed to delete schema. It may be in use by items.");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dynamic Schemas</h1>
        {isAdmin && (
          <Link to="/schemas/new">
            <Button>Create New Schema</Button>
          </Link>
        )}
      </div>

      {schemas.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No schemas found.</p>
          {isAdmin && (
            <p className="mt-2">
              <Link to="/schemas/new" className="text-blue-500 hover:underline">
                Create your first schema
              </Link>{" "}
              to define custom data structures.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemas.map((schema) => (
            <Card key={schema._id}>
              <CardHeader>
                <CardTitle>{schema.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{schema.description}</p>
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Fields ({schema.fields.length}):</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {schema.fields.slice(0, 3).map((field, index) => (
                      <li key={index}>
                        <span className="font-medium">{field.name}</span>
                        <span className="text-gray-500 text-sm ml-1">
                          ({field.type}
                          {field.required ? ", required" : ""})
                        </span>
                      </li>
                    ))}
                    {schema.fields.length > 3 && (
                      <li className="text-gray-500">
                        ...and {schema.fields.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
                <div className="flex justify-end space-x-2">
                  <Link to={`/dynamic-items/schema/${schema._id}`}>
                    <Button variant="outline" size="sm">
                      View Items
                    </Button>
                  </Link>
                  {isAdmin && (
                    <>
                      <Link to={`/schemas/edit/${schema._id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(schema._id)}
                      >
                        Delete
                      </Button>
                    </>
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

export default Schemas;