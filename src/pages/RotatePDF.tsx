
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { rotatePDF } from "@/utils/pdfUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RotatePDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<string>("90");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleRotate = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to rotate",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Rotation started",
        description: "Your rotated PDF will be ready for download shortly",
      });
      
      const fileName = await rotatePDF(file, parseInt(rotation));
      
      toast({
        title: "PDF rotated successfully",
        description: `Your rotated PDF "${fileName}" has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error rotating PDF",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Rotation Angle</label>
              <Select value={rotation} onValueChange={setRotation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select rotation angle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90° Clockwise</SelectItem>
                  <SelectItem value="180">180° Rotation</SelectItem>
                  <SelectItem value="270">90° Counterclockwise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleRotate}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Rotate PDF"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default RotatePDF;
