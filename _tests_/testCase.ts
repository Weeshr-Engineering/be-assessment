// Import necessary modules and dependencies
import request from 'supertest'; // Supertest is a library for testing HTTP assertions
import app from '../src/app'; // Assuming your Express app is exported from app.js

// Test case for creating a new category
describe('POST /categories/create', () => {
    it('should create a new category', async () => {
      // Define a sample category data for the test
      const categoryData = {
        categoryName: 'Test Category',
        categoryDetails: 'Test Category Details',
      };
  
      // Send a POST request to create a new category
      const response = await request(app)
        .post('/categories/create')
        .send(categoryData)
        .set('Accept', 'application/json');
  
      // Assert that the response status code is 201 (Created)
      expect(response.status).toBe(201);
  
      // Assert that the response body contains the created category data
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Category created successfully'); // Updated message
      expect(response.body.category).toHaveProperty('_id');
      expect(response.body.category.categoryName).toBe(categoryData.categoryName);
      expect(response.body.category.categoryDetails).toBe(categoryData.categoryDetails);
    });
//   });

  // Test case for getting a list of all categories
  describe('GET /categories', () => {
    it('should get a list of all categories', async () => {
      // Send a GET request to fetch all categories
      const response = await request(app).get('/categories');

      // Assert that the response status code is 200 (OK)
      expect(response.status).toBe(200);

      // Assert that the response body contains an array of categories
      expect(Array.isArray(response.body.categories)).toBe(true);
    });
  });
});
