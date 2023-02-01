import { FC } from "react"
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton"
import Layout from "@/components/ui/Layout/Layout"

import styles from "../styles/Home.module.scss"

const Home: FC = () => {
  return (
    <>
      <Layout>
        <div style={{ height: 300, background: "red" }} id="events">
          ciao
        </div>
        <div style={{ height: 300, background: "yellow" }} id="blog">
          ciao
        </div>
        <div style={{ height: 300, background: "blue" }} id="history">
          ciao
        </div>
      </Layout>
    </>
  )
}
export default Home
