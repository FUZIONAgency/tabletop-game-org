import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Logo = () => {
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link 
      to="/" 
      onClick={handleLogoClick}
      className="text-xl font-bold text-white hover:text-gold transition-colors"
    >
      TabletopGame.org
    </Link>
  );
};

export default Logo;