import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Icon = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
  opacity?: number;
  opacityStyle?: any;
  onPress?: () => void;
};

export default function Icon({
  name,
  size = 16,
  color = "white",
  style,
  opacity = 1,
  opacityStyle = {},
  onPress,
}: Icon) {
  return (
    <TouchableOpacity activeOpacity={opacity} style={opacityStyle} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={size} color={color} style={style} />
    </TouchableOpacity>
  );
}
