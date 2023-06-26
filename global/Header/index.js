import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataContext } from "../../src/context/DataContext";

export function Header() {
  const { dadosUsuario } = useContext(DataContext);
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Image
          source={{
            uri: "https://media.discordapp.net/attachments/1110785958359601204/1121198400688373930/HeaderLogo.png",
          }}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.usuario}>
        <Text style={styles.menu}>Bem-vindo(a),</Text>
        <Text style={styles.menu}>{dadosUsuario.nome}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "rgba(43, 51, 65, 1)",
    width: "100%",
    height: 100,
    position: "static",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 40,
    width: 120,
    margin: 20,
  },
  menu: {
    fontSize: 20,
    color: "white",
  },
  usuario: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
});
