import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'

export default ({ recordMap }) => (
  <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
)