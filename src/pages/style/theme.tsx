import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  // ここにカスタマイズしたいテーマの設定を追加
  colors: {
    ...DefaultTheme.colors,
    primary: "blue", // 例: プライマリーカラーの変更
    accent: "yellow", // アクセントカラーの変更
    // その他のカラー設定
  },
  // 他にもフォントやサイズなど、カスタマイズしたい設定を追加
};

export default theme;
