import "react-native-gesture-handler";
import { DataProvider } from "./src/context/DataContext";
import TabHome from "./src/routes/TabHome";


const App = () => {
  return (
    <DataProvider>
      <TabHome/>
    </DataProvider>
  );
};

export default App;
