
import React from "react";
import ToolCard from "./ToolCard";
import { 
  FilesIcon, 
  Scissors, 
  FileDown, 
  FileSearch, 
  PenTool, 
  FileSignature 
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedTools = () => {
  const tools = [
    {
      icon: <FilesIcon className="w-full h-full" />,
      title: "Merge PDF",
      description: "Combine multiple PDFs into a single document",
      color: "tool-pdf-merge",
      href: "/merge-pdf"
    },
    {
      icon: <Scissors className="w-full h-full" />,
      title: "Split PDF",
      description: "Extract pages or split your PDF into multiple files",
      color: "tool-pdf-split",
      href: "/split-pdf"
    },
    {
      icon: <FileDown className="w-full h-full" />,
      title: "Compress PDF",
      description: "Reduce file size while maintaining quality",
      color: "tool-pdf-compress",
      href: "/compress-pdf"
    },
    {
      icon: <FileSearch className="w-full h-full" />,
      title: "Convert PDF",
      description: "Transform PDFs to and from other file formats",
      color: "tool-pdf-convert",
      href: "/convert-pdf"
    },
    {
      icon: <PenTool className="w-full h-full" />,
      title: "Edit PDF",
      description: "Add text, images, shapes and annotations to your PDF",
      color: "tool-pdf-edit",
      href: "/edit-pdf"
    },
    {
      icon: <FileSignature className="w-full h-full" />,
      title: "Sign PDF",
      description: "Add electronic signatures to your documents",
      color: "tool-pdf-sign",
      href: "/sign-pdf"
    }
  ];

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">All the PDF tools you need</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional PDF tools to solve all your document problems in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'forwards' }}>
              <ToolCard 
                iconSvg={tool.icon}
                title={tool.title}
                description={tool.description}
                color={tool.color}
                href={tool.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
