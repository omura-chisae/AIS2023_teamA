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
    borderRadius: 20,
    marginHorizontal: 20, // モーダルの左右の余白を調整
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

  // AddUpdateStock コンポーネントで使用されるスタイル
  AddUpdateStockcontainer: {
    padding: 20, //モーダル内の四方に余白を空ける
  },

  // showDate コンポーネントで使用されるスタイル
  showDateCalendarStyle: {
    backgroundColor: "#DDAF56",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default styles;
