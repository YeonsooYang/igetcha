// components/FeedItem.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Comment, FeedItemType, RootStackParamList } from '../types'; 
import { BLACK, PRIMARY, WHITE } from '@/constants/Colors';
import UserContext from '@/contexts/UserContext';


type FeedItemNavigationProp = StackNavigationProp<RootStackParamList, 'FeedDetailScreen'>;

interface FeedItemProps {
  index: number;
  username: string;
  imageUri: string;
  caption: string;
  comments: Comment[];
  likes: number;
  date: string;
  onAddComment: (index: number, comment: Comment) => void;
  onLike: (index: number) => void;
  onDeleteComment: (feedIndex: number, commentIndex: number) => void;
  onEditFeed: (index: number, updatedFeed: FeedItemType) => void;
  onDeleteFeed: (index: number) => void; 
}

const FeedItem: React.FC<FeedItemProps> = ({ 
  index, 
  username, 
  imageUri, 
  caption, 
  comments, 
  likes, 
  date, 
  onAddComment, 
  onLike, 
  onDeleteComment,
  onEditFeed,
  onDeleteFeed,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const navigation = useNavigation<FeedItemNavigationProp>();


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

  //console.log(nickname);

  //댓글 추가
  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(index, { username:nickname , content: newComment });
      setNewComment('');
      setIsCommenting(true);
    }
  };

  //댓글 아이콘 눌렀을 때 상태 확인
  const toggleCommenting = () => {
    setIsCommenting(!isCommenting);
  };

  //댓글 삭제
  const handleDeleteComment = (commentIndex: number) => {
    onDeleteComment(index, commentIndex);
  };

  //댓글 보여주기
  const renderComment = ({ item, index }: { item: Comment; index: number }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUsername}>{item.username}</Text>
      <Text style={styles.commentContent}>{item.content}</Text>
      {isLoggedIn && (item.username === nickname) && (
      <>
      <TouchableOpacity onPress={() => handleDeleteComment(index)} style={styles.deleteCommentButton}>
        <FontAwesome name="times" size={14} color="#999" />
      </TouchableOpacity>
      </>
      )}


      <View style={styles.commentSeparator} />
    </View>
  );

  //좋아요 버튼
  // const handleLike = () => {
  //   onLike(index);
  // };
    const handleLike = () => {
      if (!isLoggedIn) {
        // 로그인하지 않은 경우에는 아무 반응이 없도록 함
        return;
      }

      if (!hasLiked) {
        setHasLiked(true);  // 버튼이 눌렸음을 기록
        onLike(index);      // 부모 컴포넌트로 좋아요 이벤트 전달
      }
    };

  //피드 수정
  const handleEditFeed = () => {
    navigation.navigate('EditFeedScreen', {
      feedItem: { username, imageUri, caption, comments, likes, date },
      onUpdateFeed: (updatedFeed: FeedItemType) => {
        onEditFeed(index, updatedFeed); // 수정된 피드를 BoardScreen에 전달
      },
    });
  };

  //피드 삭제
  const handleDeleteFeed = () => {
    Alert.alert(
      "삭제 확인",
      "이 피드를 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        { text: "삭제", onPress: () => onDeleteFeed(index) } // 삭제 함수 호출
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 헤더 영역 */}
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <View style={styles.headerActions}>
        <MaterialCommunityIcons name="alert" size={24} color="#fff" />
        {isLoggedIn && (username === nickname) && (
          <>
            <TouchableOpacity onPress={handleEditFeed} style={styles.editButton}>
              <MaterialCommunityIcons name="pencil" size={24} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteFeed} style={styles.deleteButton}>
              <MaterialCommunityIcons name="delete" size={24} color="#999" />
            </TouchableOpacity>
          </>
        )}
        </View>
      </View>

      {/* 이미지 */}
      <Image source={{ uri: imageUri }} style={[styles.image, { height: imageUri ? 300 : 0 }]} />
    
      
      {/* 이미지 아래 (날짜/좋아요) */}
      <View style={styles.upperCaptionContainer}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.likeContainer}>
          <Text style={styles.likeCount}>좋아요 {likes}개</Text>
          <TouchableOpacity 
          onPress={handleLike} 
          style={styles.likeButton} 
          disabled={hasLiked}  // 이미 눌린 경우 버튼 비활성화
          >
            <FontAwesome name={likes > 0 ? "heart" : "heart-o"} size={18} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 캡션 */}
      <Text style={styles.caption}>{caption}</Text>

      {/* 댓글 */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={toggleCommenting} style={styles.commentButton}>
          <FontAwesome name="comment-o" size={24} color="#999" style={{ transform: [{ scaleX: -1 }] }} />
          <Text style={styles.commentCount}>댓글 {comments.length}개</Text>
        </TouchableOpacity>
      </View>

      {/* 댓글 아이콘 눌렀을 때 */}
      {isCommenting && (
        <View style={styles.commentSection}>
          {isLoggedIn && (
          <>
            <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="내용을 입력해 주세요"
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={handleAddComment} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>댓글달기</Text>
            </TouchableOpacity>
          </View>
          </>
        )}
          
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.commentsContainer}
          />
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor:'#fff',
    borderWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
  },
  header: {
    padding: 10,
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    color: BLACK,
    fontSize:16,
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
  upperCaptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:5,
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
    padding: 10,
    //color: '#ff6b6b',
    fontSize: 14,
  },
  actionsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButton: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    fontSize: 14,
    color: '#999',
    marginLeft: 7,
    marginTop:5,
    
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
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 10,
    //color: '#ff6b6b',
  },
  commentContent: {
    fontSize: 14,
    flex: 1, 
    //color: '#ff6b6b',
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

export default FeedItem;
