import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";

const CustomSplashScreen = () => (
  <WebView
    style={styles.splashContainer}
    source={{
      uri: "https://ios.cozycozy.com/progress?parameters=%7B%22placeId%22:%22ChIJD7fiBh9u5kcRYJSMaMOCCwQ%22,%22fromDate%22:%5B2024,6,12%5D,%22toDate%22:%5B2024,6,19%5D,%22adultCount%22:2,%22source%22:%22APP%22%7D",
    }}
  />
);

const Search = () => {
  const token = "asd";
  const webViewRef = useRef(null);
  const [webviewUrl, setWebviewUrl] = useState(
    "https://ios.cozycozy.com/launch?parameters=%7B%22placeId%22:%22ChIJD7fiBh9u5kcRYJSMaMOCCwQ%22,%22fromDate%22:%5B2024,6,12%5D,%22toDate%22:%5B2024,6,19%5D,%22adultCount%22:2,%22source%22:%22APP%22%7D"
  );

  let myInjectedJs = `(function(){
    let tk = window.localStorage.getItem('tokenKey');
    if(!tk || (tk && tk !== '${token}')){
        inputField.value = 'Token not found or invalid';
       window.localStorage.setItem('tokenKey', '${token}');
       let tok = window.localStorage.getItem('tokenKey');
       window.location.href = window.location.href;
    } else {
       console.log('Token found in localStorage:', tk);
    }
 })();`;

  return (
    <>
      <WebView
        source={{ uri: webviewUrl }}
        ref={webViewRef}
        startInLoadingState={true}
        onMessage={(event) => console.log(event.nativeEvent.data)}
        renderLoading={() => {
          return CustomSplashScreen();
        }}
        injectedJavaScript={myInjectedJs}
      />
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: 200,
    height: 200,
  },
});
