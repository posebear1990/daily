# Consolidation Notes

This repository now maintains both:

1. `daily` blog content and Gatsby pages
2. legacy homepage assets

## Route Mapping

- `/` -> legacy homepage style
- `/blog/` -> blog index page

## Asset Location

Legacy homepage assets are stored under:

- `static/legacy-home/asset`
- `static/legacy-home/lib`
- `static/legacy-home/src`

## Why

This keeps homepage and blog in a single code repository to simplify maintenance and deployment.
The standalone homepage repository has already been retired, and `daily` now keeps only the runtime homepage assets it still serves.
