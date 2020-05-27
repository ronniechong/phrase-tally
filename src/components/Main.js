import React, { Fragment } from 'react';
import styled from 'styled-components';
import Phrase from './Phrase';

function Main({ api, posts, setLastPostUpdate }) {

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
  `;

  const NoData = styled.div`
    padding: 5em;
    text-align: center;
    font-size: 1.5em;
  `

  if (!posts.length) {
    return <NoData>No Phrases available</NoData>
  }

  return (
    <Fragment>
      <List>
        {
          posts.map((post) => (
            <ListItem key={post._id}>
              <Phrase api={api} post={post} setLastPostUpdate={setLastPostUpdate} />
            </ListItem>
          ))
        }
      </List>
    </Fragment>
  );
}

export default Main;
