import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavigationBar = styled.div`
  background: rgb(250,220,220);
  color: palevioletred;
  border: 2px solid crimson;
  padding: 10px;
`

export const MainView = styled.div`
  background: LightSteelBlue;
  padding: 20px;
`

export const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`

export const StyledButton = styled.button`
  padding: 4px;
  margin: 5px;
  background: palevioletred;
  color: rgb(250,220,220);
  font-weight: bold;
`