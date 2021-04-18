/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import ProfileInfo from '../../components/Profile/ProfileInfo';

const Container = styled.div`
  padding-top: 1.5rem;
`;

const Profile = ({ match }) => {
  const name = match.params.category;
  return (
    <Container>
      <ProfileInfo match={name} />
    </Container>
  );
}

export default Profile;