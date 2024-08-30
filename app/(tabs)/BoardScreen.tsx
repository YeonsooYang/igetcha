// app/(tabs)/BoardScreen.tsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FeedItem from '@/components/FeedItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditFeedScreen from '@/views/EditFeedScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Comment, FeedItemType } from '@/types';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import { useNavigation } from '@react-navigation/native';
import { BLACK } from '@/constants/Colors';
import UserContext from '@/contexts/UserContext';

const Stack = createNativeStackNavigator();

const BoardScreen: React.FC = () => {
  //더미 유저(로그인된사람)
  const testUserName= '도파민';

  // 피드 데이터 상태
  const [feedData, setFeedData] = useState<FeedItemType[]>([
    //더미데이터
    {
      username: '폼폼푸린',
      imageUri: 'https://i.ibb.co/HhTKhSF/feed-Example5.jpg',
      caption: '한교동만 나오는 가챠!!!!!!! 반월당 지하 히든토이에 있습니다. 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥ 한교동 좋아♥',
      comments: [],
      likes: 1,
      date: '2024-08-11',
    },
    {
      username: '한교동',
      imageUri: 'https://i.ibb.co/C9F6vfb/feed-Example4.jpg',
      caption: '대구 스파크 3층에 가챠샵, 굿즈샵 새로 생겼어요!!! 지금 카드캡터사쿠라 전시회도 진행중입니다',
      comments: [],
      likes: 152,
      date: '2024-08-02',
    },
    {
      username: '마이멜로디',
      imageUri: 'https://i.ibb.co/cLmYVyp/feed-Example3.png',
      caption: '왜 찹쌀떡귀신 1탄 3탄은 자주 보이는데 2탄은 아무데도 안보여요? 제발 2탄좀 추가해주세요 제가 다 뽑을게요 제발요 제발 찹쌀떡귀신 2탄 제발 찹쌀떡귀신 2탄',
      comments: [],
      likes: 0,
      date: '2024-07-31',
    },
    {
      username: '포차코',
      imageUri: 'https://i.ibb.co/zfpB1Rx/feed-Example2.jpg',
      caption: '마실커피 아이스 아메리카노 1800원 양 많음 맛은 그럭저럭 가까워서 자주 이용중입니다.',
      comments: [],
      likes: 23,
      date: '2024-07-23',
    },
    {
      username: '쿠로미',
      imageUri: 'https://i.ibb.co/rt1kJpC/feed-Example1.jpg',
      caption: '로스트아크 도미노피자 콜라보 중입니다. 피자 먹으면 귀여운 키캡이 공짜! 지금 즉시 다운로드 하세요.',
      comments: [],
      likes: 2,
      date: '2024-07-07',
    },
  ]);

  // 새로운 피드 작성 관련 상태
  const [newImageUri, setNewImageUri] = useState<string | null>(null);
  const [newCaption, setNewCaption] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  // 검색 관련 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedData, setFilteredFeedData] = useState<FeedItemType[]>(feedData);

  //로그인 상태
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { loginUserId, getUserById } = useContext(UserContext);
  //const [nickname, setNickname] = useState(loginUserId ? getUserById(loginUserId).nickname : null);
  const [nickname, setNickname] = useState('');

  // nickname을 업데이트하는 useEffect
  useEffect(() => {
    if (loginUserId) {
      const user = getUserById(loginUserId);
      if (user) {
        setNickname(user.nickname);
      }
    } else {
      setNickname(''); // 로그인하지 않은 경우
    }
  }, [loginUserId, getUserById]); 

  // 검색 함수
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredData = feedData.filter(item =>
      item.caption.toLowerCase().includes(query.toLowerCase()) 
    );
    setFilteredFeedData(filteredData);
  };
  
  // 이미지 선택 함수
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets) {
      const { uri } = pickerResult.assets[0];
      setNewImageUri(uri);
    }
  };

  //스크롤뷰 제어를 위한 변수
  const scrollViewRef = useRef<ScrollView>(null);

  // 새로운 피드 추가 함수
  const handleAddFeed = () => {
    if (newCaption.trim()) {
      const newFeed: FeedItemType = {
        username: nickname,
        imageUri: newImageUri || '',
        caption: newCaption,
        comments: [],
        likes: 0,
        date: new Date().toISOString().split('T')[0],
      };
      const updatedFeedData = [newFeed, ...feedData];
      setFeedData(updatedFeedData);
      setFilteredFeedData(updatedFeedData);
      setNewImageUri(null);
      setNewCaption('');
      setIsWriting(false);

    // 최상단으로 스크롤
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
    } else {
      Alert.alert('Missing Information', '내용을 입력해 주세요');
    }
  };

  // 댓글 추가 함수
  const handleAddComment = (index: number, comment: Comment) => {
    const newFeedData = [...feedData];
    if (comment.content.trim()) {
      newFeedData[index].comments = [...newFeedData[index].comments, comment];
      setFeedData(newFeedData);
      setFilteredFeedData(newFeedData);
    }
  };
  
  //댓글 삭제 함수
  const handleDeleteComment = (feedIndex: number, commentIndex: number) => {
    const newFeedData = [...feedData];
    newFeedData[feedIndex].comments.splice(commentIndex, 1);
    setFeedData(newFeedData);
    setFilteredFeedData(newFeedData);
  };

  // 좋아요 함수
  const handleLike = (index: number) => {
    const newFeedData = [...feedData];
    newFeedData[index].likes += 1;
    setFeedData(newFeedData);
    setFilteredFeedData(newFeedData);
  };

  //피드 수정 함수
  const handleUpdateFeed = (index: number, updatedFeed: FeedItemType) => {
    const newFeedData = [...feedData];
    newFeedData[index] = updatedFeed; // 업데이트된 피드를 배열에 반영
    setFeedData(newFeedData);
    setFilteredFeedData(newFeedData);
  };

  //피드 삭제 함수
  const handleDeleteFeed = (index: number) => {
    const newFeedData = [...feedData];
    newFeedData.splice(index, 1); // 지정된 인덱스의 피드를 삭제
    setFeedData(newFeedData);
    setFilteredFeedData(newFeedData);
  };
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  return (
    <>
    {/* 상단바 */}
      <View style={styles.header}>
        <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
        <Text style={styles.headerTitle}>자유게시판</Text>
      </View>

    <Stack.Navigator>
      <Stack.Screen name="BoardScreenMain" options={{ headerShown: false }}>
        {() => (
          <View style={styles.container}>
            {/* 검색창 */}
            { !isWriting && (
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={handleSearch}
                  placeholder="검색어를 입력하세요"
                  placeholderTextColor="#999"
                />
              </View>
            )}
            {isWriting && (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {/* 새글입력 */}
              <View style={styles.feedInputContainer}>
                <View style={styles.feedContent}>
                  {newImageUri && (
                    <Image source={{ uri: newImageUri }} style={styles.selectedImage} />
                  )}
                  
                  <TextInput
                    style={[styles.textInput, styles.captionInput]}
                    value={newCaption}
                    onChangeText={setNewCaption}
                    placeholder="내용을 입력해 주세요"
                    placeholderTextColor="#999"
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity onPress={handlePickImage} style={styles.imagePickerButton}>
                    <Text style={styles.imagePickerButtonText}>{newImageUri ? '사진변경' : '사진선택'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleAddFeed} style={styles.addButton}>
                    <Text style={styles.addButtonText}>등록</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </TouchableWithoutFeedback>
            )}

            {/* 피드 목록 */}
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.feedList}>
              {filteredFeedData.map((item, index) => (
                <FeedItem
                  key={index}
                  index={index}
                  username={item.username}
                  imageUri={item.imageUri}
                  caption={item.caption}
                  comments={item.comments}
                  likes={item.likes}
                  date={item.date}
                  onAddComment={handleAddComment}
                  onLike={handleLike}
                  onDeleteComment={handleDeleteComment}
                  onEditFeed={handleUpdateFeed}
                  onDeleteFeed={handleDeleteFeed}
                />
              ))}
            </ScrollView>

            {/* 플로팅 버튼 (새글작성/취소) */}
            <TouchableOpacity 
              style={styles.floatingButton} 
              //onPress={() => setIsWriting(!isWriting)}
              onPress={() => {
                if (!isLoggedIn) { // 로그인 되어있지 않으면 로그인 화면으로 이동
                  Alert.alert(
                    "로그인 필요",
                    "로그인 후 이용 가능합니다.",
                    [
                      { text: "로그인", onPress: () => navigation.navigate("LoginScreen") },
                      { text: "취소", style: "cancel" } 
                    ],
                    { cancelable: true } 
                  );
                } else {
                  setIsWriting(!isWriting)
                }
              }}
            >
              <MaterialCommunityIcons 
                name={isWriting ? "close" : "plus"} // 상태에 따라 아이콘 변경
                size={24} 
                color="#fff" 
              />
            </TouchableOpacity>
          </View>
        )}
      </Stack.Screen>
      {/* 수정화면 */}
      <Stack.Screen name="EditFeedScreen" component={EditFeedScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </>
  );
};

//스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom:0,
    backgroundColor:'#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    paddingHorizontal: 40,
    width: "100%",
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ff6b6b',
    borderRadius: 50,
    borderWidth: 1,
  },
  searchButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  feedInputContainer: {
    marginBottom: 10,
    position: 'relative',
  },
  feedContent: {
    marginBottom: 0,
  },
  selectedImage: {
    width: '100%',
    height: 200, 
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  captionInput: {
    height: 100, 
    textAlignVertical: 'top', // Align text to the top
    borderColor: '#ff6b6b',
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imagePickerButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 9,
    alignItems: 'center',
    marginRight: 10,
    borderColor: '#ff6b6b',
    borderWidth: 1,
  },
  imagePickerButtonText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    paddingHorizontal:20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  feedList: {
    paddingBottom: 20,
    overflow: 'hidden', // 그림자가 잘리는 것을 방지
    shadowColor: '#999', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.3, // 그림자 불투명도
    shadowRadius: 2, // 그림자 반경
    elevation: 2, // 안드로이드에서 그림자 효과
  },
  floatingButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ff6b6b',
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1, // 제목이 가능한 공간을 차지하도록 설정
    marginLeft: -15, // 버튼과 텍스트 간의 간격 조절
  },
});

export default BoardScreen;
