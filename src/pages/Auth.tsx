import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            extend: true,
            className: {
              anchor: 'hidden'
            }
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                password_label: 'Password',
                email_label: 'Email',
                button_label: 'Sign In',
              }
            }
          }}
        />
        <div className="mt-4 text-center">
          <a 
            href="https://popcultureusa.com/forgot-password" 
            className="text-sm text-gray-600 hover:text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;