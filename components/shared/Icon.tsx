import React from "react";
import { useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getColors } from "../../src/colors";

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
  color,
  style,
  opacity = 1,
  opacityStyle = {},
  onPress,
}: Icon) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const iconColor = color ? color : colors.text.color

  return (
    <TouchableOpacity activeOpacity={opacity} style={opacityStyle} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={size} color={iconColor} style={style} />
    </TouchableOpacity>
  );
}
