
import React, { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Image, Upload, Maximize, Minimize, Download, Crop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImageEditor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [quality, setQuality] = useState<number>(90);
  const [format, setFormat] = useState<string>("jpeg");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<boolean>(true);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImage(event.target.result);
          
          // Get image dimensions
          const img = new Image();
          img.onload = () => {
            setWidth(img.width);
            setHeight(img.height);
          };
          img.src = event.target.result;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    setWidth(newWidth);
    
    if (aspectRatio && file) {
      const img = new Image();
      img.onload = () => {
        const originalAspect = img.width / img.height;
        setHeight(Math.round(newWidth / originalAspect));
      };
      if (image) img.src = image;
    }
  };
  
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value);
    setHeight(newHeight);
    
    if (aspectRatio && file) {
      const img = new Image();
      img.onload = () => {
        const originalAspect = img.width / img.height;
        setWidth(Math.round(newHeight * originalAspect));
      };
      if (image) img.src = image;
    }
  };
  
  const handleCompress = async () => {
    if (!image || !file || !canvasRef.current) {
      toast({
        title: "No image selected",
        description: "Please select an image to process",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error("Unable to get canvas context");
      }
      
      const img = new Image();
      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to the selected format
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create download link
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              const newFilename = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
              a.href = url;
              a.download = `${newFilename}-processed.${format}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              
              toast({
                title: "Image processed successfully",
                description: `Your image has been ${width !== img.width || height !== img.height ? 'resized and ' : ''}compressed and downloaded.`,
              });
            } else {
              throw new Error("Failed to create image blob");
            }
            setIsProcessing(false);
          },
          `image/${format}`,
          quality / 100
        );
      };
      img.src = image;
      
    } catch (error) {
      toast({
        title: "Error processing image",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <ToolLayout
      title="Image Converter & Editor"
      description="Convert, compress, and resize your images easily"
      icon={<Image className="w-6 h-6 text-white" />}
      colorClass="bg-tool-image-convert"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Upload an image to resize, compress, or convert it to another format. Adjust settings as needed and download the processed image.
          </AlertDescription>
        </Alert>
        
        {!image ? (
          <div 
            className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-primary/50"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">
              Click to upload an image
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              or drag and drop your image here
            </p>
            <p className="text-sm text-muted-foreground">
              Supported formats: JPG, PNG, GIF, WebP, BMP
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="overflow-hidden rounded-lg border">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="w-full max-h-[400px] object-contain"
                />
              </div>
              <div className="flex justify-between mt-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setImage(null);
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}>
                  Remove
                </Button>
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  Change Image
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="resize" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="resize">Resize</TabsTrigger>
                <TabsTrigger value="compress">Compress</TabsTrigger>
                <TabsTrigger value="convert">Convert</TabsTrigger>
              </TabsList>
              <TabsContent value="resize" className="p-4 border rounded-lg mt-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <input 
                      type="checkbox" 
                      id="aspect-ratio" 
                      checked={aspectRatio}
                      onChange={() => setAspectRatio(!aspectRatio)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (px)</Label>
                      <div className="flex items-center">
                        <Maximize className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          min="1"
                          onChange={handleWidthChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (px)</Label>
                      <div className="flex items-center">
                        <Minimize className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          min="1"
                          onChange={handleHeightChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="compress" className="p-4 border rounded-lg mt-2">
                <div className="space-y-4">
                  <Label>Quality: {quality}%</Label>
                  <Slider
                    value={[quality]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(value) => setQuality(value[0])}
                    className="mb-6"
                  />
                  <p className="text-sm text-muted-foreground">
                    Lower quality = smaller file size, but might degrade image appearance.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="convert" className="p-4 border rounded-lg mt-2">
                <div className="space-y-4">
                  <Label htmlFor="format">Output Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleCompress}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Process Image"}
              </Button>
            </div>
            
            {/* Hidden canvas for image processing */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageEditor;
