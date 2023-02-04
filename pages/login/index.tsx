//react
import { BaseSyntheticEvent, useState, useEffect } from "react";

//mui
import { Typography } from "@mui/material";

//Components
import Footer from "@/components/hooks/Footer/Footer";
import Header from "@/components/hooks/Header/Header";
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton";
import InputBox from "@/components/hooks/inputBox/InputBox";
import PreFooter from "@/components/hooks/preFooter/PreFooter";
import HelmetComponent from "@/components/ui/HelmetComponent/HelmetComponent";

//navigation
import { useRouter } from "next/navigation";
import SCREENS from "@/route/router";
import Link from "next/link";
import NavLink from "@/components/hooks/NavLink/NavLink";

//i18n
import useTranslation from "next-translate/useTranslation";

//Styles
import styles from "@/styles/login.module.scss";

//functions
import { signInApi } from "@/services/api/authApi";
import { setLoggedState, saveUserData } from "@/redux/duck/user";
import { useDispatch, useSelector } from "react-redux";

//cookie
import { setCookie, getCookie } from "cookies-next";

// type
import { color } from "@/utils/type";
import Layout from "@/components/ui/Layout/Layout";
interface State {
  email: string | null;
  password: string | null;
  errorLogin: boolean;
  errorMessage: string;
}

const initialState = {
  email: null,
  password: null,
  errorLogin: false,
  errorMessage: "",
};

function Login() {
  const dispatch: Function = useDispatch();
  const isLogged: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  );
  const router: any = useRouter();
  const { t }: any = useTranslation();

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  );

  const [state, setState] = useState<State>(initialState);

  const checkLog = (): void => {
    if (isLogged) router.push(SCREENS.personalArea);
    console.log("alt");
  };

  useEffect(() => {
    checkLog();
  }, []);

  const login = async (): Promise<void> => {
    let result: any = await signInApi(state.email, state.password);
    let errorLogin: boolean = false;
    let message: string = "";

    switch (result.status) {
      case 200:
        dispatch(setLoggedState(true));
        dispatch(saveUserData(result.data));
        setCookie(
          "userOnlus",
          JSON.stringify({ userId: result.data.id, isLoggedIn: true })
        );
        setCookie("onlusRefreshToken", result.data.refreshToken);
        setCookie("onlusToken", result.data.token);
        router.push(SCREENS.personalArea);
        break;
      case 400:
        errorLogin = true;
        message = t("form.accountDisabled");
        break;
      case 401:
        errorLogin = true;
        message = t("form.errorLogin");
        break;
      default:
        errorLogin = true;
        message = t("form.serverError");
    }
    setState({
      ...state,
      errorLogin: errorLogin,
      errorMessage: message,
    });
  };

  function getEmail(val: BaseSyntheticEvent) {
    setState({
      ...state,
      email: val.target.value,
      errorLogin: false,
    });
  }

  function getPsw(val: BaseSyntheticEvent) {
    setState({
      ...state,
      password: val.target.value,
      errorLogin: false,
    });
  }

  return (
    <>
      <Layout>
        <main id="login" className={`sectionContainer ${styles.login}`}>
          <Typography variant="h1">{t("titles.loginTitle")}</Typography>
          <form className={styles.loginContainer} onSubmit={login}>
            <InputBox
              label={t("login.email")}
              type={"mail"}
              callbackChange={getEmail}
              notValid={state.errorLogin}
            />
            <InputBox
              label={t("login.password")}
              type={"password"}
              callbackChange={getPsw}
              notValid={state.errorLogin}
              errorLabel={state.errorMessage}
            />

            <Link
              href={"/reset-password"}
              className={styles.forgotPassword}
              style={{ color: PALETTE[2].textColor }}
            >
              <Typography variant="caption">
                {t("login.forgottenPassword")}
              </Typography>
            </Link>

            <CustomButton
              size={"big"}
              callback={login}
              colorType="primary"
              label={t("buttons.loginButton")}
            />
          </form>

          <div className={styles.asideSection}>
            <Typography variant="caption">
              {t("login.notRegistered")}
            </Typography>
            <Link href={SCREENS.signup} style={{ color: PALETTE[2].textColor }}>
              <Typography variant="caption">
                {t("buttons.signupButton")}
              </Typography>
            </Link>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default Login;
