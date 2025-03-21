const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Google Books API base URL
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

// Routes
app.get('/api/books/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const response = await axios.get(`${GOOGLE_BOOKS_API}?q=${query}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${GOOGLE_BOOKS_API}/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).json({ error: 'Failed to fetch book details' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 