import { FC, useEffect, useState } from "react";

// i18n
import useTranslation from "next-translate/useTranslation";

//components
import Footer from "@/components/hooks/Footer/Footer";
import Header from "@/components/hooks/Header/Header";
import NavTab from "@/components/ui/NavTab/NavTab";
import VerticalNavTab from "@/components/ui/VerticalNavTab/VerticalNavTab";
import PreFooter from "@/components/hooks/preFooter/PreFooter";
import DonationHistory from "@/components/hooks/DonationsHistory/DonationHistory";
import PersonalEvents from "@/components/hooks/PersonalEvents/PersonalEvents";
import MyInfoSection from "@/components/hooks/MyInfoSection/MyInfoSection";
import HelmetComponent from "@/components/ui/HelmetComponent/HelmetComponent";

//style
import styles from "@/styles/personalArea.module.scss";

//type
import { personalInfo, events, donation } from "@/utils/type";

//mui
import { Typography } from "@mui/material";

//icons
import { BiUser } from "react-icons/bi";

//api
import { getPersonalDatas } from "@/services/api/personalAreaAPI";
import { getAllDonation } from "@/services/api/donationApi";
import { getUserEventsApi } from "@/services/api/eventApi";

//reponsive
import useResponsive from "@/utils/useResponsive";

//router
import { useRouter } from "next/navigation";
import SCREENS from "@/route/router";
import Link from "next/link";
import NavLink from "@/components/hooks/NavLink/NavLink";

//Redux
import { useSelector } from "react-redux";

//cookie
import { getCookie } from "cookies-next";

interface State {
  isLoaded: boolean;
  data: personalInfo | null;
  eventsData: events[] | null;
  donationData: Array<donation>;
}

const initialState = {
  isLoaded: false,
  data: null,
  eventsData: null,
  donationData: [],
};

const PersonalArea: FC = () => {
  const [state, setState] = useState<State>(initialState);

  const { t, i18n }: any = useTranslation();
  let [DesktopContainer, MobileContainer] = useResponsive();

  const isLogged: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  );
  const userId: number = JSON.parse(getCookie("userOnlus")!.userId);
  const router: any = useRouter();

  const checkLog = (): void => {
    if (!isLogged) router.push(SCREENS.login);
  };

  async function fetchDatas(): Promise<void> {
    let resultPersonalData: any = await getPersonalDatas(userId);
    let resultOwnDonation: any = await getAllDonation();
    let resultOwnEvents: any = await getUserEventsApi();
    setState({
      ...state,
      isLoaded: true,
      data: resultPersonalData.data,
      eventsData: resultOwnEvents.data,
      donationData: resultOwnDonation.data,
    });
  }

  const handleCancel = async (): Promise<void> => {
    let newOwnEvents: any = await getUserEventsApi();
    setState({
      ...state,
      isLoaded: true,
      eventsData: newOwnEvents.data,
    });
  };

  // useEffect(() => {
  //   checkLog();
  //   fetchDatas();
  // }, [i18n.language]);

  return (
    <>
      <main
        id="personalArea"
        className={`sectionContainer ${styles.personalArea}`}
      >
        <section className={styles.welcomeCard}>
          <div className={styles.iconContainer}>
            <MobileContainer>
              <BiUser size={30} />
            </MobileContainer>
            <DesktopContainer>
              <BiUser size={50} />
            </DesktopContainer>
          </div>
          <Typography variant="h1">{t("personalArea.welcome")}</Typography>
        </section>
        {state.isLoaded ? (
          <>
            <DesktopContainer>
              <VerticalNavTab
                pages={[
                  t("personalArea.myInfo"),
                  t("nav.events"),
                  t("personalArea.donations"),
                ]}
                children={[
                  <MyInfoSection datas={state!.data} />,
                  <PersonalEvents
                    events={state!.eventsData}
                    callbackCancel={handleCancel}
                  />,
                  <DonationHistory datas={state!.donationData} />,
                ]}
              />
            </DesktopContainer>
            <MobileContainer>
              <NavTab
                pages={[
                  t("personalArea.myInfo"),
                  t("nav.events"),
                  t("personalArea.donations"),
                ]}
                children={[
                  <MyInfoSection datas={state!.data} />,
                  <PersonalEvents
                    events={state!.eventsData}
                    callbackCancel={handleCancel}
                  />,
                  <DonationHistory datas={state!.donationData} />,
                ]}
              />
            </MobileContainer>
          </>
        ) : (
          <div className="loading-button">
            {/* <img src={require("../assets/images/loader.jpg")} alt="loading" /> */}
          </div>
        )}
      </main>
    </>
  );
};

export default PersonalArea;
