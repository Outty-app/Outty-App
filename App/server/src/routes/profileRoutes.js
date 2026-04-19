jest.mock('../src/services/profileServices');
const supertest = require('supertest');
const app = require('../index'); 
const request = supertest(app);
const { 
    createProfile, 
    getProfile, 
    updateProfile, 
    deleteProfile 
} = require('../src/services/profileServices');

describe('Profile API Suite', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // TEST 1: Creation
    describe('POST /api/profile/:uid', () => {
        it('should return a 201 after successful profile creation', async () => {
            createProfile.mockResolvedValue('profile created');
            const res = await request
                .post('/api/profile/test-user-123')
                .send({ displayName: 'Test User' });
            
            expect(res.status).toBe(201);
            expect(res.body).toBe('profile created');
        });
    });

    // TEST 2: Retrieval
    describe('GET /api/profile/:uid', () => {
        it('should return a 200 if the profile exists', async () => {
            const mockData = { uid: 'test-user-123', displayName: 'Test User' };
            getProfile.mockResolvedValue(mockData);
            
            const res = await request.get('/api/profile/test-user-123');
            
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockData);
        });
    });
});