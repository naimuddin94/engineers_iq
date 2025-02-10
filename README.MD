# EngineersIQ

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Overview

EngineerIQ Hub is a dynamic full-stack web application designed to help tech enthusiasts navigate and master the ever-evolving world of technology. Users can access expert advice, personal experiences, and user-generated content covering everything from troubleshooting common tech issues to learning about new software, apps, gadgets, and digital tools.

[![Frontend Live](https://img.shields.io/badge/Frontend-Live-brightgreen?style=for-the-badge)](https://engineersiq.vercel.app/)

## Features

- **User Authentication**: Secure registration and login with JWT-based authentication.
- **Custom Query Builder**: For enhanced performance and optimized search functionality, consider implementing a custom query builder similar to GraphQL.
- **User Profiles**: Personalized profiles with the ability to update information and profile pictures.
- **Rich Content Creation**: Create and edit tech tips and tutorials using a powerful rich text editor.
- **Commenting System**: Engage in discussions through comments on posts.
- **PDF Generation**: Generate PDFs of tech guides for offline reference.
- **News Feed**: Dynamic feed with infinite scroll and sorting options.
- **Search & Filter**: Advanced search functionality with debouncing for optimal performance.
- **Following System**: Follow other tech enthusiasts to stay updated with their content.
- **Micro Animations**: Smooth transitions and effects for an engaging user experience.
- **Responsive Design**: Mobile-friendly interface adapting to various screen sizes.

## Technologies Used

- Frontend: Next.js, HeroUI, React Hook Form, Zod, Recharts, TanStack Query
- Backend: Express, Mongoose, Multer, Zod
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Rich Text Editor: Tiptap
- Styling: Tailwind CSS
- API: RESTful API

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/naimuddin94/engineers_iq
   ```

2. Install dependencies for backend:

   ```
   cd backend
   yarn install
   ```

3. Install dependencies for frontend:

   ```
   cd frontend
   yarn install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables (database connection string, JWT secret, other credentials, etc.).

5. Start the development server and client:

   ```
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to see the application running.

## Project Structure

```
tech-tips-and-tricks-hub/
├── client/                  # NextJS application
│   ├── components/          # Reusable React components for UI elements
│   ├── app/                 # Next.js application with app router structure
│   ├── styles/              # CSS and styling files for the frontend
│   ├── Hook/                # Custom React hooks for state and logic handling
│   ├── lib/                 # Shared library for utility functions and configurations
│   ├── utils/               # Utility functions and helper methods for frontend operations
├── server/                  # Backend implementation following the MVC pattern
├── src/                     # Source directory for the backend application
│   ├── app/                 # Core application logic
│   │   ├── modules/         # Modularized backend structure
│   │   │   ├── controllers/ # Handles business logic and request processing
│   │   │   ├── models/      # Database models and schemas
│   │   │   ├── services/    # Service layer for data manipulation and business rules
│   │   │   ├── routes/      # API route definitions and endpoints
│   │   └── app.ts           # Main application entry point
├── .env.example             # Example environment variables configuration
├── package.json             # Project metadata and dependencies for both frontend and backend
├── tsconfig.json            # TypeScript configuration settings
└── README.md                # Project documentation with setup, usage, and guidelines

```

## API Endpoints

- `/api/v1/auth`: Authentication routes (register, login, logout)
- `/api/v1/articles`: Post-related routes (CRUD operations, upvoting)
- `/api/v1/comments`: Comment-related routes

## **API Documentation**

Detailed API documentation is available through Postman. It includes endpoints, request formats, and response structures.

[![Postman Docs](https://img.shields.io/badge/Postman-API_Docs-orange?style=for-the-badge&logo=postman)](https://documenter.getpostman.com/view/34122341/2sAYX9o1Vr)
