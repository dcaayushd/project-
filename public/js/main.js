document.addEventListener('DOMContentLoaded', function () {
    fetchCandidates();
    fetchVotingInfo();
    fetchResults();
    fetchNews();
    setupContactForm();
});

function fetchCandidates() {
    fetch('/api/candidates')
        .then(response => response.json())
        .then(data => {
            const candidateData = document.getElementById('candidateData');
            candidateData.innerHTML = data.map(candidate => `
                <div class="candidate">
                    <h3>${candidate.name}</h3>
                    <p>${candidate.bio}</p>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching candidates:', error));
}

function fetchVotingInfo() {
    fetch('/api/voting')
        .then(response => response.json())
        .then(data => {
            const votingData = document.getElementById('votingData');
            votingData.innerHTML = `<p>${data.instructions}</p>`;
        })
        .catch(error => console.error('Error fetching voting info:', error));
}

function fetchResults() {
    fetch('/api/results')
        .then(response => response.json())
        .then(data => {
            const resultsData = document.getElementById('resultsData');
            resultsData.innerHTML = data.map(result => `
                <p>${result.candidate}: ${result.votes} votes</p>
            `).join('');
        })
        .catch(error => console.error('Error fetching results:', error));
}

function fetchNews() {
    fetch('/api/news')
        .then(response => response.json())
        .then(data => {
            const newsData = document.getElementById('newsData');
            newsData.innerHTML = data.map(news => `
                <p>${news.title}</p>
            `).join('');
        })
        .catch(error => console.error('Error fetching news:', error));
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => alert('सन्देश पठाइयो!'))
            .catch(error => console.error('Error submitting form:', error));
    });
}