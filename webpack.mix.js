
let mix = require('laravel-mix')
let tailwindcss = require('tailwindcss')
require('laravel-mix-purgecss')

// Paths
const paths = {
    sass: {
        source: './resources/sass/main.scss',
        dest: 'css/'
    },
    javascript: {
        source: './resources/js/main.js',
        singles: './resources/js/singles/*',
        dest: 'js/'
    }
}

// Run mix
mix

    .webpackConfig({
        resolve: {
            alias: {
                '@utilities': path.resolve(__dirname, 'resources/js/utilities'),
                '@modules': path.resolve(__dirname, 'resources/js/modules')
            }
        }
    })

    // Concatenate & Compile Javascript
    .js(paths.javascript.source, paths.javascript.dest)

    // Compile singles
    // .js(paths.javascript.singles, paths.javascript.dest)

    // Compile SCSS & TailwindCSS
    .sass(paths.sass.source, paths.sass.dest)
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('tailwind.config.js')]
    })

    // Production only
    if ( mix.inProduction() )
    {

        // Remove any unused CSS using Purge
        mix

            .purgeCss({
                folders: [
                    'site'
                ],
                extensions: [
                    'html',
                    'njk'
                ],
                whitelist: [
                    'body',
                    'html',
                    'a',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'p',
                    'blockquote',
                    'breadcrumbs',
                    'content',
                    'form',
                    'input',
                    'textarea',
                    'intro',
                    'btn',
                    'loaded',
                    'page-title',
                    'required',
                    'row',
                    'visually-hidden',
                    'menu-visible'
                ]
            })

            // Minifies CSS & JS files
            .minify(paths.sass.dest + 'main.css')
            .minify(paths.javascript.dest + 'main.js')

    }


