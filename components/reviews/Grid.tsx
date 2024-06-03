import React from 'react';
import { View, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { DataTable, Card, Divider, Text } from 'react-native-paper';

type Grid = {
  data: any;
};

export default function Grid({ data }: Grid) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Card mode='outlined' style={[colors.background, { paddingBottom: 30 }]}>
      <DataTable style={{ flex: 12 }}>
        {data &&
          data.map((data: any) => {
            return (
              <>
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 4, paddingRight: 20 }}>{data.name}</DataTable.Cell>
                  <View style={{ flexDirection: 'row', flex: 8, justifyContent: 'space-evenly' }}>
                    {data.days.map((day: any) => {
                      const color = day.status === 'P' || day.icon === '-' ? day.color : colors.text.color;

                      return (
                        <DataTable.Cell>
                          <Text style={{ color: color }}>{day.icon}</Text>
                        </DataTable.Cell>
                      );
                    })}
                  </View>
                </DataTable.Row>
                <Divider />
              </>
            );
          })}
      </DataTable>
    </Card>
  );
}
