// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push'
])

.config(['$ionicAppProvider', function($ionicAppProvider){
  $ionicAppProvider.identify({
    app_id: 'b60d4c1b',
    api_key: 'fbd7b8f5c750b7f665f9b5144ea018e91b27ad045319c3a0',
    dev_push: true
  });
}])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('PushCtrl', function($scope, $rootScope, $ionicUser, $ionicPush){

  $scope.identifyUser = function(){
    var user = $ionicUser.get();
    if(!user.user_id){
      user.user_id = $ionicUser.generateGUID();
    };

    $scope.pushRegister = function(){
      console.log('Ionic Push: Registering user');

      $ionicPush.register({
        canShowAlert: true,
        canSetBadge: true,
        canPlaySound: true,
        canRunActionsOnWake: true,
        onNotification: function(notification){
          return true;
        }
      });
    };

    angular.extend(user, {
      name: 'Simon',
      bio: 'Author'
    });

    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      console.log('Identified user' + user.name + '\n ID' + user.user_id);
    });
  };

  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data){
    alert("Successfully registered token" + data.token);
    console.log('Ionic Push: Got token', data.token, data.platform);
    $scope.token = data.token;
  });

});
