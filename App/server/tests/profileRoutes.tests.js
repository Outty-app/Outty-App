jest.mock('../src/services/profileServices');
const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../src/services/profileServices');

describe('POST /api/profile/:uid', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it('should return a 201 after successful profile creation', async () => {
        createProfile.mockResolvedValue({uid: '231'});
        const res = await request
        .post('/api/profile/231')
        .send({uid: '231'});
        expect(res.status).toBe(201);
        expect(res.body.uid).toBeDefined();
    })
    it('should return a 409 error if duplicate profile is created', async () => {
        createProfile.mockRejectedValue(new Error('Profile already exists'));
        const res = await request
        .post('/api/profile/231')
        .send({uid: '231'});
        expect(res.status).toBe(409);
    })
    
});