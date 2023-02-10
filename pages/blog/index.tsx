import { FC, useEffect, useState } from "react"

// i18n
import useTranslation from "next-translate/useTranslation"

//mui
import { Pagination, Typography } from "@mui/material"

//components
import InputBox from "@/components/hooks/inputBox/InputBox"
import SelectBox from "@/components/hooks/inputBox/SelectBox"
import CardArticle from "@/components/ui/CardArticle/CardArticle"
import SkeletonCard from "@/components/ui/skeleton/skeletonCard/SkeletonCard"
import Layout from "@/components/ui/Layout/Layout"

//utils
import { article, articlePage, category } from "@/utils/type"

// style
import styles from "@/styles/blog.module.scss"

// navigation
import { useRouter } from "next/router"
import Link from "next/link"
import SCREENS from "@/route/router"

//api
import {
  getArticles,
  getCategories,
  getArticlesFromCategory,
} from "@/services/api/articleApi"

//responsive
import useResponsive from "@/utils/useResponsive"

interface State {
  categories: Array<category>
  articles: Array<Array<article>>
  numberOfPages: number
  isLoaded: boolean
  page: number
}

const initialState = {
  categories: [],
  numberOfPages: 1,
  articles: [],
  isLoaded: false,
  page: 1,
}

//localarray for search filter
let localArticles: Array<article> = []
let localArticlesCategory: Array<article> = []

const Blog: FC = () => {
  const router: any = useRouter()
  console.log(router)
  const [state, setState] = useState<State>(initialState)
  const ARTICLESXPAGES = 6
  let [DesktopContainer, MobileContainer] = useResponsive()

  // translation
  const { t }: any = useTranslation("common")
  const LANG: any = {
    blogTitle: t("titles.blogTitle"),
    search: t("search"),
    selectCategory: t("selectCategory"),
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let articleResult: any = await getArticles()
    let categoryResult: any = await getCategories()

    let localCategories: Array<category> = []

    categoryResult.data.forEach((e: any) => {
      let singleCategory: category = {
        label: e.name,
        value: e.id,
      }
      localCategories.push(singleCategory)
    })

    localArticles = articleResult.data
    localArticlesCategory = articleResult.data

    let pageObj: articlePage = generatePagination(localArticles)

    setState({
      ...state,
      categories: localCategories,
      articles: pageObj.paginationArticle,
      numberOfPages: pageObj.pages,
      isLoaded: true,
    })
  }

  const generatePagination = (array: Array<article>): articlePage => {
    let pages = Math.ceil(array.length / ARTICLESXPAGES)

    let tempArticle: Array<article> = [...array]
    let paginationArticle: Array<Array<article>> = []

    while (tempArticle.length > 0) {
      paginationArticle.push(tempArticle.splice(0, ARTICLESXPAGES))
    }
    let pageObj = {
      paginationArticle: paginationArticle,
      pages: pages,
    }
    return pageObj
  }

  const goToArticle = (id: number, cat_id: number) => (): void => {
    router.push(
      {
        pathname: `/blog/${encodeURIComponent(id)}`,
        query: { cat_id: cat_id },
      },
      `/blog/${encodeURIComponent(id)}`
    )
    // router.push(SCREENS.article + `/${id}`, { state: { cat_id: cat_id } })
  }

  const mapping = (el: article, key: number): JSX.Element => {
    return (
      <div key={key} onClick={goToArticle(el.id, el.category[0]?.id)}>
        {el.status === "published" && (
          <>
            <MobileContainer>
              <CardArticle
                date={el.date}
                image={el.coverContent}
                title={el.title}
                description={el.content[0].paragraph}
                minWidth="250px"
              />
            </MobileContainer>
            <DesktopContainer>
              <CardArticle
                date={el.date}
                image={el.coverContent}
                title={el.title}
                description={el.content[0].paragraph}
                minWidth="300px"
              />
            </DesktopContainer>
          </>
        )}
      </div>
    )
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let textInputValue: string = e.target.value
    let filteredArticles: Array<article> = localArticlesCategory.filter(
      (obj) => {
        return obj.title.toLowerCase().includes(textInputValue.toLowerCase())
      }
    )
    let pageObj: articlePage = generatePagination(filteredArticles)
    setState({
      ...state,
      numberOfPages: pageObj.pages,
      page: 1,
      articles: pageObj.paginationArticle,
    })
  }

  const handleCategory = async (e: number): Promise<void> => {
    let pageObj: articlePage
    if (e === 0) {
      pageObj = generatePagination(localArticles)
      localArticlesCategory = localArticles
    } else {
      let result: any = await getArticlesFromCategory(e)
      localArticlesCategory = result.data
      pageObj = generatePagination(localArticlesCategory)
    }
    setState({
      ...state,
      numberOfPages: !!pageObj.pages ? pageObj.pages : 1,
      page: 1,
      articles: pageObj.paginationArticle,
    })
  }
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setState({
      ...state,
      page: value,
    })
  }

  return (
    <Layout>
      <main id="blog" className={`sectionContainer ${styles.blog}`}>
        <Typography variant="h1">{LANG.blogTitle}</Typography>
        <section className={`${styles.searchContainer} ${styles.inputBox}`}>
          <InputBox label={LANG.search} type="text" callbackChange={search} />
          <SelectBox
            label={LANG.selectCategory}
            items={[{ label: "Tutti", value: 0 }, ...state.categories]}
            callbackChange={handleCategory}
          />
        </section>
        <section className={styles.cardsContainer}>
          {state.isLoaded ? (
            state.articles.length > 0 &&
            state.articles[state.page - 1].map(mapping)
          ) : (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </section>
        {state.articles.length <= 0 && (
          <div className={styles.notFoundArticle}>
            <Typography variant="body1">Nessun elemento trovato</Typography>
          </div>
        )}
        {state.numberOfPages > 1 && (
          <div className={styles.pagination}>
            <Pagination
              count={state.numberOfPages}
              page={state.page}
              onChange={changePage}
            />
          </div>
        )}
      </main>
    </Layout>
  )
}

export default Blog
