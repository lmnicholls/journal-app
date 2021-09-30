import Container from "./Container";

interface PostIt {
  _id: string;
  postit: string;
  rotate: number;
  x: number;
  y: number;
  color: string;
}

interface Props {
  postits: PostIt[];
}

export const Example = ({ postits }: Props) => {
  return (
    <div>
      <Container postits={postits} />
    </div>
  );
};

export default Example;
