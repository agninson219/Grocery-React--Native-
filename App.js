import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Item,
} from "native-base";

export default function App() {
  const [search, setSearch] = useState(" ");

  const updateSearch = () => {
    setSearch(search);
  };

  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [fText, setfText] = useState("");

  const newfItems = items.filter((item) =>
    item.toLocaleLowerCase().includes(fText)
  );

  const itemsToDisplay = fText ? newfItems : items;

  // const onFormChange = (event) => {
  //   setFormValue(event.target.value);
  // };

  const onSubmit = () => {
    if (!text) {
      Alert.alert("Opps!!", "Please add the items", [
        {
          text: "Understood",
          onPress: () => console.log("alert due to no items "),
        },
      ]);
    } else {
      setItems([...items, text]);
      setText(null);
      Alert.alert("Finally!!", "Your items has been added", [
        {
          text: "Understood",
          onPress: () => console.log("alert after the alert "),
        },
      ]);
    }
  };

  const deleteItem = (id) => {
    const updatedItem = items.filter((element, index) => {
      return index !== id;
    });

    setItems(updatedItem);
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.Header}>
        <Left>
          <Button transparent>
            <Icon
              name="arrow-left"
              size={22}
              style={{ marginLeft: 10 }}
              color="#000"
            />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "#000" }}>UrbanBasket</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => onSubmit()}>
            <Icon name="plus-square" size={23} color="#000" />
          </Button>
        </Right>
      </Header>

      <View style={styles.search}>
        <TextInput
          style={styles.textInput}
          placeholder="Search here..."
          size="lg"
          onChangeText={(e) => {
            setfText(e.toLocaleLowerCase());
          }}
        />
      </View>
      {/* <SearchDropDown /> */}

      <View className="items">
        {!newfItems.length && (
          <Text>There are currently no items to display</Text>
        )}
        {itemsToDisplay.map((element, index) => {
          return (
            <ScrollView>
              <View style={styles.eachItem} key={index}>
                <Text>{element}</Text>

                {/* eslint-disable-next-line react/self-closing-comp */}

                <Icon
                  name="trash"
                  size={20}
                  onPress={() => deleteItem(index)}
                />
              </View>
            </ScrollView>
          );
        })}
      </View>

      <KeyboardAvoidingView
        behaviour={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Add your items here"
          maxLength={100}
          value={text}
          onChangeText={setText}
        />
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignContent: "center",
    // justifyContent: "center",
    backgroundColor: "#ECF0F1",
    fontFamily: "Roboto_medium",
  },

  // textStyle: {
  //   textAlign: "center",
  //   marginBottom: 8,
  // },
  Header: {
    backgroundColor: "#ffffff",
  },
  search: {
    marginTop: 20,
    marginLeft: 80,
    marginBottom: -120,
    height: "23%",
  },
  textInput: {
    width: "80%",
    borderRadius: 20,
    backgroundColor: "#d4d4d4",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  Item: {
    marginTop: 30,
    marginLeft: 20,
    fontFamily: "Roboto",
    fontSize: 100,
  },
  iTexts: {
    fontFamily: "Roboto",
    fontSize: 100,
  },
  writeTaskWrapper: {
    marginTop: 400,
    flex: 1,
    backgroundColor: "#d4d4d4",
    height: 10,
    paddingLeft: 10,
  },
  input: {
    height: 40,
  },
  eachItem: {
    marginTop: 10,
  },
});
