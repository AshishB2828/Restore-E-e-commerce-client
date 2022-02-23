import { useState } from "react";
import { createContext, useContext } from "react";


export const StoreContext = createContext();

export const useStoreContext =()=>{

    const context = useContext(StoreContext);
    if(context === undefined){
        throw Error("Oops - we do not seems to be inside the provider");
    }
    return context;
}

export function StoreProvider({children}){

    const [basket, setBasket] = useState(null);

    const removeItem =(productId, quantity)=>{
        if(!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex( i=> i.productId === productId);

        if(itemIndex >= 0){
            items[itemIndex].quantity -=quantity;
            if(items[itemIndex].quantity === 0) items.splice(itemIndex,1);
            setBasket(prevState => {
                return {
                    ...prevState, items
                }
            })
        }
    }

    return(
        <StoreContext.Provider
            value={{
                basket,
                setBasket,
                removeItem
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}