import React from "react";
import { PropTypes } from "prop-types";
import { Button, Modal, Text } from "../../../../components";
import * as S from "./Reference.style";

const propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

const Reference = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      key="reference"
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      zIndex={202}
      style={{ borderRadius: 8 }}
    >
      <S.Card>
        <S.Container>
          <S.Logo>Kalba</S.Logo>
          <Button hover onClick={() => setModalVisible(false)}>
            <S.Close className="material-symbols-outlined">close</S.Close>
          </Button>
        </S.Container>
        <S.Content>
          <S.Image alt="apiToken" src="/img/apiToken/apiToken1.jpeg" />
          <Text>1. 설정(톱니바퀴 아이콘)을 클릭합니다.</Text>
          <S.Image alt="apiToken" src="/img/apiToken/apiToken2.jpeg" />
          <Text>2. 추가 설정을 클릭합니다.</Text>
          <S.Image alt="apiToken" src="/img/apiToken/apiToken3.jpeg" />
          <Text>3. API토큰을 확인합니다.</Text>
        </S.Content>
      </S.Card>
    </Modal>
  );
};

Reference.propTypes = propTypes;

export default Reference;
