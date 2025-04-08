// language.js
const translations = {
    np: {
        home: "गृहपृष्ठ",
        candidates: "उम्मेदवार",
        votingInfo: "मतदान",
        results: "नतिजा",
        news: "समाचार",
        contact: "सम्पर्क",
        castVote: "मतदान गर्नुहोस्",
        voted: "मतदान गरियो",
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
        upcomingElections: "आगामी निर्वाचनहरू",
        loggedInUser: "लगइन",
        submit: "पठाउनुहोस्",
        adminPanel: "प्रशासन प्यानल",
        addCandidate: "उम्मेदवार थप्नुहोस्",
        updateResults: "नतिजा अपडेट गर्नुहोस्",
        manageUsers: "प्रयोगकर्ता व्यवस्थापन",
        logout: "लगआउट",
        
        // Voting Instructions
        VotingInstructions: "मतदान प्रक्रिया नेपालमा सजिलो र पारदर्शी छ। तल दिइएका चरणहरू अनुसरण गर्नुहोस्:",
        VotingInPerson: "मतदान केन्द्रमा मतदान गर्ने तरिका",
        Step1: "मतदाता दर्ता गर्नुहोस्: मतदाता दर्ता गर्नुहोस् र तपाईंको मतदाता परिचयपत्र प्राप्त गर्नुहोस्।",
        Step2: "मतदान केन्द्र पत्ता लगाउनुहोस्: तपाईंको मतदान केन्द्रको स्थान पत्ता लगाउनुहोस्।",
        Step3: "मतदान दिनुहोस्: मतदान दिनको लागि मतदान केन्द्रमा जानुहोस् र आफ्नो मतदान गर्नुहोस्।",
        Step4: "मतदान प्रमाणपत्र प्राप्त गर्नुहोस्: मतदान पछि मतदान प्रमाणपत्र प्राप्त गर्नुहोस्।",
        VotingOnline: "अनलाइन मतदान गर्ने तरिका",

        // Polling Centers
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
        castVote: "Vote",
        voted: "Voted",
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
        submit: "Submit",
        adminPanel: "Admin Panel",
        addCandidate: "Add Candidate",
        updateResults: "Update Results",
        manageUsers: "Manage Users",
        logout: "Logout",

        // Voting Instructions
        VotingInstructions: "The voting process in Nepal is simple and transparent. Follow the steps below:",
        VotingInPerson: "Voting in Person at Polling Center",
        Step1: "Register to Vote: Register as a voter and obtain your voter ID card.",
        Step2: "Locate Your Polling Center: Find the location of your polling center.",
        Step3: "Cast Your Vote: Visit the polling center and cast your vote.",
        Step4: "Receive Voting Certificate: Obtain your voting certificate after voting.",
        VotingOnline: "Voting Online",

        // Polling Centers
        pollingCenters: "Polling Centers",
        address: "Address",
        district: "District",
        openingHours: "Opening Hours",
        showOnMap: "Show on Map",
        noPollingCenters: "No polling centers available.",
        errorLoadingCenters: "Error loading polling centers."
    }
};

function changeLanguage(lang) {
    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(lang)) {
            btn.classList.add('active');
        }
    });

    localStorage.setItem('language', lang);
    updateLanguage();
}

function updateLanguage() {
    const language = localStorage.getItem('language') || 'np';
    
    // Update language switcher buttons
    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(language)) {
            btn.classList.add('active');
        }
    });

    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            if (element.tagName.toLowerCase() === 'input' && element.type === 'submit') {
                element.value = translations[language][key];
            } else {
                element.innerText = translations[language][key];
            }
        }
    });

    // Update Vote buttons
    document.querySelectorAll('.vote-button').forEach(button => {
        button.innerText = translations[language].castVote;
    });

    document.querySelectorAll('.voted-button').forEach(button => {
        button.innerText = translations[language].voted;
    });

    // Update input placeholders
    const placeholderMap = {
        'name': 'namePlaceholder',
        'email': 'emailPlaceholder',
        'message': 'messagePlaceholder',
        'citizenshipNumber': 'citizenshipNumberPlaceholder',
        'loginId': 'loginIdPlaceholder',
        'newPassword': 'newPasswordPlaceholder',
        'fullName': 'fullNamePlaceholder',
        'address': 'addressPlaceholder',
        'password': 'passwordPlaceholder',
        'dob': 'dobPlaceholder',
        'loginPassword': 'loginPasswordPlaceholder',
        'identifier': 'identifierPlaceholder'
    };

    Object.entries(placeholderMap).forEach(([id, translationKey]) => {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = translations[language][translationKey];
        }
    });

    // Dispatch a custom event for other components that might need to know about the language change
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
}

// Export the functions and translations for use in other files
export { translations, changeLanguage, updateLanguage };