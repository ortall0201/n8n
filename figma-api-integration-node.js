// FIGMA API INTEGRATION NODE
// Add this to your n8n workflow to fetch designs from Figma

// Node 1: Figma - Get File Images
// This fetches all exportable images from a Figma file

const FIGMA_TOKEN = 'YOUR_FIGMA_TOKEN_HERE'; // Get from Figma Settings
const FIGMA_FILE_KEY = 'YOUR_FILE_KEY_HERE'; // From Figma URL

// Configuration
return [{
  json: {
    method: 'GET',
    url: `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/images`,
    headers: {
      'X-Figma-Token': FIGMA_TOKEN
    }
  }
};

// Node 2: Process Figma Response
// This extracts image URLs from Figma API response

const response = $input.first().json;

if (response.err) {
  return [{
    json: {
      error: true,
      message: response.err
    }
  }];
}

const images = response.meta.images || {};
const imageUrls = Object.entries(images).map(([nodeId, url]) => ({
  nodeId,
  url,
  filename: `figma-${nodeId}.png`
}));

return imageUrls.map(img => ({ json: img }));
