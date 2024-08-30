// app/LoginScreen.tsx

import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { PRIMARY, WHITE } from "@/constants/Colors";
import { StyleSheet, Text, View, TextInput, Pressable, Image } from "react-native";
import UserContext from '@/contexts/UserContext';
import HeaderLeftButton from '@/components/HeaderLeftButton';



const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태 변수

    //const {user, state, setState} = useContext(UserContext);
    const { users, setIsUsers, checkPassword, isLoggedIn, loginUserId, setLoginUserId, setIsLoggedIn } = useContext(UserContext);

    const handleLogin = () => {
               // 유효성 검사
               if (!username || !password) {
                Alert.alert('로그인 실패', '아이디와 비밀번호를 모두 입력해 주세요.');
                return;
            }
    
            // 로그인 검증
            // if (username !== user.id || password !== user.pw) {
            //     Alert.alert('로그인 실패', '아이디나 비밀번호가 잘못 입력되었습니다.');
            //     return;
            // }
            if(!(checkPassword(username, password))){
                console.log("name"+username, "pass"+password);
    
                Alert.alert('로그인 실패', '아이디나 비밀번호가 잘못 입력되었습니다.');
                return;
            }
    
            // 로그인 성공
            setIsLoggedIn(true);
            setLoginUserId(username);
            //setState('true'); // 로그인 시 상태를 설정
            Alert.alert('로그인 성공', '환영합니다!', [
                {
                    text: '확인',
                    onPress: () => navigation.navigate('index'),
                },
            ]);
    };

    const handleLogout = () => {
        Alert.alert('로그아웃 확인', '로그아웃 하시겠습니까?', [
            {
                text: '취소',
                style: 'cancel',
            },
            {
                text: '확인',
                onPress: () => {
                    
                    setUsername('');
                    setPassword('');
                    //setState('false'); // 로그아웃 시 상태를 초기화
                    setIsLoggedIn(false);
                },
            },
        ]);
    };

    const canGoBack = navigation.canGoBack();
    return (
        <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.select({ios:'padding'})}
        contentContainerStyle={{flex:1}}
      >    

        {/* 상단바 */}
        <View style={styles.header}>
            <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
            <Text style={styles.headerTitle}>로그인</Text>
        </View>

        <View style={styles.container}>
            <View style={styles.form}>
                <Image
                    source={{ uri: 'https://cdn.pixabay.com/photo/2022/11/06/04/57/cat-7573258_640.png' }}
                    style={styles.image}
                    
                />
               
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="아이디"
                            placeholderTextColor="#999"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="비밀번호"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </>
           
                <View style={styles.buttonContainer}>
                    
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: pressed ? '#e6e6e6' : WHITE },
                            ]}
                            onPress={() => navigation.navigate('JoinScreen')} // JoinScreen으로 이동하도록 수정
                        >
                            <Text style={styles.buttonText}>회원가입</Text>
                        </Pressable>
                   
                    <Pressable
                        style={({ pressed }) => [
                            styles.loginoutButton,
                            { backgroundColor: pressed ? PRIMARY.DARK : PRIMARY.DEFAULT },
                        ]}
                        onPress={() => {
                            // if (username === user.id) {
                            //     setState('true');
                            //     console.log('state: ',state);
                            //     navigation.navigate('index');
                            //   } else {
                            //     // 조건이 만족하지 않을 때의 행동을 정의합니다.
                            //     console.log('조건이 만족하지 않습니다. 현재 user : ',user);
                            //     console.log('state: ',state);
                            //   }
                            if (isLoggedIn) {
                                handleLogout(); // 로그인 상태일 때 로그아웃
                            } else {
                                handleLogin(); // 로그인 상태가 아닐 때 로그인
                            }
                        }}
                    >
                        <Text style={styles.loginoutButtonText}>{isLoggedIn ? '로그아웃' : '로그인'}</Text>
                    </Pressable>
                    
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingHorizontal: 20,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 100,
        //position: 'absolute', 
        //zIndex: -1,
        //resizeMode: 'contain',
    },
    input: {
        height: 50,
        borderColor: PRIMARY.DEFAULT,
        borderWidth: 1,
        borderRadius: 50,
        marginBottom: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        width: 300,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginRight: 60,
    },
    button: {
        // borderColor: PRIMARY.DEFAULT,
        // borderWidth: 1,
        // padding: 10,
        // borderRadius: 15,
        // alignItems: 'center',
         width: 70, // 두 버튼의 너비를 동일하게 설정
        // marginHorizontal: 5,

        backgroundColor: WHITE,
        borderRadius: 50,
        padding: 9,
        alignItems: 'center',
        marginRight: 10,
        borderColor: PRIMARY.DEFAULT,
        borderWidth: 1,
    },
    loginoutButton:{
        // backgroundColor: PRIMARY.DEFAULT,
        // borderColor: PRIMARY.DEFAULT,
        // color: WHITE,
        // borderWidth: 1,
        // padding: 10,
        // borderRadius: 15,
        // alignItems: 'center',
         width: 70, // 두 버튼의 너비를 동일하게 설정
        // marginHorizontal: 5,

        backgroundColor: '#ff6b6b',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        //paddingHorizontal:20,
    },
    buttonText: {
        color: PRIMARY.DEFAULT, // 버튼 텍스트 색상을 PRIMARY 색상으로 설정
        //fontSize: 16,
        fontWeight: 'bold',
    },
    loginoutButtonText:{
        color: WHITE,
        //fontSize: 16,
        fontWeight: 'bold',
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
        color: '#fff',
        textAlign: 'center',
        flex: 1, // 제목이 가능한 공간을 차지하도록 설정
        marginLeft: -15, // 버튼과 텍스트 간의 간격 조절
      },
});

export default LoginScreen;
