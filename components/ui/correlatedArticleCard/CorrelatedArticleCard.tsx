import { FC } from "react"
import { Link } from "react-router-dom"

//mui
import { Typography } from "@mui/material"

//style
import "./correlatedArticleCard.scss"

interface CorrelatedArticleCardProps {
  cover: string
  title: string
}

const CorrelatedArticleCard: FC<CorrelatedArticleCardProps> = (props) => {
  return (
    <div className="articleCardContainer">
      <img src={props.cover} className="image" />
      <div className="titleContainer">
        <Typography variant="body1">{props.title}</Typography>
        <Link to="#">
          <Typography variant="overline">Continua a leggere...</Typography>
        </Link>
      </div>
    </div>
  )
}

export default CorrelatedArticleCard
