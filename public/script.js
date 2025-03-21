// Initialize Bootstrap modal
const bookModal = new bootstrap.Modal(document.getElementById('bookModal'));

// Search books function
async function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    try {
        const response = await fetch(`/api/books/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.error) {
            alert(data.error);
            return;
        }

        displayResults(data.items || []);
    } catch (error) {
        console.error('Error searching books:', error);
        alert('Failed to search books. Please try again.');
    }
}

// Display search results
function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (books.length === 0) {
        resultsDiv.innerHTML = '<div class="col-12 text-center">No books found</div>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'col-md-4 col-lg-3';
        bookCard.innerHTML = `
            <div class="card book-card" onclick="showBookDetails('${book.id}')">
                <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200?text=No+Image'}" 
                     class="card-img-top book-cover" 
                     alt="${book.volumeInfo.title}">
                <div class="card-body">
                    <h5 class="card-title book-title">${book.volumeInfo.title}</h5>
                    <p class="card-text book-author">${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                </div>
            </div>
        `;
        resultsDiv.appendChild(bookCard);
    });
}

// Show book details
async function showBookDetails(bookId) {
    try {
        const response = await fetch(`/api/books/${bookId}`);
        const book = await response.json();
        
        if (book.error) {
            alert(book.error);
            return;
        }

        const bookDetails = document.getElementById('bookDetails');
        bookDetails.innerHTML = `
            <div class="text-center">
                <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/300x400?text=No+Image'}" 
                     class="img-fluid mb-3" 
                     alt="${book.volumeInfo.title}">
            </div>
            <h3>${book.volumeInfo.title}</h3>
            <p class="text-muted">${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
            <p class="book-description">${book.volumeInfo.description || 'No description available.'}</p>
            <div class="mt-3">
                <strong>Published Date:</strong> ${book.volumeInfo.publishedDate || 'Unknown'}<br>
                <strong>Publisher:</strong> ${book.volumeInfo.publisher || 'Unknown'}<br>
                <strong>Page Count:</strong> ${book.volumeInfo.pageCount || 'Unknown'}<br>
                <strong>Categories:</strong> ${book.volumeInfo.categories?.join(', ') || 'Unknown'}
            </div>
        `;

        bookModal.show();
    } catch (error) {
        console.error('Error fetching book details:', error);
        alert('Failed to fetch book details. Please try again.');
    }
}

// Add event listener for Enter key in search input
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBooks();
    }
}); 