import { GraduationCap, Dices, Users, DollarSign } from "lucide-react";

export const features = [
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

const AuthFeatures = () => {
  return (
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
  );
};

export default AuthFeatures;