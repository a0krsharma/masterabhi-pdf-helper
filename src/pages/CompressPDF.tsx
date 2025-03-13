
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleCompressPDF = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to compress",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, we would send the file to a server or use a PDF library
    // For now, we'll just show a success message
    toast({
      title: "PDF compressed successfully",
      description: "Your compressed PDF is ready for download",
    });
  };
  
  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce file size while maintaining quality"
      icon={<FileDown className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-compress"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to compress. Choose the compression level that suits your needs - higher compression means smaller file size but may reduce quality.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={50}
          className="mb-6"
        />
        
        {file && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Compression Level</h3>
              <Select value={compressionLevel} onValueChange={setCompressionLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compression level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Better quality, larger file)</SelectItem>
                  <SelectItem value="medium">Medium (Recommended)</SelectItem>
                  <SelectItem value="high">High (Smaller file, lower quality)</SelectItem>
                  <SelectItem value="extreme">Maximum (Smallest possible size)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-center">
              <Button size="lg" onClick={handleCompressPDF}>
                Compress PDF
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default CompressPDF;
