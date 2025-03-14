
import React, { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Image as LucideImage, FileImage, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveAs } from "file-saver";

const ImageEditor = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [outputFormat, setOutputFormat] = useState<string>("jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setImage(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreview(url);

      // Get image dimensions
      const img = document.createElement("img");
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = url;
    }
  };

  const handleResize = async () => {
    if (!image || !width || !height) return;

    setIsProcessing(true);
    try {
      // Create a canvas element to resize the image
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Load the image onto the canvas
      const img = document.createElement("img");
      img.src = preview || "";
      
      // Wait for the image to load
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            throw new Error("Failed to create blob from canvas");
          }
        }, `image/${outputFormat}`, quality / 100);
      });

      // Save the resized image
      const fileName = `resized.${outputFormat}`;
      saveAs(blob, fileName);

      toast({
        title: "Image resized successfully",
        description: `Your resized image '${fileName}' has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error resizing image",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompress = async () => {
    if (!image) return;

    setIsProcessing(true);
    try {
      // Create a canvas element to compress the image
      const canvas = document.createElement("canvas");
      const img = document.createElement("img");
      img.src = preview || "";
      
      // Wait for the image to load
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Convert canvas to blob with compression
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            throw new Error("Failed to create blob from canvas");
          }
        }, `image/jpeg`, quality / 100);
      });

      // Save the compressed image
      const fileName = `compressed.jpg`;
      saveAs(blob, fileName);

      toast({
        title: "Image compressed successfully",
        description: `Your compressed image '${fileName}' has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error compressing image",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConvert = async () => {
    if (!image) return;

    setIsProcessing(true);
    try {
      // Create a canvas element to convert the image
      const canvas = document.createElement("canvas");
      const img = document.createElement("img");
      img.src = preview || "";
      
      // Wait for the image to load
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            throw new Error("Failed to create blob from canvas");
          }
        }, `image/${outputFormat}`);
      });

      // Save the converted image
      const fileName = `converted.${outputFormat}`;
      saveAs(blob, fileName);

      toast({
        title: "Image converted successfully",
        description: `Your converted image '${fileName}' has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Error converting image",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Image Editor"
      description="Resize, compress, and convert images"
      icon={<FileImage className="w-6 h-6 text-white" />}
      colorClass="bg-tool-image-edit"
    >
      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6">
          <AlertDescription>
            Upload an image to resize, compress, or convert it to a different format.
          </AlertDescription>
        </Alert>

        <div className="mb-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Upload an image</h3>
            <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF up to 10MB</p>
          </div>
        </div>

        {preview && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <div className="flex justify-center">
              <img src={preview} alt="Preview" className="max-w-full max-h-64 object-contain" />
            </div>
            <p className="mt-2 text-center text-sm text-gray-500">
              Original size: {width} x {height} pixels
            </p>
          </div>
        )}

        {image && (
          <Tabs defaultValue="resize" className="mb-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="resize">Resize</TabsTrigger>
              <TabsTrigger value="compress">Compress</TabsTrigger>
              <TabsTrigger value="convert">Convert</TabsTrigger>
            </TabsList>

            <TabsContent value="resize" className="p-4 border rounded-lg mt-2">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="output-format-resize">Output Format</Label>
                  <Select
                    value={outputFormat}
                    onValueChange={setOutputFormat}
                  >
                    <SelectTrigger id="output-format-resize">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-center pt-4">
                  <Button onClick={handleResize} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Resize Image"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compress" className="p-4 border rounded-lg mt-2">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="quality">Quality: {quality}%</Label>
                  </div>
                  <Slider
                    id="quality"
                    min={1}
                    max={100}
                    step={1}
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                  />
                </div>

                <div className="text-center pt-4">
                  <Button onClick={handleCompress} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Compress Image"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="convert" className="p-4 border rounded-lg mt-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="output-format-convert">Output Format</Label>
                  <Select
                    value={outputFormat}
                    onValueChange={setOutputFormat}
                  >
                    <SelectTrigger id="output-format-convert">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-center pt-4">
                  <Button onClick={handleConvert} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Convert Image"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageEditor;
