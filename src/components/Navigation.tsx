import { useState, useEffect } from "react";
import { UserPlus, Gamepad, HelpCircle, DollarSign } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold">Adventure Trade</div>
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "signup", icon: UserPlus, label: "Sign Up" },
              { id: "games", icon: Gamepad, label: "Play Games" },
              { id: "help", icon: HelpCircle, label: "Find Help" },
              { id: "rewards", icon: DollarSign, label: "Get Paid" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
            <div className="ml-4">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;