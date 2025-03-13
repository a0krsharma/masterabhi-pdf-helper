
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileType2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const IndianExamDocs = () => {
  const [file, setFile] = useState<File | null>(null);
  const [examType, setExamType] = useState<string>("upsc");
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleProcess = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an image or PDF file to compress",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Processing started",
      description: "Your document will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="Indian Exam Document Tool"
      description="Compress and format documents according to Indian exam requirements"
      icon={<FileType2 className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-special"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a document to compress and format according to Indian exam specifications. 
            This tool optimizes your photos and documents to meet size requirements while maintaining readability.
          </AlertDescription>
        </Alert>
        
        <div className="mb-6">
          <Label htmlFor="exam-type">Select Exam Type</Label>
          <Select
            value={examType}
            onValueChange={setExamType}
          >
            <SelectTrigger id="exam-type" className="w-full mt-2">
              <SelectValue placeholder="Select exam type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upsc">UPSC</SelectItem>
              <SelectItem value="ssc">SSC</SelectItem>
              <SelectItem value="bank">Bank Exams</SelectItem>
              <SelectItem value="railway">Railway Exams</SelectItem>
              <SelectItem value="state">State PSC</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={10}
          className="mb-6"
          acceptedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
        />
        
        {file && (
          <div className="text-center">
            <Button size="lg" onClick={handleProcess}>
              Process Document
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default IndianExamDocs;
