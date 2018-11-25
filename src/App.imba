
var colorPalettes = require('nice-color-palettes/1000')
import 'imba-router'

import BokehPage from './components/bokeh/BokehPage.imba'
import './App.scss'


tag App

  def render
    <self>
      <BokehPage colorPalette=colorPalettes[Math.floor Math.random * 1000] route='/'>


Imba.mount <App>
