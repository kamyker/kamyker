import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Github, Key, Info, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { diffLines } from "diff";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
}

interface DiffLine {
  type: 'added' | 'removed' | 'context' | 'info';
  content: string;
  oldLine?: number;
  newLine?: number;
}

const DIGEST_FILES = [
  { name: "Fortnite.digest.verse", path: "Modules/FortniteGame/Fortnite/Fortnite.digest.verse", id: "fortnite" },
  { name: "Verse.digest.verse", path: "Modules/FortniteGame/Verse/Verse.digest.verse", id: "verse" },
  { name: "UnrealEngine.digest.verse", path: "Modules/FortniteGame/UnrealEngine/UnrealEngine.digest.verse", id: "unreal" },
];


interface FileState {
  diff: DiffLine[] | null;
  isLoading: boolean;
  error: string | null;
  commits: Commit[];
  hasStarted: boolean;
}

const VerseUpdates = () => {
  const [githubToken, setGithubToken] = useState<string>(localStorage.getItem("github_token") || "");
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [tempToken, setTempToken] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  
  const [filesData, setFilesData] = useState<Record<string, FileState>>(
    DIGEST_FILES.reduce((acc, file) => {
      acc[file.id] = {
        diff: null,
        isLoading: false,
        error: null,
        commits: [],
        hasStarted: false,
      };
      return acc;
    }, {} as Record<string, FileState>)
  );

  // Load cache on mount
  useEffect(() => {
    const newData = { ...filesData };
    let hasCache = false;

    DIGEST_FILES.forEach(file => {
      const CACHE_KEY = `verse_updates_cache_v5_${file.path.replace(/\//g, '_')}`;
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        newData[file.id] = {
          ...newData[file.id],
          diff: parsed.diff,
          commits: parsed.commits,
          hasStarted: true
        };
        hasCache = true;
      }
    });

    if (hasCache) {
      setFilesData(newData);
    }
  }, []);

  const fetchDiff = async (fileId: string) => {
    const file = DIGEST_FILES.find(f => f.id === fileId);
    if (!file || filesData[fileId].isLoading) return;

    setFilesData(prev => ({
      ...prev,
      [fileId]: { ...prev[fileId], isLoading: true, error: null }
    }));

    try {
      const CACHE_KEY = `verse_updates_cache_v5_${file.path.replace(/\//g, '_')}`;
      const CACHE_TTL = 1000 * 60 * 15; // 15 minutes
      
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setFilesData(prev => ({
            ...prev,
            [fileId]: { ...prev[fileId], diff: parsed.diff, commits: parsed.commits, isLoading: false, hasStarted: true }
          }));
          return;
        }
      }

      const authFetch = async (url: string, options: RequestInit = {}) => {
        const headers = { ...options.headers } as Record<string, string>;
        if (githubToken) {
          headers["Authorization"] = `token ${githubToken}`;
        }
        const response = await fetch(url, { ...options, headers });
        if (response.status === 403 && response.headers.get("X-RateLimit-Remaining") === "0") {
          setIsRateLimited(true);
          throw new Error("GitHub API rate limit exceeded.");
        }
        return response;
      };

      const commitsResponse = await authFetch(
        `https://api.github.com/repos/vz-creates/uefn/commits?path=${file.path}&per_page=2`
      );
      
      if (!commitsResponse.ok) {
        if (commitsResponse.status === 403) {
          setIsRateLimited(true);
          throw new Error("GitHub API rate limit exceeded.");
        }
        throw new Error(`Commits fetch failed: ${commitsResponse.statusText}`);
      }
      
      const commitsData = await commitsResponse.json();
      
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.commits[0]?.sha === commitsData[0]?.sha) {
          parsed.timestamp = Date.now();
          localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
          setFilesData(prev => ({
            ...prev,
            [fileId]: { ...prev[fileId], diff: parsed.diff, commits: parsed.commits, isLoading: false, hasStarted: true }
          }));
          return;
        }
      }

      const headSha = commitsData[0].sha;
      const baseSha = commitsData[1].sha;

      const fetchFileContent = async (sha: string) => {
        const response = await authFetch(`https://api.github.com/repos/vz-creates/uefn/contents/${file.path}?ref=${sha}`);
        if (!response.ok) throw new Error(`Content fetch failed`);
        const data = await response.json();
        return decodeURIComponent(escape(window.atob(data.content.replace(/\s/g, ''))));
      }

      const [headText, baseText] = await Promise.all([
        fetchFileContent(headSha),
        fetchFileContent(baseSha)
      ]);

      const changes = diffLines(baseText, headText, { ignoreWhitespace: true });
      let allDiffLines: DiffLine[] = [];
      let oldLineNum = 1;
      let newLineNum = 1;

      changes.forEach((part) => {
        const lines = part.value.split('\n');
        if (lines[lines.length - 1] === '') lines.pop(); // Remove trailing empty line from split

        lines.forEach((lineText) => {
          if (part.added) {
            allDiffLines.push({ type: 'added', content: lineText, newLine: newLineNum++ });
          } else if (part.removed) {
            allDiffLines.push({ type: 'removed', content: lineText, oldLine: oldLineNum++ });
          } else {
            allDiffLines.push({ type: 'context', content: lineText, oldLine: oldLineNum++, newLine: newLineNum++ });
          }
        });
      });

      // Filter out moved lines (lines that were added in one place and removed in another)
      const addedLinesMap = new Map<string, number>();
      const removedLinesMap = new Map<string, number>();
      
      allDiffLines.forEach(l => {
        const content = l.content.trim();
        // Ignore generic lines or attributes to avoid false movement matches
        const isAttribute = content.startsWith('@');
        const isUsing = content.startsWith('using {') || content.startsWith('import ');
        
        if (!isAttribute && !isUsing && content.length >= 15) {
          if (l.type === 'added') addedLinesMap.set(content, (addedLinesMap.get(content) || 0) + 1);
          if (l.type === 'removed') removedLinesMap.set(content, (removedLinesMap.get(content) || 0) + 1);
        }
      });

      const movedLines = new Map<string, number>();
      for (const [content, addCount] of addedLinesMap.entries()) {
        const remCount = removedLinesMap.get(content) || 0;
        const movedCount = Math.min(addCount, remCount);
        if (movedCount > 0) movedLines.set(content, movedCount);
      }

      const addedMoved = new Map(movedLines);
      const removedMoved = new Map(movedLines);

      // Convert moved lines into context so they don't show up as newly added/removed
      allDiffLines.forEach(line => {
        const content = line.content.trim();
        if (line.type === 'added' && addedMoved.get(content)! > 0) {
          addedMoved.set(content, addedMoved.get(content)! - 1);
          line.type = 'context';
        } else if (line.type === 'removed' && removedMoved.get(content)! > 0) {
          removedMoved.set(content, removedMoved.get(content)! - 1);
          line.type = 'context';
        }
      });

      const contextRadius = 3;
      const showIndices = new Set<number>();
      allDiffLines.forEach((line, idx) => {
        if (line.type === 'added' || line.type === 'removed') {
          for (let r = -contextRadius; r <= contextRadius; r++) {
            const targetIdx = idx + r;
            if (targetIdx >= 0 && targetIdx < allDiffLines.length) showIndices.add(targetIdx);
          }
        }
      });

      const finalLines: DiffLine[] = [];
      let lastIdx = -1;
      allDiffLines.forEach((line, idx) => {
        if (showIndices.has(idx)) {
          if (lastIdx !== -1 && idx !== lastIdx + 1) {
            finalLines.push({ type: 'info', content: `@@ -${line.oldLine || '...'},+${line.newLine || '...'} @@` });
          }
          finalLines.push(line);
          lastIdx = idx;
        }
      });

      const newDiff = finalLines.length > 0 ? finalLines : null;
      
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        commits: commitsData,
        diff: newDiff
      }));

      setFilesData(prev => ({
        ...prev,
        [fileId]: { ...prev[fileId], diff: newDiff, commits: commitsData, isLoading: false, hasStarted: true }
      }));

    } catch (err: any) {
      setFilesData(prev => ({
        ...prev,
        [fileId]: { ...prev[fileId], isLoading: false, error: err.message }
      }));
    }
  };

  const handleSaveToken = () => {
    if (tempToken.trim()) {
      localStorage.setItem("github_token", tempToken.trim());
      setGithubToken(tempToken.trim());
      setIsAuthDialogOpen(false);
      setIsRateLimited(false);
      toast.success("GitHub token saved!");
    }
  };

  const handleClearToken = () => {
    localStorage.removeItem("github_token");
    setGithubToken("");
    setIsRateLimited(false);
    toast.info("GitHub token removed.");
  };

  const handleAccordionChange = (ids: string[]) => {
    ids.forEach(id => {
      if (!filesData[id].hasStarted) {
        fetchDiff(id);
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="w-full px-4 md:px-8 pt-32 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 px-2">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient glow-text italic">
                Verse API Updates
              </h1>
              <p className="text-muted-foreground text-lg">
                Track changes in UEFN Verse digest files across versions.
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-primary/80 bg-primary/5 w-fit px-3 py-1 rounded-full border border-primary/10">
                <Info className="w-3.5 h-3.5" />
                <span>Special thanks to <a href="https://github.com/vz-creates" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">vz-creates</a> for the repository.</span>
                <span className="text-muted-foreground/30 px-1">|</span>
                <a href="https://x.com/vz_creates" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span>@vz_creates</span>
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {githubToken ? (
                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-xs font-medium text-primary">Authenticated</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] hover:text-destructive" onClick={handleClearToken}>Log Out</Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all font-display uppercase tracking-widest text-[10px]"
                  onClick={() => setIsAuthDialogOpen(true)}
                >
                  <Github className="w-4 h-4" />
                  Increase API Limit
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Accordion type="multiple" className="w-full space-y-4 border-none" onValueChange={handleAccordionChange}>
              {DIGEST_FILES.map((file) => {
                const data = filesData[file.id];
                const changesCount = data.diff?.filter(l => l.type !== 'context' && l.type !== 'info').length || 0;
                
                return (
                  <AccordionItem 
                    key={file.id} 
                    value={file.id} 
                    className="border-none bg-card border border-primary/20 rounded-lg overflow-hidden transition-all hover:border-primary/40"
                  >
                    <AccordionTrigger className="hover:no-underline px-4 py-4 group">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="font-display font-bold uppercase tracking-wide">{file.name}</span>
                          {data.isLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                        </div>
                        <div className="flex items-center gap-3">
                          {data.error && <span className="text-[10px] text-destructive font-bold uppercase tracking-tighter bg-destructive/10 px-2 py-0.5 rounded">Error</span>}
                          {!data.hasStarted && !data.isLoading && <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-primary/5 px-2 py-0.5 rounded">Click to fetch</span>}
                          {data.hasStarted && !data.isLoading && (
                            <span className={cn(
                              "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold",
                              changesCount > 0 ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                            )}>
                              {changesCount > 0 ? `${changesCount} changes` : "No changes"}
                            </span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border-t border-primary/10">
                      <div className="p-0">
                        {data.error && (
                          <div className="p-8 text-center text-destructive bg-destructive/5 text-sm flex flex-col items-center gap-4">
                            <Info className="w-6 h-6" />
                            <p>{data.error}</p>
                            <Button variant="outline" size="sm" onClick={() => fetchDiff(file.id)} className="gap-2">
                              <Loader2 className="w-3 h-3" /> Retry Fetch
                            </Button>
                          </div>
                        )}

                        {!data.isLoading && data.diff && (
                          <>
                            {data.commits.length >= 2 && (
                              <div className="grid grid-cols-2 gap-px bg-primary/10 border-b border-primary/20">
                                <div className="bg-background/40 p-3">
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-1">Latest Version: {data.commits[0].sha.substring(0, 7)}</p>
                                  <p className="text-xs font-medium truncate">{data.commits[0].commit.message}</p>
                                  <p className="text-[9px] text-muted-foreground mt-1">{new Date(data.commits[0].commit.author.date).toLocaleString()}</p>
                                </div>
                                <div className="bg-background/40 p-3 opacity-70">
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-1">Previous Version: {data.commits[1].sha.substring(0, 7)}</p>
                                  <p className="text-xs font-medium truncate">{data.commits[1].commit.message}</p>
                                  <p className="text-[9px] text-muted-foreground mt-1">{new Date(data.commits[1].commit.author.date).toLocaleString()}</p>
                                </div>
                              </div>
                            )}
                            <div className="overflow-x-auto max-h-[1200px] overflow-y-auto">
                              <table className="w-full border-collapse font-mono text-[13px]">
                                <tbody>
                                  {data.diff.map((line, i) => {
                                    let rowClass = "group ";
                                    let sign = " ";
                                    if (line.type === 'added') {
                                      rowClass += "bg-green-500/10 text-green-400";
                                      sign = "+";
                                    } else if (line.type === 'removed') {
                                      rowClass += "bg-red-500/10 text-red-400";
                                      sign = "-";
                                    } else if (line.type === 'info') {
                                      rowClass += "bg-blue-500/5 text-blue-400/60";
                                      sign = " ";
                                    } else {
                                      rowClass += "text-muted-foreground/80";
                                    }

                                    return (
                                      <tr key={i} className={rowClass}>
                                        <td className="w-10 px-2 text-right border-r border-primary/10 select-none opacity-50 text-[10px] py-0.5 bg-background/50">
                                          {line.oldLine || ""}
                                        </td>
                                        <td className="w-10 px-2 text-right border-r border-primary/10 select-none opacity-50 text-[10px] py-0.5 bg-background/50">
                                          {line.newLine || ""}
                                        </td>
                                        <td className="w-6 px-1 text-center select-none opacity-50 font-bold">
                                          {line.type === 'info' ? "" : sign}
                                        </td>
                                        <td className="px-3 py-0.5 whitespace-pre-wrap break-all leading-relaxed">
                                          {line.content}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>

                              {(data.diff.length === 0) && (
                                <div className="p-10 text-center text-muted-foreground text-sm">
                                  No changes detected between these versions.
                                </div>
                              )}
                            </div>
                          </>
                        )}


                        {data.isLoading && (
                          <div className="p-16 flex flex-col items-center justify-center bg-muted/5">
                            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                            <p className="text-sm text-muted-foreground animate-pulse font-display uppercase tracking-widest">Decoding Verse Registry...</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {isRateLimited && !githubToken && (
            <div className="mt-12 bg-destructive/10 border border-destructive/20 rounded-lg p-10 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-destructive/20 p-4 rounded-full mb-6">
                <Info className="w-8 h-8 text-destructive" />
              </div>
              <p className="text-xl text-foreground mb-2 font-bold font-display">
                Rate Limit Exceeded
              </p>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                GitHub limits unauthorized requests. Login with a Personal Access Token to continue tracking updates.
              </p>
              <Button onClick={() => setIsAuthDialogOpen(true)} className="gap-2">
                <Github className="w-4 h-4" />
                Authenticate Now
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-primary/20 animate-in fade-in zoom-in duration-300">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display uppercase tracking-wider">
              <Github className="w-5 h-5 text-primary" />
              GitHub Auth
            </DialogTitle>
            <DialogDescription>
              Increase your API rate limit from 60 to 5,000 requests per hour.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                <label className="font-medium text-foreground">Personal Access Token</label>
                <a 
                  href="https://github.com/settings/tokens/new?description=Verse%20Updates%20Tool&scopes=repo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  Create Token <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative">
                <Key className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="pl-10 bg-background/50 border-primary/20 focus-visible:ring-primary"
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                />
              </div>
              <p className="text-[10px] text-muted-foreground italic">
                * Stored only in your local browser.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAuthDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveToken} disabled={!tempToken.trim()} className="shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              Authenticate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerseUpdates;
