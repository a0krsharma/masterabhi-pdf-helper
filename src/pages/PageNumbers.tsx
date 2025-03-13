
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileDigit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const PageNumbers = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleAddPageNumbers = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to add page numbers",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Processing started",
      description: "Your PDF with page numbers will be ready for download shortly",
    });
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
          <div className="text-center">
            <Button size="lg" onClick={handleAddPageNumbers}>
              Add Page Numbers
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PageNumbers;
