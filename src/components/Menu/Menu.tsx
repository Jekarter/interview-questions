import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styles from "./menu.module.scss";
import { useAppDispatch } from "../../store/hooks/hooks";
import { isRepeat } from "../../store/reducers/questionsSlice";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRepeatWrongQuestions = () => {
    dispatch(isRepeat(true));
    setAnchorEl(null);
  };

  const handleStartAgain = () => {
    setAnchorEl(null);
    dispatch(isRepeat(false));
  };

  return (
    <div className={styles.container}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Меню
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleRepeatWrongQuestions()}>
          Повторить ошибки
        </MenuItem>
        <MenuItem onClick={handleStartAgain}>Начать заново</MenuItem>
      </Menu>
    </div>
  );
}
