import { ShieldCheck, Award, Star, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface QualifyNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const QualifyNav = ({ activeSection, scrollToSection }: QualifyNavProps) => {
  const isMobile = useIsMobile();

  const handleQualifyClick = () => {
    if (!isMobile) {
      scrollToSection('qualify');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={handleQualifyClick}
          className={`flex items-center space-x-2 transition-colors w-full p-2 text-white hover:text-gold group ${
            activeSection === 'qualify' ? 'text-gold' : ''
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Qualify</span>
          <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/qualify/get-certified" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Get Certified</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/qualify/ratings" className="flex items-center space-x-2">
            <Star className="w-4 h-4" />
            <span>Ratings</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QualifyNav;