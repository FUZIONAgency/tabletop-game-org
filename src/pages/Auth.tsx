import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import AuthFeatures from "@/components/auth/AuthFeatures";
import AuthForm from "@/components/auth/AuthForm";
import { AuthError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        // Handle sign out
      } else if (event === "PASSWORD_RECOVERY") {
        // Handle password recovery
        const email = session?.user?.email;
        if (email) {
          try {
            const { error } = await supabase.functions.invoke("confirmTabletopEmail", {
              body: {
                to: [email],
                resetLink: window.location.href,
              },
            });

            if (error) {
              console.error("Error sending reset email:", error);
              toast({
                title: "Error",
                description: `Failed to send password reset email: ${error.message}`,
                variant: "destructive",
              });
            } else {
              toast({
                title: "Email Sent",
                description: "Check your email for password reset instructions.",
              });
            }
          } catch (error: any) {
            console.error("Error invoking edge function:", error);
            toast({
              title: "Error",
              description: `An unexpected error occurred: ${error.message}`,
              variant: "destructive",
            });
          }
        }
      } else if (event === "SIGNED_IN") {
        // Handle successful sign in
        toast({
          title: "Success",
          description: "Successfully signed in!",
        });
      } else if (event === "USER_UPDATED") {
        // Handle user data update
        console.log('User data updated');
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account.",
        });
      }
    });

    // Add error listener for auth state changes
    const handleAuthError = (error: AuthError) => {
      console.error("Auth error:", error);
      if (error.message?.includes("User already registered")) {
        toast({
          title: "Account Exists",
          description: "An account with this email already exists. Please try logging in instead.",
          variant: "destructive",
        });
      } else if (error.message?.includes("Invalid login credentials")) {
        toast({
          title: "Login Failed",
          description: "The email or password you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      } else if (error.message?.includes("Email not confirmed")) {
        toast({
          title: "Email Not Verified",
          description: "Please check your email and click the confirmation link to verify your account.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Authentication Error",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    };

    // Subscribe to auth errors
    const {
      data: { subscription: errorSubscription },
    } = supabase.auth.onError(handleAuthError);

    return () => {
      subscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, [user, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col md:flex-row items-center justify-center p-4 gap-8">
      <AuthFeatures />
      <AuthForm />
    </div>
  );
};

export default Auth;