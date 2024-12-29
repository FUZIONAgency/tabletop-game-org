import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Shield } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Auth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  return (
    <PageLayout>
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-xl">
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
                },
              },
            },
          }}
          providers={[]}
        />
      </div>
    </PageLayout>
  );
};

export default Auth;