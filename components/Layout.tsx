import { FunctionComponent } from "react";

import NavBar from "./NavBar";

type Props = {
  children: any
};

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
      <div>
        <NavBar />
        {children}
      </div>
  );
};

export default Layout;
