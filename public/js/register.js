// document.getElementById('voterRegistrationForm').addEventListener('submit', async function (e) {
//     e.preventDefault();
    
//     // Collect form data directly from input elements
//     const fullName = document.getElementById('fullName').value;
//     const address = document.getElementById('address').value;
//     const dob = document.getElementById('dob').value;
//     const citizenshipNumber = document.getElementById('citizenshipNumber').value;
//     const password = document.getElementById('password').value;

//     // Validate date of birth (must be at least 17 years old)
//     const dobDate = new Date(dob);
//     const currentDate = new Date();
//     const minAgeDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 17));
    
//     if (dobDate > minAgeDate) {
//         alert('You must be at least 17 years old to register.');
//         return;
//     }

//     // Prepare data for the API request
//     const data = {
//         fullName,
//         address,
//         dob: dobDate.toISOString(), // Convert to ISO string for MongoDB
//         citizenshipNumber,
//         password,
//     };

//     try {
//         // Send registration request to the server
//         const response = await fetch('/api/users/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//         });
        
//         const result = await response.json();
        
//         if (response.ok) {
//             alert(`Registration successful! Your Voter ID is: ${result.voterId}`);
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
    
    // Collect form data directly from input elements
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const dob = document.getElementById('dob').value;
    const citizenshipNumber = document.getElementById('citizenshipNumber').value;
    const password = document.getElementById('password').value;

    // Validate date of birth (must be at least 17 years old)
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const minAgeDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 17));
    
    if (dobDate > minAgeDate) {
        alert('You must be at least 17 years old to register.');
        return;
    }

    // Prepare data for the API request
    const data = {
        fullName,
        address,
        dob: dobDate.toISOString(), // Convert to ISO string for MongoDB
        citizenshipNumber,
        password,
    };

    try {
        // Send registration request to the server
        // const response = await fetch('/api/users/register', {
            const response = await fetch(`${window.location.origin}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(`Registration successful! Your Voter ID is: ${result.voterId}`);
            window.location.href = 'login.html';
        } else {
            alert(result.message || 'Error registering user');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error registering user. Please try again later.');
    }
});