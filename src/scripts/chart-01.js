import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
import d3Annotation from 'd3-svg-annotation'
d3.tip = d3Tip
const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 600 - margin.top - margin.bottom
const width = 800 - margin.left - margin.right
const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const projection = d3.geoAlbersUsa()
const path = d3.geoPath().projection(projection)
const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `${d.Date}`
  })
svg.call(tip)
Promise.all([
  d3.json(require('/data/us_states.json')),
  d3.csv(require('/data/RallyLocations.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))
function ready([json, datapoints]) {
  console.log(json.objects)
  const states = topojson.feature(json, json.objects.us_states)
  projection.fitSize([width, height], states)
  svg
    .selectAll('.state')
    .data(states.features)
    .enter()
    .append('path')
    .attr('class', 'state')
    .attr('d', path)
    .attr('fill', 'lavender')
  svg
    .selectAll('.rallies')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'rallies')
    .attr('r', 3)
    .attr('opacity', 0.5)
    .attr('transform', d => {
      const coords = projection([d.lng, d.lat])
      return `translate(${coords})`
    })
    .style('fill', function(d) {
      if (d.Rating === 'Positive') {
        return 'red'
      }
      if (d.Rating === 'Negative') {
        return 'blue'
      } else {
        return 'black'
      }
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}