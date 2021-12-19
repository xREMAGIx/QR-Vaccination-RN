import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Flex, Wrapper} from 'components/atoms/Wrapper';
import {Text} from 'components/atoms/Text';
import {Textfield} from 'components/atoms/Textfield';
import {Button} from 'components/atoms/Button';
import colors from 'variables/colors';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {SigninSchema} from 'utils/schema';
import {SignInFormData} from 'services/auth/types';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const [isSecurity, setIsSecurity] = useState(true);

  const {reset, control, handleSubmit} = useForm<SignInFormData>({
    resolver: yupResolver(SigninSchema),
  });

  const handleSignin = async (data: SignInFormData) => {
    console.log(data);
    reset();
    navigation.navigate('Home');
  };

  const handleSignUp = () => {
    reset();
    navigation.navigate('SignUp');
  };

  return (
    <Container>
      <ScrollView>
        <Wrapper mTop={24}>
          <Text fw="bold" fs={24} lh={24} color="blueSapphire">
            Đăng nhập
          </Text>
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="username"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Tên đăng nhập"
                colorLabel="blueSapphire"
                borderColor="blueSapphire"
                handleChange={onChange}
                value={value}
                error={error?.message}
              />
            )}
            defaultValue=""
          />
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Mật khẩu"
                colorLabel="blueSapphire"
                borderColor="blueSapphire"
                isSecurity={isSecurity}
                handleChange={onChange}
                value={value}
                handleSubmit={handleSubmit(handleSignin)}
                iconRight="lockDavysGrey"
                handleIconRight={() => {
                  setIsSecurity(!isSecurity);
                }}
                error={error?.message}
              />
            )}
            defaultValue=""
          />
        </Wrapper>
        <Wrapper mTop={32}>
          <Flex>
            <Flex flexNum={1}>
              <ButtonView>
                <Button handlePress={handleSubmit(handleSignin)}>
                  Đăng nhập
                </Button>
              </ButtonView>
            </Flex>
          </Flex>
        </Wrapper>
        <Wrapper mTop={24}>
          <Flex justifyContent="space-between">
            <Flex alignItems="stretch" flexNum={2}>
              <Line />
            </Flex>
            <Flex alignItems="center" flexNum={1} justifyContent="center">
              <Text textAlign="center">Hoặc</Text>
            </Flex>
            <Flex alignItems="stretch" flexNum={2}>
              <Line />
            </Flex>
          </Flex>
        </Wrapper>
        <Wrapper mTop={24}>
          <Button variant="secondary" handlePress={handleSignUp}>
            Đăng ký
          </Button>
        </Wrapper>
      </ScrollView>
    </Container>
  );
};

export default SignIn;

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 16px;
`;

const Line = styled.View`
  background-color: ${colors.gainsboro};
  height: 1px;
  width: 100%;
`;

const ButtonView = styled.View`
  width: 100%;
`;
