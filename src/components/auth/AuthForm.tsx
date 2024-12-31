import { Shield } from "lucide-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const AuthForm = () => {
  // Get the current URL for redirect
  const redirectTo = `${window.location.origin}/auth/callback`;

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
            console.error("Auth Error:", error);
          }}
        />
      </div>
    </div>
  );
};

export default AuthForm;