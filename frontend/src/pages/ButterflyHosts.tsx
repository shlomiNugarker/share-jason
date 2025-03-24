import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { butterflyHostService, ButterflyHost } from "@/services/butterflyHost.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Filter, Search, ArrowUpRight, ChevronDown, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MotionCard = motion(Card);

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
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="relative w-24 h-24">
          <motion.div 
            className="absolute w-24 h-24 border-4 border-purple-300 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute w-24 h-24 border-4 border-teal-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
          <motion.div 
            className="absolute w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        <motion.p 
          className="mt-6 text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          טוען אתרים...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl bg-gray-50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-teal-500 text-white p-8 rounded-2xl shadow-lg mb-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <motion.h1 
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              אתרים מארחים
            </motion.h1>
            <motion.p 
              className="text-teal-100 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              סך הכל {hosts.length} אתרים במערכת
            </motion.p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button 
                  onClick={handleNew}
                  className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 text-base px-6 py-6 rounded-xl shadow-md w-full sm:w-auto"
                >
                  <Plus className="mr-2 h-5 w-5" /> הוסף אתר חדש
                </Button>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button 
                onClick={downloadHostsAsJson}
                className="bg-teal-400 text-white hover:bg-teal-300 transition-all duration-300 text-base px-6 py-6 rounded-xl shadow-md w-full sm:w-auto"
              >
                <Download className="mr-2 h-5 w-5" /> הורד כקובץ JSON
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Search & Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-md mb-8 border border-gray-100"
      >
        {/* Search input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 right-0 flex items-center pr-5">
            <Search className="h-5 w-5 text-purple-400" />
          </div>
          <motion.input
            whileFocus={{ boxShadow: "0 0 0 2px rgba(147, 51, 234, 0.3)" }}
            type="text"
            placeholder="חיפוש לפי כותרת, כתובת URL או מיקום..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full py-4 pr-12 pl-5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-gray-50"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant={selectedPosition === null ? "default" : "outline"}
              onClick={() => setSelectedPosition(null)}
              className={`mb-2 transition-all duration-200 rounded-xl px-5 py-2 ${
                selectedPosition === null 
                  ? "bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-md" 
                  : "border-gray-300 hover:border-purple-400 hover:text-purple-600"
              }`}
            >
              <Filter className="mr-2 h-4 w-4" /> כל האתרים
            </Button>
          </motion.div>
          {positions.map(position => (
            <motion.div key={position} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant={selectedPosition === position ? "default" : "outline"}
                onClick={() => setSelectedPosition(position)}
                className={`mb-2 transition-all duration-200 rounded-xl px-5 py-2 ${
                  selectedPosition === position 
                    ? "bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-md" 
                    : "border-gray-300 hover:border-purple-400 hover:text-purple-600"
                }`}
              >
                {position.replace(/_/g, " ")}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Hosts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {visibleHosts.map((host, index) => (
            <motion.div
              key={host._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              layout
            >
              <MotionCard 
                className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-purple-200 h-full flex flex-col"
                whileHover={{ y: -5 }}
              >
                <CardHeader className="p-6 border-b border-gray-100 bg-gray-50">
                  <CardTitle className="text-xl font-bold truncate text-gray-800">{host.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-6 space-y-5 flex-grow flex flex-col">
                  <div className="aspect-video flex justify-center items-center bg-gradient-to-br from-purple-50 to-teal-50 rounded-xl overflow-hidden border border-gray-100 flex-grow">
                    {host.imageUrl ? (
                      <motion.img
                        src={host.imageUrl}
                        alt={host.title}
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-image.png";
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 flex items-center justify-center h-full">
                        <span className="text-center">אין תמונה</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm space-y-3">
                    <p className="truncate flex items-center bg-gray-50 p-3 rounded-lg">
                      <span className="font-semibold ml-2 text-purple-700">כתובת:</span>
                      <a 
                        href={host.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline truncate ml-1 flex-1"
                      >
                        {host.url}
                      </a>
                    </p>
                    {host.position && (
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-teal-100 text-purple-800 rounded-lg text-sm">
                        <span className="font-medium">מיקום: </span>
                        {host.position}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3 justify-between pt-4 border-t border-gray-100 mt-5">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-purple-50 to-teal-50 text-purple-700 hover:from-purple-100 hover:to-teal-100 transition-all duration-300 rounded-xl w-full"
                        variant="outline"
                        onClick={() => window.open(host.url, "_blank")}
                      >
                        <ArrowUpRight className="h-4 w-4 ml-2" /> פתח אתר
                      </Button>
                    </motion.div>
                    
                    {user && (
                      <div className="flex space-x-3">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleEdit(host)}
                            className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-100 rounded-xl h-10 w-10"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleDelete(host._id)}
                            className="bg-red-50 text-red-500 hover:bg-red-100 border-red-100 rounded-xl h-10 w-10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </MotionCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* "Load More" button */}
      {hasMoreHosts && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-10 mb-6"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button 
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-purple-500 to-teal-500 text-white px-8 py-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <ChevronDown className="mr-2 h-5 w-5" />
              טען עוד אתרים ({filteredHosts.length - visibleHosts.length} נוספים)
            </Button>
          </motion.div>
        </motion.div>
      )}
      
      {filteredHosts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center bg-white rounded-2xl p-16 text-center shadow-md border border-gray-100"
        >
          <motion.div 
            className="bg-gradient-to-r from-purple-100 to-teal-100 p-8 rounded-full mb-6"
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Search className="h-12 w-12 text-purple-500" />
          </motion.div>
          {searchText ? (
            <>
              <motion.h3 
                className="text-2xl font-bold mb-3 text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                לא נמצאו תוצאות
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                לא נמצאו אתרים התואמים את החיפוש "{searchText}"
              </motion.p>
            </>
          ) : (
            <>
              <motion.h3 
                className="text-2xl font-bold mb-3 text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                אין אתרים להצגה
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                לא נמצאו אתרים בקטגוריה זו
              </motion.p>
            </>
          )}
        </motion.div>
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