document.addEventListener('DOMContentLoaded', function () {
    fetchCandidates();
    fetchElections();
    fetchPollingStations();
    fetchUsers();
});

function fetchCandidates() {
    fetch('/api/candidates')
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

function fetchElections() {
    fetch('/api/elections')
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

function fetchPollingStations() {
    fetch('/api/polling-stations')
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

function fetchUsers() {
    fetch('/api/users')
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
