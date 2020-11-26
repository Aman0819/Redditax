import React, { useCallback, useEffect, useState, useRef } from 'react';
// Import Utilities
import axios from 'axios';
import './assets/App.css';
// Import Custom Components
import TitleComponent from './views/Title';
import Search from './views/Search';
import CardGrid from './views/Home';
import ImageGrid from './views/ImageGrid';
// Import Material Components
import { ThemeProvider } from '@material-ui/core';
// Import Material theme
import theme from './theme';
import useIsMountedRef from './hooks/useIsMountedRef';

// Define Proxies for API
const URL = 'https://www.reddit.com/r/';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

// React Component
function App() {
  const [currentSubreddit, setCurrentSubreddit] = useState('');
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isMountedRef = useIsMountedRef();
  const after = useRef(null);
  const before = useRef(null);
  // const [reddit, setReddit] = useState({
  //   currentSubreddit: '',
  //   files: [],
  //   after: null,
  //   before: null,
  //   currentPage: 1
  // });
  const [retry, setRetry] = useState(false);

  const searchSubreddit = useCallback(
    async (subreddit) => {
      try {
        await setRetry(false);
        const response = await axios.get(
          `${CORS_PROXY}${URL}${subreddit}.json?raw_json=1`
        );

        if (isMountedRef.current) {
          setCurrentSubreddit(subreddit);
          setFiles(response.data.data.children);
        }
        // setReddit({
        //   ...reddit,
        //   currentSubreddit: subreddit,
        //   files: response.data.data.children
        // });
      } catch (err) {
        setRetry(true);
        console.error(err);
      }
    },
    [isMountedRef]
  );

  useEffect(() => {
    files.forEach((element) => {
      if (element.data.preview) {
        console.log(element.data.preview.images[0].source.URL);
      }
    });
  }, [files]);

  // Test
  useEffect(() => console.log('retry changed! yay'), [retry]);

  const getNextPage = useCallback(async () => {
    const response = await axios.get(
      `${URL}${currentSubreddit}.json?count=${
        currentPage * 25
      }&after=${after}&raw_json=1`
    );

    if (isMountedRef.current) {
      setFiles(response.data.data.children);
      after.current = response.data.data.after;
      before.current = response.data.data.before;
      setCurrentPage((prev) => prev + 1);
    }
    // setReddit({
    //   ...reddit,
    //   files: response.data.data.children,
    //   after: response.data.data.after,
    //   before: response.data.data.before,
    //   currentPage: reddit.currentPage + 1
    // });
    window.scrollTo(0, 0);
  }, [isMountedRef, currentPage, currentSubreddit]);

  const getPrevPage = useCallback(async () => {
    const response = await axios.get(
      `${URL}${currentSubreddit}.json?count=${
        (currentPage - 1) * 25 - 1
      }&before=${before}&raw_json=1`
    );

    if (isMountedRef.current) {
      setFiles(response.data.data.children);
      after.current = response.data.data.after;
      before.current = response.data.data.before;
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
    // setReddit({
    //   ...reddit,
    //   files: response.data.data.children,
    //   after: response.data.data.after,
    //   before: response.data.data.before
    // });
    window.scrollTo(0, 0);
  }, [isMountedRef, currentPage, currentSubreddit]);

  const resetSubreddit = () => {
    setCurrentSubreddit('');
  };

  // Render React
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TitleComponent title="Redditax" />
        <Search onSubmit={searchSubreddit} />
        <h1 onClick={resetSubreddit} id="logo">
          <span aria-hidden="true">Redditax</span> <span>Reddit</span>ax
          <span aria-hidden="true">Redditax</span>
        </h1>
        {!currentSubreddit ? (
          <CardGrid />
        ) : (
          <ImageGrid
            files={files}
            getPrevPage={getPrevPage}
            getNextPage={getNextPage}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
