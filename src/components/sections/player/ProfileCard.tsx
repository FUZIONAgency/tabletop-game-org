
import { Mail, User, UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileData {
  id: string;
  email: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
}

interface ProfileCardProps {
  profile: ProfileData | null;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(profile?.username || "");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  if (!profile) return null;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', profile.id);

      if (error) throw error;

      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      toast({
        title: "Success",
        description: "Username updated successfully",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating username:', error);
      toast({
        title: "Error",
        description: "Failed to update username",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-8"
                  placeholder="Enter username"
                />
                <Button 
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setUsername(profile.username || "");
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>{profile.username}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </div>
            )}
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
