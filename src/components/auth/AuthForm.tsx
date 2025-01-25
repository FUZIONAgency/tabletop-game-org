import { Shield } from "lucide-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const redirectTo = `${window.location.origin}/auth/callback`;

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();

    // Add auth state change listener with improved error handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);

      if (event === "SIGNED_IN") {
        toast.success("Successfully signed in!");
        navigate('/');
      } else if (event === "USER_UPDATED") {
        toast.success("Your account has been updated");
      } else if (event === "PASSWORD_RECOVERY") {
        toast.info("Check your email for password reset instructions");
      } else if (event === "SIGNED_OUT") {
        toast.error("You have been signed out");
      }

      // Handle auth errors
      if (session?.error) {
        console.error("Auth error:", session.error);
        
        const errorMessage = session.error.message;
        if (errorMessage?.includes("Invalid login credentials")) {
          toast.error("Invalid email or password. Please try again.");
        } else if (errorMessage?.includes("Email not confirmed")) {
          toast.error("Please check your email and verify your account before logging in.");
        } else if (errorMessage?.includes("Database error saving new user")) {
          toast.error("There was an error creating your account. Please try again later.");
        } else if (session.error.status === 400) {
          toast.error(errorMessage || "There was a problem with your request. Please try again.");
        } else if (session.error.status === 500) {
          toast.error("An unexpected error occurred. Please try again later.");
        } else {
          toast.error(errorMessage || "An error occurred during authentication");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
          onError={(error) => {
            console.error("Auth UI error:", error);
            toast.error(error.message || "An error occurred during authentication");
          }}
        />
      </div>
    </div>
  );
};

export default AuthForm;