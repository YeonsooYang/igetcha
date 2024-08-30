//  app/MypageEditScreen.tsx

import { useState } from "react";
import { Alert, Button, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { PRIMARY, WHITE } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import HeaderLeftButton from "@/components/HeaderLeftButton";

const MypageEditScreen = () => {
  const [image, setIamge] = useState("https://cdn.pixabay.com/photo/2024/07/08/05/41/girl-8880144_640.png");
  const [userId, setUserId] = useState("USER123");
  const [nickname, setNickname] = useState("도파민");
  const [email, setEmail] = useState("USER123@naver.com");
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  //프로필 사진 함수
  const pickImage = async () => {
    //권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('aa');
      return;
    }
    //이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setIamge(result.assets[0].uri);
    }
  };

  // 입력시작(포커스될 때) 함수
  const handleFocus = () => {
    if(!isEditing){
      setIsEditing(true);
    }
  }

  //버튼 클릭시
  const onPress = () => {
    Alert.alert(
      '수정완료', 
      '정보가 수정되었습니다.',
    [
      {
        text:'확인',
        onPress:()=> navigation.goBack(),
      }
    ])
  }

  const handleCancel = () => {
    navigation.goBack();
  }

  return (
    <>
    {/* 헤더 */}
    {/* <View style={styles.header}>
      <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
      <Text style={styles.headerTitle}>마이페이지</Text>
    </View> */}
    
    <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* 프로필사진 */}
        <View style={styles.imageWrapper}>
          <Pressable onPress={pickImage} style={styles.imageContainer}>
            {image && (
              <Image source={{ uri: image }} style={[styles.image, { backgroundColor: WHITE }]} />
            )}
            {!image && <Image style={[styles.image, { backgroundColor: PRIMARY.DEFAULT }]} />}
            <View style={styles.imageIconContainer}>
              <MaterialCommunityIcons
                name="camera"
                size={35}
              />
            </View>
          </Pressable>
        </View>
        
        {/* 수정내용 */}
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>닉네임</Text>
            <TextInput
              placeholder={nickname}
              value={nickname}
              onFocus={handleFocus}
              onChangeText={setNickname}
              style={styles.input}
            />
            </View>
          <View style={styles.line} />

          <View style={styles.textContainer}>
            <Text style={styles.label}>이메일</Text>
            <TextInput 
              value={email}
              onFocus={handleFocus}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="이메일입력"
            />
            </View>
          <View style={styles.line} />
        </View>
          
        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          <Pressable 
            onPress={onPress} 
            style={({ pressed }) => [
              styles.button,
              {backgroundColor: pressed ? '#ff3333' : '#FF6B6B'}
            ]}
          
          >
            <Text style={styles.buttonText}>수정</Text>
          </Pressable>
          <Pressable 
            onPress={handleCancel} 
            style={({ pressed }) => [
                styles.button,
                {marginTop:10, borderColor:PRIMARY.DEFAULT, borderBottomWidth:1, borderTopWidth:1,},
                {backgroundColor: pressed ? '#fffff' : '#fffff'}
            ]}
            >
            <Text style={[styles.buttonText, {color:PRIMARY.DEFAULT}]}>취소</Text>
        </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:-100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // position: 'relative',
    padding: 10,
  },
  buttonContainer:{
    paddingTop:20,
    width:"80%",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
},
  imageWrapper: {
    position: 'relative'
  },
  image: {
    width: 230,
    height: 230,
    borderRadius: 100,
    backgroundColor: PRIMARY.DEFAULT,
  },
  imageIconContainer: {
    top: "75%",
    right: "8%",
    position: 'absolute',
    backgroundColor: WHITE,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer:{
    flexDirection: 'row', 
    alignItems:'center',
    justifyContent:'center',
    width:"100%",
    padding:15,
  },
  label:{
    marginRight: 30,
    fontSize:20,
  },
  input: {
    width:"50%",
    height:30,
    color: "#B5B5B5",
    textAlign :'left',
    fontSize:20,
  },
  line:{
    backgroundColor:PRIMARY.DEFAULT,
    width:"70%",
    height: 2,
    marginBottom:20,
  },
  button:{
    width:"100%",
    backgroundColor:PRIMARY.DEFAULT,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  buttonText:{
    color:WHITE,
    fontWeight:'bold',
    fontSize:20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100, // 고정된 높이
    paddingTop: 40, // 고정된 상단 여백
    paddingHorizontal: 10,
    backgroundColor: PRIMARY.DEFAULT,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
    textAlign: 'center',
    flex: 1, // 제목이 가능한 공간을 차지하도록 설정
    marginLeft: -15, // 버튼과 텍스트 간의 간격 조절
  },
});

export default MypageEditScreen;