import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PostContext = createContext(null);

const PostContextProvider = (props) => {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/`)
        .then(res => {
            setPostList(res.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    
    return (
        <PostContext.Provider value={{postList}}>
            {props.children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;