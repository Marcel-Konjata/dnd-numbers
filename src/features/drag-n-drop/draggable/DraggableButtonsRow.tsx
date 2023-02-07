import { FC, memo } from 'react';
import { Row } from 'react-bootstrap';

import { generateStaticNumbersList } from '../../number-generation/generateStaticNumbers';
import { useDragNDropPlaygroundContext } from '../DragNDropPlaygroundContext';
import { DraggableButton } from './DraggableButton';

export const DraggableButtonsRow: FC = () => {
  const { droppedButtons } = useDragNDropPlaygroundContext();
  return <MemoizedRow droppedButtons={droppedButtons} />;
};

const MemoizedRow = memo(({ droppedButtons }: { droppedButtons: number[] }) => {
  const staticButtonsNumbers = generateStaticNumbersList(1, 9);
  return (
    <Row className={'flex gap-4 align-items-center justify-content-center'}>
      {staticButtonsNumbers
        .filter((it) => !droppedButtons.includes(it))
        .map((number) => (
          <DraggableButton
            buttonId={`draggable-${number}`}
            displayValue={number}
            key={`draggable-${number}`}
          />
        ))}
    </Row>
  );
});

MemoizedRow.displayName = 'MemoizedRow';
