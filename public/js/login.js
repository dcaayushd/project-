// document.getElementById('loginForm').addEventListener('submit', async function (e) {
//     e.preventDefault();
    
//     // Directly get values from input elements
//     const loginId = document.getElementById('loginId').value;
//     const loginPassword = document.getElementById('loginPassword').value;

//     const data = {
//         loginId,
//         password: loginPassword
//     };

//     try {
//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
        
//         const result = await response.json();
        
//         if (response.ok) {
//             localStorage.setItem('userId', result.user._id);
//             localStorage.setItem('isRegistered', 'true');
//             localStorage.setItem('userFullName', result.user.fullName);
//             window.location.href = 'index.html';
//         } else {
//             alert(result.message || 'Login failed');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error logging in');
//     }
// });

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
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
            // Store user information
            localStorage.setItem('userId', result.user._id);
            localStorage.setItem('isRegistered', 'true');
            localStorage.setItem('userFullName', result.user.fullName);
            
            // Important: Set votedFor status from user data
            if (result.user.votedFor) {
                localStorage.setItem('votedFor', result.user.votedFor);
            } else {
                // Clear votedFor if user hasn't voted
                localStorage.removeItem('votedFor');
            }
            
            window.location.href = 'index.html';
        } else {
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error logging in');
    }
});