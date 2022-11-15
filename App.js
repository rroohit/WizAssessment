"use strict";
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  ImageBackground
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    const url =
      "https://api.unsplash.com/photos/random/?count=20&&client_id=fsVRpa3z4l9Mb93NLcJSCwLlKZYMgUdJs33D3FXdF6U";
    fetch(url).then(response => response.json()).then(responseJson => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      });
    });
  }

  onclick_item(item) {
    this.props.navigation.navigate("DetailsScreen", { item });
  }

  onclick_search(item) {
    this.props.navigation.navigate("SearchScreen", { item });
  }

  _renderImageItem = ({ item }) =>
    <TouchableOpacity onPress={() => this.onclick_item(item)}>
      <Image
        style={styles.imageItem}
        source={{
          uri: item.urls.small
        }}
      />
    </TouchableOpacity>;

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#242222" barStyle={"light-content"} />
        <View>
          <Text style={styles.sectionTitle}>Unsplash</Text>
          <Text style={styles.sectionTitleTwo}>Wallpapers</Text>

          <View style={styles.searchBox}>
            <Text
              onPress={() => this.onclick_search(this.state.dataSource)}
              style={styles.searchInput}
              color="#3B3B3B"
            >
              Search
            </Text>
          </View>

          <FlatList
            style={{ marginBottom: 210, marginTop: 38 }}
            data={this.state.dataSource}
            renderItem={this._renderImageItem}
            keyExtractor={(item, index) => index}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
    );
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DetailsScreen({ route, navigation }) {
  const { item } = route.params;

  

  return (
    <ImageBackground
      source={{ uri: item.urls.small }}
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <View style={styles.backBtn}>
          <Image
            source={require("./assets/images/back-arrow.png")}
            fadeDuration={0}
            style={{ width: 25, height: 40 }}
          />
        </View>
      </TouchableOpacity>
      
      <View style={styles.userAvatar}>
        <Image
          source={{ uri: item.user.profile_image.medium }}
          fadeDuration={0}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </View>
      <View style={styles.ctaText}>
        <Text style={styles.sectionTitleThree}>SET AS WALLPAPER</Text>
      </View>
      <View style={styles.userName}>
        <Text style={styles.sectionUsername}>
          {item.user.first_name + " " + item.user.last_name}
        </Text>
      </View>
      <View style={styles.userFollowers}>
        <Text style={styles.sectionUserFollowers}>Photographer followers</Text>
      </View>
    </ImageBackground>
  );
}

class SearchScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    const url =
      "https://api.unsplash.com/photos/random/?count=20&&client_id=fsVRpa3z4l9Mb93NLcJSCwLlKZYMgUdJs33D3FXdF6U";
    fetch(url).then(response => response.json()).then(responseJson => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      });
    });
  }

  onclick_item(item) {
    this.props.navigation.navigate("DetailsScreen", { item });
  }

  _renderImageItem = ({ item }) =>
    <TouchableOpacity onPress={() => this.onclick_item(item)}>
      <Image
        style={styles.imageItem}
        source={{
          uri: item.urls.small
        }}
      />
    </TouchableOpacity>;

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#101010" }}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInputTwo}
            placeholder="Search"
            placeholderTextColor="#3B3B3B"
          />
        </View>

        <FlatList
          style={{ flex: 1, marginTop: 20 }}
          data={this.state.dataSource}
          renderItem={this._renderImageItem}
          keyExtractor={(item, index) => index}
          numColumns={2}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 40,
    fontWeight: "light",
    color: "white",
    paddingTop: 30,
    paddingStart: 20,
    fontFamily: "open-sans-light"
  },
  sectionTitleTwo: {
    fontSize: 40,
    color: "white",
    paddingTop: 2,
    paddingStart: 20,
    fontFamily: "open-sans-extrabold"
  },
  sectionTitleThree: {
    fontSize: 12,
    color: "white",
    paddingTop: 2,
    paddingStart: 20,
    fontFamily: "open-sans-extrabold"
  },
  sectionUsername: {
    fontSize: 16,
    color: "white",
    paddingTop: 2,
    paddingStart: 0,
    fontFamily: "open-sans-light"
  },
  sectionUserFollowers: {
    fontSize: 10,
    color: "white",
    paddingTop: 2,
    paddingStart: 0,
    fontFamily: "open-sans-light"
  },

  highlight: {
    fontWeight: "700"
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#101010"
  },
  searcInput: {
    flex: 1,
    backgroundColor: "#1F1F1F"
  },
  searchBox: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    borderRadius: 7,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    backgroundColor: "#191919"
  },
  searchInput: {
    flex: 1,
    height: 50,
    marginStart: 20,
    color: "#3B3B3B",
    textAlignVertical: "center"
  },
  searchInputTwo: {
    flex: 1,
    height: 50,
    marginStart: 20,
    color: "white",
    textAlignVertical: "center"
  },
  imageItem: {
    flex: 1,
    width: 189,
    height: 328,
    margin: 10,
    borderRadius: 6
  },
  imageItemTwo: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  ctaText: {
    position: "absolute",
    top: 22,
    left: "60%",
    right: 0,
    bottom: 0
  },
  userName: {
    position: "absolute",
    top: "92%",
    left: "15%",
    right: 0,
    bottom: 0
  },
  userFollowers: {
    position: "absolute",
    top: "95%",
    left: "15%",
    right: 0,
    bottom: 0
  },
  backBtn: {
    width: 21,
    height: 21,
    top: 10,
    left: "5%",
    right: 0,
    bottom: 0
  },
  userAvatar: {
    width: 40,
    height: 40,
    top: "90%",
    left: "2%",
    right: 0,
    bottom: 0
  }
});
