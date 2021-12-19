import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Flex, Wrapper} from 'components/atoms/Wrapper';
import {Text} from 'components/atoms/Text';
import {Textfield} from 'components/atoms/Textfield';
import {Button} from 'components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {SignupSchema} from 'utils/schema';
import {SignUpFormData} from 'services/auth/types';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const [isSecurity, setIsSecurity] = useState(true);

  const {reset, control, handleSubmit} = useForm<SignUpFormData>({
    resolver: yupResolver(SignupSchema),
  });

  const handleSignin = async (data: SignUpFormData) => {
    console.log(data);
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    reset();
    navigation.navigate('SignIn');
  };

  return (
    <Container>
      <ScrollView>
        <Wrapper mTop={24}>
          <Text fw="bold" fs={24} lh={24} color="blueSapphire">
            Đăng ký
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
          />
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="phone"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Số điện thoại"
                colorLabel="blueSapphire"
                borderColor="blueSapphire"
                handleChange={onChange}
                value={value}
                error={error?.message}
              />
            )}
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
                iconRight="lockDavysGrey"
                handleIconRight={() => {
                  setIsSecurity(!isSecurity);
                }}
                error={error?.message}
              />
            )}
          />
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Xác nhận Mật khẩu"
                colorLabel="blueSapphire"
                borderColor="blueSapphire"
                isSecurity={isSecurity}
                handleChange={onChange}
                value={value}
                iconRight="lockDavysGrey"
                handleIconRight={() => {
                  setIsSecurity(!isSecurity);
                }}
                error={error?.message}
              />
            )}
          />
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="dob"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Ngày sinh"
                colorLabel="blueSapphire"
                borderColor="blueSapphire"
                isSecurity={isSecurity}
                handleChange={onChange}
                value={value}
                iconRight="lockDavysGrey"
                handleIconRight={() => {
                  setIsSecurity(!isSecurity);
                }}
                error={error?.message}
              />
            )}
          />
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="identity"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Số CMND/CCCD"
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
          />
        </Wrapper>
        <Wrapper mTop={32}>
          <Flex>
            <Flex flexNum={1}>
              <ButtonView>
                <Button handlePress={handleSubmit(handleSignin)}>
                  Đăng ký
                </Button>
              </ButtonView>
            </Flex>
          </Flex>
        </Wrapper>
        <Wrapper mTop={24}>
          <Button
            variant="secondary"
            iconNameLeft="arrowPrevBlack"
            handlePress={handleSignUp}>
            Đăng nhập
          </Button>
        </Wrapper>
      </ScrollView>
    </Container>
  );
};

export default SignUp;

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 16px;
`;

const ButtonView = styled.View`
  width: 100%;
`;
