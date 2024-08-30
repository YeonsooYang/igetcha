// app/ProductDetailScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Pressable, TextInput, FlatList, Share, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderLeftButton from '@/components/HeaderLeftButton';
import { PRIMARY, WHITE } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const { width } = useWindowDimensions();

  const defaultProduct = {
    id: '0',
    uri: 'https://via.placeholder.com/300',
    name: '상품 없음',
    description: '상세 정보를 찾을 수 없습니다.',
  };

  const currentProduct = product || defaultProduct;
  const canGoBack = navigation.canGoBack();

  // 댓글 상태
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim().length > 0) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
      Keyboard.dismiss(); // 댓글 추가 후 키보드 내리기
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${currentProduct.name}\n\n${currentProduct.description}`,
        url: currentProduct.uri,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderComment = ({ item }: { item: string }) => (
    <View style={styles.comment}>
      <Text style={styles.commentText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.header}>
          <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
          <Text style={styles.headerTitle}>상품 상세</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>
            <Image
              source={{ uri: currentProduct.uri }}
              style={[styles.image, { width: width }]}
              resizeMode="contain"
            />
            <Text style={styles.title}>{currentProduct.name}</Text>
            <Text style={styles.description}>{currentProduct.description}</Text>

            {/* 댓글 */}
            <View style={styles.reviewsSection}>
              <Pressable
                style={styles.floatingButton}
                onPress={handleShare}
              >
                <MaterialCommunityIcons name="share" color={WHITE} size={24} />
              </Pressable>
              <Text style={styles.reviewsTitle}>댓글</Text>
              <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item, index) => index.toString()}
                style={styles.commentsList}
              />
              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="댓글을 입력하세요..."
                  value={newComment}
                  onChangeText={setNewComment}
                  onSubmitEditing={handleAddComment} // 엔터키로도 댓글 추가
                />
                <Pressable
                  style={({ pressed }) => [
                    styles.addButton,
                    { backgroundColor: pressed ? '#888' : '#999' }, // PRIMARY.DARK와 PRIMARY.DEFAULT를 예시로 설정
                  ]}
                  onPress={handleAddComment}
                >
                  <Text style={styles.addButtonText}>추가</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  keyboardContainer: {
    flex: 1,
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
    flex: 1,
    marginLeft: -15,
  },
  scrollViewContent: {
    //alignItems: 'center',
    // paddingBottom: 100,

  },
  content: {
    //alignItems: 'center',
    //paddingHorizontal: 20,
    paddingTop: 20,
    //padding:5,
    //textAlign: 'center',
    
    
  },
  image: {
    //aspectRatio: 1,
    width:'100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:20,
    textAlign: 'left',
  },
  description: {
    //fontSize: 16,
    //textAlign: 'center',
    paddingHorizontal: 20,
    
    marginBottom: 60,
  },
  reviewsSection: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#f8f8f8',
    //paddingHorizontal: 20,
    position: 'relative',
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    marginLeft:25,
    color:'#888'
  },
  commentsList: {
    width: '100%',
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingLeft: 20,
    marginHorizontal:20,
  },
  commentText: {
    fontSize: 16,
    textAlign: 'left',
  },
  commentInputContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 70,
  },
  commentInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: WHITE,
    borderColor: PRIMARY.DEFAULT,
    //borderWidth: 1,
    borderStyle: "solid",
  },
  addButtonText: {
    color: WHITE,
    //fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    top: -50, // 버튼을 댓글 공간 바로 위쪽에 위치시키기
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAULT,
    zIndex: 1, // Ensure the button stays above other content
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
  },
});

export default ProductDetailScreen;
