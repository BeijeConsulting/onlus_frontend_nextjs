import { FC } from "react"

import Header from "@/components/hooks/Header/Header"
import Footer from "@/components/hooks/Footer/Footer"

interface Props {
  children: any
}

const Layout: FC<Props> = (props: any) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout
