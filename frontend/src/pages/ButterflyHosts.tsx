import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { butterflyHostService, ButterflyHost } from "@/services/butterflyHost.service";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Search, ArrowUpRight, Download } from "lucide-react";
import { motion } from "framer-motion";
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
  const [visibleCount, setVisibleCount] = useState(10);
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
    console.log(`ניסיון למחוק אתר עם ID: ${id}`);
    
    if (window.confirm("האם אתה בטוח שברצונך למחוק אתר זה?")) {
      console.log("המשתמש אישר את המחיקה");
      
      setLoading(true);
      try {
        // בדיקה אם המשתמש מחובר
        if (!user) {
          console.error("ניסיון מחיקה ללא משתמש מחובר");
          toast.error("נדרשת התחברות למערכת כדי למחוק אתרים");
          setLoading(false);
          return;
        }
        
        console.log(`מנסה למחוק אתר: ${id}, המשתמש: ${user.name}`);
        
        // נשתמש בבלוק try/catch פנימי נוסף כדי להבדיל בין סוגי שגיאות
        let deleteSucceeded = false;
        try {
          const result = await butterflyHostService.delete(id);
          console.log("תוצאת המחיקה:", result);
          deleteSucceeded = true;
        } catch (deleteError) {
          console.error("כשל בקריאה לשירות המחיקה:", deleteError);
          
          // ניסיון גיבוי - ננסה לעדכן את הממשק גם אם השרת לא מגיב
          if (confirm("בעיה בתקשורת עם השרת. האם ברצונך להסיר את האתר מהרשימה בכל זאת?")) {
            deleteSucceeded = true;
            console.log("המשתמש אישר את הסרת האתר מקומית למרות הכשל בשרת");
          } else {
            throw deleteError; // זרוק את השגיאה המקורית אם המשתמש לא אישר את הסרת האתר מקומית
          }
        }
        
        if (deleteSucceeded) {
          toast.success("האתר הוסר בהצלחה");
          // עדכון המצב המקומי - הסרת האתר מהרשימה
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
        }
      } catch (error: any) {
        console.error("שגיאה במחיקת האתר:", error);
        const errorMessage = error.message || "אירעה שגיאה בעת ניסיון למחוק את האתר";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("המשתמש ביטל את המחיקה");
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

  // Get visible hosts (limited by visibleCount)
  const visibleHosts = filteredHosts.slice(0, visibleCount);
  
  // Check if there are more hosts to load
  const hasMoreHosts = visibleHosts.length < filteredHosts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // Reset visibleCount when search changes
    setVisibleCount(10);
  };

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(10);
  }, [selectedPosition]);

  // function to download hosts data as JSON
  const downloadHostsAsJson = () => {
    try {
      // Filter hosts based on current filters
      const dataToDownload = filteredHosts.map(host => ({
        title: host.title,
        url: host.url,
        position: host.position || "",
        imageUrl: host.imageUrl
      }));
      
      // Create a JSON blob
      const jsonString = JSON.stringify(dataToDownload, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Set filename with current date
      const date = new Date().toISOString().split('T')[0];
      link.download = `butterfly-hosts-${date}.json`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("הקובץ הורד בהצלחה");
    } catch (error) {
      console.error("Failed to download JSON:", error);
      toast.error("שגיאה בהורדת הקובץ");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
          <span className="text-gray-600 text-sm font-medium">טוען אתרים...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold mb-1 text-purple-800">אתרים מארחים</h1>
            <p className="text-gray-500 text-sm">סך הכל {hosts.length} אתרים במערכת</p>
          </div>
          
          <div className="flex gap-2 mt-3 md:mt-0">
            {user && (
              <Button 
                onClick={handleNew}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1.5 rounded transition-colors"
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> הוסף אתר
              </Button>
            )}
            
            <Button 
              onClick={downloadHostsAsJson}
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-3 py-1.5 rounded transition-colors"
            >
              <Download className="mr-1 h-3.5 w-3.5" /> הורד JSON
            </Button>
          </div>
        </div>
      </div>
      
      {/* Search & Filters Section */}
      <div className="bg-white p-3 rounded-lg shadow-sm mb-3 flex flex-col sm:flex-row gap-2 items-center">
        {/* Search input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Search className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="חיפוש לפי כותרת או כתובת..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full py-1.5 pr-7 pl-2 border border-gray-200 rounded text-sm focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-colors"
          />
        </div>
        
        <div className="flex flex-wrap gap-1">
          <Button
            variant={selectedPosition === null ? "default" : "outline"}
            onClick={() => setSelectedPosition(null)}
            size="sm"
            className={`text-xs py-0.5 px-2 h-7 ${
              selectedPosition === null 
                ? "bg-purple-600 hover:bg-purple-700 text-white" 
                : "border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
            } transition-colors`}
          >
            הכל
          </Button>
          {positions.map(position => (
            <Button
              key={position}
              variant={selectedPosition === position ? "default" : "outline"}
              onClick={() => setSelectedPosition(position)}
              size="sm"
              className={`text-xs py-0.5 px-2 h-7 ${
                selectedPosition === position 
                  ? "bg-purple-600 hover:bg-purple-700 text-white" 
                  : "border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
              } transition-colors`}
            >
              {position.replace(/_/g, " ")}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Compact Cards Grid */}
      {visibleHosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {visibleHosts.map((host) => (
            <div key={host._id} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-medium text-sm text-gray-800 truncate flex-1" title={host.title}>
                  {host.title}
                </h3>
                
                {host.position && (
                  <span className="ml-2 px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full whitespace-nowrap">
                    {host.position}
                  </span>
                )}
              </div>
              
              <div className="p-3 flex-grow">
                <div className="flex items-center text-xs mb-2">
                  <a 
                    href={host.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline truncate flex items-center"
                    title={host.url}
                  >
                    {host.url.length > 30 ? host.url.substring(0, 30) + '...' : host.url}
                    <ArrowUpRight className="h-3 w-3 ml-1 flex-shrink-0" />
                  </a>
                </div>
                
                <div className="h-16 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden mb-1">
                  {host.imageUrl ? (
                    <img 
                      src={host.imageUrl} 
                      alt={host.title} 
                      className="max-h-full max-w-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-image.png";
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">אין תמונה</span>
                  )}
                </div>
              </div>
              
              <div className="flex p-2 bg-gray-50 border-t border-gray-100 justify-end text-right">
                {user && (
                  <div className="flex space-x-1 rtl:space-x-reverse">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(host)}
                      className="h-6 w-6 p-0 text-gray-500 hover:text-purple-600 hover:bg-purple-50"
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(host._id)}
                      className="h-6 w-6 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div className="text-center">
            <Search className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              {searchText ? (
                <>לא נמצאו תוצאות עבור "{searchText}"</>
              ) : (
                <>לא נמצאו אתרים</>
              )}
            </p>
          </div>
        </div>
      )}
      
      {/* "Load More" button */}
      {hasMoreHosts && (
        <div className="flex justify-center mt-4">
          <Button 
            onClick={handleLoadMore}
            variant="outline"
            className="text-xs border-gray-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-colors"
          >
            טען עוד {filteredHosts.length - visibleHosts.length} אתרים
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-2xl border-0 shadow-xl bg-white">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-bold text-purple-700">עריכת אתר</DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              עדכן את פרטי האתר המארח
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit}>
            <div className="grid gap-5 py-5">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right font-medium text-gray-700">
                  כותרת
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="col-span-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="url" className="text-right font-medium text-gray-700">
                  כתובת URL
                </label>
                <input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="col-span-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="position" className="text-right font-medium text-gray-700">
                  מיקום
                </label>
                <input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="col-span-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
                  placeholder="למשל: top_right, bottom_center"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="imageUrl" className="text-right font-medium text-gray-700">
                  כתובת תמונה
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="col-span-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="imageFile" className="text-right font-medium text-gray-700">
                  העלאת תמונה חדשה
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="col-span-3 text-sm file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-purple-50 file:to-teal-50 file:text-purple-700 hover:file:from-purple-100 hover:file:to-teal-100 transition-all duration-200 bg-gray-50 border border-gray-200 rounded-xl"
                  disabled={uploadingImage}
                />
              </div>
              {formData.imageUrl && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 border border-gray-200 rounded-xl p-5 bg-gray-50"
                >
                  <p className="text-sm font-medium mb-3 text-gray-700">תצוגה מקדימה:</p>
                  <div className="bg-white p-3 rounded-xl border border-gray-100">
                    <motion.img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="max-h-[200px] max-w-full object-contain mx-auto rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-image.png";
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
            <DialogFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  type="submit" 
                  disabled={uploadingImage}
                  className="transition-all duration-300 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white rounded-xl px-8 py-6 text-base"
                >
                  {uploadingImage ? "מעלה תמונה..." : "שמור שינויים"}
                </Button>
              </motion.div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* New Host Dialog */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-2xl border-0 shadow-xl bg-white">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-bold text-purple-700">הוספת אתר חדש</DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              הזן את פרטי האתר המארח החדש
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitNew}>
            <div className="grid gap-5 py-5">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right font-medium text-gray-700">
                  כותרת
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="col-span-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="url" className="text-right font-medium text-gray-700">
                  כתובת URL
                </label>
                <input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="col-span-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="position" className="text-right font-medium text-gray-700">
                  מיקום
                </label>
                <input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="col-span-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
                  placeholder="למשל: top_right, bottom_center"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="imageUrl" className="text-right font-medium text-gray-700">
                  כתובת תמונה
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="col-span-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="newImageFile" className="text-right font-medium text-gray-700">
                  העלאת תמונה
                </label>
                <input
                  id="newImageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="col-span-3 text-sm file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-purple-50 file:to-teal-50 file:text-purple-700 hover:file:from-purple-100 hover:file:to-teal-100 transition-all duration-200 bg-gray-50 border border-gray-200 rounded-xl"
                  disabled={uploadingImage}
                />
              </div>
              {formData.imageUrl && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 border border-gray-200 rounded-xl p-5 bg-gray-50"
                >
                  <p className="text-sm font-medium mb-3 text-gray-700">תצוגה מקדימה:</p>
                  <div className="bg-white p-3 rounded-xl border border-gray-100">
                    <motion.img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="max-h-[200px] max-w-full object-contain mx-auto rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-image.png";
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
            <DialogFooter>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  type="submit" 
                  disabled={uploadingImage}
                  className="transition-all duration-300 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white rounded-xl px-8 py-6 text-base"
                >
                  {uploadingImage ? "מעלה תמונה..." : "הוסף אתר"}
                </Button>
              </motion.div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButterflyHosts; 