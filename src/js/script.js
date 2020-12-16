{
  'use strict';

  const templates = {
    bookLink: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.renderBooks();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
    }

    initData() {
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.booksList = document.querySelector('.books-list');
      thisBooksList.filterList = document.querySelector('.filters');
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    renderBooks() {
      const thisBooksList = this;

      for(let book of thisBooksList.data) {
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const generatedHTML = templates.bookLink(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.booksList.appendChild(element);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.booksList.addEventListener('dblclick', function(event) {
        event.preventDefault();
        const clickedElement = event.target.offsetParent;

        if(clickedElement.classList.contains('book__image')) {
          const id = clickedElement.getAttribute('data-id');

          if(!clickedElement.classList.contains('favorite')) {
            thisBooksList.favoriteBooks.push(id);
            clickedElement.classList.add('favorite');

          } else {
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(id), 1);
            clickedElement.classList.remove('favorite');
          }
        }
      });

      thisBooksList.filterList.addEventListener('click', function(event) {
        const clickedElement = event.target;

        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ) {

          if(clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);
            thisBooksList.filterBooks();

          } else{
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(clickedElement.value), 1);
            thisBooksList.filterBooks();
          }
        }
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for(let book of thisBooksList.data) {
        const bookToBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;

        for(let filterName of thisBooksList.filters) {

          if(!book.details[filterName]) {
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden) {
          bookToBeHidden.classList.add('hidden');

        } else {
          bookToBeHidden.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let bgc = '';
      if(rating <6) {
        bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if(rating>6 && rating<=8) {
        bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if(rating>8 && rating<=9) {
        bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if(rating>9) {
        bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return bgc;
    }
  }
  // eslint-disable-next-line no-unused-vars
  const app = new BooksList();
}
