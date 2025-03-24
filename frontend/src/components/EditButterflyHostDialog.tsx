import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { butterflyHostService } from "@/services/butterflyHost.service";
import InputUpload from "./InputUpload";
import { useTranslation } from "react-i18next";

interface ButterflyHost {
  id: string;
  title: string;
  url: string;
  position: string;
  image?: string | null;
}

interface EditButterflyHostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  host: ButterflyHost | null;
  onHostSaved: (updatedHost: ButterflyHost) => void;
  isNewHost?: boolean;
}

export default function EditButterflyHostDialog({
  open,
  onOpenChange,
  host,
  onHostSaved,
  isNewHost = false,
}: EditButterflyHostDialogProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const formSchema = z.object({
    title: z.string().min(2, t("butterfly.title_required", "כותרת חייבת להכיל לפחות 2 תווים")),
    url: z.string().url(t("butterfly.valid_url", "נא להזין כתובת אתר תקינה")),
    position: z.string().min(1, t("butterfly.position_required", "מיקום נדרש")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: host?.title || "",
      url: host?.url || "",
      position: host?.position || "",
    },
  });

  useEffect(() => {
    if (open && host) {
      form.reset({
        title: host.title,
        url: host.url,
        position: host.position,
      });
      setPreviewUrl(host.image || null);
    } else if (open && !host) {
      form.reset({
        title: "",
        url: "",
        position: "",
      });
      setPreviewUrl(null);
    }
  }, [open, host, form]);

  const closeDialog = () => {
    onOpenChange(false);
    setImageFile(null);
    setPreviewUrl(host?.image || null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      let savedHost: ButterflyHost;

      if (isNewHost) {
        savedHost = await butterflyHostService.create(
          values.title,
          values.url,
          values.position,
          imageFile
        );
        toast.success(t("butterfly.host_created", "האתר נוצר בהצלחה"));
      } else {
        if (!host) return;
        savedHost = await butterflyHostService.update(
          host.id,
          values.title,
          values.url,
          values.position,
          imageFile
        );
        toast.success(t("butterfly.host_updated", "האתר עודכן בהצלחה"));
      }

      onHostSaved(savedHost);
      closeDialog();
    } catch (error) {
      toast.error(
        isNewHost
          ? t("butterfly.error_creating", "שגיאה ביצירת האתר")
          : t("butterfly.error_updating", "שגיאה בעדכון האתר")
      );
      console.error("Error saving host:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isNewHost 
              ? t("butterfly.add_host", "הוספת אתר מארח") 
              : t("butterfly.edit_host", "עריכת אתר מארח")}
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("butterfly.title", "כותרת")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("butterfly.enter_title", "הזן כותרת")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("butterfly.url", "כתובת URL")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("butterfly.enter_url", "הזן כתובת URL")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("butterfly.position", "מיקום")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("butterfly.enter_position", "הזן מיקום (למשל: 1, 2, 3)")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>{t("butterfly.logo", "לוגו")} ({t("butterfly.optional", "אופציונלי")})</FormLabel>
              <InputUpload
                onChange={handleImageChange}
                previewUrl={previewUrl}
                resetPreview={() => {
                  setPreviewUrl(null);
                  setImageFile(null);
                }}
              />
            </div>

            <DialogFooter>
              <div className="flex flex-row-reverse gap-2 w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex gap-2 items-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("common.saving")}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {t("common.save")}
                      </>
                    )}
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
                    {t("common.cancel")}
                  </Button>
                </motion.div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 