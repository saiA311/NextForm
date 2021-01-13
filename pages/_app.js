import "../styles/globals.css";
import { StateProvider } from "../components/StateProvider";
import { initialState, reducer } from "../components/reducer";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
