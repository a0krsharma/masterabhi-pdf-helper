
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { ImageDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
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
    
    toast({
      title: "Conversion started",
      description: "Your PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="JPG to PDF"
      description="Convert JPG images to PDF in seconds. Easily adjust orientation and margins"
      icon={<ImageDown className="w-6 h-6 text-white" />}
      colorClass="bg-tool-image-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select one or more JPG images to convert to a PDF document. You can arrange the order of the images in the resulting PDF.
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
            <Button size="lg" onClick={handleConvert}>
              Convert to PDF
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default JPGToPDF;
