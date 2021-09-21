import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import styled from "styled-components";

export const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
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
    <BoxDiv ref={drag} style={{ left, top }} role="Box">
      {children}
    </BoxDiv>
  );
};

const BoxDiv = styled.div`
  position: absolute;
  border: 1px dashed gray;
  background-color: purple;
  color: white;
  width: 200px;
  padding: 0.5rem 1rem;
  cursor: move;
`;
