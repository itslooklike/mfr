import 'normalize.css'
import './global.css'
import React from 'react'
import styled from 'styled-components'
import { Bus, TEXT_MESSAGE } from '@mfr/core'

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
  const [fromBus, setFromBus] = React.useState('no data')

  const handleCount = () => {
    setValue(value + 1)
  }

  React.useEffect(() => {
    const listener = Bus.on(TEXT_MESSAGE, (payload) => setFromBus(payload.text))

    return () => {
      Bus.off(TEXT_MESSAGE, listener)
    }
  }, [])

  return (
    <div>
      <HeaderWrap>
        <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
      </HeaderWrap>
      <PageContent>
        <h1>This is React app</h1>
        Content <button onClick={handleCount}>{value}</button>
        <div>Text from Bus: {fromBus}</div>
      </PageContent>
    </div>
  )
}

export default App
