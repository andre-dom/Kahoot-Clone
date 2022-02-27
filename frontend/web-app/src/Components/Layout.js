import { Outlet } from "react-router-dom";

const Layout = () => {
  return(
    <main>
      <Outlet></Outlet>
    </main>
  )
}

export default Layout;


// things we can add here, header, footer, etc