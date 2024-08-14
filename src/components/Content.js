import * as React from "react";
import {
  init,
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import styled from "styled-components";

//Utils
import { rows, assets } from "../utils";

//Component
import { ContentRow } from "./ContentRow";

init({
  debug: false,
  visualDebug: false,
});

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  font-family: "Segoe UI";
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const SelectedItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedItemBox = styled.div`
  height: 20vw;
  width: 70vw;
  background-color: ${({ color }) => color};
  margin-bottom: 2rem;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 40vw;
    width: 90vw;
  }
`;

const SelectedItemTitle = styled.div`
  color: white;
  font-size: 1.8rem;
  font-weight: 400;
  font-family: "Segoe UI";
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

export function Content() {
  const { ref, focusKey } = useFocusable();

  const [selectedAsset, setSelectedAsset] = React.useState(null);

  const onAssetPress = React.useCallback((asset) => {
    setSelectedAsset(asset);
  }, []);

  const onRowFocus = React.useCallback(
    ({ y }) => {
      ref.current.scrollTo({
        top: y,
        behavior: "smooth",
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        <ContentTitle>Navigation Project for TV</ContentTitle>
        <SelectedItemWrapper>
          <SelectedItemBox
            color={selectedAsset ? selectedAsset.color : "#565b6b"}
          >
            <SelectedItemTitle>
              {selectedAsset
                ? selectedAsset.title
                : 'Press "Enter" to select an asset'}
            </SelectedItemTitle>
          </SelectedItemBox>
        </SelectedItemWrapper>
        <ScrollingRows ref={ref}>
          <div>
            {rows.map(({ title }) => (
              <ContentRow
                key={title}
                title={title}
                onAssetPress={onAssetPress}
                onFocus={onRowFocus}
              />
            ))}
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}
