import React from 'react';
import styled from 'styled-components/native';
import {BottomNavigation} from 'components/organisms/BottomNavigation';

const MainNav: React.FC = () => {
  return (
    <Container>
      <BottomNavigation />
    </Container>
  );
};

export default MainNav;

const Container = styled.View`
  flex: 1;
`;
