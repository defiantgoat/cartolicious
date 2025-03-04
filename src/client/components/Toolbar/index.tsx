import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import {
  ToolbarRoot,
  TitleContainer,
  Title,
  ButtonsContainer,
  ButtonContainer,
  CurationInfo,
} from "./styled-components";
import { APP_NAME } from "../../config";
import { ENDPOINTS } from "../../config";
import MenuButton from "../MenuButton";
import FirebaseContext from "../Firebase/context";
import useUser from "../../hooks/useUser";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { LiciousToolbarButton } from "@licious/react";

const Toolbar: React.FC = () => {
  const firebaseApp = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);

  const { token, logged_in } = useUser();
  const { setCaroliciousStyles, setBackground, curationInfo } =
    useCartoliciousStyles();

  const sidebarOpen = useSelector((state: any) => state.root.sidebar_open);

  const fetchStyles = async () => {
    setLoading(true);
    try {
      const res = await fetch(ENDPOINTS.STYLES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data, errors } = await res.json();
      if (data.length > 0) {
        const [newStyles, background] = data;
        const newStyleMap = new Map();
        Object.entries(newStyles).forEach(([key, value]) =>
          newStyleMap.set(key, value)
        );
        setCaroliciousStyles({
          styleMap: newStyleMap,
          resetStyleId: true,
          resetCurationId: true,
          resetCurationInfo: true,
        });
        setBackground(background);
      }
      if (errors.length > 0) {
        console.log(errors);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleRecolor = () => {
    fetchStyles();
  };

  return (
    <ToolbarRoot>
      <TitleContainer>
        <Title>{APP_NAME}</Title>
        {curationInfo ? (
          <CurationInfo>
            <span>
              {curationInfo.name} by {curationInfo.user}
            </span>
          </CurationInfo>
        ) : null}
      </TitleContainer>
      {true ? (
        <ButtonsContainer>
          {loading && (
            <ButtonContainer $backgroundColor="transparent">
              <span>Loading</span>
            </ButtonContainer>
          )}
          {logged_in ? (
            <ButtonContainer>
              <LiciousToolbarButton
                icon="paint"
                size="md"
                onClick={handleRecolor}
              />
            </ButtonContainer>
          ) : null}
          {firebaseApp ? (
            <ButtonContainer
              $backgroundColor={sidebarOpen ? "#222" : "transparent"}
            >
              <MenuButton />
            </ButtonContainer>
          ) : null}
        </ButtonsContainer>
      ) : null}
    </ToolbarRoot>
  );
};

export default Toolbar;
