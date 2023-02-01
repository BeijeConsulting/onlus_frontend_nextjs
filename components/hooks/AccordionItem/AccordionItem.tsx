import { FC, useState } from "react"

//mui
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

// redux
import { useSelector } from "react-redux"

//type
import { color } from "../../../utils/type"

// convert to rgb
import { hexToRGB } from "../../../utils/hexToRGB"

//style
import styles from "./AccordionItem.module.scss"

interface AccordionItemProps {
  title: string
  content: string
}

interface State {
  isExpanded: boolean
}

const initialState = {
  isExpanded: false,
}

const AccordionItem: FC<AccordionItemProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  const handleChange = (): void => {
    setState({
      ...state,
      isExpanded: !state.isExpanded,
    })
  }

  return (
    <Accordion onChange={handleChange} className={styles.accordion}>
      <AccordionSummary
        expandIcon={
          !state.isExpanded ? (
            <div
              className={styles.accordionIcon}
              style={{ background: PALETTE[0].bgColor }}
            >
              <AddIcon color="warning" />
            </div>
          ) : (
            <div
              className={styles.accordionIcon}
              style={{ background: hexToRGB(PALETTE[0].bgColor, 0.3) }}
            >
              <RemoveIcon color="primary" />
            </div>
          )
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h4">{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">{props.content}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionItem
