import { Alert, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";


export const SearchRecipes = ({navigation}) => {
  return (
    <View>
      <Button title='提案' onPress={()=> navigation.navigate('Recipe')}/>
    </View>
  );

};
