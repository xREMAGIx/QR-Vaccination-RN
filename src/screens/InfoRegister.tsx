import React from 'react';
import styled from 'styled-components/native';
import {HeadBar} from 'components/organisms/HeadBar';
import colors from 'variables/colors';
import {Wrapper} from 'components/atoms/Wrapper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Textfield} from 'components/atoms/Textfield';
import {InfoRegisterSchema} from 'utils/schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {InfoRegisterFormData} from 'services/registration/types';
import {Button} from 'components/atoms/Button';
import {RootStackParamsList} from './types';

type InfoRegisterRouteProp = RouteProp<
  RootStackParamsList,
  'InfoRegisterParam'
>;

const InfoRegister: React.FC = () => {
  const navigation = useNavigation();

  const route = useRoute<InfoRegisterRouteProp>();
  const {user: userRoute} = route.params ?? {
    user: undefined,
  };

  const {reset, control, handleSubmit} = useForm<InfoRegisterFormData>({
    resolver: yupResolver(InfoRegisterSchema),
    defaultValues: {
      name: userRoute?.fullName || '',
    },
  });

  const handleBack = () => {
    reset();
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate('RegistrationNav', {screen: 'VaccineRegister'});
  };

  return (
    <Container>
      <HeadBar isBack handleLeft={handleBack} withSafe>
        Khai báo thông tin tiêm phòng
      </HeadBar>
      <ScrollContainer>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Họ và tên"
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
            name="gender"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Giới tính"
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
            name="identity"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Số CMND/CCCD"
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
            name="medicalHistory"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Tiền sử bệnh án (nếu có, liệt kê)"
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
            name="symptomRecent"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Triệu chứng 14 ngày gần đây (nếu có, liệt kê)"
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
            name="contactRecent"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Có tiếp xúc với F0 trong 14 ngày vừa qua?"
                colorLabel="blueSapphire"
                borderColor="blueSapphire"
                handleChange={onChange}
                value={value}
                error={error?.message}
              />
            )}
          />
        </Wrapper>
        <Wrapper mTop={40}>
          <Button handlePress={handleSubmit(handleContinue)}>Tiếp tục</Button>
        </Wrapper>
      </ScrollContainer>
    </Container>
  );
};

export default InfoRegister;

const Container = styled.View`
  flex: 1;
  background: ${colors.white};
`;

const ScrollContainer = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
`;
