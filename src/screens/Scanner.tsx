import React, {Fragment, useRef, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {TouchableOpacity, Linking, View} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import styled from 'styled-components/native';
import {Icon} from 'components/atoms/Icon';
import {Wrapper} from 'components/atoms/Wrapper';
import {Button} from 'components/atoms/Button';
import {Text} from 'components/atoms/Text';
import {useNavigation} from '@react-navigation/native';

const Scanner: React.FC = () => {
  const navigation = useNavigation();

  const [scan, setScan] = useState(true);
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

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
    scanner.current?.reactivate();
  };

  const handleContinue = () => {
    setScan(false);
    navigation.navigate('RegistrationNav');
  };

  const handleBack = () => {
    setScan(false);
    navigation.navigate('MainNav');
  };

  return (
    <Container>
      <Fragment>
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
              <Text color="blueSapphire">
                Vui lòng đặt mã QR ở giữa khung để quét mã QR
              </Text>
            }
            customMarker={<Icon iconName="scanner" size={250} />}
            bottomContent={
              <Wrapper>
                <Button variant="primary" handlePress={scanAgain}>
                  Quét lại
                </Button>
                <Wrapper mTop={24}>
                  <Button variant="primary" handlePress={handleContinue}>
                    Tiếp tục
                  </Button>
                </Wrapper>
                <Wrapper mTop={24}>
                  <Button variant="secondary" handlePress={handleBack}>
                    Trở về
                  </Button>
                </Wrapper>
              </Wrapper>
            }
          />
        )}
      </Fragment>
    </Container>
  );
};

export default Scanner;

const Container = styled.SafeAreaView`
  flex: 1;
`;
