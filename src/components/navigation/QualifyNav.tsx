import { ShieldCheck } from "lucide-react";

interface QualifyNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const QualifyNav = ({ activeSection, scrollToSection }: QualifyNavProps) => {
  return (
    <button
      onClick={() => scrollToSection('qualify')}
      className={`flex items-center space-x-2 transition-colors w-full p-2 text-white hover:text-gold ${
        activeSection === 'qualify' ? 'text-gold' : ''
      }`}
    >
      <ShieldCheck className="w-4 h-4" />
      <span>Qualify</span>
    </button>
  );
};

export default QualifyNav;