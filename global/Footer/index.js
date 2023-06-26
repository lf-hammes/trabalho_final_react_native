import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export function Footer() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Ionicons name="home" size={30} style={{color: '#fcbc5c'}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Procura')
      }}>
        <Ionicons name="search" size={30} style={{color: '#fcbc5c'}}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="heart" size={30} style={{color: '#fcbc5c'}}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="basket" size={30} style={{color: '#fcbc5c'}}/>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(43, 51, 65, 1)",
    height: 50,
    diplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "static",
  },
});
