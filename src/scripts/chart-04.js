import * as d3 from 'd3'

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 68])
  .range([0, width])

const yPositionScale = d3
  .scaleBand()
  .domain(['W.BUSH', 'OBAMA', 'TRUMP'
  ])
  .range([height, 0])
  .padding(0.5)

d3.csv(require('../data/visitscount1.csv')).then(ready)

function ready(datapoints) {
  console.log('Data read in:', datapoints)

  svg
    .selectAll('rect')
    .data(datapoints) 
    .enter() 
    .append('rect') 
    .attr('width', d => xPositionScale(d.number))
    .attr('height',  yPositionScale.bandwidth()) 
    .attr('x', 0)
    .attr('y', d => yPositionScale(d.President))
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
