import { FC, useEffect, useState } from "react"

// redux
import { useSelector } from "react-redux"

//components
import CorrelatedArticleCard from "@/components/ui/correlatedArticleCard/CorrelatedArticleCard"
import Hero from "@/components/hooks/Hero/Hero"
import SkeletonCorrelated from "@/components/ui/skeleton/skeletonCorrelated/SkeletonCorrelated"
import Layout from "@/components/ui/Layout/Layout"
import Image from "next/image"

// i18n
import useTranslation from "next-translate/useTranslation"

//type
import { article, category, contentArticle, color } from "@/utils/type"

//style
import styles from "@/styles/article.module.scss"

//mui
import { Skeleton, Typography } from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"

// navigation
import router, { useRouter } from "next/router"
import SCREENS from "@/route/router"
import Link from "next/link"

//api
import {
  getArticlesFromCategory,
  getSingleArticle,
} from "@/services/api/articleApi"

import { hexToRGB } from "@/utils/hexToRGB"

interface State {
  article: article | null
  localArray: Array<article>
  isLoaded: boolean
  categories: category[]
}
const initialState = {
  article: null,
  localArray: [],
  isLoaded: false,
  categories: [],
}

const Article: FC = (props: any) => {
  const [state, setState] = useState<State>(initialState)

  const router: any = useRouter()
  const { cat_id }: any = router.query

  const { t }: any = useTranslation("common")
  const LANG: any = {
    relatedArticles: t("home.relatedArticles"),
  }

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  useEffect(() => {
    fetchDatas()
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    console.clear()
    console.log("query", router)
  }, [router.isReady])

  async function fetchDatas() {
    let singleArticleResult: any = await getSingleArticle(
      parseInt(router.query.id)
    )
    let correlatedResult: any = await getArticlesFromCategory(cat_id)

    setState({
      ...state,
      article: singleArticleResult.data,
      localArray: correlatedResult.data,
      isLoaded: true,
    })
  }

  const goToArticle = (id: number, cat_id: number) => (): void => {
    // router.push(SCREENS.article + `/${id}`, { state: { cat_id: cat_id } })
  }

  const mappingParagraph = (el: contentArticle, key: number): JSX.Element => {
    return (
      <div key={key} className={styles.paragraph}>
        <p className={styles.paragraphText}>{el.paragraph}</p>
        <div className="mediaContainer mediaArticle">
          <Image
            fill
            className={styles.media}
            src={el.media[0].content}
            alt="article-pic"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    )
  }

  const mappingCorrelated = (
    el: article,
    key: number
  ): JSX.Element | undefined => {
    if (key < 3 && el.id !== Number(parseInt(router.query.id))) {
      return (
        <div key={key} onClick={goToArticle(el.id, el.category[0]?.id)}>
          <CorrelatedArticleCard cover={el.coverContent} title={el.title} />
        </div>
      )
    }
    return
  }

  const mappingCategories = (el: any, key: number): JSX.Element => {
    return (
      <Typography key={key} variant="h5" className={styles.heroCategory}>
        {el.name}
      </Typography>
    )
  }

  return (
    <Layout>
      <Link
        style={{
          background: hexToRGB(PALETTE[2].textColor, 0.6),
          color: PALETTE[0].textColor,
        }}
        href={SCREENS.blog}
        className="arrowButton goBackButton"
      >
        <KeyboardArrowLeftIcon sx={{ height: 40, width: 40 }} />
      </Link>
      {state.isLoaded ? (
        <main id="article" className={styles.article}>
          <Hero
            image={state.article!.coverContent}
            title={state.article!.title}
            category={state.article!.category.map(mappingCategories)}
            type="article"
          />
          <section className={`sectionContainer`}>
            <Typography variant="body1">{state.article!.date}</Typography>
            <article>
              <section>{state.article!.content.map(mappingParagraph)}</section>
              <Typography variant="h3">{LANG.relatedArticles}</Typography>
              <section className={styles.correlatedArticles}>
                {/* {state.localArray.map(mappingCorrelated)} */}
              </section>
            </article>
          </section>
        </main>
      ) : (
        <main id="article" className={styles.article}>
          <Skeleton variant="rectangular" animation="wave">
            <Hero type="about" />
          </Skeleton>

          <section className="sectionContainer">
            <Typography variant="body1">
              <Skeleton variant="text" animation="wave" width={150} />
            </Typography>
            <article>
              <section>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={"500px"}
                />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </section>
              <Typography variant="h3">{LANG.relatedArticles}</Typography>
              <section className={styles.correlatedArticles}>
                <SkeletonCorrelated />
                <SkeletonCorrelated />
                <SkeletonCorrelated />
              </section>
            </article>
          </section>
        </main>
      )}
    </Layout>
  )
}

export default Article
