import React from 'react'
import './style.css'

import { Icon } from 'antd'

const Footer = () =>
  <footer>
    <hr />
    <p>
      <Icon type='left' /><Icon type='right' />
      with <Icon type='heart-o' /> by <a href='https://github.com/IgorAntun'>Igor Antun</a>
    </p>
  </footer>

export default Footer
