import React, { useState } from 'react';
import styled from 'styled-components';
import formatDistance from 'date-fns/formatDistance';
import Loader from './Loader';


const colorSet = ['#97f4e5', '#74e8d4', '#2ed1b5', '#158774', '#0c5e50'];

function Phrase({ api, post, setLastPostUpdate }) {
  const [currPost, setPost] = useState(post);
  const [loading, setIsLoading] = useState(false);

  const SpeechBubble = styled.div`
    position: relative;
    background: ${(props) => '#0081a7'};
    border-radius: .4em;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 25%;
      width: 0;
      height: 0;
      border: 2em solid transparent;
      border-top-color: ${(props) => '#0081a7'};
      border-bottom: 0;
      border-left: 0;
      margin-left: -1em;
      margin-bottom: -2em;
    }
  `

  const Counter = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 2.25em;
    height: 2.5em;
    background-color: #00afb9;
    text-align: right;
    font-weight: 700;
    border-bottom-left-radius: 100%;
    line-height: 2em;
    padding-right: 0.5em;
    color: #ffffff;
  `;

  const Content = styled.p`
    margin: 0;
    text-align: left;
    font-size: 1.4em;
    width: 100%;
    color: #ffffff;
  `;

  const Container = styled.div`
    padding: 1em 3.5em 1em 1em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 80px;
  `;

  const Button = styled.button`
    background: #fed9b7;
    border: none;
    border-radius: 100%;
    color: #f07167;
    font-weight: 700;
    font-size: 1em;
    outline: none;
    font-family: 'Kalam', cursive;
    width: 1.3em;
    height: 1.3em;
    line-height: 1.3em;
    text-align: center;
    margin: 0 0.25em 0.45em 0;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &:hover {
      color: #fed9b7;
      background: #f07167;
    }
  `;

  const FinePrint = styled.span`
    font-size: 0.75em;
    margin: 0;
    position: absolute;
    top: calc(100% - 2em);
    right: 0;
    max-width: 50%;
  `;

  const SpeechBubbleContainer = styled.div`
    position: relative;
    padding-bottom: 2.1em;
  `;

  const ButtonController = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 3em;
    right: 0;
  `;

  const add = async () => {
    setIsLoading(true);
    const updatedPost = await api.addTally(post._id);
    setPost(updatedPost.data);
    setIsLoading(false);
  }

  const del = async () => {
    setIsLoading(true);
    const tmpId = post._id;
    const updatedPost = await api.deletePost(tmpId);
    if (updatedPost && updatedPost.result) {
      const hasId = updatedPost.result.some((v) => v === tmpId);
      if (!hasId) {
        console.error('Delete failed');
      }
    }
    setLastPostUpdate(new Date().valueOf());
    setIsLoading(false);
  }

  const lastUpdate = `${process.env.REACT_APP_LAST_UPDATE} ${formatDistance(new Date(currPost.lastupdate), new Date(), { addSuffix: true })}`;
  const getTheme = () => {
    const min = 10;
    const max = 90;
    return Math.floor((Math.random() * (max - min)) + min);
  }
  return (
    <SpeechBubbleContainer>
      <SpeechBubble index={getTheme()}>
        <Container>
          <Content>{ currPost.text } </Content>
          <Counter>{ currPost.count }</Counter>
            <ButtonController>
              <Button onClick={add} disabled={loading}>+</Button>
              <Button onClick={del} disabled={loading}>x</Button>
            </ButtonController>
        </Container>
        { loading && <Loader>loading</Loader>}
      </SpeechBubble>
      <FinePrint>{ lastUpdate}</FinePrint>
    </SpeechBubbleContainer>
  );
}

export default Phrase;
