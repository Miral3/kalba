/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { adminState } from "../../recoil/authentication";
import { Sidebar } from "../../components";
import { EditableStandardTable, Management } from "./components";
import { adminSidebarItems } from "../../assets/data";
import * as S from "./Admin.style";

const propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const Admin = ({ onClose, visible }) => {
  const navigate = useNavigate();
  const { type } = useParams();
  const isAdmin = useRecoilValue(adminState);

  useEffect(() => {
    if (!["management", "standardTable"].find((item) => item === type)) {
      navigate("/404-not-found");
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      alert("잘못된 접근 입니다.");
      navigate("/");
    }
  }, [isAdmin]);

  return (
    <S.Section>
      <Sidebar
        items={adminSidebarItems}
        onClose={() => onClose()}
        visible={visible}
      />
      <S.Container>
        {type === "management" ? <Management /> : <EditableStandardTable />}
      </S.Container>
    </S.Section>
  );
};

Admin.propTypes = propTypes;

export default Admin;
