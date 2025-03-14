
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { repairPDF } from "@/utils/pdfUtils";

const RepairPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleRepair = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to repair",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Repair started",
        description: "Your repaired PDF will be ready for download shortly",
      });
      
      const fileName = await repairPDF(file);
      
      toast({
        title: "PDF repaired successfully",
        description: `Your repaired PDF "${fileName}" has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error repairing PDF",
        description: "The PDF could not be repaired. It may be too damaged or corrupted.",
        variant: "destructive",
      });
      console.error("Error repairing PDF:", error);
    } finally {
      setIsProcessing(false);
    }
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
            <Button 
              size="lg" 
              onClick={handleRepair}
              disabled={isProcessing}
            >
              {isProcessing ? "Repairing..." : "Repair PDF"}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default RepairPDF;
