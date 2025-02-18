const User = require('../models/user');
const Candidate = require('../models/candidate');
const Vote = require('../models/vote');

exports.vote = async (req, res) => {
    try {
        const { userId, candidateId } = req.body;

        // Check if the user has already voted
        const user = await User.findById(userId);
        if (user.hasVoted) {
            return res.status(400).json({ message: 'You have already voted.' });
        }

        // Find the candidate and increment their vote count
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found.' });
        }

        candidate.votes += 1; // Increment the vote count
        await candidate.save();

        // Mark the user as having voted and store the candidate ID
        user.hasVoted = true;
        user.votedFor = candidateId; // Store the candidate ID
        await user.save();

        // Store the vote in the votes collection for auditing
        const vote = new Vote({
            userId,
            candidateId,
            votedAt: new Date()
        });
        await vote.save();

        res.status(200).json({ message: 'Vote submitted successfully!', success: true });
    } catch (error) {
        console.error('Error submitting vote:', error);
        res.status(500).json({ message: 'Error submitting vote', error });
    }
};