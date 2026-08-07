import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Downloads an HTML element as an exact A5 Landscape PDF file.
 */
export async function downloadElementAsA5PDF(
  elementId: string,
  fileName = 'Goni_Market_Night_Guard_Slip.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return false;
  }

  try {
    // Render the element onto a high-DPI canvas
    const canvas = await html2canvas(element, {
      scale: 3, // High DPI for clear Bengali fonts & fine borders
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200, // Enforce stable layout dimensions during capture
    });

    const imgData = canvas.toDataURL('image/png', 1.0);

    // Create jsPDF in A5 landscape mode (210mm x 148mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a5',
      compress: true,
    });

    // Fit canvas image directly onto the 210mm x 148mm A5 page
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 148, undefined, 'FAST');
    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating PDF:', err);
    return false;
  }
}

/**
 * Downloads multiple element IDs as a multi-page A5 PDF.
 */
export async function downloadBatchAsA5PDF(
  elementIds: string[],
  fileName = 'Goni_Market_Guard_Slips_Batch.pdf'
): Promise<boolean> {
  if (elementIds.length === 0) return false;

  try {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a5',
      compress: true,
    });

    for (let i = 0; i < elementIds.length; i++) {
      const element = document.getElementById(elementIds[i]);
      if (!element) continue;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png', 1.0);

      if (i > 0) {
        pdf.addPage('a5', 'landscape');
      }

      pdf.addImage(imgData, 'PNG', 0, 0, 210, 148, undefined, 'FAST');
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating batch PDF:', err);
    return false;
  }
}

/**
 * Trigger standard browser print window.
 */
export function triggerPrintWindow(): void {
  window.print();
}
