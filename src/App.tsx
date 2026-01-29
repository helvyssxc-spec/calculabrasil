import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JurosCompostos from "./pages/JurosCompostos";
import Emprestimo from "./pages/Emprestimo";
import Financiamento from "./pages/Financiamento";
import SalarioLiquido from "./pages/SalarioLiquido";
import Rescisao from "./pages/Rescisao";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Privacidade from "./pages/Privacidade";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/juros-compostos" element={<JurosCompostos />} />
          <Route path="/emprestimo" element={<Emprestimo />} />
          <Route path="/financiamento" element={<Financiamento />} />
          <Route path="/salario-liquido" element={<SalarioLiquido />} />
          <Route path="/rescisao" element={<Rescisao />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
