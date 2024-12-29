import { Mail, User, UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileData {
  email: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
}

interface ProfileCardProps {
  profile: ProfileData | null;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  if (!profile) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          Account Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{profile.username}</span>
          </div>
          {profile.role && (
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {profile.role}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;