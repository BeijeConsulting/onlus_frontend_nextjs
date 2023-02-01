import { FC } from "react"

import { useSelector } from "react-redux"

import { useTranslation } from "react-i18next"

import { Helmet } from "react-helmet"

interface HelmetComponentProps {
  title?: string
  metatitleOn: boolean
  description?: string
}

const HelmetComponent: FC<HelmetComponentProps> = (props) => {
  const { t }: any = useTranslation()

  const WEBSITENAME: string = useSelector(
    (state: any) => state.generalDuck.websiteName
  )
  return (
    <Helmet>
      <title>
        {WEBSITENAME} -{" "}
        {props.metatitleOn ? t(`metaTitles.${props.title}`) : props.title}
      </title>
      <meta
        name="description"
        content={
          props.metatitleOn
            ? t(`metaTitles.${props.title} page`)
            : `${props.title} page`
        }
      />
    </Helmet>
  )
}

export default HelmetComponent
