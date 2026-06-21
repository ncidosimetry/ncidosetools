import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Engine from "./pages/Engine";
import Protocols from "./pages/Protocols";
import Documentation from "./pages/Documentation";
import Research from "./pages/Research";
import Researchers from "./pages/Researchers";
import Literature from "./pages/Literature";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vendors" element={<Engine />} />
            <Route path="/tools" element={<Protocols />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/researchers" element={<Researchers />} />
            <Route path="/literature" element={<Literature />} />
            <Route path="/literature/:toolId" element={<Literature />} />
            <Route path="/resources" element={<Research />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
