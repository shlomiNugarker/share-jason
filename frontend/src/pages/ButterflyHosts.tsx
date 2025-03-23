import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { butterflyHostService, ButterflyHost } from "@/services/butterflyHost.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, ExternalLink, Filter, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ButterflyHosts = () => {
  const [hosts, setHosts] = useState<ButterflyHost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [positions, setPositions] = useState<string[]>([]);
  const [editingHost, setEditingHost] = useState<ButterflyHost | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    imageUrl: "",
    position: ""
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchHosts();
  }, []);

  const fetchHosts = async () => {
    try {
      setLoading(true);
      const response = await butterflyHostService.getAll();
      setHosts(response.hosts);
      
      // Extract unique positions
      const positionsList = new Set<string>();
      response.hosts.forEach(host => {
        if (host.position) {
          positionsList.add(host.position);
        }
      });
      
      setPositions(Array.from(positionsList));
    } catch (error) {
      console.error("Failed to fetch butterfly hosts:", error);
      toast.error("נכשל בטעינת הנתונים");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (host: ButterflyHost) => {
    setEditingHost(host);
    setFormData({
      url: host.url,
      title: host.title,
      imageUrl: host.imageUrl,
      position: host.position || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleNew = () => {
    setFormData({
      url: "",
      title: "",
      imageUrl: "",
      position: ""
    });
    setIsNewDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק אתר זה?")) {
      try {
        await butterflyHostService.delete(id);
        toast.success("האתר נמחק בהצלחה");
        setHosts(prevHosts => prevHosts.filter(host => host._id !== id));
        
        // Update positions list if needed
        if (hosts.length <= 1) {
          setPositions([]);
          setSelectedPosition(null);
        } else {
          const remainingHosts = hosts.filter(host => host._id !== id);
          const positionsList = new Set<string>();
          remainingHosts.forEach(host => {
            if (host.position) {
              positionsList.add(host.position);
            }
          });
          setPositions(Array.from(positionsList));
          
          // Reset selectedPosition if it no longer exists
          if (selectedPosition && !positionsList.has(selectedPosition)) {
            setSelectedPosition(null);
          }
        }
      } catch (error) {
        console.error("Failed to delete butterfly host:", error);
        toast.error("נכשל במחיקת האתר");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    try {
      setUploadingImage(true);
      const result = await butterflyHostService.uploadImage(file);
      setFormData(prev => ({
        ...prev,
        imageUrl: result.imageUrl
      }));
      toast.success("התמונה הועלתה בהצלחה");
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error(error instanceof Error ? error.message : "שגיאה בהעלאת התמונה");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHost) return;
    
    try {
      const response = await butterflyHostService.update(editingHost._id, formData);
      setHosts(prevHosts => 
        prevHosts.map(host => 
          host._id === editingHost._id ? response.host : host
        )
      );
      
      toast.success("האתר עודכן בהצלחה");
      setIsEditDialogOpen(false);
      
      // Update positions if needed
      if (formData.position !== editingHost.position) {
        const positionsList = new Set<string>();
        hosts.forEach(host => {
          if (host._id === editingHost._id) {
            if (formData.position) positionsList.add(formData.position);
          } else if (host.position) {
            positionsList.add(host.position);
          }
        });
        setPositions(Array.from(positionsList));
      }
    } catch (error) {
      console.error("Failed to update butterfly host:", error);
      toast.error("נכשל בעדכון האתר");
    }
  };

  const handleSubmitNew = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await butterflyHostService.create(formData);
      setHosts(prevHosts => [response.host, ...prevHosts]);
      
      toast.success("האתר נוצר בהצלחה");
      setIsNewDialogOpen(false);
      
      // Update positions if needed
      if (formData.position) {
        if (!positions.includes(formData.position)) {
          setPositions(prevPositions => [...prevPositions, formData.position]);
        }
      }
    } catch (error) {
      console.error("Failed to create butterfly host:", error);
      toast.error("נכשל ביצירת האתר");
    }
  };

  // Filter hosts by position and search text
  const filteredHosts = hosts
    .filter(host => !selectedPosition || host.position === selectedPosition)
    .filter(host => {
      if (!searchText) return true;
      
      const search = searchText.toLowerCase();
      return (
        host.title.toLowerCase().includes(search) || 
        host.url.toLowerCase().includes(search) ||
        (host.position && host.position.toLowerCase().includes(search))
      );
    });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (loading) {
    return <div className="flex justify-center p-8">טוען...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">אתרים מארחים ({hosts.length})</h1>
        
        {user && (
          <Button onClick={handleNew}>
            <Plus className="mr-2 h-4 w-4" /> הוסף אתר חדש
          </Button>
        )}
      </div>
      
      {/* Search input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="חיפוש לפי כותרת, כתובת URL או מיקום..."
          value={searchText}
          onChange={handleSearchChange}
          className="w-full py-2 pr-10 pl-4 border border-gray-300 rounded-md"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedPosition === null ? "default" : "outline"}
          onClick={() => setSelectedPosition(null)}
          className="mb-2"
        >
          <Filter className="mr-2 h-4 w-4" /> כל האתרים
        </Button>
        {positions.map(position => (
          <Button
            key={position}
            variant={selectedPosition === position ? "default" : "outline"}
            onClick={() => setSelectedPosition(position)}
            className="mb-2"
          >
            {position.replace(/_/g, " ")}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHosts.map((host) => (
          <Card key={host._id} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg truncate">{host.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="aspect-video flex justify-center items-center bg-gray-100 rounded-md overflow-hidden">
                {host.imageUrl ? (
                  <img
                    src={host.imageUrl}
                    alt={host.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-image.png";
                    }}
                  />
                ) : (
                  <div className="text-gray-400">אין תמונה</div>
                )}
              </div>
              
              <div className="text-sm">
                <p className="truncate">
                  <span className="font-medium">כתובת: </span>
                  <a 
                    href={host.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {host.url}
                  </a>
                </p>
                {host.position && (
                  <p>
                    <span className="font-medium">מיקום: </span>
                    {host.position}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-2 justify-between">
                <Button 
                  className="flex-1"
                  variant="outline"
                  onClick={() => window.open(host.url, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" /> פתח אתר
                </Button>
                
                {user && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEdit(host)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleDelete(host._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredHosts.length === 0 && (
        <div className="text-center p-8 bg-gray-100 rounded-md">
          {searchText ? (
            <p>לא נמצאו אתרים התואמים את החיפוש "{searchText}"</p>
          ) : (
            <p>אין אתרים להצגה בקטגוריה זו</p>
          )}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>עריכת אתר</DialogTitle>
            <DialogDescription>
              עדכן את פרטי האתר המהיר
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right font-medium">
                  כותרת
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="url" className="text-right font-medium">
                  כתובת URL
                </label>
                <input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="position" className="text-right font-medium">
                  מיקום
                </label>
                <input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="למשל: top_right, bottom_center"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="imageUrl" className="text-right font-medium">
                  כתובת תמונה
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="imageFile" className="text-right font-medium">
                  העלאת תמונה חדשה
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="col-span-3"
                  disabled={uploadingImage}
                />
              </div>
              {formData.imageUrl && (
                <div className="mt-2 border rounded-md p-2">
                  <p className="text-sm font-medium mb-2">תצוגה מקדימה:</p>
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="max-h-[200px] max-w-full object-contain mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-image.png";
                    }}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={uploadingImage}>
                {uploadingImage ? "מעלה תמונה..." : "שמור שינויים"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* New Host Dialog */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>הוספת אתר חדש</DialogTitle>
            <DialogDescription>
              הזן את פרטי האתר המהיר החדש
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitNew}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right font-medium">
                  כותרת
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="url" className="text-right font-medium">
                  כתובת URL
                </label>
                <input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="position" className="text-right font-medium">
                  מיקום
                </label>
                <input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="למשל: top_right, bottom_center"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="imageUrl" className="text-right font-medium">
                  כתובת תמונה
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="newImageFile" className="text-right font-medium">
                  העלאת תמונה
                </label>
                <input
                  id="newImageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="col-span-3"
                  disabled={uploadingImage}
                />
              </div>
              {formData.imageUrl && (
                <div className="mt-2 border rounded-md p-2">
                  <p className="text-sm font-medium mb-2">תצוגה מקדימה:</p>
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="max-h-[200px] max-w-full object-contain mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-image.png";
                    }}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={uploadingImage}>
                {uploadingImage ? "מעלה תמונה..." : "הוסף אתר"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButterflyHosts; 