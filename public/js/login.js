// document.getElementById('loginForm').addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData.entries());

//     try {
//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//         const result = await response.json();
//         if (response.ok) {
//             localStorage.setItem('userId', result.user._id); // Store user ID
//             window.location.href = 'vote.html'; // Redirect to voting page
//         } else {
//             alert(result.message);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('userId', result.user._id); // Store user ID
            window.location.href = 'index.html'; // Redirect to home page
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error logging in');
    }
});