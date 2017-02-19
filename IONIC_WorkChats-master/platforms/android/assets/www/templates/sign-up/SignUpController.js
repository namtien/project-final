/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('SignUpCtrl', function ($scope, $ionicPopup, $timeout, $mdDialog, $state, $ionicLoading, $localStorage, Firebase) {

  console.log($mdDialog);
  $scope.signUp = {};

  $scope.btnSignUp = function () {

    console.log("sign Up");
    var email = $scope.signUp.email;
    var password = $scope.signUp.password;
    var confirmPassword = $scope.signUp.confirmPassword;

console.log("sign Up email "+email);
console.log("sign Up pass "+password);
    if (!email || !password || !confirmPassword) {
      var alertPopup = $ionicPopup.alert({
        template: 'Email do not',
        okText: 'OK'
      });
      return;
    }

    if (password !== confirmPassword) {
      var alertPopup = $ionicPopup.alert({
        template: 'password do not match',
        okText: 'OK'
      });
      return;
    }

    $ionicLoading.show();
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        if (user) {

          user.address = "Ha Noi";
          user.sex = "Boy";
          user.phone = "01658978828";
          user.name = user.email;
          user.id = user.uid;

          firebase.database()
            .ref()
            .child('Users' + "/" + user.uid)
            .set({
              id: user.uid,
              address: user.address,
              name: user.name,
              phone: user.phone,
              sex: user.sex,
              avatar:'https://firebasestorage.googleapis.com/v0/b/finalproject-7dc9b.appspot.com/o/ic_person_default.png?alt=media&token=5f2e1fb9-72a0-4f61-b993-8263014d3369',
              status:0
            });


          $localStorage.user = user;
          console.log($localStorage.user.uid);
          console.log($localStorage.user);


          $state.go('singIn');
          $ionicLoading.hide()
        }
      })

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        console.log(error);
        $ionicLoading.hide()
        var myPopup = $ionicPopup.show({
          title: 'Sign up account fault',
          subTitle: 'Email had exists',
          buttons: [{
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function (e) {
              myPopup.close();
            }
          }]
        });
      });
  }
});
