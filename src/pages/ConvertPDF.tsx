
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileSearch, Info } from "lucide-react";
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

  const formatDescriptions = {
    docx: "Convert PDF to editable Word documents with preserved formatting using Adobe PDF Services API",
    xlsx: "Extract tables and data from PDF to Excel spreadsheets using intelligent data recognition",
    pptx: "Transform PDF pages into PowerPoint slides with preserved graphics and layouts",
    jpg: "Convert PDF pages to high-quality JPG images with customizable resolution",
    png: "Export PDF pages to transparent PNG images ideal for graphic design",
    txt: "Extract plain text content from PDF documents with preserved paragraph structure"
  };
  
  return (
    <ToolLayout
      title="Convert PDF"
      description="Transform PDFs to and from other file formats"
      icon={<FileSearch className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertDescription>
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="mb-2">
                  Select a PDF file to convert to another format. We support conversion to Word, Excel, PowerPoint, and image formats.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Enterprise-grade Conversion:</strong> In a production environment, this tool would utilize 
                  the Adobe PDF Services API, Microsoft Graph API, and specialized conversion libraries for optimal results.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Implementation details:</strong> This conversion would be implemented server-side using:
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 mb-2">
                  <li>Adobe PDF Services API for professional-quality conversions</li>
                  <li>Microsoft Graph API for Office format interoperability</li>
                  <li>PDFTron for comprehensive PDF manipulation</li>
                  <li>Format-specific optimization algorithms for each conversion type</li>
                </ul>
              </div>
            </div>
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={50}
          className="mb-6"
          acceptedFileTypes={[".pdf"]}
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
              
              <div className="mt-2 text-sm text-muted-foreground">
                {formatDescriptions[outputFormat as keyof typeof formatDescriptions]}
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleConvertPDF}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700"
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
