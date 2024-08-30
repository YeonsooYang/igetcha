//app/components/ButtonContainer.tsx
import { PRIMARY, WHITE } from "@/constants/Colors";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

type props = {
  onFilterChange: any;
};

const ButtonContainer = ({ onFilterChange }: props) => {
  //각 버튼을 눌렀을때 활성화상태에 대한 함수
  //디폴트 값이 통합이니까 스타트는 integrate로.
  const [category, setCategory] = useState("integrate");

  //버튼이 눌렸을 때 호출되는 함수
  const onPress = (buttonType: string) => {
    setCategory(buttonType);
    onFilterChange(buttonType);
  };

  return (
    <View style={buttonStyles.container}>
      <Pressable
        style={[
          buttonStyles.buttonDefault,
          category === "integrate"
            ? buttonStyles.buttonPressed
            : buttonStyles.buttonNonPressed,
        ]}
        onPress={() => onPress("integrate")}
      >
        <Text
          style={[
            buttonStyles.titleDefault,
            category === "integrate"
              ? buttonStyles.titlePressed
              : buttonStyles.titleNonPressed,
          ]}
        >
          통합
        </Text>
      </Pressable>

      <Pressable
        style={[
          buttonStyles.buttonDefault,
          category === "purchase"
            ? buttonStyles.buttonPressed
            : buttonStyles.buttonNonPressed,
        ]}
        onPress={() => onPress("purchase")}
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
        onPress={() => onPress("sell")}
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
        onPress={() => onPress("exchange")}
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
  );
};

ButtonContainer.propTypes = {
  onFilterChange: PropTypes.func,
};

export const buttonStyles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  //버튼 스타일
  buttonDefault: {
    width: "20%",
    //paddingVertical: 10,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: PRIMARY.DEFAULT,
    borderRadius: 50,
    borderWidth: 1,
  },
  buttonPressed: {
    backgroundColor: PRIMARY.DEFAULT,
  },
  buttonNonPressed: {
    backgroundColor: WHITE,
  },

  //버튼 내부 텍스트 스타일
  titleDefault: {
    //fontSize: 16,
    fontWeight: "700",
    //lineHeight: 20,
  },
  titlePressed: {
    color: WHITE,
  },
  titleNonPressed: {
    color: PRIMARY.DEFAULT,
  },
});

export default ButtonContainer;
