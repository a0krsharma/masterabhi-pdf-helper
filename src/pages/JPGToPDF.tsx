
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { ImageDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleConvert = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one image file to convert",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      toast({
        title: "Conversion completed",
        description: `Your PDF has been generated from ${files.length} image${files.length > 1 ? 's' : ''}`,
      });
      setIsProcessing(false);
    }, 2000);
  };
  
  return (
    <ToolLayout
      title="JPG to PDF"
      description="Convert JPG images to PDF in seconds. Easily adjust orientation and margins"
      icon={<ImageDown className="w-6 h-6 text-white" />}
      colorClass="bg-tool-image-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertDescription>
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="mb-2">
                  Select one or more JPG images to convert to a PDF document. You can arrange the order of the images in the resulting PDF.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Image Processing:</strong> In a production environment, this tool would utilize 
                  advanced image processing libraries to optimize image quality and compression in the PDF output.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Implementation details:</strong> This conversion would be implemented using:
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 mb-2">
                  <li>PDF-lib for PDF generation with image embedding</li>
                  <li>Sharp for image preprocessing and optimization</li>
                  <li>EXIF data preservation for maintaining image metadata</li>
                  <li>Intelligent layout algorithms for multi-image arrangement</li>
                  <li>OCR capabilities for making image text searchable</li>
                </ul>
              </div>
            </div>
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={setFiles}
          multiple={true}
          maxSize={20}
          className="mb-6"
          acceptedFileTypes={[".jpg", ".jpeg", ".png"]}
        />
        
        {files.length > 0 && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleConvert}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? "Converting..." : "Convert to PDF"}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default JPGToPDF;
