// docs: https://www.11ty.io/docs/config/
const path = require('path');
const nunjucks = require('nunjucks');
const md = require("markdown-it");
const { DateTime } = require("luxon");
const fs = require('fs');
const util = require('util');

module.exports = function (eleventyConfig) {

    let nunjucksEnv = new nunjucks.Environment(
        new nunjucks.FileSystemLoader("src/_includes")
    );

    eleventyConfig.addFilter("readableDate", dateObj => {
        let retval = DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy", { zone: 'utc'});
        return retval;
    });
    
    eleventyConfig.addFilter("head", (array, n) => {
        if (n < 0) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    
    eleventyConfig.addFilter('dump', obj => {
        return util.inspect(obj)
    });

    eleventyConfig.setLibrary("njk", nunjucksEnv);

    let markdownIt = require("markdown-it");
    let markdownItAnchor = require("markdown-it-anchor");
    let options = {
        html: true,
        breaks: true,
        linkify: true
    };
    eleventyConfig.setLibrary("md", markdownIt(options)
        .use(markdownItAnchor, {})
    );

    eleventyConfig.addPassthroughCopy("src/media");
    eleventyConfig.addPassthroughCopy("src/epubs");
    eleventyConfig.setDataDeepMerge(true);


    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid"
        ],
        pathPrefix: "/old-epub3-support-grid/",
        passthroughFileCopy: true,
        dir: {
            input: "src",
            output: "docs"
        }
    };
};
