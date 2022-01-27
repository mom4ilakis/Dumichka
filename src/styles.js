import styled from 'styled-components';
import LetterBox from './LetterBox';
/* eslint-disable semi */

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export const Letterbox = styled(LetterBox)`
    width: 10vw;
    height: 10vh;
    border: 1px solid black;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: bold;
    vertical-align: middle;
    box-sizing: border-box;
    background-color: ${props => props?.color || 'azure'};
    text-transform: uppercase;
    user-select: none;
`

