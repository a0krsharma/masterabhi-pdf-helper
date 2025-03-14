
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { convertPDFToFormat } from "@/utils/pdfUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ConvertPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("docx");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleConvertPDF = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to convert",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "Conversion started",
        description: `Converting your PDF to ${outputFormat.toUpperCase()}...`,
      });
      
      const fileName = await convertPDFToFormat(file, outputFormat);
      
      toast({
        title: "PDF converted successfully",
        description: `Your ${outputFormat.toUpperCase()} file "${fileName}" has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error converting PDF",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <ToolLayout
      title="Convert PDF"
      description="Transform PDFs to and from other file formats"
      icon={<FileSearch className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to convert to another format. We support conversion to Word, Excel, PowerPoint, and image formats.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={50}
          className="mb-6"
        />
        
        {file && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Output Format</h3>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="docx">Word Document (.docx)</SelectItem>
                  <SelectItem value="xlsx">Excel Spreadsheet (.xlsx)</SelectItem>
                  <SelectItem value="pptx">PowerPoint Presentation (.pptx)</SelectItem>
                  <SelectItem value="jpg">JPEG Image (.jpg)</SelectItem>
                  <SelectItem value="png">PNG Image (.png)</SelectItem>
                  <SelectItem value="txt">Text File (.txt)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleConvertPDF}
                disabled={isProcessing}
              >
                {isProcessing ? "Converting..." : `Convert PDF to ${outputFormat.toUpperCase()}`}
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default ConvertPDF;
