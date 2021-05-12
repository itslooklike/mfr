import 'normalize.css'
import './global.css'
import React from 'react'
import styled from 'styled-components'

export type TAppProps = {
  headerHtml: string
}

const HeaderWrap = styled.div`
  background-color: #9b9b9b;
`

const PageContent = styled.div`
  padding: 50px;
  background-color: tomato;
`

const App: React.FC<TAppProps> = ({ headerHtml }) => {
  const [value, setValue] = React.useState(0)

  const handleCount = () => {
    setValue(value + 1)
  }

  return (
    <div>
      <HeaderWrap>
        <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
      </HeaderWrap>
      <PageContent>
        Content <button onClick={handleCount}>{value}</button>
      </PageContent>
    </div>
  )
}

export default App
