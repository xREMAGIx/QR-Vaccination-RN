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
                K???t qu??? qu??t m?? v???ch
              </Text>
            </Wrapper>
            <Wrapper mTop={24} mLeft={16} mRight={16}>
              <Text>M?? QR: {result.data}</Text>
              <Wrapper mTop={24}>
                <Text fw="bold" color="blueSapphire">
                  Th??ng tin:
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
                          <Text color="blueSapphire">?????a ch???:</Text>{' '}
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
                            <Text color="blueSapphire">H??? v?? t??n:</Text>{' '}
                            {user?.fullName}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">S??? ??i???n tho???i:</Text>{' '}
                            {user?.phone}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Ng??y sinh:</Text>{' '}
                            {user?.dateOfBirth}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Gi???i t??nh:</Text>{' '}
                            {user?.gender}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">S??? CMND/CCCD:</Text>{' '}
                            {user?.identityInfo}
                          </Text>
                        </Wrapper>
                        <Wrapper mTop={12}>
                          <Text>
                            <Text color="blueSapphire">Ph??n quy???n:</Text>{' '}
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
                                ????ng k?? ti??m m??i :
                              </Text>{' '}
                              {registration.typeOfRegister === 'firstVaccine'
                                ? 'M??i m???t'
                                : 'M??i hai'}
                            </Text>
                          </Wrapper>
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">Lo???i vaccine:</Text>{' '}
                              {registration.vaccineRegister.label}
                            </Text>
                          </Wrapper>
                          {!!registration.previousVaccine && (
                            <Wrapper mTop={8}>
                              <Text>
                                <Text color="blueSapphire">
                                  Lo???i vaccine m??i m???t:
                                </Text>{' '}
                                {registration.previousVaccine.label}
                              </Text>
                            </Wrapper>
                          )}
                          {!!registration.previousVaccineDate && (
                            <Wrapper mTop={8}>
                              <Text>
                                <Text color="blueSapphire">
                                  Ng??y ti??m m??i m???t:
                                </Text>{' '}
                                {registration.previousVaccineDate}
                              </Text>
                            </Wrapper>
                          )}
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">Ti???n s??? b???nh ??n:</Text>{' '}
                              {registration.illnessHistory}
                            </Text>
                          </Wrapper>
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">
                                Tri???u ch???ng 14 ng??y g???n ????y:
                              </Text>{' '}
                              {registration.recentSymptom}
                            </Text>
                          </Wrapper>
                          <Wrapper mTop={8}>
                            <Text>
                              <Text color="blueSapphire">
                                C?? ti???p x??c v???i F0 trong 14 ng??y v???a qua?:
                              </Text>{' '}
                              {registration.contactF0}
                            </Text>
                          </Wrapper>
                          <Wrapper mTop={8}>
                            <Text textTransfrom="capitalize">
                              <Text color="blueSapphire">T??nh tr???ng:</Text>{' '}
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
                    Ti???p t???c
                  </Button>
                </Wrapper>
              )}
              <Wrapper mTop={24}>
                <Button variant={'secondary'} handlePress={scanAgain}>
                  Qu??t l???i
                </Button>
              </Wrapper>
              <Wrapper mTop={16}>
                <Button
                  variant={routeCase ? 'secondary' : 'primary'}
                  handlePress={handleBack}>
                  Tr??? v???
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
                Vui l??ng ?????t m?? QR ??? gi???a khung ????? qu??t m?? QR
              </Text>
            }
            customMarker={<Icon iconName="scanner" size={250} />}
            bottomContent={
              <Wrapper>
                <Button variant="primary" handlePress={scanAgain}>
                  Qu??t l???i
                </Button>
                <Wrapper mTop={24}>
                  <Button variant="secondary" handlePress={handleBack}>
                    Tr??? v???
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
