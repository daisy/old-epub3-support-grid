In 2019, epubtest.org was converted to focus solely on accessibility. This was a unanimous decision by all stakeholders. Mainstream testing had waned and was sorely outdated.

This project is a static site for the old epubtest.org archives, for anyone interested in browsing them. New data is not being collected on this site.

## Project notes

* `/sources`: pages scraped directly from the site
* `/src`: static site generator source files (markdown)

The files in `/sources` were converted by the script in `/utils` and written as markdown files in `/src/content`.

Build the site:

```
npm i
npm run build
```

The output will be in `/docs`.
