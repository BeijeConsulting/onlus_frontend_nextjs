import { FC } from "react";

// style
import "./prefooter.scss";

// i18n
import { useTranslation } from "react-i18next";

//mui
import { Typography } from "@mui/material";

//redux
import { useSelector } from "react-redux";

const PreFooter: FC = () => {
  const LOGO = useSelector((state: any) => state.generalDuck.logoContent);
  const BANNER = useSelector((state: any) => state.generalDuck.sectionWork);

  // tranlation hook
  const { t }: any = useTranslation();

  return (
    <mark id="prefooter">
      <div className="logo">
        <img src={LOGO} alt="" />
      </div>
      <div className="infoContact">
        <Typography variant="body1">{t("preFooter.caption")}</Typography>
        {!!BANNER && (
          <Typography variant="subtitle1">{BANNER.email}</Typography>
        )}
      </div>
    </mark>
  );
};

export default PreFooter;
