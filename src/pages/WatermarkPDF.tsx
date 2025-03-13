
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { Stamp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const WatermarkPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleWatermark = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to watermark",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Watermarking started",
      description: "Your watermarked PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="Watermark PDF"
      description="Stamp an image or text over your PDF in seconds"
      icon={<Stamp className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-edit"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to add a watermark. You can add text or image watermarks with customizable opacity and positioning.
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
            <Button size="lg" onClick={handleWatermark}>
              Add Watermark
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default WatermarkPDF;
