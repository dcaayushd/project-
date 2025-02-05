document.addEventListener('DOMContentLoaded', function() {
    let currentForm = 'resetPassword';
    let voterIdResult = null;

    // Helper function to safely get translated text
    function getTranslatedText(key, defaultText) {
        const element = document.querySelector(`[data-translate="${key}"]`);
        return element ? element.textContent : defaultText;
    }

    // Function to switch between forms
    window.showForm = function(formType) {
        const resetForm = document.getElementById('resetPasswordForm');
        const retrieveForm = document.getElementById('retrieveVoterIdForm');
        const buttons = document.querySelectorAll('.tab-button');
        const existingResult = document.querySelector('.voter-id-result');
        
        buttons.forEach(button => button.classList.remove('active'));
        
        if (formType === 'resetPassword') {
            resetForm.style.display = 'block';
            retrieveForm.style.display = 'none';
            buttons[0].classList.add('active');
            // Remove voter ID result when switching to reset password form
            if (existingResult) {
                existingResult.remove();
            }
        } else {
            resetForm.style.display = 'none';
            retrieveForm.style.display = 'block';
            buttons[1].classList.add('active');
            // Restore voter ID result if it exists
            if (voterIdResult && !existingResult) {
                retrieveForm.after(voterIdResult);
            }
        }
        currentForm = formType;
    };

    // Reset Password Form Handler
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            try {
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = getTranslatedText('pleaseWait', 'Please wait...');

                const identifier = document.getElementById('identifier').value.trim();
                const dob = document.getElementById('dob').value;
                const newPassword = document.getElementById('newPassword').value;

                if (!identifier || !dob || !newPassword) {
                    throw new Error('Please fill in all fields');
                }

                if (newPassword.length < 6) {
                    throw new Error('Password must be at least 6 characters long');
                }

                const response = await fetch('/api/users/resetPassword', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier, dob, newPassword })
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }

                alert(result.message);
                window.location.href = 'login.html';
            } catch (error) {
                alert(error.message || 'Error resetting password. Please try again.');
            } finally {
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = getTranslatedText('resetPassword', 'Reset Password');
            }
        });
    }

    // Retrieve Voter ID Form Handler
    const retrieveVoterIdForm = document.getElementById('retrieveVoterIdForm');
    if (retrieveVoterIdForm) {
        retrieveVoterIdForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            try {
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = getTranslatedText('pleaseWait', 'Please wait...');

                const citizenshipNumber = document.getElementById('citizenshipNumber').value.trim();
                const dob = document.getElementById('voterIdDob').value;

                if (!citizenshipNumber || !dob) {
                    throw new Error('Please fill in all fields');
                }

                const response = await fetch('/api/users/retrieveVoterId', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ citizenshipNumber, dob })
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }

                // Store the voter ID result
                const resultContainer = document.createElement('div');
                resultContainer.className = 'voter-id-result';
                resultContainer.innerHTML = `
                    <p><span data-translate="voterIdResult">${getTranslatedText('voterIdResult', 'तपाईंको मतदाता परिचयपत्र:')}</span> <strong>${result.voterId}</strong></p>
                    <button data-translate="copyToClipboard" onclick="copyVoterId('${result.voterId}')" class="copy-button">
                        ${getTranslatedText('copied', 'क्लिपबोर्डमा कपी गर्नुहोस्')}
                    </button>
                `;

                // Remove any existing result container
                const existingResult = document.querySelector('.voter-id-result');
                if (existingResult) {
                    existingResult.remove();
                }

                // Store the result and add it after the form
                voterIdResult = resultContainer;
                retrieveVoterIdForm.after(voterIdResult);

            } catch (error) {
                alert(error.message || 'Error retrieving Voter ID. Please try again.');
            } finally {
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = getTranslatedText('retrieveVoterId', 'Retrieve Voter ID');
            }
        });
    }

    // Override the language change function
    window.changeLanguage = function(lang) {
        localStorage.setItem('language', lang);
        updateLanguage();
    };

    // Copy Voter ID function
    window.copyVoterId = function(voterId) {
        navigator.clipboard.writeText(voterId).then(() => {
            alert(getTranslatedText('copied', 'Copied to clipboard!'));
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard. Please try again.');
        });
    };
});