import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  min-width: 800px;
  width: fit-content;
  background-color: #eee;
`;

export const Result = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
  width: 100%;
  height: fit-content;
  border: 2px solid #aaa;
  box-sizing: border-box;

  cursor: pointer;
`;

export const ResulteData = styled.div`
  width: 100%;
  background-color: #fff;
  border: 2px solid #aaa;
  border-top: 0;
  min-height: 300px;
  max-height: 700px;
  padding: 16px;
  box-sizing: border-box;

  column-count: 4; /* Adjust the number of columns as needed */

  column-gap: 20px; /* Adjust the gap between columns as needed */

  overflow-y: auto;
`;

export const Scene = styled.div`
  font-size: 14px;
  break-inside: avoid; /* Prevents breaking inside the Scene element */
  cursor: pointer;
  margin-bottom: 4px; /* Adjust the margin as needed */
`;
