const pageWidth = 960
const gridSize = 960 / 3
// const gridSize = 960 / Math.ceil(Math.random() * 12)
const triangularNumber = 960 / gridSize - 1
const delay = 50

// Render warm upper larger triangle
renderTriangle(
  d3.select('body').append('section'),
  triangularNumber + 1,
  d3.scaleWarm().domain([0, getTriangularNumber(triangularNumber + 1) * 2]),
  d => triangularNumber - d
)

// Render cool lower smaller triangle
renderTriangle(
  d3.select('body').append('section'),
  triangularNumber,
  d3.scaleCool().domain([getTriangularNumber(triangularNumber) * 2, 0]),
  d => d
)

function renderTriangle(selection, triangularNumber, color, offsetter) {
  // offsetter just lets us choose whether to count from upper left or bottom right
  if (offsetter === undefined) offsetter = d => d
  if (color === undefined) color = d3.scaleRainbow()

  selection
    .selectAll('div')
    .data(
      d3
        .range(getTriangularNumber(triangularNumber))
        .map(getUpperTriangleCoordinatesDiagonalOrder)
    )
    .enter()
    .append('div')
    .style('width', `${gridSize}px`)
    .style('height', `${gridSize}px`)
    .style('background-color', (d, i) => color(i))
    .style('font-size', `${gridSize / 4}px`)
    .style('line-height', `${gridSize}px`)
    .style('left', (d, n) => `${gridSize * offsetter(d.column)}px`)
    .style('top', (d, n) => `${gridSize * offsetter(d.row)}px`)
    .style('opacity', 0)
    .text((d, n) => `${d.row + 1}/${d.column + 1}`)
    .transition()
    .delay((d, n) => n * delay)
    .style('opacity', 1)
}

// https://en.wikipedia.org/wiki/Triangular_number
function getTriangularNumber(n) {
  return (n * (n + 1)) / 2
}

function getTriangularNumberInverse(n) {
  return (1 / 2) * (-1 + Math.sqrt(8 * n + 1))
}

// we use this one.

/*
  5
  2 4
  0 1 3
*/
function getLowerTriangleCoordinatesDiagonalOrder(n) {
  const i = Math.floor(getTriangularNumberInverse(n))
  const intermediateValues = {
    i,
    tni: getTriangularNumber(i),
    tnn: getTriangularNumber(n),
    tn: triangularNumber,
    tnnLessOne: getTriangularNumber(n) - 1
  }
  const coords = {
    n,
    row: triangularNumber - n - getTriangularNumber(i),
    column: n - getTriangularNumber(i)
  }
  console.log('intermediateValues', intermediateValues)
  console.log('coords', coords)
  console.log('~~~~~~~~~~')
  return coords
}

// an unused alternative!

/*
  0 2 5
  1 4 
  3
*/
function getUpperTriangleCoordinatesDiagonalOrder(n) {
  const i = Math.floor(getTriangularNumberInverse(n))
  return {
    n,
    row: i - (n - getTriangularNumber(i)),
    column: n - getTriangularNumber(i)
  }
}

// an unused alternative!

/*
  0
  1 2
  3 4 5
*/
function getLowerTriangleCoordinatesRowOrder(n) {
  const i = Math.floor(getTriangularNumberInverse(n))
  return {
    n,
    row: i,
    column: n - getTriangularNumber(i)
  }
}
