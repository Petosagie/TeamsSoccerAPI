const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;


const getAllTeams = (req, res) => {
  //#swagger.tags=['teams']  
  const result = mongodb.getDatabase().db().collection('teams').find();
  result.toArray()
    .then(teams => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(teams);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};


const getSingleTeam = (req, res) => {
  //#swagger.tags=['teams']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid teams id to find an teams.');
  }

  const teamsId = new ObjectId(req.params.id);
  const result = mongodb.getDatabase().db().collection('teams').find({ _id: teamsId });

  result.toArray()
  result.toArray()
    .then(teams => {
      if (teams.length === 0) {
        return res.status(404).json('teams not found.');
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(teams[0]);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};

  const createTeam = async (req, res) => {
    //#swagger.tags=['teams']
    const teams = {
      Team_ID: req.body.Team_ID,
      Team_Name: req.body.Team_Name,
      Venue: req.body.Venue,
      Location: req.body.Location,
      Founded_Year: req.body.Founded_Year,
      Coach_ID: req.body.Coach_ID
    };

    try {
      const response = await mongodb.getDatabase().db().collection('teams').insertOne(teams);

      if (response.acknowledged > 0) {
        res.status(204).send();
      } else {
        res.status(500).json('Failed to insert the teams. No documents were created.');
      }
    } catch (error) {
      console.error('Error during teams creation:', error);
      res.status(500).json(error.message || 'Some error occurred while creating the teams.');
    }
  };



  const   updateTeam = async (req, res) => {
    //#swagger.tags=['teams']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid teams id to find an teams.');
    }
    const teamsId = new ObjectId(req.params.id);
    const teams = {
      Team_ID: req.body.Team_ID,
      Team_Name: req.body.Team_Name,
      Venue: req.body.Venue,
      Location: req.body.Location,
      Founded_Year: req.body.Founded_Year,
      Coach_ID: req.body.Coach_ID
    };
    const response = await mongodb.getDatabase().db().collection('teams').replaceOne({ _id: teamsId }, teams);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(response.error || 'Some error occurred while updating the teams.');
    }
  };

  const deleteTeam = async (req, res) => {
    //#swagger.tags=['teams']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid teams id to find an teams.');
    }
    const teamsId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('teams').deleteOne({ _id: teamsId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(response.error || 'Some error occurred while updating the teams.');
    }
  };

module.exports = {
  getAllTeams,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};
