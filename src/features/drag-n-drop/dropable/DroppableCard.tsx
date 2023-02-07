import { useDroppable } from '@dnd-kit/core';
import styled from '@emotion/styled';
import React, { FC, memo, useMemo } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { DraggableButton } from '../draggable/DraggableButton';
import { useDragNDropPlaygroundContext } from '../DragNDropPlaygroundContext';

interface DroppableCardControllerProps {
  cardNumberValue: number;
  droppableId: string;
}

type DroppableCardProps = Omit<DroppableCardControllerProps, 'droppableId'> & {
  setNodeRef: (element: HTMLElement | null) => void;
  isOver: boolean;
  dataToProcess: { droppableValue: number; draggableValue: number | null };
};

export const DroppableCardControl: FC<DroppableCardControllerProps> = ({
  cardNumberValue,
  droppableId,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
    data: { value: cardNumberValue },
  });
  const { droppedData } = useDragNDropPlaygroundContext();
  const dataToProcess = useMemo(
    () => droppedData && droppedData[droppableId],
    [droppedData],
  );

  return (
    <MemoizedDroppableCard
      cardNumberValue={cardNumberValue}
      isOver={isOver}
      setNodeRef={setNodeRef}
      dataToProcess={dataToProcess}
    />
  );
};

const DroppableCard: FC<DroppableCardProps> = ({
  cardNumberValue,
  setNodeRef,
  isOver,
  dataToProcess,
}) => {
  const isCorrectResult = dataToProcess?.draggableValue === dataToProcess?.droppableValue;

  return (
    <Card
      className={'p-4 bg-black bg-opacity-25 text-light rounded fs-1 shadow-sm'}
      ref={setNodeRef}
    >
      <Container>
        <Row className={'fs-3'}>drag the correct button with number:</Row>
        <Row className={'text-info fw-bold'}>{cardNumberValue}</Row>
        <Row
          className={
            'border-bottom border-top border-dark fs-4 mt-4 fw-semibold border-dark py-2'
          }
          style={{ height: '4rem' }}
        >
          <Col xs={6}>
            {!isOver && dataToProcess?.draggableValue == null && 'drag button here'}
            {dataToProcess?.draggableValue != null && (
              <DraggableButton
                buttonId={`draggable-${dataToProcess?.draggableValue}`}
                displayValue={dataToProcess?.draggableValue}
                key={`draggable-${dataToProcess?.draggableValue}`}
              />
            )}
          </Col>
          <Col xs={6} className={`${isCorrectResult ? 'text-success' : 'text-danger'}`}>
            {dataToProcess?.draggableValue != null &&
              (isCorrectResult ? 'Správně!' : 'Čísla nesouhlasí')}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

const MemoizedDroppableCard = memo(DroppableCard);
