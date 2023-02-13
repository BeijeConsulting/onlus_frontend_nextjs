import { FC, ReactElement, useState, useEffect } from "react";

// navigation
import { useRouter } from "next/navigation";
import SCREENS from "@/route/router";
import Link from "next/link";
import NavLink from "../NavLink/NavLink";

//i18n
import useTranslation from "next-translate/useTranslation";

// redux
import { setLoggedState, saveUserData } from "../../../redux/duck/user";
import { useDispatch } from "react-redux";

//components
import InputBox from "../inputBox/InputBox";
import SelectBox from "../inputBox/SelectBox";
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";
import GenericModal from "../GenericModal/GenericModal";

//check
import {
  checkText,
  checkEmail,
  checkPhone,
  checkPassword,
  checkConfirmPassword,
} from "../../../utils/checkForm";

//api
import { updateUserApi, deleteUserApi } from "../../../services/api/authApi";

//style
import styles from "./myInfoSection.module.scss";

//type
import { personalInfo, sendObj } from "../../../utils/type";

// mui
import { Typography } from "@mui/material";

interface InfoProps {
  datas: personalInfo | null;
}

interface State {
  buttonDisabled: boolean;
  passwordDisabled: boolean;
  somethingChanged: boolean;
  errorName: boolean;
  name: string;
  errorSurname: boolean;
  surname: string;
  errorPassword: boolean;
  language: string;
  password: string;
  confirmPassword: string;
  errorConfirmPassword: boolean;
  errorEmail: boolean;
  email: string;
  errorPhoneNumber: boolean;
  phoneNumber: string;
  isOpen: boolean;
}

const MyInfoSection: FC<InfoProps> = (props): ReactElement => {
  const { t, i18n }: any = useTranslation("common");
  const LANG: any = {
    italian: t("login.italian"),
    english: t("login.english"),
    name: t("login.name"),
    errorName: t("form.errorName"),
    surname: t("login.surname"),
    errorSurname: t("login.errorSurname"),
    email: t("login.email"),
    password: t("login.password"),
    errorPassword: t("login.errorPassword"),
    confirmPassword: t("login.confirmPassword"),
    errorConfirmPassword: t("login.errorConfirmPassword"),
    phone: t("login.phone"),
    errorPhone: t("login.errorPhone"),
    language: t("login.language"),
    disableAccount: t("buttons.disableAccount"),
    modifyButton: t("buttons.modifyButton"),
    disableSentence: t("personalArea.disableSentence"),
    confirm: t("confirm"),
  };

  const router: any = useRouter();
  const dispatch: Function = useDispatch();

  const initialState = {
    buttonDisabled: true,
    passwordDisabled: true,
    somethingChanged: false,
    name: props.datas!.name,
    surname: props.datas!.surname,
    email: props.datas!.email,
    password: props.datas!.password,
    confirmPassword: "",
    errorConfirmPassword: false,
    phoneNumber: props.datas!.phone,
    language: "it",
    errorName: false,
    errorSurname: false,
    errorEmail: false,
    errorPhoneNumber: false,
    errorPassword: false,
    isOpen: false,
  };

  const lngs = [
    { label: LANG.italian, value: LANG.italian },
    { label: LANG.english, value: LANG.english },
  ];

  const oldPhoneNumber: string | undefined = props.datas?.phone;

  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    if (
      state.somethingChanged &&
      !state.errorName &&
      !state.errorEmail &&
      !state.errorSurname &&
      !state.errorPassword &&
      !state.errorConfirmPassword &&
      !state.errorPhoneNumber
    ) {
      updateDatas();
    }
  }, [
    state.somethingChanged,
    state.errorEmail,
    state.errorName,
    state.errorPassword,
    state.errorPhoneNumber,
    state.errorSurname,
    state.errorConfirmPassword,
  ]);

  const updateDatas = async (): Promise<void> => {
    let sendObj: sendObj = {
      id: props.datas!.id,
      language: `${state.language.toUpperCase()}`,
      name: `${state.name}`,
      password: `${state.password}`,
      surname: `${state.surname}`,
    };

    if (oldPhoneNumber !== state.phoneNumber)
      sendObj = { ...sendObj, phone: state.phoneNumber };

    await updateUserApi(props.datas!.id, sendObj);
    setState({
      ...state,
      buttonDisabled: true,
      passwordDisabled: true,
      somethingChanged: false,
    });
  };

  const submit = (): any => {
    setState({
      ...state,
      errorName: !checkText(state.name),
      errorSurname: !checkText(state.surname),
      errorEmail: !checkEmail(state.email),
      errorPhoneNumber: !checkPhone(state.phoneNumber),
      errorPassword: !checkPassword(state.password),
      errorConfirmPassword: !checkConfirmPassword(
        state.password,
        state.confirmPassword
      ),
      somethingChanged: true,
    });
  };

  function setName(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      name: val.target.value,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }
  function setSurname(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      surname: val.target.value,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }
  function setEmail(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      email: val.target.value,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }
  function setPassword(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      password: val.target.value,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }
  function setConfirmPassword(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      confirmPassword: val.target.value,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }

  function setPhoneNumber(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      phoneNumber: val.target.value,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }

  function setLanguage(val: string) {
    let language: string = "";
    if (val === LANG.italian) language = "it";
    if (val === LANG.english) language = "en";
    setState({
      ...state,
      language: language,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }

  const disableAccount = async (): Promise<void> => {
    await deleteUserApi(props.datas!.id);

    dispatch(setLoggedState(false));
    dispatch(saveUserData({}));

    sessionStorage.removeItem("userOnlus");
    localStorage.removeItem("onlusRefreshToken");
    localStorage.removeItem("onlusToken");

    setState({
      ...state,
      isOpen: false,
    });

    router.push(SCREENS.home);
  };

  const openModal = (): void => {
    setState({
      ...state,
      isOpen: !state.isOpen,
    });
  };

  return (
    <section className={styles.myInfoContainer}>
      <form action="" className={styles.form} onSubmit={submit}>
        <div className={`inputBox ${styles.myInputContainer} `}>
          <InputBox
            label={LANG.name}
            defaultValue={state.name}
            callbackChange={setName}
            type={"text"}
            isRequired={true}
            notValid={state.errorName}
            errorLabel={LANG.errorName}
          />
          <InputBox
            defaultValue={state.surname}
            callbackChange={setSurname}
            label={LANG.surname}
            type={"text"}
            isRequired={true}
            notValid={state.errorSurname}
            errorLabel={LANG.errorSurname}
          />
        </div>
        <div className={`inputBox ${styles.myInputContainer} `}>
          <InputBox
            defaultValue={state.email}
            label={LANG.email}
            callbackChange={setEmail}
            disabled={true}
            type={"email"}
            isRequired={true}
            notValid={state.errorEmail}
          />
          <InputBox
            defaultValue={state.password}
            label={LANG.password}
            callbackChange={setPassword}
            type={"password"}
            isRequired={true}
            notValid={state.errorPassword}
            errorLabel={LANG.errorPassword}
          />
          {state.passwordDisabled === false && (
            <InputBox
              defaultValue={""}
              label={LANG.confirmPassword}
              callbackChange={setConfirmPassword}
              type={"password"}
              isRequired={true}
              notValid={state.errorPassword}
              errorLabel={LANG.errorConfirmPassword}
            />
          )}
        </div>
        <div className={`inputBox ${styles.myInputContainer} `}>
          <InputBox
            defaultValue={state.phoneNumber}
            callbackChange={setPhoneNumber}
            label={LANG.phone}
            type={"text"}
            notValid={state.errorPhoneNumber}
            errorLabel={LANG.errorPhone}
          />
          <SelectBox
            label={LANG.language}
            items={lngs}
            callbackChange={setLanguage}
            // defaultValue={
            //   i18n.language === "it" ? LANG.italian : LANG.english
            // }
            defaultValue={"it"}
          />
        </div>
        <div
          className={`inputBox ${styles.myInputContainer} ${styles.buttonsContainer}`}
        >
          <CustomButton
            label={LANG.disableAccount}
            isDisable={false}
            size={"big"}
            colorType="primary"
            callback={openModal}
          />
          <CustomButton
            label={LANG.modifyButton}
            isDisable={state.buttonDisabled}
            size={"big"}
            colorType="primary"
            callback={submit}
          />

          <GenericModal open={state.isOpen} callback={openModal}>
            <div className={styles.childrenModal}>
              <Typography variant="body1">
                {LANG.disableSentence}
              </Typography>
              <CustomButton
                label={LANG.confirm}
                isDisable={false}
                size={"big"}
                colorType="secondary"
                callback={disableAccount}
              />
            </div>
          </GenericModal>
        </div>
      </form>
    </section>
  );
};

export default MyInfoSection;
