// document.getElementById('voterRegistrationForm').addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData.entries());

//     try {
//         const response = await fetch('/api/users/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//         const result = await response.json();
//         alert(result.message);
//         window.location.href = 'login.html'; // Redirect to login page
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });

// document.getElementById('voterRegistrationForm').addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData.entries());

//     // Generate a unique 8-digit voter ID
//     const voterId = Math.floor(10000000 + Math.random() * 90000000).toString();
//     data.voterId = voterId;

//     try {
//         const response = await fetch('/api/users/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//         const result = await response.json();
//         if (response.ok) {
//             alert(`Registration successful! Your Voter ID is: ${voterId}`);
//             window.location.href = 'login.html';
//         } else {
//             alert(result.message || 'Error registering user');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error registering user');
//     }
// });

document.getElementById('voterRegistrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Generate a unique 8-digit voter ID
    const voterId = Math.floor(10000000 + Math.random() * 90000000).toString();
    data.voterId = voterId;

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            alert(`Registration successful! Your Voter ID is: ${voterId}`);
            window.location.href = 'login.html';
        } else {
            alert(result.message || 'Error registering user');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error registering user');
    }
});