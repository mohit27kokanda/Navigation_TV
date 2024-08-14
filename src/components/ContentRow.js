import * as React from "react";
import {
  init,
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import styled from "styled-components";

//utils
import { rows, assets } from "../utils";

const ContentRowWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: "Segoe UI";
  padding-left: 3vw;

  @media (max-width: 768px) {
    padding-left: 2vw;
  }
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 3vw;

  @media (max-width: 768px) {
    padding-left: 2vw;
  }
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const AssetWrapper = styled.div`
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const AssetBox = styled.div`
  width: 15vw;
  height: 8vw;
  background-color: ${({ color }) => color};
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "4px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;

  @media (max-width: 768px) {
    width: 45vw;
    height: 25vw;
  }
`;

const AssetTitle = styled.div`
  color: white;
  margin-top: 10px;
  font-family: "Segoe UI";
  font-size: 1.5rem;
  font-weight: 400;
`;

function Asset({ title, color, onEnterPress, onFocus }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      color,
    },
  });

  return (
    <AssetWrapper ref={ref}>
      <AssetBox color={color} focused={focused} />
      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}

export function ContentRow({ title: rowTitle, onAssetPress, onFocus }) {
  const { ref, focusKey } = useFocusable({
    onFocus,
  });

  const scrollingRef = React.useRef(null);

  const onAssetFocus = React.useCallback(
    ({ x }) => {
      scrollingRef.current?.scrollTo({
        left: x,
        behavior: "smooth",
      });
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{rowTitle}</ContentRowTitle>
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {assets.map(({ title, color }) => (
              <Asset
                key={title}
                title={title}
                color={color}
                onEnterPress={onAssetPress}
                onFocus={onAssetFocus}
              />
            ))}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}
