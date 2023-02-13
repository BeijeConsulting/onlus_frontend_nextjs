import { FC } from "react"

//Navigation
import { useRouter } from "next/navigation";
import SCREENS from "@/route/router";
import Link from "next/link";

//Components
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton"

//Styles
import styles from "../styles/notFound.module.scss"

//mui
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert"
import { Typography } from "@mui/material"

//i18n
import useTranslation from "next-translate/useTranslation"

interface NotFoundProps {
  codeError?: number
  description?: string
}

const NotFound: FC<NotFoundProps> = (props) => {
  const { t }: any = useTranslation("common");
  const LANG: any = {
    notFound: t("error.notFound"),
    backToHome: t("buttons.backToHome"),
  };

  const router: any = useRouter();

  const goToHome = (): void => {
    router.push(SCREENS.home);
  }

  return (
    <>
      <main id="notFound" className={`sectionContainer ${styles.notFound}`}>
        <section className={styles.notFoundContainer}>
          <SdCardAlertIcon className={styles.errorIcon} />
          <Typography variant="h1">
            {LANG.notFound}{" "}
            <span className={styles.foundTitleColor}>{props.codeError}</span>
          </Typography>
          <Typography sx={{ paddingBottom: 5 }} variant="body1">
            {props.description}
          </Typography>
          <CustomButton
            size="small"
            label={LANG.backToHome}
            callback={goToHome}
            colorType="secondary"
          />
        </section>
      </main>
    </>
  )
}
NotFound.defaultProps = {
  codeError: 404,
  description: "We are sorry, the page you requested was not found!",
}

export default NotFound
