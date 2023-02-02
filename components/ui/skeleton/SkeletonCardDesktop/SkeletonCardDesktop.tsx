import { FC } from "react"
//mui
import { Skeleton } from "@mui/material"

//style
import styles from "./SkeletonCardDesktop.module.scss"

const SkeletonCardDesktop: FC = () => {
  return (
    <div id={styles.skeletonCardDesktop}>
      <div className={styles.left}>
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
      <div className={styles.center}>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
      </div>
      <div className={styles.right}>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
      </div>
    </div>
  )
}

export default SkeletonCardDesktop
