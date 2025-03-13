
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const WordToPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleConvert = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a Word document to convert",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Conversion started",
      description: "Your PDF document will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="Word to PDF"
      description="Make DOC and DOCX files easy to read by converting them to PDF"
      icon={<FileText className="w-6 h-6 text-white" />}
      colorClass="bg-tool-office-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a Word document (.doc or .docx) to convert to PDF. The converted document will maintain the original formatting.
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
            <Button size="lg" onClick={handleConvert}>
              Convert to PDF
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default WordToPDF;
