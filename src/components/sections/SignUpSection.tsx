import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUpSection = () => {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Start Your Journey Today</h3>
        <p className="text-gray-600">
          Join our network of passionate gamers and entrepreneurs. Create your account
          to access exclusive games, rewards, and business opportunities.
        </p>
        <Button className="w-full md:w-auto" onClick={() => navigate('/auth')}>
          <UserPlus className="mr-2 h-4 w-4" /> Create Account
        </Button>
      </div>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Gaming Setup"
          className="rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default SignUpSection;