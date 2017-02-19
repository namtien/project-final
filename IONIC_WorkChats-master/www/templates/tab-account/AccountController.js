/**
 * Created by Nhahv on 11/12/2016.
 */
appControllers.controller('AccountCtrl', function ($scope, $ionicModal, $timeout, $state, $localStorage) {
  $scope.change = {};
  var storageRef = firebase.storage().ref();
  //noinspection JSUnresolvedVariable,JSUnresolvedFunction
  $scope.getinfo = function (userId) {

    return firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
      $scope.change.userphone = snapshot.val().phone;
      $scope.change.usersex = snapshot.val().sex;
      $scope.change.useraddress = snapshot.val().address;
      $scope.change.username = snapshot.val().name;
      $scope.change.image = snapshot.val().image;
      $scope.change.avatar = snapshot.val().avatar;
    });
  };
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $scope.change.useremail = user.email;
      $scope.change.userId = user.uid;
      var userId = user.uid;
      //noinspection JSUnresolvedVariable,JSUnresolvedFunction
      $scope.getinfo(userId);
    } else {
      console.log('not log in');
    }
  });
  $scope.resetpass = function () {
    $scope.change.userpassword = '';
  };
  $scope.thumbnail = [];
  // Read the image using the filereader
  $scope.fileReaderSupported = window.FileReader != null;
  $scope.photoChanged = function (files) {
    console.log("PhotoChanged "+files+" "+files.length);
    if (files != null) {
      var file = files[0];
      $scope.change.imagename = file.name;
      $scope.change.imagefile = file;
      if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
        $timeout(function () {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file); // convert the image to data url.
          fileReader.onload = function (e) {
            $timeout(function () {
              $scope.thumbnail.dataUrl = e.target.result;
            });
          }
        });
      }
    }
  };

  $scope.saveChange = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      //chage email
      user.updateEmail($scope.change.useremail).then(function () {
        // Update successful.
      }, function (error) {
        // An error happened.
      });
      //change password
      if ($scope.change.userpassword) {
        user.updatePassword($scope.change.userpassword).then(function () {
          // Update successful.
        }, function (error) {
          // An error happened.
        })
      }

    });
    firebase.database().ref('Users/' + $scope.change.userId).update({
      name: $scope.change.username,
      sex: $scope.change.usersex,
      phone: $scope.change.userphone,
      address: $scope.change.useraddress
    });
    //var storageRef = firebase.storage().ref().child($scope.change.userId+'/'+$scope.change.imagename);
    if ($scope.change.imagename) {
      storageRef.child($scope.change.userId + '/' + $scope.change.imagename).put($scope.change.imagefile).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
        storageRef.child($scope.change.userId).child($scope.change.imagename).getDownloadURL().then(function (url) {
          $scope.change.src = url;
          firebase.database().ref('Users/' + $scope.change.userId).update({
            image: $scope.change.imagename,
            avatar: $scope.change.src
          });

          $scope.getinfo($scope.change.userId);
        });

      }).catch(function (error) {
        // Handle any errors
      });
    }

    $scope.closeModal();
  };

  $scope.logout = function () {
    firebase.auth().signOut().then(function () {
      firebase
        .database()
        .ref()
        .child('Users' + "/" + $localStorage.user.uid)
        .update({status: 0});
      $state.go('singIn');


    }, function (error) {
      console.error('Sign Out Error', error);
    });
  };

  $ionicModal.fromTemplateUrl('templates/popup/change.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });
});
