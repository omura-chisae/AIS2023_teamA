import React, { useState, memo } from 'react';
import { Button, Provider, Searchbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // react-native-picker-selectをインポート

export const Stock = memo(() => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);

  const categories = [
    { label: 'カテゴリ1', value: 'category1' },
    { label: 'カテゴリ2', value: 'category2' },
  ];

  return (
    <Provider>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCategory(value)}
          items={categories}
          style={pickerSelectStyles}
          placeholder={{ label: 'カテゴリを選択...', value: null }}
          value={selectedCategory}
        />
      </View>
    </Provider>
  );
});

const styles = StyleSheet.create({
  pickerContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // ピッカーのアイコンが表示される場所
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
};

export default Stock;
