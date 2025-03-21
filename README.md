# Book Library API

A simple web application that allows users to search for books using the Google Books API. This project provides a clean and intuitive interface for browsing book information.

## Features

- Search books by title, author, or subject
- View detailed book information
- Responsive design that works on both desktop and mobile
- Real-time search results
- Beautiful card-based UI for search results

## Technologies Used

- Node.js
- Express.js
- Google Books API
- Bootstrap 5
- JavaScript (Vanilla)

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/rezasabourinejad/book-library-api.git
cd book-library-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
PORT=3000
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`
2. Enter a book title, author, or subject in the search box
3. Click the search button or press Enter
4. View the search results
5. Click on any book card to see detailed information

## API Endpoints

- `GET /api/books/search?query={searchTerm}` - Search for books
- `GET /api/books/{bookId}` - Get detailed information about a specific book

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 