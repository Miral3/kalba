/* eslint-disable no-use-before-define */
import React from "react";
import { PropTypes } from "prop-types";
import { Button, Icon, Input, Modal, ErrorText } from "../../../../components";
import useForm from "../../../../hooks/useForm";
import * as S from "./SubmitForm.style";

const propTypes = {
  nextIndex: PropTypes.number.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  handleAddTableData: PropTypes.func.isRequired,
};

const SubmitForm = ({
  nextIndex,
  modalVisible,
  setModalVisible,
  handleAddTableData,
}) => {
  const initialValues = {
    index: nextIndex,
    english: "",
    korean: "",
    maxScore: 0,
    maxLevel: 0,
  };

  const onSubmit = async () => {
    setModalVisible(false);
    const nextTableData = {
      ...values,
      value: Math.round((values.maxScore / values.maxLevel) * 1000) / 1000,
    };
    handleAddTableData(nextTableData);
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
    validate: ({ english, maxScore, maxLevel }) => {
      const newErrors = {};
      const englishReg = /^[a-zA-Z.\s]+$/;
      const numberReg = /^[0-9]+$/;
      if (english && !englishReg.test(english))
        newErrors.english =
          "영소/대문자, 특수기호(.), 띄어쓰기 조합만 가능합니다.";
      if (maxScore && !numberReg.test(maxScore))
        newErrors.maxScore = "0보다 큰 숫자만 가능합니다.";
      if (maxLevel && !numberReg.test(maxLevel))
        newErrors.maxLevel = "0보다 큰 숫자만 가능합니다.";
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
          <S.Header>기준표 추가</S.Header>
          <S.Content>
            <S.Description>
              정확한 영어 이름을 입력해주세요.
              <S.Anchor
                href="https://clashofclans.fandom.com/wiki/Army"
                target="_blank"
                rel="noreferrer"
              >
                참고 페이지
              </S.Anchor>
            </S.Description>
          </S.Content>
          <S.InputWrapper isFilled={values.english}>
            <Input version="auth" name="english" onChange={handleChange} />
            <S.InputLabel>영어 이름</S.InputLabel>
          </S.InputWrapper>
          {errors.english && <ErrorText value={errors.english} />}
          <S.InputWrapper isFilled={values.korean}>
            <Input version="auth" name="korean" onChange={handleChange} />
            <S.InputLabel>한글 이름</S.InputLabel>
          </S.InputWrapper>
          {errors.korean && <ErrorText value={errors.korean} />}
          <S.InputWrapper isFilled={values.maxScore}>
            <Input version="auth" name="maxScore" onChange={handleChange} />
            <S.InputLabel>최대 점수</S.InputLabel>
          </S.InputWrapper>
          {errors.maxScore && <ErrorText value={errors.maxScore} />}
          <S.InputWrapper isFilled={values.maxLevel}>
            <Input version="auth" name="maxLevel" onChange={handleChange} />
            <S.InputLabel>최대 레벨</S.InputLabel>
          </S.InputWrapper>
          {errors.maxLevel && <ErrorText value={errors.maxLevel} />}
          <Button
            type="submit"
            version="login"
            disabled={
              checkEmptyValue() || isLoading || Object.keys(errors).length !== 0
            }
          >
            추가하기
          </Button>
        </S.Form>
      </S.Card>
    </Modal>
  );
};

SubmitForm.propTypes = propTypes;

export default SubmitForm;
