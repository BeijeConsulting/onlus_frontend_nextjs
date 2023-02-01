import { FC, useEffect, useRef, useState } from "react";

// mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { MutableRefObject } from "react";

// translation
import { useTranslation } from "react-i18next";

// components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

//Style
import "./cardEvents.scss";
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
  const { t }: any = useTranslation();

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
    <Card className="eventsCard">
      <div className="cardHeader" ref={headerRef}>
        <Typography variant="h3" className="cardTitle">
          {props.title}
        </Typography>
        <CardMedia
          className="cardMedia"
          component="img"
          image={props.image ? props.image : noImage}
          alt="Live from space album cover"
        />
      </div>

      <CardContent className="cardContent">
        <div
          className="cardContentSection cardContentSectionScroll"
          style={{ height: `${state.height}px` }}
        >
          <section>
            <Typography variant="h4">{t("events.description")}</Typography>
            <Typography variant="body1">{props.description}</Typography>
          </section>
          <section>
            <Typography variant="h4">{t("events.requirements")}</Typography>
            <Typography variant="body1">{props.requirement}</Typography>
          </section>
        </div>

        <div className="cardContentSection cardContentSectionRight">
          <div className="cardInfo">
            <Typography variant="caption">{props.date}</Typography>
            <hr />
            <Typography variant="caption">{props.place}</Typography>
          </div>
          {props.attendants.some((e) => e === USER.email) ? (
            <CustomButton
              colorType={"secondary"}
              callback={cancelBooking}
              label={t("buttons.cancelBooking")}
              size={"small"}
            />
          ) : (
            <CustomButton
              colorType={"success"}
              callback={goToBooking}
              label={t("buttons.bookButton")}
              size={"small"}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardEvents;
