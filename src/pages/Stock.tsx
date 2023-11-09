import React, { useState, memo } from 'react';
import { TextInput, Modal, Portal, Provider, Appbar, Searchbar, Dialog, TouchableRipple, Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export const Stock = memo(() => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showItemDialog = (item:string) => {
    setSelectedItem(item);
    setDialogVisible(true);
  };
  const hideItemDialog = () => setDialogVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const openSearchBar = () => setSearchBarVisible(true);
  const closeSearchBar = () => setSearchBarVisible(false);

  const categories = [
    { label: 'カテゴリ1', value: 'category1' },
    { label: 'カテゴリ2', value: 'category2' },
  ];

  const foodItems = ['たまねぎ', 'にんじん', 'ネギ']; // 食品リスト

  return (
    <Provider>
      <Appbar.Header>
        {isSearchBarVisible ? (
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            autoFocus
            onBlur={closeSearchBar}
            style={styles.searchInput}
          />
        ) : (
          <>
            <Appbar.Action icon="plus" onPress={showModal} />
            <Appbar.Action icon="magnify" onPress={openSearchBar} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <RNPickerSelect
                onValueChange={(value) => setSelectedCategory(value)}
                items={categories}
                style={pickerSelectStyles}
                placeholder={{ label: 'カテゴリを選択...', value: null }}
                value={selectedCategory}
              />
            </View>
          </>
        )}
      </Appbar.Header>
      <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <Text>青柳さんが作成したページの表示</Text>
          <Button onPress={hideModal}>Done</Button>
        </Modal>
        <Dialog visible={dialogVisible} onDismiss={hideItemDialog}>
          <Dialog.Title>{selectedItem}</Dialog.Title>
          <Dialog.Content>
            <Text>{`${selectedItem} の詳細情報をここに表示`}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideItemDialog}>閉じる</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        {foodItems.map((item) => (
          <TouchableRipple
            key={item}
            onPress={() => showItemDialog(item)}
            rippleColor="rgba(0, 0, 0, .32)"
            style={styles.ripple}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableRipple>
        ))}
      </View>
    </Provider>
  );
});

//全体のスタイル
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
  },
  container: {
    padding: 20,
  },
  ripple: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
  },
});

// react-native-picker-selectのスタイル
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
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
