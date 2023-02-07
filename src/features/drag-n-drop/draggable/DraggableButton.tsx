import { useDraggable } from '@dnd-kit/core';
import styled from '@emotion/styled';
import { FC } from 'react';
import { Button } from 'react-bootstrap';

interface DraggableButtonProps {
  buttonId: string;
  displayValue: number;
}

export const DraggableButton: FC<DraggableButtonProps> = ({ buttonId, displayValue }) => {
  const { listeners, setNodeRef, transform, attributes } = useDraggable({
    id: buttonId,
    data: { value: displayValue },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <StyledButton
      className={'fs-3'}
      type={'button'}
      size={'sm'}
      key={buttonId}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {displayValue}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  width: fit-content;
  min-width: 10rem;
  padding: 0.5rem 1.2rem;
`;
