# Pomodoro App

A full-stack Pomodoro timer application built with Next.js. This project helps users manage their time using the Pomodoro technique, allowing them to focus and take breaks effectively.

The backend of the application uses `server actions` and the `Prisma` ORM for database operations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or later
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
	```bash
	git clone https://github.com/mouaammou/pomodoro-plus.git
	cd pomodoro-plus
	```

2. **Install dependencies**:
	```bash
	npm install
	```

3. **Set up environment variables**:
	Create a `.env` file in the root of your project. Add the following environment variables:
	```bash
	DATABASE_URL=file:./database.db
	```

4. **Migrate Prisma**:
	This will create the necessary tables and columns in the database based on the Prisma schema defined in the prisma directory.
	```bash
	npx prisma migrate dev --name init
	```


5. **Run the app**:
	```bash
	npm run dev
	```

5. **Open the app in your browser**:
	Go to http://localhost:3000.

## Project Structure
The project structure is as follows:

- `lib`: Contains utility functions and modules used throughout the application.
- `prisma`: Contains the Prisma configuration and database schema files.
- `src`: Contains the source code of the application.
	- `components`: Contains reusable React components used in the application.
	- `app`: Contains the main application logic and components.
	- `actions`: Contains action files for different features of the application.
		- `pomodoro`: Contains action files specific to the Pomodoro feature.

