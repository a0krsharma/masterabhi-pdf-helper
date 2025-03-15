
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { convertPDFToFormat } from "@/utils/pdfUtils";

const PDFToPowerPoint = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleConvert = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to convert",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Conversion started",
        description: "Your PowerPoint presentation will be ready for download shortly",
      });
      
      const fileName = await convertPDFToFormat(file, "pptx");
      
      toast({
        title: "PDF converted successfully",
        description: `Your PowerPoint presentation "${fileName}" has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error converting PDF",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <ToolLayout
      title="PDF to PowerPoint"
      description="Turn your PDF files into easy to edit PPT and PPTX slideshows"
      icon={<Presentation className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to convert to a PowerPoint presentation. The converted presentation will maintain the original layout and be ready for editing.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={20}
          className="mb-6"
        />
        
        {file && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleConvert}
              disabled={isProcessing}
            >
              {isProcessing ? "Converting..." : "Convert to PowerPoint"}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFToPowerPoint;
