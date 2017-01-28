import * as d3 from "d3"
import glob from './global'
import { call } from './events'
import { zoom, center } from './map/index'
import { addRoot, deselect } from './node/index'
import { overwriteObject, error } from './utils'
import shortcuts from './shortcuts'

/**
 * @name init
 * @param {Object} options - Mind map options.
 * @desc Initial mmap function, set all parameters of the map.
*/
export default function( options ) {

    // Set the view of the map
    glob.container = d3.select('#mmap')
    glob.svg.main = glob.container.append('svg')
        .attr('width', '100%').attr('height', '100%')
    glob.svg.main.append("rect")
        .attr("width", '100%').attr("height", '100%')
        .attr("fill", "white")
        .attr("pointer-events", "all")
        .on('click', deselect )
    glob.svg.mmap = glob.svg.main.append('g')

    glob.nodes = d3.map() // Set d3 map to manage the nodes of mind map
    glob.counter = 0 // Set a global counter for the identity of nodes
    glob.history.index = -1 // Set history mmap settings to manage the snapshots
    glob.history.snapshots = []

    // If there are external options, then update the default options
    if ( options !== undefined )
        options.constructor === Object
            ? overwriteObject( glob.options, options )
            : error('mmap options invalid')

    // Set the optional settings
    if ( glob.options['center-onresize'] === true ) onresize = center
    if ( glob.options['shortcuts'] !== false ) shortcuts()
    if ( glob.options['zoom'] === true ) glob.svg.main.call( zoom )

    call('mmcreate', glob.container.node() )
    addRoot()
}
