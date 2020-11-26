import React, { useState } from 'react';
// Import Utils
import clsx from 'clsx';
// Import Stylesheets
import '../../assets/search.module.scss';
// Import Material Icons
import { Search as SearchIcon } from '@material-ui/icons';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// React Component
const Search = ({ resetSubreddit, onSubmit, children, className, ...rest }) => {
  const classes = useStyles();
  const [searchtext, setSearchText] = useState('');

  function onSearchSubmit(event) {
    event.preventDefault();
    onSubmit(searchtext);
  }

  // Render React
  return (
    <Grid container direction="column" spacing={3} className={classes.root}>
      <Grid item className={clsx(classes.headerClass, 'search-container')}>
        <h1 onClick={resetSubreddit} id="logo">
          <span aria-hidden="true">Redditax</span> <span>Reddit</span>ax
          <span aria-hidden="true">Redditax</span>
        </h1>
        <div className="search-container">
          <form onSubmit={onSearchSubmit} className="search-box">
            <span>r/</span>
            <input
              type="text"
              className="search-input"
              value={searchtext}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              <SearchIcon fontSize="large" />
            </button>
          </form>
        </div>
      </Grid>
      <Grid item className={classes.contentClass}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Search;
