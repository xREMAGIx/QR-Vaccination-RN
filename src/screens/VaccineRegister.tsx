import React from 'react';
import styled from 'styled-components/native';
import {HeadBar} from 'components/organisms/HeadBar';
import colors from 'variables/colors';
import {Wrapper} from 'components/atoms/Wrapper';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Textfield} from 'components/atoms/Textfield';
import {VaccineRegisterSchema} from 'utils/schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {VaccineRegisterFormData} from 'services/registration/types';
import {Button} from 'components/atoms/Button';
import {Pulldown} from 'components/molecules/Pulldown';
import {Text} from 'components/atoms/Text';

const vaccineRegisterData = [
  {
    value: 'first',
    label: 'Mũi một',
  },
  {
    value: 'second',
    label: 'Mũi hai',
  },
];

const vaccineTypeData = [
  {
    value: 'astra',
    label: 'Astra Zeneca',
  },
  {
    value: 'moderna',
    label: 'Moderna',
  },
  {
    value: 'pfizer',
    label: 'Pfizer',
  },
];

const VaccineRegister: React.FC = () => {
  const navigation = useNavigation();

  const {reset, control, handleSubmit} = useForm<VaccineRegisterFormData>({
    resolver: yupResolver(VaccineRegisterSchema),
    defaultValues: {
      firstVaccineTime: '',
    },
  });

  const handleBack = () => {
    reset();
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate('RegistrationNav', {screen: 'CompleteRegister'});
  };

  return (
    <Container>
      <HeadBar isBack handleLeft={handleBack} withSafe>
        Đăng ký vaccine tiêm phòng
      </HeadBar>
      <ScrollContainer>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="vaccineRegister"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <>
                <Pulldown
                  label="Đăng ký tiêm mũi"
                  data={vaccineRegisterData}
                  selectedValue={value}
                  handleSelect={e => onChange(e)}
                />
                {error && <Text color="engineering">{error?.message}</Text>}
              </>
            )}
          />
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="vaccineType"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <>
                <Pulldown
                  label="Loại vaccine"
                  data={vaccineTypeData}
                  selectedValue={value}
                  handleSelect={e => onChange(e)}
                />
                {error && <Text color="engineering">{error?.message}</Text>}
              </>
            )}
          />
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="firstVaccineType"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <>
                <Pulldown
                  label="Loại vaccine mũi một (nếu có)"
                  data={vaccineTypeData}
                  selectedValue={value}
                  handleSelect={e => onChange(e)}
                />
                {error && <Text color="engineering">{error?.message}</Text>}
              </>
            )}
          />
        </Wrapper>
        <Wrapper mTop={16}>
          <Controller
            control={control}
            name="firstVaccineTime"
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Textfield
                label="Ngày tiêm mũi một (nếu có)"
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
          <Button handlePress={handleSubmit(handleContinue)}>Đăng ký</Button>
        </Wrapper>
      </ScrollContainer>
    </Container>
  );
};

export default VaccineRegister;

const Container = styled.View`
  flex: 1;
  background: ${colors.white};
`;

const ScrollContainer = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
`;
