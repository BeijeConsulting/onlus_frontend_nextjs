import { FC, ReactElement, useEffect, useState } from "react"

//components
import CardEventsMobile from "../CardEvents/CardEventsMobile"

//i18n
import useTranslation from "next-translate/useTranslation"

//style
import styles from "./personalEvents.module.scss"

//type
import { events } from "../../../utils/type"

//mui
import { Typography } from "@mui/material"
// import date
import { convertDate } from "../../../utils/convertDate"
import { useSelector } from "react-redux"
import { deleteAttendantApi } from "../../../services/api/eventApi"
import GenericModal from "../GenericModal/GenericModal"
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"

interface Props {
  events: events[] | null
  callbackCancel: Function
}

interface State {
  futureEvents: events[] | null
  pastEvents: events[] | null
  modal: {
    isOpen: boolean
    message: string
  }
  today: Date
}

const initialState = {
  futureEvents: null,
  pastEvents: null,
  modal: {
    isOpen: false,
    message: "",
  },
  today: new Date(),
}

const PersonalEvents: FC<Props> = (props) => {
  const { t }: any = useTranslation('common');
  const LANG: any = {
    cancelSuccess: t("events.cancelSuccess"),
    bookingError: t("events.bookingError"),
    programmedEvents: t("personalArea.programmedEvents"),
    pastEvents: t("personalArea.pastEvents"),
  };

  const [state, setState] = useState<State>(initialState)
  const userEmail: string = useSelector(
    (state: any) => state.userDuck.userData.email
  )

  useEffect(() => {
    // console.log("prrrrr", props.events)
    // if (props.events === (null || undefined) || props.events!.length <= 0) {
    //   console.log("ciao")
    // } else {
    //   console.log("ciao cazzo")
    //   splitEvents()
    // }
    splitEvents()
  }, [])

  function splitEvents(): void {
    let future: events[] = []
    let past: events[] = []

    props.events?.forEach((event: events) => {
      var dateTokens = event?.eventDate?.split("-")
      let tempDate = new Date(
        parseInt(dateTokens[0]),
        parseInt(dateTokens[1]) - 1,
        parseInt(dateTokens[2])
      )
      let eventDate: number = tempDate.getTime()
      let todaySec: number = state.today.getTime()
      if (eventDate < todaySec) {
        past.push(event)
      } else {
        future.push(event)
      }
    })

    setState({
      ...state,
      futureEvents: future,
      pastEvents: past,
    })
  }

  const cancelBook = async (id: number): Promise<void> => {
    let response: any = await deleteAttendantApi(id)
    let open: boolean = false
    let message: string = ""
    switch (response.status) {
      case 200:
        open = true
        message = LANG.cancelSuccess
        break
      default:
        open = true
        message = LANG.bookingError
        break
    }
    setState({
      ...state,
      modal: {
        isOpen: open,
        message: message,
      },
    })
  }

  const openModal = (): void => {
    setState({
      ...state,
      modal: {
        isOpen: !state.modal.isOpen,
        message: "",
      },
    })
    if (!!props.callbackCancel) props.callbackCancel()
  }

  const mapEvents =
    (past: boolean) =>
    (element: events, key: number): ReactElement => {
      return (
        <div key={key} className={styles.singleCardContainer}>
          {past ? (
            key <= 5 && (
              <CardEventsMobile
                id={element.id}
                title={element.title}
                image={element.coverContent}
                requirement={element.requirements}
                description={element.description}
                date={convertDate(
                  element?.eventDate,
                  "it-IT"
                  //t("dateFormat")
                )}
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
              date={convertDate(
                element?.eventDate,
                "it-IT"
                //t("dateFormat")
              )}
              place={element.place}
              opaque={past}
              attendants={[userEmail]}
              callbackCancel={cancelBook}
            />
          )}
        </div>
      )
    }

  return (
    <article className={styles.eventsSection}>
      <section className={styles.eventSection}>
        <Typography variant="h3" sx={{ paddingBottom: "25px" }}>
          {LANG.programmedEvents}
        </Typography>
        <section className={styles.cardsContainer}>
          {state.futureEvents?.map(mapEvents(false))}
        </section>
      </section>
      <section className={styles.eventSection}>
        <Typography variant="h3" sx={{ paddingBottom: "25px" }}>
          {LANG.pastEvents}
        </Typography>
        <section className={styles.cardsContainer}>
          {state.pastEvents?.map(mapEvents(true))}
        </section>
      </section>
      <GenericModal open={state.modal.isOpen} callback={openModal}>
        <div className={styles.childrenModal}>
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
  )
}

export default PersonalEvents
