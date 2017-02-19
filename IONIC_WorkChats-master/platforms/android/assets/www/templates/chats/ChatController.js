/**
 * Created by Nhahv on 11/6/2016.
 */
appControllers.controller('ChatDetailCtrl',
  function ($rootScope, $localStorage, $scope, $stateParams, $state, ChatsSingle, $ionicScrollDelegate, $q) {
    $scope.historyBack = function () {
      // window.history.back();
      //

      $state.go('tab.members');

    };
    $scope.chat = {};
    for (var i = 0; i < $localStorage.memberOfGroup.length; i++) {
      if ($localStorage.memberOfGroup[i].$id == $stateParams.chatId) {
        $scope.chat.name = $localStorage.memberOfGroup[i].name;

      }
    }

    $scope.idSend = $localStorage.user.uid;

    var idReceiver = $stateParams.chatId;

    // console.log("account " + $localStorage.account.name + " " + $localStorage.account.id + " " + $localStorage.account.sex);
    // console.log("send " + $scope.idSend);
    // console.log("receiver " + idReceiver + " ");
    var information = $localStorage.account;
    console.log("Name " + information.name);
    $ionicScrollDelegate.scrollBottom(true);
    ChatsSingle.get($scope.idSend, idReceiver);
    console.log(" Call get DAYYYYYYYYYYYYYYYYYYYYYYY " + $scope.idSend + " " + idReceiver);
    $scope.chatList = ChatsSingle.all();
    console.log("Size list chat " + ChatsSingle.all().length);

    $q.when(ChatsSingle.all()).then(function () {
      $ionicScrollDelegate.scrollBottom(true);
    });

    $scope.sendChat = function (chatText){
      var time = (new Date()).getTime();
      var key = firebase.database().ref('Messages')
        .child($scope.idSend)
        .child(idReceiver)
        .push().key;
      // console.log("key........" + key);
      var objectMessage = {
        key: key,
        time: time,
        idSend: $scope.idSend,
        idReceiver: idReceiver,
        text: chatText,
        avatar: information.avatar
      };
      ChatsSingle.send(objectMessage);
      console.log("Size list chat send chat " + ChatsSingle.all().length);
    };
    $scope.openImages = function (files) {
      console.log("OpenImages .........."+files);
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
    }

    $scope.photoChanged = function (files) {
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
  });
