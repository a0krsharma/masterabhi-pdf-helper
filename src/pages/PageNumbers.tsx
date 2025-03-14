
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileDigit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { addPageNumbers } from "@/utils/pdfUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PageNumbers = () => {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<string>("bottom-center");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleAddPageNumbers = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to add page numbers",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Processing started",
        description: "Your PDF with page numbers will be ready for download shortly",
      });
      
      const fileName = await addPageNumbers(file, position);
      
      toast({
        title: "Page numbers added successfully",
        description: `Your PDF "${fileName}" has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error adding page numbers",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <ToolLayout
      title="Page Numbers"
      description="Add page numbers into PDFs with ease"
      icon={<FileDigit className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-edit"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to add page numbers. You can customize the position, size, and style of the page numbers.
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
              <label className="block text-sm font-medium mb-2">Page Number Position</label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottom-center">Bottom Center</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="top-center">Top Center</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="top-left">Top Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleAddPageNumbers}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Add Page Numbers"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PageNumbers;
