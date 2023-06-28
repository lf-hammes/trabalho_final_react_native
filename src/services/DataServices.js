import * as SecureStore from "expo-secure-store";

export async function save(key, value) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
  item = await getValueFor(key);
}

export async function increment(key, value) {
  let dadosAtuais = null;
  let newArray = [];
  try {
    dadosAtuais = await getValueFor(key);
    dadosAtuais = JSON.parse(dadosAtuais);
    if (dadosAtuais !== null && dadosAtuais !== undefined) {
      newArray = dadosAtuais;
      let check = true;
      newArray.forEach((item) => {
        if (value === item) {
          check = false;
        }
      });
      if (check) {
        newArray.push(value);
        await save(key, newArray);
      }
    } else {
      newArray.push(value);
      await save(key, newArray);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function decrement(key, value) {
  let dadosAtuais = null;
  let newArray = [];
  try {
    dadosAtuais = await getValueFor(key);
    dadosAtuais = JSON.parse(dadosAtuais);
    if (dadosAtuais !== null && dadosAtuais !== undefined) {
      newArray = dadosAtuais;
      newArray = newArray.filter((dado) => dado !== value);
      await save(key, newArray);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getValueFor(key) {
  let result = null;
  try {
    result = await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function deleteValueFor(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
}

export async function check(key, value) {
  let check = false;
  try {
    var item = await getValueFor(key);
    if (JSON.parse(item) != null && JSON.parse(item) != undefined) {
      JSON.parse(item).forEach((el) => {
        if (el == value) {
          check = true;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  return check;
}

export async function incrementCart(key, value) {
  let dadosAtuais = null;
  let newArray = [];
  try {
    dadosAtuais = await getValueFor(key);
    dadosAtuais = JSON.parse(dadosAtuais);
    if (dadosAtuais !== null && dadosAtuais !== undefined) {
      newArray = dadosAtuais;
      let check = true;
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id == value) {
          newArray[i].qtd += 1;
          check = false;
        }
      }
      if (check) {
        var obj = {
          id: value,
          qtd: 1,
        };
        newArray.push(obj);
      }
      save(key, newArray);
    } else {
      obj = {
        id: value,
        qtd: 1,
      };
      newArray.push(obj);
      await save(key, newArray);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function decrementCart(key, value) {
  let dadosAtuais = null;
  let newArray = [];
  try {
    dadosAtuais = await getValueFor(key);
    dadosAtuais = JSON.parse(dadosAtuais);
    newArray = dadosAtuais;
    if (dadosAtuais !== null && dadosAtuais !== undefined) {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id == value) {
          newArray[i].qtd -= 1;
          if (newArray[i].qtd == 0) {
            newArray = newArray.filter((item) => item.id != value);
          }
        }
      }
      save(key, newArray);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function removeItenCart(key, value) {
  let dadosAtuais = null;
  let newArray = [];
  try {
    dadosAtuais = await getValueFor(key);
    dadosAtuais = JSON.parse(dadosAtuais);
    newArray = dadosAtuais;
    if (dadosAtuais !== null && dadosAtuais !== undefined) {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id == value) {
          newArray = newArray.filter((item) => item.id != value);
        }
      }
      save(key, newArray);
    }
  } catch (error) {
    console.log(error);
  }
}
