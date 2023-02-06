import React from "react";
import {View, FlatList} from "react-native";
import feed from '../../../assets/data/feed';
import Post from '../Post';

const SearchResults = (props) => {
    return (
        <View>
            <FlatList data={feed} renderItem={({item}) => <Post post={item} /> } />

        </View>
    )
};

export default SearchResults;
