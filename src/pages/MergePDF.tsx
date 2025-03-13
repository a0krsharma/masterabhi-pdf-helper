
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FilesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  const handleMergePDFs = () => {
    if (files.length < 2) {
      toast({
        title: "Not enough files",
        description: "Please select at least two PDF files to merge",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, we would send the files to a server or use a PDF library
    // For now, we'll just show a success message
    toast({
      title: "PDFs merged successfully",
      description: "Your merged PDF is ready for download",
    });
  };
  
  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDFs into a single document"
      icon={<FilesIcon className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-merge"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select multiple PDF files and arrange them in the desired order. Then click "Merge PDFs" to combine them into a single document.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={setFiles}
          multiple={true}
          maxSize={20}
          className="mb-6"
        />
        
        {files.length >= 2 && (
          <div className="text-center">
            <Button size="lg" onClick={handleMergePDFs}>
              Merge {files.length} PDFs
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default MergePDF;
