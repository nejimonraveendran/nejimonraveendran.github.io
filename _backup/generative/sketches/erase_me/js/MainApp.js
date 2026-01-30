var _mainLayerCanvasId = 'mainLayer';
var _mainLayer;
//let _layer2: Layer2;
window.addEventListener('load', function () {
    _mainLayer = new MainLayer(_mainLayerCanvasId);
    //_layer2 = new Layer2('layer2');
});
window.addEventListener('resize', function () {
    _mainLayer = new MainLayer(_mainLayerCanvasId);
    //_layer2 = new Layer2('layer2');
});
//# sourceMappingURL=MainApp.js.map