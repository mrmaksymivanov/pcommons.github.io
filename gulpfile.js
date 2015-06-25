// Include gulp
var gulp = require('gulp');

gulp.paths = {
  src: '.',
  dist: 'dist'
};
var paths = gulp.paths;
//require('require-dir')('./');


// Include plugins
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});


// Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src([
'assets/js/angular.min.js',
'assets/js/angular-route.min.js',
'assets/js/mobile-angular-ui.min.js',
'assets/js/mobile-angular-ui.min.js',
'assets/js/ui-bootstrap-custom-tpls-0.13.0.min.js',
'assets/js/ngMask.min.js',
'assets/js/angular-local-storage.js',
'assets/js/angular-loading-spinner.min.js',
'assets/main.js',
'assets/js/tcid/*.js'])
      .pipe($.concat('app.js'))
      .pipe($.rename({suffix: '.min'}))
      .pipe($.ngAnnotate())
      .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
      //.pipe(annotate()) //makes angular safe to minify?
      //.pipe($.uglify())
      .pipe(gulp.dest(paths.dist+'/assets/js'));
});


gulp.task('images', function () {
  return gulp.src(paths.src + '/assets/img/**/**/*')
    .pipe(gulp.dest(paths.dist + '/assets/img/'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.src+'/assets/fonts/*')
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/assets/fonts/'));
});

gulp.task('misc', function () {
  return gulp.src(paths.src + '/**/*.ico')
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('cordova', function () {
  return gulp.src([paths.src + '/*.js', paths.src + '/*.abproject',paths.src + '/*.abignore'])
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('styles', function() {
  return gulp.src(paths.src + '/assets/css/*.css')
    .pipe($.minifyCss({compatibility: 'ie8'}))
    .pipe($.concat('styles.css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'));
});


// Copy Cordova Resource FOLDER
gulp.task('copyfiles', function () {
    gulp.src(paths.src +'/App_Resources/*')
        .pipe(gulp.dest(paths.dist+'/App_Resources'));
});


gulp.task('partials', function () {
  return gulp.src([
    paths.src + '/assets/js/tcid/views/*.html'
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'app'
    }))
    .pipe(gulp.dest(paths.dist+'/partials/'));
});


gulp.task('inject', ['scripts','styles','partials'], function () {

  var partialsInjectFile = gulp.src(paths.dist + '/partials/templateCacheHtml.js', { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: paths.dist,
    addRootSlash: false
  };
  var partialsInjectOptionsProduction = {
    starttag: '<!-- inject:partials -->',
    addRootSlash: false
   };

    var injectStyles = gulp.src([paths.dist+'/assets/css/*']);

    var injectScripts = gulp.src([
        paths.dist+'/assets/js/*',
	'!' + paths.src + '/**/*.spec.js',
	'!' + paths.src + '/*.mock.js'
    ]).pipe($.angularFilesort());


   var injectOptions = {
      ignorePath: [paths.dist],
      addRootSlash: false
   };

   var injectOptionsProduction ={
      addRootSlash: false
   };

  return gulp.src(paths.src + '/*.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(injectStyles, injectOptionsProduction))
    .pipe($.inject(injectScripts, injectOptionsProduction))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.inject(partialsInjectFile, partialsInjectOptionsProduction))
    .pipe(gulp.dest(paths.dist + '/'));

});

gulp.task('html', ['inject'], function () {


  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(paths.dist + '/*.html')
    //.pipe($.rev()) //revision 
    .pipe(jsFilter) // takes subset of files working on
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    //.pipe($.useref())
    //.pipe($.revReplace())
    //.pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    //.pipe(htmlFilter.restore())
    .pipe(gulp.dest(paths.dist + '/'))
    .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

// generate a todo.md from your javascript files 
gulp.task('todo', function() {
    gulp.src('assets/js/**/**/*.js')
        .pipe($.todo())
        .pipe(gulp.dest('./'));
        // -> Will output a TODO.md with your todos 
});
 

// Default Task
gulp.task('default', ['fonts', 'scripts', 'styles', 'partials', 'images', 'misc', 'cordova','copyfiles','html','todo']);




