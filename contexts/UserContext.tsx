//contexts/UserContext.tsx

/*
import { createContext, ReactNode, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children} : {children:ReactNode}) => {
    const [user,setUser] = useState({id:'user123',pw:'1234'});
    //const [user,setUser] = useState();

    const [state, setState] = useState("false");

    return(
        <UserContext.Provider value={{user, setUser, state, setState}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
*/

// context/UserContext.tsx
import React, { createContext, ReactNode, useState } from 'react';

//타입지정
interface User {
  id: string;
  pw: string;
  nickname: string;
  email: string;
  image: string;
}

// Context와 Provider 정의
const UserContext = createContext(null);

const UserProvider = ({ children }: {children:ReactNode}) => {
  //초기값
  const [users, setUsers] = useState<User[]>([
    {
      id:'admin',
      pw:'123',
      nickname:'관리자',
      email  :'ADMIN@naver.com',
      image:'https://cdn.pixabay.com/photo/2019/05/08/21/21/cat-4189697_640.jpg'
    },
    {
      id:'user',
      pw:'123', 
      nickname:'도파민',
      email  :'USER123@naver.com',
      image:'https://cdn.pixabay.com/photo/2024/07/08/05/41/girl-8880144_1280.png' 
    },
  ]);
  
  //현재 로그인 된 상태인지 아닌지
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  //현재 로그인한 유저의 id
  const [loginUserId, setLoginUserId] = useState<string>('');

  //비밀번호 체크
  const checkPassword = (id: string, password: string): boolean => {
    const user = users.find(u => u.id === id);
    return user ? user.pw === password : false;
};
  
  //정보 수정을 위한 함수
  const updateUser = (updates: Partial<User>) => {
    setUsers((prevUsers) =>
      prevUsers.map(user => (user.id === updates.id ? { ...user, ...updates } : user))
    );
  };

  // 새로운 유저 객체를 추가하는 함수
  const addUser = (newUser: object) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // id로 유저를 찾는 함수
  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider value = {{ users,  setUsers, loginUserId, setLoginUserId, updateUser, addUser, checkPassword, getUserById, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;