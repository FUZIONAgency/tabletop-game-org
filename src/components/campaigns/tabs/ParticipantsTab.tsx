interface ParticipantsTabProps {
  participants: {
    player: {
      alias: string;
      alias_image_url?: string;
    };
  }[] | null;
}

export const ParticipantsTab = ({ participants }: ParticipantsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {participants?.map((participant) => (
        <div key={participant.player.alias} className="flex items-center gap-2 p-4 border rounded-lg">
          {participant.player.alias_image_url && (
            <img
              src={participant.player.alias_image_url}
              alt={participant.player.alias}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span>{participant.player.alias}</span>
        </div>
      ))}
    </div>
  );
};