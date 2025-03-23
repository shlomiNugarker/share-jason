import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { itemService } from "@/services/item.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Item {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: "active" | "inactive" | "archived";
}

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemService.getAll();
      setItems(response.items);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await itemService.delete(id);
        toast.success("Item deleted successfully");
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Failed to delete item:", error);
        toast.error("Failed to delete item");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Items</h1>
        <Link to="/items/new">
          <Button>Add New Item</Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No items found. Create your first item!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <div className="flex items-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                      item.status === "active"
                        ? "bg-green-100 text-green-800"
                        : item.status === "inactive"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-end space-x-2">
                  <Link to={`/items/${item._id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <Link to={`/items/edit/${item._id}`}>
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

export default Items; 