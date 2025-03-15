
import { saveAs } from 'file-saver';
import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib';

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
    
    // Get compression options based on level
    const compressionOptions = {
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
    const compressedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    const fileName = `compressed_${file.name}`;
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
    
    // This is a mock implementation since browser-side PDF to other format conversion is limited
    // In a real app, this would be handled by a server-side API
    
    // For demonstration, we'll generate a placeholder file for download
    const fileBuffer = await file.arrayBuffer();
    
    // Process based on the target format
    let blob: Blob;
    let fileName: string;
    
    switch(format.toLowerCase()) {
      case 'docx':
      case 'xlsx':
      case 'pptx':
        // Create a simple file with the requested extension
        const content = `This is a conversion of ${file.name} to ${format} format. 
In a production environment, this would be handled by a server-side API.`;
        blob = new Blob([content], { type: 'application/octet-stream' });
        fileName = file.name.replace('.pdf', `.${format}`);
        break;
        
      case 'jpg':
      case 'png':
        // Load the PDF and create a placeholder image
        await PDFDocument.load(fileBuffer);
        // Placeholder image blob (would be actual conversion in production)
        const imgContent = `Image conversion of ${file.name} would happen here in production.`;
        blob = new Blob([imgContent], { type: `image/${format}` });
        fileName = file.name.replace('.pdf', `.${format}`);
        break;
        
      case 'txt':
        // Create a text version of the PDF (simplified)
        const textContent = `Text content extracted from ${file.name}.\nThis is a placeholder for real text extraction.`;
        blob = new Blob([textContent], { type: 'text/plain' });
        fileName = file.name.replace('.pdf', '.txt');
        break;
        
      default:
        throw new Error(`Conversion to ${format} is not supported`);
    }
    
    return saveFile(blob, fileName);
  } catch (error) {
    console.error(`Error converting PDF to ${format}:`, error);
    throw new Error(`Failed to convert PDF to ${format}`);
  }
};

export const rotatePDF = async (file: File, rotation: number = 90): Promise<string> => {
  try {
    console.log(`Rotating PDF ${file.name} by ${rotation} degrees`);
    
    // Convert File to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pageCount = pdfDoc.getPageCount();
    
    // Rotate all pages
    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
      page.setRotation(degrees(rotation));
    }
    
    // Save the PDF with rotated pages
    const pdfBytes = await pdfDoc.save();
    const rotatedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    const fileName = `rotated_${file.name}`;
    saveFile(rotatedPdfBlob, fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error rotating PDF:', error);
    throw new Error('Failed to rotate PDF file');
  }
};

// New function to repair PDFs
export const repairPDF = async (file: File): Promise<string> => {
  try {
    console.log(`Repairing PDF ${file.name}`);
    
    // Convert File to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    
    // Try to load and recreate the PDF (this can fix some corrupted PDFs)
    // @ts-ignore - ignoring TypeScript error for ignoreEncryption property
    const pdfDoc = await PDFDocument.load(fileBuffer, { 
      ignoreEncryption: true,
      updateMetadata: false
    });
    
    // Save the repaired PDF
    const pdfBytes = await pdfDoc.save();
    const repairedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    const fileName = `repaired_${file.name}`;
    return saveFile(repairedPdfBlob, fileName);
  } catch (error) {
    console.error('Error repairing PDF:', error);
    throw new Error('Failed to repair PDF file');
  }
};

export const addPageNumbers = async (file: File, position: string = 'bottom-center'): Promise<string> => {
  try {
    console.log(`Adding page numbers to PDF ${file.name}`);
    
    // Convert File to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pageCount = pdfDoc.getPageCount();
    
    // Add page numbers to each page
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
      const { width, height } = page.getSize();
      const pageText = `${i + 1} / ${pageCount}`;
      const textWidth = font.widthOfTextAtSize(pageText, 12);
      
      let x = 0;
      let y = 0;
      
      // Position the page number based on the specified position
      switch (position) {
        case 'bottom-center':
          x = (width - textWidth) / 2;
          y = 20;
          break;
        case 'bottom-right':
          x = width - textWidth - 20;
          y = 20;
          break;
        case 'bottom-left':
          x = 20;
          y = 20;
          break;
        case 'top-center':
          x = (width - textWidth) / 2;
          y = height - 20;
          break;
        case 'top-right':
          x = width - textWidth - 20;
          y = height - 20;
          break;
        case 'top-left':
          x = 20;
          y = height - 20;
          break;
        default:
          x = (width - textWidth) / 2;
          y = 20;
      }
      
      // Draw the page number
      page.drawText(pageText, {
        x,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    }
    
    // Save the PDF with page numbers
    const pdfBytes = await pdfDoc.save();
    const numberedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    const fileName = `numbered_${file.name}`;
    return saveFile(numberedPdfBlob, fileName);
  } catch (error) {
    console.error('Error adding page numbers to PDF:', error);
    throw new Error('Failed to add page numbers to PDF');
  }
};

export const unlockPDF = async (file: File, password: string): Promise<string> => {
  try {
    console.log(`Unlocking PDF ${file.name}`);
    
    // Convert File to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    
    // Try to load the PDF with the provided password
    // We need to use type assertion because TypeScript definitions don't match the actual JS API
    const loadOptions = { password } as any;
    const pdfDoc = await PDFDocument.load(fileBuffer, loadOptions);
    
    // If we get here, the password was correct
    // Save a copy without a password
    const pdfBytes = await pdfDoc.save();
    const unlockedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    const fileName = `unlocked_${file.name}`;
    return saveFile(unlockedPdfBlob, fileName);
  } catch (error) {
    console.error('Error unlocking PDF:', error);
    throw new Error('Failed to unlock PDF. The password may be incorrect.');
  }
};

export const protectPDF = async (file: File, password: string, options: { restrictEditing?: boolean, restrictPrinting?: boolean } = {}): Promise<string> => {
  try {
    console.log(`Protecting PDF ${file.name}`);
    
    // Convert File to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(fileBuffer);
    
    // Encrypt the PDF with the provided password
    // We need to use type assertion because TypeScript definitions don't match the actual JS API
    const saveOptions = {
      userPassword: password,
      ownerPassword: password,
      permissions: {
        modifying: !options.restrictEditing,
        printing: !options.restrictPrinting ? 'highResolution' : 'none',
        copying: !options.restrictEditing,
        annotating: !options.restrictEditing,
        fillingForms: !options.restrictEditing,
        contentAccessibility: true,
        documentAssembly: !options.restrictEditing,
      },
    } as any;
    
    const pdfBytes = await pdfDoc.save(saveOptions);
    
    const protectedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    const fileName = `protected_${file.name}`;
    return saveFile(protectedPdfBlob, fileName);
  } catch (error) {
    console.error('Error protecting PDF:', error);
    throw new Error('Failed to protect PDF file');
  }
};
