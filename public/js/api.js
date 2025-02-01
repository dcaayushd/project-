// Fetch candidates
async function fetchCandidates() {
    try {
        const response = await fetch('/api/candidates');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching candidates:', error);
    }
}

// Fetch voting information
async function fetchVotingInfo() {
    try {
        const response = await fetch('/api/voting');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching voting info:', error);
    }
}

// Fetch election results
async function fetchResults() {
    try {
        const response = await fetch('/api/results');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}

// Fetch news
async function fetchNews() {
    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Submit contact form
async function submitContactForm(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return response.json();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}