import { DragEndEvent } from '@dnd-kit/core';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
} from 'react';

type DroppedData = Record<
  string,
  { droppableValue: number; draggableValue: number | null }
>;

interface Action {
  type: string;
  payload: DroppedData;
}

const droppedValueReducer = (state: DroppedData, action: Action) => {
  if (action.type === 'setDroppedData') {
    return { ...state, ...action.payload };
  }
  throw Error('unknow action type dispatched in droppedValueReducer');
};

interface IDragNDropPlaygroundContext {
  onDragEnd: (e: DragEndEvent) => void;
  droppedData: DroppedData;
  droppedButtons: Array<number>;
  setDroppedButtons: React.Dispatch<React.SetStateAction<number[]>>;
}

const dragNDropPlaygroundContext = createContext<IDragNDropPlaygroundContext>({
  droppedButtons: [],
  droppedData: {},
  onDragEnd: () => undefined,
  setDroppedButtons: () => [],
});

/**@description remember that all components that uses useContext re-render
 * ON EACH!!! inner state of context, recommendation is use it in control component and child component should be memo if the context has high velocity changes*/
export const useDragNDropPlaygroundContext = () => useContext(dragNDropPlaygroundContext);

export const DragNDropPlaygroundContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [droppedButtons, setDroppedButtons] = useState<Array<number>>([]);
  const [droppedData, dispatchDroppedData] = useReducer(droppedValueReducer, {});

  const onDragEnd = (e: DragEndEvent) => {
    if (e.over?.id == null) {
      setDroppedButtons((prevState) =>
        prevState.filter((button) => button !== e.active.data?.current?.value),
      );

      const targetEntry = Object.entries(droppedData).find(
        ([_, value]) => value.draggableValue === e.active.data?.current?.value,
      );
      if (targetEntry) {
        dispatchDroppedData({
          type: 'setDroppedData',
          payload: {
            [targetEntry?.[0] as string]: {
              droppableValue: e.over?.data.current?.value,
              draggableValue: null,
            },
          },
        });
      }
      return;
    }

    const previousDraggableValue = droppedData?.[e.over?.id as string];
    const duplicatedDraggableValueEntry = Object.entries(droppedData).find(
      ([key, value]) => value.draggableValue === e.active.data.current?.value,
    );

    setDroppedButtons((prevState) =>
      prevState
        .concat(e.active.data?.current?.value)
        .filter((it) => it != previousDraggableValue?.draggableValue),
    );

    //note for more reabale approach would be consideration of immer library which uses object proxy
    dispatchDroppedData({
      type: 'setDroppedData',
      payload: {
        [e.over?.id as string]: {
          droppableValue: e.over?.data.current?.value,
          draggableValue: e.active.data?.current?.value,
        },
        ...(duplicatedDraggableValueEntry?.[0] && {
          [duplicatedDraggableValueEntry?.[0]]: {
            droppableValue: duplicatedDraggableValueEntry?.[1].droppableValue,
            draggableValue: null,
          },
        }),
      },
    });
  };

  return (
    <dragNDropPlaygroundContext.Provider
      value={{ droppedButtons, droppedData, onDragEnd, setDroppedButtons }}
    >
      {children}
    </dragNDropPlaygroundContext.Provider>
  );
};
