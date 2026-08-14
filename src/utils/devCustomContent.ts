// Developer Custom Content Manager for Goni Market App
// Handles text, image URLs, and YouTube video link inputs for all 9 sections

export function parseYouTubeEmbedUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Already an embed URL
  if (trimmed.includes('youtube.com/embed/') || trimmed.includes('youtube-nocookie.com/embed/')) {
    return trimmed;
  }

  let videoId = '';

  // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?/\s]+)/);
  if (watchMatch && watchMatch[1]) {
    videoId = watchMatch[1];
  } else if (trimmed.length === 11) {
    videoId = trimmed; // directly video ID
  }

  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  }

  return trimmed;
}

export function extractYouTubeId(url: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?/\s]{11})/);
  return match ? match[1] : '';
}

// Custom Section Overrides Type Definitions
export interface SectionContentOverride {
  sectionId: string;
  sectionTitle?: string;
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string; // YouTube video link
    phone?: string;
    price?: string;
    badge?: string;
    category?: string;
    extraText?: string;
  }>;
}

const STORAGE_KEY = 'goni_market_dev_custom_content_v1';

export function getDevSectionContent(sectionId: string): SectionContentOverride | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: Record<string, SectionContentOverride> = JSON.parse(raw);
    return data[sectionId] || null;
  } catch {
    return null;
  }
}

export function saveDevSectionContent(override: SectionContentOverride) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data: Record<string, SectionContentOverride> = raw ? JSON.parse(raw) : {};
    data[override.sectionId] = override;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('goni_dev_content_updated', { detail: { sectionId: override.sectionId } }));
  } catch (e) {
    console.error('Failed to save dev custom content', e);
  }
}

export function resetDevSectionContent(sectionId?: string) {
  try {
    if (!sectionId) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: Record<string, SectionContentOverride> = JSON.parse(raw);
        delete data[sectionId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    }
    window.dispatchEvent(new CustomEvent('goni_dev_content_updated', { detail: { sectionId } }));
  } catch (e) {
    console.error('Failed to reset dev custom content', e);
  }
}

export function getAllDevContentJSON(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw || '{}';
  } catch {
    return '{}';
  }
}

export function importAllDevContentJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed === 'object' && parsed !== null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      window.dispatchEvent(new CustomEvent('goni_dev_content_updated', { detail: { sectionId: 'all' } }));
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to import dev content', e);
    return false;
  }
}
