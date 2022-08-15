const form = document.querySelector('.form');
const library = document.querySelector('.library');
const inputAuthor = document.querySelector('.input-author');
const inputBook = document.querySelector('.input-book');
const errorMessage = document.querySelector('.errormessage');
const storedBooks = JSON.parse(localStorage.getItem('books'));

const bookListButton = document.querySelector('#nav #booklist');
const addButton = document.querySelector('#nav #addnew');
const contactButton = document.querySelector('#nav #contact-click');

const bookWrapper = document.querySelector('.book-wrapper');
const formWrapper = document.querySelector('.form-wrapper');
const contactWrapper = document.querySelector('.contact-wrapper');

const menuNavMobile = document.querySelector('.menu-nav-mobile');
const menuBar = document.querySelector('.menu-nav-mobile #menu');
const page = document.querySelector('#awesome-book-wrapper');
const body = document.querySelector('body');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
let bookShelf = [];

class Book {
  constructor(author, book) {
    this.author = author;
    this.book = book;
  }

  add() {
    if (inputAuthor.value !== '' && inputBook.value !== '') {
      const currentBook = [];
      currentBook.push(
        {
          author: inputAuthor.value,
          book: inputBook.value,
        },
      );
      this.filter = bookShelf.filter((x) => x.book === currentBook[0].book);
      if (this.filter.length > 0) {
        errorMessage.style.display = 'block';
        inputAuthor.value = '';
        inputBook.value = '';
      }
      bookShelf.push(
        {
          author: inputAuthor.value,
          book: inputBook.value,
        },
      );
      if (bookShelf.length > 0) {
        currentBook.forEach((book) => library.insertAdjacentHTML('beforeend', this.displayBooks(book)));
      }
    }
    inputAuthor.value = '';
    inputBook.value = '';
    localStorage.setItem('books', JSON.stringify(bookShelf));
  }
  /* eslint-disable */
  remove() {
    if (bookShelf.length > 0) {
      const removebtn = document.querySelectorAll('.remove');
      removebtn.forEach((element) => element.addEventListener('click', () => {
        const parentNodeClass = element.parentNode.className;
        element.parentNode.remove();
        bookShelf = bookShelf.filter((x) => x.author !== parentNodeClass);
        localStorage.setItem('books', JSON.stringify(bookShelf));
      }));
    }
  };

  displayBooks(object){
    return `<li class="${object.author}">
      <span class="title">${object.author} by ${object.book}</span>
      <button class="remove">Remove</button></li>`;
  };

};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newBook = new Book();
  newBook.add();
  newBook.remove();
});

// try out

function displayBookFromStore() {
  if (storedBooks !== null) {
    bookShelf = storedBooks;
    bookShelf.forEach((book) => {
      const newBook = new Book();
      library.insertAdjacentHTML('beforeend', newBook.displayBooks(book));
      newBook.remove();
    });
  }
}

bookListButton.addEventListener('click', (e) => {
  e.preventDefault()
  bookWrapper.style.display ='flex';
  formWrapper.style.display = 'none';
  contactWrapper.style.display = 'none';
})

window.addEventListener('load', () => {
  displayBookFromStore();
  formWrapper.style.display = 'none';
  contactWrapper.style.display = 'none';
});

addButton.addEventListener('click', (e) => {
  e.preventDefault()
  bookWrapper.style.display ='none';
  formWrapper.style.display = 'flex';
  contactWrapper.style.display = 'none';
});

contactButton.addEventListener('click', (e) => {
  e.preventDefault()
  bookWrapper.style.display ='none';
  formWrapper.style.display = 'none';
  contactWrapper.style.display = 'flex';
});

// FOR MENUBAR

menuBar.addEventListener('click', () => {
  menuNavMobile.classList.toggle('show');
  body.classList.toggle('show');
  page.classList.toggle('show');
  menuBar.classList.toggle('show');
});

one.addEventListener('click', (e) => {
  e.preventDefault()
  menuNavMobile.classList.remove('show');
  body.classList.remove('show');
  page.classList.remove('show');
  menuBar.classList.remove('show');
  bookWrapper.style.display ='flex';
  formWrapper.style.display = 'none';
  contactWrapper.style.display = 'none';
});

two.addEventListener('click', (e) => {
  e.preventDefault()
  menuNavMobile.classList.remove('show');
  body.classList.remove('show');
  page.classList.remove('show');
  menuBar.classList.remove('show');
  bookWrapper.style.display ='none';
  formWrapper.style.display = 'flex';
  contactWrapper.style.display = 'none';
});

three.addEventListener('click', (e) => {
  e.preventDefault()
  menuNavMobile.classList.remove('show');
  body.classList.remove('show');
  page.classList.remove('show');
  menuBar.classList.remove('show');
  bookWrapper.style.display ='none';
  formWrapper.style.display = 'none';
  contactWrapper.style.display = 'flex';
});

const currentDate = new Date().toLocaleString();
document.getElementById('time-header').innerHTML = currentDate;
