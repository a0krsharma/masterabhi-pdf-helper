
import React, { useState, useCallback } from "react";
import { Upload, FileUp, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PDFDropzoneProps {
  onFileSelect: (files: File[]) => void;
  multiple?: boolean;
  maxSize?: number; // in MB
  className?: string;
  maxFiles?: number; // maximum number of files allowed
  acceptedFileTypes?: string[]; // array of accepted file types
}

const PDFDropzone: React.FC<PDFDropzoneProps> = ({
  onFileSelect,
  multiple = false,
  maxSize = 10, // Default 10MB
  className,
  maxFiles,
  acceptedFileTypes = [".pdf"],
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const validateFile = useCallback((file: File): boolean => {
    // Check file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const isValidType = acceptedFileTypes.some(type => 
      type === '*' || file.type.includes(type.replace('.', '')) || fileExtension === type
    );
    
    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: `Only ${acceptedFileTypes.join(', ')} files are allowed`,
        variant: "destructive",
      });
      return false;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize}MB`,
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  }, [maxSize, toast, acceptedFileTypes]);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length) {
      if (maxFiles && selectedFiles.length + validFiles.length > maxFiles) {
        toast({
          title: "Too many files",
          description: `Maximum ${maxFiles} files are allowed`,
          variant: "destructive",
        });
        const limitedFiles = validFiles.slice(0, maxFiles - selectedFiles.length);
        const newFiles = multiple ? [...selectedFiles, ...limitedFiles] : limitedFiles;
        setSelectedFiles(newFiles);
        onFileSelect(newFiles);
      } else {
        const newFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
        setSelectedFiles(newFiles);
        onFileSelect(newFiles);
      }
    }
  }, [multiple, onFileSelect, selectedFiles, validateFile, maxFiles, toast]);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const files = Array.from(e.target.files);
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length) {
      if (maxFiles && selectedFiles.length + validFiles.length > maxFiles) {
        toast({
          title: "Too many files",
          description: `Maximum ${maxFiles} files are allowed`,
          variant: "destructive",
        });
        const limitedFiles = validFiles.slice(0, maxFiles - selectedFiles.length);
        const newFiles = multiple ? [...selectedFiles, ...limitedFiles] : limitedFiles;
        setSelectedFiles(newFiles);
        onFileSelect(newFiles);
      } else {
        const newFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
        setSelectedFiles(newFiles);
        onFileSelect(newFiles);
      }
    }
    
    // Reset the input value to allow selecting the same file again
    e.target.value = '';
  }, [multiple, onFileSelect, selectedFiles, validateFile, maxFiles, toast]);
  
  const removeFile = useCallback((index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  }, [onFileSelect, selectedFiles]);
  
  const acceptAttribute = acceptedFileTypes.join(',');
  
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <input
          id="fileInput"
          type="file"
          accept={acceptAttribute}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {isDragging ? (
            <FileUp className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-primary" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">
          {isDragging ? "Drop your files here" : `Drag and drop your ${acceptedFileTypes.includes(".pdf") ? "PDF" : ""} files here`}
        </h3>
        <p className="text-muted-foreground text-center mb-4">
          or click to browse from your computer
        </p>
        <p className="text-sm text-muted-foreground">
          Max file size: {maxSize}MB 
          {multiple && " • Multiple files allowed"}
          {maxFiles && ` • Max ${maxFiles} files`}
        </p>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Selected Files</h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="font-medium truncate max-w-xs">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFDropzone;
