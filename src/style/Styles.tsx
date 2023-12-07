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
    backgroundColor: "white",
  },
  stockRipple: {
    paddingVertical: 20,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    overflow: "hidden",
    backgroundColor: "white",
    flex: 1,
  },
  stockItemText: {
    fontSize: 18,
  },
  stockItemExpiryDate: {
    fontSize: 16,
  },
  stockSearchInput: {
    flex: 1,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
    paddingVertical: 22,
    top: 0,
    bottom: 0,
    right: 0,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  // CountButton コンポーネントで使用されるスタイル
  countButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  countButton: {
    marginHorizontal: 10,
  },
  countButtonText: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default styles;
