
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileSpreadsheet, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { convertPDFToFormat } from "@/utils/pdfUtils";

const ExcelToPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleConvert = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an Excel spreadsheet to convert",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Conversion started",
        description: "Your PDF document will be ready for download shortly",
      });
      
      // In a real implementation, this would use a different function specific to Office conversions
      // For demo purposes, we'll reuse the existing function with a placeholder
      const fileName = await convertPDFToFormat(file, "pdf");
      
      toast({
        title: "Conversion completed",
        description: `The demonstration file "${fileName}" has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error converting file",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <ToolLayout
      title="Excel to PDF"
      description="Make EXCEL spreadsheets easy to read by converting them to PDF"
      icon={<FileSpreadsheet className="w-6 h-6 text-white" />}
      colorClass="bg-tool-office-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertDescription>
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="mb-2">
                  Select an Excel spreadsheet (.xls or .xlsx) to convert to PDF. The converted document will maintain the original formatting and layout of your spreadsheet.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Microsoft Graph API:</strong> In a production environment, this tool would utilize the 
                  Microsoft Graph API which provides high-fidelity conversion from Excel spreadsheets to PDF 
                  with precise cell rendering, chart visualization, and formula preservation.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Implementation details:</strong> This conversion would be implemented server-side using:
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 mb-2">
                  <li>Microsoft Graph API for native Excel processing</li>
                  <li>Aspose Cells for comprehensive spreadsheet handling</li>
                  <li>PDFTron for high-fidelity PDF generation</li>
                  <li>SpreadsheetGear for advanced Excel formula support</li>
                  <li>Custom pagination algorithms for large worksheets</li>
                </ul>
              </div>
            </div>
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={20}
          className="mb-6"
          acceptedFileTypes={[".xls", ".xlsx"]}
        />
        
        {file && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleConvert}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? "Converting..." : "Convert to PDF"}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ExcelToPDF;
