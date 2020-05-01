import React from 'react';

import classes from './BookmarkBox.module.css';
import Bookmark from './Bookmark/Bookmark';

const bookmarkBox = (props) => {
    
    let data = [];
    if(props.bookmarks.length !== 0) {
        data = props.bookmarks.map(bookmark => {
            const textdata = bookmark.text.slice(0,40) + '...';
            
            return (
                <Bookmark 
                clicked={() => props.clicked(bookmark.id)}
                key={bookmark.id}
                deleted={() => props.deleted(bookmark.id)} > {textdata} </Bookmark>
            );
        });
    } else {
        data = 'No bookmarks yet!'
    }
    
    return (
        <div className={classes.BookmarkBox}>
            <h3>Here are your Bookmarked Quotes</h3>
            {data}
        </div>
    );
}

export default bookmarkBox;