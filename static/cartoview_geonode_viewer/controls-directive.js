/**
 * Created by kamal on 6/28/16.
 */
angular.module('cartoview.viewer.editor').directive('basicControls', function (urlsHelper) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: urlsHelper.static + "cartoview_geonode_viewer/angular-templates/basic-controls.html",
        controller: function ($scope, dataService, $mdMedia, $mdDialog) {
            $scope.instanceObj = dataService.instanceObj;
            $scope.selected = dataService.selected;
            $scope.instanceObj.config.playback_config = {
                maxDate: 1385938800000,
                minDate: 324511200000,
                autoPlay: false,
                interval: 500,
                numIntervals: 100
            };
            $scope.instanceObj.config.scalebar_config = {width: 64, units: "mertic"};
            $scope.instanceObj.config.north_config = {autoHide: false};
            $scope.instanceObj.config.overview_config = {collapsed: false};
            $scope.instanceObj.config.zoom_config = {
                duration: 250,
                zoomInTipLabel: "Zoom In",
                delta: 1.2,
                zoomOutTipLabel: "Zoom Out"
            };
            var layersDict = {};
            var layerNames = [];
            $scope.mapLayers = [];
            angular.forEach(dataService.selected.map.map_layers, function (layer) {
                if (!layer.fixed) {
                    layer.params = JSON.parse(layer.layer_params);
                    layerNames.push(layer.name);
                    layersDict[layer.name.split(':')[1]] = layer;
                    var layerInfo = {
                        name: layer.name,
                        title: layer.params.title
                    };
                    $scope.mapLayers.push(layerInfo);
                }
            });

            console.log(layersDict['historic_pnt']);
            console.log(layerNames);
            $scope.openDialog = function ($event) {
                $mdDialog.show({
                    controller: ScaleDialogController,
                    templateUrl: urlsHelper.static + "cartoview_geonode_viewer/angular-templates/scale-dialog.tmpl.html",
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    locals: {
                        scalebar_config: $scope.instanceObj.config.scalebar_config
                    }
                }).then(function (answer) {
                    $scope.instanceObj.config.scalebar_config = {width: answer.width, units: answer.units};

                }, function () {
                    console.log("Canceled")
                });
            };
            function ScaleDialogController($scope, $mdDialog, scalebar_config) {
                $scope.scalebar_config = scalebar_config;
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    if (answer.width) {
                        $mdDialog.hide(answer);
                    }
                };
            }

            $scope.openNorthDialog = function ($event) {
                $mdDialog.show({
                    controller: NorthDialogController,
                    templateUrl: urlsHelper.static + "cartoview_geonode_viewer/angular-templates/north-dialog.tmpl.html",
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    locals: {
                        north_config: $scope.instanceObj.config.north_config
                    }
                }).then(function (answer) {
                    $scope.instanceObj.config.north_config = {autoHide: answer.autoHide};

                }, function () {
                    console.log("Canceled")
                });
            };
            function NorthDialogController($scope, $mdDialog, north_config) {
                $scope.north_config = north_config;
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {

                    $mdDialog.hide(answer);

                };
            }

            $scope.openOverviewDialog = function ($event) {
                $mdDialog.show({
                    controller: OverviewDialogController,
                    templateUrl: urlsHelper.static + "cartoview_geonode_viewer/angular-templates/overview-dialog.tmpl.html",
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    locals: {
                        overview_config: $scope.instanceObj.config.overview_config
                    }
                }).then(function (answer) {
                    $scope.instanceObj.config.overview_config = {collapsed: answer.collapsed};

                }, function () {
                    console.log("Canceled")
                });
            };
            function OverviewDialogController($scope, $mdDialog, overview_config) {
                $scope.overview_config = overview_config;
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {

                    $mdDialog.hide(answer);

                };
            }

            $scope.openZoomDialog = function ($event) {
                $mdDialog.show({
                    controller: ZoomDialogController,
                    templateUrl: urlsHelper.static + "cartoview_geonode_viewer/angular-templates/zoom-dialog.tmpl.html",
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    locals: {
                        zoom_config: $scope.instanceObj.config.zoom_config
                    }
                }).then(function (answer) {
                    $scope.instanceObj.config.zoom_config = answer;
                }, function () {
                    console.log("Canceled")
                });
            };
            function ZoomDialogController($scope, $mdDialog, zoom_config) {
                $scope.zoom_config = zoom_config;
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {

                    $mdDialog.hide(answer);

                };
            }

            $scope.openChartsDialog = function ($event) {
                $mdDialog.show({
                    controller: ChartsDialogController,
                    templateUrl: urlsHelper.static + "cartoview_geonode_viewer/angular-templates/charts-dialog.tmpl.html",
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    locals: {
                        parent: $scope
                    }
                }).then(function (answer) {
                    console.log(answer)
                    $scope.instanceObj.config.charts = answer;
                }, function () {
                    console.log("Canceled")
                });
            };
            function ChartsDialogController($scope, $mdDialog, parent, $http) {
                $scope.layers = layerNames;
                var featureTypes_objects = [];
                $http.get("/cartoview_proxy/geoserver/wfs?service=WFS&request=DescribeFeatureType&outputFormat=application/json")
                    .then(function (response) {
                        console.log(response.data.featureTypes);
                        featureTypes_objects = response.data.featureTypes;
                    });
                $scope.layer_nameChanged = function () {
                    if ($scope.layer_name !== undefined) {
                        var Categories = [];
                        for (var i = 0; i < featureTypes_objects.length; i++) {
                            if ($scope.layer_name.split(':')[1] == featureTypes_objects[i].typeName) {
                                for (var j = 0; j < featureTypes_objects[i].properties.length; j++) {
                                    if (featureTypes_objects[i].properties[j].type.split(':')[0] != "gml") {
                                        Categories.push(featureTypes_objects[i].properties[j].name)
                                    }
                                }
                                break
                            }
                        }
                        $scope.Categories = Categories;
                    }

                };
                $scope.selectedvalues = [];
                $scope.ValueFieldsChanged = function () {
                    console.log($scope)
                };
                $scope.charts = [];
                $scope.add = function () {
                    $scope.charts.push({
                        title: $scope.title,
                        categoryField: $scope.category_field,
                        layer: $scope.layer_name,
                        valueFields: $scope.selectedvalues,
                        displayMode: $scope.operation,
                        operation: $scope.displayMode
                    })
                };
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {

                    $mdDialog.hide(answer);

                };
            }

            $scope.openPlaybackDialog = function ($event) {
                $mdDialog.show({
                    controller: PlaybackDialogController,
                    templateUrl: urlsHelper.static + "cartoview_geonode_viewer/angular-templates/playback-dialog.tmpl.html",
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    locals: {
                        playback_config: $scope.instanceObj.config.playback_config
                    }
                }).then(function (answer) {
                    answer.maxDate = answer.maxDate.getTime();
                    answer.minDate = answer.minDate.getTime();
                    $scope.instanceObj.playback_config = answer;
                }, function () {
                    console.log("Canceled")
                });
            };
            function PlaybackDialogController($scope, $mdDialog, playback_config) {
                playback_config.maxDate = new Date(playback_config.maxDate);
                playback_config.minDate = new Date(playback_config.minDate);
                $scope.playback_config = playback_config;
                $scope.modeChanged = function () {

                };
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {

                    $mdDialog.hide(answer);

                };
            }


        }
    }
});
