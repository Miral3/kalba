/* eslint-disable no-use-before-define */
import React from "react";
import { PropTypes } from "prop-types";
import {
  Button,
  Icon,
  Input,
  Modal,
  ErrorText,
  Spinner,
} from "../../../../components";
import useForm from "../../../../hooks/useForm";
import * as S from "./Verification.style";
import Common from "../../../../styles/common";
import { useVerifyToken } from "../../../../hooks/queries/useAuth";

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
  const { mutateAsync } = useVerifyToken({});
  const { name, tag } = data;
  const initialValues = {
    token: "",
  };
  const onSubmit = async () => {
    try {
      const res = await mutateAsync({ tag, ...values });
      const { status } = res.data;
      if (status) {
        setModalVisible(false);
        setIsVerification(true);
      } else {
        alert("인증에 실패했습니다. 다시 한번 확인해주세요.");
      }
    } catch (err) {
      console.log(err);
    }
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
          <Button
            hover
            onClick={() => setModalVisible(false)}
            style={{ height: 24 }}
          >
            <S.Close className="material-symbols-outlined">close</S.Close>
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
          {isLoading ? (
            <Button version="loading">
              <Spinner.Base size="36px" />
            </Button>
          ) : (
            <Button
              type="submit"
              version="login"
              disabled={
                checkEmptyValue() ||
                isLoading ||
                Object.keys(errors).length !== 0
              }
            >
              인증하기
            </Button>
          )}
        </S.Form>
      </S.Card>
    </Modal>
  );
};

Verification.propTypes = propTypes;

export default Verification;
