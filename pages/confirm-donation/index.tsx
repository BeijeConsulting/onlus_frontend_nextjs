import { FC } from "react";

//Components
import Footer from "@/components/hooks/Footer/Footer"
import Header from "@/components/hooks/Header/Header"
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton";
import PreFooter from "@/components/hooks/preFooter/PreFooter"

//Styles
import styles from "@/styles/confirmDonation.module.scss";

//Icon
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

//i18n
import useTranslation from "next-translate/useTranslation";

//mui
import { Typography } from "@mui/material";

//navigation
import { useRouter } from "next/navigation";

const ConfirmDonation: FC = () => {
  const amount: number = 2303;
  const { t }: any = useTranslation("common");
  const LANG = {
    congrats: t("confirmDonate.congrats"),
    report: t("confirmDonate.report"),
    backToHome: t("buttons.backToHome"),
  };
  const router: any = useRouter();

  const backToHome = (): void => {
    router.push("/");
  };

  return (
    <>
      <Header />

      <main
        id="confirmDonation"
        className={`sectionContainer ${styles.confirmDonation}`}
      >
        <section className={styles.confirmDonationContainer}>
          <ThumbUpAltIcon className={styles.confirmIcon} />
          <Typography variant="h1">{LANG.congrats}</Typography>
          <Typography className={styles.amount} variant="h3">
            {LANG.report}: {amount}€
          </Typography>
          <CustomButton
            colorType="primary"
            size={"small"}
            label={LANG.backToHome}
            callback={backToHome}
          />
        </section>
      </main>

      <PreFooter />
      <Footer />
    </>
  );
};

export default ConfirmDonation;