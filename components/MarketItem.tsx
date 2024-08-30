//app/components/MarketItem.tsx
import { memo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BLACK, GRAY, PRIMARY } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { DummyPost } from "./DummyPost";

const MarketItem = memo(
  ({
    item,
    toggleScrab,
  }: {
    item: {
      id: string;
      productImg: string;
      title: string;
      writerId: string;
      writeDate: string;
      content: string;
      isScrab: boolean;
    };
    toggleScrab: (id: string) => void;
  }) => {
    const [isScrab, setIsScrab] = useState(item.isScrab);
    //스크랩용 별모양 아이콘
    const scrabProps = {
      name: item.isScrab ? "star" : "star-outline",
      color: "#ffc939", //노란색
      size: 20,
    };
    const onPressScrab = () => {
      toggleScrab(item.id); // 부모에서 전달된 함수 호출
      setIsScrab((prevState) => !prevState); // 로컬 상태 업데이트
    };

    const navigation = useNavigation();
    const onPressProduct = (id: string) => {
      const product = DummyPost.find((item) => item.id === id);
      if (product) {
        navigation.navigate("MarketProductDetailScreen", { product });
      }
    };

    return (
      <Pressable onPress={() => onPressProduct(item.id)}>
        <View style={{ flexDirection: "column-reverse" }}>
          <View style={styles.container}>
            <Image
              source={{ uri: item.productImg }}
              style={styles.productImg}
            />
            <View style={styles.contentContainer}>
              <Text style={styles.contentTitle}>{item.title}</Text>
              <Text style={styles.contentWriter}>{item.writerId}</Text>
              <Text style={styles.content} numberOfLines={3}>
                {item.content}
              </Text>
              <Text style={styles.contentDate}>{item.writeDate}</Text>
            </View>
            <View>
              <Pressable onPress={() => toggleScrab(item.id)} hitSlop={10}>
                <MaterialCommunityIcons {...scrabProps} />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }
);
MarketItem.displayName = "MarketItem";

MarketItem.propTypes = {
  item: PropTypes.shape({
    productImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    writerId: PropTypes.string,
    writeDate: PropTypes.string,
    content: PropTypes.string.isRequired,
    isScrab: PropTypes.bool,
  }).isRequired,
  toggleScrab: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  //전체 컨테이너(이미지와 글영역과 별표)
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  productImg: {
    width: "30%",
    height: "100%",
    marginRight: 20,
  },

  //글영역 컨테이너
  contentContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  contentWriter: {
    fontSize: 10,
    color: "#5d6877",
    marginTop: 2,
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: BLACK,
    lineHeight: 18,
    minHeight: 18 * 3,
  },
  contentDate: {
    fontSize: 10,
    textAlign: "right",
    color: GRAY.DEFAULT,
    marginTop: 5,
  },
});

export default MarketItem;
