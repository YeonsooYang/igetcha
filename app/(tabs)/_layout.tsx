// app/(tabs)/_layout.tsx

/*
npm install @react-navigation/bottom-tabs <- 설치
리액트네비게이션이 제공하는 바텀 탭 네비게이터 사용

바텀 네비게이터 탭 화면(순서 임의)

*/

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";


const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, headerStyle: {
      backgroundColor: '#ff6b6b', // 헤더 배경색 설정
    }, headerTintColor: '#fff',
    tabBarStyle: {
      backgroundColor: '#fff', // 탭 바 배경색
      borderTopWidth: 0, // 탭 바의 상단 구분선 두께
        borderTopColor: '#ff6b6b', // 탭 바의 상단 구분선 색상
    },
    tabBarLabelStyle: {
      fontSize: 14, // 탭 아이템 글자 크기
      fontWeight: 'bold', // 탭 아이템 글자 굵기
    },
    tabBarActiveTintColor: '#ff6b6b', // 활성 탭 아이템 색상
    tabBarInactiveTintColor: '#888', // 비활성 탭 아이템 색상
    }}>
      <Tabs.Screen 
      name="index" 
      options ={{ 
        title: "홈화면",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={30} color={color} />
          ),
          tabBarLabel: () => null,
        }} />
     <Tabs.Screen
        name="MarketScreen"
        options={{
          title: "장터게시판",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="storefront" size={30} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      
      <Tabs.Screen
          name="Center"
          options={{ tabBarLabel: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="storefront" size={30} color={color} />
            ),
          }}
        />

      <Tabs.Screen
        name="BoardScreen"
        options={{
          title: "자유게시판",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" size={30} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="MypageScreen"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box" size={30} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
