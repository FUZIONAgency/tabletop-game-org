import { Gamepad } from "lucide-react";

const GamesSection = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: "Retailers",
          description: "Play at your local retailer",
          icon: Gamepad,
        },
        {
          title: "Conventions",
          description: "Host games at conventions",
          icon: Gamepad,
        },
        {
          title: "Online",
          description: "Host online games",
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
  );
};

export default GamesSection;