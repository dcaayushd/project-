document.addEventListener('DOMContentLoaded', async function () {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Please login to vote.');
        window.location.href = 'login.html';
        return;
    }

    // Fetch candidates
    const response = await fetch('/api/candidates');
    const candidates = await response.json();
    const candidateList = document.getElementById('candidateList');
    candidateList.innerHTML = candidates.map(candidate => `
        <div class="candidate">
            <h3>${candidate.name}</h3>
            <p>${candidate.bio}</p>
            <button onclick="voteForCandidate('${candidate._id}')">Vote</button>
        </div>
    `).join('');
});

async function voteForCandidate(candidateId) {
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, candidateId })
        });
        const result = await response.json();
        alert(result.message);
        window.location.href = 'index.html'; // Redirect to homepage
    } catch (error) {
        console.error('Error:', error);
    }
}