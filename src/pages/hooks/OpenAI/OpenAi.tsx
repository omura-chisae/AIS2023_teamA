// ReactとuseStateフックをインポート
import React, { useState } from 'react';
// React NativeからView、Text、Buttonをインポート
import { View, Text, Button } from 'react-native';
//initialをインポート
import initial from './prompts';




//メインページ
const OpenAi =()=>{
    const handleGenerateRecipe =async () => {
        try {
            
        } catch (error) {
            // エラーが発生した場合はエラーメッセージを表示
            console.error('APIリクエストエラー:', error);
        }
    };

    return(
        <View>
            <Text>OpenAI recepi page</Text>
            <Button title="レシピ生成" onPress={handleGenerateRecipe} />
        </View>
    )
} 

