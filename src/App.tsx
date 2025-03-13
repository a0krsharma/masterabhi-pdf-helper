
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MergePDF from "./pages/MergePDF";
import SplitPDF from "./pages/SplitPDF";
import CompressPDF from "./pages/CompressPDF";
import ConvertPDF from "./pages/ConvertPDF";
import EditPDF from "./pages/EditPDF";
import SignPDF from "./pages/SignPDF";

// Create new pages for additional tools
import PDFToWord from "./pages/PDFToWord";
import PDFToPowerPoint from "./pages/PDFToPowerPoint";
import PDFToExcel from "./pages/PDFToExcel";
import WordToPDF from "./pages/WordToPDF";
import PowerPointToPDF from "./pages/PowerPointToPDF";
import ExcelToPDF from "./pages/ExcelToPDF";
import PDFToJPG from "./pages/PDFToJPG";
import JPGToPDF from "./pages/JPGToPDF";
import WatermarkPDF from "./pages/WatermarkPDF";
import RotatePDF from "./pages/RotatePDF";
import HTMLToPDF from "./pages/HTMLToPDF";
import UnlockPDF from "./pages/UnlockPDF";
import ProtectPDF from "./pages/ProtectPDF";
import OrganizePDF from "./pages/OrganizePDF";
import PDFToPDFA from "./pages/PDFToPDFA";
import RepairPDF from "./pages/RepairPDF";
import PageNumbers from "./pages/PageNumbers";
import ScanToPDF from "./pages/ScanToPDF";
import OCRPDF from "./pages/OCRPDF";
import ComparePDF from "./pages/ComparePDF";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/split-pdf" element={<SplitPDF />} />
          <Route path="/compress-pdf" element={<CompressPDF />} />
          <Route path="/convert-pdf" element={<ConvertPDF />} />
          <Route path="/edit-pdf" element={<EditPDF />} />
          <Route path="/sign-pdf" element={<SignPDF />} />
          
          {/* New tool routes */}
          <Route path="/pdf-to-word" element={<PDFToWord />} />
          <Route path="/pdf-to-powerpoint" element={<PDFToPowerPoint />} />
          <Route path="/pdf-to-excel" element={<PDFToExcel />} />
          <Route path="/word-to-pdf" element={<WordToPDF />} />
          <Route path="/powerpoint-to-pdf" element={<PowerPointToPDF />} />
          <Route path="/excel-to-pdf" element={<ExcelToPDF />} />
          <Route path="/pdf-to-jpg" element={<PDFToJPG />} />
          <Route path="/jpg-to-pdf" element={<JPGToPDF />} />
          <Route path="/watermark-pdf" element={<WatermarkPDF />} />
          <Route path="/rotate-pdf" element={<RotatePDF />} />
          <Route path="/html-to-pdf" element={<HTMLToPDF />} />
          <Route path="/unlock-pdf" element={<UnlockPDF />} />
          <Route path="/protect-pdf" element={<ProtectPDF />} />
          <Route path="/organize-pdf" element={<OrganizePDF />} />
          <Route path="/pdf-to-pdfa" element={<PDFToPDFA />} />
          <Route path="/repair-pdf" element={<RepairPDF />} />
          <Route path="/page-numbers" element={<PageNumbers />} />
          <Route path="/scan-to-pdf" element={<ScanToPDF />} />
          <Route path="/ocr-pdf" element={<OCRPDF />} />
          <Route path="/compare-pdf" element={<ComparePDF />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
