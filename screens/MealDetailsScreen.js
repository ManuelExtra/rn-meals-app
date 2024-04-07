import { useContext, useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import IconButton from '../components/ui/IconButton';

import { MEALS } from '../data/dummy-data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';
// import { FavoritesContext } from '../store/context/favorites-context';

function MealDetailsScreen({ route, navigation }) {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;

  const mealDetails = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      // favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title: mealDetails.title,
      headerRight: () => {
        return (
          <IconButton
            color='white'
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [mealId, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: mealDetails.imageUrl }} />
      <Text style={styles.title}>{mealDetails.title}</Text>
      <MealDetails
        duration={mealDetails.duration}
        complexity={mealDetails.complexity}
        affordability={mealDetails.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={mealDetails.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List data={mealDetails.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    maxWidth: '80%',
  },
});
