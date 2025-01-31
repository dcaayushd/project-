document.addEventListener('DOMContentLoaded', function() {
    fetchElectionData();
});

function fetchElectionData() {
    fetch('/api/elections')
        .then(response => response.json())
        .then(data => {
            const electionData = document.getElementById('electionData');
            electionData.innerHTML = `<p>${data.name}</p><p>${data.date}</p>`;
        })
        .catch(error => console.error('Error fetching election data:', error));
}