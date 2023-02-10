import { FC } from "react"
import Image from "next/image"

// navigation
import Link from "next/link"

//mui
import { Typography } from "@mui/material"

//style
import styles from "./correlatedArticleCard.module.scss"

import noImage from "@/images/no-image.jpg"

interface CorrelatedArticleCardProps {
  cover: string
  title: string
}

const CorrelatedArticleCard: FC<CorrelatedArticleCardProps> = (props) => {
  return (
    <div className={styles.articleCardContainer}>
      <div className="mediaContainer mediaCorrelatedArticle">
        <Image src={props.cover ? props.cover : noImage} fill alt="" />
      </div>
      <div className={styles.titleContainer}>
        <Typography variant="body1">{props.title}</Typography>
        <Link href="#">
          <Typography style={{ color: "black" }} variant="overline">
            Continua a leggere...
          </Typography>
        </Link>
      </div>
    </div>
  )
}

export default CorrelatedArticleCard
