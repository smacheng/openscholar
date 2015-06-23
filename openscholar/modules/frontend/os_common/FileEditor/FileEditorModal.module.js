(function () {
  var service,
    dialogParams = {
      minWidth: 800,
      modal: true
    };

  angular.module('FileEditorModal', ['EntityService', 'FileEditor', 'angularModalService', 'angularFileUpload', 'locationFix'])
    .run(['EntityService', function (EntityService) {
      service = new EntityService('files', 'id');
      service.fetch();
    }])
    .directive('fileEditorModal', ['ModalService', function(ModalService) {

      function link(scope, elem, attr) {
        var data = {
          attr: attr,
          scope: scope
        }
        elem.bind('click', data, clickHandler);
        if (!scope.onClose && scope.viewsClose) {
          scope.onClose = scope.viewsClose;
        }

        elem.parent().find('.fid').change(function (e) {
          // Media removes all click events on the edit button, so we have to add the handler again if we want
          // this to continue working.
          elem.bind('click', data, clickHandler);
          elem.attr('fid', e.target.value);
        })
      }

      function clickHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        var fid = event.data.attr.fid;

        ModalService.showModal({
          template: '<div file-edit file="file" on-close="closeModal(saved)"></div>',
          controller: 'FileEditorModalController',
          inputs: {
            fid: fid
          }
        }).then(function (modal) {
          modal.element.dialog(dialogParams);
          modal.close.then(function(result) {
            event.data.scope.onClose({result: result});
          })
        });

        return false;
      }

      return {
        link: link,
        scope: {
          onClose: '&',
          viewsClose: '&'
        }
      }
    }])
    .controller('FileEditorModalController', ['$scope', 'EntityService', 'fid', 'close', function ($scope, EntityService, fid, close) {
      $scope.file = angular.copy(service.get(fid));

      $scope.closeModal = function (saved) {
        close(saved);
      }
    }]);
})();
