import { Image, Dimensions } from "react-native";

const Header = () => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <Image
      style={{ width: windowWidth, height: 47 }}
      source={require("../assets/images/header.png")}
    />
  );
};

export default Header;
