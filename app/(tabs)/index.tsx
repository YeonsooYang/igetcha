// app/(tabs)/index.tsx

// import "@/assets/fonts/font.css"
import { BLACK, GRAY, PRIMARY, WHITE } from "@/constants/Colors";
import UserContext from "@/contexts/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

// 화면 크기에 따라 동적으로 스타일을 생성하는 훅
const useDynamicStyles = () => {
  const { width: windowWidth } = useWindowDimensions();
  const btnWidth = windowWidth / 3 - 10;

  return StyleSheet.create({
    imageWrapper: {
      width: windowWidth,
      height: 300, // 배너의 높이를 설정
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      
    },
    imageBox: {
      width: btnWidth,
      height: btnWidth + 40,
      //padding: 5,
      alignItems: 'center',
      //borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      marginRight: 5,

    },
    image: {
      width: '100%',
      height: btnWidth,
      //borderRadius: 10,
    },
    adImage: { 
      width: '100%', // 배너의 전체 너비를 채우도록 설정
      height: '100%', // 배너의 전체 높이를 채우도록 설정
      borderRadius: 10,
    },
    pagination: {
      position: 'absolute',
      bottom: 10,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    dotContainer: {
      flexDirection: 'row',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'white',
      margin: 2,
    },
    activeDot: {
      backgroundColor: '#ff6b6b',
    },
  });
};


const Index = () => {
  const dynamicStyles = useDynamicStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation();

  //const {state} = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const route = useRoute();

  useEffect(() => {
    if (route.params?.newProduct) {
      const { newProduct } = route.params;
      setProducts(prevProducts => [...prevProducts, newProduct]);
    }
  }, [route.params?.newProduct]);

  const navigateToAddProduct = () => {
    navigation.navigate('AdminAddProductScreen');
  };

  const images = [
    "https://i.ibb.co/sHZpQgB/8.png",
    "https://i.ibb.co/6BrXdZj/Kakao-Talk-20240813-143501317.png",
    "https://i.ibb.co/wgHsRHR/Kakao-Talk-20240813-143959838.png",
    "https://i.ibb.co/ZftRRwf/Kakao-Talk-20240813-144246976.png",
    "https://i.ibb.co/nLZP7ZJ/Kakao-Talk-20240813-144450756.png",
    "https://i.ibb.co/XxK5mhP/Kakao-Talk-20240813-142554877.png",

  ];

  const [products, setProducts] = useState([
    { id: '1', uri: "https://i.ibb.co/0JY2p14/Kakao-Talk-20240813-142312056.png", name: "꾸벅 포켓몬", description: "꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 꾸벅꾸벅 조는 포켓몬 " },
    { id: '2', uri: "https://i.ibb.co/ccXv7n9/Kakao-Talk-20240813-141931156.png", name: "허무 고양이", description: "허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 허무에 빠진 고양이 " },
    { id: '3', uri: "https://i.ibb.co/n13NPp7/Kakao-Talk-20240813-142012889.png", name: "낚시하는 고양이", description: "낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이 낚시가 취미인 고양이" },
    { id: '4', uri: "https://i.ibb.co/2cSNvDb/Kakao-Talk-20240813-142046815.png", name: "아기 굴", description: "아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 아기 굴을 입양하세요 " },
    { id: '5', uri: "https://i.ibb.co/QpNRFDr/Kakao-Talk-20240813-142247979.png", name: "목욕", description: "목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 목욕하는 동물 친구들을 만나요 " },
    { id: '6', uri: "https://i.ibb.co/cLmYVyp/feed-Example3.png", name: "찹쌀떡 귀신", description: "찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄 찹쌀떡 귀신 2탄" },
    { id: '7', uri: "https://i.ibb.co/HN7tgF1/Kakao-Talk-20240814-100839921.png", name: "짱구X산리오", description: "짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 짱구와 한교동의 만남 " },
    { id: '8', uri: "https://i.ibb.co/YftVzJ5/Kakao-Talk-20240814-101250896.png", name: "고양이 받침대", description: "유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 유니크한 고양이 받침대 " },

    
  ]);

  // 상품 상세 페이지로 이동하는 함수
  const navigateToDetail = (id: string) => {
    const product = products.find(item => item.id === id);
    if (product) {
      navigation.navigate("ProductDetailScreen", { product });
    }
  };

    // 자동 슬라이드 기능
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000);
  
      return () => clearInterval(timer);
    }, [images.length]);
  
    // 현재 화면에 보이는 아이템을 기준으로 인덱스 업데이트
    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    }).current;

    const handleScroll = ({ nativeEvent }) => {
      const contentOffsetX = nativeEvent.contentOffset.x;
      const contentWidth = nativeEvent.contentSize.width;
      const viewportWidth = nativeEvent.layoutMeasurement.width;
  
      // 마지막 이미지에서 스크롤할 때 마지막 이미지를 잠시 멈추도록 처리
      if (contentOffsetX + viewportWidth >= contentWidth - 1) {
        if (currentIndex === images.length - 1) {
          // 마지막 이미지에서 2초 동안 대기 후 첫 이미지로 이동
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: 0, animated: false });
          }, 2000); // 대기 시간 (밀리초)
        }
      }
    };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  const renderImage = ({ item, index }: { item: string, index: number }) => (
    <View style={dynamicStyles.imageWrapper}>
      <Image
        source={{ uri: item }}
        style={[dynamicStyles.adImage]}
        resizeMode="cover"
      />
      <View style={dynamicStyles.pagination}>
        <View style={dynamicStyles.dotContainer}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                dynamicStyles.dot,
                i === currentIndex && dynamicStyles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <>
    <View style={styles.top}>
      <View>
        <Text style={styles.topText}>iGetcha</Text>
      </View>
          {/* 상단에 로그인 버튼 */}
          <View style={styles.topButtonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? PRIMARY.DEFAULT : PRIMARY.DEFAULT }, // PRIMARY.DARK와 PRIMARY.DEFAULT를 예시로 설정
              ]}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <MaterialCommunityIcons name="account" size={24} color="#fff" style={{left: 0}} />
            </Pressable>
          </View>
        </View>
    <ScrollView>
      <View style={styles.container}>
        

        <View style={styles.ad}>
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={windowWidth}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            onScroll={handleScroll}  // 스크롤 핸들러 추가
          />
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.newText}>New!</Text>
          {isLoggedIn && (               
            <TouchableOpacity style={styles.button}
              // style={({ pressed }) => [
              //   styles.button,
              //   { backgroundColor: pressed ? '#e6e6e6' : WHITE },
              // ]}
              onPress={navigateToAddProduct}
            >
              <Text style={styles.buttonText}>상품등록</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 상품 리스트를 화면에 표시 */}
        <FlatList style={styles.productListContainer}
          data={products}
          renderItem={({ item }) => (
            <Pressable
              key={item.id}
              style={dynamicStyles.imageBox} // 동적 스타일 적용
              onPress={() => navigateToDetail(item.id)} // 상품 상세 페이지로 이동
            >
              {/* 상품 이미지 */}
              <Image source={{ uri: item.uri }} style={dynamicStyles.image} />
              <Text style={styles.productText}>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={item => item.id}
          numColumns={3} // 3개씩 나란히 표시
          columnWrapperStyle={{ justifyContent: 'flex-start' }} // 왼쪽으로 정렬
          contentContainerStyle={{ flexGrow: 1 }} // 내용이 자식 요소에 따라 확대되도록 설정
        />

      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: WHITE,
    paddingBottom: 20,
    // fontFamily: "Noto Sans KR",
  },
  top: {
    backgroundColor: PRIMARY.DEFAULT,
    paddingTop: 34, // 상단바 높이만큼 여백 추가
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 왼쪽과 오른쪽에 요소를 배치
    paddingLeft: 15, // 좌우 여백 추가
  },
  topText: {
    color: WHITE,
    fontSize: 20, // 텍스트 크기 조정
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // 텍스트가 가운데로 배치되도록 설정
    padding: 10,
  },
  buttonContainer: {
    //alignItems: 'flex-start',
    flexDirection: 'row',
    // marginBottom: 10, // 버튼 사이의 간격을 위해 추가
    //paddingHorizontal: 5,
    //marginHorizontal: 5,
    justifyContent:'space-between',
    //backgroundColor:'#f00'
  },
  button: {
    //flexDirection: 'row', // 아이콘과 텍스트를 수평으로 배치
    alignItems: 'center', // 수직 정렬
    //padding: 10,
    borderRadius: 50,
    backgroundColor: WHITE,
    borderColor: PRIMARY.DEFAULT,
    borderWidth: 1,
    padding: 9,
    marginRight: 10,
  },
  buttonText: {
    color: PRIMARY.DEFAULT,
    //fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  ad: {
    backgroundColor: GRAY.DEFAULT,
    width: '100%',
    height: 300, // 높이를 350으로 변경 (필요에 따라 값을 조정)
    position: 'relative',
    marginBottom: 10,
    //borderRadius: 10,
    overflow: 'hidden',
  },
  imageView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    
  },
  productText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: BLACK,
  },
  productListContainer:{
    margin: 10,
    //paddingHorizontal: 20,
    //backgroundColor:'#666'
  },
  newText:{
    fontSize:20,
    fontWeight: 'bold',
    color:PRIMARY.DEFAULT,
    marginLeft:10,
    marginTop:10,
  },
  topButtonContainer:{
    //backgroundColor:'#f00',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
});

export default Index;
