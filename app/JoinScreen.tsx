// app/JoinScreen.tsx

import HeaderLeftButton from "@/components/HeaderLeftButton";
import { GRAY, PRIMARY, WHITE } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const JoinScreen = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [idCheck, setIdCherck] = useState(false);
    const [checkIconColor, setCheckIconColor] = useState("#B7B7B7");
    const [users, setUsers] = useState([]);

    const navigation = useNavigation();
    const canGoBack = navigation.canGoBack();


    //아이디 중복 확인 후 체크아이콘 색상 동기 변경
    useEffect(()=>{
        if(idCheck) {
            setCheckIconColor(PRIMARY.DEFAULT);
        } else {
            setCheckIconColor("#B7B7B7");
        }
    },[idCheck])

    //아이디 중복확인
    const  handleIdCheck = () => {
        if(userId == ''){
            Alert.alert('입력 오류', '아이디를 입력하세요.')
            return false;
        }

        const idExists = users.some(user => user.id === userId);
        
        if(idExists) {
            Alert.alert('아이디 중복', '이미 사용 중인 아이디입니다.');
            return false;
        }

        Alert.alert('아이디 사용 가능', '사용가능한 아이디입니다.');
        setIdCherck(true);
    }
    
    //회원등록 (버튼 클릭시)
    const handleSignUp = () => {
        
        if(password != rePassword){
            Alert.alert('입력오류', '패스워드가 같지 않습니다.')
            return false;
        }

        if(!idCheck) {
            Alert.alert('입력오류', '아이디 중복 확인을 해주세요.');
            return false;
        }

        if(userId && password && rePassword && nickname && email) {
            setUsers([...users, { id:userId, password, nickname, email } ]);

            setUserId('');
            setPassword('');
            setRePassword('');
            setNickname('');
            setEmail('');
            setIdCherck(false);

            Alert.alert(
                '회원가입 성공',
                '회원가입을 축하합니다!',
                [
                    {
                        text:'확인',
                        onPress: ()=> navigation.goBack(),
                    }
                ]
            );
        } else {
            Alert.alert('입력오류', '정보를 모두 입력하세요.');
        }
    }

    //취소 버튼 클릭시
    const handleCancel = () => {
        navigation.goBack();
    }
    
    return(
        <>
        
        {/* 헤더 */}
        <View style={styles.header}>
            <HeaderLeftButton canGoBack={canGoBack} tintColor="white" />
            <Text style={styles.headerTitle}>회원가입</Text>
        </View>
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.textContainer}>
                    <MaterialCommunityIcons
                        name="emoticon-excited"
                        style={styles.icon}
                        size={20}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="아이디"
                            placeholderTextColor="#999"
                            value={userId}
                            onChangeText={(text) => {
                                setUserId(text); 
                                setIdCherck(false);
                            }}
                            style={styles.input}
                        />
                        {/* <MaterialCommunityIcons
                            name="check"
                            size={17}
                            style={{paddingTop:14,
                                     marginRight:20,
                                    color: checkIconColor
                            }}
                            
                        /> */}
                        <Pressable 
                            onPress={handleIdCheck} 
                            style={({ pressed }) => [
                                styles.inputButton,
                                {backgroundColor: pressed ? '#ff3333' : '#FF6B6B'}
                            ]}
                            
                            >
                            <Text style={{fontSize:14, color:WHITE}}>확인</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <MaterialCommunityIcons
                        name="lock"
                        style={styles.icon}
                        size={20}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="패스워드"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <MaterialCommunityIcons
                        name="lock"
                        style={styles.icon}
                        size={20}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="패스워드확인"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={rePassword}
                            onChangeText={setRePassword}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <MaterialCommunityIcons
                        name="account"
                        style={styles.icon}
                        size={20}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="닉네임"
                            placeholderTextColor="#999"
                            value={nickname}
                            onChangeText={setNickname}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <MaterialCommunityIcons
                        name="email"
                        style={styles.icon}
                        size={20}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="이메일" 
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>

                    <Pressable 
                        onPress={handleCancel} 
                        style={({ pressed }) => [
                            styles.buttonCancel,
                            {marginTop:10, borderColor:PRIMARY.DEFAULT, borderBottomWidth:1, borderTopWidth:1,},
                            {backgroundColor: pressed ? '#fffff' : '#fffff'}
                        ]}
                        >
                        <Text style={[styles.buttonText, {color:PRIMARY.DEFAULT}]}>취소</Text>
                    </Pressable>
                    
                    <Pressable 
                        onPress={handleSignUp} 
                        style={({ pressed }) => [
                            styles.button,
                            {backgroundColor: pressed ? '#ff3333' : '#FF6B6B'}
                        ]}
                        >
                        <Text style={[styles.buttonText, {color:WHITE}]}>등록</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:WHITE,
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingHorizontal:20,
    },
    textContainer:{
        borderColor:PRIMARY.DEFAULT,
        borderWidth:1,
        borderRadius:50,
        height:50,
        marginTop:20,
        width:"100%",
        flexDirection: 'row',
    },
    inputContainer:{
        width:'80%',
        left:50,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    buttonContainer:{
        paddingTop:10,
        width:'100%',
        flexDirection:'row',
        alignItems:'flex-end',
        //justifyContent:'flex-end',
        justifyContent: 'flex-end',
        
        
    },
    icon:{
        position: 'absolute',
        color:PRIMARY.DEFAULT,
        top:13,
        left:10,
    },
    input:{
        width:'80%',
        fontSize:15,
        // marginLeft:40,
        color:PRIMARY.DEFAULT,
    },
    inputButton:{
        width:40, 
        borderRadius:50, 
        height:30,
        top:8,
        right:0,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        // width:"100%",
        // backgroundColor:PRIMARY.DEFAULT,
        // height:50,
        // justifyContent:'center',
        // alignItems:'center',
        // borderRadius:10,

        width: 70, // 두 버튼의 너비를 동일하게 설정
        backgroundColor: PRIMARY.DEFAULT,
        borderRadius: 50,
        padding: 9,
        alignItems: 'center',
        marginRight: 10,
        borderColor: PRIMARY.DEFAULT,
        borderWidth: 1,
    },
    buttonCancel:{
        width: 70, // 두 버튼의 너비를 동일하게 설정
        backgroundColor: WHITE,
        borderRadius: 50,
        padding: 9,
        alignItems: 'center',
        marginRight: 10,
        borderColor: PRIMARY.DEFAULT,
        borderWidth: 1,
    },
    buttonText:{
        fontWeight:'bold',
        //fontSize:20,
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
    
})

export default JoinScreen;