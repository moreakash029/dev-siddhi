import Preloader from "@/src/components/Preloader";
import Switcher from "@/src/components/Switcher";
import DevSiddhi from "@/src/devsiddhi";
import "@/styles/globals.css";
import { Fragment } from "react";

const App = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <DevSiddhi />
      <Switcher />
      <Preloader />
      <Component {...pageProps} />
    </Fragment>
  );
};
export default App;
