import { ScrollArea } from "@/components/ui/scroll-area";

interface PhotosTabProps {
  photos: {
    name: string;
    metadata?: {
      mimetype?: string;
    };
  }[] | null;
  getFileUrl: (path: string) => string;
}

export const PhotosTab = ({ photos, getFileUrl }: PhotosTabProps) => {
  return (
    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos?.map((photo) => (
          <img
            key={photo.name}
            src={getFileUrl(`photos/${photo.name}`)}
            alt={photo.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>
    </ScrollArea>
  );
};