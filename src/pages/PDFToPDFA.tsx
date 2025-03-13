
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileArchive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const PDFToPDFA = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleConvert = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to convert",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Conversion started",
      description: "Your PDF/A document will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="PDF to PDF/A"
      description="Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving"
      icon={<FileArchive className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to convert to the PDF/A format. PDF/A is designed for long-term archiving and ensures that the document will display consistently in the future.
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
            <Button size="lg" onClick={handleConvert}>
              Convert to PDF/A
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFToPDFA;
