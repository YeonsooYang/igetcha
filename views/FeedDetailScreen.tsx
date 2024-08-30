// views/FeedDetailScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Assume you have this type file

type FeedDetailScreenRouteProp = RouteProp<RootStackParamList, 'FeedDetailScreen'>;

const FeedDetailScreen: React.FC = () => {
  const route = useRoute<FeedDetailScreenRouteProp>();
  const { feedItem } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
        <Text style={styles.username}>{feedItem.username}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <MaterialCommunityIcons name="delete" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: feedItem.imageUri }} style={styles.image} />
      <View style={styles.underCaptionContainer}>
      <Text style={styles.date}>{feedItem.date}</Text>
      <View style={styles.likeAndCaptionContainer}>
            <Text style={styles.likeCount}>좋아요 {feedItem.likes}개</Text>
            <TouchableOpacity style={styles.likeButton}>
              <FontAwesome name={feedItem.likes > 0 ? "heart" : "heart-o"} size={18} color="#ff6b6b" />
            </TouchableOpacity>
        </View>
        </View>
      <Text style={styles.caption}>{feedItem.caption}</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.commentButton}>
          <FontAwesome name="comment-o" size={24} color="#999" style={{ transform: [{ scaleX: -1 }] }}/>
        </TouchableOpacity>
        <Text style={styles.commentCount}>댓글 {feedItem.comments.length}개</Text>
      </View>
      {feedItem.comments.length > 0 && (
        <View style={styles.commentsContainer}>
          {feedItem.comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
      },
      header: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      username: {
        fontWeight: 'bold',
      },
      headerActions: {
        flexDirection: 'row',
      },
      editButton: {
        marginRight: 15,
      },
      deleteButton: {
        marginLeft: 0,
      },
      image: {
        width: '100%',
        height: 300,
      },
      underCaptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'space-between',
      },
      likeAndCaptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      likeButton: {
        marginLeft: 5,
      },
      likeCount: {
        fontSize: 14,
        color: '#ff6b6b',
      },
      date: {
        fontSize: 14,
        color: '#999',
        marginRight: 10,
      },
      caption: {
        padding: 20,
      },
      actionsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
      },
      commentButton: {
        marginRight: 10,
      },
      commentCount: {
        fontSize: 14,
        color: '#999',
      },
      commentSection: {
        width: '100%',
      },
      commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      commentInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        color: '#000',
      },
      submitButton: {
        backgroundColor: '#999',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
      },
      submitButtonText: {
        color: '#fff',
      },
      commentsContainer: {
        padding: 10,
      },
      commentContainer: {
        flexDirection: 'row', // Align username and content horizontally
        alignItems: 'center', // Vertically center content
        marginBottom: 10,
      },
      commentUsername: {
        fontWeight: 'bold',
        marginRight: 10,
      },
      commentContent: {
        fontSize: 14,
        flex: 1, // Take up available space
      },
      deleteCommentButton: {
        marginLeft: 10,
      },
      commentSeparator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
      },
});

export default FeedDetailScreen;
