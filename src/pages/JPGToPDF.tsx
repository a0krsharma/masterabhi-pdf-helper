
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileImage } from "lucide-react";
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

const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("portrait");
  const { toast } = useToast();
  
  const handleConvert = () => {
    if (files.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to convert",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, we would send the files to a server or use a conversion library
    toast({
      title: "Conversion started",
      description: "Your PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="JPG to PDF"
      description="Convert JPG images to PDF in seconds. Easily adjust orientation and margins"
      icon={<FileImage className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select one or more JPG images to convert to a PDF document. You can customize the page size and orientation before converting.
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Page Size</label>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select page size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="original">Original Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Orientation</label>
                <Select value={orientation} onValueChange={setOrientation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                    <SelectItem value="auto">Auto (from image)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg" onClick={handleConvert}>
                Convert to PDF
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default JPGToPDF;
