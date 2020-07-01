In 2019, epubtest.org was converted to focus solely on accessibility. This was a unanimous decision by all stakeholders. Mainstream testing had waned and was sorely outdated.

This project is a static site for the old epubtest.org archives, for anyone interested in browsing them. New data is not being collected on this site.

## Project notes

* `/utils`: script to convert the original site files to markdown
* `/src`: static site generator source files (markdown)

The files in `/src/content` were converted from the original site. The conversion mainly cleaned up links and reformatted the pages so they could be templated. No data was changed.

To build the site:

```
npm i
npm run build
```

The output will be in `/docs`.
