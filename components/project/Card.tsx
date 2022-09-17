import { FunctionComponent } from "react";

type Props = {
  langage: string
};

const Card: FunctionComponent<Props> = ({ langage }) => {
  return (
    <div>{langage}</div>
  );
};

export default Card;
