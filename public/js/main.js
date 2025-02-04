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
                <div class="candidate-card">
                    <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo" />
                    <h3>${candidate.name}</h3>
                    <p class="party">${candidate.party}</p>
                    <p class="bio">${candidate.bio}</p>
                    <button class="vote-button" onclick="handleVote('${candidate._id}')">Vote</button>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching candidates:', error));
}

function handleVote(candidateId) {
    const isRegistered = localStorage.getItem('isRegistered') === 'true';
    if (isRegistered) {
        // Submit vote
        fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: localStorage.getItem('userId'), candidateId })
        })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => console.error('Error submitting vote:', error));
    } else {
        // Redirect to registration page
        window.location.href = 'register.html';
    }
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

// Fetch election news
function fetchNews() {
    fetch('/api/news')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('News Data:', data); // Log the fetched news data
            const newsData = document.getElementById('newsData');
            if (data.length === 0) {
                newsData.innerHTML = `<p>No election news available at the moment.</p>`;
            } else {
                newsData.innerHTML = data.map(article => `
                    <div class="news-item">
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.link}" target="_blank">Read more</a>
                    </div>
                `).join('');
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error); // Log the error
            const newsData = document.getElementById('newsData');
            newsData.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
        });
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
    window.location.reload(); // Reload the page to apply the new language
}

function updateLanguage() {
    const language = localStorage.getItem('language') || 'np';
    const translations = {
        np: {
            home: "गृहपृष्ठ",
            candidates: "उम्मेदवार",
            votingInfo: "मतदान",
            results: "नतिजा",
            news: "समाचार",
            contact: "सम्पर्क",
            ElectionNepal: "नेपाल निर्वाचन आयोग",
            ElectionBio: "स्वतन्त्र, निष्पक्ष र पारदर्शी निर्वाचनको ग्यारेन्टी",
            HowToVote: "मतदान कसरी गर्ने?",
            register: "मतदाता दर्ता",
            candidatesHeading: "उम्मेदवारहरू",
            votingInfoHeading: "मतदान जानकारी",
            resultsHeading: "नतिजा",
            newsHeading: "समाचार",
            contactHeading: "सम्पर्क",
            Copyright: "© २०२५ नेपाल निर्वाचन आयोग",
            login: "लगइन",
            loginNow: "लगइन गर्नुहोस्",
            forgotPassword: "पासवर्ड बिर्सनु भयो?",
            resetPassword: "पासवर्ड रिसेट",
            namePlaceholder: "नाम",
            emailPlaceholder: "इमेल",
            messagePlaceholder: "सन्देश",
            citizenshipNumberPlaceholder: "नागरिकता नम्बर",
            loginIdPlaceholder: "मतदाता परिचयपत्र नम्बर वा नागरिकता नम्बर",
            newPasswordPlaceholder: "नयाँ पासवर्ड",
            fullNamePlaceholder: "पुरा नाम",
            addressPlaceholder: "ठेगाना",
            passwordPlaceholder: " पासवर्ड",
            dobPlaceholder: "जन्म मिति",
            loginPasswordPlaceholder: "पासवर्ड",
            
            //  Translations for howToVote.html
            VotingInstructions: "मतदान प्रक्रिया नेपालमा सजिलो र पारदर्शी छ। तल दिइएका चरणहरू अनुसरण गर्नुहोस्:",
            VotingInPerson: "मतदान केन्द्रमा मतदान गर्ने तरिका",
            Step1: "मतदाता दर्ता गर्नुहोस्: मतदाता दर्ता गर्नुहोस् र तपाईंको मतदाता परिचयपत्र प्राप्त गर्नुहोस्।",
            Step2: "मतदान केन्द्र पत्ता लगाउनुहोस्: तपाईंको मतदान केन्द्रको स्थान पत्ता लगाउनुहोस्।",
            Step3: "मतदान दिनुहोस्: मतदान दिनको लागि मतदान केन्द्रमा जानुहोस् र आफ्नो मतदान गर्नुहोस्।",
            Step4: "मतदान प्रमाणपत्र प्राप्त गर्नुहोस्: मतदान पछि मतदान प्रमाणपत्र प्राप्त गर्नुहोस्।",
            VotingOnline: "अनलाइन मतदान गर्ने तरिका",

        },
        en: {
            home: "Home",
            candidates: "Candidates",
            votingInfo: "Voting",
            results: "Results",
            news: "News",
            contact: "Contact",
            ElectionNepal: "Nepal Election Commission",
            ElectionBio: "Guarantee of free, fair, and transparent elections",
            HowToVote: "How to Vote?",
            register: "Register",
            candidatesHeading: "Candidates",
            votingInfoHeading: "Voting Information",
            resultsHeading: "Results",
            newsHeading: "News",
            contactHeading: "Contact",
            login: "Login",
            loginNow: "Login",
            forgotPassword: "Forgot Password?",
            resetPassword: "Reset Password",
            Copyright: "© 2025 Nepal Election Commission",
            namePlaceholder: "Name",
            emailPlaceholder: "Email",
            messagePlaceholder: "Message",
            citizenshipNumberPlaceholder: "Citizenship Number",
            loginIdPlaceholder: "Voter ID or Citizenship Number",
            newPasswordPlaceholder: "New Password",
            fullNamePlaceholder: "Full Name",
            addressPlaceholder: "Address",
            passwordPlaceholder: "Password",
            dobPlaceholder: "DOB",
            loginPasswordPlaceholder: "Password",
            // Translations for howToVote.html
            VotingInstructions: "The voting process in Nepal is simple and transparent. Follow the steps below:",
            VotingInPerson: "Voting in Person at Polling Center",
            Step1: "Register to Vote: Register as a voter and obtain your voter ID card.",
            Step2: "Locate Your Polling Center: Find the location of your polling center.",
            Step3: "Cast Your Vote: Visit the polling center and cast your vote.",
            Step4: "Receive Voting Certificate: Obtain your voting certificate after voting.",
            VotingOnline: "Voting Online",
        }
    };
    
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language][key]) {
                element.innerText = translations[language][key];
            }
        });

    // Update input placeholders
    const placeholders = {
        name: translations[language].namePlaceholder,
        email: translations[language].emailPlaceholder,
        message: translations[language].messagePlaceholder,
        citizenshipNumber: translations[language].citizenshipNumberPlaceholder,
        loginId: translations[language].loginIdPlaceholder,
        newPassword: translations[language].newPasswordPlaceholder,
        fullName: translations[language].fullNamePlaceholder,
        address: translations[language].addressPlaceholder,
        password: translations[language].passwordPlaceholder,
        dob: translations[language].dobPlaceholder,
        loginPassword: translations[language].loginPasswordPlaceholder

    };

    Object.keys(placeholders).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = placeholders[id];
        }
    });
}

// Call updateLanguage() when the page loads
document.addEventListener('DOMContentLoaded', updateLanguage);