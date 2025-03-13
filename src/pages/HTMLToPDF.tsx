
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const HTMLToPDF = () => {
  const [url, setUrl] = useState<string>("");
  const { toast } = useToast();
  
  const handleConvert = () => {
    if (!url) {
      toast({
        title: "No URL entered",
        description: "Please enter a valid URL to convert",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Conversion started",
      description: "Your PDF will be ready for download shortly",
    });
  };
  
  return (
    <ToolLayout
      title="HTML to PDF"
      description="Convert webpages in HTML to PDF"
      icon={<Code className="w-6 h-6 text-white" />}
      colorClass="bg-tool-web-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Enter the URL of a webpage to convert it to PDF. The tool will capture the entire webpage and convert it to a high-quality PDF document.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4 mb-6">
          <Input 
            type="url" 
            placeholder="https://example.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="text-center">
          <Button size="lg" onClick={handleConvert} disabled={!url}>
            Convert to PDF
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HTMLToPDF;
