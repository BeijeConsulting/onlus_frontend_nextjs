//React
import { ReactElement, useState, useEffect } from "react"

//navigation
import { useNavigate, NavigateFunction, Link } from "react-router-dom"
import SCREENS from "../../../route/router"

//mui
import { Typography, Skeleton } from "@mui/material"

//Components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"

//Style
import "./joinUsBox.scss"

//type
import { joinUs, color } from "../../../utils/type"

//redux
import { useSelector } from "react-redux"

interface Props {
  supportBox: boolean
}

interface State {
  data: joinUs | null
  isLoaded: boolean
}

const initialState = {
  data: null,
  isLoaded: false,
}

function JoinUs(props: Props): ReactElement {
  const navigate: NavigateFunction = useNavigate()
  const [state, setState] = useState<State>(initialState)

  const BANNER: any = useSelector((state: any) => state.generalDuck.banner)

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  useEffect(() => {
    getData()
  }, [])

  function goToDonations(): void {
    navigate(SCREENS.donate)
  }

  function goToJoin(): void {
    navigate(SCREENS.signup)
  }

  async function getData(): Promise<void> {
    setState({
      data: BANNER,
      isLoaded: true,
    })
  }

  return (
    <article className="joinUsBox" style={{ background: PALETTE[0].bgColor }}>
      {state.isLoaded ? (
        <>
          <section className="upperSection">
            <Typography sx={{ color: PALETTE[0].textColor }} variant="h1">
              {state.data!.title}
            </Typography>
            <div
              style={{ background: PALETTE[0].textColor }}
              className="separator"
            ></div>
            <Typography variant="h5">{state.data!.subtitle}</Typography>
          </section>
          <div className="buttons">
            <div className="btn1">
              <CustomButton
                colorType="secondary"
                label={state.data!.btnText1}
                size="big"
                callback={goToDonations}
              />
            </div>
            {props.supportBox && (
              <div className="btn2">
                <CustomButton
                  colorType="success"
                  label={state.data!.btnText2}
                  size="big"
                  callback={goToJoin}
                />
              </div>
            )}
          </div>
          {props.supportBox && (
            <section className="lowerSection">
              <Link
                style={{ color: PALETTE[0].textColor }}
                to={SCREENS.support}
                className="supportLink"
              >
                <Typography variant="body2">{state.data!.link}</Typography>
              </Link>
            </section>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: 70,
              width: "40%",
              backgroundColor: "rgb(249 249 249 / 13%)",
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: 40,
              width: "70%",
              backgroundColor: "rgb(249 249 249 / 13%)",
            }}
          />
        </div>
      )}
    </article>
  )
}

export default JoinUs
