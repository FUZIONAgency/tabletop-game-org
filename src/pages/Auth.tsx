import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Shield, DollarSign, Users, GraduationCap, Dices } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    // Listen for auth state changes and errors
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        // Handle sign out
      } else if (event === "PASSWORD_RECOVERY") {
        // Handle password recovery
      } else if (event === "SIGNED_IN") {
        // Handle successful sign in
      } else if (!session && event === "INITIAL_SESSION") {
        // Handle invalid credentials or other auth errors
        const authError = (session as any)?.error?.message;
        if (authError?.includes("Invalid login credentials")) {
          toast({
            title: "Login Failed",
            description: "The email or password you entered is incorrect. Please try again.",
            variant: "destructive",
          });
        } else if (authError?.includes("Email not confirmed")) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email and click the confirmation link to verify your account.",
            variant: "destructive",
          });
        } else if (authError) {
          toast({
            title: "Authentication Error",
            description: authError,
            variant: "destructive",
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, navigate, toast]);

  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Qualify",
      description: "Become certified on each game system",
    },
    {
      icon: <Dices className="w-8 h-8" />,
      title: "Play Games",
      description: "Join gaming events at local stores and conventions",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Build Your Team",
      description: "Recruit and grow your network of gaming enthusiasts",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Earn Rewards",
      description: "Get paid for playing and selling gaming merchandise",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col md:flex-row items-center justify-center p-4 gap-8">
      {/* Left side - Features */}
      <div className="w-full max-w-xl p-8 space-y-8 text-white animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-gold">
          TabletopGame.org
        </h1>
        <p className="text-xl text-gray-300">
          The Home for Tabletop Professionals
        </p>
        <div className="grid gap-6 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-black/30 backdrop-blur-sm animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-gold">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Auth Form */}
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
            redirectTo={window.location.origin}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;