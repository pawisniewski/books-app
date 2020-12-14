{
  'use strict';

  const templates = {
    bookLink: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const booksList = document.querySelector('.books-list');
  const allBooks = [];
  const favoriteBooks = [];

  const renderBooks = function() {

    for(let book of dataSource.books) {
      const generatedHTML = templates.bookLink(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
      allBooks.push(element);
    }
  };

  const initActions = function() {

    for(let book of allBooks) {
      const clickedElement = book.querySelector('.book__image');
      clickedElement.addEventListener('dblclick', function(event) {

        event.preventDefault();
        const id = clickedElement.getAttribute('data-id');

        if(!clickedElement.classList.contains('favorite')) {
          favoriteBooks.push(id);
          clickedElement.classList.add('favorite');

        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove('favorite');
        }
      });
    }
  };

  renderBooks();
  initActions();
}
