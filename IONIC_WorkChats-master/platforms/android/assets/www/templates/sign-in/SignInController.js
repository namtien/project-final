/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('SignInCtrl', function ($firebase, $firebaseObject, $scope, $state, $ionicLoading, $ionicPopup, $localStorage, $firebaseAuth, Data) {

  $scope.signIn = {};

  $scope.btnSignIn = function () {
    console.log("singIn");
    var email = $scope.signIn.email;
    var password = $scope.signIn.password;

    if (!email || !password) {
      var alertPopup = $ionicPopup.alert({
        template: 'Email or password do not match',
        okText: 'OK'
      });
      return;
    }

    $ionicLoading.show({
      template: 'Signing In...'
    });

    //noinspection JSUnresolvedFunction
    $firebaseAuth().$signInWithEmailAndPassword(email, password)
      .then(function (user) {
        var ref = firebase.database().ref().child("Users").child(user.uid);
        var obj = $firebaseObject(ref);
        obj.$loaded().then(function () {
          console.log("loaded sign in:" + obj.$id + " " + obj.name);
          // To iterate the key/value pairs of the object, use angular.forEach()
          $localStorage.account = obj;
          console.log(" $loaded " + $localStorage.account.$id + " " + $localStorage.account.name);
        });
        // To make the data available in the DOM, assign it to $scope
        $scope.data = obj;
        // For three-way data bindings, bind it to the scope instead


        $localStorage.user = user;
        Data.getMessages(user.uid);
        Data.getMemberRecent(user.uid);
        Data.getMemberOfGroup('1234566');
        // Data.getInformation(user.uid);
        $ionicLoading.hide();
        $state.go('tab.recent');

        firebase.database()
          .ref()
          .child('Users' + "/" + user.uid)
          .update({ status:1});
      })
      .catch(function () {
        var myPopup = $ionicPopup.show({
          title: 'Sign in  fault',
          subTitle: 'Email  or password do not match',
          buttons: [{
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function (e) {
              myPopup.close();
            }
          }]
        });
        $ionicLoading.hide();
      });
  };
  // $rootScope.$on('$locationChangeSuccess', function() {
  //   $rootScope.actualLocation = $location.path();
  //   // navigator.app.exitApp();
  //   console.log("back.............");
  // });
  // $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
  //   if($rootScope.actualLocation === newLocation) {
  //     $window.close();
  //   }
  // });
});
