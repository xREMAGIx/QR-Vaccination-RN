import React, {useEffect, useState} from 'react';
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
import {LoginParams} from 'services/auth/types';
import {getInfoAction, loginAction} from 'store/auth';
import {useAppDispatch, useAppSelector} from 'store';
import StorageService from 'services/storage';

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {userData, error} = useAppSelector(state => state.auth);

  const [isSecurity, setIsSecurity] = useState(true);

  const {reset, control, handleSubmit} = useForm<LoginParams>({
    resolver: yupResolver(SigninSchema),
  });

  const handleSignin = async (data: LoginParams) => {
    dispatch(loginAction(data))
      .unwrap()
      .then(async () => await dispatch(getInfoAction()));
  };

  const handleSignUp = () => {
    reset();
    navigation.navigate('SignUp');
  };

  const handleAutoLogin = async () => {
    const token = await StorageService.gettingStorage('token');
    if (token) {
      dispatch(getInfoAction());
    }
  };

  useEffect(() => {
    handleAutoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData) {
      reset();
      navigation.navigate('MainNav');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

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
        {error && (
          <Wrapper mTop={24}>
            <Text color="engineering">{error}</Text>
          </Wrapper>
        )}
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
