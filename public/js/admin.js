// document.addEventListener('DOMContentLoaded', function () {
//     fetchCandidates();
//     fetchElections();
//     fetchPollingStations();
//     fetchUsers();
// });

// function fetchCandidates() {
//     fetch('/api/candidates')
//         .then(response => response.json())
//         .then(data => {
//             const candidateList = document.getElementById('candidateList');
//             candidateList.innerHTML = `
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Party</th>
//                             <th>Bio</th>
//                             <th>Photo</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${data.map(candidate => `
//                             <tr>
//                                 <td>${candidate.name}</td>
//                                 <td>${candidate.party}</td>
//                                 <td>${candidate.bio}</td>
//                                 <td><img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo" /></td>
//                                 <td>
//                                     <button onclick="editCandidate('${candidate._id}')">Edit</button>
//                                     <button onclick="deleteCandidate('${candidate._id}')">Delete</button>
//                                 </td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//             `;
//         })
//         .catch(error => console.error('Error fetching candidates:', error));
// }

// function fetchElections() {
//     fetch('/api/elections')
//         .then(response => response.json())
//         .then(data => {
//             const electionList = document.getElementById('electionList');
//             electionList.innerHTML = `
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${data.map(election => `
//                             <tr>
//                                 <td>${election.name}</td>
//                                 <td>${new Date(election.date).toLocaleDateString()}</td>
//                                 <td>
//                                     <button onclick="editElection('${election._id}')">Edit</button>
//                                     <button onclick="deleteElection('${election._id}')">Delete</button>
//                                 </td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//             `;
//         })
//         .catch(error => console.error('Error fetching elections:', error));
// }

// function fetchPollingStations() {
//     fetch('/api/polling-stations')
//         .then(response => response.json())
//         .then(data => {
//             const pollingStationList = document.getElementById('pollingStationList');
//             pollingStationList.innerHTML = `
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Address</th>
//                             <th>District</th>
//                             <th>Opening Hours</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${data.map(station => `
//                             <tr>
//                                 <td>${station.name}</td>
//                                 <td>${station.address}</td>
//                                 <td>${station.district}</td>
//                                 <td>${station.openingHours}</td>
//                                 <td>
//                                     <button onclick="editPollingStation('${station._id}')">Edit</button>
//                                     <button onclick="deletePollingStation('${station._id}')">Delete</button>
//                                 </td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//             `;
//         })
//         .catch(error => console.error('Error fetching polling stations:', error));
// }

// function fetchUsers() {
//     fetch('/api/users')
//         .then(response => response.json())
//         .then(data => {
//             const userList = document.getElementById('userList');
//             userList.innerHTML = `
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Full Name</th>
//                             <th>Address</th>
//                             <th>DOB</th>
//                             <th>Citizenship Number</th>
//                             <th>Voter ID</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${data.map(user => `
//                             <tr>
//                                 <td>${user.fullName}</td>
//                                 <td>${user.address}</td>
//                                 <td>${new Date(user.dob).toLocaleDateString()}</td>
//                                 <td>${user.citizenshipNumber}</td>
//                                 <td>${user.voterId}</td>
//                                 <td>
//                                     <button onclick="editUser('${user._id}')">Edit</button>
//                                     <button onclick="deleteUser('${user._id}')">Delete</button>
//                                 </td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//             `;
//         })
//         .catch(error => console.error('Error fetching users:', error));
// }
// // Add similar functions for handling form submissions and CRUD operations for candidates, elections, polling stations, and users.



// admin.js
document.addEventListener('DOMContentLoaded', function () {
    fetchCandidates();
    fetchElections();
    fetchPollingStations();
    fetchUsers();
});

// Fetch and display candidates
function fetchCandidates() {
    fetch('/api/admin/candidates')
        .then(response => response.json())
        .then(data => {
            const candidateList = document.getElementById('candidateList');
            candidateList.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Party</th>
                            <th>Bio</th>
                            <th>Photo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(candidate => `
                            <tr>
                                <td>${candidate.name}</td>
                                <td>${candidate.party}</td>
                                <td>${candidate.bio}</td>
                                <td><img src="${candidate.photo}" alt="${candidate.name}" class="candidate-photo" /></td>
                                <td>
                                    <button onclick="editCandidate('${candidate._id}')">Edit</button>
                                    <button onclick="deleteCandidate('${candidate._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(error => console.error('Error fetching candidates:', error));
}

// Add candidate
document.getElementById('addCandidateForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const candidate = {
        name: document.getElementById('candidateName').value,
        party: document.getElementById('candidateParty').value,
        bio: document.getElementById('candidateBio').value,
        photo: document.getElementById('candidatePhoto').value
    };

    try {
        const response = await fetch('/api/admin/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidate)
        });

        if (response.ok) {
            fetchCandidates(); // Refresh the candidate list
        } else {
            console.error('Error adding candidate');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Edit candidate
function editCandidate(id) {
    // Fetch candidate details and populate the form
    // Then handle the form submission to update the candidate
}

// Delete candidate
function deleteCandidate(id) {
    if (confirm('Are you sure you want to delete this candidate?')) {
        fetch(`/api/admin/candidates/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchCandidates(); // Refresh the candidate list
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

// Fetch and display elections
function fetchElections() {
    fetch('/api/admin/elections')
        .then(response => response.json())
        .then(data => {
            const electionList = document.getElementById('electionList');
            electionList.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(election => `
                            <tr>
                                <td>${election.name}</td>
                                <td>${new Date(election.date).toLocaleDateString()}</td>
                                <td>
                                    <button onclick="editElection('${election._id}')">Edit</button>
                                    <button onclick="deleteElection('${election._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(error => console.error('Error fetching elections:', error));
}

// Add election
document.getElementById('addElectionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const election = {
        name: document.getElementById('electionName').value,
        date: document.getElementById('electionDate').value
    };

    try {
        const response = await fetch('/api/admin/elections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(election)
        });

        if (response.ok) {
            fetchElections(); // Refresh the election list
        } else {
            console.error('Error adding election');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Edit election
function editElection(id) {
    // Fetch election details and populate the form
    // Then handle the form submission to update the election
}

// Delete election
function deleteElection(id) {
    if (confirm('Are you sure you want to delete this election?')) {
        fetch(`/api/admin/elections/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchElections(); // Refresh the election list
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

// Fetch and display polling stations
function fetchPollingStations() {
    fetch('/api/admin/polling-stations')
        .then(response => response.json())
        .then(data => {
            const pollingStationList = document.getElementById('pollingStationList');
            pollingStationList.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>District</th>
                            <th>Opening Hours</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(station => `
                            <tr>
                                <td>${station.name}</td>
                                <td>${station.address}</td>
                                <td>${station.district}</td>
                                <td>${station.openingHours}</td>
                                <td>
                                    <button onclick="editPollingStation('${station._id}')">Edit</button>
                                    <button onclick="deletePollingStation('${station._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(error => console.error('Error fetching polling stations:', error));
}

// Add polling station
document.getElementById('addPollingStationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const pollingStation = {
        name: document.getElementById('pollingStationName').value,
        address: document.getElementById('pollingStationAddress').value,
        district: document.getElementById('pollingStationDistrict').value,
        openingHours: document.getElementById('pollingStationOpeningHours').value
    };

    try {
        const response = await fetch('/api/admin/polling-stations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pollingStation)
        });

        if (response.ok) {
            fetchPollingStations(); // Refresh the polling station list
        } else {
            console.error('Error adding polling station');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Edit polling station
function editPollingStation(id) {
    // Fetch polling station details and populate the form
    // Then handle the form submission to update the polling station
}

// Delete polling station
function deletePollingStation(id) {
    if (confirm('Are you sure you want to delete this polling station?')) {
        fetch(`/api/admin/polling-stations/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchPollingStations(); // Refresh the polling station list
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

// Fetch and display users
function fetchUsers() {
    fetch('/api/admin/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>DOB</th>
                            <th>Citizenship Number</th>
                            <th>Voter ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(user => `
                            <tr>
                                <td>${user.fullName}</td>
                                <td>${user.address}</td>
                                <td>${new Date(user.dob).toLocaleDateString()}</td>
                                <td>${user.citizenshipNumber}</td>
                                <td>${user.voterId}</td>
                                <td>
                                    <button onclick="editUser('${user._id}')">Edit</button>
                                    <button onclick="deleteUser('${user._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Edit user
function editUser(id) {
    // Fetch user details and populate the form
    // Then handle the form submission to update the user
}

// Delete user
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/admin/users/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchUsers(); // Refresh the user list
            }
        })
        .catch(error => console.error('Error:', error));
    }
}