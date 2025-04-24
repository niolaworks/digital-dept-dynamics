
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SidebarProvider } from "@/components/layout/SidebarProvider";
import AppLayout from "@/components/layout/AppLayout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import LogisticsPage from "@/pages/LogisticsPage";
import LogisticsPickingList from "@/pages/logistics/PickingListForm";
import ViewPickingLists from "@/pages/logistics/ViewPickingLists";
import LogisticsDispatchNote from "@/pages/logistics/DispatchNoteForm";
import ProductionPage from "@/pages/ProductionPage";
import DowntimeTrackingForm from "@/pages/production/DowntimeTrackingForm";
import ProductionQualityCheck from "@/pages/production/QualityCheckForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
              <Route path="logistics" element={<LogisticsPage />} />
              <Route path="logistics/picking-list" element={<LogisticsPickingList />} />
              <Route path="logistics/picking-lists" element={<ViewPickingLists />} />
              <Route path="logistics/dispatch-note" element={<LogisticsDispatchNote />} />
              <Route path="production" element={<ProductionPage />} />
              <Route path="production/downtime" element={<DowntimeTrackingForm />} />
              <Route path="production/quality-check" element={<ProductionQualityCheck />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
