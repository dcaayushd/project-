const Candidate = require('../models/candidate');
const Vote = require('../models/vote');

exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching candidates', error });
    }
};

exports.getTopCandidates = async (req, res) => {
    try {
        // First, count votes for each candidate
        const topCandidates = await Vote.aggregate([
            {
                $group: {
                    _id: '$candidateId',
                    votes: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'candidates',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'candidateDetails'
                }
            },
            {
                $unwind: '$candidateDetails'
            },
            {
                $project: {
                    _id: '$candidateDetails._id',
                    name: '$candidateDetails.name',
                    party: '$candidateDetails.party',
                    photo: '$candidateDetails.photo',
                    votes: 1
                }
            },
            {
                $sort: { votes: -1 }
            },
            {
                $limit: 3
            }
        ]);

        res.status(200).json(topCandidates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top candidates', error: error.message });
    }
};