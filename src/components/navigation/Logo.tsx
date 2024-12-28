import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="text-xl font-bold text-white hover:text-gold transition-colors"
    >
      TabletopGame.org
    </Link>
  );
};

export default Logo;