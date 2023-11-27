import { StyleSheet } from "react-native";

// 共通のスタイル定義
const styles = StyleSheet.create({
  // Auth コンポーネントで使用されるスタイル
  authContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  authInput: {
    marginBottom: 10,
  },
  authButton: {
    marginVertical: 5,
  },

  // Stock コンポーネントで使用されるスタイル
  stockContainer: {
    padding: 20,
  },
  stockRipple: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    overflow: "hidden",
  },
  stockItemText: {
    fontSize: 18,
  },
  stockSearchInput: {
    flex: 1,
  },

  // CountButton コンポーネントで使用されるスタイル
  countButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  },
  countButton: {
    marginHorizontal: 10,
  },
  countButtonText:{
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
  }
});

export default styles;
