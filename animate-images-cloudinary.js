// ANIMATE IMAGES WITH CLOUDINARY (FREE!)
// Add this node after "Parse Bright Data Response"

const posts = $input.all();

// Cloudinary settings (you'll need to sign up - takes 2 minutes)
// Sign up at: https://cloudinary.com (FREE plan: 25GB storage, 25GB bandwidth/month)
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // Get from Cloudinary dashboard
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_uploads'; // Or create your own preset

const animatedPosts = posts.map(item => {
  const post = item.json;
  const imageUrl = post.image_url;

  if (!imageUrl || !imageUrl.startsWith('http')) {
    return item;
  }

  // Use Cloudinary's fetch transformation to add effects
  // Effects: e_blur:300 for blur, e_grayscale for B&W, e_sepia, etc.
  // For animation effect, we use zoom and rotate transformations

  // Option 1: Simple zoom effect (makes image appear to "breathe")
  const animatedUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/e_loop/du_3.0/fl_animated.webp/${encodeURIComponent(imageUrl)}`;

  // Option 2: Ken Burns effect (zoom + pan - more dramatic)
  // const animatedUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/e_zoom:1.2,e_loop/du_3.0/${encodeURIComponent(imageUrl)}`;

  return {
    json: {
      ...post,
      image_url: imageUrl, // Keep original
      animated_url: animatedUrl, // Add animated version
      has_animation: true
    }
  };
});

return animatedPosts;
