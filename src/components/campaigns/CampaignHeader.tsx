import { QRCodeSVG } from "qrcode.react";

interface CampaignHeaderProps {
  gameSystemLogo?: string;
  gameSystemName?: string;
  title: string;
  currentUrl: string;
}

export const CampaignHeader = ({ 
  gameSystemLogo, 
  gameSystemName, 
  title,
  currentUrl 
}: CampaignHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-6">
        {gameSystemLogo && (
          <img
            src={gameSystemLogo}
            alt={gameSystemName}
            className="w-24 h-24 object-contain"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600">{gameSystemName}</p>
        </div>
      </div>
      <div className="w-32 h-32">
        <QRCodeSVG
          value={currentUrl}
          size={128}
          level="L"
          includeMargin={true}
        />
      </div>
    </div>
  );
};