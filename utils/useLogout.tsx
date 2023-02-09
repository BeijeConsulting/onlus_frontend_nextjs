import { useEffect, useState } from "react";

//Redux
import { setLoggedState } from "@/redux/duck/user";
import { saveUserData } from "@/redux/duck/user";
import { useDispatch } from "react-redux";

//cookies
import { deleteCookie } from "cookies-next";

interface State {
  ready: boolean;
}

const initialState: State = {
  ready: false,
};

//CustomHook per eseguire il logout
const useLogout = (resetInterval: any = null): any => {
  const [state, setState] = useState(initialState);
  const dispatch: any = useDispatch();

  const logout = (): void => {
    deleteCookie("userOnlus");
    deleteCookie("onlusToken");
    deleteCookie("onlusRefreshToken");
    dispatch(setLoggedState(false));
    dispatch(saveUserData({}));
    setState({
      ready: true,
    });
  };

  useEffect(() => {
    let timeout: any;
    if (state.ready && resetInterval) {
      timeout = setTimeout(() => setState({ ready: false }), resetInterval);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [state.ready, resetInterval]);

  return [logout, state];
};

export default useLogout;
