/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('RecentCtrl', function ($scope, $localStorage, $rootScope) {


  console.log("account recentctrl "+$localStorage.account.$id+" "+$localStorage.account.name);
  $scope.members = $localStorage.memberRecent;
  $scope.search = '';

  $rootScope.btnClean = function () {
    console.log('clear');
    $scope.search = '';
  }
});
