import { DndContext } from '@dnd-kit/core';
import styled from '@emotion/styled';
import { FC, memo, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { generateUniqueRandomNumbers } from '../number-generation/generateUniqueRandomNumbers';
import { DraggableButtonsRow } from './draggable/DraggableButtonsRow';
import { useDragNDropPlaygroundContext } from './DragNDropPlaygroundContext';
import { DroppableCardControl } from './dropable/DroppableCard';

const Spacer = styled(Col)`
  margin-top: 10rem;
  margin-bottom: 10rem;
  gap: 4rem;
  display: flex;
  flex-direction: column;
`;

export const DragAndDrop: FC = () => {
  const rngDropCardValues = useMemo(() => generateUniqueRandomNumbers(), []);
  const { onDragEnd } = useDragNDropPlaygroundContext();

  //it is same as usage of memo -> prevents to over re-render child components
  return (
    <Container fluid={'xxl'}>
      <DndContext onDragEnd={onDragEnd}>
        <MemoizedDropPlaygound rngDropCardValues={rngDropCardValues} />
      </DndContext>
    </Container>
  );
};

const DropPlayGround: FC<{ rngDropCardValues: number[] }> = ({ rngDropCardValues }) => {
  return (
    <Spacer>
      <Row className={'gap-4 gap-md-0'}>
        {rngDropCardValues.map((value, index) => (
          <Col sm={12} md={4} key={`droppable-${value}`}>
            <DroppableCardControl
              cardNumberValue={value}
              //you will have problem with random hashed state so basically index in this case makes more sense to be id of droppable, in case that column number gets re-regenerated
              droppableId={`droppable-${index}`}
            />
          </Col>
        ))}
      </Row>
      <DraggableButtonsRow />
    </Spacer>
  );
};

const MemoizedDropPlaygound = memo(DropPlayGround);
