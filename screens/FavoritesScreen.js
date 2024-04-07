import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';

import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';
import { useSelector } from 'react-redux';
// import { FavoritesContext } from '../store/context/favorites-context';

function FavoritesScreen() {
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  // const favoriteMealsCtx = useContext(FavoritesContext);

  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealIds.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite item yet</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
