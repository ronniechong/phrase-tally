import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import Api from './api/api';

const config = {
  host: process.env.REACT_APP_API_HOST,
  key: process.env.REACT_APP_API_KEY,
}
const api = new Api(config);

function App() {
  const [data, setData] = useState({ posts: [] });
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const posts = await api.getPosts();
      setData({ posts: posts.data });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    loading
    ? <div>Loading</div>
    : <Main posts={data.posts} api={api}/>
  );
}

export default App;
