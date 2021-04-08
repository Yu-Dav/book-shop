'use strict';

$(document).ready(function () {
    renderBooksTable();
    renderBooksMobile();
    $('.btn-add-book').on('click', function () {
        onAddBook(this);
    });
    $('.sort-books').on('click', function () {
        onSortBooks(this);
    });
    $('.btn-book-info-modal').on('click', function () {
        renderBookInfoModal(this);
    });
    $('.btn-book-update-details').on('click', function () {
        renderBookUpdateModal(this);
    });
    $('.btn-book-remove-modal').on('click', function () {
        renderRemoveBookModal(this);
    });
    $('.set-lang').on('change', function () {
        onChangeLanguage(this);
    });
    $('.btn-book-update-submit').on('click', function () {
        onUpdateBookDetails(this);
    });


    // Scrolling
    $('.btn-scroll-page').on('click', function () {
        onPageScroll(this);
    });
    $('.btn-change-page').on('click', function () {
        onPageChange(this);
    });
    $('.confirm-book-remove').on('click', function () {
        onRemoveBook(this);
    });
})

var maxWidth = window.matchMedia('(min-width: 993px)')
renderUI(maxWidth)
maxWidth.addListener(renderUI)


function renderUI(x) {
    if (x.matches) { // If media query matches
        $('.table').show();
        $('.mobile-ui').hide();
        renderBooksTable()
    } else {
        $('.table').hide();
        $('.mobile-ui').show();
        renderBooksMobile();
    }
}


function renderBooksTable() {
    var counter = 0;
    var books = getBooks();
    var strHTMLs = books.map(function (book) {
        counter++;
        return `<tr>
        <td class="table-counter">${book.counter}.</td>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>&euro;${book.price}</td>
        <td>${book.img}</td>
        <td><button type="button" class="btn btn-primary btn-book-info-modal" data-bookid="${book.id}" data-toggle="modal" data-target="#bookInfoModal" data-trans="btn-action-info">Info</button></td>
        <td><button type="button" class="btn btn-success btn-book-update-details btn-book-update" data-bookid="${book.id}" data-toggle="modal" data-target="#updatePriceModal" data-trans="btn-action-update">Update</button></td>
        <td><button type="button" class="btn btn-danger btn-book-remove-modal" data-bookid="${book.id}" data-toggle="modal" data-target="#removeBookModal" data-trans="btn-action-remove">Delete</button></td>
    </tr>`;
    })
    var $elTable = $('.book-table-container tbody')
    $elTable.html(strHTMLs.join(''));
}

function renderBooksMobile() {
    var books = getBooks();
    var strHTMLs = books.map(function (book) {
        return `<ul class="list-group">
        <li class="list-group-item list-group-item-dark"># <span>1</span> </li>
        <li class="list-group-item list-group-item-success">ID: <span>${book.id}</span> </li>
        <li class="list-group-item list-group-item-success" data-trans="table-title">Title:<span>${book.title}</span></li>
        <li class="list-group-item">Price:<span>${book.price}</span></li>
        <li class="list-group-item">Price:<span>${book.desc}</span></li>
        <li class="list-group-item"><td><button type="button" class="btn btn-primary btn-book-info-modal" data-bookid="${book.id}" data-toggle="modal" data-target="#bookInfoModal" data-trans="btn-action-info">Info</button></td></li>
        <li class="list-group-item"><td><button type="button" class="btn btn-success btn-book-update-details" data-bookid="${book.id}" data-toggle="modal" data-target="#updatePriceModal" data-trans="btn-action-update">Update</button></td></li>
        <li class="list-group-item"><td><button type="button" class="btn btn-danger btn-book-remove-modal" data-bookid="${book.id}" data-toggle="modal" data-target="#removeBookModal" data-trans="btn-action-remove">Delete</button></td></li>
    </ul>`
    })
    $('.mobile-ui-list').html(strHTMLs.join(''));
}

function onRatingChange(rating) {
    if (rating < 1 || rating > 10) return;
    var bookID = $('[name=modal-id]').text();
    var book = getBookById(bookID);
    $('[name=modal-rating]').html(book.rating);
    changeRating(book, rating);
}

// book info modal
function renderBookInfoModal(el) {
    var bookId = el.dataset.bookid;
    var currBook = getBookById(bookId);
    $('[name=modal-title]').html(currBook.title);
    $('[name=modal-img]').html(currBook.img);
    $('[name=modal-description]').html(currBook.desc);
    $('[name=modal-id]').html(currBook.id);
    $('[name=modal-rating]').html(currBook.rating);
    $('.rating-selector').html(currBook.rating);
}


// book update modal
function onUpdateBookDetails() {
    var newTitle = $('.update-book-title').val();
    var newId = $('.update-book-id').val();
    var newprice = $('.update-book-price').val();
    var newDesc = $('.update-book-desc').val();
    if (!newTitle || !newId || !newprice || !newDesc) return;
    console.log('updateing to =', newTitle, newId, newprice, newDesc)
}

// book remove modal
function renderRemoveBookModal(el) {
    var bookId = el.dataset.bookid;
    var currBook = getBookById(bookId);
    $('[name=modal-remove-title]').html(currBook.title);
    $('[name=modal-remove-id]').html(currBook.id);
}

function onAddBook() {
    var bookName = $('.new-book-title').val();
    var price = +$('.new-book-price').val();
    if (!bookName || !price) return;
    if ((typeof (price) !== 'number') || (typeof (bookName) !== 'string')) return;
    var img = 'def';
    addBook(bookName, price, img);
    $('.new-book-title').val('');
    $('.new-book-price').val('');
}

function onRemoveBook() {
    var bookId = $('[name=modal-remove-id]').text();
    console.log('bookId =', bookId)
    removeBook(bookId);
    renderRemovedMsg();
}

function renderRemovedMsg() {
    $('.modal-remove-body').text('Book removed successfully');
    $('.modal-remove-body').addClass('my-4')
}

function renderBookUpdateModal(el) {
    var bookId = el.dataset.bookid;
    var book = getBookById(bookId);
    $('.update-book-title').attr('placeholder', book.title)
    $('.update-book-id').attr('placeholder', book.id)
    $('.update-book-price').attr('placeholder', book.price)
    $('.update-book-desc').attr('placeholder', book.desc)

}

function onChangeLanguage(el) {
    var lang = el.value
    setLang(lang);
    if (lang === 'he' || lang === 'ab') $(document.body).addClass('rtl');
    else $(document.body).removeClass('rtl');
    doTrans();
    renderBooksTable;
    renderBooksMobile();
}

function onSortBooks(el) {
    var sortBy = el.innerText
    SortBooks(sortBy);
}

// When scrolling through pages
function onPageScroll(el) {
    var diff = +el.dataset.move;
    console.log('diff =', diff)
    var pageNum = setPage(diff);
    renderBooksTable();
    renderBooksMobile();
    var elPageNum = $('.btn-change-page');
    elPageNum.text(pageNum);
}

// When clicking the page number - go to page
function onPageChange(el) {
    console.log('change page =')
    console.log('change el =', el)
}