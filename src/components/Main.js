import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import Phrase from './Phrase';
import Loader from './Loader';

const List = styled(motion.ul)`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 1em;
  align-items: center;
  justify-content: center;
`;

const ListItem = styled(motion.li)`
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
  min-height: calc(100vh - 80px);
`;

function Main({ api, loading, isAdmin, posts, setLastPostUpdate }) {

  if (!posts.length && !loading) {
    return <NoData>No Phrases available</NoData>
  }

  return (
    <Container>
      <List>
        {
          posts.map((post, index) => (
            <ListItem
              key={post._id}
              initial={{scale: 0.5, opacity: 0}}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                x: { type: 'spring', stiffness: 100 },
                default: { duration: 0.5 },
              }}
              positionTransition
            >
              <Phrase api={api} post={post} setLastPostUpdate={setLastPostUpdate} isAdmin={isAdmin} />
            </ListItem>
          ))
        }
      </List>
      { loading && <Loader/> }
    </Container>
  );
}

export default Main;
