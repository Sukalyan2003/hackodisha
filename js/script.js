const natural = require('natural');
const Sentiment = require('sentiment');

// Initialize the sentiment analyzer
const sentiment = new Sentiment();

// Keywords indicating fake news
const fakeNewsKeywords = ['hoax', 'conspiracy', 'unconfirmed', 'rumor', 'false'];

// Function to classify news as fake or true
function classifyNews(headline) {
  // Check for fake news keywords
  for (const keyword of fakeNewsKeywords) {
    if (headline.toLowerCase().includes(keyword)) {
      return 'Fake News';
    }
  }

  // Perform sentiment analysis
  const analysis = sentiment.analyze(headline);

  // Use sentiment score to classify news
  if (analysis.score < 0) {
    return 'Fake News';
  } else {
    return 'True News';
  }
}

// Example usage
const newsHeadline1 = 'Scientists discover a new species of butterfly.';
const newsHeadline2 = 'Breaking: UFO sighting in a remote area.';
const newsHeadline3 = 'COVID-19 vaccine proven effective in clinical trials.';
const newsHeadline4 = 'Breaking: Alien invasion confirmed by government sources.';

console.log(`Headline 1: ${classifyNews(newsHeadline1)}`);
console.log(`Headline 2: ${classifyNews(newsHeadline2)}`);
console.log(`Headline 3: ${classifyNews(newsHeadline3)}`);
console.log(`Headline 4: ${classifyNews(newsHeadline4)}`);