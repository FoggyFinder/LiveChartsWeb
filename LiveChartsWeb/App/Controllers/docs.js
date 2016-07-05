﻿'use strict';

app.controller('docsController', [
    '$scope', '$routeParams', '$location', '$anchorScroll', 'docsService', '$http', '$timeout',
    function($scope, $routeParams, $location, $anchorScroll, docsService, $http, $timeout) {
        docsService($routeParams.version).success(function (response) {

            var latest = $routeParams.version || 'beta';

            $scope.version = latest;
            $scope.sections = response;

            if (!$scope.sections) {
                $location.path('/docnotfound').replace();
            }

            var search = $location.search().search;
            $scope.criteria = search ? search : '';

            $anchorScroll.yOffset = 60;
            $anchorScroll();

            
            if ($routeParams.section !== "introduction") {
                $http.get('/App/Docs/' + latest + '/files/' + $routeParams.section + '.txt')
                    .success(function(type) {
                        $scope.type = type;
                    }).error(function() {
                        $location.path('/docnotfound').replace();
                    });
            }

            var url = 'https://raw.githubusercontent.com/beto-rodriguez/Live-Charts/master/Core/AxisCore.cs';
            $http.get(url).success(function(response) {
                $scope.apiContent = response;
            });

            $scope.openModal = function (uri) {
                $http.get(uri).success(function (raw) {
                    $scope.isModalOpen = true;
                    $scope.currentRaw = raw;
                    $timeout(function () {
                        var modal = document.getElementById('docs-modal');
                        modal.focus();

                        function scrollTo(element, to, duration) {
                            if (duration <= 0) return;
                            var difference = to - element.scrollTop;
                            var perTick = difference / duration * 10;

                            setTimeout(function () {
                                element.scrollTop = element.scrollTop + perTick;
                                if (element.scrollTop === to) return;
                                scrollTo(element, to, duration - 10);
                            }, 10);
                        }

                        scrollTo(modal, 0, 500);
                    }, 300);
                }).error(function() {
                    alert('the request was not completed correctly.');
                });
            }

            $scope.closeModal = function () {
                $scope.isModalOpen = false;
            }

            $scope.closeModalWKB = function($key) {
                if ($key.which === 27) $scope.closeModal();
            }

        }).error(function() {
            $location.path('/docnotfound').replace();
        });
    }
]);