'use strict';

var gTrans = {
    'table-id': {
        en: 'ID',
        de: 'ID',
        he: 'קוד זיהוי',
        ab: 'رقم الهوية'
    },
    'table-title': {
        en: 'Title',
        de: 'Buchtitel',
        he: 'שם הספר',
        ab: 'عنوان كتاب'
    },
    'table-price': {
        en: 'Price',
        de: 'Buchpreis',
        he: 'מחיר',
        ab: 'سعر'
    },
    'table-cover': {
        en: 'Cover',
        de: 'Buchumschlag',
        he: 'כריכה',
        ab: 'غلاف الكتاب'
    },
    'table-actions': {
        en: 'Actions',
        de: 'Aktionen',
        he: 'פעולות',
        ab: 'أجراءات'
    },
    'btn-action-info': {
        en: 'Info',
        de: 'Info',
        he: 'עוד מידע',
        ab: 'معلومات'
    },
    'btn-action-update': {
        en: 'Update',
        de: 'Ktualisieren',
        he: 'לעדכון',
        ab: 'تحديث'
    },
    'btn-action-remove': {
        en: 'Delete',
        de: 'Löschen',
        he: 'למחיקה',
        ab: 'حذف'
    },
    'proj-title': {
        en: 'My Bookshop',
        de: 'Meine Buchhandlung',
        he: 'חנות הספרים שלי',
        ab: 'مكتبتي'
    },
    'add-a-book': {
        en: 'Add a book:',
        de: 'Ein Buch hinzufügen:',
        he: ':הוסף ספר',
        ab: 'أضف كتابًا:'
    },
    'add-book-name': {
        en: 'Book name:',
        de: 'Buchname:',
        he: 'שם הספר:',
        ab: 'اسم الكتاب:'
    },
    'add-book-name-placeholder': {
        en: 'Name',
        de: 'Buchname',
        he: 'שם',
        ab: 'اسم'
    },
    'add-book-price': {
        en: 'Price:',
        de: 'Preis:',
        he: 'מחיר:',
        ab: 'سعر:'
    },
    'add-book-price-placeholder': {
        en: 'Price',
        de: 'Preis',
        he: 'מחיר',
        ab: ''
    },
    'btn-add-new-book': {
        en: 'Add',
        de: 'bestätigen',
        he: 'לחץ להוסיף',
        ab: ''
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang]

    // if not founf - use english
    if (!txt) txt = keyTrans['en']

    return txt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            // el.placeholder = txt
            // THE SAME!!
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    })
}

function setLang(lang) {
    gCurrLang = lang;
}


function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}
