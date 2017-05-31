// ### PLUGINS ### //

var gulp = require('gulp'),
    gutil = require('gulp-util'),  //error logging
    sass = require('gulp-sass'),    //sass. libsass that is, not ruby sass
    concat = require('gulp-concat'), // same as grunt. sticks files into one
    minifycss = require('gulp-minify-css'), // minimise css
    jshint = require('gulp-jshint'), // js debugger 
    uglify = require('gulp-uglify'), // minimise js
    notify = require('gulp-notify'), //success message
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'), //prefixes css3 properties
    debug = require('gulp-debug'), //debugger for gulp
    gulpCopy = require('gulp-copy'), 
    htmlreplace = require('gulp-html-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');


// ## dev tasks notes
    // stick .pipe(notify("Found file: <%= file.relative %>!"))
    // in the tasks if you want to test the output
 
// ### THE VARIABLES ### //
// Ideally, only the base paths should need updating per site build
    var basePaths = {
      appMain: 'style_app/',   //source directory - the repo
      distMain: 'wp-content/themes/',
    };

    var subPaths = {
      //appTemplate: basePaths.appMain + 'desktopA/', 
      distTemplate: basePaths.distMain + 'browwse/',  //set up where the files will go
      //styleApp: basePaths.appMain + 'style_app/'
      //styleApp: basePaths.appMain + 'style_app/'
    };

    var paths = {
      // PATHS TO THE APP
      styleAppJsFolder: basePaths.appMain + 'js/',
      styleAppScssFolder: basePaths.appMain + 'scss/',
      styleAppImgFolder: basePaths.appMain + 'images/',

      //PATHS TO THE ACTIVE TEMPLATE
      distJsFolder: subPaths.distTemplate + '/js/',
      distCssFolder: subPaths.distTemplate + '/css/',
      distImgFolder: subPaths.distTemplate + '/images/',
      distHtmlFolder: subPaths.distTemplate,
      //distFontFolder: subPaths.distTemplate + 'public/assets/fonts/',  
    };


    var filePaths = {  //common paths used, saves time
      javascripts: [
               paths.styleAppJsFolder + 'site/*.js'
      ],
      stylesheets: [(paths.styleAppScssFolder + '**/*.scss')],

      images: [(paths.styleAppImgFolder + '/**/*.*')],
      html:   [ basePaths.appMain + 'site-files/**/*']
                //basePaths.appMain + 'site-files/*.*']
      //fonts:  [(subPaths.styleApp + 'fonts/**/*.*')]
    };

    var processors = [
    autoprefixer({browsers: ['last 2 versions']})  //browser prefixes fallback
    ];


// #### THE TASKS #### //

// empty the existing template // yay
gulp.task('clean:templates', function () {
    return del([
        (basePaths.distMain), // the sites template folder
    ]);
});


//repopulate the template folder  // yay
gulp.task('copy', function() {
    gulp.src(basePaths.appMain + '**/*') //everything in the repo
        .pipe(gulp.dest(basePaths.distMain));  // send to designated template eg desktopb
});


//Identify the html pages to watch and move
gulp.task('html', function() {
    //gulp.src(filePaths.html, {base: subPaths.appTemplate})  //everything in the app template... im watching you
        gulp.src(filePaths.html, {base: basePaths.appMain + 'site-files'})
       .pipe(gulp.dest(subPaths.distTemplate))
       

      //  .pipe(gulp.dest(subPaths.distTemplate)) //and sending to the designated template
        //.pipe(notify("Found file: <%= file.relative %>!"))
});

//look for image updates
gulp.task('images', function() {
    gulp.src(filePaths.images) //grab the images in style app
     .pipe(gulp.dest(paths.distImgFolder)) 
     .pipe(gulp.dest(paths.appImgFolder)) 
     });

gulp.task('fonts', function() {
    gulp.src(filePaths.fonts) //grab the images in style app
     .pipe(gulp.dest(paths.distFontFolder)) 
    // .pipe(gulp.dest(paths.appFontFolder)) 
     });


// watch all the sass files  yay
gulp.task('css', function() {
    gulp.src(filePaths.stylesheets) //grab the scss files in style app

    //gulp.src(paths.appSassFolder + '**/*') //grab the scss from the app
        .pipe(sourcemaps.init()) // srev up the sourcemap
        .pipe(sass().on('error', sass.logError))  // if errors log em
        //.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))  //commented out. needs updating
        .pipe(sourcemaps.write('./maps')) // run the sourcemap plugin and generate
      //  .pipe(gulp.dest(paths.distCssFolder))  // send the generated css file to the designated template
        //.pipe(notify("Found file: <%= file.relative %>!"))
       .pipe(gulp.dest(basePaths.appMain + 'css/'))  // send the generated css file to the app // 
       //.pipe(gulp.dest(paths.appCssFolder))
       //.pipe(gulp.dest(paths.distCssFolder))
       .pipe(notify("Found file: <%= file.relative %>!"))
       .pipe(gulp.dest(subPaths.distTemplate)) 
});


//watch the js files and update - still in the repo folder - not yet in site 
gulp.task('js', function() {
   return gulp.src(filePaths.javascripts)  //existing js files
   //.pipe(notify("Found file: <%= file.relative %>!"))
   //.pipe(notify("Found file: <%= file.relative %>!"))
    .pipe(concat('scripts.js')) 
    .pipe(uglify()) //minimise that file
    .pipe(gulp.dest(paths.distJsFolder))  //and here is where that single file will live. destination root file has to exist
    //.pipe(gulp.dest(paths.appJsFolder))
    .pipe(gulp.dest(paths.styleAppJsFolder))
  });


/* Stuck them all in a single task, they could be separated out, but seems good to have all the optimisation as a single process*/
gulp.task('optimise', function() {
  gulp.src('css/style.css') //grab the scss files
  //.pipe(rename({suffix: '.min'}))  //rename this css file
  .pipe(minifycss()) // shrink it
  .pipe(gulp.dest('css/style.css')) //place it
});

// TODO add minify tasks here
//  remove dev files from template files
gulp.task('housekeeping', function () {
  return del([(subPaths.distTemplate + 'app/')]); // not required for live site, but need for dev as shows sourcemapping
  return del([(subPaths.distTemplate + 'style_app/')]);  //remove styleguide

});


// ### WATCH TASKS ### //
gulp.task('default',function() {
  gulp.watch([filePaths.stylesheets],['css']);  //watch the sass files and move to template
  gulp.watch([filePaths.javascripts],['js']);
 gulp.watch([filePaths.html],['html']); 
  gulp.watch([filePaths.images],['images']); 
 // gulp.watch([filePaths.fonts],['fonts']); 
});