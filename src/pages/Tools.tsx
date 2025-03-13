
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
      icon: <FilePlus2 />,
      href: "/merge-pdf",
      colorClass: "bg-tool-pdf-merge"
    },
    {
      title: "Split PDF",
      description: "Separate one page or a whole set for easy conversion into independent PDF files.",
      icon: <Scissors />,
      href: "/split-pdf",
      colorClass: "bg-tool-pdf-split"
    },
    {
      title: "Compress PDF",
      description: "Reduce file size while optimizing for maximal PDF quality.",
      icon: <FileDown />,
      href: "/compress-pdf",
      colorClass: "bg-tool-pdf-compress"
    },
    {
      title: "Edit PDF",
      description: "Add text, images, shapes or freehand annotations to a PDF document.",
      icon: <Pen />,
      href: "/edit-pdf",
      colorClass: "bg-tool-pdf-edit"
    },
    {
      title: "Sign PDF",
      description: "Sign yourself or request electronic signatures from others.",
      icon: <Signature />,
      href: "/sign-pdf",
      colorClass: "bg-tool-pdf-sign"
    },
    {
      title: "Indian Exam Document Tool",
      description: "Compress and format documents according to Indian exam requirements.",
      icon: <FileType2 />,
      href: "/indian-exam-docs",
      colorClass: "bg-tool-pdf-special"
    },
  ];

  const conversionTools = [
    {
      title: "PDF to Word",
      description: "Convert your PDF files into easy to edit DOC and DOCX documents.",
      icon: <FileText />,
      href: "/pdf-to-word",
      colorClass: "bg-tool-pdf-convert"
    },
    {
      title: "PDF to PowerPoint",
      description: "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
      icon: <Presentation />,
      href: "/pdf-to-powerpoint",
      colorClass: "bg-tool-pdf-convert"
    },
    {
      title: "PDF to Excel",
      description: "Pull data straight from PDFs into Excel spreadsheets.",
      icon: <FileSpreadsheet />,
      href: "/pdf-to-excel",
      colorClass: "bg-tool-pdf-convert"
    },
    {
      title: "Word to PDF",
      description: "Make DOC and DOCX files easy to read by converting them to PDF.",
      icon: <FileText />,
      href: "/word-to-pdf",
      colorClass: "bg-tool-office-convert"
    },
    {
      title: "PowerPoint to PDF",
      description: "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
      icon: <Presentation />,
      href: "/powerpoint-to-pdf",
      colorClass: "bg-tool-office-convert"
    },
    {
      title: "Excel to PDF",
      description: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
      icon: <FileSpreadsheet />,
      href: "/excel-to-pdf",
      colorClass: "bg-tool-office-convert"
    },
    {
      title: "PDF to JPG",
      description: "Convert each PDF page into a JPG or extract all images from a PDF.",
      icon: <ImageIcon />,
      href: "/pdf-to-jpg",
      colorClass: "bg-tool-image-convert"
    },
    {
      title: "JPG to PDF",
      description: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
      icon: <FileImage />,
      href: "/jpg-to-pdf",
      colorClass: "bg-tool-image-convert"
    },
    {
      title: "HTML to PDF",
      description: "Convert webpages in HTML to PDF. Copy and paste the URL to convert.",
      icon: <Code />,
      href: "/html-to-pdf",
      colorClass: "bg-tool-web-convert"
    },
  ];

  const advancedTools = [
    {
      title: "Watermark PDF",
      description: "Stamp an image or text over your PDF in seconds.",
      icon: <FileUp />,
      href: "/watermark-pdf",
      colorClass: "bg-tool-pdf-advanced"
    },
    {
      title: "Rotate PDF",
      description: "Rotate your PDFs the way you need them. Rotate multiple PDFs at once!",
      icon: <RotateCw />,
      href: "/rotate-pdf",
      colorClass: "bg-tool-pdf-advanced"
    },
    {
      title: "Unlock PDF",
      description: "Remove PDF password security, giving you freedom to use your PDFs.",
      icon: <Unlock />,
      href: "/unlock-pdf",
      colorClass: "bg-tool-pdf-security"
    },
    {
      title: "Protect PDF",
      description: "Protect PDF files with a password. Encrypt PDF documents.",
      icon: <Lock />,
      href: "/protect-pdf",
      colorClass: "bg-tool-pdf-security"
    },
    {
      title: "Organize PDF",
      description: "Sort pages of your PDF file however you like.",
      icon: <FolderKanban />,
      href: "/organize-pdf",
      colorClass: "bg-tool-pdf-edit"
    },
    {
      title: "PDF to PDF/A",
      description: "Transform your PDF to PDF/A, the ISO-standardized version for archiving.",
      icon: <Archive />,
      href: "/pdf-to-pdfa",
      colorClass: "bg-tool-pdf-convert"
    },
    {
      title: "Repair PDF",
      description: "Repair a damaged PDF and recover data from corrupt PDF files.",
      icon: <Wrench />,
      href: "/repair-pdf",
      colorClass: "bg-tool-pdf-repair"
    },
    {
      title: "Page Numbers",
      description: "Add page numbers into PDFs with ease. Choose positions and typography.",
      icon: <Hash />,
      href: "/page-numbers",
      colorClass: "bg-tool-pdf-edit"
    },
    {
      title: "Scan to PDF",
      description: "Capture document scans from your mobile device.",
      icon: <Scan />,
      href: "/scan-to-pdf",
      colorClass: "bg-tool-pdf-scan"
    },
    {
      title: "OCR PDF",
      description: "Easily convert scanned PDF into searchable and selectable documents.",
      icon: <Search />,
      href: "/ocr-pdf",
      colorClass: "bg-tool-pdf-ocr"
    },
    {
      title: "Compare PDF",
      description: "Show a side-by-side document comparison to spot changes between versions.",
      icon: <Diff />,
      href: "/compare-pdf",
      colorClass: "bg-tool-pdf-compare"
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
                  icon={tool.icon}
                  href={tool.href}
                  colorClass={tool.colorClass}
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
                  icon={tool.icon}
                  href={tool.href}
                  colorClass={tool.colorClass}
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
                  icon={tool.icon}
                  href={tool.href}
                  colorClass={tool.colorClass}
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
