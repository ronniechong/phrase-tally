import React, { useState } from 'react';
import formatDistance from 'date-fns/formatDistance';

function Phrase({ api, post }) {
  const [currPost, setPost] = useState(post);
  const [loading, setIsLoading] = useState(false);
  const add = async () => {
    setIsLoading(true);
    const updatedPost = await api.addTally(post._id);
    setPost(updatedPost.data);
    setIsLoading(false);
  }

  const lastUpdate = formatDistance(new Date(currPost.lastupdate), new Date(), { addSuffix: true });
  return (
    <div>
      { loading && <p>loading</p>}
      <p>{ currPost.text } - { currPost.count }</p>
      <p>{ lastUpdate}</p>
      <button onClick={add}>+</button>
    </div>
  );
}

export default Phrase;
