import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ActivityIndicator, Linking, ScrollView} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import styled from 'styled-components/native';
import {Icon} from 'components/atoms/Icon';
import {Wrapper} from 'components/atoms/Wrapper';
import {Button} from 'components/atoms/Button';
import {Text} from 'components/atoms/Text';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {getVaccinationPlaceService} from 'services/vaccinationPlace';
import {VaccinationPlaceData} from 'services/vaccinationPlace/types';
import {UserData} from 'services/auth/types';
import {getUserService} from 'services/auth';
import {RootStackParamsList} from './types';
import {useAppSelector} from 'store';
import {RegisterInfoData} from 'services/registration/types';
import colors from 'variables/colors';
import {getRegisterInfoService} from 'services/registration';

type ScannerRouteProp = RouteProp<RootStackParamsList, 'ScannerParam'>;

const Scanner: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScannerRouteProp>();
  const {case: routeCase} = route.params ?? {
    case: undefined,
  };

  const {userData} = useAppSelector(state => state.auth);

  const [scan, setScan] = useState(true);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState<BarCodeReadEvent>();
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState('');
  const [vaccinationPlace, setVaccinationPlace] =
    useState<VaccinationPlaceData>();
  const [user, setUser] = useState<UserData>();
  const [registration, setRegistration] = useState<RegisterInfoData>();

  const scanner = useRef<QRCodeScanner>();

  const onSuccess = (e: BarCodeReadEvent) => {
    const check = e.data.substring(0, 4);
    setScan(false);
    setResult(e);
    setScanResult(true);
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      setScan(false);
      setResult(e);
      setScanResult(true);
    }
  };

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
    scanner.current?.reactivate();
  };

  const handleContinue = () => {
    setScan(false);
    if (routeCase === 'register') {
      navigation.navigate('RegistrationNav', {
        screen: 'InfoRegister',
        params: {
          user: userData,
        },
      });
    }
  };

  const handleBack = () => {
    setScan(false);
    navigation.navigate('MainNav');
  };

  const handleGetQRInfo = useCallback(async (data: string) => {
    const qrCode = data.split('-')[0];
    const qrId = data.split('-')[1];
    setCode(qrCode);
    try {
      setLoading(true);
      switch (qrCode) {
        case 'place':
          const placeData = await getVaccinationPlaceService(qrId);
          setVaccinationPlace(placeData);
          break;
        case 'user':
          const userRes = await getUserService(qrId);
          setUser(userRes);
          break;
        case 'registration':
          const registrationRes = await getRegisterInfoService(qrId);
          setRegistration(registrationRes);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (result && result.data) {
      handleGetQRInfo(result.data);
    }
  }, [result, handleGetQRInfo]);

  return (
    <Container>
      <Fragment>
        {scanResult && result && (
          <ScrollView>
            <Wrapper mTop={24}>
              <Text
                textAlign="center"
                fs={32}
                fw="bold"
                color="blueSapphire"
                textTransfrom="capitalize">
                Kết quả quét mã vạch
              </Text>
            </Wrapper>
            <Wrapper mTop={24} mLeft={16} mRight={16}>
              <Text>Mã QR: {result.data}</Text>
              <Wrapper mTop={24}>
                <Text fw="bold" color="blueSapphire">
                  Thông tin:
                </Text>
              </Wrapper>
              {(() => {
                if (loading) {
                  return (
                    <ActivityIndicator
                      size="small"
                      color={colors.blueSapphire}
                    />
                  );
                }
                switch (code) {
                  case 'place': {
                    return (
                      <Wrapper mTop={12}>
                        <Text>
                          <Text color="blueSapphire">Địa chỉ:</Text>{' '}
                          {vaccinationPlace?.address}
                        </Text>
                      </Wrapper>
                    );
                  }
                  case 'user': {
                    return (
                      <>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Họ và tên:</Text>{' '}
                            {user?.fullName}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Số điện thoại:</Text>{' '}
                            {user?.phone}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Ngày sinh:</Text>{' '}
                            {user?.dateOfBirth}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Giới tính:</Text>{' '}
                            {user?.gender}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Số CMND/CCCD:</Text>{' '}
                            {user?.identityInfo}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Phân quyền:</Text>{' '}
                            {user?.role}
                          </Text>
                        </Wrapper>
                      </>
                    );
                  }
                  case 'registration': {
                    if (registration) {
                      return (
                        <>
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">
                                Đăng ký tiêm mũi :
                              </Text>{' '}
                              {registration.typeOfRegister === 'firstVaccine'
                                ? 'Mũi một'
                                : 'Mũi hai'}
                            </Text>
                          </Wrapper>
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">Loại vaccine:</Text>{' '}
                              {registration.vaccineRegister.label}
                            </Text>
                          </Wrapper>
                          {!!registration.previousVaccine && (
                            <Wrapper mTop={8}>
                              <Text>
                                <Text color="blueSapphire">
                                  Loại vaccine mũi một:
                                </Text>{' '}
                                {registration.previousVaccine.label}
                              </Text>
                            </Wrapper>
                          )}
                          {!!registration.previousVaccineDate && (
                            <Wrapper mTop={8}>
                              <Text>
                                <Text color="blueSapphire">
                                  Ngày tiêm mũi một:
                                </Text>{' '}
                                {registration.previousVaccineDate}
                              </Text>
                            </Wrapper>
                          )}
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">Tiền sử bệnh án:</Text>{' '}
                              {registration.illnessHistory}
                            </Text>
                          </Wrapper>
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">
                                Triệu chứng 14 ngày gần đây:
                              </Text>{' '}
                              {registration.recentSymptom}
                            </Text>
                          </Wrapper>
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">
                                Có tiếp xúc với F0 trong 14 ngày vừa qua?:
                              </Text>{' '}
                              {registration.contactF0}
                            </Text>
                          </Wrapper>
                          <Wrapper mTop={8}>
                            <Text textTransfrom="capitalize">
                              <Text color="blueSapphire">Tình trạng:</Text>{' '}
                              {registration.status}
                            </Text>
                          </Wrapper>
                        </>
                      );
                    }
                    return null;
                  }
                  default:
                    return null;
                }
              })()}
              {!!routeCase && (
                <Wrapper mTop={24}>
                  <Button variant="primary" handlePress={handleContinue}>
                    Tiếp tục
                  </Button>
                </Wrapper>
              )}
              <Wrapper mTop={24}>
                <Button variant={'secondary'} handlePress={scanAgain}>
                  Quét lại
                </Button>
              </Wrapper>
              <Wrapper mTop={16}>
                <Button
                  variant={routeCase ? 'secondary' : 'primary'}
                  handlePress={handleBack}>
                  Trở về
                </Button>
              </Wrapper>
            </Wrapper>
          </ScrollView>
        )}

        {scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={scanner}
            onRead={onSuccess}
            topContent={
              <Text color="blueSapphire">
                Vui lòng đặt mã QR ở giữa khung để quét mã QR
              </Text>
            }
            customMarker={<Icon iconName="scanner" size={250} />}
            bottomContent={
              <Wrapper>
                <Button variant="primary" handlePress={scanAgain}>
                  Quét lại
                </Button>
                <Wrapper mTop={24}>
                  <Button variant="secondary" handlePress={handleBack}>
                    Trở về
                  </Button>
                </Wrapper>
              </Wrapper>
            }
          />
        )}
      </Fragment>
    </Container>
  );
};

export default Scanner;

const Container = styled.SafeAreaView`
  flex: 1;
`;
