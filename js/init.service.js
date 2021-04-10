'use strict';

function init() {
    $('.btn-add-book').on('click', function () {
        onAddBook(this);
    });
    $('.sort-books').on('click', function () {
        onSortBooks(this);
    });
    $('.btn-book-info-modal').on('click', function () {
        console.log ('event heard')
        onOpenInfoModal(this);
    });
    $('.rating-selector').on('change', function () {
        onRatingChange(this.value);
    });
    $('.btn-book-update-details').on('click', function () {
        onOpenUpdateModal(this);
    });
    $('.btn-book-remove-modal').on('click', function () {
        onOpenRemovalModal(this);
    });
    $('.set-lang').on('change', function () {
        onChangeLanguage(this);
    });
    $('.btn-book-update-submit').on('click', function () {
        onUpdateBookDetails(this);
    });
    $('.btn-scroll-page').on('click', function () {
        onPageScroll(this);
    });
    $('.btn-go-to-top').on('click', function () {
        onGoToTop();
    });
    $('.btn-change-page').on('click', function () {
        onPageChange(this);
    });
    $('.confirm-book-remove').on('click', function () {
        onRemoveBook(this);
    });
    $('.btn-change-view').on('click', function () {
        onChangeView(this);
    });
}