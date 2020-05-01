import React from 'react';

import classes from './QuotesBox.module.css';
import Quote from './Quote/Quote';

const quotesBox = (props) => {
        
        let data = null;
        if (props.quoteText) {
            data = (
                <div className={classes.MainBox}>
                    <h3>Some Inspirational Quotes!</h3>
                    <Quote quoteText={props.quoteText} quoteAuthor={props.quoteAuthor} />
                    <div className={classes.Buttons}>
                        <button onClick={props.bookmarkClicked}>BookMark</button>
                        <button onClick={props.prevClicked}>Prev</button>
                        <button onClick={props.nextClicked}>Next</button>
                    </div>
                </div>
            );
        }

        return (
            <div className={classes.QuotesBox}>
                {data}
            </div>
        );
    }

export default quotesBox;