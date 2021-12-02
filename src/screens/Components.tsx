import React from 'react';
import styled from 'styled-components/native';
import colors from 'variables/colors';
import QRCode from 'react-native-qrcode-svg';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'components/atoms/Text';
import {Button} from 'components/atoms/Button';
import {Wrapper} from 'components/atoms/Wrapper';
import {Textfield} from 'components/atoms/Textfield';
import {Image} from 'components/atoms/Image';
import {Icon} from 'components/atoms/Icon';

const Components: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <QRCode value="http://awesome.link.qr" />
        <Wrapper mTop={8}>
          <Text color="black">Text</Text>
        </Wrapper>
        <Wrapper mTop={8}>
          <Button>Button</Button>
        </Wrapper>
        <Wrapper mTop={8}>
          <Button variant="secondary">Button</Button>
        </Wrapper>
        <Wrapper mTop={8}>
          <Textfield
            label="Name"
            colorLabel="blueSapphire"
            placeholder="Input"
            borderColor="blueSapphire"
          />
        </Wrapper>
        <Wrapper mTop={8}>
          <Image source={{uri: 'https://source.unsplash.com/random'}} />
        </Wrapper>
        <Wrapper mTop={8}>
          <Icon iconName="qr" />
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export default Components;
