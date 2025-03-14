
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FilesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { mergePDFs } from "@/utils/pdfUtils";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFileSelect = (newFiles: File[]) => {
    // Filter out non-PDF files
    const pdfFiles = newFiles.filter(file => 
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );
    
    if (pdfFiles.length !== newFiles.length) {
      toast({
        title: "Non-PDF files ignored",
        description: "Only PDF files can be merged",
        variant: "destructive",
      });
    }
    
    setFiles(pdfFiles);
  };
  
  const handleDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    
    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setFiles(items);
  };
  
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
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
          onFileSelect={handleFileSelect}
          multiple={true}
          maxSize={20}
          className="mb-6"
          acceptedFileTypes={[".pdf"]}
        />
        
        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Selected Files ({files.length})</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <ul
                    className="space-y-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {files.map((file, index) => (
                      <Draggable key={file.name + index} draggableId={file.name + index} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between bg-gray-100 p-3 rounded"
                          >
                            <div className="flex items-center">
                              <span className="mr-2 text-gray-500">{index + 1}.</span>
                              <span className="truncate max-w-xs">{file.name}</span>
                              <span className="ml-2 text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
        
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
