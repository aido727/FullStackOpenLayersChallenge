## Start the app

To start the development server run `nx serve starter`. Open your browser and navigate to http://localhost:4200/

## Issues

- I was unable to get datasets from the second source to work https://esoil.io/TERNLandscapes/Public/Pages/SLGA/
  - Their live swagger interface to raster a pixel range was hitting the error "The supplied coordinate are not in Australia"
  - The deeper error appeared to be this {"error":"could not find function \"pointsInAustralia\""}
  - I also could not get a query to work without 400 or 403 errors from the webAPI itself

## Missing Features

- Error Handling if any outbound calls fail
  - Currently it will get stuck in loading forever
- Custom styling that doesn't lean on material defaults so hard
- Time series visualisation (ran out of time)
- Features regarding analysis/correlations in datasets (ran out of time)
