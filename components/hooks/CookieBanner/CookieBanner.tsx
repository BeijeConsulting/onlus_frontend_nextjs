import { FC } from "react";
// import cookie library
import CookieConsent from "react-cookie-consent";
// import redux
import { useSelector } from "react-redux";
// translation
import useTranslation from "next-translate/useTranslation";
// type
import { color } from "../../../utils/type";

const CookieBanner: FC = () => {
  const { t }: any = useTranslation("common");
  const LANG: any = {
    accept: t("cookieBanner.accept"),
    decline: t("cookieBanner.decline"),
    cookieSentence: t("cookieBanner.cookieSentence"),
  };

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  );

  return (
    <CookieConsent
      flipButtons
      overlay={true}
      location="bottom"
      buttonText={LANG.accept}
      enableDeclineButton
      declineButtonText={LANG.decline}
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
      {LANG.cookieSentence}
    </CookieConsent>
  );
};

export default CookieBanner;
