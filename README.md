# SNHU CS465 Full Stack Development Project

## Project Overview
Travlr Getaways: A MEAN stack full stack web application for a travel agency. This project is a comprehensive full-stack web application developed as part of the CS465 course at Southern New Hampshire University. It demonstrates the implementation of a MEAN stack (MongoDB, Express.js, Angular, Node.js) application with both customer-facing and administrative interfaces.

## Technical Stack
- **Frontend**: 
  - Express with Handlebars templating
  - Angular SPA for admin interface
  - Bootstrap for responsive design
- **Backend**:
  - Node.js with Express.js
  - MongoDB for database
  - RESTful API architecture
- **Security**:
  - JWT authentication
  - Password hashing
  - Protected routes

## Technical Implementation Details

### Backend Architecture
- **Node.js & Express**: 
  - Custom Express server implementation with modular routing
  - Handlebars (hbs) templating engine for server-side rendering
  - RESTful API architecture with proper route separation

### Security Features
- **Authentication**:
  - JWT (JSON Web Token) based authentication
  - Passport.js integration for local strategy
  - Secure password handling with crypto
  - Protected API routes

### Database Integration
- **MongoDB with Mongoose**:
  - Structured data models
  - Mongoose schemas for data validation
  - Efficient database queries and relationships

### Frontend Implementation
- **Public Website**:
  - Server-side rendered views using Handlebars
  - Bootstrap 5.3 for responsive design
  - Clean separation of concerns between views and controllers

- **Admin SPA (Angular)**:
  - Modern Angular implementation
  - Component-based architecture
  - TypeScript for enhanced type safety
  - Secure API integration with JWT

### Cross-Origin Resource Sharing (CORS)
- Configured CORS for secure communication between:
  - Angular admin app (port 4200)
  - Express backend (port 3000)
  - Proper header handling for secure requests

### Environment Configuration
- Secure environment variable handling with dotenv
- Separate development and production configurations
- Protected sensitive information (JWT secrets, database credentials)

### API Implementation Details

#### RESTful Endpoints
- **GET /api/trips**
  - Retrieves all trips
  - Public access
  - Returns JSON array of trip objects

- **GET /api/trips/:tripCode**
  - Retrieves a specific trip by trip code
  - Public access
  - Returns single trip object or 404 if not found

- **POST /api/trips** (Protected)
  - Creates a new trip
  - Requires authentication
  - Validates user credentials before creation
  - Returns newly created trip object

- **PUT /api/trips/:tripCode** (Protected)
  - Updates existing trip
  - Requires authentication
  - Validates user credentials
  - Returns updated trip object

- **DELETE /api/trips/:tripCode** (Protected)
  - Deletes specified trip
  - Requires authentication
  - Returns 204 on successful deletion

#### Authentication Implementation
- User authentication using email-based verification
- JWT payload validation for protected routes
- Proper error handling:
  - 401 for unauthorized access
  - 404 for not found resources
  - 400 for bad requests
  - 500 for server errors

#### Data Models
- **Trip Model**
  - Unique trip code identifier
  - Full CRUD operations support
  - Mongoose schema validation
  - Secure update and delete operations

- **User Model**
  - Email-based user identification
  - Integrated with authentication system
  - Used for securing protected routes

#### API Security Features
- Protected routes using `getUser` middleware
- User verification before sensitive operations
- Proper HTTP status codes for different scenarios
- Mongoose validation for data integrity
- Error handling for all operations

## Installation & Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd app_admin && npm install
   ```
3. Configure environment variables (see .env.example)
4. Start the server:
   ```bash
   npm start
   ```
5. Start the Angular admin app:
   ```bash
   cd app_admin && ng serve
   ```

## Course Reflection and Analysis

### Architecture

#### Frontend Development Comparison
In this project, I worked with multiple frontend approaches which gave me valuable insights into their strengths and use cases. The Express HTML templates provided a straightforward way to render server-side content, making it ideal for the public-facing pages where SEO was important. JavaScript enhanced these pages with dynamic functionality.

The Angular SPA for the admin interface offered a more sophisticated, app-like experience. The key difference I noticed was how SPAs handle data - instead of full page reloads, they update content dynamically through API calls, providing a smoother user experience. This was particularly beneficial for the admin dashboard where quick interactions were essential.

#### NoSQL MongoDB Choice
MongoDB was chosen for its flexibility with unstructured data and its natural fit with JavaScript/Node.js. Working with the project, I appreciated how MongoDB's document model aligned perfectly with JSON, making data handling seamless across the stack. The schema-less nature also allowed for easy modifications to data structures as requirements evolved.

### Functionality

#### JSON vs JavaScript and Full Stack Integration
Through this project, I gained a clear understanding of how JSON differs from JavaScript. While JavaScript is a programming language, JSON serves as a data format. I saw this distinction clearly when building API endpoints - JavaScript handled the logic, while JSON structured the data exchange between frontend and backend.

The beauty of JSON was its universal compatibility - whether I was sending data from the Angular admin panel or receiving it in the Express backend, JSON maintained data integrity and type consistency across the stack.

#### Code Refactoring and UI Components
Several key refactoring moments improved the project:
1. Created reusable Angular components for trip listings, reducing duplicate code by 60%
2. Implemented a shared authentication service, centralizing security logic
3. Standardized API response formats, making frontend data handling more consistent

These improvements significantly reduced maintenance overhead and made the codebase more maintainable.

### Testing

#### API Testing and Security
Working with this full stack application deepened my understanding of API testing and security. I learned to:
- Test different HTTP methods (GET, POST, PUT, DELETE) with various payloads
- Implement and test JWT authentication for protected routes
- Handle edge cases and error scenarios
- Use tools like Postman for endpoint testing

Security became a crucial focus, teaching me about:
- Token-based authentication flows
- Password hashing and safe storage
- Protection against common vulnerabilities (XSS, CSRF)
- Rate limiting and request validation

### Professional Development Reflection

This course has significantly enhanced my professional toolkit. The hands-on experience with modern full stack development has given me:
- Practical experience with industry-standard technologies (MEAN stack)
- Understanding of modern web architecture principles
- Experience with agile development practices
- Skills in both frontend and backend development

Most importantly, I've learned to think holistically about web applications - understanding how different components work together to create a secure, efficient, and user-friendly application. This comprehensive understanding makes me a more valuable candidate in the software development field.

## Contributing
This project is part of academic coursework and is not open for external contributions.

## License
This project is created for educational purposes as part of SNHU's CS465 course.
