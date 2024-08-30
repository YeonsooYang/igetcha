// views/EditFeedScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; 
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from '../types'; 

type EditFeedScreenRouteProp = RouteProp<RootStackParamList, 'EditFeedScreen'>;

const EditFeedScreen: React.FC = () => {
  const route = useRoute<EditFeedScreenRouteProp>();
  const navigation = useNavigation(); 
  const { feedItem, onUpdateFeed } = route.params;

  const [imageUri, setImageUri] = useState(feedItem.imageUri);
  const [caption, setCaption] = useState(feedItem.caption);

  //이미지피커
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("권한 필요", "이미지 선택을 위해 권한이 필요합니다.");
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
      setImageUri(uri);
    }
  };

  //수정 버튼 눌렀을 때
  const handleUpdateFeed = () => {
    if (caption.trim()) {
      onUpdateFeed({ ...feedItem, caption, imageUri });
      Alert.alert('수정 완료', '피드를 성공적으로 수정했습니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('BoardScreenMain'), // BoardScreen으로 이동
        },
      ]);
    } else {
      Alert.alert('필수 정보', '모든 필드를 입력하세요.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.select({ios:'position'})}
            contentContainerStyle={{flex:1}}
          >      
      <View style={styles.container}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : null}
          <TouchableOpacity onPress={handlePickImage} style={styles.imagePickerButton}>
              <Text style={styles.imagePickerText}>{imageUri ? '이미지 변경' : '이미지 선택'}</Text>
          </TouchableOpacity>

            <TextInput
              style={[styles.textInput, styles.captionInput]}
              value={caption}
              onChangeText={setCaption}
              placeholder="Caption"
              multiline
              numberOfLines={4}
            />
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('BoardScreenMain')} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdateFeed} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

//스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#fff',
  },
  imagePickerButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#ff6b6b',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  captionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 9,
    alignItems: 'center',
    marginRight: 10,
    borderColor: '#ff6b6b',
    borderWidth: 1,
    paddingHorizontal:20,
  },
  cancelButtonText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    paddingHorizontal:20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditFeedScreen;
