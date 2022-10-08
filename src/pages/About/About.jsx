import React from "react";
import * as S from "./About.style";

const About = () => {
  return (
    <S.Main>
      <S.Section>
        <S.Container>
          <S.Content>
            <S.Avatar src="/img/about/miral.png" alt="avatar" />
            <S.Name>Miral</S.Name>
            <S.Position>front-end</S.Position>
            <S.Links>
              <a href="mailto:dydtkd113@gmail.com">
                <S.Email className="material-symbols-outlined">mail</S.Email>
              </a>
              <a href="https://github.com/Miral3">
                <S.Github src="/icons/github.svg" alt="github" />
              </a>
            </S.Links>
          </S.Content>
          <S.Content>
            <S.Avatar src="/img/about/potion.png" alt="avatar" />
            <S.Name>Potion</S.Name>
            <S.Position>back-end</S.Position>
            <S.Links>
              <a href="mailto:potionkr@gmail.com">
                <S.Email className="material-symbols-outlined">mail</S.Email>
              </a>
              <a href="https://github.com/potionk">
                <S.Github src="/icons/github.svg" alt="github" />
              </a>
            </S.Links>
          </S.Content>
        </S.Container>
      </S.Section>
    </S.Main>
  );
};

export default About;
