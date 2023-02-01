import { FC } from "react"
// import cookie library
import CookieConsent from "react-cookie-consent"
// import redux
import { useSelector } from "react-redux"
// translation
import { useTranslation } from "react-i18next"
// type
import { color } from "../../../utils/type"

const CookieBanner: FC = () => {
  const { t }: any = useTranslation()
  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  return (
    <CookieConsent
      flipButtons
      overlay={true}
      location="bottom"
      buttonText={t("cookieBanner.accept")}
      enableDeclineButton
      declineButtonText={t("cookieBanner.decline")}
      style={{
        background: PALETTE[0].bgColor,
        color: PALETTE[0].textColor,
        padding: 20,
        fontSize: "16px",
        fontFamily: "sans-serif",
      }}
      buttonStyle={{
        color: PALETTE[2].textColor,
        background: PALETTE[2].bgColor,
        padding: 10,
        borderRadius: 3,
      }}
      declineButtonStyle={{
        background: PALETTE[1].bgColor,
        color: PALETTE[1].textColor,
        padding: 10,
        borderRadius: 3,
      }}
      expires={150}
    >
      {t("cookieBanner.cookieSentence")}
    </CookieConsent>
  )
}

export default CookieBanner
