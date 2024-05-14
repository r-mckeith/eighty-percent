import { StyleSheet } from "react-native";

export const getColors = (scheme: any) =>
  StyleSheet.create({
    background: {
      backgroundColor: scheme === "dark" ? "#232b2b" : "white",
    },
    text: {
      color: scheme === 'dark' ? 'white' : 'black'
    },
    row: {
      backgroundColor: scheme === 'dark' ?  "#232b2b" : 'white',
      borderColor: "#505050",
    },
    selectedRow: {
      backgroundColor: scheme === 'dark' ? "#424242" : "#D3D3D3",
      borderColor: "#505050",
    },
    disabledRow: {
      backgroundColor: scheme === 'dark' ?  "#424242" : '#D9D9D9',
      borderColor: "#505050",
    },
    disabledText: {
      color: "#b1b1b3",
    },
    header: {
      backgroundColor: scheme === 'dark' ?  "#D0D0D0" : '#D0D0D0',
      borderColor: "#505050",
    },
    modal: {
      backgroundColor: scheme === "dark" ? "#0e1111" : "#white",
      borderColor: scheme === "dark" ? "black" : "white",
    },
    border: {
      borderColor: scheme === "dark" ? "white" : "black",
    },
    bottomBorder: {
      borderColor: scheme === "dark" ? "white" : "black",
    },
    accentText: {
      color: scheme === 'dark' ? 'white' : 'black'
    },
    shadow: {
      shadowColor: scheme === "dark" ? "white" : "black",
    },
    reviewButton: {
      backgroundColor: scheme === "dark" ? "#424242" : "#D0D0D0",
    }

  });
