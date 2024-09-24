# Giphy Search App

This project is a React-based web application that allows users to search and view GIFs using the Giphy API. Users can browse trending GIFs, search for specific GIFs, and load more results.

## Features

- View trending GIFs on initial load
- Search for GIFs using keywords
- Load more GIFs with a "Show More" button
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Components

- `App`: The root component that renders `GiphyApp`
- `GiphyApp`: The main component that manages state and renders child components
- `GifGrid`: Displays a grid of GIFs
- `SearchBar`: Allows users to input search queries
- `Skeleton`: Displays loading placeholders while fetching GIFs

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your Giphy API key:
   ```
   VITE_GIPHY_API_KEY=your_api_key_here
   ```
4. Start the development server: `npm run dev`

## Usage

- On initial load, the app displays trending GIFs
- Use the search bar to find specific GIFs
- Click the "Show More" button to load additional GIFs

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios for API calls
