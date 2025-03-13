
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const RotatePDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleRotate = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to rotate",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Rotation started",
      description: "Your rotated PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="Rotate PDF"
      description="Rotate your PDFs the way you need them"
      icon={<RotateCw className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-edit"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to rotate its pages. You can rotate all pages or select individual pages to rotate in different directions.
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
            <Button size="lg" onClick={handleRotate}>
              Rotate PDF
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default RotatePDF;
