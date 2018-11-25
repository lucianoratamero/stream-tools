

export tag Circle

  prop size default: Math.random * 30
  prop position default: {top: 0, left: 0}
  prop color default: 'red'

  def _getBlur
    "filter: blur({@size / 50}vh);"

  def _getOpacity
    "opacity: {(1 - (@size / 100)) / 2};"

  def getStyles
    """
    border-radius: 50%;
    position: absolute;

    background-color: {@color};

    height: {@size}vh;
    width: {@size}vh;
    z-index: {parseInt @size};

    top: {@position:top};
    left: {@position:left};

    {_getBlur}
    {_getOpacity}
    """

  def render
    <self>
      <div style=getStyles>
