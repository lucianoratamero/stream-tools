
import { Circle } from './Circle.imba'
import './BokehPage.scss'

export tag BokehPage

  prop numberOfCircles default: Math.floor Math.random * (80 - 20) + 20
  prop colorPalette default: ['red']

  def _getCircleBgColor
    @colorPalette[Math.floor Math.random * @colorPalette:length]

  def generateCircles
    while @numberOfCircles

      @numberOfCircles = @numberOfCircles - 1
      var size = Math.random * 30

      <Circle
        size=size
        color=_getCircleBgColor
        position={
          top: (Math.random * 100) - (parseInt size / 2) + "%",
          left: (Math.random * 100) - (parseInt size / 2) + "%",
        }
      >

  def render
    <self>
      generateCircles
