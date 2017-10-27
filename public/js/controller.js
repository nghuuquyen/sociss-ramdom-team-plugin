var app = angular.module('myApp', []);
app.controller('appCtrl', ['$scope' , 'LocalStorageService' ,
    function($scope , LocalStorageService) {
    var ctrl = this;
    ctrl.members = [];
    ctrl.memberName = "";
    ctrl.team1 = [];
    ctrl.team2 = [];

    ctrl.initPage = function() {
      //Check wherever has data on local session, if found then get it.
      getDataFromCache();
    };

    /*
    * Add new member to base members list.
    * <p>
    * @return none
    */
    ctrl.addMemeber = function() {
        if(ctrl.memberName !== "") {
          ctrl.members.push(ctrl.memberName);
          ctrl.memberName = "";

          saveDataToCache();
        }
    };

    /*
    * remove selected member from all list.
    * <p>
    * @param index Number : index of selected item in list.
    * @return null
    */
    ctrl.removeMember = function(index) {
      var item = ctrl.members[index] , index;
      ctrl.members.splice(index, 1);

      removeItemAtIndex(ctrl.team1, getIndexItemOfValue(ctrl.team1, item));
      removeItemAtIndex(ctrl.team2, getIndexItemOfValue(ctrl.team2, item));
      delete item;

      saveDataToCache();
    };

    var removeItemAtIndex = function(list,index) {
      if(index !== -1) {
        list.splice(index, 1);
      }
    }

    var getIndexItemOfValue = function (list,value) {
      for(var i = 0 ; i < list.length ; i ++) {
        if(list[i] === value) return i;
      }
      return -1;
    };

    /*
    * Divide members into two list.
    * <p>
    * @return null
    */
    ctrl.processDivideMembers = function () {
      //Reset dữ liệu nếu tồn tại;
      ctrl.team1 = [];
      ctrl.team2 = [];

      //Copy nội dung vào mảng tạm, để tránh nội dung gốc bị xóa;
      var members = angular.copy(ctrl.members);
      // Lấy vị  trí chính giữa của mảng.
      var mid = (members.length / 2) - Math.random() * 1;

      //Lấy ngẫu nhiên một nửa phần từ từ mảng gốc đẩy vào Team 1;
      for(var index = 0 ; index < mid ; index ++ ) {
          var randomItemIndex = Math.floor(Math.random() * members.length);
          ctrl.team1.push(members[randomItemIndex]);
          members.splice(randomItemIndex, 1);
      }

      //Lấy những phần tử còn lại từ mảng bỏ vào Team 2;
      ctrl.team2 = members;

      saveDataToCache();
    };

    /*
    * Get ramdom one member in selected team, and show it on sreen
    * by using window alert.
    * <p>
    * @param team Array - selected team.
    *
    */
    ctrl.getRandomMemberFromTeam = function(team) {
      var randomItemIndex = Math.floor(Math.random() * team.length);
      alert("Xin Mời Đồng Chí " + team[randomItemIndex]);
    };

    /*
    * Move member from own team to another team.
    * <p>
    * @param fromTeam Array : Current team member stayed.
    *
    */
    ctrl.moveToTeam = function(fromTeam, toTeam , itemIndex) {
      toTeam.push(fromTeam[itemIndex]);
      fromTeam.splice(itemIndex,1);

      saveDataToCache();
    };

    ctrl.resetMembers = function() {
      ctrl.members = [];
      ctrl.team1 = [];
      ctrl.team2 = [];
      cleanAllDataInCache();
    };

    ctrl.pushMemberTo = function (team, item) {
      team.push(item);
      ctrl.members.push(item);
      saveDataToCache();
    };

    var getDataFromCache = function () {
      ctrl.members = LocalStorageService.getValue("members") || [];
      ctrl.team1   = LocalStorageService.getValue("team1") || [];
      ctrl.team2   = LocalStorageService.getValue("team2") || [];
    }

    var cleanAllDataInCache = function () {
      LocalStorageService.setValue("members" , []);
      LocalStorageService.setValue("team1" , []);
      LocalStorageService.setValue("team2" , []);
    }

    var saveDataToCache = function() {
      LocalStorageService.setValue("members" , ctrl.members);
      LocalStorageService.setValue("team1" , ctrl.team1);
      LocalStorageService.setValue("team2" , ctrl.team2);
    }

}]);
