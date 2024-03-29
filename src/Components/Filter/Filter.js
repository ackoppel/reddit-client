import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortByAdded, postFromAdded } from '../Redux/FilterSlice';
import { fetchResults } from '../Redux/PostsSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector(state => state.filters.sortBy);
    const postsFrom = useSelector(state => state.filters.postsFrom);

    const [sort, setSort] = useState(sortBy);
    const [from, setFrom] = useState(postsFrom);

    useEffect(() => {
        setSort(sortBy);
        setFrom(postsFrom)
    }, [sortBy, postsFrom])
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(sortBy !== sort && postsFrom !== from){
            dispatch(sortByAdded(sort));
            dispatch(postFromAdded(from));
            dispatch(fetchResults());
        } else if (sortBy !== sort && postsFrom === from){
            dispatch(sortByAdded(sort));
            dispatch(fetchResults());
        } else if(sortBy === sort && postsFrom !== from){
            dispatch(postFromAdded(from));
            dispatch(fetchResults());
        } else {
            return
        }
    }

    let input;
    let postsSelect;

    if((sortBy !== sort && postsFrom !== from) || (sortBy !== sort && postsFrom === from) || (sortBy === sort && postsFrom !== from)){
        input = <input className="submit" type="submit" value="Filter" />
    } else {
        input = null;
    }

    if(sort !== "New"){
        postsSelect = (
                    <label>
                        <p>POSTS FROM</p>
                        <select value={from} onChange={(e) => {setFrom(e.target.value)}} >
                            <option value="hour" >Past Hour</option>
                            <option value="day" >Past 24 Hours</option>
                            <option value="week" >Past Week</option>
                            <option value="month" >Past Month</option>
                            <option value="year" >Past Year</option>
                            <option value="all" >All Time</option>
                        </select>
                    </label>
        )
    } else {
        postsSelect = null;
    }

    return(
        <div className="filter-div" >
            <form onSubmit={onSubmit} >
                <div className="label-select-div">
                    <label>
                        <p>SORT BY</p>
                        <select value={sort} onChange={(e) => {setSort(e.target.value)}} >
                            <option value="Relevance" >Relevance</option>
                            <option value="Hot" >Hot</option>
                            <option value="Top" >Top</option>
                            <option value="New" >New</option>
                            <option value="Comments" >Comments</option>
                        </select>
                    </label>
                    {postsSelect}
                </div>
                {input}
            </form>
        </div>
    )
}

export default Filter;