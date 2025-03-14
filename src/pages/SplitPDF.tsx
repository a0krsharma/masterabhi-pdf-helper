
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { splitPDF } from "@/utils/pdfUtils";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitMethod, setSplitMethod] = useState<"all" | "range" | "extract">("all");
  const [pageRange, setPageRange] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleSplitPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to split",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const fileNames = await splitPDF(file, splitMethod, pageRange);
      
      toast({
        title: "PDF split successfully",
        description: `Your split PDF files (${fileNames.length}) are ready for download`,
      });
    } catch (error) {
      toast({
        title: "Error splitting PDF",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <ToolLayout
      title="Split PDF"
      description="Extract pages or split your PDF into multiple files"
      icon={<Scissors className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-split"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file and choose how you want to split it. You can extract specific pages or split it into multiple documents.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={20}
          className="mb-6"
        />
        
        {file && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Split Options</h3>
              <Accordion type="single" collapsible defaultValue="all">
                <AccordionItem value="all">
                  <AccordionTrigger>
                    <div className="flex items-center" onClick={() => setSplitMethod("all")}>
                      <input 
                        type="radio" 
                        checked={splitMethod === "all"} 
                        className="mr-2" 
                        readOnly 
                      />
                      Split by all pages
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    Extract each page into a separate PDF file.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="range">
                  <AccordionTrigger>
                    <div className="flex items-center" onClick={() => setSplitMethod("range")}>
                      <input 
                        type="radio" 
                        checked={splitMethod === "range"} 
                        className="mr-2" 
                        readOnly 
                      />
                      Split by page range
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    Specify page ranges to split into separate PDF files.
                    <div className="mt-2">
                      <input 
                        type="text" 
                        placeholder="e.g. 1-3,4-8,9-12" 
                        className="w-full p-2 border rounded"
                        value={pageRange}
                        onChange={(e) => setPageRange(e.target.value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="extract">
                  <AccordionTrigger>
                    <div className="flex items-center" onClick={() => setSplitMethod("extract")}>
                      <input 
                        type="radio" 
                        checked={splitMethod === "extract"} 
                        className="mr-2" 
                        readOnly 
                      />
                      Extract specific pages
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    Select specific pages to extract into a new PDF document.
                    <div className="mt-2">
                      <input 
                        type="text" 
                        placeholder="e.g. 1,3,5,7-9" 
                        className="w-full p-2 border rounded"
                        value={pageRange}
                        onChange={(e) => setPageRange(e.target.value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleSplitPDF}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Split PDF"}
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default SplitPDF;
