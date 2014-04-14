
function Hello($scope, $http) {
    $http.get('http://localhost:9999').
        success(function(data) {

            $scope.environments = data;

            console.log(data);

        });
}