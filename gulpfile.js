const {
    src,
    dest,
    series
} = require("gulp");
const zip = require('gulp-zip');
const output = "dist/org"
const fs = require( "fs" );

const manifest = JSON.parse(fs.readFileSync("./src/manifest.json", "utf8"));

function copyManifest()
{
    return src('src/manifest.json')
        .pipe(dest(output))
}

function createPackcage()
{
    return src( [
        "dist/org/*",
        "!dist/org/init.js",
        "!dist/org/sdk_pre.js",
        "!dist/org/sdk_post.js",
        "!dist/org/*.js.map",
        "!dist/org/index.html"
    ])
    .pipe(zip(manifest.name + ".zip"))
    .pipe(dest("dist/upload"));
}

exports.copyManifest = copyManifest;
exports.createPackcage = createPackcage;
exports.default = series( copyManifest, createPackcage );