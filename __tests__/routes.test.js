const request = require('supertest'); // For making HTTP requests in tests
const express = require('express'); // Express framework for building APIs
const mongoose = require('mongoose'); // Mongoose for handling MongoDB connections
const bodyParser = require('body-parser'); // For parsing JSON request bodies
const cors = require('cors'); // Middleware to enable CORS
const routes = require('../routes/routes'); // Import API routes
const Model = require('../models/model'); // Import the database model
const { MongoMemoryServer } = require('mongodb-memory-server'); // In-memory MongoDB server for testing

const mongoServer = new MongoMemoryServer();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);
beforeAll(async () => {
    await mongoServer.start();
    const uri = await mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });
  

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});


// Test suite for POST /addPin endpoint
describe('POST /addPin', () => {
  afterEach(async () => {
    await Model.deleteMany({});
  });

// Test case for creating a new pin
  it('should create a new pin', async () => {
    const pin = {
      lat: 40.123,
      lng: -74.456,
      desc: 'Test pin',
    };

    const response = await request(app).post('/api/addPin').send(pin);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(pin);
  });
});

// Test suite for GET /getPins endpoint
describe('GET /getPins', () => {
    // Test case for fetching all pins
    it('should return all pins', async () => {
        const pins = [
            { lat: 40.123, lng: -74.456, desc: 'Test pin 1' },
            { lat: 41.234, lng: -75.567, desc: 'Test pin 2' },
        ];

    await Model.insertMany(pins);

    const response = await request(app).get('/api/getPins');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

// Test case for simulating a database failure
// it('should return an error when there is an issue with the database', async () => {
//   jest.spyOn(Model, 'find').mockImplementation(() => {
//     throw new Error('Database error');
//   });

//   const response = await request(app).get('/api/getPins');

//   expect(response.status).toBe(400);
//   expect(response.body).toMatchObject({ message: 'Database error' });

//   Model.find.mockRestore();
// });

// Test case for deleting a pin by ID
it('should delete a pin by ID', async () => {
    const pin = new Model({ lat: 40.123, lng: -74.456, desc: 'Test pin' });
    await pin.save();
  
    const response = await request(app).delete(`/api/deletePin/${pin._id}`);
  
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: pin._id.toString(),
      lat: pin.lat,
      lng: pin.lng,
      desc: pin.desc,
    });
  });

// Test case for POST /addPin with missing data
it('should return an error when data is missing', async () => {
    const pin = {
        lat: 40.123,
        // lng is missing
        desc: 'Test pin',
    };

    const response = await request(app).post('/api/addPin').send(pin);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ message: expect.any(String) });
});

// Test case for DELETE /deletePin with a non-existent pin ID
it('should return a not found error when pin ID does not exist', async () => {
    const nonExistentId = '60948cc9a56e845a48c6b7e1';

    const response = await request(app).delete(`/api/deletePin/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ message: 'Pin not found' });
  });

// Test case for DELETE /deletePin with an invalid pin ID
it('should return a server error when pin ID is invalid', async () => {
    const invalidId = 'invalid_id';

    const response = await request(app).delete(`/api/deletePin/${invalidId}`);

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({ message: expect.any(String) });
});  