
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [signatureType, setSignatureType] = useState<"draw" | "type" | "image">("draw");
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleSignPDF = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to sign",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, we would send the file to a server or use a PDF library
    // For now, we'll just show a success message
    toast({
      title: "PDF signed successfully",
      description: "Your signed PDF is ready for download",
    });
  };
  
  return (
    <ToolLayout
      title="Sign PDF"
      description="Add electronic signatures to your documents"
      icon={<FileSignature className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-sign"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file to sign. Create a signature by drawing, typing, or uploading an image.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={20}
          className="mb-6"
        />
        
        {file && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Create Your Signature</h3>
              <Tabs defaultValue="draw" onValueChange={(value) => setSignatureType(value as any)}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="draw">Draw</TabsTrigger>
                  <TabsTrigger value="type">Type</TabsTrigger>
                  <TabsTrigger value="image">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="draw" className="p-4 border rounded-lg mt-2">
                  <div className="border-2 border-dashed h-40 rounded-lg flex items-center justify-center bg-gray-50">
                    <p className="text-muted-foreground">Draw your signature here</p>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">Clear</Button>
                </TabsContent>
                <TabsContent value="type" className="p-4 border rounded-lg mt-2">
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Type your name" 
                      className="w-full p-2 border rounded"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="text-sm">Style 1</Button>
                      <Button variant="outline" className="text-sm">Style 2</Button>
                      <Button variant="outline" className="text-sm">Style 3</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="image" className="p-4 border rounded-lg mt-2">
                  <div className="border-2 border-dashed h-40 rounded-lg flex flex-col items-center justify-center">
                    <p className="text-muted-foreground mb-2">Upload an image of your signature</p>
                    <Button variant="outline" size="sm">Select Image</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Signature Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Signature Color</label>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 rounded-full bg-blue-500"></button>
                    <button className="w-8 h-8 rounded-full bg-black"></button>
                    <button className="w-8 h-8 rounded-full bg-red-500"></button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date Format</label>
                  <select className="w-full p-2 border rounded">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg" onClick={handleSignPDF}>
                Sign PDF
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default SignPDF;
