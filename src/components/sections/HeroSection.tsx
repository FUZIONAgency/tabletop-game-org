import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";

const HeroSection = () => {
  const { role } = useAuth();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fadeIn">
          Play Games. Earn Rewards.
          <br />
          Build Your Future.
        </h1>
        <p className="text-xl md:text-2xl mb-4 animate-fadeIn opacity-90">
          Join our community of gamers and entrepreneurs
        </p>
        <p className="text-lg mb-12 animate-fadeIn opacity-75">
          Current Role: {role}
        </p>
        <Button
          size="lg"
          className="bg-gold hover:bg-gold/90 text-black animate-fadeIn"
        >
          Get Started Now
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;