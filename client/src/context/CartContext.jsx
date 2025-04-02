// "use client"
// import { createContext, useContext, useState } from "react";


// const [cart, setCart] = useState([]);
// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
  
// };

// const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
// };

// return (
//     <CartContext.Provider value={{ cart, addToCart}}>
//       {children}
//     </CartContext.Provider>
//  );

// export const useCart = () => useContext(CartContext);

// "use client";
// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();


// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]); 


//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// export const useCart = () => {
//   return useContext(CartContext);
// };

"use client";
import { createContext, useContext, useState } from "react";

// Création du contexte
const CartContext = createContext();

// Fournisseur du panier
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const generateKey = (product) => `${product.title}-${product.price}-${product.image}`;

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productKey = generateKey(product);
      const existingItem = prevCart.find((item) => item.key === productKey);
  
      if (existingItem) {
        return prevCart.map((item) =>
          item.key === productKey
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, totalPrice: product.price, key: productKey }];
      }
    });
  };
  
  
 
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  
    
  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === product.id);
  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     } else {
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     }
  //   });
  // };

  // Modifier la quantité d’un article
  const updateQuantity = (key, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.max(1, quantity), totalPrice: Math.max(1, quantity) * item.price }
          : item
      )
    );
  };
  
  

  // Supprimer un article
  const removeFromCart = (key) => {
    setCart((prevCart) => prevCart.filter((item) => item.key !== key));
  };
  



  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé
export const useCart = () => useContext(CartContext);