import { Shield } from "lucide-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthForm = () => {
  const { toast } = useToast();
  const redirectTo = `${window.location.origin}/auth/callback`;

  // Add auth state change listener with improved error handling
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
    } else if (event === "USER_UPDATED") {
      toast({
        title: "Account Updated",
        description: "Your account has been updated.",
      });
    } else if (event === "PASSWORD_RECOVERY") {
      toast({
        title: "Password Recovery",
        description: "Check your email for password reset instructions.",
      });
    } else if (event === "SIGNED_OUT") {
      toast({
        title: "Signed Out",
        description: "You have been signed out.",
        variant: "destructive",
      });
    }

    // Handle auth errors
    const error = session?.user?.user_metadata?.error;
    if (error) {
      console.error("Auth error:", error);
      
      if (error.message?.includes("invalid_credentials")) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      } else if (error.message?.includes("Email not confirmed")) {
        toast({
          title: "Email Not Verified",
          description: "Please check your email and verify your account before logging in.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Authentication Error",
          description: error.message || "An error occurred during authentication",
          variant: "destructive",
        });
      }
    }
  });

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-xl p-8 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-gold" />
          <h2 className="text-2xl font-bold text-center">
            Welcome to TabletopGame.org
          </h2>
        </div>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#000000",
                  brandAccent: "#D4AF37",
                  inputBackground: "white",
                  inputBorder: "#e2e8f0",
                  inputBorderFocus: "#D4AF37",
                  inputBorderHover: "#D4AF37",
                },
                borderWidths: {
                  buttonBorderWidth: "1px",
                  inputBorderWidth: "1px",
                },
                radii: {
                  borderRadiusButton: "0.5rem",
                  buttonBorderRadius: "0.5rem",
                  inputBorderRadius: "0.5rem",
                },
              },
            },
            className: {
              button: "font-semibold",
              input: "font-medium",
              label: "font-medium",
            },
          }}
          providers={[]}
          redirectTo={redirectTo}
        />
      </div>
    </div>
  );
};

export default AuthForm;