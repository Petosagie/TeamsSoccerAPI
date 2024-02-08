const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;


const getAllPlayers = (req, res) => {
  //#swagger.tags=['players']  
  const result = mongodb.getDatabase().db().collection('players').find();
  result.toArray()
    .then(players => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(players);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};


const getSinglePlayer = (req, res) => {
  //#swagger.tags=['players']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid players id to find an players.');
  }

  const playersId = new ObjectId(req.params.id);
  const result = mongodb.getDatabase().db().collection('players').find({ _id: playersId });

  result.toArray()
  result.toArray()
    .then(players => {
      if (players.length === 0) {
        return res.status(404).json('players not found.');
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(players[0]);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};

  const createPlayer = async (req, res) => {
    //#swagger.tags=['players']
    const players = {
      Player_ID: req.body.Player_ID,
      Name: req.body.Name,
      Age: req.body.Age,
      Height: req.body.Height,
      Nationality: req.body.Nationality,
      Position: req.body.Position,
      Team_ID: req.body.Team_ID,
    };

    try {
      const response = await mongodb.getDatabase().db().collection('players').insertOne(players);

      if (response.acknowledged > 0) {
        res.status(204).send();
      } else {
        res.status(500).json('Failed to insert the players. No documents were created.');
      }
    } catch (error) {
      console.error('Error during players creation:', error);
      res.status(500).json(error.message || 'Some error occurred while creating the players.');
    }
  };



  const updatePlayer = async (req, res) => {
    //#swagger.tags=['players']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid players id to find an players.');
    }
    const playersId = new ObjectId(req.params.id);
    const players = {
      Player_ID: req.body.Player_ID,
      Name: req.body.Name,
      Age: req.body.Age,
      Height: req.body.Height,
      Nationality: req.body.Nationality,
      Position: req.body.Position,
      Team_ID: req.body.Team_ID,
    };
    const response = await mongodb.getDatabase().db().collection('players').replaceOne({ _id: playersId }, players);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(response.error || 'Some error occurred while updating the players.');
    }
  };

  const deletePlayer = async (req, res) => {
    //#swagger.tags=['players']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid players id to find an players.');
    }
    const playersId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('players').deleteOne({ _id: playersId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    }
    else {
      res.status(500).json(response.error || 'Some error occurred while updating the players.');
    }
  };


module.exports = {
  getAllPlayers,
  getSinglePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
