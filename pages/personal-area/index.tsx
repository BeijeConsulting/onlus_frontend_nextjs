import { FC, useEffect, useState } from "react";

// i18n
import useTranslation from "next-translate/useTranslation";

//components
import NavTab from "@/components/ui/NavTab/NavTab";
import VerticalNavTab from "@/components/ui/VerticalNavTab/VerticalNavTab";
import DonationHistory from "@/components/hooks/DonationsHistory/DonationHistory";
import PersonalEvents from "@/components/hooks/PersonalEvents/PersonalEvents";
import MyInfoSection from "@/components/hooks/MyInfoSection/MyInfoSection";
import Layout from "@/components/ui/Layout/Layout";
import Image from "next/image";

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

//imgaes
import loader from "@/images/loader.jpg";

interface Props {
  personalData: any;
  ownDonation: any;
  ownEvents: any;
}

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

const PersonalArea = ({
  personalData,
  ownDonation,
  ownEvents,
}: Props): JSX.Element => {
  const [state, setState] = useState<State>(initialState);

  const { t }: any = useTranslation("common");

  const LANG = {
    welcome: t("personalArea.welcome"),
    myInfo: t("personalArea.myInfo"),
    events: t("nav.events"),
    donations: t("personalArea.donations"),
  };

  let [DesktopContainer, MobileContainer] = useResponsive();

  const isLogged: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  );

  const router: any = useRouter();

  const checkLog = (): void => {
    if (!isLogged) router.push(SCREENS.login);
  };

  async function fetchDatas(): Promise<void> {
    const user: any = getCookie("userOnlus");
    const userId = JSON.parse(user) || null;
    const [resultPersonalData, resultOwnDonation, resultOwnEvents]: Array<any> =
      await Promise.all([
        getPersonalDatas(userId.userId),
        getAllDonation(),
        getUserEventsApi(),
      ]);
    console.log([resultPersonalData, resultOwnDonation, resultOwnEvents]);
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

  useEffect(() => {
    checkLog();
    fetchDatas();
    console.log(personalData, ownDonation, ownEvents, "client");
  }, []);

  return (
    <Layout>
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
          <Typography variant="h1">{LANG.welcome}</Typography>
        </section>
        {state.isLoaded ? (
          <>
            <DesktopContainer>
              <VerticalNavTab
                pages={[LANG.myInfo, LANG.events, LANG.donations]}
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
                pages={[LANG.myInfo, LANG.events, LANG.donations]}
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
            <Image src={loader} alt="loading" fill />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default PersonalArea;
export const getServerSideProps = async ({ req, res }: any) => {
  const user: any = getCookie("userOnlus", { req, res });
  //const userId: any = context.req.cookies["userId"];
  //const userId = JSON.parse(user) || null;
  // const [resultPersonalData, resultOwnDonation, resultOwnEvents]: Array<any> =
  //   await Promise.all([
  //     getPersonalDatas(44),
  //     getAllDonation(),
  //     getUserEventsApi(),
  //   ]);
  console.log("server", user);
  return {
    props: {
      // personalData: resultPersonalData,
      // ownDonation: resultOwnDonation,
      // ownEvents: resultOwnEvents,
    },
  };
};
