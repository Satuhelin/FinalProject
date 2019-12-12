import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
import d3Annotation from 'd3-svg-annotation'
import { maxHeaderSize } from 'http'
d3.tip = d3Tip

const margin = { top: 0, left: 0, right: 0, bottom: 0 }

const height = 500 - margin.top - margin.bottom

const width = 900 - margin.left - margin.right

const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const colorScale = d3
  .scaleLinear()
  .domain([9, 100])
  .range(['#fee0d2', '#de2d26'])

const projection = d3.geoMercator()
// out geoPath needs a PROJECTION variable
const path = d3.geoPath().projection(projection)

const tip = d3
  .tip()
  .attr('class', 'd3-tip d3-tip-scrolly')
  .offset([50, 0])
  .html(function(d) {
    return `${d.properties.ADMIN} <span style='color:yellow','font-size:10'><b>${d.properties.trump_on_6}</b></span>`
  })
svg.call(tip)




  d3.json(require('/data/trump_only'))  
  .then(ready)
  .catch(err => console.log('Failed on', err))

  function ready(json) {
    //console.log('What is our data?')
    console.log(json)
    const countries = topojson.feature(json, json.objects.trump_only)
    
  console.log(json.objects.trump_only)

  //show where he has traveled

  svg
    .selectAll('.country')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('stroke', 'grey')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', function(d) {
      if (d.properties.trump_on_1 === 'TRUMP') {
        return 'pink'
      }
      return 'lightgrey'
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    svg.call(tip)
  
    
    

//Showing where he went


    d3.select('#first-step').on('stepin', () => {
      svg.selectAll('path').attr('fill', function(d) {
        if (d.properties.trump_on_1 === 'TRUMP') {
          return 'pink'
        }
        return 'lightgrey'
      })
      
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
  svg.call(tip)
})


//step showing Trumps popularity

  d3.select('#popularity-step').on('stepin', () => {
    svg.selectAll('path').attr('fill', d => {
      if (d.properties.trump_on_6 > 1) {
        return colorScale(d.properties.trump_on_6)
      }
      if (d.properties.trump_on_1 === 'TRUMP') {
        return 'lightgreen'
      }
      return 'lightgrey'
    
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
  svg.call(tip)

  })

  //steps showing places he did not go

  d3.select('#nogo-step').on('stepin', () => {
    svg.selectAll('path').attr('fill', d => {
      if (d.properties.ADMIN == 'Germany'||d.properties.ADMIN === 'Canada'|| d.properties.ADMIN === 'Mexico') {
        return 'blue'
      }
        return 'lightgrey'
    
  })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
  svg.call(tip)
})


    // svg
    // .selectAll('text')
    // .data(countries.features)
    // .enter()
    // .append('text')
    // .style('visibility', 'hidden')
    // .attr('fill', 'black')
    // .text(function(d) {
    //   console.log(d)
    //   return d.properties.trump_on_6
    // })
    // .attr('text-anchor', 'middle')
    // .attr('alingment-baseline', 'middle')
    // .attr('dy', function(d) {
    //   return 0
  
    // .attr('font-size', 18)
    // .attr('dx', 10)
    // .attr('dy', 0)
    // .attr('class', d => d.properties.trump_on_6)
    // })
/* 
    .on('mouseover', d => {
      console.log('hello')
      const className = d.properties.trump_on_6
    
      svg
        .selectAll('text.' + className)
        .attr('font-size', 25)
        .style('visibility', 'visible')
        .raise()
    })
    .on('mouseout', d => {
      const className = d.properties.trump_on_6
      svg.selectAll('text.' + className).attr('font-size', 15).style('visibility', 'hidden')
    }) */


  /* 
    function render() {
      const svgContainer = svg.node().closest('div')
      const svgWidth = svgContainer.offsetWidth
      // Do you want it to be full height? Pick one of the two below
      const svgHeight = height + margin.top + margin.bottom
      // const svgHeight = window.innerHeight
      const actualSvg = d3.select(svg.node().closest('svg'))
      actualSvg.attr('width', svgWidth).attr('height', svgHeight)
      const newWidth = svgWidth - margin.left - margin.right
      const newHeight = svgHeight - margin.top - margin.bottom
      // // Update our scale
      // xPositionScale.range([0, newWidth])
      // yPositionScale.range([newHeight, 0])
      // // Update things you draw
      projection.fitSize([newWidth, newHeight], countries)
      svg.selectAll('path').attr('d', path)
      svg.selectAll('.countries').attr('transform', d => {
        const coords = projection([d.lng, d.lat])
        return `translate(${coords})`
      })
        // // Update axes
      // // svg.select('.x-axis').call(xAxis)
      // svg.selectAll('.gdp-note-high').attr('x', newWidth * 0.75)
      // svg.selectAll('.gdp-note-low').attr('x', newWidth * 0.25)
      // svg.select('.y-axis').call(yAxis)
      // svg.select('.y-axis .domain').remove()
    }
    // When the window resizes, run the function
    // that redraws everything
    window.addEventListener('resize', render)
    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render() */
  }
