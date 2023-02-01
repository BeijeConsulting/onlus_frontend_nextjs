import { FC, ReactElement } from "react"

//mui
import { Button, Typography } from "@mui/material"

//style
import styles from "./customButton.module.scss"

interface Props {
  colorType: "inherit" | "primary" | "secondary" | "success" | undefined
  textColor?: string
  label: string
  size: "big" | "small"
  callback: Function
  isDisable?: boolean
}

const CustomButton: FC<Props> = (props): ReactElement => {
  function handleClick(): void {
    if (!!props.callback) props.callback()
  }

  return (
    <Button
      sx={props.size === "big" ? { width: "100%" } : { width: "fit-content" }}
      variant="contained"
      disabled={props.isDisable}
      disableElevation
      color={props.colorType}
      onClick={handleClick}
      className={styles.btn}
    >
      <Typography variant="button">{props.label}</Typography>
    </Button>
  )
}

export default CustomButton
