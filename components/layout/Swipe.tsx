import React, { useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { View } from 'react-native';

type SwipeProps = {
  children: React.ReactNode;
  swipeableRow: any;
  renderRightActions: (progress: any, dragX: any) => React.ReactNode;
};

const Swipe: React.FC<SwipeProps> = ({ children, swipeableRow, renderRightActions }) => {
  const swipeableRef = useRef<any>(null);

  const handleOpenRow = () => {
    if (swipeableRow.current && swipeableRow.current !== swipeableRef.current) {
      swipeableRow.current.close();
    }
    swipeableRow.current = swipeableRef.current;
  };

  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableOpen={handleOpenRow}
      renderRightActions={renderRightActions}
      overshootLeft={false}
      rightThreshold={120}
    >
      <View>
        {children}
      </View>
    </Swipeable>
  );
};

export default Swipe;
