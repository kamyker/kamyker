import { Github, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold text-gradient">
          KAMYKER
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-display">
            Projects
          </a>
          <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-display">
            Skills
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-display">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a 
            href="https://x.com/kamyker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/kamyker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.youtube.com/c/BeatAim" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
