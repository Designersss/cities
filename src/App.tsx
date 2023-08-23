import Router from "./router/Router.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  )
}

export default App
