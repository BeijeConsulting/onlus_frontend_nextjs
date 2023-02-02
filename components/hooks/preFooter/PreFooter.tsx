import { FC } from "react"

// style
import styles from "./prefooter.module.scss"

// i18n
import useTranslation from "next-translate/useTranslation"

//mui
import { Typography } from "@mui/material"

//redux
import { useSelector } from "react-redux"

const PreFooter: FC = () => {
  const LOGO = useSelector((state: any) => state.generalDuck.logoContent)
  const BANNER = useSelector((state: any) => state.generalDuck.sectionWork)

  // tranlation hook
  const { t }: any = useTranslation()

  return (
    <mark id={styles.prefooterstyles}>
      <div className={styles.logostyles}>
        <img src={LOGO} alt="" />
      </div>
      <div className={styles.infoContact}>
        <Typography variant="body1">{t("preFooter.caption")}</Typography>
        {!!BANNER && (
          <Typography variant="subtitle1">{BANNER.email}</Typography>
        )}
      </div>
    </mark>
  )
}

export default PreFooter
