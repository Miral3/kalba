import React from "react";
import PropTypes from "prop-types";
import { units } from "../../data/units";
import * as S from "./Units.style";

const propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

const Units = ({ data }) => {
  const checkTownHallWeaponLevel = (townHallLevel, weaponLevel) => {
    return weaponLevel
      ? `Town_Hall${townHallLevel}-${weaponLevel}.png`
      : `Town_Hall${townHallLevel}.png`;
  };

  const checkUnitsExist = (name, type) => {
    if (!Object.prototype.hasOwnProperty.call(data, type)) {
      return;
    }
    return data[type].find((unit) => unit.name === name);
  };

  const unitInfo = (name, type, typeSrc, unitSrc) => {
    const unit = checkUnitsExist(name, type);
    const isMaxLevel = unit ? unit.level === unit.maxLevel : false;

    return (
      <>
        <S.Unit isExist={!!unit} src={`/img/coc/${typeSrc}/${unitSrc}`} />
        {unit && <S.Level isMaxLevel={isMaxLevel}>{unit.level}</S.Level>}
      </>
    );
  };
  return (
    <S.Container>
      <S.TownHall
        src={`/img/coc/coc_Town_Hall/${checkTownHallWeaponLevel(
          data.townHallLevel,
          data.townHallWeaponLevel
        )}`}
        alt="townHall"
      />
      {units.map((unit) => (
        <S.UnitContainer key={unit.src} gridArea={unit.type.replace(" ", "")}>
          <S.Type>{unit.type}</S.Type>
          <S.UnitList num={unit.type === "영웅" || unit.type === "펫" ? 4 : 9}>
            {unit.info.map((info) => (
              <S.UnitItem key={info.className}>
                {unitInfo(info.name, unit.value, unit.src, info.src)}
              </S.UnitItem>
            ))}
          </S.UnitList>
        </S.UnitContainer>
      ))}
    </S.Container>
  );
};

Units.propTypes = propTypes;

export default Units;
