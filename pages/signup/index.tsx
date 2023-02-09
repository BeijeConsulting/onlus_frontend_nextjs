import { FC, useEffect, useState } from "react";

// redux
import { useSelector } from "react-redux";

//translation
import useTranslation from "next-translate/useTranslation";

//components
import InputBox from "@/components/hooks/inputBox/InputBox";
import SelectBox from "@/components/hooks/inputBox/SelectBox";
import InputCheckbox from "@/components/hooks/inputBox/InputCheckbox";
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton";
import HelmetComponent from "@/components/ui/HelmetComponent/HelmetComponent";
import Layout from "@/components/ui/Layout/Layout";

//navigation
import { useRouter } from "next/navigation";
import SCREENS from "@/route/router";
import Link from "next/link";

//api
import { signUpApi } from "@/services/api/authApi";

//type
import {
  checkText,
  checkEmail,
  checkPhone,
  checkPassword,
  checkConfirmPassword,
} from "@/utils/checkForm";

//style
import styles from "@/styles/signup.module.scss";

//type
import { language, color } from "@/utils/type";

//mui
import { Typography } from "@mui/material";
import GenericModal from "@/components/hooks/GenericModal/GenericModal";

interface State {
  errorName: boolean;
  errorSurname: boolean;
  errorEmail: boolean;
  errorPhone: boolean;
  errorPassword: boolean;
  errorConfirmPassword: boolean;
  isChecked: boolean;
  isClicked: boolean;
  modal: {
    isOpen: boolean;
    message: string;
  };
}

const initialState = {
  errorName: false,
  errorSurname: false,
  errorEmail: false,
  errorPhone: false,
  errorPassword: false,
  errorConfirmPassword: false,
  isChecked: false,
  isClicked: false,
  modal: {
    isOpen: false,
    message: "",
  },
};

let data: any = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  lng: "IT",
};

let handleErrorSubmit: boolean = true;

const SignUp: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation("common");
  const LANG = {
    italian: t("login.italian"),
    english: t("login.english"),
    signupSuccess: t("login.signupSuccess"),
    alreadyExist: t("login.alreadyExist"),
    serverError: t("form.serverError"),
    signupTitle: t("titles.signupTitle"),
    name: t("login.name"),
    errorName: t("form.errorName"),
    surname: t("login.surname"),
    errorSurname: t("form.errorSurname"),
    email: t("login.email"),
    errorEmail: t("form.errorEmail"),
    phone: t("login.phone"),
    errorPhone: t("form.errorPhone"),
    password: t("login.password"),
    errorPassword: t("form.errorPassword"),
    confirmPassword: t("login.confirmPassword"),
    errorConfirmPassword: t("form.errorConfirmPassword"),
    language: t("login.language"),
    acceptTerms: t("login.acceptTerms"),
    signUpButton: t("buttons.signupButton"),
    alreadyRegistered: t("login.alreadyRegistered"),
    loginButton: t("buttons.loginButton"),
    confirm: t("confirm"),
  };

  const router: any = useRouter();

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  );

  const lngs: Array<language> = [
    { label: LANG.italian, value: LANG.italian },
    { label: LANG.english, value: LANG.english },
  ];

  async function handleSignUp(obj: any): Promise<void> {
    let result = await signUpApi(obj);

    let open: boolean = false;
    let message: string = "";

    switch (result.status) {
      case 200:
        open = true;
        message = LANG.signupSuccess;
        break;
      case 503:
        open = true;
        message = LANG.alreadyExist;
        break;
      default:
        open = true;
        message = LANG.serverError;
        break;
    }
    setState({
      ...state,
      modal: {
        isOpen: open,
        message: message,
      },
    });
  }

  const openModal = (): void => {
    setState({
      ...state,
      modal: {
        isOpen: !state.modal.isOpen,
        message: "",
      },
    });
  };

  const goToLogin = (): void => {
    setState({
      ...state,
      modal: {
        isOpen: !state.modal.isOpen,
        message: state.modal.message,
      },
    });
    if (state.modal.message === LANG.signupSuccess) router.push(SCREENS.login);
  };

  useEffect(() => {
    if (
      !state.errorName &&
      !state.errorEmail &&
      !state.errorSurname &&
      !state.errorPassword &&
      !state.errorConfirmPassword &&
      !state.errorPhone &&
      state.isChecked
    ) {
      handleErrorSubmit = false;
    }
  }, [
    state.errorEmail,
    state.errorName,
    state.errorPassword,
    state.errorPhone,
    state.errorSurname,
  ]);

  useEffect(() => {
    if (handleErrorSubmit === false)
      handleSignUp({
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        language: data.lng,
      });
  }, [state.isClicked]);

  const setName = (name: React.ChangeEvent<HTMLInputElement>): void => {
    data.name = name.target.value;
    setState({
      ...state,
      errorName: false,
    });
  };

  const setSurname = (surname: React.ChangeEvent<HTMLInputElement>): void => {
    data.surname = surname.target.value;
    setState({
      ...state,
      errorSurname: false,
    });
  };

  const setEmail = (email: React.ChangeEvent<HTMLInputElement>): void => {
    data.email = email.target.value;
    setState({
      ...state,
      errorEmail: false,
    });
  };

  const setPhone = (phone: React.ChangeEvent<HTMLInputElement>): void => {
    data.phone = phone.target.value;
    setState({
      ...state,
      errorPhone: false,
    });
  };

  const setPassword = (password: React.ChangeEvent<HTMLInputElement>): void => {
    data.password = password.target.value;
    setState({
      ...state,
      errorPassword: false,
    });
  };

  const setConfirmPassword = (
    confirmPassword: React.ChangeEvent<HTMLInputElement>
  ): void => {
    data.confirmPassword = confirmPassword.target.value;
    setState({
      ...state,
      errorConfirmPassword: false,
    });
  };

  const setTerms = (e: boolean): void => {
    setState({
      ...state,
      isChecked: e,
    });
  };

  const setLanguage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // data.lng = e.target.value === `${LANG.italian}` ? "IT" : "EN";
  };

  const submit = (): void => {
    setState({
      ...state,
      errorName: !checkText(data.name),
      errorSurname: !checkText(data.surname),
      errorEmail: !checkEmail(data.email),
      errorPhone: !checkPhone(data.phone),
      errorPassword: !checkPassword(data.password),
      errorConfirmPassword: !checkConfirmPassword(
        data.password,
        data.confirmPassword
      ),
      isClicked: !state.isClicked,
    });
  };

  return (
    <>
      <Layout>
        <main id="signup" className={`sectionContainer ${styles.signup}`}>
          <Typography variant="h1">{LANG.signupTitle}</Typography>
          <form action="" className={styles.form} onSubmit={submit}>
            <div className={styles.inputBox}>
              <InputBox
                label={LANG.name}
                type={"text"}
                isRequired={true}
                callbackChange={setName}
                notValid={state.errorName}
                errorLabel={LANG.errorName}
              />
              <InputBox
                label={LANG.surname}
                type={"text"}
                isRequired={true}
                callbackChange={setSurname}
                notValid={state.errorSurname}
                errorLabel={LANG.errorSurname}
              />
            </div>
            <div className={styles.inputBox}>
              <InputBox
                label={LANG.email}
                type={"email"}
                isRequired={true}
                callbackChange={setEmail}
                notValid={state.errorEmail}
                errorLabel={LANG.errorEmail}
              />
              <InputBox
                label={LANG.phone}
                type={"number"}
                callbackChange={setPhone}
                notValid={state.errorPhone}
                errorLabel={LANG.errorPhone}
              />
            </div>
            <div className={styles.inputBox}>
              <InputBox
                label={LANG.password}
                type={"password"}
                isRequired={true}
                callbackChange={setPassword}
                notValid={state.errorPassword}
                errorLabel={LANG.errorPassword}
              />
              <InputBox
                label={LANG.confirmPassword}
                type={"password"}
                isRequired={true}
                callbackChange={setConfirmPassword}
                notValid={state.errorConfirmPassword}
                errorLabel={LANG.errorConfirmPassword}
              />
            </div>
            <div className={styles.inputBox}>
              <SelectBox
                label={LANG.language}
                items={lngs}
                callbackChange={setLanguage}
              />
            </div>
            <InputCheckbox label={LANG.acceptTerms} callbackChange={setTerms} />
            <CustomButton
              label={LANG.signUpButton}
              size={"big"}
              colorType="primary"
              callback={submit}
              isDisable={!state.isChecked}
            />
          </form>
          <div className={styles.asideSection}>
            <Typography variant="caption">{LANG.alreadyRegistered}</Typography>
            <Link href={SCREENS.login} style={{ color: PALETTE[2].textColor }}>
              <Typography variant="caption">{LANG.loginButton}</Typography>
            </Link>
          </div>

          <GenericModal open={state.modal.isOpen} callback={openModal}>
            <div className={styles.childrenModal}>
              <Typography variant="body1">{state.modal.message}</Typography>
              <CustomButton
                label={LANG.confirm}
                isDisable={false}
                size={"big"}
                colorType="secondary"
                callback={goToLogin}
              />
            </div>
          </GenericModal>
        </main>
      </Layout>
    </>
  );
};

export default SignUp;
