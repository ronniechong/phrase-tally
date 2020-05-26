import React from 'react';
import Phrase from './Phrase';

function Main({ api, posts }) {
  if (!posts.length) {
    return <div>No Posts available</div>
  }

  return (
    <ul>
      {
        posts.map((post) => (
          <li key={post._id}>
            <Phrase api={api} post={post}/>
          </li>
        ))
      }
    </ul>
  );
}

export default Main;
