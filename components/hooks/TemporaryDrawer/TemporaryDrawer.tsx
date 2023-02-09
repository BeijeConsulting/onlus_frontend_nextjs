import { FC, useState } from "react"

//navigation
import { useRouter } from "next/navigation"
import SCREENS from "@/route/router"

//i18n
import useTranslation from "next-translate/useTranslation"

//mui
import { Box } from "@mui/material"
import { Drawer } from "@mui/material"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"

// Icons
import { GiHamburgerMenu } from "react-icons/gi"
import { MdClose } from "react-icons/md"
import { TbHeartHandshake } from "react-icons/tb"
import { BiDonateHeart } from "react-icons/bi"

// components
import IconButton from "../../ui/buttons/IconButton"

// style
import styles from "./temporaryDrawer.module.scss"

// redux
import { useSelector } from "react-redux"

//type
import { social } from "../../../utils/type"

// convert hex to rgb
import { hexToRGB } from "../../../utils/hexToRGB"

interface State {
  right: any
}
const InitialState = {
  right: false,
}

const TemporaryDrawer: FC = () => {
  // stati
  const [state, setState] = useState<State>(InitialState)
  // redux
  const PALETTE: any = useSelector((state: any) => state.generalDuck.palette)
  const SOCIAL: any = useSelector((state: any) => state.generalDuck.social)

  const router: any = useRouter()

  //i18n
  const { t }: any = useTranslation('common');
  const LANG: any = {
    homeTrans: t("nav.home"),
    aboutTrans: t("nav.about"),
    eventsTrans: t("nav.events"),
    blogTrans: t("nav.blog"),
    supportTrans: t("nav.supportUs"),
    infoTrans: t("nav.info"),
  };

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, right: open })
  }

  const goToDonate = (): void => {
    router.push(SCREENS.donate)
  }

  const goToSignup = (): void => {
    router.push(SCREENS.signup)
  }

  //Navigation from sidebar
  const navigationFromSidebar = (text: string) => (): any => {
    switch (text) {
      case LANG.homeTrans:
        router.push(SCREENS.home)
        break
      case LANG.aboutTrans:
        router.push(SCREENS.about)
        break
      case LANG.eventsTrans:
        router.push(SCREENS.events)
        break
      case LANG.blogTrans:
        router.push(SCREENS.blog)
        break
      case LANG.supportTrans:
        router.push(SCREENS.support)
        break
      case LANG.infoTrans:
        router.push(SCREENS.faq)
        break

      default:
        break
    }
  }

  const list = () => (
    <Box
      className={styles.boxContainer}
      style={{ backgroundColor: PALETTE[0].bgColor }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Button className={styles.closeButton} onClick={toggleDrawer(false)}>
        <MdClose className={styles.burgerIcons} color={PALETTE[0].textColor} />
      </Button>

      <List className={styles.navContainer}>
        {[
          LANG.homeTrans,
          LANG.aboutTrans,
          LANG.eventsTrans,
          LANG.blogTrans,
          LANG.supportTrans,
          LANG.infoTrans,
        ].map((text, index) => (
          <ListItem
            key={text}
            className={styles.navItemContainer}
            disablePadding
          >
            <ListItemButton>
              <div
                style={{
                  borderBottom: `0.5px solid ${PALETTE[0].textColor} `,
                }}
                className={styles.navItem}
                onClick={navigationFromSidebar(text)}
              >
                <Typography variant="body2">{text}</Typography>
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <div>
        <div className={styles.buttonsContainer}>
          <IconButton
            icon={<TbHeartHandshake />}
            label={t("buttons.volunteerButton")}
            callbackPress={goToSignup}
          />
          <IconButton
            icon={<BiDonateHeart />}
            label={t("buttons.donateButton")}
            callbackPress={goToDonate}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          {!!SOCIAL &&
            SOCIAL.map((elem: social, key: any) => {
              return (
                <ListItemIcon
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={elem.iconContent}
                    className={styles.socialIcons}
                    alt="social-icon"
                  />
                </ListItemIcon>
              )
            })}
        </div>
      </div>
    </Box>
  )

  return (
    <>
      <Button className={styles.burgerIcons}>
        <GiHamburgerMenu
          color={PALETTE[0].textColor}
          className={styles.burgerIcons}
          onClick={toggleDrawer(true)}
        />
      </Button>
      <Drawer open={state.right} anchor={"right"} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  )
}

export default TemporaryDrawer
