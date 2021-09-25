import React, { Component } from 'react' 
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookShelves extends Component {

    static propTypes = {
      books: PropTypes.array.isRequired,
      onBooksUpdate: PropTypes.func.isRequired
    } 

    onBooksShelfValueUpdate = (book, value) => {
        const { onBooksUpdate } = this.props;
        onBooksUpdate(book, value);
    }

    render() {
        const currentlyReadingBooks = this.props.books.filter((book) => book.shelf === 'currentlyReading');
        const wantToReadBooks = this.props.books.filter((book) => book.shelf === 'wantToRead');
        const readBooks = this.props.books.filter((book) => book.shelf === 'read');

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>
                    <Shelf
                     title='Currently Reading'
                     books={currentlyReadingBooks}
                     onBookShelfUpdate={this.onBooksShelfValueUpdate}/>
                    <Shelf
                    title='Want to read'
                    books={wantToReadBooks}
                    onBookShelfUpdate={this.onBooksShelfValueUpdate} />
                    <Shelf
                    title='Read'
                    books={readBooks}
                    onBookShelfUpdate={this.onBooksShelfValueUpdate} />
              </div>
            </div>
            <Link
                to='/search'
                className="open-search">Add Book</Link>
          </div>
        )
    }
}

export default BookShelves