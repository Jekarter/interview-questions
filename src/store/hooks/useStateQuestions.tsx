import { useAppSelector } from "./hooks";

const useIsStateQuestions = (): boolean => {
  const isRepeat = useAppSelector((state) => state.questions.isRepeat);
  const rep = isRepeat;
  return rep;
};

export default useIsStateQuestions;
