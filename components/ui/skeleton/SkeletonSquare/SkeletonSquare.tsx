import { FC } from "react"

//mui
import { Skeleton } from "@mui/material"

//style
import styles from "./skeletonSquare.module.scss"

interface Props {
  direction?: "column-reverse"
}

const SkeletonSquare: FC<Props> = (props) => {
  return (
    <div id={styles.skeletonSquare} style={{ flexDirection: props.direction }}>
      <div className={styles.titleText}>
        <Skeleton variant="text" animation="wave" />
      </div>
      <div className={styles.image}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  )
}

export default SkeletonSquare
