

export tag Circle

  prop context
  prop currentNodes default: []
  prop opacity default: 1
  prop size default: 1
  prop position default: {top: 0, left: 0}
  prop color default: '#ff0000'

  def tick
    @data:size = @data:size + 0.1
    @data:opacity = (1 - (@data:size / 100)) / 2
    if @data:opacity < 0
      dom.remove
      unschedule
      delete @data
    if @data
      render

  def _getColor
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(@data:color)
    String(parseInt result[1], 16) + ', ' + String(parseInt result[2], 16) + ', ' + String(parseInt result[3], 16) + ', ' + @data:opacity

  def _getBlur
    "filter: blur({@data:size / 180}vh);"

  def _getOpacity
    "opacity: {@data:opacity};"

  def renderCanvas
    log @data
    @context:fillStyle = 'rgba(' + _getColor + ')'
    @context.beginPath
    @context.arc @data:position:left, @data:position:top, @data:size, 0, 2 * Math.PI, false
    @context.fill
    @context.closePath

  def render
    <self>
      renderCanvas
