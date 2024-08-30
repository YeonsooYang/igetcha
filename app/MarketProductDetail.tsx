//app/MarketProductDetailScreen.tsx
import HeaderLeftButton from "@/components/HeaderLeftButton";
import { GRAY, PRIMARY, WHITE } from "@/constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const MarketProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const canGoBack = navigation.canGoBack();
  const { product } = route.params;

  // 기본값 설정
  const defaultProduct = {
    id: "0",
    productImg: "https://via.placeholder.com/300",
    title: "상품 없음",
    writerId: "null",
    content: "상세 정보를 찾을 수 없습니다.",
    writeDate: "", // 기본값 설정
  };

  // 전달된 상품 정보가 없으면 기본값 사용
  const currentProduct = product || defaultProduct;

  return (
    <>
      {/* 상단에 뒤로가기 버튼 추가 */}
      <View style={styles.header}>
        <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
        <Text style={styles.headerTitle}>상품 상세</Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{currentProduct.title}</Text>
          <Image
            style={styles.image}
            source={{ uri: currentProduct.productImg }}
          />
          <Text style={styles.writer}>{currentProduct.writerId}</Text>
          <Text style={styles.writeDate}>{currentProduct.writeDate}</Text>
          <Text style={styles.description}>{currentProduct.content}</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 90, // 고정된 높이
    paddingTop: 40, // 고정된 상단 여백
    paddingHorizontal: 10,
    backgroundColor: PRIMARY.DEFAULT,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: WHITE,
    textAlign: "center",
    flex: 1, // 제목이 가능한 공간을 차지하도록 설정
    marginLeft: -15, // 버튼과 텍스트 간의 간격 조절
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 20,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 200, // 고정된 높이로 조정
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  writer: {
    fontSize: 12,
    textAlign: "right",
    color: GRAY.DARK,
    marginBottom: 10,
  },
  writeDate: {
    fontSize: 12,
    textAlign: "right",
    color: GRAY.DARK,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
  },
});

export default MarketProductDetailScreen;