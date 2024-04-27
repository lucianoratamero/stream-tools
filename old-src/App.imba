
var colorPalettes = require('nice-color-palettes/1000')
import 'imba-router'

import BokehPage from './components/bokeh/BokehPage.imba'
import Bokeh from './components/controllers/Bokeh.imba'
import './App.scss'


tag App

  def render
    <self>
      <Bokeh route='/'>


Imba.mount <App>
