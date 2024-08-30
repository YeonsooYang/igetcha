//components/HeaderLeftButton.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import PropTypes from "prop-types";

type Props = {
  canGoBack: boolean;
  tintColor: string;
};

const HeaderLeftButton = ({ canGoBack, tintColor }: Props) => {
  const navigation = useNavigation();
  if (!canGoBack) return null;
  return (
    <Pressable onPress={navigation.goBack} hitSlop={100}>
      <View>
      <MaterialCommunityIcons
        name="chevron-left"
        size={30}
        color={tintColor}
      ></MaterialCommunityIcons>
      </View>
    </Pressable>
  );
};

HeaderLeftButton.propTypes = {
  canGoBack: PropTypes.bool,
  tintColor: PropTypes.string,
};

export default HeaderLeftButton;
