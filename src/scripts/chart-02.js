import * as d3 from 'd3'

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 8])
  .range([0, width])

const yPositionScale = d3
  .scaleBand()
  .domain([
    'FL',
    'PA',
    'OH',
    'WV',
    'IN',
    'MS',
    'MT',
    'TN',
    'LA',
    'NV',
    'NC',
    'KY',
    'MN',
    'TX',
    'MO',
    'IA',
    'MI',
    'WI',
    'AZ',
    'NH',
    'AL',
    'NM',
    'SC',
    'ND',
    'IL',
    'GA',
    'KS'
  ])
  .range([height, 0])
  .padding(0.5)

d3.csv(require('../data/TrumpUSVisitCount.csv')).then(ready)

function ready(datapoints) {
  console.log('Data read in:', datapoints)

  svg
    .selectAll('rect')
    .data(datapoints) // bind your data
    .enter() // grab the "new" ones (all of them)
    .append('rect') // and add in rectangles
    .attr('width', d => xPositionScale(d.Visits))
    .attr('height', 8)
    .attr('x', 0)
    .attr('y', d => yPositionScale(d.State))
    .attr('fill', 'red')

  const yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  const xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
}
