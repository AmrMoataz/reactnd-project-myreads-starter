import React, { Component } from 'react'
import Book from './Book';
import PropTypes from 'prop-types'

class Shelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onBookShelfUpdate: PropTypes.func.isRequired
    }

    bookShelfUpdate = (book, value) => {
        const {onBookShelfUpdate} = this.props;
        onBookShelfUpdate(book, value);
    }

    render() { 
        const { title, books } = this.props;
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                    books.map((book) => (
                        <Book
                         key={book.id}
                         book={book}
                         onUpdateBook= {this.bookShelfUpdate}/>
                    ))
                }
              </ol>
            </div>
          </div>
        )
    }
}
 
export default Shelf;