import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Load Google Fonts
const googleFonts = ["Bebas+Neue", "Oswald:wght@700", "Roboto+Condensed:wght@700", "Anton", "Teko:wght@700", "Russo+One", "Staatliches", "Bungee", "Bangers", "Permanent+Marker"];
const loadGoogleFonts = () => {
  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css2?family=${googleFonts.join("&family=")}&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
};
const fontOptions = [{
  value: "'Burbank Big Condensed', Arial, sans-serif",
  label: "Burbank (Fortnite)"
}, {
  value: "Impact, Arial, sans-serif",
  label: "Impact"
}, {
  value: "'Arial Black', Arial, sans-serif",
  label: "Arial Black"
}, {
  value: "'Bebas Neue', Arial, sans-serif",
  label: "Bebas Neue"
}, {
  value: "'Oswald', Arial, sans-serif",
  label: "Oswald"
}, {
  value: "'Roboto Condensed', Arial, sans-serif",
  label: "Roboto Condensed"
}, {
  value: "'Anton', Arial, sans-serif",
  label: "Anton"
}, {
  value: "'Teko', Arial, sans-serif",
  label: "Teko"
}, {
  value: "'Russo One', Arial, sans-serif",
  label: "Russo One"
}, {
  value: "'Staatliches', Arial, sans-serif",
  label: "Staatliches"
}, {
  value: "'Bungee', Arial, sans-serif",
  label: "Bungee"
}, {
  value: "'Bangers', Arial, sans-serif",
  label: "Bangers"
}, {
  value: "'Permanent Marker', Arial, sans-serif",
  label: "Permanent Marker"
}, {
  value: "Arial, sans-serif",
  label: "Arial"
}, {
  value: "sans-serif",
  label: "Sans Serif"
}, {
  value: "serif",
  label: "Serif"
}, {
  value: "monospace",
  label: "Monospace"
}, {
  value: "cursive",
  label: "Cursive"
}];
const UEFNProjectIconGenerator = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [overlayText, setOverlayText] = useState("");
  const [fontSize, setFontSize] = useState(50);
  const [fontFamily, setFontFamily] = useState("'Burbank Big Condensed', Arial, sans-serif");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load Google Fonts on mount
  useEffect(() => {
    loadGoogleFonts();
  }, []);
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
      const outputSize = 192;
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Enable image smoothing for better quality downscaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Center crop to 1:1 and scale down to output size
      const cropSize = Math.min(img.width, img.height);
      const sx = (img.width - cropSize) / 2;
      const sy = (img.height - cropSize) / 2;
      ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, outputSize, outputSize);

      // Add text overlay if provided
      if (overlayText.trim()) {
        // Add 40% shade overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, outputSize, outputSize);

        // Configure text
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const padding = outputSize * 0.1;
        const maxWidth = outputSize - padding * 2;
        const text = overlayText.trim();

        // Use user-specified font size (percentage of output size, scaled so 100% fills the image)
        let currentFontSize = outputSize * (fontSize / 100);
        ctx.font = `bold ${currentFontSize}px ${fontFamily}`;

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

        // Adjust font size to fit if needed
        let lines = wrapText(text, maxWidth);
        const maxLines = 4;
        while (lines.length > maxLines && currentFontSize > 10) {
          currentFontSize *= 0.9;
          ctx.font = `bold ${currentFontSize}px ${fontFamily}`;
          lines = wrapText(text, maxWidth);
        }

        // If still too many lines, reduce font size more
        while (lines.some(line => ctx.measureText(line).width > maxWidth) && currentFontSize > 10) {
          currentFontSize *= 0.9;
          ctx.font = `bold ${currentFontSize}px ${fontFamily}`;
          lines = wrapText(text, maxWidth);
        }

        // Draw text with stroke for better visibility
        const lineHeight = currentFontSize * 1.2;
        const totalHeight = lines.length * lineHeight;
        const startY = (outputSize - totalHeight) / 2 + lineHeight / 2;

        // Configure stroke for outline effect
        ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
        ctx.lineWidth = currentFontSize * 0.08;
        ctx.lineJoin = "round";
        ctx.miterLimit = 2;
        lines.forEach((line, index) => {
          const y = startY + index * lineHeight;
          // Draw shadow
          ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
          ctx.shadowBlur = currentFontSize * 0.15;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = currentFontSize * 0.05;
          // Draw stroke (outline)
          ctx.strokeText(line, outputSize / 2, y);
          // Reset shadow for fill
          ctx.shadowColor = "transparent";
          // Draw fill
          ctx.fillText(line, outputSize / 2, y);
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
  return <div className="min-h-screen bg-background">
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
              <Input id="imageUrl" type="url" placeholder="https://example.com/image.jpg" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="bg-background/50" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overlayText">Text to place on image (optional)</Label>
              <Input id="overlayText" type="text" placeholder="Your text here..." value={overlayText} onChange={e => setOverlayText(e.target.value)} className="bg-background/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size (%)</Label>
                <Input id="fontSize" type="number" min={10} max={100} value={fontSize} onChange={e => setFontSize(Math.min(100, Math.max(10, Number(e.target.value))))} className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Type</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-primary/20">
                    {fontOptions.map(font => <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button onClick={createIcon} disabled={isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Icon"}
            </Button>

            <canvas ref={canvasRef} className="hidden" />

            {generatedImage && <div className="space-y-4 pt-6 border-t border-primary/20">
              <div className="flex justify-center">
                <img src={generatedImage} alt="Generated icon" className="w-48 h-48 rounded-lg border border-primary/20" />
              </div>
                <Button onClick={downloadImage} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Icon
                </Button>
              </div>}
          </div>

          {/* How to Use Guide */}
          <div className="mt-12 bg-card/50 border border-primary/20 rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold mb-6 text-gradient">
              How to Set Your Project Thumbnail
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <div className="space-y-2">
                <h3 className="text-foreground font-semibold">Step 1: Create your icon</h3>
                <p>Use the generator above to create a 1:1 square PNG icon. Download it as <code className="bg-primary/20 px-2 py-0.5 rounded text-primary">project-icon.png</code></p>
              </div>

              <div className="space-y-2">
                <h3 className="text-foreground font-semibold">Step 2: Place the image</h3>
                <p>Copy <code className="bg-primary/20 px-2 py-0.5 rounded text-primary">project-icon.png</code> into your project's plugin folder:</p>
                <code className="block bg-background/80 border border-primary/20 rounded-lg p-3 text-sm overflow-x-auto">YourProjectName\project-icon.png</code>
                <p className="text-sm">.uefnproject<code className="bg-primary/20 px-1 py-0.5 rounded text-primary">.uplugin</code> file)</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-foreground font-semibold">Step 3: Edit the project file</h3>
                <p>Open <code className="bg-primary/20 px-2 py-0.5 rounded text-primary">YourProjectName.uefnproject</code> with a text editor (located in your base project folder).</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-foreground font-semibold">Step 4: Change the keyArt property</h3>
                <p>Add or update the <code className="bg-primary/20 px-2 py-0.5 rounded text-primary">"keyArt"</code> value with your filename:</p>
                <code className="block bg-background/80 border border-primary/20 rounded-lg p-3 text-sm">
                  "keyArt": "project-icon.png"
                </code>
              </div>

              <div className="mt-6 p-4 bg-primary/5 border border-primary/30 rounded-lg">
                <p className="text-sm">
                  <span className="text-primary font-semibold">Alternative:</span> You can also place thumbnails in a <code className="bg-primary/20 px-1 py-0.5 rounded text-primary">Resources</code> folder (next to Content folder). Just include the path: <code className="bg-primary/20 px-1 py-0.5 rounded text-primary">"keyArt": "Resources/project-icon.png"</code>
                </p>
              </div>

              <a href="https://dev.epicgames.com/community/learning/tutorials/mMPq/fortnite-how-to-set-project-browser-thumbnail" target="_blank" rel="noopener noreferrer" className="inline-block text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
                View original Epic Games tutorial →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default UEFNProjectIconGenerator;