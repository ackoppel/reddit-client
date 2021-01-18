import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllSubPosts, fetchSubPosts } from '../Redux/SubReditPostsSlice';
import PostRender from './PostRender';

import PostsListSkeleton from '../Skeletons/PostsListSkeleton';

import store from '../Redux/Store';


const SubRedditPostsList = () => {
    const posts = useSelector(selectAllSubPosts);
    const subName = useSelector(state => state.community.posts.data.children[0].data.subreddit_name_prefixed);

    const postStatus = useSelector(state => state.community.status);
    const error = useSelector(state => state.community.error);
    
    useEffect(() => {
        if(postStatus === 'idle'){
            store.dispatch(fetchSubPosts());
        }
    }, [postStatus])
    
    let header;
    let content;

    if(postStatus === 'requesting'){
        content = Array(10).fill().map((item, i) => (
            <PostsListSkeleton />
        ))
    } else if (postStatus === 'presented'){
        header = <div className="results-for-div"><h1 className="results-for">{subName}</h1></div>;
        content = posts.data.children.map((post, i)=> (
                <PostRender post={post} key={post.data.id} />
        ))
    } else if (postStatus === 'error'){
        content = {error};
    }

    return(
        <div className='feed main'>
            <div className="feed-div" >
                {header}
                {content}
            </div>
        </div>
    )
}

export default SubRedditPostsList;

/* {subName} */