import { FC } from "react";

import Header from "@/components/hooks/Header/Header";
import PreFooter from "@/components/hooks/preFooter/PreFooter";
import Footer from "@/components/hooks/Footer/Footer";

interface Props {
  children: any;
}

const Layout: FC<Props> = (props: any) => {
  return (
    <>
      <Header />
      {props.children}
      <PreFooter />
      <Footer />
    </>
  );
};

export default Layout;
