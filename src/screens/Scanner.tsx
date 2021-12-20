import React, {Fragment, useRef, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {TouchableOpacity, Text, StatusBar, Linking, View} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';

const Scanner: React.FC = () => {
  const [scan, setScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState<BarCodeReadEvent>();

  const scanner = useRef<QRCodeScanner>();

  const onSuccess = (e: BarCodeReadEvent) => {
    const check = e.data.substring(0, 4);
    setScan(false);
    setResult(e);
    setScanResult(true);
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      setScan(false);
      setResult(e);
      setScanResult(true);
    }
  };

  const activeQR = () => {
    setScan(true);
  };

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  return (
    <View>
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <Text>Welcome To React-Native QR Code Tutorial !</Text>
        {!scan && !scanResult && (
          <View>
            <TouchableOpacity onPress={activeQR}>
              <Text>Click to Scan !</Text>
            </TouchableOpacity>
          </View>
        )}

        {scanResult && result && (
          <Fragment>
            <Text>Result !</Text>
            <View>
              <Text>Type : {result.type}</Text>
              <Text>Result : {result.data}</Text>
              <Text numberOfLines={1}>RawData: {result.rawData}</Text>
              <TouchableOpacity onPress={scanAgain}>
                <Text>Click to Scan again!</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}

        {scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={scanner}
            onRead={onSuccess}
            topContent={
              <Text>
                Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer
                and scan the QR code to test.
              </Text>
            }
            bottomContent={
              <View>
                <TouchableOpacity onPress={() => scanner.current?.reactivate()}>
                  <Text>OK. Got it!</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setScan(false)}>
                  <Text>Stop Scan</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </Fragment>
    </View>
  );
};

export default Scanner;
