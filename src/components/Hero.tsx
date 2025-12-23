import { ArrowDown, Code2, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Gradient orbs - more vibrant */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
      
      <div className="container mx-auto px-6 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10 text-primary mb-8 animate-fade-in shadow-neon">
            <Gamepad2 className="w-4 h-4" />
            <span className="text-sm font-display uppercase tracking-wider">Game Programmer</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient glow-text">Kamyker</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-slide-up font-light" style={{ animationDelay: '0.1s' }}>
            Kamil Szurant
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Creating <span className="text-primary">UEFN experiences</span> since UEFN release in March 2023. Specializing in tycoon maps like{' '}
            <a href="https://fortnite.gg/island?code=9441-8610-2332" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Drip Shop Tycoon</a> and{' '}
            <a href="https://fortnite.gg/island?code=7112-2463-4380" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Lumber Town</a>. 
            Deep Verse and assets knowledge to <span className="text-primary">optimize map FPS</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" asChild>
              <a href="#projects">
                <Code2 className="w-5 h-5" />
                View Projects
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
