import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UEFNProjectIconGenerator from "./pages/UEFNProjectIconGenerator";
import SkeletalMeshConverter from "./pages/SkeletalMeshConverter";
import UefnProfileAverage from "./pages/UefnProfileAverage";
import VerseUpdates from "./pages/VerseUpdates";
import { BASE_PATH } from "./lib/basePath";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={BASE_PATH || undefined}>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/uefn-project-icon-generator" element={<UEFNProjectIconGenerator />} />
                    <Route path="/tool-convert-skeletal-mesh" element={<SkeletalMeshConverter />} />
                    <Route path="/uefn-profile-average" element={<UefnProfileAverage />} />
                    <Route path="/verse-updates" element={<VerseUpdates />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
