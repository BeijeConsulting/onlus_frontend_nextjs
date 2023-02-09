import { useState } from "react"

//mui
import { Typography } from "@mui/material"

//Components
import Footer from "@/components/hooks/Footer/Footer"
import Header from "@/components/hooks/Header/Header"
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton"
import InputBox from "@/components/hooks/inputBox/InputBox"
import PreFooter from "@/components/hooks/preFooter/PreFooter"

//i18n
import useTranslation from "next-translate/useTranslation"

//Styles
import styles from "@/styles/resetPassword.module.scss"

//Check mail
import { checkEmail } from "@/utils/checkForm"

interface State {
  errorEmail: boolean
}

const initialState = {
  errorEmail: false,
}

let data: any = {
  email: "",
}

function ResetPassword() {
  const [state, setState] = useState<State>(initialState)
  const { t }: any = useTranslation("common");
  const LANG: any = {
    resetPassword: t("forgotPassword.resetPassword"),
    labelReset: t("forgotPassword.labelReset"),
    clickReset: t("forgotPassword.clickReset"),
  };

  const resetPassword = () => {
    setState({
      ...state,
      errorEmail: !checkEmail(data.email),
    })
  }

  const setEmail = (email: React.ChangeEvent<HTMLInputElement>): void => {
    data.email = email.target.value
    setState({
      ...state,
      errorEmail: false,
    })
  }

  return (
    <>
      <Header />

      <main id="resetPassword" className={`sectionContainer ${styles.resetPassword}`}>
        <Typography variant="h1">
          {LANG.resetPassword}
        </Typography>

        <form className={styles.resetPasswordContainer} onSubmit={resetPassword}>
          <InputBox
            label={LANG.labelReset}
            type={"email"}
            callbackChange={setEmail}
            notValid={state.errorEmail}
          />

          <CustomButton
            size={"big"}
            callback={resetPassword}
            colorType="primary"
            label={LANG.clickReset}
          />
        </form>
      </main>

      <PreFooter />
      <Footer />
    </>
  )
}

export default ResetPassword
