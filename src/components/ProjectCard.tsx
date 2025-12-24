import { ExternalLink, Github, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AwardBadge {
  image: string;
  alt: string;
  url: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  embeddedVideoUrl?: string;
  featured?: boolean;
  awardBadge?: AwardBadge;
}

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  tags, 
  demoUrl, 
  githubUrl, 
  videoUrl,
  embeddedVideoUrl,
  featured = false,
  awardBadge
}: ProjectCardProps) => {
  return (
    <div className={`group relative rounded-xl overflow-hidden border border-secondary/30 bg-gradient-card transition-all duration-500 hover:border-primary/60 hover:shadow-neon ${featured ? 'md:col-span-2' : ''}`}>
      {/* Video or Image container */}
      <div className="relative aspect-video overflow-hidden">
        {embeddedVideoUrl ? (
          <video 
            src={embeddedVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent pointer-events-none" />
        
        {/* Award Badge */}
        {awardBadge && (
          <a 
            href={awardBadge.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 z-10 hover:scale-105 transition-transform"
          >
            <img 
              src={awardBadge.image} 
              alt={awardBadge.alt} 
              className="h-10 md:h-12 w-auto drop-shadow-lg"
            />
          </a>
        )}
        
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
        <p className="text-muted-foreground mb-4 whitespace-pre-line">
          {description.split(/(\[.*?\]\(.*?\))/).map((part, i) => {
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              return (
                <a 
                  key={i}
                  href={linkMatch[2]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {linkMatch[1]}
                </a>
              );
            }
            return part;
          })}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={tag}
              className={`px-3 py-1 text-xs font-display uppercase tracking-wider rounded-full border ${
                index % 2 === 0 
                  ? 'bg-primary/10 text-primary border-primary/30' 
                  : 'bg-secondary/10 text-secondary border-secondary/30'
              }`}
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
                Link
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
