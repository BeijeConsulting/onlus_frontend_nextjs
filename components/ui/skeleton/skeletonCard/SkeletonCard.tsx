import { FC } from "react"

//mui
import { Skeleton } from "@mui/material"

//style
import styles from "./skeletoncard.module.scss"

const SkeletonCard: FC = () => {
  return (
    <div id={styles.skeletonCard}>
      <div className={styles.titleText}>
        <Skeleton variant="text" animation="wave" width={"30%"} />
      </div>
      <div className={styles.image}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className={styles.bodyText}>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
      </div>
    </div>
  )
}

export default SkeletonCard
