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
  return gulp.src('widget/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src([
      'widget/js/angular.min.js',
      'widget/js/angular-route.min.js',
      'widget/js/ui-bootstrap-custom-tpls-0.13.0.min.js',
      'widget/js/ngPostMessage.js',
      'widget/js/retrotax.js',
      'widget/js/modal.js',
      'widget/js/common.js'])
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



gulp.task('inject', ['scripts','styles'], function () {

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
    gulp.src('widget/iframe/js/*.js')
        .pipe($.todo())
        .pipe(gulp.dest('./'));
        // -> Will output a TODO.md with your todos 
});
 

// Default Task
gulp.task('default', ['scripts', 'styles', 'partials', 'images', 'misc', 'cordova','copyfiles','html','todo']);




