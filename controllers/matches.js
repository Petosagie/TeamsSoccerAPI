const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;


const getAllMatches = (req, res) => {
  //#swagger.tags=['matches']  
  const result = mongodb.getDatabase().db().collection('matches').find();
  result.toArray()
    .then(matches => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(matches);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};

const getSingleMatch = (req, res) => {
  //#swagger.tags=['matches']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid matches id to find an matches.');
  }

  const matchesId = new ObjectId(req.params.id);
  const result = mongodb.getDatabase().db().collection('matches').find({ _id: matchesId });

  result.toArray()
  result.toArray()
    .then(matches => {
      if (matches.length === 0) {
        return res.status(404).json('matches not found.');
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(matches[0]);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};

  const  createMatch = async (req, res) => {
    //#swagger.tags=['matches']
    const matches = {
      Match_ID: req.body.Match_ID,
      Date: new Date(req.body.Date),
      Teams_Involved: req.body.Teams_Involved,

      Score: req.body.Score,
      Stadium: req.body.Stadium,
      Goals: req.body.Goals.map(goal => ({
        Player_ID: goal.Player_ID,
        Time: parseInt(goal.Time)
      }))
    };

    try {
      const response = await mongodb.getDatabase().db().collection('matches').insertOne(matches);

      if (response.acknowledged > 0) {
        res.status(204).send();
      } else {
        res.status(500).json('Failed to insert the matches. No documents were created.');
      }
    } catch (error) {
      console.error('Error during matches creation:', error);
      res.status(500).json(error.message || 'Some error occurred while creating the matches.');
    }
  };



  const updateMatch = async (req, res) => {
    //#swagger.tags=['matches']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid matches id to find an matches.');
    }
    const matchesId = new ObjectId(req.params.id);
    const matches = {
      Match_ID: req.body.Match_ID,
      Date: new Date(req.body.Date),
      Teams_Involved: req.body.Teams_Involved,
      Score: req.body.Score,
      Stadium: req.body.Stadium,
      Goals: req.body.Goals.map(goal => ({
        Player_ID: goal.Player_ID,
        Time: parseInt(goal.Time)
      }))
    };
    const response = await mongodb.getDatabase().db().collection('matches').replaceOne({ _id: matchesId }, matches);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(response.error || 'Some error occurred while updating the matches.');
    }
  };

  const deleteMatch = async (req, res) => {
    //#swagger.tags=['matches']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid matches id to find an matches.');
    }
    const matchesId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('matches').deleteOne({ _id: matchesId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(response.error || 'Some error occurred while updating the matches.');
    }
  };



module.exports = {
  getAllMatches,
  getSingleMatch,
  createMatch,
  updateMatch,
  deleteMatch,
};
