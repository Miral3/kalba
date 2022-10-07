/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
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
  const isAdmin = true;

  useEffect(() => {
    if (!isAdmin) {
      alert("잘못된 접근 입니다.");
      navigate("/");
    }
  }, [isAdmin]);

  return (
    <S.Main>
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
    </S.Main>
  );
};

Admin.propTypes = propTypes;

export default Admin;
