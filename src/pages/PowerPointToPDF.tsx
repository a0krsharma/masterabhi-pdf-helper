
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { Presentation, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { convertPDFToFormat } from "@/utils/pdfUtils";

const PowerPointToPDF = () => {
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
        description: "Please select a PowerPoint presentation to convert",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Conversion started",
        description: "Your PDF document will be ready for download shortly",
      });
      
      // In a real implementation, this would use a different function specific to Office conversions
      // For demo purposes, we'll reuse the existing function with a placeholder
      const fileName = await convertPDFToFormat(file, "pdf");
      
      toast({
        title: "Conversion completed",
        description: `The demonstration file "${fileName}" has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error converting file",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <ToolLayout
      title="PowerPoint to PDF"
      description="Make PPT and PPTX slideshows easy to view by converting them to PDF"
      icon={<Presentation className="w-6 h-6 text-white" />}
      colorClass="bg-tool-office-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertDescription>
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="mb-2">
                  Select a PowerPoint presentation (.ppt or .pptx) to convert to PDF. Each slide will be converted to a PDF page with the original formatting maintained.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Demo notice:</strong> This is a demonstration version. In a production environment, 
                  this conversion would be handled by a server-side API (like Microsoft Graph API, Aspose Slides, or PDFTron) 
                  that produces high-quality PDF documents from PowerPoint files.
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={20}
          className="mb-6"
          acceptedFileTypes={[".ppt", ".pptx"]}
        />
        
        {file && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleConvert}
              disabled={isProcessing}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isProcessing ? "Converting..." : "Convert to PDF"}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PowerPointToPDF;
