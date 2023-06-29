import React, { createContext, useState } from "react";
import { getValueFor } from "../services/DataServices";

export const FavCartContext = createContext({});

export const FavCartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState(0);
  const [favoritos, setFavoritos] = useState([]);

  async function getFavoritos() {
    let fav = await getValueFor("fav");
    if (fav !== null && fav !== undefined) {
      fav = JSON.parse(fav);
      setFavoritos(fav);
    } else {
      setFavoritos(0);
    }
  }

  async function getCarrinho() {
    let cart = await getValueFor('cart');
    cart = JSON.parse(cart);
    if (cart !== null && cart !== undefined) {
        let total = 0
        cart.forEach(item => {
          total += item.qtd;
        })
        setCarrinho(total);
    } else {
        setCarrinho(0);
    }
  }

  return (
    <FavCartContext.Provider
      value={{
        favoritos,
        getFavoritos,
        carrinho,
        getCarrinho
      }}
    >
      {children}
    </FavCartContext.Provider>
  );
};
