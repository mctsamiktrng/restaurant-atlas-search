import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip'
import LocationCity from '@material-ui/icons/LocationCity'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

export default class FacetChips extends Component {
  render() {
    if (this.props.facets.facet) {
      let facets = []
      for (const [facetName, facetData] of Object.entries(
        this.props.facets.facet
      )) {
        for (const [, value] of Object.entries(facetData.buckets)) {
          facets.push({
            key: value._id,
            label: value._id + ' (' + value.count + ')',
            icon:
              facetName === 'cuisine' ? (
                <RestaurantMenuIcon />
              ) : (
                <LocationCity />
              )
          })
        }
      }
      return (
        <div>
          {facets.map((facet) => (
            <Chip key={facet.key} icon={facet.icon} label={facet.label} />
          ))}
        </div>
      )
    }
  }
}
