import { FC } from "react";
//mui
import { Skeleton } from "@mui/material";

//style
import "./skeletonCorrelated.scss";

const SkeletonCorrelated: FC = () => {
  return (
    <div className="skeletonCorrelated-container">
      <div className="imageSkeleton-container">
        <Skeleton variant="rectangular" animation="wave" height={"100%"} />
      </div>
      <div className="textSkeleton-container">
        <div className="textBody">
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
  );
};

export default SkeletonCorrelated;
