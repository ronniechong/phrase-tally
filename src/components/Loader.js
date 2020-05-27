import React from 'react';
import styled, { keyframes } from 'styled-components';

const anim = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`;

const AnimLoader = styled.div`
  background: #f07167;
  -webkit-animation: ${anim} 1s infinite ease-in-out;
  animation: ${anim} 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
  color: #f07167;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;

  &:before,
  &:after {
    background: #f07167;
    -webkit-animation: ${anim} 1s infinite ease-in-out;
    animation: ${anim} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
    position: absolute;
    top: 0;
    content: '';
  }
  &:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  &:after {
    left: 1.5em;
  }
`;

const LoaderContainer = styled.div`
  position: absolute;
  background: ${(props) => props.type === 'main' ? '#fed9b7' : `rgba(255,255,255, 0.25)`};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => (
  <LoaderContainer>
    <AnimLoader/>
  </LoaderContainer>
);

export default Loader;
