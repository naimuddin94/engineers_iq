function calculateReadTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;

  return Math.ceil(wordCount / wordsPerMinute);
}

export default calculateReadTime;
