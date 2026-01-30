// Base path for GitHub Pages deployment
// In production (GitHub Pages), use '/kamyker', in development use ''
export const BASE_PATH = import.meta.env.PROD ? "/kamyker" : "";

// Helper to create absolute URLs with the base path
export const getBasePath = (path: string = "") => {
  if (!BASE_PATH) {
    // In development, just return the path as-is
    if (path.startsWith("#")) {
      return `/${path}`;
    }
    if (path.startsWith("/")) {
      return path;
    }
    return `/${path}`;
  }
  
  // In production (GitHub Pages), prefix with base path
  if (path.startsWith("#")) {
    return `${BASE_PATH}/${path}`;
  }
  if (path.startsWith("/")) {
    return `${BASE_PATH}${path}`;
  }
  return `${BASE_PATH}/${path}`;
};
