export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieGljb2FndWlhciIsImEiOiJja2sxb3Myb3gwcjc2Mm9uamR5eTdyb2Q5In0.Z5mhQIcO3nqPEsZAj94e2A'

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/xicoaguiar/ckk1qnukc2qdz17lj3n6awpdx',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false,
  })

  const bounds = new mapboxgl.LngLatBounds()

  locations.forEach((loc) => {
    const el = document.createElement('div') // create the marker
    el.className = 'marker'

    new mapboxgl.Marker({
      //add the marker to current location
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map)

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map)

    bounds.extend(loc.coordinates)
  })

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  })
}
