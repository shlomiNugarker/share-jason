import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { itemService } from "@/services/item.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

interface Item {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: "active" | "inactive" | "archived";
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await itemService.getById(id);
        setItem(response.item);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        toast.error("Failed to load item data");
        navigate("/items");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleEdit = () => {
    navigate(`/items/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this item?")) return;
    
    try {
      await itemService.delete(id);
      toast.success("Item deleted successfully");
      navigate("/items");
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!item) {
    return <div className="flex justify-center p-8">Item not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{item.name}</CardTitle>
          <div className="text-sm text-gray-500">
            Status: <span className={`px-2 py-1 rounded text-xs ${
              item.status === 'active' ? 'bg-green-100 text-green-800' : 
              item.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {item.status}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {item.imageUrl && (
            <div className="w-full mb-4">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="max-h-[300px] w-auto mx-auto rounded-md object-contain" 
              />
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="whitespace-pre-line">{item.description}</p>
          </div>
          
          <div className="text-sm text-gray-500 space-y-1 border-t pt-4 mt-4">
            <p>Created by: {item.createdBy}</p>
            <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            <p>Last updated: {new Date(item.updatedAt).toLocaleString()}</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate("/items")}
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

export default ItemDetails; 