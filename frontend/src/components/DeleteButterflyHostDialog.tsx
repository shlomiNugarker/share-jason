import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { motion } from "framer-motion";
import { AlertTriangle, Trash, X } from "lucide-react";

interface ButterflyHost {
  id: string;
  title: string;
  url: string;
  position: string;
}

interface DeleteButterflyHostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  host: ButterflyHost | null;
  onHostDeleted: (id: string) => void;
}

export default function DeleteButterflyHostDialog({
  open,
  onOpenChange,
  host,
  onHostDeleted,
}: DeleteButterflyHostDialogProps) {
  const [loading, setLoading] = useState(false);

  const closeDialog = () => {
    onOpenChange(false);
  };

  const handleDelete = async () => {
    if (!host) return;

    try {
      setLoading(true);
      await axios.delete(`http://localhost:3030/api/butterfly-hosts/${host.id}`);
      toast.success("האתר נמחק בהצלחה");
      onHostDeleted(host.id);
      closeDialog();
    } catch (error) {
      toast.error("שגיאה במחיקת האתר");
      console.error("Error deleting host:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border border-red-50 shadow-lg bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-red-600">
            <AlertTriangle className="w-5 h-5" />
            מחיקת אתר מארח
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
        
        <div className="py-4">
          <div className="p-4 mb-4 rounded-lg bg-red-50 border border-red-100">
            <p className="text-center text-red-700">
              האם אתה בטוח שברצונך למחוק את האתר <span className="font-bold">{host?.title}</span>?
            </p>
            <p className="text-center text-red-500 text-sm mt-2">פעולה זו אינה ניתנת לביטול.</p>
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex flex-row-reverse gap-2 w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="button" 
                variant="destructive" 
                className="flex gap-2 items-center"
                onClick={handleDelete}
                disabled={loading}
              >
                <Trash className="h-4 w-4" />
                {loading ? "מוחק..." : "מחיקה"}
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="button" 
                variant="outline" 
                onClick={closeDialog}
                disabled={loading}
              >
                ביטול
              </Button>
            </motion.div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 