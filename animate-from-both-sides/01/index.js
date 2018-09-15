var pageWidth = 960
var gridSize = 960 / Math.ceil(Math.random() * 24)
var triangularNumber = 960 / gridSize - 1
var delay = 50

// Render warm upper larger triangle
renderTriangle(
  d3.select('body').append('section'),
  triangularNumber + 1,
  d3.scaleWarm().domain([0, getTriangularNumber(triangularNumber + 1) * 2]),
  function(d) {
    return d
  }
)

// Render cool lower smaller triangle
renderTriangle(
  d3.select('body').append('section'),
  triangularNumber,
  d3.scaleCool().domain([getTriangularNumber(triangularNumber) * 2, 0]),
  function(d) {
    return triangularNumber - d
  }
)

function renderTriangle(selection, triangularNumber, color, offsetter) {
  // offsetter just lets us choose whether to count from upper left or bottom right
  if (offsetter === undefined)
    offsetter = function(d) {
      return d
    }
  if (color === undefined) color = d3.scaleRainbow()

  selection
    .selectAll('div')
    .data(
      d3
        .range(getTriangularNumber(triangularNumber))
        .map(getUpperTriangleCoordinates)
    )
    .enter()
    .append('div')
    .style('width', gridSize + 'px')
    .style('height', gridSize + 'px')
    .style('background-color', function(d, i) {
      return color(i)
    })
    .style('font-size', gridSize / 4 + 'px')
    .style('line-height', gridSize + 'px')
    .style('left', function(d, n) {
      return gridSize * offsetter(d.column) + 'px'
    })
    .style('top', function(d, n) {
      return gridSize * offsetter(d.row) + 'px'
    })
    .style('opacity', 0)
    .text(function(d, n) {
      return d.row + 1 + '/' + (d.column + 1)
    })
    .transition()
    .delay(function(d, n) {
      return n * delay
    })
    .style('opacity', 1)
}

// https://en.wikipedia.org/wiki/Triangular_number
function getTriangularNumber(n) {
  return (n * (n + 1)) / 2
}

function getTriangularNumberInverse(n) {
  return (1 / 2) * (-1 + Math.sqrt(8 * n + 1))
}

/*
  0 2 5
  1 4 
  3
*/
function getUpperTriangleCoordinates(n) {
  var i = Math.floor(getTriangularNumberInverse(n))
  return {
    n: n,
    row: i - (n - getTriangularNumber(i)),
    column: n - getTriangularNumber(i)
  }
}

// Below, an unused alternative!

/*
  0
  1 2
  3 4 5
*/
function getLowerTriangleCoordinates(n) {
  var i = Math.floor(getTriangularNumberInverse(n))
  return {
    n: n,
    row: i,
    column: n - getTriangularNumber(i)
  }
}
