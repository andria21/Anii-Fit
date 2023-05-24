import React, { createContext, useState } from "react";

export const ShareContext = createContext();

export const ShareContextProvider = ({ children }) => {
    const [share, setShare] = useState([]);

    const add = (item) => {
        setShare([...share, item]);
    };

    const remove = (item) => {
        // const newShare = share.filter(
        //     (x) => x.placeId !== item.placeId
        // );

        const a = share.filter(
            x => x !== item
        );

        setShare(a);
    };

    return (
        <ShareContext.Provider value={{
            share,
            addToShare: add,
            removeFromShare: remove,
        }}>
        {children}
        </ShareContext.Provider>
    );
};