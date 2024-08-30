//  app/(tabs)/MypageScreen.tsx

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { PRIMARY, WHITE } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import HeaderLeftButton from "@/components/HeaderLeftButton";



const MypageScreen = () => {
  const [image, setIamge] = useState("https://cdn.pixabay.com/photo/2024/07/08/05/41/girl-8880144_1280.png");
  const [userId, setUserId] = useState("USER123");
  const [nickname, setNickname] = useState("도파민");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); //모달창이 띄워져 있는가
  const [selectedImage, setSelectedImage] = useState(null); //이미지 주소 저장
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();

  //페이지 이동
  const handleNavigation = (link) => {
      navigation.navigate(link);
  };  

  //모달창 열기/닫기
  const handleOpenModal = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  }
  
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  }

  return (
    <>
    {/* 헤더 */}
    <View style={styles.header}>
      <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
      <Text style={styles.headerTitle}>마이페이지</Text>
    </View>

    {/* 본페이지 */}
    <View style={styles.container}>
      {/* 프로필사진 */}
      <View style={styles.imageWrapper}>
        {image && (
          <Pressable style={styles.imageContainer} onPress={ ()=>handleOpenModal(image) }>
            <Image source={{ uri:image}} style={[styles.image, {backgroundColor:WHITE}] } />
          </Pressable>
        )}
        {!image && 
          <View style={styles.imageContainer}>
            <Image style={[styles.image, {backgroundColor:PRIMARY.DEFAULT}]} />
        </View>
        }
      </View>

      {/* 닉네임(아이디) 표시 */}
      <View style={styles.infoContainer}>
        <Text style={[styles.text, {fontSize:25}]}>{nickname}({userId}) <Text style={{color:"#000000"}}>님</Text></Text>
        <View style={styles.line} />
      </View>

      {/* 아이콘 3개 */}
      <View style={styles.iconContainer}>
        <View>
          <Pressable onPress={()=>handleNavigation("ScrabPageScreen")}>
            <MaterialCommunityIcons
                name="star" 
                color="#FFE24B"
                size={70}
                style={styles.icon}
            />
            <Text style={styles.text}>즐겨찾기</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={()=>handleNavigation("MyPost")}>

          <MaterialCommunityIcons
            name="file-document"
            color="#FF6B6B"
            size={70}
            style={styles.icon}
          />
          <Text style={styles.text}>내가 쓴 글</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={()=>handleNavigation("MypageEditScreen")}>
          <MaterialCommunityIcons
            name="account-circle"
            color="#FF6B6B"
            size={70}
            style={styles.icon}
          />
          <Text style={styles.text}>정보 수정</Text>

          </Pressable>
        </View>
      </View>

      {/* 사진 클릭했을 때 모달창 */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        animationType="fade"
      >
        <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:-100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer:{
    position: 'relative',
    padding:10,
  },
  imageWrapper:{
    position: 'relative'
  },
  image:{
    width:230,
    height:230,
    borderRadius:100,
    backgroundColor:PRIMARY.DEFAULT,
  },
  infoContainer:{
    justifyContent:'center',
    alignItems:'center',
    width:"100%",
    height:100,
    paddingTop:30,
  },
  iconContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    width:'70%',
    marginBottom:20,
  },
  icon:{
    alignItems:'center',
    margin:10
  },
  line:{
    backgroundColor:PRIMARY.DEFAULT,
    width:"70%",
    height: 2,
    margin:10,
  },
  text:{
    color:"#B5B5B5",
    textAlign:'center',
  },
  modalBackground:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: WHITE,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
    color: WHITE,
    textAlign: 'center',
    flex: 1, // 제목이 가능한 공간을 차지하도록 설정
    marginLeft: -15, // 버튼과 텍스트 간의 간격 조절
  },
});

export default MypageScreen;

