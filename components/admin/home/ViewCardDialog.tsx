import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import config from "@/lib/config";
import { ViewCardDialogProps } from "@/types";
import { IKImage } from "imagekitio-next";

export function ViewCardDialog({
  IDCard,
  open,
  onOpenChange,
}: ViewCardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Student ID Card
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-auto mt-4 flex items-center justify-center">
          {IDCard ? (
            <IKImage
              path={IDCard}
              alt="ID Card"
              urlEndpoint={config.env.imagekit.urlEndpoint}
              width={500}
              height={300}
              className="object-contain w-full rounded-lg border shadow-sm"
              loading="lazy"
            />
          ) : (
            <p className="text-gray-500 text-sm">No ID card available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
