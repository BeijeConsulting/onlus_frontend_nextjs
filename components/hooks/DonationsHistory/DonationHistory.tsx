import { ReactElement, useState, useEffect } from "react"

// redux
import { useSelector } from "react-redux"

//style
import styles from "./donationHistory.module.scss"

//i18n
import useTranslation from "next-translate/useTranslation"

//type
import { donation, color } from "../../../utils/type"

// convertdate
import { convertDate } from "../../../utils/convertDate"

//mui
import { Typography } from "@mui/material"

// convert to RGB
import { hexToRGB } from "../../../utils/hexToRGB"

interface Props {
  datas: Array<donation>
}

function DonationHistory(props: Props): ReactElement {
  const { t }: any = useTranslation()
  const [state, setState] = useState<number>(0)

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  useEffect(() => {
    sumDonations()
  }, [])

  function sumDonations(): void {
    let sum: number = 0
    props.datas?.forEach((elem: donation) => {
      sum = sum + elem.amount
    })
    setState(sum)
  }

  function mapping(element: donation, key: number): ReactElement {
    return (
      <div
        key={key}
        className={styles.singleDonation}
        style={{ borderBottomColor: hexToRGB(PALETTE[2].textColor, 0.3) }}
      >
        <span>{`${convertDate(element.donationDate, t("dateFormat"))}`}</span>
        <span>{`${element.amount}€`}</span>
      </div>
    )
  }

  return (
    <article className={styles.donationsSection}>
      <section className={styles.windowBox}>
        <div className={styles.donationTotal}>
          <Typography variant="body1">
            {t("personalArea.totalDonated")}

            <span className={styles.bigNumber}>{`${state}€`}</span>
          </Typography>
        </div>
        <div className={styles.titleHistory}>
          <Typography variant="h3">
            {t("personalArea.donationsHistory")}
          </Typography>
        </div>
        <section className={styles.donations}>
          <Typography variant="body1">{props.datas?.map(mapping)}</Typography>
        </section>
      </section>
    </article>
  )
}

export default DonationHistory
