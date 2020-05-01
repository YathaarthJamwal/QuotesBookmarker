import React from 'react';

import classes from './Bookmark.module.css';

const bookmark = (props) => {
    return(
        <div className={classes.Bookmark} >
            <q  >{props.children}</q>
            <button onClick={props.clicked}><strong>Display</strong></button>
            <button onClick={props.deleted}><strong>Delete</strong></button>
        </div>
    );
}

export default bookmark;