
import { Circle } from './Circle.imba'
import './BokehPage.scss'

export tag BokehPage < canvas

  prop spawningChance
  prop decay default: 0.4 # recommended: anything between 0.6 and 1.6
  prop framesPerSecond default: 60
  prop currentNodes default: []
  prop numberOfCircles default: (window:innerWidth / window:innerHeight) * 200
  prop colorPalette default: ['#ff0000']

  def context type = '2d'
    dom.getContext type

  def setup
    if !@decay
      decay = (60 / @framesPerSecond) * 1

    if !@spawningChance
      if @decay > 1
        @spawningChance = 1
      else
        @spawningChance = @decay * 0.5

  def mount
    schedule(interval: 1000 / @framesPerSecond)

  def tick
    @currentNodes = @currentNodes.filter do |node| node:opacity > 0

    for node in @currentNodes
      node:size = node:size + (window:innerWidth / window:innerHeight) * @decay
      node:opacity = (1 - (node:size * @decay / 200))

    context.clearRect 0, 0, dom:width, dom:height

    render

  def onclick
    if 'cursor: none;' in self.style
      self.style = self.style.replace 'cursor: none;', ''
    else if self.style
      self.style = self.style + 'cursor: none;'
    else
      self.style = 'cursor: none;'

  def _getCircleBgColor
    @colorPalette[Math.floor Math.random * @colorPalette:length]

  def render
    <self height=window:innerHeight width=window:innerWidth>
      if @currentNodes:length < @numberOfCircles && Math.random < @spawningChance
        @currentNodes.push {
          size: 1,
          opacity: 1,
          color: _getCircleBgColor,
          position: {
            top: (Math.random * window:innerHeight) - 0.5,
            left: (Math.random * window:innerWidth) - 0.5,
          }
        }
      for node in @currentNodes
        <Circle[node] context=context>
