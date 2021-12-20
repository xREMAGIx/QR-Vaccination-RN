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

const User: React.FC = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    navigation.navigate('SignIn');
  };

  return (
    <Container>
      <HeadBar isWhiteTheme withSafe>
        Thông tin người dùng
      </HeadBar>
      <ScrollView>
        <QRContainer>
          <QRCode size={250} value="http://awesome.link.qr" />
        </QRContainer>
        <InfoContainer>
          <Text color="blueSapphire" fw="medium">
            Họ và tên
          </Text>
          <Wrapper mTop={4}>
            <Text color="raisinBlack">Nguyễn Văn A</Text>
          </Wrapper>
          <Line />
          <Text color="blueSapphire" fw="medium">
            Số điện thoại
          </Text>
          <Wrapper mTop={4}>
            <Text color="raisinBlack">0912345678</Text>
          </Wrapper>
          <Line />
          <Text color="blueSapphire" fw="medium">
            Giới tính
          </Text>
          <Wrapper mTop={4}>
            <Text color="raisinBlack">Nam</Text>
          </Wrapper>
          <Line />
          <Text color="blueSapphire" fw="medium">
            Số CMND/CCCD
          </Text>
          <Wrapper mTop={4}>
            <Text color="raisinBlack">123456879879</Text>
          </Wrapper>

          <Wrapper mTop={40}>
            <Button variant="secondary" handlePress={handleSignOut}>
              Đăng xuất
            </Button>
          </Wrapper>
        </InfoContainer>
      </ScrollView>
    </Container>
  );
};

export default User;

const Container = styled.View`
  flex: 1;
  background: ${colors.aliceBlue};
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
  padding: 20px 16px;
  background: ${colors.white};
  border: 1px solid ${colors.gainsboro};
  border-radius: 20px;
`;

const Line = styled.View`
  height: 1px;
  width: 100%;
  background: ${colors.gainsboro};
  margin-top: 12px;
  margin-bottom: 12px;
`;