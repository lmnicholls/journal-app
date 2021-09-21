import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import update from "immutability-helper";
import styled from "styled-components";
import { Box } from "./Box";
import { editPostitPosition, fetchPostits } from "../../actions";

const Container = ({ postits }) => {
  const [boxes, setBoxes] = useState(postits);

  const dispatch = useDispatch();

  useEffect(() => {
    setBoxes(postits);
  }, [postits]);

  const moveBox = useCallback(
    (id, x, y) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $set: { x: x, y: y },
          },
        })
      );
    },
    [boxes, setBoxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const x = Math.round(item.left + delta.x);
        const y = Math.round(item.top + delta.y);
        console.log("x", x, "y", y, "item", item);
        moveBox(item._id, x, y);
        setBoxes((prevState) => {
          console.log("prevstate", prevState);
          let index = prevState.findIndex((box) => (box._id = item.id));
          console.log("index", index);
          prevState[index][x] = x;
          prevState[index][y] = y;
          return prevState;
        });
        dispatch(
          editPostitPosition(item.id, x, y, () => {
            dispatch(fetchPostits());
          })
        );
      },
    }),
    [moveBox]
  );

  return (
    <ContainerDiv ref={drop}>
      {boxes.map((postit) => {
        return (
          <Box
            key={postit._id}
            id={postit._id}
            left={postit.x}
            top={postit.y}
            hideSourceOnDrag="true"
          >
            {postit.postit}
          </Box>
        );
      })}
    </ContainerDiv>
  );
};

export default Container;

const ContainerDiv = styled.div`
  width: 100%;
  height: 80vh;
  border: 1px solid black;
  position: relative;
`;
