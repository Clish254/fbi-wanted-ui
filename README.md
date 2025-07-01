# FBI Wanted UI

A web application built with Next.js and Shadcn UI that allows users to search, filter, and view details about wanted persons from the FBI Wanted API. This frontend consumes a custom backend API ([fbi-wanted-backend](https://github.com/Clish254/fbi-wanted-backend)) for data access, transformation, and caching.

## Overview
FBI Wanted UI provides a responsive, user-friendly interface for exploring the FBI's wanted persons database. Users can search, filter by various criteria, and view detailed information, all with a clean and accessible design powered by Shadcn UI components.

## Features
- Search and filter wanted persons by name, keywords, hair color, eye color, race, and more
- Paginated or infinite scrolling list of results
- Detailed view for each wanted person, including images and additional information
- Responsive design using Shadcn UI
- Error handling and user-friendly messages
- Connects to a backend API for data ([fbi-wanted-backend](https://github.com/Clish254/fbi-wanted-backend))

## Tech Stack
- **Frontend:** Next.js (App Router, TypeScript)
- **UI:** Shadcn UI
- **Styling:** Tailwind CSS
- **HTTP Client:** Fetch API / Axios
- **Containerization:** Docker

## Setup & Running

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- (Optional) Docker
- The backend service ([fbi-wanted-backend](https://github.com/Clish254/fbi-wanted-backend)) running and accessible

### Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   - Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to your backend URL (e.g., `http://localhost:3000/api`)
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Running with Docker
1. Build the Docker image:
   ```bash
   docker build -t fbi-wanted-ui .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 fbi-wanted-ui
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000) inside the container.

## Environment Variables
- `NEXT_PUBLIC_API_URL`: The base URL of the backend API (e.g., `http://localhost:3000/api`)

## Usage
- Start the backend ([fbi-wanted-backend](https://github.com/Clish254/fbi-wanted-backend)) first.
- Start the frontend (locally or with Docker).
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Use the search and filter options to explore the FBI wanted list.

## License
MIT
