import React, { FC, ReactElement } from "react"

// redux
import { useSelector } from "react-redux"

//mui
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

//type
import { color } from "../../../utils/type"

import { hexToRGB } from "../../../utils/hexToRGB"

interface TabPanelProps {
  children?: React.ReactNode
  index?: number
  value?: number
}

interface LocalProps {
  children: React.ReactNode[]
  pages: string[]
}

const TabPanel: FC<TabPanelProps> = (props): ReactElement => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ width: "100%" }}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs(props: LocalProps) {
  const [value, setValue] = React.useState(0)

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            sx={{ color: hexToRGB(PALETTE[2].textColor, 0.7) }}
            label={props.pages[0]}
            {...a11yProps(0)}
          />
          <Tab
            sx={{ color: hexToRGB(PALETTE[2].textColor, 0.7) }}
            label={props.pages[1]}
            {...a11yProps(1)}
          />
          <Tab
            sx={{ color: hexToRGB(PALETTE[2].textColor, 0.7) }}
            label={props.pages[2]}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {props.children[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.children[1]}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {props.children[2]}
      </TabPanel>
    </Box>
  )
}
