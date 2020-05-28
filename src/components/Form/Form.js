import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from './useInput';

const Container = styled.div`
  background: #fed9b7;
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 4;
  transition: all 0.5s ease-in-out;
  top: 70px;
  transform: ${(props) => props.isToggle ? 'translateY(0)' : 'translateY(-80%)'};
`;

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2em;
`;

const Label = styled.label`
  font-size: 1.25em;
  min-width: 100px;
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
  max-width: 500px;
  min-width: 200px;
  width: 100%;
  border: none;
  color: #2b2d42;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  background-color: #fdfcdc;
`;

const TextFieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50%;
`;

const placeholder = [
  'I am the king of the jungle',
  'There is no I in team',
  'Happy Friday!',
  'Fear me...',
  'Coffee is life',
  'I am the greatest!',
  'Why did the chicken cross the road?'
];
function Form({ api, isToggle, setIsToggle, setLastPostUpdate }) {
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
      setIsToggle(false);
      setLoading(false);
    }
    reset();
  }
  const getRandomPlaceholder = () => {
    const index = Math.floor(Math.random() * placeholder.length);
    return placeholder[index];
  }
  return (
    <Container isToggle={isToggle}>
      <FormContainer onSubmit={handleSubmit} disabled={loading}>
        <Label htmlFor="phrase">Enter the famous phrase</Label>
        <TextFieldContainer>
          <TextInput id="phrase" type="text" placeholder={getRandomPlaceholder()} disabled={loading} {...bind} />
          <ButtonInput type="submit" value={loading ? 'Saving...' : 'Save!'} disabled={loading}/>
        </TextFieldContainer>
      </FormContainer>
    </Container>
  );
}

export default Form;
