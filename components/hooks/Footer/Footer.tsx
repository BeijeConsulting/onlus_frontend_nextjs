import { FC } from "react";

//mui
import { Typography } from "@mui/material";

// translation
import useTranslation from "next-translate/useTranslation";

// navigation
import Link from "next/link";
import { useRouter } from "next/navigation";
import SCREENS from "@/route/router";

// redux
import { useSelector } from "react-redux";

// components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

// style
import styles from "./footer.module.scss";

//type
import { social, contact, color } from "../../../utils/type";

//responsive
import useResponsive from "@/utils/useResponsive";

// convert to RGB
import { hexToRGB } from "../../../utils/hexToRGB";

const Footer: FC = () => {
  const isLogged: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  );

  // popolo contacts
  const CONTACTS: contact = useSelector(
    (state: any) => state.generalDuck.contacts
  );
  // popolo social
  const SOCIAL: Array<social> = useSelector(
    (state: any) => state.generalDuck.social
  );

  // POPOLO IL COLOR PALETTE
  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  );

  // inizializzo navigazione
  const router: any = useRouter();

  const [DesktopContainer, MobileContainer] = useResponsive();

  // navigazione
  const goTo = (params: string) => (): void => {
    router.push(params);
  };

  // tranlation hook
  const { t }: any = useTranslation("common");
  const homeTrans = t("nav.home");
  const aboutTrans = t("nav.about");
  const eventsTrans = t("nav.events");
  const blogTrans = t("nav.blog");
  const supportTrans = t("nav.supportUs");
  const infoTrans = t("nav.info");
  const contactsTrans = t("footer.contacts")
  const termsTrans = t("footer.terms")
  const privacyTrans = t("footer.privacyPolicy")
  const cookieTrans = t("footer.cookiePolicy")
  const rightTrans = t("footer.rightReserved")

  const mapping = (el: social, key: number): JSX.Element | boolean => {
    if (el.footerOn) {
      return (
        <div className="iconContainer" key={key}>
          <img className="socialIcon" src={el.iconContent} />
          <DesktopContainer>
            <Typography variant="body2">{el.name}</Typography>
          </DesktopContainer>
        </div>
      );
    } else {
      return false;
    }
  };
  return (
    <footer
      className={styles.container}
      style={{ backgroundColor: PALETTE[0].bgColor }}
      id="footer"
    >
      <div className={styles.topFooter}>
        <section
          style={{ borderRightColor: hexToRGB(PALETTE[0].textColor, 0.3) }}
          className={styles.contacts}
        >
          <Typography variant="h5" className={styles.titleContacts}>
            {contactsTrans}
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">{CONTACTS.site}</Typography>
            </li>
            <li>
              <Typography variant="body2">{CONTACTS.email}</Typography>
            </li>
            <li>
              <Typography variant="body2">{CONTACTS.address}</Typography>
            </li>
            <li>
              <Typography variant="body2">
                P.Iva: {CONTACTS.vatNumber}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                C.F: {CONTACTS.fiscalCode}
              </Typography>
            </li>
          </ul>
        </section>

        <section
          style={{ borderRightColor: hexToRGB(PALETTE[0].textColor, 0.3) }}
          className={styles.social}
        >
          <div className={styles.socialContainer}>
            {!!SOCIAL && SOCIAL.map(mapping)}
          </div>
          {!isLogged && (
            <MobileContainer>
              <CustomButton
                colorType="secondary"
                callback={goTo(SCREENS.login)}
                label={"LOGIN"}
                size={"small"}
              />
            </MobileContainer>
          )}
        </section>

        <DesktopContainer>
          <section
            style={{ borderRightColor: hexToRGB(PALETTE[0].textColor, 0.3) }}
            className={styles.nav}
          >
            <Typography variant="body2" onClick={goTo(SCREENS.home)}>
              {homeTrans}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.about)}>
              {aboutTrans}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.events)}>
              {eventsTrans}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.blog)}>
              {blogTrans}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.support)}>
              {supportTrans}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.faq)}>
              {infoTrans}
            </Typography>
          </section>
        </DesktopContainer>

        <section className={styles.privacy}>
          <div className={styles.privacyContainer}>
            <Link href="#">
              <Typography variant="body2">{privacyTrans} </Typography>
            </Link>
            <Link href="#">
              <Typography variant="body2">{cookieTrans} </Typography>
            </Link>
            <Link href="#">
              <Typography variant="body2">{termsTrans} </Typography>
            </Link>
          </div>
          {!isLogged && (
            <DesktopContainer>
              <CustomButton
                colorType="secondary"
                callback={goTo(SCREENS.login)}
                label={"LOGIN"}
                size={"small"}
              />
            </DesktopContainer>
          )}
        </section>
      </div>

      <Typography variant="body2" className={styles.rightReserved}>
        {rightTrans}
      </Typography>
    </footer>
  );
};

export default Footer;
