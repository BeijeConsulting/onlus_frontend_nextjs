import { FC } from "react"
//mui
import { Skeleton } from "@mui/material"

//style
import styles from "./skeletonCorrelated.module.scss"

const SkeletonCorrelated: FC = () => {
  return (
    <div className={styles.skeletonCorrelatedContainer}>
      <div className={styles.imageSkeletonContainer}>
        <Skeleton variant="rectangular" animation="wave" height={"100%"} />
      </div>
      <div className={styles.textSkeletonContainer}>
        <div className={styles.textBody}>
          <Skeleton variant="text" animation="wave" width={"80%"} />
          <Skeleton variant="text" animation="wave" width={"80%"} />
          <Skeleton variant="text" animation="wave" width={"80%"} />
          <Skeleton variant="text" animation="wave" width={"80%"} />
          <Skeleton variant="text" animation="wave" width={"80%"} />
          <Skeleton variant="text" animation="wave" width={"80%"} />
        </div>
        <Skeleton variant="text" animation="wave" width={"40%"} />
      </div>
    </div>
  )
}

export default SkeletonCorrelated
