
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileText, Info } from "lucide-react";
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
        title: "PDF conversion completed",
        description: `The demonstration file "${fileName}" has been downloaded`,
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
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertDescription>
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="mb-2">
                  Select a PDF file to convert to Word format. The converted document will maintain the original formatting 
                  and be ready for editing in Microsoft Word or any other word processor.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Adobe PDF Services API:</strong> In a production environment, this tool would utilize the 
                  Adobe PDF Services API which provides high-quality conversion from PDF to Word documents 
                  with superior accuracy in preserving layouts, fonts, tables, and images.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Implementation details:</strong> This conversion would be implemented server-side using:
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 mb-2">
                  <li>Adobe PDF Services API for processing large documents with complex formatting</li>
                  <li>PDFTron for accurate text extraction and layout preservation</li>
                  <li>Aspose PDF for table structure recognition and conversion</li>
                  <li>Microsoft Graph API for interoperability with Office formats</li>
                </ul>
              </div>
            </div>
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
              className="bg-blue-600 hover:bg-blue-700"
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
