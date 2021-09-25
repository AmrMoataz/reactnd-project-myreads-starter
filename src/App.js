import React from 'react' 
import './App.css'
import * as BooksAPI from './BooksAPI'  
import BookShelves from './BookShelves'
import Search from './Search'
import { Route } from 'react-router-dom' 

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  onBooksUpdate = (book, value) => {
    BooksAPI.update(book, value);
    this.setState((currentState) => ({
        books: currentState.books.map((loopedbook) => {
            if(loopedbook.id === book.id) { 
                loopedbook.shelf = value;
            } 
            return loopedbook;
        })
    }))
  }
  
  onSearchedBooksUpdated = (book, value) => {
    const {books} = this.state;
    const exists = books.some(b => b.id === book.id)
    if(exists) {
      this.onBooksUpdate(book, value)
    } else {
      BooksAPI.update(book, value);
      book.shelf = value;
      this.setState((currentState) => ({
        books: currentState.books.concat([book])
      }))
    }
    
  }

  render() {
    return (
      <div className="app"> 
        <Route exact path='/' render={()=> (
          <BookShelves
           books={this.state.books}
           onBooksUpdate={this.onBooksUpdate}/>
          )} />
        <Route path='/search' render={()=> (
          <Search 
          onUpdateBookInSerach={this.onSearchedBooksUpdated}
          shelfedBooks={this.state.books} />
        )} /> 
      </div>
    )
  }
}

export default BooksApp
