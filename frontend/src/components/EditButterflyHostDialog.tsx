import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Edit2, Save, X } from "lucide-react";
import { butterflyHostService } from "@/services/butterflyHost.service";

interface ButterflyHost {
  id: string;
  title: string;
  url: string;
  position: string;
}

interface EditButterflyHostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  host: ButterflyHost | null;
  onHostEdited: (host: ButterflyHost) => void;
}

export default function EditButterflyHostDialog({
  open,
  onOpenChange,
  host,
  onHostEdited,
}: EditButterflyHostDialogProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (host) {
      setTitle(host.title);
      setUrl(host.url);
      setPosition(host.position);
    }
  }, [host]);

  const closeDialog = () => {
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !url || !position) {
      toast.error("אנא מלא את כל השדות");
      return;
    }

    if (!host) return;

    try {
      setLoading(true);
      const response = await butterflyHostService.update(
        host.id, 
        { 
          title, 
          url, 
          position,
          imageUrl: "" // Adding required imageUrl field
        }
      );
      
      // Transform the response to match the expected interface
      onHostEdited({
        id: response.host._id,
        title: response.host.title,
        url: response.host.url,
        position: response.host.position || ""
      });
      
      toast.success("האתר עודכן בהצלחה");
      closeDialog();
    } catch (error) {
      toast.error("שגיאה בעדכון האתר");
      console.error("Error updating host:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border border-purple-100 shadow-lg bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gradient">
            <Edit2 className="w-5 h-5" />
            עריכת אתר מארח
          </DialogTitle>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeDialog}
            className="absolute top-4 right-4 rounded-full p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                כותרת
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="הזן כותרת"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                כתובת URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="לדוגמה: https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                מיקום
              </label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="הזן מיקום"
              />
            </div>
          </div>
          
          <DialogFooter>
            <div className="flex flex-row-reverse gap-2 w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  variant="gradient" 
                  className="flex gap-2 items-center"
                  disabled={loading}
                >
                  <Save className="h-4 w-4" />
                  {loading ? "שומר..." : "שמירה"}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="button" 
                  variant="light" 
                  onClick={closeDialog}
                  disabled={loading}
                >
                  ביטול
                </Button>
              </motion.div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 