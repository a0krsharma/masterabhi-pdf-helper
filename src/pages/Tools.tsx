
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { 
  FileText, Scissors, FileUp, FileDown, FilePlus2, 
  Pen, Signature, Presentation, FileSpreadsheet, 
  ImageIcon, FileImage, RotateCw, Code, Unlock, Lock, 
  FolderKanban, Archive, Wrench, Hash, Scan, Search, 
  Diff, FileType2
} from "lucide-react";

const Tools = () => {
  const pdfTools = [
    {
      title: "Merge PDF",
      description: "Combine PDFs in the order you want with the easiest PDF merger available.",
      iconSvg: <FilePlus2 className="w-full h-full" />,
      href: "/merge-pdf",
      color: "tool-pdf-merge"
    },
    {
      title: "Split PDF",
      description: "Separate one page or a whole set for easy conversion into independent PDF files.",
      iconSvg: <Scissors className="w-full h-full" />,
      href: "/split-pdf",
      color: "tool-pdf-split"
    },
    {
      title: "Compress PDF",
      description: "Reduce file size while optimizing for maximal PDF quality.",
      iconSvg: <FileDown className="w-full h-full" />,
      href: "/compress-pdf",
      color: "tool-pdf-compress"
    },
    {
      title: "Edit PDF",
      description: "Add text, images, shapes or freehand annotations to a PDF document.",
      iconSvg: <Pen className="w-full h-full" />,
      href: "/edit-pdf",
      color: "tool-pdf-edit"
    },
    {
      title: "Sign PDF",
      description: "Sign yourself or request electronic signatures from others.",
      iconSvg: <Signature className="w-full h-full" />,
      href: "/sign-pdf",
      color: "tool-pdf-sign"
    },
    {
      title: "Indian Exam Document Tool",
      description: "Compress and format documents according to Indian exam requirements.",
      iconSvg: <FileType2 className="w-full h-full" />,
      href: "/indian-exam-docs",
      color: "tool-pdf-special"
    },
  ];

  const conversionTools = [
    {
      title: "PDF to Word",
      description: "Convert your PDF files into easy to edit DOC and DOCX documents.",
      iconSvg: <FileText className="w-full h-full" />,
      href: "/pdf-to-word",
      color: "tool-pdf-convert"
    },
    {
      title: "PDF to PowerPoint",
      description: "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
      iconSvg: <Presentation className="w-full h-full" />,
      href: "/pdf-to-powerpoint",
      color: "tool-pdf-convert"
    },
    {
      title: "PDF to Excel",
      description: "Pull data straight from PDFs into Excel spreadsheets.",
      iconSvg: <FileSpreadsheet className="w-full h-full" />,
      href: "/pdf-to-excel",
      color: "tool-pdf-convert"
    },
    {
      title: "Word to PDF",
      description: "Make DOC and DOCX files easy to read by converting them to PDF.",
      iconSvg: <FileText className="w-full h-full" />,
      href: "/word-to-pdf",
      color: "tool-office-convert"
    },
    {
      title: "PowerPoint to PDF",
      description: "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
      iconSvg: <Presentation className="w-full h-full" />,
      href: "/powerpoint-to-pdf",
      color: "tool-office-convert"
    },
    {
      title: "Excel to PDF",
      description: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
      iconSvg: <FileSpreadsheet className="w-full h-full" />,
      href: "/excel-to-pdf",
      color: "tool-office-convert"
    },
    {
      title: "PDF to JPG",
      description: "Convert each PDF page into a JPG or extract all images from a PDF.",
      iconSvg: <ImageIcon className="w-full h-full" />,
      href: "/pdf-to-jpg",
      color: "tool-image-convert"
    },
    {
      title: "JPG to PDF",
      description: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
      iconSvg: <FileImage className="w-full h-full" />,
      href: "/jpg-to-pdf",
      color: "tool-image-convert"
    },
    {
      title: "HTML to PDF",
      description: "Convert webpages in HTML to PDF. Copy and paste the URL to convert.",
      iconSvg: <Code className="w-full h-full" />,
      href: "/html-to-pdf",
      color: "tool-web-convert"
    },
    {
      title: "Image Converter & Editor",
      description: "Convert, compress, and resize images with our easy-to-use tool.",
      iconSvg: <ImageIcon className="w-full h-full" />,
      href: "/image-editor",
      color: "tool-image-convert"
    },
  ];

  const advancedTools = [
    {
      title: "Watermark PDF",
      description: "Stamp an image or text over your PDF in seconds.",
      iconSvg: <FileUp className="w-full h-full" />,
      href: "/watermark-pdf",
      color: "tool-pdf-advanced"
    },
    {
      title: "Rotate PDF",
      description: "Rotate your PDFs the way you need them. Rotate multiple PDFs at once!",
      iconSvg: <RotateCw className="w-full h-full" />,
      href: "/rotate-pdf",
      color: "tool-pdf-advanced"
    },
    {
      title: "Unlock PDF",
      description: "Remove PDF password security, giving you freedom to use your PDFs.",
      iconSvg: <Unlock className="w-full h-full" />,
      href: "/unlock-pdf",
      color: "tool-pdf-security"
    },
    {
      title: "Protect PDF",
      description: "Protect PDF files with a password. Encrypt PDF documents.",
      iconSvg: <Lock className="w-full h-full" />,
      href: "/protect-pdf",
      color: "tool-pdf-security"
    },
    {
      title: "Organize PDF",
      description: "Sort pages of your PDF file however you like.",
      iconSvg: <FolderKanban className="w-full h-full" />,
      href: "/organize-pdf",
      color: "tool-pdf-edit"
    },
    {
      title: "PDF to PDF/A",
      description: "Transform your PDF to PDF/A, the ISO-standardized version for archiving.",
      iconSvg: <Archive className="w-full h-full" />,
      href: "/pdf-to-pdfa",
      color: "tool-pdf-convert"
    },
    {
      title: "Repair PDF",
      description: "Repair a damaged PDF and recover data from corrupt PDF files.",
      iconSvg: <Wrench className="w-full h-full" />,
      href: "/repair-pdf",
      color: "tool-pdf-repair"
    },
    {
      title: "Page Numbers",
      description: "Add page numbers into PDFs with ease. Choose positions and typography.",
      iconSvg: <Hash className="w-full h-full" />,
      href: "/page-numbers",
      color: "tool-pdf-edit"
    },
    {
      title: "Scan to PDF",
      description: "Capture document scans from your mobile device.",
      iconSvg: <Scan className="w-full h-full" />,
      href: "/scan-to-pdf",
      color: "tool-pdf-scan"
    },
    {
      title: "OCR PDF",
      description: "Easily convert scanned PDF into searchable and selectable documents.",
      iconSvg: <Search className="w-full h-full" />,
      href: "/ocr-pdf",
      color: "tool-pdf-ocr"
    },
    {
      title: "Compare PDF",
      description: "Show a side-by-side document comparison to spot changes between versions.",
      iconSvg: <Diff className="w-full h-full" />,
      href: "/compare-pdf",
      color: "tool-pdf-compare"
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All PDF Tools</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every tool you need to work with PDFs, all in one place. 100% free and easy to use!
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Basic PDF Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pdfTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  title={tool.title}
                  description={tool.description}
                  iconSvg={tool.iconSvg}
                  href={tool.href}
                  color={tool.color}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Convert PDF</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {conversionTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  title={tool.title}
                  description={tool.description}
                  iconSvg={tool.iconSvg}
                  href={tool.href}
                  color={tool.color}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Advanced Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  title={tool.title}
                  description={tool.description}
                  iconSvg={tool.iconSvg}
                  href={tool.href}
                  color={tool.color}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
