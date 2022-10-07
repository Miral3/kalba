import React from "react";
import { PropTypes } from "prop-types";
import { Button, Icon, Input, Modal, ErrorText } from "../../../../components";
import useForm from "../../../../hooks/useForm";
import * as S from "./Verification.style";
import Common from "../../../../styles/common";

const propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setReferenceVisible: PropTypes.func.isRequired,
  setIsVerification: PropTypes.func.isRequired,
};

const Verification = ({
  data,
  modalVisible,
  setModalVisible,
  setReferenceVisible,
  setIsVerification,
}) => {
  const { name, tag } = data;
  const initialValues = {
    token: "",
  };
  const onSubmit = async () => {
    // 인증 성공
    setModalVisible(false);
    setIsVerification(true);
    // 인증 실패
    // alert("인증에 실패하셨습니다. 다시 시도해주세요.");
  };
  const {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    checkEmptyValue,
  } = useForm({
    initialValues,
    onSubmit,
    validate: ({ token }) => {
      const newErrors = {};
      const tokenReg = /^[a-zA-Z0-9-_/-]{8,8}$/;
      if (token && !tokenReg.test(token))
        newErrors.token = "유효한 토큰을 입력해주세요.";
      return newErrors;
    },
  });

  return (
    <Modal
      key="verification"
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      style={{ borderRadius: 8 }}
    >
      <S.Card>
        <S.Container>
          <S.Logo>Kalba</S.Logo>
          <Button hover onClick={() => setModalVisible(false)}>
            <Icon>close</Icon>
          </Button>
        </S.Container>
        <S.Form onSubmit={handleSubmit}>
          <S.Header>본인인증</S.Header>
          <S.Content>
            <S.Description>
              <S.Strong>
                {name}[{tag}]
              </S.Strong>{" "}
              님의 클래시 오브 클랜 본인인증을 위해 API 토큰을 입력해주세요.
              <br />
              인게임 설정 {">"} 추가 설정 {">"} API 토큰에서 확인할 수 있습니다.
            </S.Description>
            <Button
              version="reference"
              onClick={() => setReferenceVisible(true)}
            >
              <S.Reference>
                <Icon
                  size={Common.fontSize.b[0]}
                  weight="bold"
                  color={Common.colors.white[0]}
                >
                  error
                </Icon>
                참고화면
              </S.Reference>
            </Button>
          </S.Content>
          <S.InputWrapper isFilled={values.token}>
            <Input version="auth" name="token" onChange={handleChange} />
            <S.InputLabel>API 토큰</S.InputLabel>
          </S.InputWrapper>
          {errors.token && <ErrorText value={errors.token} />}
          <Button
            type="submit"
            version="login"
            disabled={
              checkEmptyValue() || isLoading || Object.keys(errors).length !== 0
            }
          >
            인증하기
          </Button>
        </S.Form>
      </S.Card>
    </Modal>
  );
};

Verification.propTypes = propTypes;

export default Verification;
