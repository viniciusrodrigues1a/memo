import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";

const DownTriangleImg = require("../assets/down-triangle.png");

export default function Home() {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.header}>
        <TouchableOpacity style={headerStyles.filterButton}>
          <Text style={headerStyles.filterText}>All memos</Text>
          <Image source={DownTriangleImg} style={headerStyles.filterImage} />
        </TouchableOpacity>
        <View style={headerStyles.options}>
          <TouchableOpacity style={headerStyles.optionButton}>
            <Text style={headerStyles.optionText}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[headerStyles.optionButton, { marginLeft: 18 }]}
          >
            <Text style={headerStyles.optionText}>MORE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        data={[
          {
            name: "My new board",
            statuses: [
              { name: "todo", color: "#FF3300" },
              { name: "doing", color: "#FFB300" },
              { name: "done", color: "#95FF00" },
            ],
          },
          {
            name: "My second new board",
            statuses: [
              { name: "todo", color: "#FF3300" },
              { name: "doing", color: "#FFB300" },
              { name: "done", color: "#95FF00" },
            ],
          },
          {
            name: "My third new board",
            statuses: [
              { name: "todo", color: "#FF3300" },
              { name: "doing", color: "#FFB300" },
              { name: "done", color: "#95FF00" },
            ],
          },
        ]}
        renderItem={({ item }) => (
          <View style={boardStyle.container}>
            <Text style={boardStyle.title}>{item.name}</Text>

            <View style={boardStyle.statusesView}>
              {item.statuses.map((status) => (
                <View style={boardStyle.statusView}>
                  <View
                    style={[
                      boardStyle.statusCircle,
                      { backgroundColor: status.color },
                    ]}
                  />

                  <View style={boardStyle.statusTextView}>
                    <View style={boardStyle.statusTextSmallerView}>
                      <Text style={boardStyle.statusTextSmaller}>
                        {status.name.toUpperCase()}:{" "}
                      </Text>
                    </View>
                    <View>
                      <Text style={boardStyle.statusText}>7</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#067C69",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterButton: { flexDirection: "row", alignItems: "center" },
  filterText: { fontSize: 20, color: "#dddddd" },
  filterImage: { marginLeft: 8, marginTop: 2, width: 12, height: 12 },
  options: { flexDirection: "row" },
  optionButton: {},
  optionText: { fontSize: 16, color: "#dddddd", letterSpacing: 0.8 },
});

const boardStyle = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    margin: 16,
    borderRadius: 8,
    shadowColor: "#222222",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  title: {
    color: "#222222",
    fontSize: 26,
  },
  statusesView: {
    marginTop: 18,
  },
  statusView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusCircle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    alignSelf: "center",
  },
  statusTextView: {
    flexDirection: "row",
    marginLeft: 8,
  },
  statusText: {
    fontSize: 22,
  },
  statusTextSmallerView: {
    alignSelf: "center",
  },
  statusTextSmaller: {
    fontSize: 18,
    color: "#777777",
  },
});
