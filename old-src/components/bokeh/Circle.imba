

export tag Circle

  prop context
  prop currentNodes default: []
  prop opacity default: 1
  prop size default: 1
  prop position default: {top: 0, left: 0}
  prop color default: '#ff0000'

  def _getColor
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(@data:color)
    String(parseInt result[1], 16) + ', ' + String(parseInt result[2], 16) + ', ' + String(parseInt result[3], 16) + ', ' + @data:opacity

  def renderCanvas
    @context:fillStyle = 'rgba(' + _getColor + ')'
    @context.beginPath
    @context.arc @data:position:left, @data:position:top, @data:size, 0, 2 * Math.PI
    @context.fill
    @context.closePath

  def render
    <self>
      renderCanvas
