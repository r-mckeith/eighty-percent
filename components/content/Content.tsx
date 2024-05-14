import React from 'react';
import { Row, RowText, Icon } from '../shared';

type Content = {
  name: string;
  isLocked?: boolean;
  first: boolean;
  last: boolean;
  setSelected: (arg0: string) => void;
};

export default function Content({ name, isLocked = false, first, last, setSelected }: Content) {
  return (
    <Row
      opacity={isLocked ? 1 : 0.2}
      onPress={() => (isLocked ? () => {} : setSelected(name))}
      first={first}
      last={last}
      disabled={isLocked}>
      <RowText text={name} disabled={isLocked} />
      {isLocked && <Icon name='lock' size={20} color='grey' />}
    </Row>
  );
}
