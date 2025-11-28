// TRANSLATE NON-ENGLISH CAPTIONS TO ENGLISH
// Add this node after "Filter Posts & Extract Product Links"

const posts = $input.all();

// Build translation prompt for OpenAI
const nonEnglishPosts = [];
const translations = [];

posts.forEach((item, index) => {
  const post = item.json;
  const caption = post.caption;

  // Detect if caption contains non-Latin characters (likely non-English)
  const hasNonLatin = /[^\u0000-\u007F]+/.test(caption);

  // Also detect common non-English patterns
  const hasItalian = /\b(è|à|ì|ò|ù|che|una|della|con|per)\b/i.test(caption);
  const hasFrench = /\b(est|les|des|avec|pour|une|ça)\b/i.test(caption);
  const hasSpanish = /\b(es|los|las|con|para|una|que)\b/i.test(caption);
  const hasPortuguese = /\b(é|com|para|uma|que|mais)\b/i.test(caption);

  if (hasNonLatin || hasItalian || hasFrench || hasSpanish || hasPortuguese) {
    nonEnglishPosts.push({
      index,
      caption,
      author: post.author
    });
  }
});

if (nonEnglishPosts.length === 0) {
  // All captions are in English, return original posts
  return posts;
}

// Build translation prompt
const translationPrompt = `Translate these Instagram captions to English. Keep @mentions, #hashtags, and emojis unchanged. Return ONLY the translations in JSON array format.

${nonEnglishPosts.map((p, i) => `${i + 1}. ${p.caption}`).join('\n\n')}

Return format:
{
  "translations": ["translated text 1", "translated text 2", ...]
}`;

return [{
  json: {
    prompt: translationPrompt,
    posts_to_translate: nonEnglishPosts.length,
    total_posts: posts.length,
    non_english_indices: nonEnglishPosts.map(p => p.index)
  }
}];
