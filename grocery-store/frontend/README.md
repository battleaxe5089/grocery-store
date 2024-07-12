Project Description
This project is a basic grocery store web application built with a React frontend and a Node.js backend. The backend uses MongoDB to store products and user information. The application includes user authentication, allowing users to register and log in to their accounts. Once logged in, users can add products to their cart and proceed to checkout.

How to Run the Project
To run the project, follow these steps:

Prerequisites
Node.js and npm installed on your machine
MongoDB installed and running on your machine or accessible via a cloud provider
Git installed on your machine

1. Clone the Repository
git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name

2. Set Up the Backend
Navigate to the backend directory:
cd backend

Install the dependencies:
npm install

Ensure MongoDB is running. If using a local MongoDB instance, it should be running on the default port. If using a cloud provider, ensure you have the connection string.

(Optional) Create a .env file in the backend directory to specify environment variables, such as the MongoDB connection string:

MONGO_URI=mongodb://localhost:27017/grocery-store

Start the backend server:
node index.js
The backend server should be running on http://localhost:5000.

3. Set Up the Frontend
Open a new terminal window and navigate to the frontend directory:
cd frontend

Install the dependencies:
npm install

Start the frontend development server:
npm start
The frontend should be running on http://localhost:3000.

Access the Application:
Open your web browser and go to http://localhost:3000.
Register a new user or log in with an existing account.
Browse products, add items to your cart, and proceed to checkout.

Project Features:
User Authentication: Users can register and log in to their accounts.
Product Management: Products are stored in MongoDB and categorized for easy browsing.
Cart Functionality: Users can add products to their cart and view their cart items.
Checkout: Users can proceed to checkout and simulate payment processing.
This project demonstrates a basic full-stack application with a focus on user authentication, product management, and cart functionality.







