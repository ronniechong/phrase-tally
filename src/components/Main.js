import React from 'react';
import styled from 'styled-components';
import Phrase from './Phrase';
import Loader from './Loader';

const List = styled.ul`
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 1em;
    align-items: center;
    justify-content: center;
  `;

  const ListItem = styled.li`
    margin: 1em;
    min-width: 150px;
    max-width: 300px;
  `;

  const NoData = styled.div`
    padding: 5em;
    text-align: center;
    font-size: 1.5em;
  `

  const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 70px);
  `;

function Main({ api, loading, isAdmin, posts, setLastPostUpdate }) {

  if (!posts.length && !loading) {
    return <NoData>No Phrases available</NoData>
  }

  return (
    <Container>
      <List>
        {
          posts.map((post) => (
            <ListItem key={post._id}>
              <Phrase api={api} post={post} setLastPostUpdate={setLastPostUpdate} isAdmin={isAdmin} />
            </ListItem>
          ))
        }
      </List>
      { loading && <Loader small/> }
    </Container>
  );
}

export default Main;
