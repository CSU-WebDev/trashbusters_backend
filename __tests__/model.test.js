const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const PinDatas = require('../models/model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('PinDatas Model Test', () => {
  it('should create and save a new PinDatas instance successfully', async () => {
    const validPin = new PinDatas({
      lat: 40.123,
      lng: -74.456,
      desc: 'Test pin',
    });

    const savedPin = await validPin.save();

    expect(savedPin._id).toBeDefined();
    expect(savedPin.lat).toBe(validPin.lat);
    expect(savedPin.lng).toBe(validPin.lng);
    expect(savedPin.desc).toBe(validPin.desc);
  });

  it('should not create a PinDatas instance with missing required fields', async () => {
    const invalidPin = new PinDatas({
      lat: 40.123,
    });

    try {
      await invalidPin.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.lng).toBeDefined();
      expect(error.errors.desc).toBeDefined();
    }
  });

  
});
