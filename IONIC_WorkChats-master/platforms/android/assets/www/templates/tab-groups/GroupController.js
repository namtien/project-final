/**
 * Created by Nhahv on 11/6/2016.
 */
appControllers.controller('GroupsCtrl', function ($scope, $localStorage) {
  $scope.groups = $localStorage.groups;

  for (var i = 0; i < $localStorage.groups.length; i++) {
    console.log("Group Ctrl Info " + $localStorage.groups[i]);
  }

  var topics = $localStorage.members;
  console.log("GroupsCtrl " + $localStorage.groups.length);
  //noinspection JSDuplicatedDeclaration
  for (var i = 0; i < topics.length; i++) {
    console.log("Topic " + topics[i]);
  }

  $scope.addGroup = function () {
    console.log("vaooooooooooo");


  }
});
