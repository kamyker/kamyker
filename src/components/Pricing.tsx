import { Check } from "lucide-react";
const Pricing = () => {
  return <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient glow-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">I work at an hourly rate of $50/hour. Creating accurate quotes takes significant time, so I prefer to bill for actual hours worked. Upfront payment may be required for new and unfamiliar clients.<span className="text-foreground font-semibold">$50/hour</span>. 
            Creating accurate quotes takes significant time, so I prefer to bill for actual hours worked. Upfront payment may be required for new clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Basic Optimization
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gradient">$250</span>
                <span className="text-muted-foreground">/ ~5 hours</span>
              </div>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Basic memory optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Basic assets optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Verse memory leak fixes</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Info on further optimization possibilities</span>
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Better Optimization
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gradient-orange">$500-1000+</span>
              </div>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Replacing assets with optimized solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Rewriting slow parts of Verse code</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Improvements to materials and Niagara VFXs</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Use of data layers if possible</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Many other tricks I found over the years</span>
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-accent/20 hover:border-accent/40 transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Other
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gradient">$50</span>
                <span className="text-muted-foreground">/ hour</span>
              </div>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Verse systems and mechanics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Game loop improvements to increase playtime</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Advanced UI implementations</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Basic materials and niagara VFXs creation</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Min 5h commitment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
};
export default Pricing;