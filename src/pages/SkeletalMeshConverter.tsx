import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const SkeletalMeshConverter = () =>
{
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const convertInput = () =>
    {
        if (!input.trim())
        {
            toast.error("Please provide input text");
            return;
        }

        try
        {
            const data: Record<string, Record<string, string>> = {};

            // Improved regex:
            // 1. Allows spaces around =
            // 2. key group: ([a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)
            // 3. value group: captures (...) OR "..." OR anything until comma
            const regex = /([a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)\s*=\s*((?:\([^)]*\)|"[^"]*"|[^,])+)/g;
            let match;

            while ((match = regex.exec(input)) !== null)
            {
                const fullKey = match[1];
                let value = match[2];

                const keyParts = fullKey.split('.');
                const mainKey = keyParts[0];
                const subKey = keyParts[1];

                // Remove surrounding quotes
                value = value.replace(/^"|"$/g, '');

                if (!data[mainKey]) data[mainKey] = {};
                data[mainKey][subKey] = value;
            }

            const lines: string[] = [];

            const formatTexture = (val: string) =>
            {
                // Remove all backslashes first (fixes 'Texture\' issue)
                let path = val.replace(/\\/g, '');

                // Extract from single quotes if present (e.g. 'Path')
                if (path.includes("'"))
                {
                    const match = path.match(/'([^']+)'/);
                    if (match) path = match[1];
                }

                // Remove /Game/ prefix
                path = path.replace(/^\/?Game\//, '');

                // Replace slashes with dots
                const dotPath = path.replace(/\//g, '.');

                // Handle double filename at the end (e.g. TX_Name.TX_Name -> TX_Name)
                const pathParts = dotPath.split('.');
                if (pathParts.length >= 2 && pathParts[pathParts.length - 1] === pathParts[pathParts.length - 2])
                {
                    return pathParts.slice(0, -1).join('.');
                }
                return dotPath;
            };

            const formatColor = (val: string) =>
            {
                // Example: (R=-414.519501,G=-229.157791,B=-292.981567,A=1.000000)
                const rMatch = val.match(/R=([^,)]+)/);
                const gMatch = val.match(/G=([^,)]+)/);
                const bMatch = val.match(/B=([^,)]+)/);

                if (rMatch && gMatch && bMatch)
                {
                    // Use index 1 for all matches since we are running 3 separate regex checks
                    return `color{R := ${rMatch[1]},G := ${gMatch[1]},B := ${bMatch[1]}}`;
                }
                return val;
            };

            const keysToProcess = [
                { key: 'StartFrame', type: 'float' },
                { key: 'EndFrame', type: 'float' },
                { key: 'SampleRate', type: 'float' },
                { key: 'BoneWeightsRowsPerFrame', type: 'float' },
                { key: 'MinBBox', type: 'color' },
                { key: 'NumBones', type: 'float' },
                { key: 'NumFrames', type: 'float' },
                { key: 'SizeBBox', type: 'color' },
                { key: 'BonePositionTexture', type: 'texture' },
                { key: 'BoneRotationTexture', type: 'texture' },
                { key: 'BoneWeightsTexture', type: 'texture' },
            ];

            keysToProcess.forEach(({ key, type }) =>
            {
                if (data[key] && data[key].Override === 'True')
                {
                    let value = data[key].Value;

                    // Skip if value is missing/undefined
                    if (value === undefined) return;

                    if (type === 'texture') value = formatTexture(value);
                    else if (type === 'color') value = formatColor(value);

                    lines.push(`    ${key}<override> :${type}= ${value}`);
                }
            });

            if (lines.length === 0)
            {
                toast.warning("No matching override properties found in input");
                setOutput("");
            } else
            {
                setOutput(lines.join('\n'));
                toast.success("Converted successfully!");
            }
        } catch (err)
        {
            console.error(err);
            toast.error("Failed to convert input. Please check the format.");
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
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
                        <span className="text-gradient glow-text">Skeletal Mesh Converter</span>
                    </h1>
                    <p className="text-muted-foreground text-center mb-12">
                        Convert UE skeletal mesh property overrides to Verse-ready format
                    </p>

                    <div className="space-y-8 bg-card/50 border border-primary/20 rounded-2xl p-8">
                        <div className="space-y-3">
                            <Label htmlFor="input-box" className="text-lg font-semibold">Input Data</Label>
                            <Textarea
                                id="input-box"
                                placeholder="Paste your comma-separated overrides here..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="h-48 resize-none bg-background/50 font-mono text-sm border-primary/20 focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <Button
                            onClick={convertInput}
                            className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                        >
                            Convert
                        </Button>

                        <div className="space-y-3">
                            <Label htmlFor="output-box" className="text-lg font-semibold">Output (Verse Format)</Label>
                            <div className="relative">
                                <Textarea
                                    id="output-box"
                                    readOnly
                                    value={output}
                                    className="h-64 resize-none bg-background/80 font-mono text-sm border-primary/20"
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

export default SkeletalMeshConverter;
