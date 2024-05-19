import { StyleSheet } from 'react-native';

const black = '#1c1c1c';
const white = '#f2f2f2';
const darkGrey = '#424242';
const mediumGrey = '#b1b1b3';
const lightGrey = '#D3D3D3';

export const getColors = (scheme: any) =>
  StyleSheet.create({
    background: {
      backgroundColor: scheme === 'dark' ? black : white,
    },
    text: {
      color: scheme === 'dark' ? white : black,
    },
    disabledText: {
      color: scheme === 'dark' ? mediumGrey : mediumGrey,
    },
    accentText: {
      color: scheme === 'dark' ? white : black,
    },
    row: {
      backgroundColor: scheme === 'dark' ? black : white,
    },
    selectedRow: {
      backgroundColor: scheme === 'dark' ? darkGrey : lightGrey,
    },
    disabledRow: {
      backgroundColor: scheme === 'dark' ? darkGrey : lightGrey,
    },
    modal: {
      backgroundColor: scheme === 'dark' ? black : white,
    },
    border: {
      borderColor: scheme === 'dark' ? white : black,
    },
    bottomBorder: {
      borderColor: scheme === 'dark' ? white : black,
    },
    shadow: {
      shadowColor: scheme === 'dark' ? white : black,
    },
    reviewButton: {
      backgroundColor: scheme === 'dark' ? darkGrey : mediumGrey,
    },
  });
