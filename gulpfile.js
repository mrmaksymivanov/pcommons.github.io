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

gulp.task('lint', function() {
  return gulp.src([
      'widget/iframe/js/ie8.js',
      'widget/iframe/js/retrotax.js',
      'widget/iframe/js/modal.js',
      'widget/iframe/js/common.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src('widget/iframe/js/*')
/*      'widget/iframe/js/ie8.js',
      'widget/iframe/js/retrotax.js',
      'widget/iframe/js/clientSideLogging.js',
      'widget/iframe/js/modal.js',*/
      
      .pipe($.concat('retrotax.js'))
      .pipe($.rename({suffix: '.min'}))
      .pipe($.ngAnnotate())
      .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
      .pipe(gulp.dest(paths.dist+'/widget/js'));
});


gulp.task('images', function () {
  return gulp.src(paths.src + '/widget/iframe/images/*')
    .pipe(gulp.dest(paths.dist + '/widget/iframe/images/'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.src+'/assets/fonts/*')
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/assets/fonts/'));
});



gulp.task('styles', function() {
  return gulp.src(paths.src + '/widget/iframe/css/*.css')
    .pipe($.minifyCss({compatibility: 'ie8'}))
    .pipe($.concat('styles.css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/css'));
});



gulp.task('inject', ['scripts'], function () {

    //var injectStyles = gulp.src([paths.dist+'/assets/css/*']);

    var injectScripts = gulp.src([
        paths.dist+'/widget/iframe/js/retrotax.min.js',
	'!' + paths.src + '/**/*.spec.js',
	'!' + paths.src + '/*.mock.js'
    ]).pipe($.angularFilesort());


   var injectOptions = {
      ignorePath: [paths.dist],
      addRootSlash: false
   };

   var injectOptionsProduction ={
      addRootSlash: true
   };

  return gulp.src(paths.src + '/*.html')
    //.pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    //.pipe($.inject(injectStyles, injectOptionsProduction))
    .pipe($.inject(injectScripts, injectOptionsProduction))
    .pipe(gulp.dest(paths.dist + '/'));

});

gulp.task('html', ['inject'], function () {


  var htmlFilter = $.filter('widget/iframe/*.html');
  var jsFilter = $.filter('widget/iframe/js/*.js');
 // var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src('widget/iframe/*.html')
    .pipe(jsFilter) // takes subset of files working on
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.dist + '/widget/iframe/'))
    .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

// generate a todo.md from your javascript files 
gulp.task('todo', function() {
    gulp.src(['widget/iframe/js/*.js','mocha_plugin.js'])
        .pipe($.todo())
        .pipe(gulp.dest('./'));
        // -> Will output a TODO.md with your todos 
});
 

// Default Task
//'lint', 
gulp.task('default', ['scripts', 'images','html','fonts','todo']);




