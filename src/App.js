import React, { Fragment, useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Main from './components/Main';
import Form from './components/Form/Form';
import Loader from './components/Loader';
import Api from './api';

const config = {
  host: process.env.REACT_APP_API_HOST,
  key: process.env.REACT_APP_API_KEY,
}
const api = new Api(config);

function App() {
  const [data, setData] = useState({ posts: [] });
  const [lastPostUpdate, setLastPostUpdate] = useState(new Date().valueOf());
  const [loading, setIsLoading] = useState(false);
  const title = process.env.REACT_APP_TITLE;

  const GlobalStyle = createGlobalStyle`
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  body{
  margin: 0;
  padding: 0;
  font-size: 18px;
  line-height: 1.3;
  font-family: 'Kalam', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fdfcdc;
  color: #2b2d42;
}
`;

const Title = styled.h1`
  color: #f07167;
  margin: 0;
`;

const Header = styled.header`
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-direction: row;
  background : #fed9b7;
  width: 100%;
`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const posts = await api.getPosts();
      setData({ posts: posts.data });
      setIsLoading(false);
    };
    fetchData();
  }, [lastPostUpdate, setData]);

  const formProps = {
    api,
    setLastPostUpdate,
  }
  return (
    <Fragment>
      <GlobalStyle />
      <Header>
        <Title>{ title }</Title>
        <Form {...formProps} />
      </Header>
      { loading && <Loader type="main" />}
      { !loading && <Main posts={data.posts} api={api} setLastPostUpdate={setLastPostUpdate} /> }
    </Fragment>
  )
}

export default App;
