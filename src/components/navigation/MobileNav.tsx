import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import QualifyNav from "./QualifyNav";
import PlayNav from "./PlayNav";
import RecruitNav from "./RecruitNav";
import EarnNav from "./EarnNav";

interface MobileNavProps {
  activeSection: string | null;
  scrollToSection: (id: string) => void;
}

const MobileNav = ({
  activeSection,
  scrollToSection,
}: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 text-white hover:text-gold"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <QualifyNav activeSection={activeSection} scrollToSection={scrollToSection} />
          <PlayNav activeSection={activeSection} scrollToSection={scrollToSection} />
          <RecruitNav activeSection={activeSection} scrollToSection={scrollToSection} />
          <EarnNav activeSection={activeSection} scrollToSection={scrollToSection} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;