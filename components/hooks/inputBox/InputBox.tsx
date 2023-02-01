import React, { FC, useState } from "react"

// mui components
import OutlinedInput from "@mui/material/OutlinedInput"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"

//style
import "./inputBox.scss"

interface InputBoxProps {
  label: string
  type: string
  defaultValue?: string
  isRequired?: boolean
  callbackChange?: Function
  notValid?: boolean
  upperCase?: boolean
  errorLabel?: string
  disabled?: boolean
}

interface State {
  showPassword: boolean
}

const initialState = {
  showPassword: false,
}

const InputBox: FC<InputBoxProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  const change = (e: React.ChangeEvent): void => {
    if (!!props.callbackChange) {
      props.callbackChange(e)
    }
  }

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const toInputUppercase = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = ("" + e.target.value).toUpperCase()
  }

  return (
    <>
      {props.type === "password" ? (
        <div style={{ width: "100%" }}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              size="small"
              error={props.notValid}
              color="info"
              required={props.isRequired}
            >
              {props.label}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={state.showPassword ? "text" : "password"}
              size={"small"}
              onChange={change}
              defaultValue={props.defaultValue}
              required={props.isRequired}
              error={props.notValid}
              color="info"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={props.label}
            />
            <FormHelperText error={props.notValid}>
              {props.notValid ? props.errorLabel : undefined}
            </FormHelperText>
          </FormControl>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <TextField
            disabled={props.disabled}
            sx={{ width: "100%" }}
            label={props.label}
            type={props.type}
            size="small"
            id="custom-css-outlined-input"
            onChange={change}
            defaultValue={props.defaultValue}
            required={props.isRequired}
            error={props.notValid}
            color="info"
            onInput={props.upperCase ? toInputUppercase : undefined}
            helperText={props.notValid ? props.errorLabel : undefined}
          />
        </div>
      )}
    </>
  )
}

export default InputBox
