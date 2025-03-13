
import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const ScanToPDF = () => {
  const { toast } = useToast();
  
  const handleScan = () => {
    toast({
      title: "Scan initiated",
      description: "Please use your mobile device to scan a document",
    });
  };
  
  return (
    <ToolLayout
      title="Scan to PDF"
      description="Capture document scans from your mobile device and send them instantly to your browser"
      icon={<ScanLine className="w-6 h-6 text-white" />}
      colorClass="bg-tool-pdf-utility"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Use your mobile device to scan a document, which will be automatically converted to PDF and sent to your browser.
          </AlertDescription>
        </Alert>
        
        <div className="text-center p-10 border-2 border-dashed rounded-lg mb-6">
          <ScanLine className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Scan a document</h3>
          <p className="text-muted-foreground mb-6">
            Click the button below to start scanning with your mobile device
          </p>
          <Button size="lg" onClick={handleScan}>
            Start Scanning
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ScanToPDF;
