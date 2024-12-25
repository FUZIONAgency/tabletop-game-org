import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { UserPlus, Gamepad, HelpCircle, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <div className="bg-white">
      <Navigation />
      <HeroSection />
      
      {/* Sign Up Section */}
      <Section
        id="signup"
        title="Join Our Gaming Community"
        subtitle="SIGN UP"
        className="bg-white"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Start Your Journey Today</h3>
            <p className="text-gray-600">
              Join our network of passionate gamers and entrepreneurs. Create your account
              to access exclusive games, rewards, and business opportunities.
            </p>
            <Button className="w-full md:w-auto">
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
      </Section>

      {/* Games Section */}
      <Section
        id="games"
        title="Play Anywhere, Anytime"
        subtitle="GAMES"
        className="bg-gray-50"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Local Retail",
              description: "Play at participating stores",
              icon: Gamepad,
            },
            {
              title: "Conventions",
              description: "Join gaming events",
              icon: Gamepad,
            },
            {
              title: "Online",
              description: "Play from anywhere",
              icon: Gamepad,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <item.icon className="w-12 h-12 mb-6 text-gold" />
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Help Section */}
      <Section
        id="help"
        title="We're Here to Help"
        subtitle="SUPPORT"
        className="bg-white"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h3 className="text-2xl font-semibold">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated support team is always ready to assist you with any
              questions about gaming, rewards, or business opportunities.
            </p>
            <Button variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" /> Get Help
            </Button>
          </div>
          <div className="relative order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Support"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </Section>

      {/* Rewards Section */}
      <Section
        id="rewards"
        title="Earn While You Play"
        subtitle="REWARDS"
        className="bg-gray-50"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              alt="Rewards"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Multiple Revenue Streams</h3>
            <ul className="space-y-4">
              {[
                "Commission on product sales",
                "Recruitment bonuses",
                "Team performance rewards",
                "Gaming achievement bonuses",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button className="bg-gold hover:bg-gold/90 text-black">
              Start Earning
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Index;
