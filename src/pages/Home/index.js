import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [editoras, setEditoras] = useState([]);
  const [livros, setLivros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Editora = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Editora", { idEditora: item.codigoEditora });
      }}
    >
      <View style={styles.itemEditora}>
        <Image
          style={styles.editora}
          source={{ uri: `data:image/png;base64,${item.img}` }}
        />
      </View>
    </TouchableOpacity>
  );

  const Livro = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Livro", { idLivro: item.codigoLivro });
      }}
    >
      <View style={styles.itemLivro}>
        <Image
          style={styles.livro}
          source={{ uri: `data:image/png;base64,${item.img}` }}
        />
      </View>
    </TouchableOpacity>
  );

  async function getEditoras() {
    await AxiosInstance.get("/editoras", {
      headers: {
        Authorization: `Bearer ${dadosUsuario?.token}`,
      },
    })
      .then((response) => {
        setEditoras(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getLivros() {
    await AxiosInstance.get("/livros", {
      headers: {
        Authorization: `Bearer ${dadosUsuario?.token}`,
      },
    })
      .then((response) => {
        setLivros(aleatorio(response.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getEditoras();
    getLivros();
  }, []);

  function aleatorio(array) {
    let i = array.length;
    let j = 0;
    let newArray = array;

    if (array.length >= 10) {
      while (i != 0) {
        j = Math.floor(Math.random() * i);
        i--;
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      let final = newArray.splice(0, 10);
      return final;
    } else {
      return array;
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        {isLoading ? (
          <View style={styles.loadingPage}>
            <Text style={styles.loading}>Loading...</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Editoras");
              }}
            >
              <Text style={styles.title}>Editoras</Text>
            </TouchableOpacity>
            <View>
              <FlatList
                data={editoras}
                renderItem={({ item }) => <Editora item={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <TouchableOpacity onPress={()=>{
              navigation.navigate("Livros")
            }}>
            <Text style={styles.title}>Livros</Text>
            </TouchableOpacity>
            <View>
              <FlatList
                data={livros}
                renderItem={({ item }) => <Livro item={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
    paddingTop: 20,
  },
  itemEditora: {
    height: 150,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 10,
    textAlign: "center",
  },
  editora: {
    width: 100,
    height: 100,
  },
  itemLivro: {
    width: 170,
    height: 260,
    marginVertical: 20,
    marginHorizontal: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  livro: {
    width: 165,
    height: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fcbc5c",
    marginHorizontal: 10,
  },
  itemDestaque: {
    width: "80%",
    height: 300,
    backgroundColor: "black",
    marginHorizontal: "10%",
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  destaque: {
    width: "100%",
    height: 200,
  },
  titleItem: {
    fontSize: 15,
    color: "white",
  },
  loadingPage: {
    width: "100%",
    display: "flex",
  },
  loading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fcbc5c",
    textAlign: "center",
    marginHorizontal: 10,
    marginVertical: 200,
  },
});
