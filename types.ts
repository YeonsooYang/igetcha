// types.ts
export type RootStackParamList = {
    BoardScreenMain: undefined; // 매개변수가 없음
    FeedDetailScreen: { feedItem: FeedItemType }; // 피드 상세화면 매개변수
    EditFeedScreen: { feedItem: FeedItemType; onUpdateFeed: (updatedFeed: FeedItemType) => void }; // 수정화면 매개변수
  };
  
  export interface FeedItemType {
    username: string;
    imageUri: string;
    caption: string;
    comments: Comment[];
    likes: number;
    date: string;
  }
  
  export interface Comment {
    username: string;
    content: string;
  }