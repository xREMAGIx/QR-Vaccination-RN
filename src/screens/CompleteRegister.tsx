import React from 'react';
import styled from 'styled-components/native';
import {HeadBar} from 'components/organisms/HeadBar';
import colors from 'variables/colors';
import QRCode from 'react-native-qrcode-svg';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'components/atoms/Text';
import {Wrapper} from 'components/atoms/Wrapper';
import {Button} from 'components/atoms/Button';
import {useNavigation} from '@react-navigation/native';

const CompleteRegister: React.FC = () => {
  const navigation = useNavigation();

  const handleBackToHome = () => {
    navigation.navigate('MainNav');
  };

  return (
    <Container>
      <HeadBar withSafe>Đăng ký tiêm phòng</HeadBar>
      <ScrollView>
        <QRContainer>
          <QRCode size={250} value="http://awesome.link.qr" />
        </QRContainer>
        <InfoContainer>
          <Text color="blueSapphire" textAlign="center">
            Bạn đã đăng ký tiêm phòng thành công, thông tin của bạn đang được xử
            lý
          </Text>
          <Wrapper mTop={24}>
            <Text color="blueSapphire" textAlign="center">
              Khi nhận được thông báo tiêm phòng, bạn hãy đưa mã QR trên cho nơi
              tiêm phòng để tiến hành các thủ tục tiêm vaccine
            </Text>
          </Wrapper>
          <Wrapper mTop={40}>
            <Button handlePress={handleBackToHome}>Trở về trang chủ</Button>
          </Wrapper>
        </InfoContainer>
      </ScrollView>
    </Container>
  );
};

export default CompleteRegister;

const Container = styled.View`
  flex: 1;
  background: ${colors.white};
`;

const QRContainer = styled.View`
  margin: 20px;
  padding: 30px;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.gainsboro};
  border-radius: 20px;
`;

const InfoContainer = styled.View`
  margin: 0 20px;
`;
