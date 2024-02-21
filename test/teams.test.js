const request = require('supertest');
const express = require('express');
const router = require('../routes/teams'); 
const teamsController = require('../controllers/teams'); 

jest.mock('../controllers/teams'); // Mock the teamsController
jest.mock('../middleware/authenticate', () => ({ // Mock the authenticate middleware
  isAuthenticated: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use('/teams', router);


describe('Teams Routes', () => {
  describe('GET /teams', () => {
    test('should fetch all teams', async () => {
      const mockTeams = [
        {
          "Team_ID": "MAN",
          "Team_Name": "Manchester United",
          "Venue": "Old Trafford",
          "Location": "Manchester",
          "Year_Founded": 1878,
          "Coach_ID": "C002"
        },
        {
          "Team_ID": "MAN",
          "Team_Name": "Manchester United",
          "Venue": "Old Trafford",
          "Location": "Manchester",
          "Year_Founded": 1878,
          "Coach_ID": "C002"
        }
      ];
      teamsController.getAllTeams.mockImplementation((req, res) => res.status(200).json(mockTeams));

      const response = await request(app).get('/teams');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockTeams);
    });
  });

  describe('GET /teams/:Team_ID', () => {
    test('should fetch a single team by ID', async () => {
      const mockTeam = {
        "Team_ID": "MAN",
        "Team_Name": "Manchester United",
        "Venue": "Old Trafford",
        "Location": "Manchester",
        "Year_Founded": 1878,
        "Coach_ID": "C002"
      };
      teamsController.getTeamById.mockImplementation((req, res) => res.status(200).json(mockTeam));

      const response = await request(app).get('/teams/T001');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockTeam);
    });
  });

  describe('POST /teams', () => {
    test('should create a new team', async () => {
      const newTeamData = {
        "Team_ID": "MAN",
        "Team_Name": "Manchester United",
        "Venue": "Old Trafford",
        "Location": "Manchester",
        "Year_Founded": 1878,
        "Coach_ID": "C002"
      };
      teamsController.createTeam.mockImplementation((req, res) => res.status(201).json(newTeamData));

      const response = await request(app).post('/teams').send(newTeamData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newTeamData);
    });
  });

  describe('PUT /teams/:Team_ID', () => {
    test('should update a team', async () => {
      const teamId = 'MAN';
      const updateData = {
        "Team_ID": "MAN",
        "Team_Name": "Manchester United",
        "Venue": "Old Trafford",
        "Location": "Manchester",
        "Year_Founded": 1878,
        "Coach_ID": "C002"
      };
      teamsController.updateTeam.mockImplementation((req, res) => res.status(200).json({ Team_ID: teamId, ...updateData }));

      const response = await request(app).put(`/teams/${teamId}`).send(updateData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ Team_ID: teamId, ...updateData });
    });
  });

  describe('DELETE /teams/:Team_ID', () => {
    test('should delete a team', async () => {
      const teamId = 'MAN';
      teamsController.deleteTeam.mockImplementation((req, res) => res.status(204).send());

      const response = await request(app).delete(`/teams/${teamId}`);
      expect(response.statusCode).toBe(204);
    });
  });
});
