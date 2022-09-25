import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import './App.css';

interface Question {
  _id: string;
  title: string;
  description: string;
  __v: number;
}

const AppWrapper = styled.div`

`;

const NewQuestionButton = styled.button`

`;

const DumbQuestionButton = styled.button`

`;

function App() {

  const [question, setQuestion] = useState<Question|undefined>(undefined);

  const getQuestion = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/question');
      const question = await response.json();
      setQuestion(question);
    } catch (error) {
      console.error(error);
    }
  }, [setQuestion]);

  const dislikeQuestion = useCallback(async () => {
    try {
      await fetch(`http://localhost:4000/questions/${question?._id}/dislike`, {
        method: 'PUT',
        credentials: 'same-origin',
      });
      getQuestion();
    } catch (error) {
      console.error(error);
    }
  }, [question, getQuestion]);

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <AppWrapper>
      <h3>{question && question.title}</h3>
      <NewQuestionButton onClick={getQuestion}>New Question</NewQuestionButton>
      <DumbQuestionButton onClick={dislikeQuestion}>This Question is Dumb</DumbQuestionButton>
    </AppWrapper>
  );
}

export default App;
