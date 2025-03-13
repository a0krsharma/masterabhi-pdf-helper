
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const UnlockPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleUnlock = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to unlock",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Unlocking started",
      description: "Your unlocked PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="Unlock PDF"
      description="Remove PDF password security, giving you the freedom to use your PDFs as you want"
      icon={<Unlock className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-security"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a password-protected PDF file to unlock it. You'll need to provide the password to unlock the file.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={20}
          className="mb-6"
        />
        
        {file && (
          <div className="space-y-4">
            <Input 
              type="password" 
              placeholder="Enter PDF password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            
            <div className="text-center">
              <Button size="lg" onClick={handleUnlock}>
                Unlock PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default UnlockPDF;
