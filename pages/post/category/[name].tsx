import { GetStaticPaths, GetStaticProps } from "next";
import { FunctionComponent } from "react";
import { ParsedUrlQuery } from "querystring";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

import NavBar from "../../../components/NavBar";

const CategoryPage: FunctionComponent = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};


export default CategoryPage;
