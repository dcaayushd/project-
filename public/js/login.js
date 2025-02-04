document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Directly get values from input elements
    const loginId = document.getElementById('loginId').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const data = {
        loginId,
        password: loginPassword
    };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            localStorage.setItem('userId', result.user._id);
            localStorage.setItem('isRegistered', 'true');
            window.location.href = 'index.html';
        } else {
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error logging in');
    }
});