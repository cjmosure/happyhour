import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import './App.css';
import { useSwipeable } from 'react-swipeable';

interface Question {
  _id: string;
  title: string;
  description: string;
  __v: number;
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex-grow: 1;
  font-family: ui-sans-serif,-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",Helvetica,Inter,Arial,"Noto Sans",sans-serif;
  background: #0d0e0f;
  color: #d9d6d1;
`;

const QuestionWrapper = styled.div`
  flex-grow: 1;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
`;

const QuestionText = styled.h3`
  font-size: 2.5rem;
`;

const Button = styled.button`
  padding: 1rem;
  border: none;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  border-radius: 3px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`

const NewQuestionButton = styled(Button)`
  background: #0074D9;
  color: #FFF;
`;

const DumbQuestionButton = styled(Button)`
  background: #FF4136;
  color: #FFF;
  margin: 0;
`;

function App() {

  const [question, setQuestion] = useState<Question|undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);

  const getQuestion = useCallback(async () => {
    try {
      const response = await fetch(`/question`);
      const question = await response.json();
      setQuestion(question);
      setQuestions((questions) => ([...questions, question]));
    } catch (error) {
      console.error(error);
    }
  }, [setQuestion]);

  const dislikeQuestion = useCallback(async () => {
    try {
      await fetch(`/questions/${question?._id}/dislike`, {
        method: 'PUT',
        credentials: 'include',
      });
      getQuestion();
    } catch (error) {
      console.error(error);
    }
  }, [question, getQuestion]);

  useEffect(() => {
    getQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showPreviousQuestion = useCallback(() => {
    if (question) {
      const foundIndex = questions.findIndex((questionItem) => questionItem._id === question._id);
      if (foundIndex > 0) setQuestion(questions[foundIndex-1]);
    }
  }, [setQuestion, questions, question]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: getQuestion,
    onSwipedRight: showPreviousQuestion,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <AppWrapper {...swipeHandlers}>
      <QuestionWrapper>
        <QuestionText>{question && question.title}</QuestionText>
      </QuestionWrapper>
      <NewQuestionButton onClick={getQuestion}>New Question</NewQuestionButton>
      <DumbQuestionButton onClick={dislikeQuestion} className="secondary">This Question is Dumb</DumbQuestionButton>
    </AppWrapper>
  );
}

export default App;
