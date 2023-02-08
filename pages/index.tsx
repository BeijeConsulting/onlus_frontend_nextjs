// react
import { useState, useEffect, FC } from "react";

//navigation
import { useRouter } from "next/navigation";
import SCREENS from "@/route/router";
import Link from "next/link";
import NavLink from "@/components/hooks/NavLink/NavLink";

// i18n
import useTranslation from "next-translate/useTranslation";
import I18nProvider from "next-translate/I18nProvider";
import common from "@/locales/it/common.json";

// componenti
import Hero from "@/components/hooks/Hero/Hero";
import Footer from "@/components/hooks/Footer/Footer";
import PreFooter from "@/components/hooks/preFooter/PreFooter";
import CardEventsMobile from "@/components/hooks/CardEvents/CardEventsMobile";
import CardArticle from "@/components/ui/CardArticle/CardArticle";
import SkeletonCard from "@/components/ui/skeleton/skeletonCard/SkeletonCard";
import SkeletonSquare from "@/components/ui/skeleton/SkeletonSquare/SkeletonSquare";
import Header from "@/components/hooks/Header/Header";
import HelmetComponent from "@/components/ui/HelmetComponent/HelmetComponent";
import JoinUs from "@/components/hooks/joinUsBbox/JoinUsBox";
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton";
import Layout from "@/components/ui/Layout/Layout";

// style
import styles from "../styles/Home.module.scss";

// redux
import { useSelector } from "react-redux";

//mui
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography, Skeleton } from "@mui/material";

//type
import { events, article, social, color } from "@/utils/type";

//api
import { getHome } from "@/services/api/homeApi";
import { getEvents } from "@/services/api/eventApi";
import { getArticles } from "@/services/api/articleApi";
import { getSocial } from "@/services/api/socialApi";
import { getCustomization } from "@/services/api/customizationApi";
import { getUserApi } from "@/services/api/authApi";

// utils
import { convertDate } from "@/utils/convertDate";
import { hexToRGB } from "@/utils/hexToRGB";
import { checkEventDate } from "@/utils/checkForm";

//asstets
import logo from "../giraffeImg.png";

//cookies
import { getCookie, setCookie } from "cookies-next";

//interfaces
interface State {
  articlesArray: Array<article> | null;
  homeData: any;
  eventArray: Array<events> | null;
  socialFrame: social | null;
  isLoaded: {
    homeLoaded: boolean;
    eventLoaded: boolean;
    articleLoaded: boolean;
    socialLoaded: boolean;
  };
}

interface Props {
  homeData: any;
  eventData: any;
  articleData: any;
  socialData: any;
}

// inizializzazione
const initialState = {
  articlesArray: null,
  eventArray: null,
  homeData: null,
  socialFrame: null,
  isLoaded: {
    homeLoaded: false,
    eventLoaded: false,
    articleLoaded: false,
    socialLoaded: false,
  },
};

const Home = ({
  homeData,
  eventData,
  articleData,
  socialData,
}: Props): JSX.Element => {
  const { t }: any = useTranslation();
  const [state, setState] = useState<State>(initialState);

  const router: any = useRouter();

  // const SOCIAL: Array<social> = useSelector(
  //   (state: any) => state.generalDuck.social
  // );

  // const PALETTE: Array<color> = useSelector(
  //   (state: any) => state.generalDuck.palette
  // );

  useEffect(() => {
    console.log(socialData);
  }, []);

  const setTheCookie = () => {
    setCookie("prova", "nascondino");
  };
  const getTheCookie = () => {
    const wewe = getCookie("prova");
    console.log(wewe);
  };
  // const fetchDatas = async (): Promise<void> => {
  //   // let home: boolean = false,
  //   //   event: boolean = false,
  //   //   article: boolean = false,
  //   //   social: boolean = false;
  //   // let homeResponse: any = await getHome();
  //   // if (homeResponse.status === 200) home = true;
  //   // let eventResponse: any = await getEvents();
  //   // if (eventResponse.status === 200) event = true;
  //   // let articleResponse: any = await getArticles();
  //   // if (articleResponse.status === 200) article = true;
  //   // if (SOCIAL.length > 0) social = true;

  //   // let socialHome: Array<social> = SOCIAL.filter((social: social) => {
  //   //   return social.homepageOn == true;
  //   // });

  //   let today: Date = new Date();

  //   let future: Array<events> = checkEventDate(eventData.data, today);

  //   setState({
  //     ...state,
  //     homeData: homeData,
  //     eventArray: future,
  //     articlesArray: articleData,
  //     socialFrame: socialHome[0],
  //     isLoaded: {
  //       homeLoaded: home,
  //       eventLoaded: event,
  //       articleLoaded: article,
  //       socialLoaded: social,
  //     },
  //   });
  // };

  // const goToArticle = (id: number, cat_id: number) => (): void => {
  //   router.push(SCREENS.article + `/${id}`, { state: { cat_id: cat_id } });
  // };

  // const mapArticles = (item: article, key: number): JSX.Element | undefined => {
  //   if (key < 5) {
  //     return (
  //       <div key={key} onClick={goToArticle(item.id, item.category[0]?.id)}>
  //         <CardArticle
  //           minWidth="350px"
  //           title={item.title}
  //           description={item.content[0].paragraph}
  //           date={item.date}
  //           image={item.coverContent}
  //         />
  //       </div>
  //     );
  //   }
  //   return;
  // };

  // const goToEvents = (): void => {
  //   router.push(SCREENS.events);
  // };

  // // map degli eventi
  // const mapEvents = (event: events, key: number): JSX.Element | undefined => {
  //   if (key < 5) {
  //     return (
  //       <article key={key} onClick={goToEvents}>
  //         <CardEventsMobile
  //           title={event.title}
  //           description={event.description}
  //           image={event.coverContent}
  //           requirement={event.requirements}
  //           date={convertDate(event.eventDate, t("dateFormat"))}
  //           place={event.place}
  //           minWidth={"330px"}
  //           opaque={false}
  //         />
  //       </article>
  //     );
  //   }
  //   return;
  // };
  return (
    <I18nProvider lang="it" namespaces={{ common }}>
      <Layout>
        <div style={{ height: 300, background: "red" }} id="events"></div>
        <div style={{ height: 300, background: "yellow" }} id="blog">
          <Link href={SCREENS.personalArea}>ciaociaociao</Link>
        </div>
        <div style={{ height: 300, background: "blue" }} id="history">
          ciao
          <CardArticle
            date="12/03/2304"
            description="lorem"
            minWidth="400"
            title="lorem"
            image=""
          />
        </div>
      </Layout>
    </I18nProvider>
  );
};
export default Home;
export const getServerSideProps = async (ctx: any) => {
  const [socialResponse, customizationResponse]: Array<any> = await Promise.all(
    [getSocial(), getCustomization()]
  );
  return {
    props: {
      socialData: socialResponse,
      customizationData: customizationResponse.data,
    },
  };
};
