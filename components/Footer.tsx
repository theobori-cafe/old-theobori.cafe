import { FunctionComponent } from "react";
import style from "../styles/Footer.module.css";

const Footer: FunctionComponent = () => {
  return (
      <div className={style.footer + " text-sm mb-8 mt-4 text-slate-500"}>
        Made by me and yes it is <a href="https://github.com/theobori/website" className="text-blue-500 hover:underline underline-offset-4">
          open source
        </a>
      </div>
  );
};

export default Footer;
