import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import styled from "styled-components";

interface Props {
  id: string;
  left: number;
  top: number;
  hideSourceOnDrag: boolean;
  color: string;
  children: any;
  rotate: number;
}

export const Box = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  color,
  children,
  rotate,
}: Props) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <BoxDiv
      ref={drag}
      style={{
        left,
        top,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: `${color}`,
      }}
      role="Box"
    >
      {children}
    </BoxDiv>
  );
};

const BoxDiv = styled.div`
  position: absolute;
  border: none;
  color: #4a4a48;
  cursor: move;
  height: 200px;
  width: 200px;
  padding: 10px;
  overflow: hidden;
`;
