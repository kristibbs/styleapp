var styleApp = angular.module('styleApp', ['ngRoute', 'ngAnimate','ui.bootstrap']);

//Controls the the navigation list
styleApp.controller('navCtrl', function ($scope, $http) {

    $http.get('app-files/js/json/atoms.json').success(function(data) {
        $scope.atomsList = data;                
    });

    $http.get('app-files/js/json/molecules.json').success(function(data) {
        $scope.moleculeList = data;                
    });

    $http.get('app-files/js/json/organisms.json').success(function(data) {
        $scope.organismList = data;                
    });

    $http.get('app-files/js/json/template.json').success(function(data) {
        $scope.templateList = data;                
    });

    $http.get('app-files/js/json/pages.json').success(function(data) {
        $scope.pagesList = data;                
    });

    $http.get('app-files/js/json/helper.json').success(function(data) {
        $scope.helperList = data;                
    });
       
});

styleApp.controller('mainCtrl', function ($scope) {
$scope.class_status = 0;
$scope.toggleSingleClass = function() {  
    $scope.class_status = !$scope.class_status;
    $scope.single_message ="class is toggle";
  };

$scope.removeSingleClass = function() {  
    $scope.class_status = 0;
    };
});

// 
// also include ngRoute for all our routing needs
// configure our routes
styleApp.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'app-files/scaffolding/home.html',
            })
            .when('/home', {
                templateUrl : 'app-files/scaffolding/home.html',
            })
            .when('/styles', {
                templateUrl : 'app-files/atoms/styles.html',
            })

            .when('/forms', {
                templateUrl : 'app-files/atoms/form.html',
            })

            .when('/buttons', {
                templateUrl : 'app-files/atoms/buttons.html',
            })
            .when('/tables', {
                templateUrl : 'app-files/atoms/tables.html',
            })
            .when('/images', {
                templateUrl : 'app-files/atoms/images.html',
            })


            //Molecules
            .when('/molecule-article', {
                templateUrl : 'app-files/molecules/molecule-article.html',
            })
            .when('/molecule-links-list', {
                templateUrl : 'app-files/molecules/molecule-links-list.html',
            })
            .when('/molecule-teaser-list', {
                templateUrl : 'app-files/molecules/molecule-teaser-list.html',
            })
            .when('/molecule-primary-navigation', {
                templateUrl : 'app-files/molecules/molecule-primary-navigation.html',
            })


           // ORGANISMS //
            .when('/organism-main-navigation', {
                templateUrl : 'app-files/organisms/organism-main-navigation.html',
            })
            .when('/organism-header', {
                templateUrl : 'app-files/organisms/organism-header.html',
            })
            .when('/organism-footer', {
                templateUrl : 'app-files/organisms/organism-footer.html',
            })

            
            // TEMPLATES //
            .when('/templates-article-page', {
                templateUrl : 'app-files/templates/template-article-page.html',
            })


            // PAGES scaffolding //
            .when('/atoms', {
                templateUrl : 'app-files/scaffolding/atoms.html',
            })
            .when('/organisms', {
                templateUrl : 'app-files/scaffolding/organisms.html',
            })
            .when('/molecules', {
                templateUrl : 'app-files/scaffolding/molecules.html',
            })
            .when('/templates', {
                templateUrl : 'app-files/scaffolding/templates.html',
            })
            .when('/pages', {
                templateUrl : 'app-files/scaffolding/pages.html',
            })
            .when('/helpers', {
                templateUrl : 'app-files/scaffolding/helpers.html',
            }) 


            //Pages 
            .when('/page-article', {
                templateUrl : 'app-files/pages/page-article-page.html',
            })

            //helpers
            .when('/help-developer-guide', {
                templateUrl : 'app-files/helpers/help-developer-guide.html',
            })
           
    });
