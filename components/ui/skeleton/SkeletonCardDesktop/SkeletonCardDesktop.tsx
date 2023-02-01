import { FC } from "react";
//mui
import { Skeleton } from "@mui/material";

//style
import "./SkeletonCardDesktop.scss";

const SkeletonCardDesktop: FC = () => {
  return (
    <div id="skeletonCardDesktop">
      <div className="left">
        <div className="titleText">
          <Skeleton variant="text" animation="wave" />
        </div>
        <div className="image">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
      <div className="center">
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
      </div>
      <div className="right">
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
      </div>
    </div>
  );
};

export default SkeletonCardDesktop;
