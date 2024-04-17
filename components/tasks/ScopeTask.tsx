import React, { useState, useEffect} from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { useDateContext } from '../../src/contexts/date/useDateContext';
import { toggleScope } from '../../src/api/SupabaseTasks';

interface Scope {
  id: number,
  inScopeDay: Date | string | null;
}

export default function ScopeTask({id, inScopeDay}: Scope) {
  const [inScope, setInScope] = useState<any>();
  const { dispatch } = useTaskContext();
  const { selectedDate } = useDateContext();

  useEffect(() => {
    setInScope(inScopeDay && inScopeDay <= selectedDate.toISOString().split('T')[0]);
  }, [inScopeDay]);

  async function handleToggleScope () {  
    console.log(id, selectedDate)
    dispatch({ type: 'TOGGLE_SCOPE', id: id, selectedDate: selectedDate.toISOString() });
  
    try {
      const updatedTask = await toggleScope(id, selectedDate.toISOString());
      
      if (updatedTask) {
      } else {
        console.error('Failed to toggle scope for day');
      }
    } catch (error) {
      console.error('Failed to toggle scope for day:', error);
    }
  };

  return (
    <View>
      <MaterialCommunityIcons 
        name={inScope ? "radiobox-marked" : "radiobox-blank"} 
        size={24} 
        color={'#767577'}
        onPress={() => handleToggleScope}
        style={{paddingLeft: 8}}
      />
    </View>
  );
};