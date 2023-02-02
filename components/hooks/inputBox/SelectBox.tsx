import { FC, useState } from "react"

// mui
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import styles from "./inputBox.module.scss"

interface SelectBoxProps {
  label: string
  items: Array<any>
  callbackChange?: Function
  defaultValue?: string
}

interface State {
  value: string | undefined
}

const SelectBox: FC<SelectBoxProps> = (props) => {
  const [state, setState] = useState<State>({
    value: props.defaultValue,
  })

  const handleChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      value: event.target.value as string,
    })
    if (!!props.callbackChange) props.callbackChange(event.target.value)
  }

  const mapItems = (item: any, key: number): JSX.Element => {
    return (
      <MenuItem key={key} value={item.value}>
        {item.label}
      </MenuItem>
    )
  }

  return (
    <div style={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id={styles.demoSimpleSelectLabel} size="small" color="info">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={styles.demoSimpleSelect}
          value={state.value}
          label={props.label}
          size="small"
          color="info"
          onChange={handleChange}
        >
          {props.items && props.items.length > 0 && props.items.map(mapItems)}
        </Select>
      </FormControl>
    </div>
  )
}
export default SelectBox
