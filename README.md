# Animerch

Welcome to Animerch, your go-to destination for all things anime! Our platform offers a wide selection of anime merchandise, including figures, apparel, accessories, and much more. Built using the MERN stack, Animerch provides a seamless and enjoyable shopping experience for anime enthusiasts worldwide.

## Features

- **User Authentication**: Secure sign-up and login functionality using JWT.
- **Product Catalog**: Browse a vast collection of anime merchandise.
- **Search and Filter**: Easily find your favorite items with advanced search and filtering options.
- **Product Details**: View detailed information about each product, including images, descriptions, and reviews.
- **Shopping Cart**: Add items to your cart and manage them effortlessly.
- **Checkout**: Smooth and secure checkout process with multiple payment options.
- **Order History**: View your past orders and track current ones.
- **User Profile**: Manage your personal information, addresses, and payment methods.
- **Admin Panel**: Admins can manage products, categories, users, and orders.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.

## Tech Stack

- **MongoDB**: Database for storing product, user, and order information.
- **Express.js**: Backend framework for building our RESTful API.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime for running the backend server.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone [https://github.com/itsnarutouzumaki/animerch.git]
    cd animerch
    ```

2. **Install dependencies**:
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add the following:
    ```plaintext
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PAYPAL_CLIENT_ID=your_paypal_client_id
    ```

4. **Run the development server**:
    ```bash
    # Start backend server
    cd backend
    npm run dev

    # Start frontend server
    cd ../frontend
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to see the application running.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request to the `main` branch.

Please make sure your code follows our coding standards and includes appropriate tests.

# contributor
-  Somenath Singh 


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to reach out to us at educationworld179@gmail.com.

Thank you for visiting Animerch! Enjoy your shopping experience!
