/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('DetailGroupsCtrl', function ($state,$scope, $ionicModal, ChatsGroups, $stateParams) {

  $scope.backToGroups = function () {
    // window.history.back();
    $state.go('tab.groups');
  };

  var groupId = $stateParams.groupId;
  console.log("DetailGroupsCtrl @@@@@@@"+$stateParams.groupId);

  // var listGroup = ChatsGroups.
  $scope.groups = {};
  $scope.groups.name = "I love coffe";


  ChatsGroups.getTopicsOfGroup(groupId);
  $scope.topics = ChatsGroups.getAllTopics();
  console.log("LENGTH TOPIC Group "+$scope.topics.length);
  ChatsGroups.getMemberOfGroups(groupId);
  $scope.members = ChatsGroups.allMemberGroup();

  $scope.topic = {};
  $scope.addTopic = function () {
    var newPostKey = firebase.database().ref('Topics').push().key;
    firebase.auth().onAuthStateChanged(function (user) {
      var save = firebase.database().ref('Topics/' + newPostKey);
      save.set({
        id: newPostKey,
        title: $scope.topic.title,
        describe: $scope.topic.describe,
        group: groupId,
        admin: user.uid,
        type: $scope.topic.type,
        numbermember: 1,
        avatar:'https://www.waterbabiesbikini.com/Images/dessie1.jpg'
      });
      save.child('members').child(user.uid).set(user.uid);
      var addtopic = firebase.database().ref("GroupMember").child(groupId).child('Topics').child(newPostKey).set(newPostKey);

    });
    // firebase.database().ref('Topics/'+newPostKey+'/'+'members').push({
    //   idp: newPostKey
    // });
    $scope.closeModal();
  };

  $ionicModal.fromTemplateUrl('templates/popup/addtopic.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.newTopic = function () {
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
