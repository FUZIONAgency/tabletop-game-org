import { StorageError } from "@supabase/storage-js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AdvertisingTabProps {
  ads: {
    name: string;
    metadata?: {
      mimetype?: string;
    };
  }[] | null;
  getFileUrl: (path: string) => string;
}

export const AdvertisingTab = ({ ads, getFileUrl }: AdvertisingTabProps) => {
  const [selectedAd, setSelectedAd] = useState<string | null>(null);

  if (!ads || ads.length === 0) {
    return <div className="text-gray-500">No advertisements available.</div>;
  }

  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads?.map((ad) => {
          const imageUrl = getFileUrl(`ads/${ad.name}`);
          console.log('Processing ad:', ad.name, 'URL:', imageUrl);
          return (
            <div key={ad.name} className="relative group">
              <img
                src={imageUrl}
                alt={ad.name}
                className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedAd(imageUrl)}
              />
            </div>
          );
        })}
      </div>

      <Dialog open={!!selectedAd} onOpenChange={() => setSelectedAd(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={() => setSelectedAd(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-12 top-2 z-10"
              onClick={() => {
                if (selectedAd) {
                  const fileName = selectedAd.split('/').pop()?.split('?')[0] || 'advertisement.jpg';
                  handleDownload(selectedAd, fileName);
                }
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
            {selectedAd && (
              <img
                src={selectedAd}
                alt="Advertisement"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};