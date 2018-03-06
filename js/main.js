window.onload = function() {
  let bookId = 0;
  let myLibrary = [];
  let booksContainer = document.querySelector(".container__books");

  var book1 = new Book("Freakonomics", "Steven D. Levitt and Stephen J Dubner", 315, true);
  var book2 = new Book("Outliers", "Malcolm Gladwell", 336, true);
  var book3 = new Book("The Pragmatic Programmer", "Andrew Hunt and David Thomas", 309, false);
  myLibrary.push(book1);
  myLibrary.push(book2);
  myLibrary.push(book3);
  render(myLibrary);

  // CONSTRUCTOR (i.e, CLASS)
  function Book(title, author, pages, read) {
    bookId += 1;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookId = bookId;
    // this.info = function() {
    //   return `The ${this.title} by ${this.author}, ${pages} pages, ${this.read ? "read" : "not read yet"}`;
    // }
  }

  // RESUABLE FUNCTION TO DISPLAY (RENDER) ALL BOOKS IN LIBRARY
  function render(books) {
    booksContainer.innerHTML = "";
    let html;
    books.forEach( (book, index) => {
      
      html = `
      <div class="container__books-item--style"><div class="container__books--vertical-center">${book.title}</div></div>
      <div class="container__books-item--style"><div class="container__books--vertical-center">${book.author}</div></div>
      <div class="container__books-item--style"><div class="container__books--vertical-center">${book.pages}</div></div>
      <div class="container__books-item--style">
        <div class="container__books-read container__books--vertical-center" data-book-id=${index}>
          <div class="selector--arrow">
            <div class="arrow"></div>
          </div>  
          <select name="read" class="container__add-book--selector">
            <option value="true" name="read" ${book.read ? "selected" : ""}>read</option>
            <option value="false" name="unread" ${!book.read ? "selected" : ""}>unread</option>
          </select>
        </div>
      </div>
      <div class="container__books-item--style"><div class="books__delete container__books--vertical-center books__delete--style" data-book-id=${index}>Delete</div></div>
    `;
  
      booksContainer.insertAdjacentHTML('afterbegin', html);
    });

    // TOGGLE BOOK BEING READ
    const readBooks = document.querySelectorAll(".container__books-read");
    readBooks.forEach( book => {
      book.addEventListener("change", toggleBookRead);
    });

    // ADD DELETE EVENT LISTENERS
    const deleteBooksButton = document.querySelectorAll(".books__delete");
    deleteBooksButton.forEach( deleteButton => {
      deleteButton.addEventListener("click", deleteBook);
    });
  }

  // ADD NEW BOOK
  const addBookForm = document.getElementById("add-book");
  addBookForm.addEventListener("submit", addNewBook);
  
  function addNewBook(event) {
    event.preventDefault();
    
    if (this.title.value && this.author.value && this.pages.value) {
      let readBook;
      this.read.value == "true" ? readBook = true: readBook = false;  
      let newBook = new Book(this.title.value, this.author.value, this.pages.value, readBook);
      myLibrary.push(newBook)
      render(myLibrary);
      addBookForm.reset();
    } else {
      alert("You must not leave any field blank");
    }
  }

  function toggleBookRead(event) {
    
    let currentReadBook = document.querySelector(`[data-book-id="${event.currentTarget.dataset.bookId}"]`);
    let currentLibraryItem = myLibrary[parseInt(event.currentTarget.dataset.bookId)];
    currentLibraryItem.read = !currentLibraryItem.read
    
    render(myLibrary);
    console.log(myLibrary);
    
  }

  // DELETE A BOOK
  function deleteBook(event) {
    let currentReadBook = document.querySelector(`[data-book-id="${event.currentTarget.dataset.bookId}"]`);
    // let currentLibraryItem = myLibrary[parseInt(event.currentTarget.dataset.bookId)];
    myLibrary.splice(event.currentTarget.dataset.bookId, 1);
    render(myLibrary);
  }

}
  
  
  


