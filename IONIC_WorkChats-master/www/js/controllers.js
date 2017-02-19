var appControllers = angular.module('starter.controllers', ['firebase']); // Use for all controller of application.

appControllers.controller('MainCtrl', function ($scope, $localStorage, Data, ChatsGroups) {
  Data.init();
  // Data.getMembers();
  Data.getTopics();
  Data.getGroups();
  // if ($localStorage.user != null && $localStorage.user.uid != null) {
  //   Data.getMemberRecent($localStorage.user.uid);
  //   Data.getInformation($localStorage.user.uid);
  // }
  Data.getMemberOfGroup('1234566');
  console.log("controllerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
});


