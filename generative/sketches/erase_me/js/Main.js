var _mainLayerCanvasId = 'mainLayer';
var _mainLayer;
window.addEventListener('load', function () {
    _mainLayer = new MainLayer(_mainLayerCanvasId);
    setupFileDialog();
});
window.addEventListener('resize', function () {
    cancelAnimationFrame(_mainLayer.animationId);
    _mainLayer = new MainLayer(_mainLayerCanvasId);
});
function setupFileDialog() {
    var fileDlg = document.getElementById("file");
    fileDlg.onchange = function (e) {
        var file = e.target.files[0];
        if (file === undefined || file == null)
            return;
        var reader = new FileReader();
        reader.onload = function (re) {
            _mainLayer.loadImageAndProcess(re.target.result);
        };
        reader.readAsDataURL(file);
    };
    var btnFile = document.getElementById("btnFile");
    btnFile.onclick = function () {
        fileDlg.click();
    };
}
//# sourceMappingURL=Main.js.map