
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const OCRPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleOCR = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to process with OCR",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "OCR processing started",
      description: "Your searchable PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="OCR PDF"
      description="Easily convert scanned PDF into searchable and selectable documents"
      icon={<FileSearch className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-utility"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a scanned PDF file to apply Optical Character Recognition (OCR). The process will make the text in your PDF searchable and selectable.
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
            <Button size="lg" onClick={handleOCR}>
              Apply OCR
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default OCRPDF;
