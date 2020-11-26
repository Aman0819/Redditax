import React from 'react';
// Import Custom Components
import Header from './Header';
import SubredditCard from './SubredditCard';
import subreddits from '../../static/subreddits';

function createCard(subreddit) {
  return (
    <SubredditCard
      name={subreddit.name}
      url={subreddit.url}
      alt={subreddit.alt}
      subcount={subreddit.subcount}
      description={subreddit.description}
      rank={subreddit.rank}
      key={subreddit.rank}
    />
  );
}
function CardGrid({ className, ...rest }) {
  return (
    <div className={className}>
      <Header title="Browse Some From Here" />
      <div className="card-container">{subreddits.map(createCard)}</div>
    </div>
  );
}

export default CardGrid;
