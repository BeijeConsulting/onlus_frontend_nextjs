import { useState, useEffect, FC } from "react"

//axios
import { getAbout } from "@/services/api/aboutAPI"

// i18n
import useTranslation from "next-translate/useTranslation"

//Components
import Hero from "@/components/hooks/Hero/Hero"
import JoinUs from "@/components/hooks/joinUsBbox/JoinUsBox"
import Layout from "@/components/ui/Layout/Layout"
import Image from "next/image"

//type
import { content } from "@/utils/type"

//Styles
import styles from "@/styles/about.module.scss"

//mui
import { Typography, Skeleton } from "@mui/material"

import giraffa from "@/giraffeImg.jpg"

interface State {
  imageHero: string
  titleHero: string
  titleScreen: string
  pageIsLoaded: boolean
  content: Array<content>
}

const initialState: State = {
  imageHero: "",
  titleHero: "",
  titleScreen: "",
  pageIsLoaded: false,
  content: [],
}

const About: FC = () => {
  const { t }: any = useTranslation()
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    fetchDatas()
  }, [])

  async function fetchDatas() {
    let about: boolean = false
    let result: any = await getAbout()
    if (!!result.data.hero && !!result.data.content && !!result.data.title)
      about = true
    else return
    setState({
      pageIsLoaded: about,
      imageHero: result.data.hero.mediaContent,
      titleHero: result.data.hero.text,
      content: result.data.content,
      titleScreen: result.data.title.title,
    })
  }

  const mappingContent = (item: content, key: number) => {
    return (
      <section
        // style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        className={
          !!item.mediaContent
            ? styles.contentAboutContainer
            : styles.contentAboutContainerTextOnly
        }
        key={key}
      >
        <Typography variant="body1">{item.paragraph}</Typography>
        {!!item.mediaContent && (
          <div className={styles.mediaContainer}>
            <Image
              src={item.mediaContent}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            ></Image>
          </div>
        )}
      </section>
    )
  }

  return (
    <Layout>
      {state.pageIsLoaded ? (
        <main id="about" className={styles.about}>
          <Hero
            type={"about"}
            title={state.titleHero}
            image={state.imageHero}
          />
          <section className="sectionContainer">
            <Typography variant="h1">{state.titleScreen}</Typography>
            {state.content.map(mappingContent)}
          </section>
        </main>
      ) : (
        //Skeleton
        <main id="about" className={styles.about}>
          <Skeleton variant="rectangular" animation="wave">
            <Hero type={"about"} />
          </Skeleton>
          <section className="sectionContainer">
            <Typography variant="h1">{t("nav.about")}</Typography>

            <section className={styles.contentAboutContainer}>
              <Typography variant="body1">
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </Typography>
              <div className={styles.mediaContainer}>
                <Skeleton
                  variant="rectangular"
                  height="300px"
                  animation="wave"
                />
              </div>
            </section>
          </section>
        </main>
      )}

      <JoinUs supportBox={true} />
    </Layout>
  )
}

export default About
