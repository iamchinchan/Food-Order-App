import React, { useEffect } from "react";
import styles from "../../css/MealsAvailable.module.css";
import Card from "../ui/Card";
import MealItem from "./mealItem/Mealitem";
import useHttp from "../../customHooks/useHttp";
import { useState } from "react/cjs/react.development";

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  useEffect(() => {
    const getMealsHandler = (mealsData) => {
      console.log("meals data is: ", mealsData);
      const fetchedMeals = [];

      for (const mealKey in mealsData) {
        fetchedMeals.push({
          id: mealKey,
          name: mealsData[mealKey].name,
          description: mealsData[mealKey].description,
          price: mealsData[mealKey].price,
        });
      }
      setMeals(fetchedMeals);
    };
    fetchMeals(
      {
        url: "https://food-order-app-a0665-default-rtdb.firebaseio.com/meals.json",
      },
      getMealsHandler
    );
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={styles.MealsError}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default MealsAvailable;
