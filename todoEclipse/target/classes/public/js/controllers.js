angular.module('app.controllers', []).controller('NoteListController', function($scope, $state, popupService, $window, Note) {
  $scope.notes = Note.query(); //fetch all notes. Issues a GET to /api/vi/notes

  $scope.deleteNote = function(note) { // Delete a Note. Issues a DELETE to /api/v1/notes/:id
    if (popupService.showPopup('Really delete this?')) {
      note.$delete(function() {
        $scope.notes = Note.query();
        $state.go('notes');
      });
    }
  };
}).controller('NoteViewController', function($scope, $stateParams, Note) {
  $scope.note = Note.get({ id: $stateParams.id }); //Get a single note.Issues a GET to /api/v1/notes/:id
}).controller('NoteCreateController', function($scope, $state, $stateParams, Note) {
  $scope.note = new Note();  //create new note instance. Properties will be set via ng-model on UI

  $scope.addNote = function() { //create a new note. Issues a POST to /api/v1/notes
    $scope.note.$save(function() {
      $state.go('notes'); // on success go back to the list i.e. notes state.
    });
  };
}).controller('NoteEditController', function($scope, $state, $stateParams, Note) {
  $scope.updateNote = function() { //Update the edited note. Issues a PUT to /api/v1/notes/:id
    $scope.note.$update(function() {
      $state.go('notes'); // on success go back to the list i.e. notes state.
    });
  };

  $scope.loadNote = function() { //Issues a GET request to /api/v1/notes/:id to get a note to update
    $scope.note = Note.get({ id: $stateParams.id });
  };

  $scope.loadNote(); // Load a note which can be edited on UI
});
