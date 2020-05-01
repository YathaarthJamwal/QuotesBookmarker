import React from 'react';

const quote = (props) => {
    return (
        <p>
            <q>{props.quoteText}</q>
            <q> ~<strong> {props.quoteAuthor} </strong></q>
        </p>
        
    );
};

export default quote;