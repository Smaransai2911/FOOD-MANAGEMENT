# Food Waste Management Application

A web application for managing food inventory, coordinating donations, and reducing food waste.

## Features

- **Food Inventory Management**: Track food items with expiration dates
- **Donation Coordination**: Connect donors with organizations
- **Recipe Suggestions**: Get recipe ideas based on available ingredients
- **Impact Tracking**: Measure your contribution to reducing food waste

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/food-waste-management.git
   cd food-waste-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

## Technologies Used

- **Frontend**: React, TailwindCSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js

## License

This project is licensed under the MIT License - see the LICENSE file for details.