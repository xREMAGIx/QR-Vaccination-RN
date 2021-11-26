import React from 'react';
import styled from 'styled-components/native';
import colors from 'variables/colors';
import QRCode from 'react-native-qrcode-svg';

const Home: React.FC = () => {
  return (
    <SafeAreaView>
      <QRCode value="http://awesome.link.qr" />
    </SafeAreaView>
  );
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export default Home;
