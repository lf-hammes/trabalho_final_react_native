import "react-native-gesture-handler";
import { DataProvider } from "./src/context/DataContext";
import TabHome from "./src/routes/TabHome";
import { NavigationContainer } from "@react-navigation/native";
import { FavCartProvider } from "./src/context/FavCartContext";

const App = () => {
  return (
    <DataProvider>
      <FavCartProvider>
        <NavigationContainer>
          <TabHome />
        </NavigationContainer>
      </FavCartProvider>
    </DataProvider>
  );
};

export default App;
