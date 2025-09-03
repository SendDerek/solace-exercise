jest.mock('../../../db', () => ({
  select: jest.fn()
}));

import { GET } from './route';
import db from '../../../db';

const mockDb = db as jest.Mocked<typeof db>;

describe('/api/advocates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return advocates data', async () => {
      const mockAdvocates = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          city: 'New York',
          degree: 'MD',
          specialties: ['Cardiology'],
          yearsOfExperience: 5,
          phoneNumber: 1234567890,
          createdAt: '2025-09-02T23:49:37.246Z'
        }
      ];

      mockDb.select.mockReturnValue({
        from: jest.fn().mockResolvedValue(mockAdvocates)
      } as any);

      const response = await GET();
      const result = await response.json();

      expect(mockDb.select).toHaveBeenCalled();
      expect(result).toEqual({ data: mockAdvocates });
      expect(response.status).toBe(200);
    });

    it('should handle database errors', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockRejectedValue(new Error('Database error'))
      } as any);

      await expect(GET()).rejects.toThrow('Database error');
    });
  });
});