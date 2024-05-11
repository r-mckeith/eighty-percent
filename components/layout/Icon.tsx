import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Icon = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

export default function Icon({ name, size = 16, color = "white", style }: Icon) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
}
