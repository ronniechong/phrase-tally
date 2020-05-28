import React, { Fragment, useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Main from './components/Main';
import Form from './components/Form/Form';
import Api from './api';

const config = {
  host: process.env.REACT_APP_API_HOST,
  key: process.env.REACT_APP_API_KEY,
}
const api = new Api(config);

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
  height: 60px;
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-direction: row;
  background : #f07167;
  position: relative;
  z-index: 5;
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

function App() {
  const [data, setData] = useState({ posts: [] });
  const [mode, setMode] = useState(process.env.REACT_APP_MODE);
  const [isToggle, setIsToggle] = useState(false);
  const [lastPostUpdate, setLastPostUpdate] = useState(new Date().valueOf());
  const [loading, setIsLoading] = useState(false);
  const title = process.env.REACT_APP_TITLE;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const posts = await api.getPosts();
      setData({ posts: posts.data });
      setIsLoading(false);
    };
    fetchData();
  }, [lastPostUpdate, setData]);


  useEffect(() => {
     const getUrlParameter = (name) => {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.search);
        return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    const getMode = () => {
      const query = getUrlParameter('mode');
      if (query && query.toUpperCase() === 'ADMIN') {
        setMode('admin');
      };
    };
    getMode();
  });

  const formProps = {
    api,
    isToggle,
    setIsToggle,
    setLastPostUpdate,
  }
  const isAdmin = mode === 'admin';
  return (
    <Fragment>
      <GlobalStyle />
      <Header>
        <Title>{ title }</Title>
        { isAdmin && <Button onClick={() => setIsToggle(!isToggle)}>+</Button> }
      </Header>
      <Form {...formProps} />
      <Main posts={data.posts} api={api} setLastPostUpdate={setLastPostUpdate} loading={loading} isAdmin={isAdmin} />
    </Fragment>
  )
}

export default App;
