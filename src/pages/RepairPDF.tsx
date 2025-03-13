
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const RepairPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleRepair = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to repair",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Repair started",
      description: "Your repaired PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="Repair PDF"
      description="Repair a damaged PDF and recover data from corrupt PDF"
      icon={<FileWarning className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-utility"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a damaged or corrupted PDF file to attempt repair. Our tool will try to recover as much data as possible from the damaged file.
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
            <Button size="lg" onClick={handleRepair}>
              Repair PDF
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default RepairPDF;
