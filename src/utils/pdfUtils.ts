
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';

// Helper function to save file to user's device
const saveFile = (blob: Blob, fileName: string) => {
  saveAs(blob, fileName);
  return fileName;
};

// PDF Operations
export const mergePDFs = async (files: File[]): Promise<string> => {
  try {
    console.log(`Merging ${files.length} PDF files...`);
    
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();
    
    // Process each PDF file
    for (const file of files) {
      // Convert File to ArrayBuffer
      const fileBuffer = await file.arrayBuffer();
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(fileBuffer);
      
      // Copy pages from the source document to the merged document
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
    
    // Serialize the merged PDF to bytes
    const mergedPdfBytes = await mergedPdf.save();
    
    // Create a Blob from the PDF bytes
    const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    
    // Save the merged PDF
    const fileName = 'merged.pdf';
    saveFile(mergedPdfBlob, fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw new Error('Failed to merge PDF files');
  }
};

export const splitPDF = async (file: File, method: string, ranges?: string): Promise<string[]> => {
  try {
    console.log(`Splitting PDF ${file.name} using method: ${method}`);
    
    // Convert File to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pageCount = pdfDoc.getPageCount();
    const fileNames: string[] = [];
    
    // Create split PDFs based on the method
    if (method === 'all') {
      // Split into individual pages
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
        
        const pdfBytes = await newPdf.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        
        const fileName = `page_${i + 1}.pdf`;
        saveFile(pdfBlob, fileName);
        fileNames.push(fileName);
      }
    } else if (method === 'range' && ranges) {
      // Parse ranges (e.g., "1-3,5,7-9")
      const rangeSegments = ranges.split(',');
      const pageIndices: number[] = [];
      
      for (const segment of rangeSegments) {
        if (segment.includes('-')) {
          const [start, end] = segment.split('-').map(num => parseInt(num.trim(), 10) - 1);
          for (let i = start; i <= end; i++) {
            if (i >= 0 && i < pageCount) {
              pageIndices.push(i);
            }
          }
        } else {
          const pageIndex = parseInt(segment.trim(), 10) - 1;
          if (pageIndex >= 0 && pageIndex < pageCount) {
            pageIndices.push(pageIndex);
          }
        }
      }
      
      // Create a new PDF with the selected pages
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
      copiedPages.forEach(page => newPdf.addPage(page));
      
      const pdfBytes = await newPdf.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      const fileName = `pages_${ranges}.pdf`;
      saveFile(pdfBlob, fileName);
      fileNames.push(fileName);
    }
    
    return fileNames;
  } catch (error) {
    console.error('Error splitting PDF:', error);
    throw new Error('Failed to split PDF file');
  }
};

export const compressPDF = async (file: File, level: string): Promise<string> => {
  try {
    console.log(`Compressing PDF ${file.name} with level: ${level}`);
    
    // Convert File to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(fileBuffer);
    
    // Apply compression settings based on level
    // For a real implementation, different settings would be used
    // Here we're just re-saving the PDF which applies some default compression
    
    // Get compression options based on level
    const compressionOptions = {
      // In a real implementation, these would be different based on the level
      // This is a simplified example
      low: { quality: 0.9 },
      medium: { quality: 0.7 },
      high: { quality: 0.5 },
      extreme: { quality: 0.3 }
    };
    
    // Choose compression level
    const quality = compressionOptions[level as keyof typeof compressionOptions]?.quality || 0.7;
    
    // Save the PDF with compression settings
    const pdfBytes = await pdfDoc.save();
    
    // Create a compressed blob
    // In a real implementation, we would apply actual compression here
    // This is a simplified version
    const compressedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    const fileName = 'compressed.pdf';
    saveFile(compressedBlob, fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw new Error('Failed to compress PDF file');
  }
};

export const convertPDFToFormat = async (file: File, format: string): Promise<string> => {
  try {
    console.log(`Converting PDF ${file.name} to ${format}`);
    
    // In a real implementation, this would convert PDF to other formats
    // For demonstration purposes, we'll create a dummy file
    
    // Create blob with the corresponding format mimetype
    const mimeTypes: {[key: string]: string} = {
      jpg: 'image/jpeg',
      png: 'image/png',
      txt: 'text/plain',
      html: 'text/html',
    };
    
    const mimetype = mimeTypes[format.toLowerCase()] || 'application/octet-stream';
    const content = `This is a sample conversion of PDF to ${format}.\nCreated for demonstration purposes.`;
    const blob = new Blob([content], { type: mimetype });
    
    const fileName = `converted.${format.toLowerCase()}`;
    saveFile(blob, fileName);
    
    return fileName;
  } catch (error) {
    console.error(`Error converting PDF to ${format}:`, error);
    throw new Error(`Failed to convert PDF to ${format}`);
  }
};
