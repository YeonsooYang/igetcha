//app/(tabs)/MarketScreen.tsx
import ButtonContainer from "@/components/ButtonContainer";
import { DummyPost } from "@/components/DummyPost";
import FloatingButton from "@/components/FloatingButton";
import HeaderLeftButton from "@/components/HeaderLeftButton";
import MarketItem from "@/components/MarketItem";
import { PRIMARY, WHITE } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

const MarketScreen = () => {
  //글목록 구분선
  const Separator = () => {
    return <View style={styles.separator}></View>;
  };

  const [search, setSearch] = useState(""); // 검색어 지정
  const [filter, setFilter] = useState("integrate"); // 필터 상태(검색 필터랑 버튼 필터 두 가지 존재)
  const [filteredLists, setFilteredLists] = useState<any[]>(); // 검색 및 필터링된 데이터

  // 검색어 업데이트 함수
  const updateSearch = (search: string) => {
    setSearch(search);
  };

  // 필터 변경 함수
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  //기존데이터
  const [allProducts, setAllProducts] = useState<any[]>(DummyPost);
  const route = useRoute();
  const newProduct = route.params?.newProduct;

  //받아온 데이터 추가.
  useEffect(() => {
    if (newProduct) {
      setAllProducts((prevProducts) => [...prevProducts, newProduct]);
    }
  }, [newProduct]);

  // 데이터 필터링
  useEffect(() => {
    //내부 필터링을 위한 함수들
    // 1) 버튼 기반 필터링
    const filteredByCategory = allProducts.filter(
      (product) => filter === "integrate" || product.category === filter
    );

    // 2) 검색어 기반 필터링
    const filteredBySearch = filteredByCategory.filter((product) =>
      [product.title, product.content].some((text) =>
        text.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredLists(filteredBySearch.reverse());
  }, [search, filter, allProducts]);

  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  return (
    <>
      {/* 상단에 뒤로가기 버튼 추가 */}
      <View style={styles.header}>
        <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
        <Text style={styles.headerTitle}>장터</Text>
      </View>

      <View style={styles.container}>
        {/* 검색창 부분 컨테이너 */}
        <View style={styles.searchBarContainer}>
          <MaterialIcons
            name="search"
            style={{
              position: "absolute",
              top: 12,
              left: 10,
              fontSize: 30,
              color: PRIMARY.DEFAULT,
            }}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="검색어를 입력해 주세요"
            onChangeText={updateSearch}
          />
        </View>
        {/**버튼 컨테이너*/}
        <ButtonContainer onFilterChange={handleFilterChange} />

        {/**작성글목록 */}
        <View style={styles.listContainer}>
          <FlatList
            ItemSeparatorComponent={Separator}
            data={filteredLists}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => {
              return <MarketItem item={item} />;
            }}
          />
        </View>
        <FloatingButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: WHITE,
  },
  searchBarContainer: {
    width: "100%",
    flexDirection: "row",
  },
  searchBar: {
    paddingHorizontal: 40,
    width: "100%",
    height: 50,
    backgroundColor: WHITE,
    borderColor: PRIMARY.DEFAULT,
    borderRadius: 50,
    borderWidth: 1,
  },
  separator: {
    height: 1,
    backgroundColor: PRIMARY.DEFAULT,
    marginVertical: 5,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    borderTopColor: PRIMARY.DEFAULT,
    borderTopWidth: 1,
    paddingTop: 10,
  },
});

export default MarketScreen;
