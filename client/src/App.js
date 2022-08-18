import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'
import BuildEnv from './buildEnv.js'
import ResultsDataTable from './ResultsDataTable.js'
import Autocomplete from '@mui/material/Autocomplete'
import FacetChips from './FacetChips'
import Grid from '@mui/material/Grid'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [selectedResult, setSelectedResult] = useState([])
  const [cuisines, setCuisines] = useState([])
  const [selectedCuisine, setSelectedCuisine] = useState([])
  const [boroughs, setBoroughs] = useState([])
  const [selectedBorough, setSelectedBorough] = useState([])
  const [facetResults, setFacetResults] = useState([])

  const fetchSearchResultsFromBackend = async (event) => {
    event.preventDefault()
    setSearchTerm(event.target.value)
    if (searchTerm.length > 0) {
      try {
        const searchResults = await fetch(
          `${BuildEnv()}/restaurant/search/${searchTerm}`
        )
        setResults(await searchResults.json())
        fetchFacetedSearchResultsFromBackend(event)
      } catch (err) {
        setResults([])
      }
    }
  }

  const fetchFacetedSearchResultsFromBackend = async (event) => {
    try {
      const activeCuisineFacet = selectedCuisine.value
        ? selectedCuisine.value
        : '*'
      const activeBoroughFacet = selectedBorough.value
        ? selectedBorough.value
        : '*'
      const query = `${BuildEnv()}/restaurant/facet/${searchTerm}/${activeCuisineFacet}/${activeBoroughFacet}`
      const searchResults = await fetch(query)
      const json = await searchResults.json()
      setFacetResults(json[0])
    } catch (err) {
      setFacetResults([])
    }
  }

  React.useEffect(() => {
    const fetchCuisineFacets = async () => {
      const cuisineFacets = await fetch(
        `${BuildEnv()}/restaurants/facets/cuisine`
      )
      const apiResults = await cuisineFacets.json()
      const optionsObject = apiResults.map((c) => {
        return { label: c, value: c }
      })
      setCuisines(await optionsObject)
    }

    const fetchBoroughFacets = async () => {
      const boroughFacets = await fetch(
        `${BuildEnv()}/restaurants/facets/borough`
      )
      const apiResults = await boroughFacets.json()
      const optionsObject = apiResults.map((b) => {
        return { label: b, value: b }
      })
      setBoroughs(await optionsObject)
    }

    fetchCuisineFacets()
    fetchBoroughFacets()
  }, [setCuisines])

  return (
    <div className="App">
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h3" color="inherit">
            NYC Restaurant Search Application for Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <p>
                <Autocomplete
                  sx={{ width: 0.2 }}
                  value={selectedCuisine}
                  options={cuisines}
                  getOptionLabel={(option) => option.value ?? ''}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_event, selected) => {
                    setSelectedCuisine(selected)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Cuisine" />
                  )}
                />
              </p>
              <p>
                <Autocomplete
                  sx={{ width: 0.2 }}
                  value={selectedBorough}
                  options={boroughs}
                  getOptionLabel={(option) => option.value ?? ''}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_event, selected) => {
                    setSelectedBorough(selected)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Borough" />
                  )}
                />
              </p>

              <Autocomplete
                sx={{ width: 0.4 }}
                freeSolo
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name ?? ''}
                autoComplete
                autoHighlight
                options={results}
                value={selectedResult}
                onChange={(_event, selected) => {
                  setSelectedResult([selected])
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option._id}>
                      {option.name}
                    </li>
                  )
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={fetchSearchResultsFromBackend}
                    variant="outlined"
                    label="Restaurant Search"
                  />
                )}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Facets
              </Typography>
              <FacetChips facets={facetResults} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <ResultsDataTable results={selectedResult}></ResultsDataTable>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
