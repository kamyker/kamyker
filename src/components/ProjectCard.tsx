import { ExternalLink, Github, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  tags, 
  demoUrl, 
  githubUrl, 
  videoUrl,
  featured = false 
}: ProjectCardProps) => {
  return (
    <div className={`group relative rounded-xl overflow-hidden border border-border/50 bg-gradient-card transition-all duration-500 hover:border-primary/50 hover:shadow-neon ${featured ? 'md:col-span-2' : ''}`}>
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Play button overlay */}
        {videoUrl && (
          <a 
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-neon-strong">
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            </div>
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 text-xs font-display uppercase tracking-wider rounded-full bg-muted text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {demoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
