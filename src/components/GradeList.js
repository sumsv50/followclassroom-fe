import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GradeThumb from './GradeThumb';
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from 'react-router-dom';
import { putData } from '../configs/request';

export default function ResponsiveGrid({ grade_order, onDragAndDrop }) {
  const params = useParams();

  const updateGradeOrder = async (gradeOrder) => {
    try {
      console.log(grade_order);
      onDragAndDrop(gradeOrder)
      const response = await putData(`${process.env.REACT_APP_BASE_URL}/grades/${params.id}`, gradeOrder);
      if (response?.isSuccess) {
        console.log("success")
      }
    } catch (err) {
      console.error(err);
    }
  }

  const arrayMove = (arr, fromIndex, toIndex) => {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  const handleOnDragEnd = async (result) => {
    const tmpArr = [...grade_order];
    const destination = result.destination;
    const destinationIndex = destination.index;
    const sourceIndex = result.source.index;

    if (!result.destination) return;
    arrayMove(tmpArr, sourceIndex, destinationIndex);
    await updateGradeOrder(tmpArr);
    console.log(tmpArr);
  };


  return (
    <Box sx={{ flexGrow: 1 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="grade">
          {
            (provided) => (
              <Grid container
                columnSpacing={{ xs: 1, md: 1 }}
                rowSpacing={4}
                columns={{ xs: 4, sm: 8, md: 12 }}
                align="center"
                padding="10px"
                {...provided.DroppableProps}
                ref={provided.innerRef}
              >
                {grade_order?.map((id, index) => (
                  <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                    {(provided) => (
                      <Grid item xs={12} key={id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <GradeThumb id={id} >
                          xs=2
                        </GradeThumb>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )
          }
        </Droppable>

      </DragDropContext>
    </Box>
  );
}
