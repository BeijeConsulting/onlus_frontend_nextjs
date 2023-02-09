import { FC, useRef, useState } from "react"

//navigation
import { useRouter } from "next/navigation"
import SCREENS from "@/route/router"

// redux
import { useSelector } from "react-redux"

//mui
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { Typography } from "@mui/material"

// icons
import { TbHeartHandshake } from "react-icons/tb"
import { BiDonateHeart } from "react-icons/bi"

// styles
import styles from "./buttons.module.scss"

//i18n
import useTranslation from "next-translate/useTranslation"

//type
import { color } from "../../../utils/type"

interface State {
  open: boolean
  selectedIndex: number
}

const initialState = {
  open: false,
  selectedIndex: 1,
}

const ExpandButton: FC = () => {
  
  const { t }: any = useTranslation('common');
  const LANG: any = {
    supportNavButton: t("buttons.supportNavButton"),
    donateButton: t("buttons.donateButton"),
    volunteerButton: t("buttons.volunteerButton"),
  };

  const [state, setState] = useState<State>(initialState)
  const anchorRef = useRef<HTMLDivElement>(null)

  const router: any = useRouter()

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  const goToDonate = (): void => {
    router.push(SCREENS.donate)
  }

  const goToSignup = (): void => {
    router.push(SCREENS.signup)
  }

  const handleToggle = () => {
    setState({
      ...state,
      open: !state.open,
    })
  }

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setState({
      ...state,
      open: false,
    })
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        className={styles.expandedButton}
      >
        <Button
          onClick={handleToggle}
          color="success"
          className={`
            ${styles.expandedButtonItem} 
            ${state.open && styles.expandOpen}
          `}
        >
          <Typography variant="button" color="primary">
            {LANG.supportNavButton}
          </Typography>
          <ArrowDropDownIcon color="primary" />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={state.open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                  autoFocusItem
                  className={styles.expandedButtonItemContainer}
                  sx={{ background: PALETTE[2].bgColor }}
                >
                  <MenuItem
                    className={styles.expandedButtonItem}
                    onClick={goToDonate}
                    sx={{ color: PALETTE[2].textColor }}
                  >
                    {LANG.donateButton}
                    <TbHeartHandshake />
                  </MenuItem>

                  <MenuItem
                    className={styles.expandedButtonItem}
                    onClick={goToSignup}
                    sx={{ color: PALETTE[2].textColor }}
                  >
                    {LANG.volunteerButton}
                    <BiDonateHeart />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default ExpandButton
