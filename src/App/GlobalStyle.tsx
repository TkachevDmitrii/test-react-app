import { palette } from '@my/ui-kit'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat';
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${palette.BLUE};
  }
`
