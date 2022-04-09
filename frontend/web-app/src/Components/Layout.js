import { Outlet } from "react-router-dom";

const Layout = () => {
  return(
    <main backgroundColor="#A8D0E6">
      <Outlet></Outlet>
    </main>
  )
}

export default Layout;


// things we can add here, header, footer, etc