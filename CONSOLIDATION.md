# Consolidation Notes

This repository now maintains both:

1. `daily` blog content and Gatsby pages
2. legacy `xiaoxiaoxiaoxiong` homepage assets
3. archived full `xiaoxiaoxiaoxiong` source for safe repository retirement

## Route Mapping

- `/` -> legacy homepage style (from `xiaoxiaoxiaoxiong`)
- `/blog/` -> blog index page

## Asset Location

Legacy homepage assets are stored under:

- `static/xiaoxiaoxiaoxiong-home/asset`
- `static/xiaoxiaoxiaoxiong-home/lib`
- `static/xiaoxiaoxiaoxiong-home/src`

Archived source snapshot is stored under:

- `legacy/xiaoxiaoxiaoxiong/`

## Why

This keeps homepage and blog in a single code repository to simplify maintenance and deployment.
Once production verification is complete, the standalone `xiaoxiaoxiaoxiong` repository can be safely removed.
