
import React from "react";
import ToolCard from "./ToolCard";
import { 
  FilesIcon, 
  Scissors, 
  FileDown, 
  FileText, 
  Presentation, 
  FileSpreadsheet,
  FileImage, 
  PenTool, 
  FileSignature,
  Stamp,
  RotateCw,
  Globe,
  Unlock,
  Lock,
  FolderKanban,
  Archive,
  Wrench,
  ListOrdered,
  Scan,
  ScanText,
  Diff
} from "lucide-react";

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
      icon: <FileText className="w-full h-full" />,
      title: "PDF to Word",
      description: "Convert PDFs to editable DOC and DOCX files",
      color: "tool-pdf-convert",
      href: "/pdf-to-word"
    },
    {
      icon: <Presentation className="w-full h-full" />,
      title: "PDF to PowerPoint",
      description: "Convert PDFs to editable PPT slideshows",
      color: "tool-pdf-convert",
      href: "/pdf-to-powerpoint"
    },
    {
      icon: <FileSpreadsheet className="w-full h-full" />,
      title: "PDF to Excel",
      description: "Extract data from PDFs to Excel spreadsheets",
      color: "tool-pdf-convert",
      href: "/pdf-to-excel"
    },
    {
      icon: <FileText className="w-full h-full" />,
      title: "Word to PDF",
      description: "Convert DOC and DOCX files to PDF format",
      color: "tool-pdf-convert",
      href: "/word-to-pdf"
    },
    {
      icon: <Presentation className="w-full h-full" />,
      title: "PowerPoint to PDF",
      description: "Convert PPT and PPTX slideshows to PDF",
      color: "tool-pdf-convert",
      href: "/powerpoint-to-pdf"
    },
    {
      icon: <FileSpreadsheet className="w-full h-full" />,
      title: "Excel to PDF",
      description: "Convert Excel spreadsheets to PDF format",
      color: "tool-pdf-convert",
      href: "/excel-to-pdf"
    },
    {
      icon: <PenTool className="w-full h-full" />,
      title: "Edit PDF",
      description: "Add text, images, shapes and annotations to your PDF",
      color: "tool-pdf-edit",
      href: "/edit-pdf"
    },
    {
      icon: <FileImage className="w-full h-full" />,
      title: "PDF to JPG",
      description: "Convert PDF pages to JPG images or extract embedded images",
      color: "tool-pdf-convert",
      href: "/pdf-to-jpg"
    },
    {
      icon: <FileImage className="w-full h-full" />,
      title: "JPG to PDF",
      description: "Convert JPG images to PDF in seconds",
      color: "tool-pdf-convert",
      href: "/jpg-to-pdf"
    },
    {
      icon: <FileSignature className="w-full h-full" />,
      title: "Sign PDF",
      description: "Add electronic signatures to your documents",
      color: "tool-pdf-sign",
      href: "/sign-pdf"
    },
    {
      icon: <Stamp className="w-full h-full" />,
      title: "Watermark",
      description: "Add text or image watermarks to your PDF documents",
      color: "tool-pdf-edit",
      href: "/watermark-pdf"
    },
    {
      icon: <RotateCw className="w-full h-full" />,
      title: "Rotate PDF",
      description: "Rotate PDF pages to the correct orientation",
      color: "tool-pdf-edit",
      href: "/rotate-pdf"
    },
    {
      icon: <Globe className="w-full h-full" />,
      title: "HTML to PDF",
      description: "Convert webpages to PDF documents",
      color: "tool-pdf-convert",
      href: "/html-to-pdf"
    },
    {
      icon: <Unlock className="w-full h-full" />,
      title: "Unlock PDF",
      description: "Remove password protection from PDF files",
      color: "tool-pdf-edit",
      href: "/unlock-pdf"
    },
    {
      icon: <Lock className="w-full h-full" />,
      title: "Protect PDF",
      description: "Add password protection to your PDF files",
      color: "tool-pdf-edit",
      href: "/protect-pdf"
    },
    {
      icon: <FolderKanban className="w-full h-full" />,
      title: "Organize PDF",
      description: "Rearrange, delete, or add pages to your PDF",
      color: "tool-pdf-edit",
      href: "/organize-pdf"
    },
    {
      icon: <Archive className="w-full h-full" />,
      title: "PDF to PDF/A",
      description: "Convert PDFs to ISO-standardized PDF/A format",
      color: "tool-pdf-convert",
      href: "/pdf-to-pdfa"
    },
    {
      icon: <Wrench className="w-full h-full" />,
      title: "Repair PDF",
      description: "Fix corrupted PDF files and recover data",
      color: "tool-pdf-edit",
      href: "/repair-pdf"
    },
    {
      icon: <ListOrdered className="w-full h-full" />,
      title: "Page Numbers",
      description: "Add page numbers to your PDF documents",
      color: "tool-pdf-edit",
      href: "/page-numbers"
    },
    {
      icon: <Scan className="w-full h-full" />,
      title: "Scan to PDF",
      description: "Convert scanned documents to PDF",
      color: "tool-pdf-convert",
      href: "/scan-to-pdf"
    },
    {
      icon: <ScanText className="w-full h-full" />,
      title: "OCR PDF",
      description: "Make scanned PDFs searchable and selectable",
      color: "tool-pdf-convert",
      href: "/ocr-pdf"
    },
    {
      icon: <Diff className="w-full h-full" />,
      title: "Compare PDF",
      description: "Compare two PDF documents side by side",
      color: "tool-pdf-edit",
      href: "/compare-pdf"
    }
  ];

  return (
    <section className="py-20 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All the PDF tools you need</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every tool you need to work with PDFs in one place. All are 100% FREE and easy to use!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${0.05 * index}s`, animationFillMode: 'forwards' }}>
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
