const axios = require('axios');
const parser = require('xml2json');

// Keywords for filtering political news in both English and Nepali
const POLITICAL_KEYWORDS = [
    // English keywords
    'election', 'politics', 'government', 'congress', 'parliament',
    'minister', 'party', 'vote', 'campaign', 'candidate',
    'ballot', 'democracy', 'political',
    
    // Nepali keywords (in Unicode)
    'चुनाव', 'निर्वाचन', 'राजनीति', 'सरकार', 'कांग्रेस',
    'संसद', 'मन्त्री', 'पार्टी', 'मतदान', 'प्रचार',
    'उम्मेदवार', 'मतपत्र', 'लोकतन्त्र', 'राजनैतिक',
    'प्रधानमन्त्री', 'मन्त्रिपरिषद', 'विपक्ष', 'सत्तापक्ष',
    'मन्त्रालय', 'सांसद', 'नेता'
];

exports.getElectionNews = async (req, res) => {
    try {
        const response = await axios.get('https://www.onlinekhabar.com/feed');
        
        // Convert XML to JSON
        const jsonData = parser.toJson(response.data);
        
        // Parse the JSON data
        const feed = JSON.parse(jsonData).rss.channel.item;
        
        // Function to check if text contains any political keywords
        const containsPoliticalKeywords = (text) => {
            if (!text) return false;
            text = text.toLowerCase();
            return POLITICAL_KEYWORDS.some(keyword => 
                text.includes(keyword.toLowerCase())
            );
        };

        // Filter news items containing political keywords in either title or description
        const politicalNews = feed.filter(item => {
            const title = item.title || '';
            const description = item.description || '';
            
            // Check both title and description for keywords
            return containsPoliticalKeywords(title) || 
                   containsPoliticalKeywords(description);
        });

        // Transform the response to include relevant fields
        const formattedNews = politicalNews.map(item => ({
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate,
            category: item.category
        }));

        res.status(200).json({
            count: formattedNews.length,
            news: formattedNews
        });
    } catch (error) {
        console.error('News fetching error:', error);
        res.status(500).json({ 
            message: 'Error fetching news', 
            error: error.message 
        });
    }
};