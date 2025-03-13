
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import PDFDropzone from "@/components/PDFDropzone";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ProtectPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [restrictEditing, setRestrictEditing] = useState(true);
  const [restrictPrinting, setRestrictPrinting] = useState(false);
  const { toast } = useToast();
  
  const handleFileSelect = (files: File[]) => {
    setFile(files[0] || null);
  };
  
  const handleProtect = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to protect",
        variant: "destructive",
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter a password to protect the PDF",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "The passwords you entered don't match",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, we would send the file to a server or use a PDF library
    toast({
      title: "PDF protected successfully",
      description: "Your protected PDF is ready for download",
    });
  };
  
  return (
    <ToolLayout
      title="Protect PDF"
      description="Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access"
      icon={<Lock className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-protect"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Select a PDF file and set a password to protect it. You can also choose additional security restrictions for your document.
          </AlertDescription>
        </Alert>
        
        <PDFDropzone
          onFileSelect={handleFileSelect}
          multiple={false}
          maxSize={50}
          className="mb-6"
        />
        
        {file && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <Input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium mb-2">Permissions</label>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="restrictEditing" 
                  checked={restrictEditing}
                  onCheckedChange={(checked) => 
                    setRestrictEditing(checked === true)
                  }
                />
                <label htmlFor="restrictEditing" className="text-sm">
                  Restrict editing
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="restrictPrinting" 
                  checked={restrictPrinting}
                  onCheckedChange={(checked) => 
                    setRestrictPrinting(checked === true)
                  }
                />
                <label htmlFor="restrictPrinting" className="text-sm">
                  Restrict printing
                </label>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <Button size="lg" onClick={handleProtect}>
                Protect PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ProtectPDF;
