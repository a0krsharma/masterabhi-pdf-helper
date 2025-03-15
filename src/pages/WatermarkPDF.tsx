
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { Stamp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { addWatermarkToPDF } from "@/utils/pdfUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WatermarkPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [opacity, setOpacity] = useState<number>(30);
  const [fontSize, setFontSize] = useState<number>(60);
  const [position, setPosition] = useState<string>("center");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleWatermark = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to watermark",
        variant: "destructive",
      });
      return;
    }
    
    if (!watermarkText.trim()) {
      toast({
        title: "No watermark text",
        description: "Please enter text for the watermark",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Adding watermark",
        description: "Your watermarked PDF will be ready for download shortly",
      });
      
      const fileName = await addWatermarkToPDF(file, watermarkText, {
        opacity: opacity / 100,
        fontSize,
        position: position as 'center' | 'diagonal' | 'top' | 'bottom',
      });
      
      toast({
        title: "PDF watermarked successfully",
        description: `Your watermarked PDF "${fileName}" has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error watermarking PDF",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
            Select a PDF file to add a watermark. You can customize the text, opacity, and positioning of your watermark.
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
              <Label htmlFor="watermark-text">Watermark Text</Label>
              <Input 
                id="watermark-text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Enter watermark text"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="opacity">Opacity: {opacity}%</Label>
              <Slider
                id="opacity"
                value={[opacity]}
                onValueChange={(values) => setOpacity(values[0])}
                min={10}
                max={90}
                step={5}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
              <Slider
                id="font-size"
                value={[fontSize]}
                onValueChange={(values) => setFontSize(values[0])}
                min={20}
                max={120}
                step={5}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="position">Position</Label>
              <Select
                value={position}
                onValueChange={setPosition}
              >
                <SelectTrigger id="position" className="mt-2">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="diagonal">Diagonal</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-center pt-4">
              <Button 
                size="lg" 
                onClick={handleWatermark}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Add Watermark"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default WatermarkPDF;
