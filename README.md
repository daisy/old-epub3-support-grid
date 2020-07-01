In 2019, epubtest.org was converted to focus solely on accessibility. This was a unanimous decision by all stakeholders. Mainstream testing had waned and was sorely outdated.

This project is a snapshot of the old epubtest.org archives, for anyone interested in browsing them. New data is not being collected on this site.

## Project notes

This is a static site, built with [11ty](https://11ty.io). 

* `/utils`: script to convert the original site files to markdown
* `/src`: static site generator source files (markdown)

To build the site:

```
npm i
npm run build
```

The output will be in `/docs`.
