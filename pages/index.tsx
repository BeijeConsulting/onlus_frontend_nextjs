import { FC } from "react"
import CustomButton from "@/components/ui/buttons/CustomButton/CustomButton"
import Layout from "@/components/ui/Layout/Layout"
import CardArticle from "@/components/ui/CardArticle/CardArticle"

import logo from "../giraffeImg.png"

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
          <CardArticle
            date="12/03/2304"
            description="lorem"
            minWidth="400"
            title="lorem"
            image=""
          />
        </div>
      </Layout>
    </>
  )
}
export default Home
