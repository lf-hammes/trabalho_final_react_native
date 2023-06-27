import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native";
import { useContext, useState, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../../global/Header";
import { Footer } from "../../../global/Footer";

export function Search() {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [allLivros, setAllLivros] = useState([]);
  const [livros, setLivros] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const Livro = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Livro", { idLivro: item.codigoLivro });
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemLivro}>
          <Image
            style={styles.livro}
            source={{ uri: `data:image/png;base64,${item.img}` }}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>{item.nomeLivro}</Text>
          <Text style={styles.text}>{item.autorDTO.nomeAutor}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  async function getLivros() {
    await AxiosInstance.get("/livros", {
      headers: {
        Authorization: `Bearer ${dadosUsuario?.token}`,
      },
    })
      .then((response) => {
        setAllLivros(response.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function filtrarLivros(texto) {
    if (texto == '') {
        setLivros([])
    } else {
        setLivros(
          allLivros.filter((livro) =>
            livro.nomeLivro.toLowerCase().includes(texto.toLowerCase()) || livro.autorDTO.nomeAutor.toLowerCase().includes(texto.toLowerCase()) || livro.editoraDTO.nomeEditora.toLowerCase().includes(texto.toLowerCase())
          )
        );
    }
  }

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        {
          isLoading ? (
            <Text style={styles.loading}>Loading...</Text>
          ) : (
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchBar} onChangeText={filtrarLivros} />
          {livros != null ? (
            <FlatList
              data={livros}
              renderItem={({ item }) => <Livro item={item} />}
            />
          ) : null}
        </View>

          ) 
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
    alignItems: "center",
  },
  searchContainer: {
    marginTop: 10,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 40
  },
  searchBar: {
    backgroundColor: "white",
    width: "100%",
    height: 40,
    padding: 10,
    borderRadius: 20,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10
  },
  itemLivro: {
    width: 110,
    height: 167
  },
  livro: {
    height: 167,
    width: 110,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 15,
    justifyContent: 'space-evenly',
    minWidth: 260,
    height: 167,
    textAlign: 'center',
    backgroundColor: 'rgba(43, 51, 65, 1)',
    borderTopRightRadius:10,
    borderBottomRightRadius: 10
  },
  text: {
    color: '#fcbc5c',
    fontSize: 13
  },
  loading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fcbc5c",
    marginHorizontal: 10,
    marginVertical: 200,
  },
});
