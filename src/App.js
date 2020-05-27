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
  color: #ffffff;
  margin: 0;
`;

const Header = styled.header`
  padding: 0.5em 4.5em 0.5em 1em;
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-direction: row;
  background : #f07167;
  position: relative;
`;

const Button = styled.button`
  font-family: 'Kalam', cursive;
  font-size: 2em;
  width: 1.25em;
  height: 1.25em;
  border-radius: 100%;
  line-height: 1.25em;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;
  background-color: #f07167;
  font-weight: 700;
  border: none;
  color: #fed9b7;
  position: absolute;
  top: 50%;
  right: 0.5em;
  transform: translateY(-50%);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-50%) scale(1.1);
    background-color: #fed9b7;
    color: #f07167;
  }
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
        <Button>+</Button>
      </Header>
      <Form {...formProps} />
      <Main posts={data.posts} api={api} setLastPostUpdate={setLastPostUpdate} loading={loading} />
    </Fragment>
  )
}

export default App;
