// Base path for GitHub Pages deployment
// Change this if deploying to a different subdirectory
export const BASE_PATH = "/kamyker";

// Helper to create absolute URLs with the base path
export const getBasePath = (path: string = "") => {
  if (path.startsWith("#")) {
    return `${BASE_PATH}/${path}`;
  }
  if (path.startsWith("/")) {
    return `${BASE_PATH}${path}`;
  }
  return `${BASE_PATH}/${path}`;
};
