const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
}

function removeBookFromLibrary(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        renderLibrary();
    }
}

function renderLibrary() {
    const grid = document.getElementById('libraryGrid');
    grid.innerHTML = '';

    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        card.innerHTML = `
      <div>
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Page:</strong> ${book.pages}</p>
      </div>
      <div class="book-actions">
        <button class="btn btn-toggle ${book.read ? '' : 'not-read'}" data-id="${book.id}">
          ${book.read ? 'Read' : 'Unread'}
        </button>
        <button class="btn btn-danger" data-id="${book.id}">Delete</button>
      </div>
    `;
        grid.appendChild(card);
    });
}

document.getElementById('libraryGrid').addEventListener('click', (e) => {
    const bookId = e.target.dataset.id;
    if (!bookId) return;

    const book = myLibrary.find(b => b.id === bookId);

    if (e.target.classList.contains('btn-toggle')) {
        book.toggleRead();
        renderLibrary();
    }

    if (e.target.classList.contains('btn-danger')) {
        removeBookFromLibrary(bookId);
    }
});

const modal = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('newBookBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const bookForm = document.getElementById('bookForm');

openModalBtn.addEventListener('click', () => modal.classList.add('active'));
closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = Number(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    bookForm.reset();
    modal.classList.remove('active');
});

addBookToLibrary('Laskar Pelangi', 'Andrea Hirata', 529, true);
addBookToLibrary('Bumi', 'Tere Liye', 440, false);
addBookToLibrary('Bumi Manusia', 'Pram', 440, true);