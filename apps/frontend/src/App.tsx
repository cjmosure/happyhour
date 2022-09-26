import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import '@picocss/pico/css/pico.min.css';
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

const NewQuestionButton = styled.button`

`;

const DumbQuestionButton = styled.button`
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
