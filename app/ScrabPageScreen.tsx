// app/ScrabPageScreen.tsx

import { DummyPost } from "@/components/DummyPost";
import HeaderLeftButton from "@/components/HeaderLeftButton";
import MarketItem from "@/components/MarketItem";
import { PRIMARY, WHITE } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const ScrabPageScreen = () => {
  const Separator = () => {
    return <View style={styles.separator}></View>;
  };

  const [dummyPosts, setDummyPosts] = useState(DummyPost);
  const [filteredLists, setFilteredLists] = useState<any[]>([]);

  const updateDummyPosts = () => {
    // DummyPost를 새로 받아오는 로직
    setDummyPosts(DummyPost); // 실제로는 API 호출 등을 사용해야 합니다
  };

  useFocusEffect(
    useCallback(() => {
      updateDummyPosts();
    }, [])
  );

  // 데이터 필터링
  useEffect(() => {
    const filteredData = dummyPosts.filter((item) => item.isScrab === true);
    setFilteredLists(filteredData);
  }, [dummyPosts]);

  // 스크랩 상태 토글 함수
  const toggleScrab = (id: string) => {
    setDummyPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, isScrab: !post.isScrab } : post
      )
    );
  };

  const navigation = useNavigation();
  // 현재 화면이 뒤로 가기 가능한지 여부를 확인
  const canGoBack = navigation.canGoBack();

  return (
    <>
      <View style={styles.header}>
        <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
        <Text style={styles.headerTitle}>즐겨찾기</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            ItemSeparatorComponent={Separator}
            data={filteredLists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <MarketItem item={item} toggleScrab={toggleScrab} />;
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 10,
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 80, // 고정된 높이
    paddingTop: 30, // 고정된 상단 여백
    paddingHorizontal: 10,
    backgroundColor: '#ff6b6b',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: WHITE,
    textAlign: "center",
    flex: 1, // 제목이 가능한 공간을 차지하도록 설정
    marginLeft: -15, // 버튼과 텍스트 간의 간격 조절
  },
  separator: {
    height: 1,
    backgroundColor: PRIMARY.DEFAULT,
    margin: 10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    borderTopColor: PRIMARY.DEFAULT,
    borderTopWidth: 3,
    paddingTop: 10,
  },
});

export default ScrabPageScreen;
