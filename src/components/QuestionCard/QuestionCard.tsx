import Card from "@mui/material/Card";
import { useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { QuestionObject } from "../../types/types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 260,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: 300,
  overflow: "scroll",
};

export default function QuestionCard({ card }: { card: QuestionObject }) {
  /*   const repeatQuestions = useAppSelector(state => state.questions) */

  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: 2,
        position: "relative",
        marginTop: 10,
        paddingTop: 2,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {card.question}
        </Typography>
      </CardContent>
      <Modal
        open={showAnswer}
        onClose={() => handleToggleShowAnswer()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {card.question}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {card.answer}
          </Typography>
        </Box>
      </Modal>

      <CardActions>
        <Button size="small" onClick={() => handleToggleShowAnswer()}>
          Посмотреть ответ
        </Button>
      </CardActions>
    </Card>
  );
}
