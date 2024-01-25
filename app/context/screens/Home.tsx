import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import WebView from "react-native-webview";
type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Login: undefined;
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  const [searchPressed, setSearchPressed] = useState(false);
  const [webviewLoaded, setWebviewLoaded] = useState(false);
  const [showSecondWebview, setShowSecondWebview] = useState(false);

  const loadSearchSplashScreen = () => {
    setSearchPressed(true);
  };

  const onWebViewLoaded = () => {
    console.log("WebviewLoaded");
    setWebviewLoaded(true);
  };

  return (
    <View style={styles.container}>
      {!searchPressed && (
        <View style={[styles.overlay, !searchPressed && styles.overlayButton]}>
          <Button title="Search" onPress={loadSearchSplashScreen} />
        </View>
      )}

      <WebView
        webViewStyle={{ opacity: 0.99 }}
        androidHardwareAccelerationDisabled={true}
        style={[
          styles.webview,
          searchPressed && !webviewLoaded && styles.hidden,
        ]}
        source={{
          uri: "https://ios.cozycozy.com/progress?parameters=%7B%22placeId%22:%22ChIJD7fiBh9u5kcRYJSMaMOCCwQ%22,%22fromDate%22:%5B2024,6,12%5D,%22toDate%22:%5B2024,6,19%5D,%22adultCount%22:2,%22source%22:%22APP%22%7D",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayButton: {
    zIndex: 1,
  },
  webview: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  hidden: {
    display: "none",
  },
  fullScreen: {
    zIndex: 1,
  },
});

export default HomeScreen;
