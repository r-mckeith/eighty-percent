import React from 'react';
import { View } from 'react-native';
import { DataTable, Divider, Text } from 'react-native-paper';

type Grid = {
  data: any;
};

export default function Grid({ data }: Grid) {
  return (
      <DataTable style={{ flex: 12, paddingBottom: 30 }}>
        {data &&
          data.map((data: any, index: number) => {
            return (
              <View key={index}>
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 4, paddingRight: 20 }}>{data.name}</DataTable.Cell>
                  <View style={{ flexDirection: 'row', flex: 8, justifyContent: 'space-evenly' }}>
                    {data.days.map((day: any, index: number) => {
                      const color = day.status === 'P' || day.icon === '-' ? day.color : day.color;

                      return (
                        <DataTable.Cell key={index}>
                          <Text style={{ color: color }}>{day.icon}</Text>
                        </DataTable.Cell>
                      );
                    })}
                  </View>
                </DataTable.Row>
                <Divider />
              </View>
            );
          })}
      </DataTable>
  );
}
