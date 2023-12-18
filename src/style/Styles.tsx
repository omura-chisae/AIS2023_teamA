import { StyleSheet } from "react-native";

// 共通のスタイル定義
const styles = StyleSheet.create({
  // Auth コンポーネントで使用されるスタイル
  authContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  AuthbuttonContainer: {
    flexDirection: "row", // 水平方向に並べる
    justifyContent: "space-evenly", // ボタン間に均等なスペースを作る
    marginTop: 10, // 上部のマージン（適宜調整してください）
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
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    overflow: "hidden",
    backgroundColor: "white",
    height: 100,
  },
  stockItemText: {
    fontSize: 18,
    marginLeft: 20,
  },
  stockItemExpiryDate: {
    fontSize: 16,
    marginLeft: 20,
  },
  stockSearchInput: {
    flex: 1,
  },
  StockListItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  stockItemContainer: {
    flexDirection: "column",
    justifyContent: "center", // 垂直方向の中央揃え
    flex: 1, // 利用可能なスペースを最大限に使用
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 100,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 100,
    top: 0,
    bottom: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "grey",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
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
