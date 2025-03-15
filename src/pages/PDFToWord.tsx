
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { convertPDFToFormat } from "@/utils/pdfUtils";

const PDFToWord = () => {
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
        description: "Your Word document will be ready for download shortly",
      });
      
      const fileName = await convertPDFToFormat(file, "docx");
      
      toast({
        title: "PDF converted successfully",
        description: `Your Word document "${fileName}" has been downloaded`,
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
      title="PDF to Word"
      description="Easily convert your PDF files into easy to edit DOC and DOCX documents"
      icon={<FileText className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to convert to Word format. The converted document will maintain the original formatting and be ready for editing in Microsoft Word or any other word processor.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={20}
          className="mb-6"
          acceptedFileTypes={[".pdf"]}
        />
        
        {file && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleConvert} 
              disabled={isProcessing}
            >
              {isProcessing ? "Converting..." : "Convert to Word"}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFToWord;
