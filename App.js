import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

const getData = () => {
  const url =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=AIzaSyC0U9QWdWNITVbiO5NrgnkKPqMc1rxt4eI";

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let videos = [];

      json.items.forEach((video) => {
        let result = {
          title: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
          thumbnail: video.snippet.thumbnails.default,
        };
        videos.push(result);
      });

      return videos;
    })
    .catch((e) => console.log(e));
};

function sortVideos(setArray, setSearching, array, searchTerm) {
  let newArray = array.filter((item) => item.title.includes(searchTerm));
  setSearching(false);
  setArray(newArray);
}

export default function App() {
  const searchIcon = require("./assets/search.png");
  const arrowIcon = require("./assets/confirm.png");
  const data = [
    { title: "Title Two", channelTitle: "Channel" },
    { title: "Title Two", channelTitle: "Channel" },
    { title: "Title One", channelTitle: "Channel" },
  ];
  const [array, setArray] = useState([]);
  const [searching, setSearching] = useState(false);

  let searchText = "";

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "10%",
          width: "100%",
          alignItems: "flex-end",
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {!searching ? (
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>Youtube</Text>
        ) : (
          <Image
            style={{ height: 20, width: 20 }}
            source={require("./assets/close.png")}
          />
        )}
        {searching ? (
          <TextInput
            onChangeText={(text) => (searchText = text)}
            style={{ fontSize: 15, height: 15, alignSelf: "flex-end" }}
            placeholder="Search"
          />
        ) : null}
        <TouchableOpacity
          onPress={() => {
            !searching
              ? setSearching(true)
              : sortVideos(setArray, setSearching, array, searchText);
          }}
        >
          <Image
            source={!searching ? searchIcon : arrowIcon}
            style={{ height: 25, width: 30 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ height: "90%", width: "100%" }}>
        {array.length < 1 ? (
          <Button title="Load Feed" onPress={() => setArray(data)} />
        ) : (
          <FlatList
            data={array}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{
                      height: 220,
                      width: "100%",
                      backgroundColor: "black",
                    }}
                  />

                  <View style={{ padding: 13 }}>
                    <Text style={{ fontSize: 22 }}>{item.title}</Text>
                    <Text style={{ fontSize: 14, color: "grey" }}>
                      {item.channelTitle}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
