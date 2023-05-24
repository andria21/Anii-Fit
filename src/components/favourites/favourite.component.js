import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ShareContext } from "../../services/share/share.context";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const FavouriteButton = styled(TouchableOpacity)`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 9;
`;

export const Favourite =(item) => {
    const { share, addToShare, removeFromShare } = useContext(ShareContext);

    const isFavourite = share.find((r) => r.placeId === item.placeId);

    return (
        <FavouriteButton
            onPress={() => !isFavourite ? addToShare(item) : removeFromShare(item)}
        >
            <AntDesign 
                name={
                    isFavourite ? "heart" : "hearto"
                }
                size={27}
                color={
                    isFavourite ? "red" : "white"
                }
            />
        </FavouriteButton>
    );
};