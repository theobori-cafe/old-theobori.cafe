import { FunctionComponent } from "react";

import NavBar from "./NavBar";
// import Footer from "./Footer";

type Props = {
  children: any
};

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
      <div>
        <header>
          <NavBar />
        </header>
        
        {children}

        {/* <footer>
          <Footer />
        </footer> */}
      </div>
  );
};

export default Layout;
