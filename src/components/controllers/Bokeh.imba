
var colorPalettes = require('nice-color-palettes/1000')
import BokehPage from '../bokeh/BokehPage.imba'
import './Bokeh.scss'


export tag Bokeh

  prop showForm default: true
  prop decay default: 0.4
  prop colorPalette default: colorPalettes[Math.floor Math.random * 1000]

  def changePalette
    @colorPalette = colorPalettes[Math.floor Math.random * 1000]

  def toggleForm
    @showForm = !@showForm

  def goFullscreen
    @showForm = false
    if (document:fullScreenElement && document:fullScreenElement) !== null || !document.mozFullScreen && !document.webkitIsFullScreen
      if document:documentElement:requestFullScreen
        document:documentElement.requestFullScreen
      else if document:documentElement:mozRequestFullScreen
        document:documentElement.mozRequestFullScreen
      else if document:documentElement:webkitRequestFullScreen
        document:documentElement.webkitRequestFullScreen Element.ALLOW_KEYBOARD_INPUT

  def render
    <self>
      <form .hidden=(!@showForm)>
        <p> 'Click on the canvas to hide the form :]'
        <p>
          'Decay (recommended: between 0.2 and 1.8): '
          <input[@decay] type='number'>
        <p> <a href="#" :tap.changePalette> "Change color palette"
        <p> <a href="#" :tap.goFullscreen> "Go fullscreen"
      <BokehPage :tap.toggleForm colorPalette=@colorPalette decay=@decay>
