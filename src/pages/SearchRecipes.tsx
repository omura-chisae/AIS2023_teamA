import { memo } from "react";
import { Alert, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OpenAI from "./hooks/OpenAI/OpenAi";

export const SearchRecipes = memo(() => {
  return <OpenAI />;
});

// import { memo } from "react";
// import { View } from "react-native";
// import { Button, Text } from "react-native-paper";

//  export const SearchRecipes = memo(() => {
//   const buttons = [
//     [
//       "種類",
//       { title: "主菜", select: "false" },
//       { title: "主食", select: false },
//       { title: "汁物", select: false },
//       { title: "副菜", select: false },
//       { title: "デザート", select: false },
//       { title: "旬", select: false },
//     ],
//     [
//       "作りたいジャンル",
//       { title: "和食", select: "false" },
//       { title: "洋食", select: "false" },
//       { title: "中華", select: "false" },
//       { title: "あっさり", select: "false" },
//       { title: "こってり", select: "false" },
//       { title: "スイーツ", select: "false" },
//     ],
//     [
//       "使いたい食材",
//       { title: "豚肉", select: "false" },
//       { title: "玉ねぎ", select: "false" },
//       { title: "ひき肉", select: "false" },
//       { title: "キャベツ", select: "false" },
//       { title: "パスタ", select: "false" },
//       { title: "トマト", select: "false" },
//       { title: "ご飯", select: "false" },
//       { title: "しめじ", select: "false" },
//     ],
//     [
//       "調理時間",
//       { title: "15分以下", select: "false" },
//       { title: "15~30分", select: "false" },
//       { title: "30分以上", select: "false" },
//     ],
//   ];

//   return (
//     <View style={{ flex: 1 }}>
//       <View>
//         <Text>ヘッダー</Text>
//       </View>
//       <View>
//         <Text>種類</Text>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           {/* {buttons.map((value, index) => console.log(value))} */}
//           <Button style={{ flex: 1, margin: 2 }}>主菜</Button>
//           <Button style={{ flex: 1, margin: 2 }}>主食</Button>
//           <Button style={{ flex: 1, margin: 2 }}>汁物</Button>
//         </View>
//         <View style={{ flexDirection: "row" }}>
//           <Button style={{ flex: 1, margin: 2 }}>副菜</Button>
//           <Button style={{ flex: 1, margin: 2 }}>デザート</Button>
//           <Button style={{ flex: 1, margin: 2 }}>旬</Button>
//         </View>
//         <Text>作りたいジャンル</Text>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Button style={{ flex: 1, margin: 2 }}>和食</Button>
//           <Button style={{ flex: 1, margin: 2 }}>洋食</Button>
//           <Button style={{ flex: 1, margin: 2 }}>中華</Button>
//         </View>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Button style={{ flex: 1, margin: 2 }}>あっさり</Button>
//           <Button style={{ flex: 1, margin: 2 }}>こってり</Button>
//           <Button style={{ flex: 1, margin: 2 }}>スイーツ</Button>
//         </View>
//         <Text>使いたい食材</Text>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Button style={{ flex: 1, margin: 2 }}>豚肉</Button>
//           <Button style={{ flex: 1, margin: 2 }}>玉ねぎ</Button>
//           <Button style={{ flex: 1, margin: 2 }}>ひき肉</Button>
//         </View>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Button style={{ flex: 1, margin: 2 }}>キャベツ</Button>
//           <Button style={{ flex: 1, margin: 2 }}>パスタ</Button>
//           <Button style={{ flex: 1, margin: 2 }}>トマト</Button>
//         </View>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Button style={{ flex: 1, margin: 2 }}>ご飯</Button>
//           <Button style={{ flex: 1, margin: 2 }}>しめじ</Button>
//           <Button style={{ flex: 1, margin: 2 }}>ほうれん草</Button>
//         </View>
//         <Text>調理時間</Text>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Button style={{ flex: 1, margin: 2 }}>15分以下</Button>
//           <Button style={{ flex: 1, margin: 2 }}>15〜30分</Button>
//           <Button style={{ flex: 1, margin: 2 }}>30分以上</Button>
//         </View>
//         <Button mode="contained">提案</Button>
//       </View>
//     </View>
//   );
// });
