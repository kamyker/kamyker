import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Beat Aim",
    description: "An innovative aim trainer where targets are generated based on music rhythm. Available on Steam and as a UEFN experience.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    tags: ["UEFN", "Steam", "Music", "Aim Trainer"],
    demoUrl: "https://beataim.com",
    videoUrl: "https://www.youtube.com/c/BeatAim",
    featured: true,
  },
  {
    title: "Verse Open Source Library",
    description: "The first ever open-sourced GitHub repository of Verse code, featuring persistent player stats, matchmaking systems, and more.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    tags: ["Verse", "Open Source", "UEFN"],
    githubUrl: "https://gist.github.com/kamyker",
  },
  {
    title: "Fortnite API Digest",
    description: "Generated digest of the Verse API for Fortnite, helping developers understand the available functionality.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80",
    tags: ["Verse", "API", "Documentation"],
    githubUrl: "https://gist.github.com/kamyker/9b9166ab08b115f64111b9da02c855bb",
  },
  {
    title: "UEFN Creative Maps",
    description: "Collection of creative UEFN maps showcasing innovative gameplay mechanics and Verse programming techniques.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80",
    tags: ["UEFN", "Fortnite", "Verse"],
    demoUrl: "https://x.com/kamyker",
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
