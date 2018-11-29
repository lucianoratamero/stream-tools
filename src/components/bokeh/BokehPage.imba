
import { Circle } from './Circle.imba'
import './BokehPage.scss'

export tag BokehPage < canvas

  prop currentNodes default: []
  prop numberOfCircles default: (window:innerWidth / window:innerHeight) * 100
  prop colorPalette default: ['red']

  def context type = '2d'
    dom.getContext type

  def mount
    schedule(interval: 16)

  def tick
    @currentNodes = @currentNodes.filter do |node| node:opacity > 0
    for node in @currentNodes
      node:size = node:size + (window:innerWidth / window:innerHeight)
      node:opacity = (1 - (node:size / 200)) / 2
    context.clearRect 0, 0, dom:width, dom:height
    render

  def _getCircleBgColor
    @colorPalette[Math.floor Math.random * @colorPalette:length]

  def render
    <self height=window:innerHeight width=window:innerWidth>
      if @currentNodes:length < @numberOfCircles && Math.random > 0.8
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
