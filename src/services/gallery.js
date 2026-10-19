import { FALLBACK_TOURS, FALLBACK_VISAS } from '../constants/gallery';

const API_BASE = import.meta.env.VITE_API_URL || '';

// Tries the API first; falls back to local sample data so the page always renders.
async function request(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const list = Array.isArray(json) ? json : json?.data;
    return Array.isArray(list) && list.length ? list : fallback;
  } catch {
    // brief delay so skeleton loaders are visible in dev
    await new Promise((r) => setTimeout(r, 400));
    return fallback;
  }
}

export const fetchTourGallery = () => request('/api/gallery/tours', FALLBACK_TOURS);
export const fetchVisaGallery = () => request('/api/gallery/visas', FALLBACK_VISAS);
