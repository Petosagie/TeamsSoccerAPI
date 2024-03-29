const request = require('supertest');
const express = require('express');
const router = require('../routes/coaches');
const coachesController = require('../controllers/coaches');


jest.mock('../controllers/coaches'); // Mock the coachesController
// Mock isAuthenticated middleware
jest.mock('../middleware/authenticate', () => ({
  isAuthenticated: (req, res, next) => next(),
}));


const app = express();
app.use(express.json());
app.use('/coaches', router);

describe('Coaches Routes', () => {
  describe('GET /coaches', () => {
    test('should fetch all coaches', async () => {
      const mockCoaches = [
        {
          Coach_ID: "C001",
          Coach_Name: "Mauricio Pochettino",
          Coach_Age: 51,
          Coach_Nationality: "Argentina",
          No_Matches: 967,
          Team_ID: "CHE"
        },
        {
          Coach_ID: "C002",
          Coach_Name: "Erik Ten Hag",
          Coach_Age: 54,
          Coach_Nationality: "Netherlands",
          No_Matches: 967,
          Team_ID: "MAN"
        }
      ];
      coachesController.getAllCoaches.mockImplementation((req, res) => res.status(200).json(mockCoaches));

      const response = await request(app).get('/coaches');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockCoaches);
    });
  });
});


describe('GET /coaches/:Coach_ID', () => {
  test('should fetch a single coach by Coach_ID', async () => {
    const mockCoach = {
      Coach_ID: "C001",
      Coach_Name: "Mauricio Pochettino",
      Coach_Age: 51,
      Coach_Nationality: "Argentina",
      No_Matches: 967,
      Team_ID: "CHE"
    };
    coachesController.getSingleCoach.mockImplementation((req, res) => res.status(200).json(mockCoach));

    const coachId = 'C001';
    const response = await request(app).get(`/coaches/${coachId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCoach);
  });
});


describe('Coaches Routes', () => {
  describe('POST /coaches', () => {
    const validCoachData = {
      Coach_ID: "C001",
      Coach_Name: "Mauricio Pochettino",
      Coach_Age: 51,
      Coach_Nationality: "Argentina",
      No_Matches: 967,
      Team_ID: "CHE"
    };

    test('should create a new coach with valid data', async () => {
      coachesController.createCoach.mockImplementation((req, res) => {
        return res.status(201).json({ ...validCoachData });
      });

      const response = await request(app).post('/coaches').send(validCoachData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ ...validCoachData });
    });

    test('should not create a coach with invalid Coach_ID', async () => {
      const invalidCoachData = { ...validCoachData, Coach_ID: "C002" };

      coachesController.createCoach.mockImplementation((req, res) => {
        return res.status(400).json({ error: 'Invalid coach ID format' });
      });

      const response = await request(app).post('/coaches').send(invalidCoachData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid coach ID format');
    });

    test('should not create a coach with invalid age', async () => {
      const invalidCoachData = { ...validCoachData, Coach_Age: 20 };

      coachesController.createCoach.mockImplementation((req, res) => {
        return res.status(400).json({ error: 'Invalid age' });
      });

      const response = await request(app).post('/coaches').send(invalidCoachData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid age');
    });
  });

  describe('PUT /coaches/:Coach_ID', () => {
    const validUpdateData = {
      Coach_ID: "C123",
      Coach_Name: "Testing Name",
      Coach_Age: 51,
      Coach_Nationality: "Argentina",
      No_Matches: 967,
      Team_ID: "CHE"
    };

    test('should update a coach with valid data', async () => {
      const coachId = 'C123';
      coachesController.updateCoach.mockImplementation((req, res) => {
        return res.status(200).json({ Coach_ID: coachId, ...validUpdateData });
      });

      const response = await request(app).put(`/coaches/${coachId}`).send(validUpdateData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ Coach_ID: coachId, ...validUpdateData });
    });

    test('should not update a coach with invalid data', async () => {
      const coachId = 'C123';
      const invalidUpdateData = { ...validUpdateData, Coach_Age: 20 }; // Invalid age

      coachesController.updateCoach.mockImplementation((req, res) => {
        return res.status(400).json({ error: 'Invalid data' });
      });

      const response = await request(app).put(`/coaches/${coachId}`).send(invalidUpdateData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid data');
    });

    test('should handle non-existent coach update', async () => {
      const coachId = 'C123'; // Non-existent coach

      coachesController.updateCoach.mockImplementation((req, res) => {
        return res.status(404).json({ error: "Coach not found" });
      });

      const response = await request(app).put(`/coaches/${coachId}`).send(validUpdateData);
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Coach not found');
    });

  });

  describe('DELETE /coaches/:Coach_ID', () => {
    test('should delete a coach with a valid Coach_ID', async () => {
      const coachId = 'C111';
      coachesController.deleteCoach.mockImplementation((req, res) => {
        return res.status(200).json({ message: 'Coach deleted successfully' });
      });

      const response = await request(app).delete(`/coaches/${coachId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('Coach deleted successfully');
    });

    test('should handle non-existent coach deletion', async () => {
      const coachId = 'C777'; // Non-existent coach

      coachesController.deleteCoach.mockImplementation((req, res) => {
        return res.status(404).json({ error: 'Coach not found' });
      });

      const response = await request(app).delete(`/coaches/${coachId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Coach not found');
    });
  });
});
