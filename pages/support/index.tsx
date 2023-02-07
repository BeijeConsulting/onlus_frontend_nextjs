import { useEffect, useState } from "react"

//fetch
import { getSupportData } from "@/services/api/supportAPI"

//components
import Hero from "@/components/hooks/Hero/Hero"
import JoinUs from "@/components/hooks/joinUsBbox/JoinUsBox"
import Layout from "@/components/ui/Layout/Layout"
import Image from "next/image"

//styles
import styles from "@/styles/support.module.scss"

//type
import { content, support } from "@/utils/type"

//mui
import { Typography, Skeleton } from "@mui/material"

interface State {
  data: support
  isLoaded: boolean | null
}

function Support() {
  const [state, setState] = useState<State>()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData(): Promise<void> {
    let result: any = await getSupportData()
    setState({
      data: result.data,
      isLoaded: true,
    })
  }

  const mapping = (item: content, key: number) => {
    return (
      <section
        className={
          !!item.mediaContent
            ? styles.contentSupportContainer
            : styles.contentSupportContainerTextOnly
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
      <main id="support" className={styles.support}>
        <JoinUs supportBox={false} />
        <div className="sectionContainer">
          {state?.isLoaded && !!state.data ? (
            <>
              <Typography variant="h1">{state.data.title.title}</Typography>
              {state.data.content?.map(mapping)}
            </>
          ) : (
            <>
              <Typography variant="h1">
                <Skeleton variant="text" animation="wave" width={300} />
              </Typography>
              <section className={styles.contentSupportContainer}>
                <Typography variant="body1">
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </Typography>
                <div className={styles.mediaContainer}>
                  <Skeleton
                    variant="rectangular"
                    className={styles.contentSupport}
                    animation="wave"
                  />
                </div>
              </section>
            </>
          )}
        </div>
        {state?.isLoaded && !!state.data.hero ? (
          <Hero
            type="home"
            title={state.data.hero.text}
            image={state.data.hero.mediaContent}
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave">
            <Hero type="about" />
          </Skeleton>
        )}
      </main>
    </Layout>
  )
}

export default Support
