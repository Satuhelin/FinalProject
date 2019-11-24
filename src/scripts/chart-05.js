import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import d3Annotation from 'd3-svg-annotation'

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-5')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([1, 34])
  .range([0, width])
const yPositionScale = d3
  .scaleLinear()
  .domain([0, 90])
  .range([height, 0])
const colorScale = d3
  .scaleOrdinal()
  .domain(['Bush', 'Obama', 'Trump'])
  .range(['blue', 'black', 'red'])

// Create a d3.line function

const line = d3
  .line()
  .x(d => xPositionScale(d.Month))
  .y(d => yPositionScale(d.Cumulative))

  d3.csv(require('/data/USA_trips _cumulative.csv')).then(ready)

// grouping

function ready(datapoints) {
  const nested = d3
    .nest()
    .key(d => d.President)
    .entries(datapoints)
  console.log(nested)

  // first circles
/* 
  svg
  .selectAll('circle')
 .data(datapoints)
 .enter()
  .append('circle')
  .attr('fill', d => colorScale(d.President))
  .attr('r', '5')
  .attr('cx', d => {
    return xPositionScale(d.Month)
   })
   .attr('cy', d => {
    return yPositionScale(d.Cumulative)
   })
 */

  // text

  svg
    .selectAll('text')
    .data(nested)
    .enter()
    .append('text')
    .attr('fill', d => colorScale(d.key))
    .attr('font-weight', 600)
    .text(d => d.key)
      .attr('x', function(d) {
        return xPositionScale(d.values[d.values.length - 1].Month)
      })
      .attr('y', function(d) {
        return yPositionScale(d.values[d.values.length - 1].Cumulative)

    })
    .attr('font-size', 18)
    .attr('dx', 10)
    .attr('dy', 5)
    .attr('class', d => d.key)

    .on('mouseover', d => {
      console.log('hello')
      const className = d.key

      svg
        .selectAll('text.' + className)
        .attr('font-size', 25)
        .raise()
    })
    .on('mouseout', d => {
      const className = d.key
      svg.selectAll('text.' + className).attr('font-size', 15)
    })


    
  svg
    .selectAll('path')
    .data(nested)
    .enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke-width', 2)
    .attr('stroke', d => colorScale(d.key))
    .attr('d', function(d) {
      console.log('this nested thing is', d)
      return line(d.values)
    })

    .attr('class', d => d.key)
    .raise()

    
   const annotations = [
    
    {
   
     note: {
       label: 'After 9/11 2001 Bush stayed home a lot',
 
       title: ''
     },
     data: { Month: '7', Cumulative: 22 },
     connector: { end: 'arrow' },
 
     dy: -60,
     dx: -0.1,
     color: 'blue'
   }
 ]
 
 const makeAnnotations = d3Annotation
   .annotation()
   .accessors({
     x: d => xPositionScale(d.Month),
     y: d => yPositionScale(d.Cumulative)
   })
   .annotations(annotations)
 
 svg.call(makeAnnotations)
 

/*     .on('mouseover', d => {
      console.log('hello')
      const className = d.key

      svg

        .selectAll('path.' + className)
        .attr('stroke-width', 8)
        .selectAll('text.' + className)
        .attr('font-size', 25)
        .raise()
    })
    .on('mouseout', d => {
      const className = d.key
      svg.selectAll('path.' + className).attr('stroke-width', 4)
    })
 */  // Axis

 svg
 .selectAll('circle')
 .data(nested)
 .enter()
 .append('circle')
 .attr('fill',  d => colorScale(d.key)) 
 .attr('r', 3)
 .attr('cx', function(d) {
   return xPositionScale(d.values[d.values.length - 1].Month)
 })
 .attr('cy', function(d) {
   return yPositionScale(d.values[d.values.length - 1].Cumulative)
 })


  const yAxis = d3.axisLeft(yPositionScale).tickPadding(0.5)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  const xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.format('d'))
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  
}
