import { StorageError } from "@supabase/storage-js";

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
  if (!ads || ads.length === 0) {
    return <div className="text-gray-500">No advertisements available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ads?.map((ad) => {
        const imageUrl = getFileUrl(`ads/${ad.name}`);
        console.log('Processing ad:', ad.name, 'URL:', imageUrl);
        return (
          <img
            key={ad.name}
            src={imageUrl}
            alt={ad.name}
            className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          />
        );
      })}
    </div>
  );
};