import { Mail, Twitter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import DiscordIcon from "@/components/icons/DiscordIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getBasePath } from "@/lib/basePath";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href={getBasePath("/")} className="font-display text-xl font-bold text-gradient glow-text">
          KAMYKER
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-display flex items-center gap-1 outline-none">
              Free Tools
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-primary/20">
              <DropdownMenuItem asChild>
                <Link to="/uefn-project-icon-generator" className="cursor-pointer">
                  Make Project Icon
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href={getBasePath("#projects")} className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-display">
            Projects
          </a>
          <a href={getBasePath("#commissions")} className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-display">
            Commissions
          </a>
          <a href={getBasePath("#pricing")} className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-display">
            Pricing
          </a>
          <a href={getBasePath("#contact")} className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-display">
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
            href="mailto:kamil.szurant@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a 
            href="https://discord.com/users/126776984968626176" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <DiscordIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
