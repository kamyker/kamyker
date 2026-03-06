import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const UefnProfileAverage = () =>
{
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const generateStats = () =>
    {
        if (!input.trim())
        {
            toast.error("Please provide input text");
            return;
        }

        try
        {
            const lines = input.split('\n');
            const dataMap: Record<string, number[]> = {};

            for (const line of lines)
            {
                // 1. Discard all lines that don't have "[VerseProfile]"
                if (!line.includes("[VerseProfile]")) continue;

                // 2. For every line leave only what's after "[VerseProfile] "
                const parts = line.split("[VerseProfile] ");
                if (parts.length < 2) continue;

                const content = parts[1].trim();

                // 3. Split to Name and Time
                // Looking for format: "Name... <Time> ms"
                // Regex to capture Name (lazily) and Time (digits.digits) just before "ms"
                // Note: The example "Character :=  0.041700 ms" might have extra spaces.
                const match = content.match(/^(.*?)\s*(\d+\.\d+)\s*ms$/);

                if (match)
                {
                    const name = match[1].trim();
                    const time = parseFloat(match[2]);

                    if (!dataMap[name])
                    {
                        dataMap[name] = [];
                    }
                    dataMap[name].push(time);
                }
            }

            // 4. Group by name and calculate stats
            const stats = Object.keys(dataMap).map(name =>
            {
                const times = dataMap[name];

                // Sort for median
                times.sort((a, b) => a - b);

                const min = times[0];
                const max = times[times.length - 1];
                const sum = times.reduce((a, b) => a + b, 0);
                const avg = sum / times.length;

                let median = 0;
                if (times.length % 2 === 0)
                {
                    median = (times[times.length / 2 - 1] + times[times.length / 2]) / 2;
                } else
                {
                    median = times[Math.floor(times.length / 2)];
                }

                return {
                    name,
                    avg,
                    min,
                    max,
                    median
                };
            });

            if (stats.length === 0)
            {
                toast.warning("No valid VerseProfile lines found");
                setOutput("");
                return;
            }

            // 5. Output list in a tsv
            // Header: Id \t Name \t Med \t Avg \t Min \t Max
            const header = "Id\tName\tMed\tAvg\tMin\tMax";
            const rows = stats.map((s, index) =>
                `${index + 1}\t${s.name}\t${s.median.toFixed(6)}\t${s.avg.toFixed(6)}\t${s.min.toFixed(6)}\t${s.max.toFixed(6)}`
            );

            // Calculate sums
            const sumMedian = stats.reduce((acc, s) => acc + s.median, 0);
            const sumAvg = stats.reduce((acc, s) => acc + s.avg, 0);
            const sumMin = stats.reduce((acc, s) => acc + s.min, 0);
            const sumMax = stats.reduce((acc, s) => acc + s.max, 0);

            const sumRow = `${stats.length + 1}\tSum\t${sumMedian.toFixed(6)}\t${sumAvg.toFixed(6)}\t${sumMin.toFixed(6)}\t${sumMax.toFixed(6)}`;

            setOutput([header, ...rows, sumRow].join('\n'));
            toast.success("Generated stats successfully!");

        } catch (err)
        {
            console.error(err);
            toast.error("Failed to process input.");
        }
    };

    const copyToClipboard = () =>
    {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
                        <span className="text-gradient glow-text">UEFN Profile Average</span>
                    </h1>
                    <p className="text-muted-foreground text-center mb-12">
                        Calculate statistics from VerseProfile logs
                    </p>

                    <div className="space-y-8 bg-card/50 border border-primary/20 rounded-2xl p-8">
                        <div className="space-y-3">
                            <Label htmlFor="input-box" className="text-lg font-semibold">Input Logs</Label>
                            <Textarea
                                id="input-box"
                                placeholder="Paste your log lines here..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="h-48 resize-none bg-background/50 font-mono text-xs border-primary/20 focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <Button
                            onClick={generateStats}
                            className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                        >
                            Generate
                        </Button>

                        <div className="space-y-3">
                            <Label htmlFor="output-box" className="text-lg font-semibold">Output (TSV)</Label>
                            <div className="relative">
                                <Textarea
                                    id="output-box"
                                    readOnly
                                    value={output}
                                    className="h-64 resize-none bg-background/80 font-mono text-xs border-primary/20 whitespace-pre"
                                />
                                {output && (
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2 hover:bg-primary/20"
                                        onClick={copyToClipboard}
                                    >
                                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {output && (
                            <Button
                                onClick={copyToClipboard}
                                variant="outline"
                                className="w-full border-primary/30 hover:bg-primary/10"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                {copied ? "Copied!" : "Copy to Clipboard"}
                            </Button>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UefnProfileAverage;
