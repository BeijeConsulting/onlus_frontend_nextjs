import { FC, useEffect, useState } from "react";

//i18n
import useTranslation from "next-translate/useTranslation";

//mui
import { Typography } from "@mui/material";

// componenti
import Footer from "@/components/hooks/Footer/Footer";
import PreFooter from "@/components/hooks/preFooter/PreFooter";
import CardEvents from "@/components/hooks/CardEvents/CardEvents";
import CardEventsMobile from "@/components/hooks/CardEvents/CardEventsMobile";
import Header from "@/components/hooks/Header/Header";
import SkeletonCardDesktop from "@/components/ui/skeleton/SkeletonCardDesktop/SkeletonCardDesktop";
import SkeletonCard from "@/components/ui/skeleton/skeletonCard/SkeletonCard";
import HelmetComponent from "@/components/ui/HelmetComponent/HelmetComponent";

// mediaquery
import useResponsive from "@/utils/useResponsive";

// stile
import styles from "@/styles/events.module.scss";

//api
import {
  bookEventApi,
  deleteAttendantApi,
  getEvents,
} from "@/services/api/eventApi";

// routing
import { useRouter } from "next/navigation";
import SCREENS from "@/route/router";
import Link from "next/link";

// convertDate
import { convertDate } from "@/utils/convertDate";

//type
import { events } from "@/utils/type";
import GenericModal from "@/components/hooks/GenericModal/GenericModal";
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton";
import { checkEventDate } from "@/utils/checkForm";
import Layout from "@/components/ui/Layout/Layout";

interface State {
  isLoaded: boolean;
  events: Array<events>;
  modal: {
    isOpen: boolean;
    message: string;
  };
  today: Date;
}

const initialState = {
  isLoaded: false,
  events: [],
  modal: {
    isOpen: false,
    message: "",
  },
  today: new Date(),
};

type lang = {
  bookingSuccess: string;
  bookingError: string;
  cancelSuccess: string;
  dateFormat: string;
  eventsTitle: string;
  confirm: string;
};

const Events: FC = () => {
  const [state, setState] = useState<State>(initialState);

  const { t }: any = useTranslation("common");
  const LANG: lang = {
    bookingSuccess: t("events.bookingSuccess") || "",
    bookingError: t("events.bookingError"),
    cancelSuccess: t("events.cancelSuccess"),
    dateFormat: t("dateFormat"),
    eventsTitle: t("titles.eventsTitle"),
    confirm: t("confirm"),
  };

  let [MobileContainer, DesktopContainer] = useResponsive();
  const router: any = useRouter();

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async (): Promise<void> => {
    let result: any = await getEvents();

    let future: Array<events> = checkEventDate(result.data, state.today);

    setState({
      ...state,
      isLoaded: true,
      events: future,
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
  };

  const bookEvent = (id: number) => async (): Promise<void> => {
    if (!sessionStorage.getItem("userOnlus")) {
      router.push(SCREENS.login);
      return;
    }
    let response: any = await bookEventApi(id);
    let open: boolean = false;
    let message: string = "";
    switch (response.status) {
      case 200:
        open = true;
        message = LANG.bookingSuccess;
        break;
      default:
        open = true;
        message = LANG.bookingError;
        break;
    }
    let result: any = await getEvents();
    let future: Array<events> = checkEventDate(result.data, state.today);
    setState({
      ...state,
      events: future,
      modal: {
        isOpen: open,
        message: message,
      },
    });
  };

  const cancelBook = (id: number) => async (): Promise<void> => {
    let response: any = await deleteAttendantApi(id);
    let open: boolean = false;
    let message: string = "";
    switch (response.status) {
      case 200:
        open = true;
        message = LANG.cancelSuccess;
        break;
      default:
        open = true;
        message = LANG.bookingError;
        break;
    }
    let result: any = await getEvents();
    let future: Array<events> = checkEventDate(result.data, state.today);

    setState({
      ...state,
      events: future,
      modal: {
        isOpen: open,
        message: message,
      },
    });
  };

  // map
  const mapEvents = (event: events, key: number): JSX.Element => {
    return (
      <article key={key}>
        <DesktopContainer>
          <CardEvents
            title={event.title}
            description={event.description}
            image={event.coverContent}
            requirement={event.requirements}
            date={convertDate(event.eventDate, LANG.dateFormat)}
            place={event.place}
            attendants={event.attendants}
            callbackBook={bookEvent(event.id)}
            callbackCancel={cancelBook(event.id)}
          />
        </DesktopContainer>
        <MobileContainer>
          <CardEventsMobile
            title={event.title}
            description={event.description}
            image={event.coverContent}
            requirement={event.requirements}
            date={convertDate(event.eventDate, LANG.dateFormat)}
            place={event.place}
            opaque={false}
            callbackBook={bookEvent(event.id)}
            attendants={event.attendants}
            callbackCancel={cancelBook(event.id)}
          />
        </MobileContainer>
      </article>
    );
  };

  return (
    <Layout>
      <main id={"events"} className={`sectionContainer ${styles.events}`}>
        <Typography variant="h1">{LANG.eventsTitle}</Typography>
        {state.isLoaded ? (
          state.events.map(mapEvents)
        ) : (
          <div>
            <DesktopContainer>
              <article>
                <SkeletonCardDesktop />
              </article>
              <article>
                <SkeletonCardDesktop />
              </article>
            </DesktopContainer>

            <MobileContainer>
              <article>
                <SkeletonCard />
              </article>
              <article>
                <SkeletonCard />
              </article>
            </MobileContainer>
          </div>
        )}
        <GenericModal open={state.modal.isOpen} callback={openModal}>
          <div className={styles.childrenModal}>
            <Typography variant="body1">{state.modal.message}</Typography>
            <CustomButton
              label={LANG.confirm}
              isDisable={false}
              size={"big"}
              colorType="secondary"
              callback={openModal}
            />
          </div>
        </GenericModal>
      </main>
    </Layout>
  );
};

export default Events;
