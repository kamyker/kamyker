import ProjectCard from "./ProjectCard";
import drumAwardsBanner from "@/assets/drum-awards-banner.png";

const projects = [
  {
    title: "Money Tycoon",
    description: "🏆 Bronze Winner - The Drum Marketing Awards EMEA 2025 (Metaverse). First metaverse campaign by a Polish bank (Bank Pekao S.A.). A financial simulator with 90,000+ plays where players build businesses and create their own bank.",
    image: "https://cdn-0001.qstv.on.epicgames.com/dhhrVLXpRImiPtpJKy/image/landscape_comp_s.jpeg",
    embeddedVideoUrl: "https://a.storyblok.com/f/231265/x/a08cc525c4/wejdz-do-swiata-fortnite-z-zubrem.mp4",
    tags: ["UEFN", "Fortnite", "Verse", "Bank Pekao S.A.", "Award Winner"],
    demoUrl: "https://www.fortnite.com/@fnbl0/8754-6289-4338",
    featured: true,
    awardBadge: {
      image: drumAwardsBanner,
      alt: "The Drum Awards - Marketing EMEA 2025 Bronze Winner",
      url: "https://www.thedrummarketingawards.com/emea/en/page/results#/dma-emea/2025/metaverse/how-bank-pekao-s-a-became-sigma"
    }
  },
  {
    title: "Reporter Young",
    description: "An immersive Fortnite experience where players become investigative journalists, uncovering stories and solving mysteries in an interactive newsroom environment.",
    image: "https://cdn-0001.qstv.on.epicgames.com/dhhrVLXpRImiPtpJKy/image/landscape_comp_s.jpeg",
    embeddedVideoUrl: "https://a.storyblok.com/f/231265/x/2b2807db47/logadodanerp-1.mp4",
    tags: ["UEFN", "Fortnite", "Verse"],
    demoUrl: "https://www.fortnite.com/@fnbl0",
    featured: true,
  },
  {
    title: "UEFN Map Optimization",
    description: `Commission to optimize @KubxFN's UEFN map:
• Memory: 81k → 67k
• Actor count: 13k → 10k
• Project download size: -40%
• Fixed crashes on Switch
• Map was locked on Switch - fixed
• Optimized Verse loops
Map hit homebar! 🎉`,
    image: "/images/uefn-optimization.jpg",
    tags: ["UEFN", "Optimization", "Commission", "Performance"],
    demoUrl: "https://x.com/kamyker/status/1997449569156890729",
  },
  {
    title: "UEFN Creative Maps",
    description: "Collection of creative UEFN maps showcasing innovative gameplay mechanics and Verse programming techniques.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80",
    tags: ["UEFN", "Fortnite", "Verse"],
    demoUrl: "https://x.com/kamyker",
  },
  {
    title: "Beat Aim",
    description: "An innovative aim trainer where targets are generated based on music rhythm. A Unity/C# game available on Steam.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    tags: ["Unity", "C#", "Steam", "Music", "Aim Trainer"],
    demoUrl: "https://beataim.com",
    videoUrl: "https://www.youtube.com/c/BeatAim",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Featured</span> Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From music-driven aim trainers to pioneering open-source Verse development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
