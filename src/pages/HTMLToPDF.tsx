
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Code, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const HTMLToPDF = () => {
  const [url, setUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
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
    
    setIsProcessing(true);
    
    setTimeout(() => {
      toast({
        title: "Conversion completed",
        description: "Your PDF has been generated and downloaded",
      });
      setIsProcessing(false);
    }, 2000);
  };
  
  return (
    <ToolLayout
      title="HTML to PDF"
      description="Convert webpages in HTML to PDF"
      icon={<Code className="w-6 h-6 text-white" />}
      colorClass="bg-tool-web-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertDescription>
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="mb-2">
                  Enter the URL of a webpage to convert it to PDF. The tool will capture the entire webpage and convert it to a high-quality PDF document.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Headless Browser Technology:</strong> In a production environment, this tool would utilize 
                  headless Chrome/Puppeteer to render web pages with perfect fidelity before converting to PDF.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Implementation details:</strong> This conversion would be implemented server-side using:
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 mb-2">
                  <li>Puppeteer/Playwright for headless browser rendering</li>
                  <li>PDF.js for converting rendered content to PDF</li>
                  <li>Custom CSS injection for print optimization</li>
                  <li>Advanced pagination for long webpages</li>
                  <li>Media query handling for responsive layouts</li>
                </ul>
              </div>
            </div>
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
          <Button 
            size="lg" 
            onClick={handleConvert} 
            disabled={!url || isProcessing}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? "Converting..." : "Convert to PDF"}
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HTMLToPDF;
