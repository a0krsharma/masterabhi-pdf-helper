
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const OrganizePDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleOrganize = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to organize",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Processing started",
      description: "Your organized PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="Organize PDF"
      description="Sort pages of your PDF file however you like"
      icon={<FolderKanban className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-edit"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to organize its pages. You can rearrange, delete, rotate, or extract pages from the document.
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
            <Button size="lg" onClick={handleOrganize}>
              Organize PDF
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default OrganizePDF;
