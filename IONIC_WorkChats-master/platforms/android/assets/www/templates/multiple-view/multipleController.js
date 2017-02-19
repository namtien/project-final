/**
 * Created by Nhahv on 11/1/2016.
 */
appControllers.controller('FriendListCtrl',
  function ($scope, $state, MultipleViewsManager, $stateParams, ChatsGroups, $localStorage) {

    //noinspection JSUnresolvedVariable
    var id = $stateParams.groupId;
    console.log(id);
    ChatsGroups.getMemberOfTopic(id);
    $scope.members = $localStorage.memberOfTopic;
    console.log('FriendListCtrl ' + $localStorage.memberOfTopic.length);

  });

appControllers.controller('ViewMessageCtrl',
  function ($scope, $stateParams, MultipleViewsManager, $ionicScrollDelegate, ChatsGroups, $localStorage, $q) {

    //noinspection JSUnresolvedVariable
    var id = $stateParams.groupId;
    console.log(id);

    console.log('ViewMessageCtrl');
    console.log($localStorage.messageTopic);
    ChatsGroups.getMessageTopic(id);

    $scope.message = ChatsGroups.chats();

    $scope.idSend = $localStorage.user.uid;
    console.log($scope.idSend);

    $ionicScrollDelegate.scrollBottom(true);
    var information = $localStorage.account;
    console.log("INFOMAITIOM ACCOUNT " + $localStorage.account.avatar + " " + $localStorage.account.id);
    $scope.sendChat = function (chatText) {

      var time = (new Date()).getTime();
      var objectMessage = {
        time: time,
        idSend: $scope.idSend,
        text: chatText
        ,
        avatar: information.avatar
      };
      console.log("Chat Group " + chatText + " " + id);

      firebase.database().ref('MessageTopic').child(id).push().set(objectMessage, function (error) {
        if (!error) {
          $ionicScrollDelegate.scrollBottom(true);
        }
      });
      // ChatsGroups.send(objectMessage, id);
    };
  });

