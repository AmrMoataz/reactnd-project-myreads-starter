import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }
    state = {
        shelfValue: this.props.book.shelf
    }

    updateBookShelfValue = (value) => {
        const {book, onUpdateBook } = this.props
        book.shelf = value;
        this.setState(() => ({
            shelfValue: value
        }))
        onUpdateBook(book, value)
    }

    render() {
        const { book, onUpdateBook } = this.props;
        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        {book.imageLinks && <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>}
                        <div className="book-shelf-changer">
                            <select value={this.state.shelfValue} onChange={(event) => this.updateBookShelfValue(event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors ? (<div className="book-authors">{book.authors.join(", ")}</div>) : (<p></p>)}
                </div>
            </li>
        )
    }
}

export default Book;