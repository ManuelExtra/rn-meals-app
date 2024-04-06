import { FlatList, StyleSheet, Text, View } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data';

function CategoriesScreen({ navigation }) {
  function renderCategoryItem(item) {
    function pressHandler() {
      navigation.navigate('MealsOverview', {
        categoryId: item.id,
      });
    }

    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderCategoryItem(item)}
        numColumns={2}
      />
    </View>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({});
