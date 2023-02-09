import { FC, useEffect, useRef, useState } from "react";

// mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { MutableRefObject } from "react";

// translation
import useTranslation from "next-translate/useTranslation";

// components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

//Style
import styles from "./cardEvents.module.scss";
import { useSelector } from "react-redux";

import noImage from "../../../assets/images/no-image.jpg";

// props
interface CardProps {
  title: string;
  image: string;
  description: string;
  requirement: string;
  date: string;
  place: string;
  callbackBook: Function;
  callbackCancel: Function;
  attendants: Array<string>;
}

interface State {
  height: number;
}
const initialState = {
  height: 0,
};
const CardEvents: FC<CardProps> = (props) => {
  const USER: any = useSelector((state: any) => state.userDuck.userData);

  const [state, setState] = useState<State>(initialState);

  // tranlation hook
  const { t }: any = useTranslation("common");
  const LANG: any = {
    description: t("events.description"),
    requirement: t("events.requirements"),
    cancelBooking: t("buttons.cancelBooking"),
    bookButton: t("buttons.bookButton"),
  };

  const headerRef: MutableRefObject<any> = useRef(0);

  const goToBooking = (): void => {
    if (!!props.callbackBook) props.callbackBook();
  };

  const cancelBooking = (): void => {
    if (!!props.callbackCancel) props.callbackCancel();
  };

  useEffect(() => {
    setState({
      ...state,
      height: headerRef.current.clientHeight,
    });
  }, []);

  return (
    <Card className={styles.eventsCard}>
      <div className={styles.cardHeader} ref={headerRef}>
        <Typography variant="h3" className={styles.cardTitle}>
          {props.title}
        </Typography>
        <CardMedia
          className="cardMedia"
          component="img"
          // image={props.image ? props.image : noImage}
          alt="Live from space album cover"
        />
      </div>

      <CardContent className={styles.cardContent}>
        <div
          className={
            styles.cardContentSection + " " + styles.cardContentSectionScroll
          }
          style={{ height: `${state.height}px` }}
        >
          <section>
            <Typography variant="h4">{LANG.description}</Typography>
            <Typography variant="body1">{props.description}</Typography>
          </section>
          <section>
            <Typography variant="h4">{LANG.requirement}</Typography>
            <Typography variant="body1">{props.requirement}</Typography>
          </section>
        </div>

        <div
          className={
            styles.cardContentSection + " " + styles.cardContentSectionRight
          }
        >
          <div className={styles.cardInfo}>
            <Typography variant="caption">{props.date}</Typography>
            <hr />
            <Typography variant="caption">{props.place}</Typography>
          </div>
          {props.attendants.some((e) => e === USER.email) ? (
            <CustomButton
              colorType={"secondary"}
              callback={cancelBooking}
              label={LANG.cancelBooking}
              size={"small"}
            />
          ) : (
            <CustomButton
              colorType={"success"}
              callback={goToBooking}
              label={LANG.bookButton}
              size={"small"}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardEvents;
