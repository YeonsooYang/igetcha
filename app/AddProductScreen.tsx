//app/AddProductScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GRAY, PRIMARY, WHITE } from "@/constants/Colors";
import { buttonStyles } from "@/components/ButtonContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import HeaderLeftButton from "@/components/HeaderLeftButton";

const AddProductScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState("integrate");
  const [product, setProduct] = useState([]);
  const [showHeader, setShowHeader] = useState(true); // 상품 등록 제목 보이기/숨기기
  const [modalVisible, setModalVisible] = useState(false); // 이미지 전체 화면 표시를 위한 모달 상태
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 전체 화면으로 표시할 이미지
  const navigation = useNavigation();

  const pickImage = async () => {
    if (images.length >= 4) {
      Alert.alert(
        "이미지 한도 초과",
        "이미지는 최대 4장까지 등록할 수 있습니다."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 4 - images.length,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      const uniqueImages = newImages.filter((uri) => !images.includes(uri));

      setImages([...images, ...uniqueImages]);
      setShowHeader(false); // 이미지 선택 시 "상품 등록" 텍스트 숨김
    }
  };

  const removeImage = (uri: string) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image !== uri);
      if (updatedImages.length === 0) {
        setShowHeader(true); // 모든 이미지를 삭제했을 때 "상품 등록" 텍스트 표시
      }
      return updatedImages;
    });
  };

  const openImageModal = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  // 상품등록 시, 핸들링되는 함수
  const handleSubmit = () => {
    // 하나라도 빠질 경우, 경고창.
    if (!title) {
      Alert.alert("제목을 입력해주세요.");
      return;
    }
    if (!content) {
      Alert.alert("내용을 입력해주세요.");
      return;
    }
    if (images.length === 0) {
      Alert.alert("이미지를 하나 이상 첨부해주세요.");
      return;
    }
    if (category === "integrate") {
      Alert.alert("글 분류를 지정해주세요.");
      return;
    }

    //받은 내용들
    const newProduct = {
      id: new Date().getTime().toString(), // 단순히 현재 시간을 ID로 사용
      title,
      content,
      productImg: images[0], // 첫 번째 이미지를 썸네일로 사용
      category,
    };

    // MarketScreen으로 새로운 상품 데이터를 전달
    navigation.navigate("MarketScreen", { newProduct });
  };

  const canGoBack = navigation.canGoBack();
  return (
    <>
      <View style={styles.header}>
        <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
        <Text style={styles.headerTitle}>상품 등록</Text>
      </View>
    
    <View style={styles.container}>
      {/**가로 스크롤뷰. 이미지 최대 4장. */}
      <ScrollView
        horizontal
        style={styles.imageContainer}
        contentContainerStyle={styles.imageScrollView}
        showsHorizontalScrollIndicator={true}
      >
        {images.length === 0 && (
          <Text
            style={{
              color: GRAY.DEFAULT,
              fontSize: 12,
            }}
          >
            제목과 내용, 이미지(최소 1장), 그리고 분류버튼을 눌러주세요.
          </Text>
        )}
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Pressable onPress={() => openImageModal(uri)}>
              <Image source={{ uri }} style={styles.image} resizeMode="cover" />
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => removeImage(uri)}
              hitSlop={8}
            >
              <MaterialCommunityIcons name="close" size={12} color={WHITE} />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/** 이미지 누르면, 모달창떠서 보여줌. */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.closeModalButton}
            onPress={() => setModalVisible(false)}
          >
            <MaterialCommunityIcons name="close" size={30} color="#fff" />
          </Pressable>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} />
          )}
        </View>
      </Modal>

      {/**상품 분류버튼들, 글작성 텍스트에리어, 이미지랑 등록버튼  */}
      <View style={styles.footer}>
        <View style={buttonStyles.container}>
          <Pressable
            style={[
              buttonStyles.buttonDefault,
              category === "purchase"
                ? buttonStyles.buttonPressed
                : buttonStyles.buttonNonPressed,
            ]}
            onPress={() => setCategory("purchase")}
          >
            <Text
              style={[
                buttonStyles.titleDefault,
                category === "purchase"
                  ? buttonStyles.titlePressed
                  : buttonStyles.titleNonPressed,
              ]}
            >
              구매
            </Text>
          </Pressable>

          <Pressable
            style={[
              buttonStyles.buttonDefault,
              category === "sell"
                ? buttonStyles.buttonPressed
                : buttonStyles.buttonNonPressed,
            ]}
            onPress={() => setCategory("sell")}
          >
            <Text
              style={[
                buttonStyles.titleDefault,
                category === "sell"
                  ? buttonStyles.titlePressed
                  : buttonStyles.titleNonPressed,
              ]}
            >
              판매
            </Text>
          </Pressable>

          <Pressable
            style={[
              buttonStyles.buttonDefault,
              category === "exchange"
                ? buttonStyles.buttonPressed
                : buttonStyles.buttonNonPressed,
            ]}
            onPress={() => setCategory("exchange")}
          >
            <Text
              style={[
                buttonStyles.titleDefault,
                category === "exchange"
                  ? buttonStyles.titlePressed
                  : buttonStyles.titleNonPressed,
              ]}
            >
              교환
            </Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.title}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.content /* , { overflow: scrollY } */]}
          placeholder="내용"
          value={content}
          onChangeText={setContent}
          multiline={true}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { backgroundColor: PRIMARY.DARK },
            ]}
            onPress={pickImage}
          >
            <Text style={styles.buttonText}>이미지 등록</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>상품 등록</Text>
          </Pressable>
        </View>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: "center",
    alignItems: "center",
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
  imageContainer: {
    flex: 1,
    marginVertical: 10,
  },
  imageScrollView: {
    alignItems: "center",
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
  },
  image: {
    width: 250, // 이미지 너비
    height: 350, // 이미지 높이
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 60,
    right: 10,
    padding: 8,
    backgroundColor: PRIMARY.DEFAULT,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: WHITE,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  closeModalButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  footer: {
    padding: 20,
    justifyContent: "center",
    width: "100%",
  },
  title: {
    height: 50,
    borderColor: PRIMARY.DEFAULT,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  content: {
    height: 200,
    borderColor: PRIMARY.DEFAULT,
    borderWidth: 1,
    padding: 20,
    textAlignVertical: "top",
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    width: "30%",
    paddingVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: PRIMARY.DEFAULT,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: PRIMARY.DEFAULT,
  },
  buttonText: {
    color: WHITE,
    fontWeight: "700",
  },
});

export default AddProductScreen;
