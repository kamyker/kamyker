import { Github, Mail, MapPin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiscordIcon from "@/components/icons/DiscordIcon";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/10 to-background" />
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient-orange glow-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Interested in collaboration or have a project in mind? Let's talk!
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-10">
            <MapPin className="w-5 h-5 text-secondary" />
            <span>Wrocław, Poland</span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:kamil.szurant@gmail.com">
                <Mail className="w-5 h-5" />
                Email
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/kamyker" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://discord.com/users/126776984968626176" target="_blank" rel="noopener noreferrer">
                <DiscordIcon className="w-5 h-5" />
                Discord
              </a>
            </Button>
          </div>

          {/* CTA */}
          <Button variant="neon" size="xl" asChild>
            <a href="https://x.com/kamyker" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5" />
              Send me a message
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
