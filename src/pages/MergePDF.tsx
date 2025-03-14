
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FilesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { mergePDFs } from "@/utils/pdfUtils";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleMergePDFs = async () => {
    if (files.length < 2) {
      toast({
        title: "Not enough files",
        description: "Please select at least two PDF files to merge",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const fileName = await mergePDFs(files);
      
      toast({
        title: "PDFs merged successfully",
        description: `Your merged PDF '${fileName}' has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error merging PDFs",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
            <Button 
              size="lg" 
              onClick={handleMergePDFs}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Merge ${files.length} PDFs`}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default MergePDF;
