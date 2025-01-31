document.addEventListener('DOMContentLoaded', function () {
    fetchElectionData();
    fetchNewsData();
    setupContactForm();
});

function fetchElectionData() {
    fetch('/api/elections')
        .then(response => response.json())
        .then(data => {
            const electionData = document.getElementById('electionData');
            electionData.innerHTML = `<p>${data.name}</p><p>${data.date}</p>`;
        })
        .catch(error => console.error('Error fetching election data:', error));
}

function fetchNewsData() {
    fetch('/api/news')
        .then(response => response.json())
        .then(data => {
            const newsData = document.getElementById('newsData');
            newsData.innerHTML = data.map(news => `<p>${news.title}</p>`).join('');
        })
        .catch(error => console.error('Error fetching news data:', error));
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