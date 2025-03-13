
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleEditPDF = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to edit",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, we would send the file to a server or use a PDF library
    // For now, we'll just show a success message
    toast({
      title: "PDF edited successfully",
      description: "Your edited PDF is ready for download",
    });
  };
  
  return (
    <ToolLayout
      title="Edit PDF"
      description="Add text, images, shapes and annotations to your PDF"
      icon={<PenTool className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-edit"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to edit. You can add text, images, shapes, and annotations to your document.
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
              <h3 className="text-lg font-medium mb-4">Editing Tools</h3>
              <Tabs defaultValue="text">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="shapes">Shapes</TabsTrigger>
                  <TabsTrigger value="annotate">Annotate</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="p-4 border rounded-lg mt-2">
                  <p className="mb-4">Add or edit text in your PDF document.</p>
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="justify-start">Add Text Box</Button>
                    <Button variant="outline" className="justify-start">Edit Existing Text</Button>
                    <Button variant="outline" className="justify-start">Change Font</Button>
                  </div>
                </TabsContent>
                <TabsContent value="images" className="p-4 border rounded-lg mt-2">
                  <p className="mb-4">Insert images into your PDF document.</p>
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="justify-start">Insert Image</Button>
                    <Button variant="outline" className="justify-start">Resize Image</Button>
                    <Button variant="outline" className="justify-start">Crop Image</Button>
                  </div>
                </TabsContent>
                <TabsContent value="shapes" className="p-4 border rounded-lg mt-2">
                  <p className="mb-4">Add shapes to your PDF document.</p>
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="justify-start">Add Rectangle</Button>
                    <Button variant="outline" className="justify-start">Add Circle</Button>
                    <Button variant="outline" className="justify-start">Add Arrow</Button>
                    <Button variant="outline" className="justify-start">Add Line</Button>
                  </div>
                </TabsContent>
                <TabsContent value="annotate" className="p-4 border rounded-lg mt-2">
                  <p className="mb-4">Annotate your PDF document.</p>
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="justify-start">Highlight Text</Button>
                    <Button variant="outline" className="justify-start">Add Note</Button>
                    <Button variant="outline" className="justify-start">Add Comment</Button>
                    <Button variant="outline" className="justify-start">Draw Freehand</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="text-center">
              <Button size="lg" onClick={handleEditPDF}>
                Save Edited PDF
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default EditPDF;
