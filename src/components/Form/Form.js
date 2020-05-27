import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from './useInput';

const FormContainer = styled.div`
  align-content: flex-end
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
    <FormContainer>
      <form onSubmit={handleSubmit} disabled={loading}>
        { loading && <div>adding text</div> }
        <label htmlFor="phrase">Text</label>
        <input id="phrase" type="text" placeholder="Your famous phrase" {...bind} />
        <input type="submit" value="Add" disabled={loading}/>
      </form>
    </FormContainer>
  );
}

export default Form;
