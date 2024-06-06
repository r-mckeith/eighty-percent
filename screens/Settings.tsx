import React, { useState } from 'react';
import { View } from 'react-native';
import { useSession } from '../src/contexts';
import Account from '../components/auth/Account';
import { Toggle } from '../components/shared';

export default function Settings() {
  const [showPercent, setShowPercent] = useState(false);
  const session = useSession();
  return (
    <View>
      <Toggle
        onToggle={() => setShowPercent(!showPercent)}
        value={showPercent}
        label={'Show habit data as percents'}
      />
      <Account session={session} />
    </View>
  );
}
