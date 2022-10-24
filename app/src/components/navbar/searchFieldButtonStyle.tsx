import React from 'react';
import { SEARCH_BUTTON_EDGE } from "./navbarConst";

export const searchFieldStyle: React.CSSProperties = {
  border: '1px #ddd solid',
  display: 'inline-flex',
  justifyContent: 'space-between',
  padding: '20px',
  height: SEARCH_BUTTON_EDGE,
  width: '40%',
  top: '10px'
};
export const searchFieldButtonStyle = (disabled: boolean): React.CSSProperties => ({
  height: SEARCH_BUTTON_EDGE - 2,
  width: SEARCH_BUTTON_EDGE - 2,
  outline: 'none',
  backgroundColor: 'white',
  cursor: disabled ? 'auto' : 'pointer',
  padding: 5,
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  borderLeft: '1px #ddd solid',
  margin: '15px'
});
export const searchFieldInputStyle = {
  outline: 'none',
  border: 'none',
  fontSize: 14,
  padding: '0 8px',
  flex: 1,
  color: '#5a5a5a',
  fontWeight: 100,
  height: SEARCH_BUTTON_EDGE - 2,
};
