import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../../global/Header";
import { Footer } from "../../../global/Footer";

export function Editora({ route }) {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [editora, setEditora] = useState(null);
  const idEditora = route.params?.idEditora;

  const Livro = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Livro", { idLivro: item.codigoLivro });
      }}
    >
      <View style={styles.itemLivro}>
        <Image
          style={styles.livro}
          source={{ uri: `data:image/png;base64,${item.imagem}` }}
        />
      </View>
    </TouchableOpacity>
  );

  async function getEditora() {
    try {
      const newEditora = await AxiosInstance.get(`/editoras/${idEditora}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setEditora(newEditora.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEditora();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar />

        {editora != null ? (
          <View>
            <FlatList
              data={editora.listaLivrosDTO}
              renderItem={({ item }) => <Livro item={item} />}
            />
          </View>
        ) : (
          <Text style={styles.info}>Carregando...</Text>
        )}
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
    alignItems: "center",
  },
  livro: {
    marginVertical: 20,
    width: 198,
    height: 300,
  },
  itemLivro: {
    width: 198,
    height: 320,
  },
  info: {
    color: "#fcbc5c",
    fontSize: 20,
    marginHorizontal: 10,
  },
});
