import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import colors, {colorsAlpha} from 'variables/colors';
import {Icon} from 'components/atoms/Icon';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  View,
  Platform,
} from 'react-native';
import {Text} from 'components/atoms/Text';
import {Flex, Wrapper} from 'components/atoms/Wrapper';
import {Button} from 'components/atoms/Button';

export type PulldownOptionTypes = {
  id?: string | number;
  label: string;
  value: string;
};

type Props = {
  label: string;
  modalHeader?: string;
  data: PulldownOptionTypes[];
  disabled?: boolean;
  selectedValue?: PulldownOptionTypes;
  refreshing?: boolean;
  handleSelect?: (value: PulldownOptionTypes) => void;
  handleRefresh?: () => void;
  onEndReached?: () => void;
  handleRemove?: () => void;
  loadingSearch?: boolean;
  loading?: boolean;
};

export const Pulldown: React.FC<Props> = ({
  label,
  modalHeader,
  data,
  disabled,
  selectedValue,
  refreshing = false,
  handleSelect,
  handleRefresh,
  onEndReached,
  loadingSearch,
  loading,
}) => {
  const [listData, setListData] = useState<PulldownOptionTypes[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  const handleCustomSelect = (item: PulldownOptionTypes) => {
    setOpenModal(false);
    if (handleSelect) {
      handleSelect(item);
    }
  };

  const handleCloseModal = () => {
    setListData(data);
    setOpenModal(!openModal);
  };

  const renderOptions: ListRenderItem<PulldownOptionTypes> = ({item}) => {
    return (
      <Pressable onPress={() => handleCustomSelect(item)}>
        {({pressed}) => (
          <OptionContainer onSelected={pressed || item === selectedValue}>
            <Text fs={16}>{item.label}</Text>
          </OptionContainer>
        )}
      </Pressable>
    );
  };

  return (
    <Container>
      {label && (
        <Label fs={14} isFocused={!!selectedValue}>
          {label}
        </Label>
      )}
      <Pressable
        disabled={disabled}
        onPress={() => {
          setOpenModal(true);
        }}>
        {({pressed}) => (
          <PickerWrapper pressed={pressed}>
            <TextWrapper disabled={disabled}>
              <Text fs={16} numberOfLines={2}>
                {selectedValue?.label}
              </Text>
            </TextWrapper>
            <Icon
              iconName={disabled ? 'disabled' : 'arrowDown'}
              size={disabled ? 32 : 24}
            />
          </PickerWrapper>
        )}
      </Pressable>
      <CustomModal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={handleCloseModal}>
        {/* <OpacityView onPress={handleCloseModal} /> */}
        <ModalContainter>
          <OpacityView onPress={handleCloseModal} />
          <ModalContent>
            <Flex justifyContent="space-between">
              <Text fs={16} fw="medium" color="blueSapphire">
                {modalHeader || label}
              </Text>
            </Flex>
            <Wrapper mTop={16} mBottom={8}>
              <Line />
            </Wrapper>
            <FlatList
              data={listData}
              renderItem={renderOptions}
              keyExtractor={(item, index) => `${item.value}-${index}`}
              onEndReachedThreshold={0.1}
              onEndReached={onEndReached}
              ListHeaderComponent={
                loadingSearch ? (
                  <View>
                    <ActivityIndicator
                      size="small"
                      color={colors.blueSapphire}
                    />
                  </View>
                ) : null
              }
              ListFooterComponent={
                loading ? (
                  <View>
                    <ActivityIndicator
                      size="small"
                      color={colors.blueSapphire}
                    />
                  </View>
                ) : null
              }
              refreshControl={
                <>
                  {handleRefresh && (
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                    />
                  )}
                </>
              }
            />
            <Button handlePress={() => setOpenModal(false)} variant="secondary">
              Close
            </Button>
          </ModalContent>
        </ModalContainter>
      </CustomModal>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
`;

const Label = styled(Text)<{isFocused?: boolean}>`
  color: ${colors.blueSapphire};
`;

const PickerWrapper = styled.View<{pressed?: boolean}>`
  margin-top: 8px;
  margin-bottom: 6px;
  flex-direction: row;
  align-items: center;
  height: ${Platform.OS === 'ios' ? 36 : 40}px
  border: 1px solid ${colors.blueSapphire}
    ${props => props.pressed && 'opacity: 0.7'};
  border-radius: 4px;
`;

const TextWrapper = styled.View<{disabled?: boolean}>`
  flex: 1;
  padding-left: 8px;
  padding-right: 8px;
  /* ${props => props.disabled && ' opacity: 0.24'}; */
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colorsAlpha('blueSapphire', 0.4)};
`;

const CustomModal = styled.Modal`
  position: relative;
`;

const ModalContainter = styled.View`
  position: absolute;
  /* bottom: 0; */
  width: 100%;
  /* background-color: white; */
  height: ${Dimensions.get('window').height}px;
  margin-top: auto;
  /* border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 16px 16px 40px; */
`;

const OpacityView = styled.Pressable`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: ${colorsAlpha('black', 0.6)};
`;

const OptionContainer = styled.View<{onSelected?: boolean}>`
  padding: 12px 16px;
  ${props => props.onSelected && `background-color: ${colors.pastelGray}`}
`;

const ModalContent = styled.View`
  width: 100%;
  z-index: 1;
  background-color: white;
  height: ${(Dimensions.get('window').height * 641) / 812}px;
  margin-top: auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px 16px 40px;
`;
