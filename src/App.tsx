import QuestionCard from "./components/QuestionCard/QuestionCard";
import { useState, useEffect } from "react";
import { questions } from "./data/data";
import Button from "@mui/material/Button";
import { QuestionObject, QuestionsType } from "./types/types";
import styles from "./app.module.scss";
import {
  addRepeatQuestions,
  deleteRepeatQuestions,
} from "./store/reducers/questionsSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import Box from "@mui/material/Box";
import BasicMenu from "./components/Menu/Menu";

function App() {
  const [randomQuestions, setRandomQuestions] = useState<QuestionsType>([
    ...questions,
  ]);
  const [numQuestion, setNumQuestion] = useState<number>(0);
  const [showModalLastElement, setShowModalLastElement] = useState(false);
  const dispatch = useAppDispatch();
  const repeatQuestions = useAppSelector((state) => state.questions);

  const showRandomQuestions = () => {
    let shuffle;
    console.log(repeatQuestions);
    if (repeatQuestions.isRepeat) {
      console.log("с ошибками");
      shuffle = [...repeatQuestions.repeatQuestions];
    } else {
      console.log("обычные");
      shuffle = [...questions];
    }
    shuffle.sort(() => Math.random() - 0.5);
    setRandomQuestions(shuffle);
    setShowModalLastElement(false);
    setNumQuestion(0);
  };

  useEffect(() => {
    showRandomQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextQuestion = () => {
    if (numQuestion + 1 == randomQuestions.length) {
      setShowModalLastElement(true);
    }
    const newNum: number = numQuestion + 1;
    setNumQuestion(newNum);
  };

  const addQuestionToRepeat = (card: QuestionObject) => {
    dispatch(addRepeatQuestions(card));
    nextQuestion();
  };

  const deleteQuestionToRepeat = (card: QuestionObject) => {
    dispatch(deleteRepeatQuestions(card));
    nextQuestion();
  };

  return (
    <div>
      <BasicMenu />
      {showModalLastElement ? (
        <div>
          <span className={styles.wrongAnswers}>
            ошибок:{repeatQuestions.repeatQuestions.length}/
            {randomQuestions.length}
          </span>
          <div className={styles.lastQuestion}>Вопросы закончились</div>
          <Button size="medium" onClick={() => showRandomQuestions()}>
            Начать заново
          </Button>
        </div>
      ) : (
        <div className={styles.cardBlock}>
          <span className={styles.numOfQuestions}>
            {numQuestion + 1}/{randomQuestions.length}
          </span>
          <span className={styles.wrongAnswers}>
            ошибок:{repeatQuestions.repeatQuestions.length}/
            {randomQuestions.length}
          </span>
          <QuestionCard card={randomQuestions[numQuestion]} />
          <Box sx={{ textAlign: "center" }}>
            <Button
              size="small"
              sx={{ backgroundColor: "red", padding: 1.5, margin: 1.2 }}
              onClick={() => addQuestionToRepeat(randomQuestions[numQuestion])}
            />
            <Button
              size="small"
              sx={{ backgroundColor: "green", padding: 1.5, margin: 1.2 }}
              onClick={() =>
                deleteQuestionToRepeat(randomQuestions[numQuestion])
              }
            />
          </Box>
          <Button size="medium" onClick={() => nextQuestion()}>
            Следующий вопрос
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
