import { FC } from "react"

//mui
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

interface InputCheckboxProps {
  label: string
  callbackChange?: Function
}

const InputCheckbox: FC<InputCheckboxProps> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!props.callbackChange) {
      props.callbackChange(event.target.checked)
    }
  }
  return (
    <div style={{ margin: 5 }}>
      <FormControlLabel
        control={
          <Checkbox size="small" onChange={handleChange} color="primary" />
        }
        label={props.label}
      />
    </div>
  )
}
export default InputCheckbox
