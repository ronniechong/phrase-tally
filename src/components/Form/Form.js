import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from './useInput';
import Loader from '../Loader';

const Container = styled.div`
  padding: 2em;
  background: #fed9b7;
  position: relative;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 1.25em;
`;

const ButtonInput = styled.input`
  padding: 0.75em 1em;
  font-size: 1.25em;
  font-family: 'Kalam', cursive;
  outline: none;
  cursor: pointer;
  border: 0;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  background-color: #f07167;
  color: #fff;
`;

const TextInput = styled.input`
  margin: 0 0 0 1em;
  padding: 0.75em;
  font-size: 1.25em;
  font-family: 'Kalam', cursive;
  outline: none;
  max-width: 50%;
  width: 100%;
  border: none;
  color: #2b2d42;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  background-color: #fdfcdc;
`;

function Form({ api, setLastPostUpdate }) {
  const { value, bind, reset } = useInput('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (value.length) {
      setLoading(true);
      const newPost = await api.addPost(value);
      if (newPost && newPost.data) {
        setLastPostUpdate(new Date().valueOf());
      }
      setLoading(false);
    }
    reset();
  }
  return (
    <Container>
      <FormContainer onSubmit={handleSubmit} disabled={loading}>
        <Label htmlFor="phrase">Enter the famous phrase</Label>
        <TextInput id="phrase" type="text" placeholder="I am the king of the jungle" disabled={loading} {...bind} />
        <ButtonInput type="submit" value={loading ? 'Saving...' : 'Save!'} disabled={loading}/>
      </FormContainer>
      { loading && <Loader type="fill" /> }
    </Container>
  );
}

export default Form;
