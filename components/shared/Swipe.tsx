import React, { useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";

type SwipeProps = {
  children: React.ReactNode;
  swipeableRow: any
  renderRightActions: (progress: any, dragX: any) => React.ReactNode;
};

export default function Swipe({ children, swipeableRow, renderRightActions }: SwipeProps) {

  return (
    <Swipeable
      ref={swipeableRow}
      renderRightActions={renderRightActions}
      overshootLeft={false}
      rightThreshold={120}
    >
      {children}
    </Swipeable>
  );
}
