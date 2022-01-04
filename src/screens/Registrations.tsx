import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {HeadBar} from 'components/organisms/HeadBar';
import colors from 'variables/colors';
import QRCode from 'react-native-qrcode-svg';
import {Text} from 'components/atoms/Text';
import {Wrapper} from 'components/atoms/Wrapper';
import {useAppSelector} from 'store';
import {getRegisterInfosService} from 'services/registration';
import {RegisterInfoData} from 'services/registration/types';
import {ActivityIndicator, ListRenderItem} from 'react-native';

const renderOptions: ListRenderItem<RegisterInfoData> = ({item}) => {
  return (
    <InfoContainer>
      <QRContainer>
        <QRCode size={150} value={`registration-${item._id}`} />
      </QRContainer>
      <Wrapper mTop={8}>
        <Text>
          <Text color="blueSapphire">Đăng ký tiêm mũi :</Text>{' '}
          {item.typeOfRegister === 'firstVaccine' ? 'Mũi một' : 'Mũi hai'}
        </Text>
      </Wrapper>
      <Wrapper mTop={8}>
        <Text>
          <Text color="blueSapphire">Loại vaccine:</Text>{' '}
          {item.vaccineRegister.label}
        </Text>
      </Wrapper>
      {!!item.previousVaccine && (
        <Wrapper mTop={8}>
          <Text>
            <Text color="blueSapphire">Loại vaccine mũi một:</Text>{' '}
            {item.previousVaccine.label}
          </Text>
        </Wrapper>
      )}
      {!!item.previousVaccineDate && (
        <Wrapper mTop={8}>
          <Text>
            <Text color="blueSapphire">Ngày tiêm mũi một:</Text>{' '}
            {item.previousVaccineDate}
          </Text>
        </Wrapper>
      )}
      <Wrapper mTop={8}>
        <Text>
          <Text color="blueSapphire">Tiền sử bệnh án:</Text>{' '}
          {item.illnessHistory}
        </Text>
      </Wrapper>
      <Wrapper mTop={8}>
        <Text>
          <Text color="blueSapphire">Triệu chứng 14 ngày gần đây:</Text>{' '}
          {item.recentSymptom}
        </Text>
      </Wrapper>
      <Wrapper mTop={8}>
        <Text>
          <Text color="blueSapphire">
            Có tiếp xúc với F0 trong 14 ngày vừa qua?:
          </Text>{' '}
          {item.contactF0}
        </Text>
      </Wrapper>
      <Wrapper mTop={8}>
        <Text textTransfrom="capitalize">
          <Text color="blueSapphire">Tình trạng:</Text> {item.status}
        </Text>
      </Wrapper>
    </InfoContainer>
  );
};

const Registrations: React.FC = () => {
  const {userData} = useAppSelector(state => state.auth);

  const [loading, setLoading] = useState(false);
  const [listRegistrations, setListRegistrations] = useState<
    RegisterInfoData[]
  >([]);

  const init = useCallback(async () => {
    if (userData) {
      try {
        setLoading(true);
        const res = await getRegisterInfosService(userData._id);
        setListRegistrations(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [userData]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Container>
      <HeadBar isBack withSafe>
        Thông tin đăng ký tiêm vaccine
      </HeadBar>
      <FlatListContainer
        data={listRegistrations}
        renderItem={renderOptions}
        keyExtractor={(item, index) => `${item.value}-${index}`}
        ListHeaderComponent={
          loading ? (
            <ActivityIndicator size="small" color={colors.blueSapphire} />
          ) : null
        }
        ItemSeparatorComponent={() => <Wrapper mTop={24} />}
      />
    </Container>
  );
};

export default Registrations;

const Container = styled.View`
  flex: 1;
  background: ${colors.aliceBlue};
`;

const FlatListContainer = styled.FlatList`
  flex: 1;
  margin: 24px 0;
`;

const QRContainer = styled.View`
  margin: 16px;
  padding: 16px;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.View`
  margin: 0 20px;
  padding: 16px;
  background: ${colors.white};
  border: 1px solid ${colors.gainsboro};
  border-radius: 20px;
`;
