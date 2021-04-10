'use strict';

var gCurrView = 'table';

$(document).ready(function () {
    renderUI();
    init();
})


// var maxWidth = window.matchMedia('(min-width: 993px)')
// showUI(maxWidth)
// maxWidth.addListener(showUI)

function renderUI() {

    if (gCurrView === 'table') { // 
        $('.table').show();
        $('.list-ui').hide();
        renderBooksTable()
    } else {
        $('.table').hide();
        $('.list-ui').show();
        renderBooksList();
    }
    renderTotalNumOfBooks()

}

function onChangeView(el) {
    var reqView = el.dataset;
    gCurrView = reqView.view;
    renderUI();
}

function renderBooksTable() {
    var books = getBooks();
    var strHTMLs = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td class="table-book-title text-center">${book.title}</td>
        <td class="text-center">&euro;${book.price}</td>
        <td>${book.img}</td>
        <td style="text-align: center;vertical-align: middle;"> <button type="button" class="btn btn-primary btn-book-info-modal" data-bookid="${book.id}" data-toggle="modal" data-target="#bookInfoModal" data-trans="btn-action-info">Info</button></td>
        <td style="text-align: center;vertical-align: middle;"><button type="button" class="btn btn-success btn-book-update-details" data-bookid="${book.id}" data-toggle="modal" data-target="#updatePriceModal" data-trans="btn-action-update">Update</button></td>
        <td style="text-align: center;vertical-align: middle;"><button type="button" class="btn btn-danger btn-book-remove-modal" data-bookid="${book.id}" data-toggle="modal" data-target="#removeBookModal" data-trans="btn-action-remove">Delete</button></td>
    </tr>`;
    })
    $('tbody').html(strHTMLs.join(''));
}

function renderBooksList() {
    var books = getBooks();
    var strHTMLs = books.map(function (book) {
        return `<ul class="list-group mt-2">
        <button class="btn btn-light" type="button" data-toggle="collapse" data-target="#${book.id}" aria-expanded="false" aria-controls="${book.id}">

        <li class="list-group-item list-group-item-light bold" data-trans="table-title"><span> &#8616;&nbsp;&nbsp;&nbsp;&nbsp;${book.title} &nbsp;&nbsp;&nbsp;&nbsp;&#8616; </span></li>

        </button>

        <div class="collapse" id="${book.id}">
        <li class="list-group-item list-group-item-success">ID: <span>${book.id}</span> </li>
        <li class="list-group-item" >Price: <span>&euro;${book.price}</span></li>
        <li class="list-group-item">Description: <span>${book.desc}</span></li>

        <li class="list-group-item" style="text-align: center;vertical-align: middle;"><button type="button" class="btn btn-primary btn-book-info-modal w-25 " data-bookid="${book.id}" data-toggle="modal" data-target="#bookInfoModal" data-trans="btn-action-info">Info</button></li>
        <li class="list-group-item"style="text-align: center;vertical-align: middle;"><button type="button" class="btn btn-success btn-book-update-details w-25" data-bookid="${book.id}" data-toggle="modal" data-target="#updatePriceModal" data-trans="btn-action-update">Update</button></li>
        <li class="list-group-item"style="text-align: center;vertical-align: middle;"><button type="button" class="btn btn-danger btn-book-remove-modal w-25" data-bookid="${book.id}" data-toggle="modal" data-target="#removeBookModal" data-trans="btn-action-remove">Delete</button></li>

        </div>
    </ul>`
    });
    $('.list-items').html(strHTMLs.join(''));
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
    renderUI();
    // $('.table-book-title').addClass('animated', 'tada');
    // setTimeout(function () {
    //     $('.table-book-title').removeClass('animated', 'tada');
    // }, 5000)
}

function onOpenInfoModal(el) {
    console.log('opening book info modal');
    var bookId = el.dataset.bookid;
    var currBook = getBookById(bookId);
    $('.rating-selector').val(currBook.rating);
    $('[name=modal-title]').html(currBook.title);
    $('[name=modal-img]').html(currBook.img);
    $('[name=modal-description]').html(currBook.desc);
    $('[name=modal-id]').html(currBook.id);
    $('[name=modal-rating]').html(currBook.rating);
}


function onRatingChange(rating) {
    if (rating < 1 || rating > 10) return;
    var bookID = $('[name=modal-id]').text();
    var book = getBookById(bookID);
    changeRating(book, rating);
    $('[name=modal-rating]').html(book.rating);
}


// BOOK REMOVAL
function onOpenRemovalModal(el) {
    console.log('opening book remove modal')
    $('.modal-remove-body-removed').hide();

    var bookId = el.dataset.bookid;
    var currBook = getBookById(bookId);
    $('[name=modal-remove-title]').html(currBook.title);
    $('[name=modal-remove-id]').html(currBook.id);
}

function onRemoveBook() {
    var bookId = $('[name=modal-remove-id]').html();
    removeBook(bookId);
    renderRemovedMsg();
    renderUI();
}

function renderRemovedMsg() {
    $('.modal-remove-body-confirm').hide();
    $('.modal-remove-body-removed').show();
    $('.confirm-book-remove').hide();
}

// BOOK UPDATES: 
function onOpenUpdateModal(el) {
    var bookId = el.dataset.bookid;
    var book = getBookById(bookId);
    $('.update-book-id').text(bookId);
    $('.update-book-title').attr('placeholder', book.title);
    $('.update-book-price').attr('placeholder', book.price);
    $('.update-book-desc').attr('placeholder', book.desc);
}

function onUpdateBookDetails() {
    var currID = $('.update-book-id').text();
    var newTitle = $('.update-book-title').val();
    var newprice = $('.update-book-price').val();
    var newDesc = $('.update-book-desc').val();
    if (!newTitle || !newprice || !newDesc) return;
    updateBook(currID, newTitle, newprice, newDesc);
    renderUI();
}


function onChangeLanguage(el) {
    var lang = el.value
    setLang(lang);
    if (lang === 'he' || lang === 'ab') $(document.body).addClass('rtl');
    else $(document.body).removeClass('rtl');
    doTrans();
    renderUI();
}

function renderTotalNumOfBooks() {
    var $elNumOfBooks = $('.total-num-of-books');
    var numOfBooks = getNumOfBooks();
    $elNumOfBooks.text(numOfBooks);
}

function onSortBooks(el) {
    var sortBy = $(el).attr('name')
    SortBooks(sortBy);
    renderUI();
}

function onPageScroll(el) {
    var diff = +el.dataset.move;
    var pageNum = setPage(diff);
    renderUI();
    var elPageNum = $('.btn-change-page');
    elPageNum.text(pageNum);
}

function onGoToTop() {
    window.scrollTo('0', '0');
}

// When clicking the page number - go to page
function onPageChange(el) {
    console.log('change page =')
    console.log('change el =', el)
}