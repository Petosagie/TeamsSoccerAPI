const validator = require('../helpers/validate');

const saveCoaches = (req, res, next) => {
  const validationRule = {
    Coach_ID: 'required|string',
    Name: 'required|string',
    Age: 'required|numeric',
    Nationality: 'required|string',
    Team_ID: 'required|string',
    
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveMatches = (req, res, next) => {
  const validationRule = {
    Match_ID: 'required|string',
    Date: "required|Date",
    Teams_Involved : 'required|string',
    Score: 'required|string',
    Stadium: 'required|string',
    Goals: "array",
        
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const savePlayers = (req, res, next) => {
  const validationRule = {
    Player_ID: 'required|string',
    Name: 'required|string',
    Age: 'required|numeric',
    Height: 'required|numeric',
    Nationality: 'required|string',   
    Position: 'required|string',
    Team_ID: 'required|string'

    };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const saveTeams = (req, res, next) => {
  const validationRule = {
    Team_ID: {
      rule: 'required|string|regex:/^T\\d{3}$/',
      message: 'Team_ID must be a string starting with "T" followed by exactly 3 digits, like "T012".',
    },
    Team_Name: 'required|string',
    Venue: 'required|string',
    Location: 'required|string',
    Founded_Year: 'required|numeric',
    Coach_ID: 'required|string',
  
    };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCoaches,
  saveMatches,
  savePlayers,
  saveTeams
};