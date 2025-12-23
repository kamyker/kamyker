import { Code, Cpu, Gamepad2, Music, Sparkles, Zap } from "lucide-react";

const skills = [
  {
    icon: Code,
    title: "Verse Programming",
    description: "Expert in Epic's Verse language for UEFN development",
    color: "primary",
  },
  {
    icon: Gamepad2,
    title: "UEFN Development",
    description: "Creating immersive Fortnite creative experiences",
    color: "secondary",
  },
  {
    icon: Cpu,
    title: "Game Systems",
    description: "Matchmaking, persistent stats, and networking",
    color: "primary",
  },
  {
    icon: Music,
    title: "Audio Integration",
    description: "Music-driven gameplay mechanics and rhythm systems",
    color: "secondary",
  },
  {
    icon: Sparkles,
    title: "Unity & Unreal",
    description: "Cross-engine development experience",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimization and low-level systems programming",
    color: "secondary",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative grid-pattern">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-blue glow-text-blue">Technical</span> Skills
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Bridging high-level abstraction with low-level control
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const isPrimary = skill.color === "primary";
            
            return (
              <div 
                key={skill.title}
                className={`group p-6 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-500 ${isPrimary ? 'border-primary/30 hover:border-primary/60 hover:shadow-neon' : 'border-secondary/30 hover:border-secondary/60 hover:shadow-blue'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${isPrimary ? 'bg-primary/20 text-primary shadow-neon' : 'bg-secondary/20 text-secondary shadow-blue'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {skill.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
