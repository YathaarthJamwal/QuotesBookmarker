import React, { Component } from 'react';

import './App.css';
import QuotesBox from './components/QuotesBox/QuotesBox';
import BookmarkBox from './components/BookmarkBox/BookmarkBox';
import Heading from './components/Heading /Heading';
import Spinner from './components/Spinner/Spinner';

class App extends Component {
    state = {
        quotes: null,
        currentId: 1,
        bookmarked: [],
        spinner: true
    };

    componentDidMount() {
        this.getQuotes();
    }

    getQuotes = async () => {
        const response = await fetch(`https://powerful-waters-32951.herokuapp.com/api/quotes`);
        const quotesData = await response.json();
    
        this.setState({ quotes: quotesData, spinner: false });
    }
    nextClickHandler = () => {
        if (this.state.quotes) {
            if (this.state.currentId === this.state.quotes.length)
                this.setState({ currentId: 1 });
            else
                this.setState({ currentId: this.state.currentId + 1 });
        }
    }

    prevClickHandler = () => {
        if (this.state.quotes) {
            if (this.state.currentId === 1)
                this.setState({ currentId: this.state.quotes.length });
            else
                this.setState({ currentId: this.state.currentId - 1 });
        }
    }

    bookmarkClickHandler = () => {
        let bookmarked = [...this.state.bookmarked];
        const newQuote = this.state.currentId;

        bookmarked.push(newQuote);

        const uniqueBookmarked = bookmarked.filter((value, index) => bookmarked.indexOf(value) === index);

        this.setState({ bookmarked: uniqueBookmarked });
    }

    bookmarkSelectedHandler = (bookmarkId) => {
        this.setState({ currentId: bookmarkId });
    }

    bookmarkDeleteHandler = (bookmarkId) => {
        let newBookmarked = [...this.state.bookmarked];
        const index = newBookmarked.indexOf(bookmarkId);
        if (index !== -1)
            newBookmarked.splice(index, 1);

        this.setState({ bookmarked: newBookmarked });
    }

    render() {
        let quoteText = null;
        let quoteAuthor = null;
        let spinner = null;
        let bookmarks = [];

        if(this.state.spinner)
            spinner = (<Spinner />);
        
        if(this.state.quotes) {
            quoteText = this.state.quotes[this.state.currentId - 1].text;
            quoteAuthor = this.state.quotes[this.state.currentId - 1].author;
        }
        
        this.state.bookmarked.forEach(bookmarkId => {
            bookmarks.push({
                id: bookmarkId,
                text: this.state.quotes[bookmarkId - 1].text,
                author: this.state.quotes[bookmarkId - 1].author
            });
        })
        
        return ( 
            <div>
                <Heading />
                {spinner}
                <QuotesBox prevClicked = { this.prevClickHandler }
                        nextClicked = { this.nextClickHandler }
                        quoteText = { quoteText }
                        quoteAuthor = { quoteAuthor }
                        bookmarkClicked = { this.bookmarkClickHandler }/> 
                <BookmarkBox clicked = {(bookmarkId) => this.bookmarkSelectedHandler(bookmarkId) }
                        bookmarks = { bookmarks }
                        deleted = {(bookmarkId => this.bookmarkDeleteHandler(bookmarkId)) }/> 
            </div>
        );
    }
}

export default App;