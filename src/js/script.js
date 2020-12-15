{
  'use strict';

  const templates = {
    booksList: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const booksList = document.querySelector('.books-list');
  const favoriteBooks = [];
  const filtersList = document.querySelector('.filters');
  const filters = [];


  const renderBooks = function() {

    for(let book of dataSource.books) {
      const generatedHTML = templates.booksList(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
    }
  };

  const filterBooks = function() {

    for(let book of dataSource.books) {
      const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;

      for(let filter of filters) {

        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        bookToBeHidden.classList.add('hidden');

      } else {
        bookToBeHidden.classList.remove('hidden');
      }
    }
  };

  const initActions = function() {

    booksList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const clickedElement = event.target.offsetParent;

      if(clickedElement.classList.contains('book__image')) {
        const id = clickedElement.getAttribute('data-id');

        if(!clickedElement.classList.contains('favorite')) {
          favoriteBooks.push(id);
          clickedElement.classList.add('favorite');

        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove('favorite');
        }
      }
    });

    filtersList.addEventListener('click', function(event) {
      const clickedElement = event.target;

      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ) {

        if(clickedElement.checked){
          filters.push(clickedElement.value);
          filterBooks();

        } else {
          filters.splice(filters.indexOf(clickedElement.value), 1);
          filterBooks();
        }
      }
    });
  };

  renderBooks();
  initActions();
}
