import { FC } from "react"

// mui
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

// redux
import { useSelector } from "react-redux"

//type
import { color } from "../../../utils/type"

// styles
import styles from "./buttons.module.scss"

interface IconButtonProps {
  icon: any
  label: string
  callbackPress?: Function
}

const IconButton: FC<IconButtonProps> = (props) => {
  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  const press = (): void => {
    if (!!props.callbackPress) {
      props.callbackPress()
    }
  }

  return (
    <Button
      variant="contained"
      color="success"
      className={styles.iconButton}
      onClick={press}
    >
      <span style={{ color: PALETTE[2].textColor }} className={styles.icon}>
        {props.icon}
      </span>
      <Typography
        className={styles.buttonText}
        variant="button"
        color="primary"
      >
        {props.label}
      </Typography>
    </Button>
  )
}

export default IconButton
