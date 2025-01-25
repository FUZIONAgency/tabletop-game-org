import { FileIcon, ImageIcon } from "lucide-react";

interface ResourcesTabProps {
  resources: {
    name: string;
    metadata?: {
      mimetype?: string;
    };
  }[] | null;
  getFileUrl: (path: string) => string;
}

export const ResourcesTab = ({ resources, getFileUrl }: ResourcesTabProps) => {
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="h-6 w-6" />;
    }
    return <FileIcon className="h-6 w-6" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {resources?.map((resource) => (
        <a
          key={resource.name}
          href={getFileUrl(`resources/${resource.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-4 border rounded-lg hover:bg-gray-50"
        >
          {getFileIcon(resource.metadata?.mimetype || '')}
          <span className="truncate">{resource.name}</span>
        </a>
      ))}
    </div>
  );
};