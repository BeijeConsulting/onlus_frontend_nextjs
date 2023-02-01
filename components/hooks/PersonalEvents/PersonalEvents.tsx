import { FC, ReactElement, useEffect, useState } from "react";

//components
import CardEventsMobile from "../CardEvents/CardEventsMobile";

//i18n
import { useTranslation } from "react-i18next";

//style
import "./personalEvents.scss";

//type
import { events } from "../../../utils/type";

//mui
import { Typography } from "@mui/material";
// import date
import { convertDate } from "../../../utils/convertDate";
import { useSelector } from "react-redux";
import { deleteAttendantApi } from "../../../services/api/eventApi";
import GenericModal from "../GenericModal/GenericModal";
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

interface Props {
  events: events[] | null;
  callbackCancel: Function;
}

interface State {
  futureEvents: events[] | null;
  pastEvents: events[] | null;
  modal: {
    isOpen: boolean;
    message: string;
  };
  today: Date;
}

const initialState = {
  futureEvents: null,
  pastEvents: null,
  modal: {
    isOpen: false,
    message: "",
  },
  today: new Date(),
};

const PersonalEvents: FC<Props> = (props) => {
  const { t }: any = useTranslation();
  const [state, setState] = useState<State>(initialState);
  const userEmail: string = useSelector(
    (state: any) => state.userDuck.userData.email
  );

  useEffect(() => {
    splitEvents();
  }, []);

  function splitEvents(): void {
    let future: events[] = [];
    let past: events[] = [];

    props.events!.forEach((event: events) => {
      var dateTokens = event.eventDate.split("-");
      let tempDate = new Date(
        parseInt(dateTokens[0]),
        parseInt(dateTokens[1]) - 1,
        parseInt(dateTokens[2])
      );
      let eventDate: number = tempDate.getTime();
      let todaySec: number = state.today.getTime();
      if (eventDate < todaySec) {
        past.push(event);
      } else {
        future.push(event);
      }
    });

    setState({
      ...state,
      futureEvents: future,
      pastEvents: past,
    });
  }

  const cancelBook = async (id: number): Promise<void> => {
    let response: any = await deleteAttendantApi(id);
    let open: boolean = false;
    let message: string = "";
    switch (response.status) {
      case 200:
        open = true;
        message = t("events.cancelSuccess");
        break;
      default:
        open = true;
        message = t("events.bookingError");
        break;
    }
    setState({
      ...state,
      modal: {
        isOpen: open,
        message: message,
      },
    });
  };

  const openModal = (): void => {
    setState({
      ...state,
      modal: {
        isOpen: !state.modal.isOpen,
        message: "",
      },
    });
    if (!!props.callbackCancel) props.callbackCancel();
  };

  const mapEvents =
    (past: boolean) =>
    (element: events, key: number): ReactElement => {
      return (
        <div key={key} className="singleCardContainer">
          {past ? (
            key <= 5 && (
              <CardEventsMobile
                id={element.id}
                title={element.title}
                image={element.coverContent}
                requirement={element.requirements}
                description={element.description}
                date={convertDate(element.eventDate, t("dateFormat"))}
                place={element.place}
                opaque={past}
                callbackCancel={cancelBook}
              />
            )
          ) : (
            <CardEventsMobile
              id={element.id}
              title={element.title}
              image={element.coverContent}
              requirement={element.requirements}
              description={element.description}
              date={convertDate(element.eventDate, t("dateFormat"))}
              place={element.place}
              opaque={past}
              attendants={[userEmail]}
              callbackCancel={cancelBook}
            />
          )}
        </div>
      );
    };

  return (
    <article className="eventsSection">
      <section className="eventSection">
        <Typography variant="h3" sx={{ paddingBottom: "25px" }}>
          {t("personalArea.programmedEvents")}
        </Typography>
        <section className="cardsContainer">
          {state.futureEvents?.map(mapEvents(false))}
        </section>
      </section>
      <section className="eventSection">
        <Typography variant="h3" sx={{ paddingBottom: "25px" }}>
          {t("personalArea.pastEvents")}
        </Typography>
        <section className="cardsContainer">
          {state.pastEvents?.map(mapEvents(true))}
        </section>
      </section>
      <GenericModal open={state.modal.isOpen} callback={openModal}>
        <div className="children-modal">
          <Typography variant="body1">{state.modal.message}</Typography>
          <CustomButton
            label={t("confirm")}
            isDisable={false}
            size={"big"}
            colorType="secondary"
            callback={openModal}
          />
        </div>
      </GenericModal>
    </article>
  );
};

export default PersonalEvents;
