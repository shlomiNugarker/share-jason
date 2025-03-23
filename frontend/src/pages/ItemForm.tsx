import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { itemService } from "@/services/item.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ItemFormData {
  name: string;
  description: string;
  imageUrl: string;
  status: "active" | "inactive" | "archived";
}

const ItemForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<ItemFormData>({
    name: "",
    description: "",
    imageUrl: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (isEditMode && id) {
      const fetchItem = async () => {
        try {
          setFetchLoading(true);
          const response = await itemService.getById(id);
          const { name, description, imageUrl, status } = response.item;
          setFormData({ name, description, imageUrl, status });
          setImagePreview(imageUrl);
        } catch (error) {
          console.error("Failed to fetch item:", error);
          toast.error("Failed to load item data");
          navigate("/items");
        } finally {
          setFetchLoading(false);
        }
      };

      fetchItem();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // בדיקת גודל הקובץ - מקסימום 10MB
      const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSizeInBytes) {
        toast.error(`הקובץ גדול מדי. הגודל המקסימלי המותר הוא 10MB`);
        e.target.value = ''; // ניקוי שדה הקלט
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload image if a new one is selected
      if (imageFile) {
        console.log("Uploading image file:", imageFile.name, imageFile.size);
        try {
          const uploadResponse = await itemService.uploadImage(imageFile);
          console.log("Upload response:", uploadResponse);
          
          if (uploadResponse && uploadResponse.imageUrl) {
            imageUrl = uploadResponse.imageUrl;
            console.log("Image uploaded successfully, URL:", imageUrl);
          } else {
            throw new Error("Invalid upload response format");
          }
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          toast.error(`Failed to upload image: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
          return; // Stop form submission if image upload fails
        }
      }

      const dataToSubmit = {
        ...formData,
        imageUrl,
      };
      
      console.log("Submitting data:", dataToSubmit);

      if (isEditMode && id) {
        await itemService.update(id, dataToSubmit);
        toast.success("Item updated successfully");
      } else {
        await itemService.create(dataToSubmit);
        toast.success("Item created successfully");
      }

      navigate("/items");
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

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Item" : "Create New Item"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name *
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
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
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
                className="w-full p-2 border rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image {!isEditMode && "*"}
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                className="mb-2"
              />
              {imagePreview && (
                <div className="mt-2 relative w-full h-40 border rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/items")}
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

export default ItemForm; 