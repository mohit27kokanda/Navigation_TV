import * as React from "react";
import {
  useFocusable,
  init,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import styled from "styled-components";

//Utils
import { MENU_LIST } from "../utils";

init({
  debug: false,
  visualDebug: false,
});

const MenuItemBox = styled.div`
  width: 90%;
  max-width: 200px;
  height: 50px;
  background-color: #b056ed;
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "6px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  @media (max-width: 768px) {
    height: 40px;
    margin-bottom: 1rem;
  }
`;

function MenuItem({ focusKey: focusKeyParam, name }) {
  const { ref, focused } = useFocusable({
    focusKey: focusKeyParam,
  });

  return (
    <MenuItemBox ref={ref} focused={focused}>
      {name}
    </MenuItemBox>
  );
}

const MenuWrapper = styled.div`
  flex: 1;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ hasFocusedChild }) =>
    hasFocusedChild ? "#4e4181" : "#362C56"};
  padding-top: 2rem;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

export function Menu({ focusKey: focusKeyParam }) {
  const { ref, focusSelf, hasFocusedChild, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: undefined,
    onEnterPress: () => {},
    onEnterRelease: () => {},
    onArrowPress: () => true,
    onFocus: () => {},
    onBlur: () => {},
    extraProps: { foo: "bar" },
  });

  React.useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
        <h1>Logo</h1>

        {MENU_LIST.map(({ name, key }) => (
          <MenuItem focusKey={key} name={name} />
        ))}
      </MenuWrapper>
    </FocusContext.Provider>
  );
}
