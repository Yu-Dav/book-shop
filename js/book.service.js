'use strict';

const KEY = 'books';

var gTitles = ['1984', 'The Alchemist', 'The Catcher in the Rye', 'To Kill a Mockingbird']
var gBookCovers = ['1984', 'TheAlchemist', 'TheCatcherintheRye', 'ToKillaMockingbird']
var gBookDescs = [`Ignorance is Strength. 1984 is a dystopian novella by George Orwell published in 1949, which follows the life of Winston Smith, a low ranking member of 'the Party', who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother. 'Big Brother' controls every aspect of people's lives.`, `The Alchemist tells the story of a young shepherd named Santiago who is able to find a treasure beyond his wildest dreams. Along the way, he learns to listen to his heart and, more importantly, realizes that his dreams, or his Personal Legend, are not just his but part of the Soul of the Universe.`, `The Catcher in the Rye, novel by J.D. Salinger published in 1951. The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school. Confused and disillusioned, Holden searches for truth and rails against the “phoniness” of the adult world.`, `To Kill a Mockingbird takes place in the fictional town of Maycomb, Alabama, during the Great Depression. The protagonist is Jean Louise (“Scout”) Finch, an intelligent though unconventional girl who ages from six to nine years old during the course of the novel.`]

var gBooks;
var gBookCounter = 0;
var gSortBy = 'title';
var PAGE_SIZE = 5
var gPageIdx = 0

_createBooks();
console.log('gBooks =', gBooks);

function SortBooks(sortBy) {
    gSortBy = sortBy;
}

function changeRating(book, rating) {// move to controller 
    book.rating = rating;
    _saveBooksToStorage();
}

function updateBook(bookId, bookPrice) {
    var book = getBookById(bookId);
    book.id = bookId;
    book.price = bookPrice;
    _saveBooksToStorage();
}

function addBook(bookName, price, img) {
    gTitles.push(bookName);
    var newBook = _createBook(bookName, price, img);
    gBooks.unshift(newBook);
    _saveBooksToStorage();
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    if (bookIdx < 0) return;
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(startIdx, startIdx + PAGE_SIZE);
    return books;

    // var books = gBooks.sort(sortItems(gSortBy));
    // var books = gBooks.sort(function (bookA, BookB) {
    //     if (gSortBy === 'title') {
    //         bookA[gSortBy].toUpperCase();
    //         BookB[gSortBy].toUpperCase();
    //     }
    //     return bookA[gSortBy] - BookB[gSortBy];
    // })
    console.log('books =', books)
    return books;
}

function sortItems(sortBy) {
    console.log('sorting')
    return function innerSort(a, b) {
        var bookA = (a[sortBy] === 'title') ? a[sortBy].toLowerCase() : a[sortBy];
        var bookB = (b[sortBy] === 'title') ? b[sortBy].toLowerCase() : b[sortBy];
        var res = 0;
        if (bookA > bookB) {
            res = 1;
        } else if (bookA < bookB) {
            res = -1;
        }
        // if (gSortBy === 'price') return res * -1
        return res;
    };
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [];
        for (var i = 0; i < 4; i++) {
            var book = _createBook();
            books.push(book);
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _createBook(title = gTitles.pop(), price = getRandomIntInclusive(5, 15), img = gBookCovers.pop(), desc = gBookDescs.pop() ?? makeLorem(50) ) {
    gBookCounter++;
    return {
        counter: gBookCounter,
        id: makeId(),
        title,
        desc,
        price,
        img: `<img src="img/${img}.jpeg" alt="Image of book">`,
        rating: 0
    }
}

function setPage(diff) {
    if (gPageIdx + diff > gBooks.length / PAGE_SIZE) return gPageIdx;
    if (gPageIdx + diff < 0) return gPageIdx;
    gPageIdx += diff;
    return gPageIdx;
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}


function getBookById(bookId) {
    return gBooks.find(function (book) {
        return bookId === book.id
    })
}
