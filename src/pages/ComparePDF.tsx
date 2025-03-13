
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { Diff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const ComparePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  const handleCompare = () => {
    if (files.length !== 2) {
      toast({
        title: "Need exactly two files",
        description: "Please select exactly two PDF files to compare",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, we would send the files to a server or use a PDF library
    toast({
      title: "PDF comparison started",
      description: "Your comparison will be available shortly",
    });
  };
  
  return (
    <ToolLayout
      title="Compare PDF"
      description="Show a side-by-side document comparison and easily spot changes between different file versions"
      icon={<Diff className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-edit"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select two PDF files to compare. The comparison will highlight changes between the documents, making it easy to spot differences between versions.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={setFiles}
          multiple={true}
          maxSize={20}
          className="mb-6"
          maxFiles={2}
        />
        
        {files.length === 2 && (
          <div className="text-center">
            <Button size="lg" onClick={handleCompare}>
              Compare PDFs
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ComparePDF;
