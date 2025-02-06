document.addEventListener('DOMContentLoaded', function () {
    const isRegistered = localStorage.getItem('isRegistered') === 'true';
    const userFullName = localStorage.getItem('userFullName');
    
    if (isRegistered && userFullName) {
        // Hide the register button
        const registerButton = document.getElementById('registerButton');
        if (registerButton) {
            registerButton.style.display = 'none';
        }

        // Center the "How to Vote" button
        const ctaButtons = document.querySelector('.cta-buttons');
        if (ctaButtons) {
            ctaButtons.style.justifyContent = 'center';
        }

        // Display the logged-in user's name
        const loggedInUser = document.getElementById('loggedInUser');
        const userFullNameElement = document.getElementById('userFullName');
        if (loggedInUser && userFullNameElement) {
            loggedInUser.style.display = 'block';
            userFullNameElement.innerText = userFullName;

            // // Toggle user options on clicking the user's name
            // userFullNameElement.addEventListener('click', function () {
            //     const userOptions = document.querySelector('.user-options');
            //     userOptions.style.display = userOptions.style.display === 'block' ? 'none' : 'block';
            // });
            // Toggle user options visibility when the user's name is clicked
            document.getElementById('userFullName').addEventListener('click', function (event) {
                const userOptions = document.querySelector('.user-options');

                userOptions.style.display = userOptions.style.display === 'block' ? 'none' : 'block';
            });

            // Hide the dropdown if clicking outside of it
            document.addEventListener('click', function () {
                event.stopPropagation(); // Prevent the click from propagating to the document

                if (userOptions.style.display === 'block') {
                    userOptions.style.display = 'none';
                }
            });

            // Logout functionality
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    localStorage.removeItem('userId');
                    localStorage.removeItem('isRegistered');
                    localStorage.removeItem('userFullName');
                    window.location.href = 'login.html'; // Redirect to login page
                });
            }
        }
    }

    fetchCandidates();
    fetchResults();
    fetchPollingCenters();
    fetchUpcomingElections();
    fetchNews();
    setupContactForm();
    updateLanguage();

});

function handleVote(candidateId) {
    const isRegistered = localStorage.getItem('isRegistered') === 'true';
    if (isRegistered) {
        // Ask for confirmation before voting
        const confirmation = confirm("के तपाईं यो उम्मेदवारलाई मत दिन निश्चित हुनुहुन्छ?");
        if (confirmation) {
            // Submit vote
            fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: localStorage.getItem('userId'), 
                    candidateId 
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    // Optionally, redirect or refresh the page
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error submitting vote:', error));
        }
    } else {
        // Redirect to registration page
        window.location.href = 'register.html';
    }
}

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

// function fetchResults() {
//     fetch('/api/results')
//         .then(response => response.json())
//         .then(data => {
//             const resultsData = document.getElementById('resultsData');
//             if (data.length > 0) {
//                 // Sort candidates by votes in descending order
//                 const sortedCandidates = data.sort((a, b) => b.votes - a.votes);
//                 // Get the top 3 candidates
//                 const topCandidates = sortedCandidates.slice(0, 3);

//                 resultsData.innerHTML = topCandidates.map(candidate => `
//                     <div class="candidate-card">
//                         <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo" />
//                         <h3>${candidate.name}</h3>
//                         <p class="party">${candidate.party}</p>
//                         <p class="votes">Votes: <strong>${candidate.votes}</strong></p>
//                     </div>
//                 `).join('');
//             } else {
//                 resultsData.innerHTML = `<p>No results available at the moment.</p>`;
//             }
//         })
//         .catch(error => console.error('Error fetching results:', error));
// }


// function fetchResults() {
//     fetch('/api/results/top')
//         .then(response => response.json())
//         .then(data => {
//             const resultsData = document.getElementById('resultsData');
//             if (data.length > 0) {
//                 resultsData.innerHTML = data.map(candidate => `
//                     <div class="candidate-card">
//                         <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo" />
//                         <h3>${candidate.name}</h3>
//                         <p class="party">${candidate.party}</p>
//                         <p class="votes">Votes: <strong>${candidate.votes}</strong></p>
//                     </div>
//                 `).join('');
//             } else {
//                 resultsData.innerHTML = `<p>No results available at the moment.</p>`;
//             }
//         })
//         .catch(error => console.error('Error fetching results:', error));
// }

// function fetchResults() {
//     fetch('/api/results/top')
//         .then(response => response.json())
//         .then(data => {
//             const resultsData = document.getElementById('resultsData');
//             if (data.length > 0) {
//                 resultsData.innerHTML = data.map(candidate => `
//                     <div class="candidate-card" onclick="location.href='results.html'">
//                         <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo" />
//                         <h3>${candidate.name}</h3>
//                         <p class="party">${candidate.party}</p>
//                         <p class="votes">Votes: <strong>${candidate.votes}</strong></p>
//                     </div>
//                 `).join('');
//             } else {
//                 resultsData.innerHTML = `<p>No results available at the moment.</p>`;
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching results:', error);
//             resultsData.innerHTML = `<p>Failed to load results. Please try again later.</p>`;
//         });
// }
function fetchResults() {
    fetch('/api/results/top')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Top Candidates Data:', data); // Debugging
            const resultsData = document.getElementById('resultsData');
            if (data.length > 0) {
                resultsData.innerHTML = data.map(candidate => `
                    <div class="candidate-card" onclick="location.href='results.html'">
                        <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo" />
                        <h3>${candidate.name}</h3>
                        <p class="party">${candidate.party}</p>
                        <p class="votes">Votes: <strong>${candidate.votes}</strong></p>
                    </div>
                `).join('');
            } else {
                resultsData.innerHTML = `<p>No results available at the moment.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching results:', error); // Debugging
            resultsData.innerHTML = `<p>Failed to load results. Please try again later.</p>`;
        });
}

// Fetch election news
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
        if (!data.news || data.news.length === 0) {
            newsData.innerHTML = `<p>No news available at the moment.</p>`;
        } else {
            newsData.innerHTML = data.news.map(article => `
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

function fetchUpcomingElections() {
    fetch('/api/elections')
        .then(response => response.json())
        .then(data => {
            const upcomingElectionsData = document.getElementById('upcomingElectionsData');
            if (data.length > 0) {
                upcomingElectionsData.innerHTML = data.map(election => `
                    <div class="election-card">
                        <h3>${election.name}</h3>
                        <p>Date: ${new Date(election.date).toLocaleDateString()}</p>
                        <p>Type: ${election.type}</p>
                        <p>Description: ${election.description}</p>
                    </div>
                `).join('');
            } else {
                upcomingElectionsData.innerHTML = `<p>No upcoming elections available at the moment.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching upcoming elections:', error);
            upcomingElectionsData.innerHTML = `<p>Failed to load upcoming elections. Please try again later.</p>`;
        });
}
function fetchPollingCenters() {
    fetch('/api/polling-stations')
        .then(response => response.json())
        .then(data => {
            const pollingData = document.getElementById('pollingData');
            if (data.length > 0) {
                pollingData.innerHTML = data.map(station => `
                    <div class="polling-card">
                        <h3>${station.name}</h3>
                        <p>Address: ${station.address}</p>
                        <p>District: ${station.district}</p>
                        <p>Opening Hours: ${station.openingHours}</p>
                    </div>
                `).join('');
            } else {
                pollingData.innerHTML = `<p>No polling centers available at the moment.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching polling centers:', error);
            pollingData.innerHTML = `<p>Failed to load polling centers. Please try again later.</p>`;
        });
}
function changeLanguage(lang) {
    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(btn => btn.classList.remove('active'));
    // Add active class to the clicked button
    event.target.classList.add('active');

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
            identifierPlaceholder: "नागरिकता नम्बर वा मतदाता परिचयपत्र नम्बर",
            retrieveVoterId: "मतदाता परिचयपत्र खोज्नुहोस्",
            voterIdResult: "तपाईंको मतदाता परिचयपत्र:",
            copyToClipboard: "क्लिपबोर्डमा कपी गर्नुहोस्",
            copied: "कपी गरियो!",
            pleaseWait: "कृपया पर्खनुहोस्...",
            upcomingElections:"आगामी निर्वाचनहरू",
            loggedInUser: "लगइन",
            
            //  Translations for howToVote.html
            VotingInstructions: "मतदान प्रक्रिया नेपालमा सजिलो र पारदर्शी छ। तल दिइएका चरणहरू अनुसरण गर्नुहोस्:",
            VotingInPerson: "मतदान केन्द्रमा मतदान गर्ने तरिका",
            Step1: "मतदाता दर्ता गर्नुहोस्: मतदाता दर्ता गर्नुहोस् र तपाईंको मतदाता परिचयपत्र प्राप्त गर्नुहोस्।",
            Step2: "मतदान केन्द्र पत्ता लगाउनुहोस्: तपाईंको मतदान केन्द्रको स्थान पत्ता लगाउनुहोस्।",
            Step3: "मतदान दिनुहोस्: मतदान दिनको लागि मतदान केन्द्रमा जानुहोस् र आफ्नो मतदान गर्नुहोस्।",
            Step4: "मतदान प्रमाणपत्र प्राप्त गर्नुहोस्: मतदान पछि मतदान प्रमाणपत्र प्राप्त गर्नुहोस्।",
            VotingOnline: "अनलाइन मतदान गर्ने तरिका",

            //polling stations
            pollingCenters: "मतदान केन्द्रहरू",
            address: "ठेगाना",
            district: "जिल्ला",
            openingHours: "खुल्ने समय",
            showOnMap: "नक्सामा हेर्नुहोस्",
            noPollingCenters: "कुनै मतदान केन्द्र उपलब्ध छैन।",
            errorLoadingCenters: "मतदान केन्द्रहरू लोड गर्न समस्या भयो।"
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
            identifierPlaceholder: "Citizenship Number or Voter ID",
            retrieveVoterId: "Retrieve Voter ID",
            voterIdResult: "Your Voter ID:",
            copyToClipboard: "Copy to Clipboard",
            copied: "Copied to clipboard!",
            pleaseWait: "Please wait...",
            upcomingElections: "Upcoming Elections",
            loggedInUser: "Logged in as:",


            // Translations for howToVote.html
            VotingInstructions: "The voting process in Nepal is simple and transparent. Follow the steps below:",
            VotingInPerson: "Voting in Person at Polling Center",
            Step1: "Register to Vote: Register as a voter and obtain your voter ID card.",
            Step2: "Locate Your Polling Center: Find the location of your polling center.",
            Step3: "Cast Your Vote: Visit the polling center and cast your vote.",
            Step4: "Receive Voting Certificate: Obtain your voting certificate after voting.",
            VotingOnline: "Voting Online",

            //polling centers
            pollingCenters: "Polling Centers",
            address: "Address",
            district: "District",
            openingHours: "Opening Hours",
            showOnMap: "Show on Map",
            noPollingCenters: "No polling centers available.",
            errorLoadingCenters: "Error loading polling centers."
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
        loginPassword: translations[language].loginPasswordPlaceholder,
        identifier: translations[language].identifierPlaceholder,

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