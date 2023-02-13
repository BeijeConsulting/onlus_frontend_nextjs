import { FC, useState, useEffect } from "react"

//i18n
import useTranslation from "next-translate/useTranslation";

//mui
import { Typography } from "@mui/material"

//Components
import Footer from "@/components/hooks/Footer/Footer"
import Header from "@/components/hooks/Header/Header"
import PreFooter from "@/components/hooks/preFooter/PreFooter"
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton"
import InputBox from "@/components/hooks/inputBox/InputBox"
import InputCheckbox from "@/components/hooks/inputBox/InputCheckbox"

//Check functions
import { checkText, checkEmail, checkPhone, checkCF } from "@/utils/checkForm"

//Style
import styles from "@/styles/donate.module.scss"

interface State {
  isChecked: boolean
  errorName: boolean
  errorSurname: boolean
  errorEmail: boolean
  errorPhone: boolean
  errorCf: boolean
  errorDate: boolean
}

const initialState = {
  isChecked: false,
  errorName: false,
  errorSurname: false,
  errorEmail: false,
  errorPhone: false,
  errorCf: false,
  errorDate: false,
}

//da fixare quando otteniamo api funzionanti
type dataObject = {
  name: string
  surname: string
  email: string
  phone: string
  cf: string
  dateOfBirth: string
  // holderName: string;
  // cardNumber: string;
  // expirationDate: string;
  // cvc: string;
  // amount: string;
}

let data: dataObject = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  cf: "",
  dateOfBirth: "",
  // holderName: "",
  // cardNumber: "",
  // expirationDate: "",
  // cvc: "",
  // amount: "",
}

const Donate: FC = () => {
  const [state, setState] = useState<State>(initialState)
  const { t }: any = useTranslation("common");
  const LANG: any = {
    name: t("login.name"),
    errorName: t("form.errorName"),
    surname: t("login.surname"),
    errorSurname: t("form.errorSurname"),
    email: t("login.email"),
    errorEmail: t("form.errorEmail"),
    phone: t("login.phone"),
    errorPhone: t("form.errorPhone"),
    cf: t("login.cf"),
    errorCf: t("form.errorCf"),
    errorDateOfBirth: t("form.errorDateOfBirth"),
    paymentOption: t("personalArea.paymentOption"),
    holderName: t("donate.holderName"),
    cardNumber: t("donate.cardNumber"),
    cvc: t("donate.cvc"),
    amount: t("donate.amount"),
    privacyTerms: t("login.privacyTerms"),
    confirmButton: t("buttons.confirmButton"),
    donate: t("personalArea.donate"),
    personalData: t("personalArea.personalData"),
  };

  const setTerms = (e: boolean): void => {
    setState({
      ...state,
      isChecked: e,
    })
  }

  const checkForm = (): void => {
    setState({
      ...state,
      errorName: !checkText(data.name),
      errorSurname: !checkText(data.surname),
      errorEmail: !checkEmail(data.email),
      errorPhone: !checkPhone(data.phone),
      errorCf: !checkCF(data.cf),
      errorDate: data.dateOfBirth === "",
    })
  }

  //setData
  const setName = (name: React.ChangeEvent<HTMLInputElement>): void => {
    data.name = name.target.value
    setState({
      ...state,
      errorName: false,
    })
  }

  const setSurname = (surname: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorSurname: false,
    })
    data.surname = surname.target.value
  }

  const setEmail = (email: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorEmail: false,
    })
    data.email = email.target.value
  }

  const setPhone = (phone: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorPhone: false,
    })
    data.phone = phone.target.value
  }

  const setCf = (cf: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorCf: false,
    })
    data.cf = cf.target.value
  }

  const setDate = (date: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorDate: false,
    })
    data.dateOfBirth = date.target.value
  }

  return (
    <>
      <Header />

      <main id="donate" className={`sectionContainer ${styles.donate}`}>
        <Typography variant="h1">{LANG.donate}</Typography>
        <form action="">
          <Typography variant="h3">{LANG.personalData}</Typography>
          <section className={styles.personalData}>
            <div className={styles.inputBox}>
              <InputBox
                callbackChange={setName}
                label={LANG.name}
                type="text"
                isRequired={true}
                notValid={state.errorName}
                errorLabel={LANG.errorName}
              />
              <InputBox
                label={LANG.surname}
                type="text"
                isRequired={true}
                callbackChange={setSurname}
                notValid={state.errorSurname}
                errorLabel={LANG.errorSurname}
              />
            </div>
            <div className={styles.inputBox}>
              <InputBox
                label={LANG.email}
                type="email"
                isRequired={true}
                callbackChange={setEmail}
                notValid={state.errorEmail}
                errorLabel={LANG.errorEmail}
              />
              <InputBox
                callbackChange={setPhone}
                label={LANG.phone}
                type="number"
                notValid={state.errorPhone}
                errorLabel={LANG.errorPhone}
              />
            </div>
            <div className={styles.inputBox}>
              <InputBox
                callbackChange={setCf}
                label={LANG.cf}
                type="text"
                isRequired={true}
                upperCase={true}
                notValid={state.errorCf}
                errorLabel={LANG.errorCf}
              />
              <InputBox
                notValid={state.errorDate}
                label={""}
                type="date"
                callbackChange={setDate}
                errorLabel={LANG.errorDateOfBirth}
              />
            </div>
          </section>
          <Typography variant="h3">
            {LANG.paymentOption}
          </Typography>
          <section className={styles.personalData}>
            <InputBox
              label={LANG.holderName}
              type="text"
              isRequired={true}
            />
            <InputBox
              label={LANG.cardNumber}
              type="number"
              isRequired={true}
            />
            <div className={styles.inputBox}>
              <InputBox label={""} type="month" isRequired={true} />
              <InputBox
                label={LANG.cvc}
                type="number"
                isRequired={true}
              />
            </div>
            <InputBox
              label={LANG.amount}
              type="number"
              isRequired={true}
            />
          </section>
          <InputCheckbox
            label={LANG.privacyTerms}
            callbackChange={setTerms}
          />
          <CustomButton
            colorType="primary"
            label={LANG.confirmButton}
            size="big"
            callback={checkForm}
            isDisable={!state.isChecked}
          />
        </form>
      </main>

      <PreFooter />
      <Footer />
    </>
  )
}

export default Donate