var books = [
    {   title: 'Camino Island',
        author: 'John Grisham',
        publisher: 'Knopf Doubleday Publishing Group',
        year: '2017',
        isbn: '9780385543026',
        volumes: 1
    },
    
    {   title: 'Into the Wasterr',
        author: 'Paula Hawkins',
        publisher: 'Penguin Publishing Group',
        year: '2017',
        isbn: '9780735211209',
        volumes: 1
    },
    
    {   title: 'Luckiest Girl Alive',
        author: 'Jessica Knoll',
        publisher: 'Simon & Schuster',
        year: '2015',
        isbn: '9781476789637',
        volumes: 1
    },
    
    {   title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        publisher: 'Ballantine',
        year: '1965',
        isbn: '0345240324',
        volumes: 3
    },
    
    {   title: 'Dark Places',
        author: 'Gillian Flynn',
        publisher: 'Crown/Archetype',
        year: '2010',
        isbn: '9780307341570',
        volumes: 1
    },
    
    {   title: 'Big Little Lies',
        author: 'Liane Moriaty',
        publisher: 'Penguin Publishing Group',
        year: '2015',
        isbn: '9780425274866',
        volumes: 1
    },
    
    {   title: 'Leaving Time',
        author: 'Jodi picoult',
        publisher: 'Random House Publishing Group',
        year: '2015',
        isbn: '9780345544940',
        volumes: 1
    },
    
    {   title: 'Me before You',
        author: 'Jojo Moyes',
        publisher: 'Penguin Publishing Group',
        year: '2013',
        isbn: '9780143124542',
        volumes: 1
    },
    
    {   title: 'The Nightingale',
        author: 'Kristin Hannah',
        publisher: 'St. Martins Press',
        year: '2017',
        isbn: '9781250080400',
        volumes: 1
    },
    
    {   title: 'All the Light We Cannot See',
        author: 'Anthony Doerr',
        publisher: 'Scribner',
        year: '2017',
        isbn: '9781501173219',
        volumes: 1
    }
];

/**
 * Format array of books as string for display
 * if list is empty display warning no match
 * @param array bookList
 * @return string
 */
function formatBookList(bookList) {
    var list = '-------------------------------------------\n';
    if (bookList.length > 0) {
        bookList.forEach( (book) => 
        {
            list += 'Title: ' + book.title + '\n';
            list += 'Author: ' + book.author + '\n';
            list += 'Publisher: ' + book.publisher + '\n';
            list += 'Published Year: ' + book.year + '\n';
            list += 'ISBN Number: ' + book.isbn + '\n';
            if (book.volumes > 1) {
                list += 'Volumes: ' + book.volumes + '\n';
            }
            list += '-------------------------------------------\n';
        });
    } else {
         list += '>>>- No book titles matched your query -<<<\n';
         list += '-------------------------------------------\n';
    }
    return list;
}

/**
 * Return a sorted list of books
 * by Title Ascending
 * @return array
 */
exports.byTitleAsc = function () {
    var results = books.sort(function (book1, book2) {
       if (book1.title.toLowerCase() < book2.title.toLowerCase()) {
            return -1;
        } else {
            return 1;
        };                       
    });
    results = formatBookList(results);
    return results;
    
}

/**
 * Return a sorted list of books
 * that have searchText in their title
 * by Title Ascending
 * @param string searchText = text to search for in book title
 * @return array
 */
exports.get = function (searchText) {
    var bookList = books.filter((book) => {
        return book.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
    var results = 'Searching for ' + searchText + '\n';
    results += formatBookList(bookList);
    return results;
}

/**
 * Delete any book whose title matches searchText
 * @param string searchText = text to search for in book title
 * @return string
 */
exports.delete = function (searchText) {
    const START_LENGTH = books.length;
    let newBooks = books.filter((book) => {
        return (book.title.toLowerCase() != searchText.toLowerCase());
    });
    books = newBooks;
    results = searchText;
    if (START_LENGTH > books.length) {
        results += ' removed, ';   
    } else {
        results += ' NOT removed, ';   
    }
    results += books.length.toString() + ' total books'
    return (results);
}

/**
 * Add a new book
 * Must have at least title param
 * Do not add if matching title exists
 * @param object params
 * @return string
 */
exports.add = function (params) {
    var match = false;   
    books.forEach( (book) => 
    {
        if (book.title.toLowerCase() === params.title.toLowerCase()) {
            match = true;
        }
    });
    
    var results = params.title; 
    if (!match) {
        var addedBook = {
            title: params.title     
        };
        (params.author) ? addedBook.author = params.author : addedBook.author = "";
        (params.publisher) ? addedBook.publisher = params.publisher : addedBook.publisher = "";
        (params.year) ? addedBook.year = params.year : addedBook.year = "";
        (params.isbn) ? addedBook.isbn = params.isbn : addedBook.isbn = "";
        (params.volumes) ? addedBook.volumes = params.volumes : addedBook.volumes = "1";

        books.push(addedBook);
        results += ' added , ';   
    } else {
        results += ' NOT added, ';   
    }
    results += books.length.toString() + ' total books'
    return (results);
}