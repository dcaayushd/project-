document.addEventListener('DOMContentLoaded', function () {
    fetchCandidates();
    fetchVotingInfo();
    fetchResults();
    fetchNews();
    setupContactForm();
    updateLanguage();
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

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    window.location.reload();
}

function updateLanguage() {
    const language = localStorage.getItem('language') || 'np';
    const translations = {
        np: {
            welcome: "स्वागतम्",
            register: "दर्ता गर्नुहोस्",
            votingInfo: "मतदान जानकारी",
            candidates: "उम्मेदवारहरू",
            results: "नतिजा",
            news: "समाचार",
            contact: "सम्पर्क",
            ElectionNepal: "नेपाल निर्वाचन आयोग",
            ElectionBio: "स्वतन्त्र, निष्पक्ष र पारदर्शी निर्वाचनको ग्यारेन्टी",
            home: "गृहपृष्ठ",
            HowToVote: "मतदान कसरी गर्ने?",
        },
        en: {
            welcome: "Welcome",
            register: "Register",
            votingInfo: "Voting Information",
            candidates: "Candidates",
            results: "Results",
            news: "News",
            contact: "Contact",
            ElectionNepal: "Nepal Election Commission",
            ElectionBio:"Guarantee of free, fair and transparent elections",
            home: "Home",
            HowToVote: "How to vote?"
        }
    };

    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.innerText = translations[language][key];
    });
}