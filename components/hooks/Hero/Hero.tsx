import { FC } from "react"

//navigation
import { useRouter } from "next/navigation"
import SCREENS from "../../../route/router"

// redux
import { useSelector } from "react-redux"

//components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"

//mui
import { Typography } from "@mui/material"

//style
import styles from "./hero.module.scss"

// type
import { color } from "../../../utils/type"

interface HeroProps {
  type: "home" | "article" | "about" | "support"
  category?: Array<JSX.Element>
  title?: string | undefined
  subtitle?: string | undefined
  image?: string | undefined
}

const Hero: FC<HeroProps> = (props) => {
  const router: any = useRouter()

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  function handleNavigate() {
    props.type === "home"
      ? router.push(SCREENS.donate)
      : router.push(SCREENS.signup)
  }

  switch (props.type) {
    case "home" || "support":
      return (
        <section
          className={styles.heroContainer + " " + styles.heroContainerHome}
          style={{
            backgroundImage: `url("${props.image}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            className={styles.heroOverlay}
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div className={styles.heroContent}>
              <Typography variant="h1" sx={{ color: PALETTE[0].textColor }}>
                {props.title}
              </Typography>
              <div
                className={styles.heroLinebr}
                style={{ background: PALETTE[0].textColor }}
              />
              <Typography variant="h5" className={styles.heroSubtitle}>
                {props.subtitle}
              </Typography>
              {props.type === "home" ? (
                <CustomButton
                  size="small"
                  label="DONA ORA"
                  colorType="success"
                  callback={handleNavigate}
                />
              ) : (
                <CustomButton
                  size="small"
                  label="DIVENTA VOLONTARIO"
                  colorType="secondary"
                  callback={handleNavigate}
                />
              )}
            </div>
          </div>
        </section>
      )

    case "article":
      return (
        <>
          <section
            className={styles.heroContainer + " " + styles.heroContainerArticle}
            style={{
              backgroundImage: `url("${props.image}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className={styles.heroOverlay}
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div className={styles.heroContent}>
                <div className={styles.heroCategories}>{props.category}</div>
                <Typography variant="h1" sx={{ color: PALETTE[0].textColor }}>
                  {props.title}
                </Typography>
              </div>
            </div>
          </section>
        </>
      )

    case "about":
      return (
        <>
          <section
            className={styles.heroContainer + " " + styles.heroContainerAbout}
            style={{
              backgroundImage: `url("${props.image}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className={styles.heroOverlay}
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div className={styles.heroContent}>
                <Typography variant="h1" sx={{ color: PALETTE[0].textColor }}>
                  {props.title}
                </Typography>
              </div>
            </div>
          </section>
        </>
      )
    default:
      return <div>Errore</div>
  }
}

export default Hero
