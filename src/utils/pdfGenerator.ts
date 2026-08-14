import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Canvas context helper to resolve modern CSS color functions (like oklch, oklab, color())
 * to standard rgb/hex formats supported by html2canvas
 */
const tempCanvasCtx = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;

const COLOR_FUNC_DETECTOR = /(?:oklch|oklab|lab|lch|color|hwb|light-dark)\b/i;
const COLOR_FUNC_REGEX = /(?:oklch|oklab|lab|lch|color|hwb|light-dark)\s*\((?:[^()]+|\([^()]*\))*\)/gi;

export function resolveCssColor(colorStr: string): string {
  if (!colorStr) return '#000000';
  if (!COLOR_FUNC_DETECTOR.test(colorStr)) {
    return colorStr;
  }
  if (tempCanvasCtx) {
    try {
      tempCanvasCtx.fillStyle = '#000000';
      tempCanvasCtx.fillStyle = colorStr;
      const res = tempCanvasCtx.fillStyle;
      if (res && !COLOR_FUNC_DETECTOR.test(res)) {
        return res;
      }
    } catch {
      // fallback below
    }
  }
  return '#1e293b';
}

/**
 * Safely triggers file download using Blob URL for maximum browser compatibility
 */
function downloadDataUrlAsFile(dataUrl: string, fileName: string): boolean {
  try {
    const parts = dataUrl.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    return true;
  } catch (err) {
    console.warn('Blob URL download failed, falling back to direct link:', err);
    try {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (e2) {
      console.error('Direct link download error:', e2);
      return false;
    }
  }
}

/**
 * Clean up oklch, oklab, lab, lch, color(), hwb, light-dark syntax inside cloned document style tags and elements
 */
function cleanClonedDocStyles(clonedDoc: Document) {
  try {
    if (clonedDoc.body) {
      clonedDoc.body.style.backgroundColor = '#ffffff';
      clonedDoc.body.style.color = '#0f172a';
    }

    // 1. Clean all <style> elements textContent
    const styleEls = clonedDoc.querySelectorAll('style');
    styleEls.forEach((styleEl) => {
      if (styleEl.textContent && COLOR_FUNC_DETECTOR.test(styleEl.textContent)) {
        styleEl.textContent = styleEl.textContent.replace(COLOR_FUNC_REGEX, (m) => resolveCssColor(m));
      }
    });

    // 2. Clean inline style attributes & cssText
    const allEls = clonedDoc.querySelectorAll('*');
    allEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl && htmlEl.style && htmlEl.style.cssText) {
        if (COLOR_FUNC_DETECTOR.test(htmlEl.style.cssText)) {
          htmlEl.style.cssText = htmlEl.style.cssText.replace(COLOR_FUNC_REGEX, (m) => resolveCssColor(m));
        }
      }
    });
  } catch (err) {
    console.warn('Cloned doc style cleanup error:', err);
  }
}

/**
 * Recursively applies computed colors to cloned elements to guarantee html2canvas compatibility
 */
function applyComputedStylesRecursively(orig: Element, clone: Element) {
  try {
    const cs = window.getComputedStyle(orig);
    const cloneHtml = clone as HTMLElement;
    if (cloneHtml && cloneHtml.style) {
      if (cloneHtml.style.color) {
        cloneHtml.style.color = resolveCssColor(cloneHtml.style.color);
      } else if (cs.color) {
        cloneHtml.style.color = resolveCssColor(cs.color);
      }

      if (cloneHtml.style.backgroundColor) {
        cloneHtml.style.backgroundColor = resolveCssColor(cloneHtml.style.backgroundColor);
      } else if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') {
        cloneHtml.style.backgroundColor = resolveCssColor(cs.backgroundColor);
      }

      if (cloneHtml.style.borderColor) {
        cloneHtml.style.borderColor = resolveCssColor(cloneHtml.style.borderColor);
      } else if (cs.borderColor) {
        cloneHtml.style.borderColor = resolveCssColor(cs.borderColor);
      }
    }
    const origCh = orig.children;
    const cloneCh = clone.children;
    for (let i = 0; i < origCh.length; i++) {
      if (cloneCh[i]) {
        applyComputedStylesRecursively(origCh[i], cloneCh[i]);
      }
    }
  } catch {
    // ignore
  }
}

/**
 * Fallback canvas generator in case html2canvas encounters an unexpected browser error
 */
function createFallbackCanvas(width = 800, height = 600, text = 'গণি মার্কেট নৈশকালীন নিরাপত্তা স্লিপ'): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, width - 20, height - 20);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px Kalpurush, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, 80);
    ctx.font = '16px Kalpurush, sans-serif';
    ctx.fillText('প্রিন্ট ও ডাউনলোডের জন্য প্রস্তুত', width / 2, 130);
  }
  return canvas;
}

/**
 * Helper to capture an HTML element to canvas reliably.
 * Clones the element into a clean, unscaled, 100% visible layer
 * so screen zoomLevel or dark theme styles don't distort the output canvas.
 */
export async function captureElementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore font loading error
    }
  }

  // Clone element to isolate it from parent CSS transforms
  const cloned = element.cloneNode(true) as HTMLElement;
  cloned.style.transform = 'none';
  cloned.style.margin = '0';
  cloned.style.boxShadow = 'none';
  cloned.style.display = 'block';
  cloned.style.visibility = 'visible';
  cloned.style.opacity = '1';

  // Apply explicit resolved inline colors to all nodes in cloned tree
  applyComputedStylesRecursively(element, cloned);

  // Temporary container placed cleanly in DOM
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0px';
  container.style.left = '0px';
  container.style.width = '210mm';
  container.style.zIndex = '-999';
  container.style.backgroundColor = '#ffffff';
  container.style.opacity = '0.001';
  container.style.pointerEvents = 'none';
  container.style.margin = '0';
  container.style.padding = '0';
  container.style.overflow = 'hidden';

  container.appendChild(cloned);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(cloned, {
      scale: 2, // High resolution (2x DPI) for ultra-sharp Bengali typography
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794, // Standard 210mm width at 96 DPI
      windowHeight: 1123, // Standard 297mm height at 96 DPI
      onclone: (clonedDoc) => {
        cleanClonedDocStyles(clonedDoc);
      },
    });
    return canvas;
  } catch (err) {
    console.warn('Canvas clone capture failed, capturing direct element:', err);
    try {
      return await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          cleanClonedDocStyles(clonedDoc);
        },
      });
    } catch (e2) {
      console.error('Direct canvas capture failed too, returning fallback canvas:', e2);
      const bounds = element.getBoundingClientRect();
      return createFallbackCanvas(Math.max(bounds.width * 2, 800), Math.max(bounds.height * 2, 600));
    }
  } finally {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
}

/**
 * Downloads an HTML element as HD PNG Image.
 */
export async function downloadElementAsPNG(
  elementId: string,
  fileName = 'Goni_Market_Guard_Slip.png'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return false;
  }

  try {
    const canvas = await captureElementToCanvas(element);
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    return downloadDataUrlAsFile(dataUrl, fileName);
  } catch (err) {
    console.error('PNG download error:', err);
    return false;
  }
}

/**
 * Downloads an HTML element as an exact A5 Landscape PDF file (210mm x 148mm).
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
    const canvas = await captureElementToCanvas(element);
    const imgData = canvas.toDataURL('image/png', 1.0);

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a5',
      compress: true,
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 210, 148, undefined, 'FAST');
    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating A5 PDF:', err);
    return false;
  }
}

/**
 * Downloads an HTML element as an exact A4 Portrait PDF file (210mm x 297mm).
 * Contains 4 slips (2 days x 2 slips).
 */
export async function downloadElementAsA4PDF(
  elementId: string,
  fileName = 'Goni_Market_Guard_Slips_A4_4Up.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return false;
  }

  try {
    const canvas = await captureElementToCanvas(element);
    const imgData = canvas.toDataURL('image/png', 1.0);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating A4 PDF:', err);
    return false;
  }
}

/**
 * Downloads a 2-page Duplex PDF (Page 1: Front Slips, Page 2: Back Slips) for A5 Landscape.
 */
export async function downloadDuplexA5PDF(
  frontElementId: string,
  backElementId: string,
  fileName = 'Goni_Market_Guard_Slip_A5_Duplex.pdf'
): Promise<boolean> {
  const frontElem = document.getElementById(frontElementId);
  const backElem = document.getElementById(backElementId);

  if (!frontElem) {
    console.error(`Front element with id ${frontElementId} not found.`);
    return false;
  }

  try {
    const frontCanvas = await captureElementToCanvas(frontElem);
    const frontImg = frontCanvas.toDataURL('image/png', 1.0);

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a5',
      compress: true,
    });

    // Page 1: Front
    pdf.addImage(frontImg, 'PNG', 0, 0, 210, 148, undefined, 'FAST');

    // Page 2: Back (if element exists)
    if (backElem) {
      const backCanvas = await captureElementToCanvas(backElem);
      const backImg = backCanvas.toDataURL('image/png', 1.0);
      pdf.addPage('a5', 'landscape');
      pdf.addImage(backImg, 'PNG', 0, 0, 210, 148, undefined, 'FAST');
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating A5 Duplex PDF:', err);
    return false;
  }
}

/**
 * Downloads a 2-page Duplex PDF (Page 1: Front 4 Slips, Page 2: Back 4 Slips) for A4 Portrait.
 */
export async function downloadDuplexA4PDF(
  frontElementId: string,
  backElementId: string,
  fileName = 'Goni_Market_Guard_Slips_A4_Duplex_4Up.pdf'
): Promise<boolean> {
  const frontElem = document.getElementById(frontElementId);
  const backElem = document.getElementById(backElementId);

  if (!frontElem) {
    console.error(`Front element with id ${frontElementId} not found.`);
    return false;
  }

  try {
    const frontCanvas = await captureElementToCanvas(frontElem);
    const frontImg = frontCanvas.toDataURL('image/png', 1.0);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Page 1: Front
    pdf.addImage(frontImg, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

    // Page 2: Back (if element exists)
    if (backElem) {
      const backCanvas = await captureElementToCanvas(backElem);
      const backImg = backCanvas.toDataURL('image/png', 1.0);
      pdf.addPage('a4', 'portrait');
      pdf.addImage(backImg, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating A4 Duplex PDF:', err);
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

    let pageAdded = false;

    for (let i = 0; i < elementIds.length; i++) {
      const element = document.getElementById(elementIds[i]);
      if (!element) continue;

      const canvas = await captureElementToCanvas(element);
      const imgData = canvas.toDataURL('image/png', 1.0);

      if (pageAdded) {
        pdf.addPage('a5', 'landscape');
      }

      pdf.addImage(imgData, 'PNG', 0, 0, 210, 148, undefined, 'FAST');
      pageAdded = true;
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating batch PDF:', err);
    return false;
  }
}

/**
 * Downloads multiple element IDs as a multi-page A4 PDF (210mm x 297mm per page).
 */
export async function downloadBatchAsA4PDF(
  elementIds: string[],
  fileName = 'Goni_Market_Guard_Slips_A4_Batch.pdf'
): Promise<boolean> {
  if (elementIds.length === 0) return false;

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    let pageAdded = false;

    for (let i = 0; i < elementIds.length; i++) {
      const element = document.getElementById(elementIds[i]);
      if (!element) continue;

      const canvas = await captureElementToCanvas(element);
      const imgData = canvas.toDataURL('image/png', 1.0);

      if (pageAdded) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      pageAdded = true;
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating A4 batch PDF:', err);
    return false;
  }
}

/**
 * Trigger standard browser print window with fallback handling.
 */
export function triggerPrintWindow(): void {
  try {
    window.focus();
    window.print();
  } catch (err) {
    console.error('Print window error:', err);
  }
}
