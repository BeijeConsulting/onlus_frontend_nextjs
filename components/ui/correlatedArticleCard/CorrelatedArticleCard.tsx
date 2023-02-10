import { FC } from "react"

// navigation
import Link from "next/link"

//mui
import { Typography } from "@mui/material"

//style
import styles from "./correlatedArticleCard.module.scss"

interface CorrelatedArticleCardProps {
  cover: string
  title: string
}

const CorrelatedArticleCard: FC<CorrelatedArticleCardProps> = (props) => {
  return (
    <div className={styles.articleCardContainer}>
      <img src={props.cover} className={styles.image} />
      <div className={styles.titleContainer}>
        <Typography variant="body1">{props.title}</Typography>
        <Link href="#">
          <Typography variant="overline">Continua a leggere...</Typography>
        </Link>
      </div>
    </div>
  )
}

export default CorrelatedArticleCard
