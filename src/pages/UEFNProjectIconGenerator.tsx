import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UEFNProjectIconGenerator = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [overlayText, setOverlayText] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createIcon = async () => {
    if (!imageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image. Make sure the URL is valid and the image allows cross-origin access."));
        img.src = imageUrl;
      });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Center crop to 1:1
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

      // Add text overlay if provided
      if (overlayText.trim()) {
        // Add 40% shade overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, size, size);

        // Configure text
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const padding = size * 0.1;
        const maxWidth = size - padding * 2;
        const text = overlayText.trim();

        // Find optimal font size
        let fontSize = size * 0.15;
        ctx.font = `bold ${fontSize}px sans-serif`;

        // Word wrap function
        const wrapText = (text: string, maxWidth: number): string[] => {
          const words = text.split(" ");
          const lines: string[] = [];
          let currentLine = "";

          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && currentLine) {
              lines.push(currentLine);
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          if (currentLine) {
            lines.push(currentLine);
          }
          return lines;
        };

        // Adjust font size to fit
        let lines = wrapText(text, maxWidth);
        const maxLines = 4;
        
        while (lines.length > maxLines && fontSize > 20) {
          fontSize *= 0.9;
          ctx.font = `bold ${fontSize}px sans-serif`;
          lines = wrapText(text, maxWidth);
        }

        // If still too many lines, reduce font size more
        while (lines.some(line => ctx.measureText(line).width > maxWidth) && fontSize > 20) {
          fontSize *= 0.9;
          ctx.font = `bold ${fontSize}px sans-serif`;
          lines = wrapText(text, maxWidth);
        }

        // Draw text
        const lineHeight = fontSize * 1.2;
        const totalHeight = lines.length * lineHeight;
        const startY = (size - totalHeight) / 2 + lineHeight / 2;

        lines.forEach((line, index) => {
          ctx.fillText(line, size / 2, startY + index * lineHeight);
        });
      }

      setGeneratedImage(canvas.toDataURL("image/png"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.download = "project-icon.png";
    link.href = generatedImage;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-gradient glow-text">UEFN Project Icon Generator</span>
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Create a 1:1 project icon from any image with optional text overlay
          </p>

          <div className="space-y-6 bg-card/50 border border-primary/20 rounded-2xl p-8">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Link to any image</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overlayText">Text to place on image (optional)</Label>
              <Input
                id="overlayText"
                type="text"
                placeholder="Your text here..."
                value={overlayText}
                onChange={(e) => setOverlayText(e.target.value)}
                className="bg-background/50"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}

            <Button 
              onClick={createIcon} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Creating..." : "Create Icon"}
            </Button>

            <canvas ref={canvasRef} className="hidden" />

            {generatedImage && (
              <div className="space-y-4 pt-6 border-t border-primary/20">
                <img 
                  src={generatedImage} 
                  alt="Generated icon" 
                  className="w-full max-w-md mx-auto rounded-lg border border-primary/20"
                />
                <Button 
                  onClick={downloadImage}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Icon
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UEFNProjectIconGenerator;
