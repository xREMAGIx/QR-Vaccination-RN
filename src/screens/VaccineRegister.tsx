import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {HeadBar} from 'components/organisms/HeadBar';
import colors from 'variables/colors';
import {Wrapper} from 'components/atoms/Wrapper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Textfield} from 'components/atoms/Textfield';
import {VaccineRegisterSchema} from 'utils/schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {VaccineRegisterFormData} from 'services/registration/types';
import {Button} from 'components/atoms/Button';
import {Pulldown} from 'components/molecules/Pulldown';
import {Text} from 'components/atoms/Text';
import {RootStackParamsList} from './types';
import {useAppDispatch, useAppSelector} from 'store';
import {getVaccinesAction} from 'store/registration';
import {createRegisterInfoService} from 'services/registration';

const vaccineRegisterData = [
  {
    value: 'firstVaccine',
    label: 'Mũi một',
  },
  {
    value: 'secondVaccine',
    label: 'Mũi hai',
  },
];

type VaccineRegisterRouteProp = RouteProp<
  RootStackParamsList,
  'VaccineRegisterParam'
>;

const VaccineRegister: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const route = useRoute<VaccineRegisterRouteProp>();
  const {medicalHistory, symptomRecent, contactRecent} = route.params ?? {
    medicalHistory: '',
    symptomRecent: '',
    contactRecent: '',
  };

  const {userData} = useAppSelector(state => state.auth);
  const {vaccines} = useAppSelector(state => state.registration);

  const vaccineTypeData = useMemo(() => {
    if (vaccines && vaccines.length > 0) {
      return vaccines.map(item => ({
        value: item._id,
        label: item.label,
      }));
    }
    return [];
  }, [vaccines]);

  const {reset, control, handleSubmit} = useForm<VaccineRegisterFormData>({
    resolver: yupResolver(VaccineRegisterSchema),
    defaultValues: {
      vaccineRegister: undefined,
      vaccineType: undefined,
      firstVaccineType: undefined,
      firstVaccineTime: '',
    },
  });

  const handleBack = () => {
    reset();
    navigation.goBack();
  };

  const handleContinue = async (data: VaccineRegisterFormData) => {
    try {
      const res = await createRegisterInfoService({
        userId: userData?._id || '',
        typeOfRegister: data.vaccineRegister.value,
        vaccineRegisterId: data.vaccineType.value,
        previousVaccineId: data.firstVaccineType?.value,
        previousVaccineDate: data.firstVaccineTime,
        illnessHistory: medicalHistory || '',
        recentSymptom: symptomRecent || '',
        contactF0: contactRecent || '',
      });
      navigation.navigate('RegistrationNav', {
        screen: 'CompleteRegister',
        params: {
          id: res._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getVaccinesAction());
  }, [dispatch]);

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
