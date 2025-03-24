import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DeleteButterflyHostDialogProps {
  hostName: string;
  onDelete: () => Promise<void>;
}

export function DeleteButterflyHostDialog({ 
  hostName, 
  onDelete 
}: DeleteButterflyHostDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      setIsOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("common.delete")} {hostName}</DialogTitle>
          <DialogDescription>
            {t("butterfly.delete_confirm", "האם אתה בטוח שברצונך למחוק את האתר המארח הזה?")}
          </DialogDescription>
        </DialogHeader>
        <p className="text-center text-red-500 text-sm mt-2">{t("butterfly.delete_warning", "פעולה זו אינה ניתנת לביטול.")}</p>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            {t("common.cancel")}
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? 
              t("actions.deleting") :
              t("common.delete")
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 