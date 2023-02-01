import { FC, useState, useEffect, useRef } from "react"

//navigation
import { useRouter } from "next/navigation"
import SCREENS from "@/route/router"
import Link from "next/link"
import NavLink from "../NavLink/NavLink"

// mui
import ButtonGroup from "@mui/material/ButtonGroup"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { Typography } from "@mui/material"

//Components
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer"
import ExpandButton from "../../ui/buttons/ExpandButton"
import GenericModal from "../GenericModal/GenericModal"
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"

// Icons
import { BiUser } from "react-icons/bi"

//Style
import styles from "./header.module.scss"

//i18n
import useTranslation from "next-translate/useTranslation"

//responsive
import useResponsive from "../../../utils/useResponsive"

//redux
import { setLoggedState, saveUserData } from "../../../redux/duck/user"
import { useSelector, useDispatch } from "react-redux"

// type
import { color } from "../../../utils/type"

interface HeaderProps {
  isHome?: boolean
}

interface State {
  scroll: boolean
  lng: string
  open: boolean
  isOpenModal: boolean
}

const initialState = {
  scroll: false,
  lng: "it",
  open: false,
  isOpenModal: false,
}

const Header: FC<HeaderProps> = (props) => {
  const [state, setState] = useState<State>(initialState)
  const dispatch: Function = useDispatch()

  const LOGO: any = useSelector((state: any) => state.generalDuck.logoContent)
  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )
  const isLoggedIn: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  )
  const anchorRef = useRef<HTMLDivElement>(null)

  const router: any = useRouter()

  const { t, i18n }: any = useTranslation()

  // mediaquery
  const [DesktopContainer, MobileContainer] = useResponsive()

  // navigazione
  const goTo = (params: string) => (): void => {
    if (params === SCREENS.personalArea) {
      if (isLoggedIn) router.push(params)
      else router.push(SCREENS.login)
    } else {
      router.push(params)
    }
  }

  // Changelanguage
  // const changeLanguageClick = (lang: string) => (): void => {
  //   i18n.changeLanguage(lang)
  // }

  // Scroll
  const handleScroll = (): void => {
    let windowScroll: number = window.scrollY
    let scrolly: boolean = false

    if (windowScroll > 150) {
      scrolly = true
    } else scrolly = false

    setState({
      ...state,
      scroll: scrolly,
    })
  }

  const scrollWithOffset = (el: any): void => {
    const yCoordinate: number =
      el.getBoundingClientRect().top + window.pageYOffset
    const yOffset: number = -147.2
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [state.scroll])

  const handleToggle = (): void => {
    setState({
      ...state,
      open: !state.open,
    })
  }

  const handleClose = (event: Event): void => {
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

  const logout = (): void => {
    dispatch(setLoggedState(false))
    dispatch(saveUserData({}))

    sessionStorage.removeItem("userOnlus")
    localStorage.removeItem("onlusRefreshToken")
    localStorage.removeItem("onlusToken")

    router.push(SCREENS.home)
  }

  const openModal = (): void => {
    setState({
      ...state,
      isOpenModal: !state.isOpenModal,
    })
  }

  return (
    <header
      className={
        (state.scroll ? styles.active : "") +
        (props.isHome && "home") +
        styles.header
      }
      style={
        props.isHome
          ? { background: state.scroll ? PALETTE[0].bgColor : "transparent" }
          : { background: PALETTE[0].bgColor }
      }
    >
      <div className={styles.topHeader}>
        <div className={styles.logo}>
          <img src={LOGO} alt="" onClick={goTo(SCREENS.home)} />
        </div>
        <DesktopContainer>
          <nav className={styles.navDesktop}>
            <NavLink exact href={SCREENS.home}>
              <Typography variant="body2">
                {t("home")}
                <span
                  className={styles.underline}
                  style={{ background: PALETTE[0].textColor }}
                ></span>
              </Typography>
            </NavLink>

            <NavLink exact href={SCREENS.about}>
              <Typography variant="body2">
                {t("about")}
                <span
                  className={styles.underline}
                  style={{ background: PALETTE[0].textColor }}
                ></span>
              </Typography>
            </NavLink>

            <NavLink exact href={SCREENS.events}>
              <Typography variant="body2">
                {t("events")}
                <span
                  className={styles.underline}
                  style={{ background: PALETTE[0].textColor }}
                ></span>
              </Typography>
            </NavLink>

            <NavLink exact href={SCREENS.blog}>
              <Typography variant="body2">
                {t("blog")}
                <span
                  className={styles.underline}
                  style={{ background: PALETTE[0].textColor }}
                ></span>
              </Typography>
            </NavLink>

            <NavLink exact href={SCREENS.support}>
              <Typography variant="body2">
                {t("supportUs")}
                <span
                  className={styles.underline}
                  style={{ background: PALETTE[0].textColor }}
                ></span>
              </Typography>
            </NavLink>

            <NavLink exact href={SCREENS.faq}>
              <Typography variant="body2">
                {t("info")}
                <span
                  className={styles.underline}
                  style={{ background: PALETTE[0].textColor }}
                ></span>
              </Typography>
            </NavLink>
          </nav>
          <ExpandButton />
        </DesktopContainer>

        <div className={styles.headerRight}>
          <div className={styles.lngButtons}>
            <Link
              href="/"
              locale="en"
              // className={
              //   (i18n.language === "en" ? "active-lng" : "") + " langButton"
              // }
            >
              EN
            </Link>
            <Typography className={styles.lngSeparator} variant="body2">
              •
            </Typography>
            <Link
              href="/"
              locale="it"
              // className={
              //   (i18n.language === "it" ? "active-lng" : "") + " langButton"
              // }
            >
              IT
            </Link>
          </div>

          <div>
            <ButtonGroup onClick={handleToggle} ref={anchorRef}>
              <BiUser
                color={PALETTE[0].textColor}
                className={styles.profileIcon}
              />
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
                      {isLoggedIn ? (
                        <MenuList id="split-button-menu">
                          <MenuItem onClick={goTo(SCREENS.personalArea)}>
                            {t("metaTitles.personalArea")}
                          </MenuItem>

                          <MenuItem onClick={openModal}>{t("logout")}</MenuItem>
                        </MenuList>
                      ) : (
                        <MenuList id="split-button-menu">
                          <MenuItem onClick={goTo(SCREENS.login)}>
                            {t("buttons.loginButton")}
                          </MenuItem>
                        </MenuList>
                      )}
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <MobileContainer>
            <div className={styles.burgerMenu}>
              <TemporaryDrawer />
            </div>
          </MobileContainer>
        </div>
      </div>

      <div className={styles.bottomHeader}>
        <a href="#events" className={styles.bottomHeaderButton}>
          <Typography variant="body2">
            {t("events")}
            <span
              className={styles.underline}
              style={{ background: PALETTE[0].textColor }}
            ></span>
          </Typography>
        </a>
        <a href="#blog" className={styles.bottomHeaderButton}>
          <Typography variant="body2">
            {t("blog")}
            <span
              className={styles.underline}
              style={{ background: PALETTE[0].textColor }}
            ></span>
          </Typography>
        </a>
        <a href="#history" className={styles.bottomHeaderButton}>
          <Typography variant="body2">
            {t("history")}
            <span
              className={styles.underline}
              style={{ background: PALETTE[0].textColor }}
            ></span>
          </Typography>
        </a>
      </div>

      <GenericModal open={state.isOpenModal} callback={openModal}>
        <div className={styles.childrenModal}>
          <Typography variant="caption">{t("logoutSentence")}</Typography>
          <CustomButton
            label={t("confirm")}
            isDisable={false}
            size={"big"}
            colorType="secondary"
            callback={logout}
          />
        </div>
      </GenericModal>
    </header>
  )
}

export default Header
