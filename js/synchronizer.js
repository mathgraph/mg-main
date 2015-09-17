define([], function () {
    function logger(m, v, a) {
        console.log('=====model=====');
        console.log(m.point1.x, m.point1.y, m.point2.x, m.point2.y);
        console.log('=====view=====');
        console.log(v.from.x, v.from.y, v.to.x, v.to.y);
        console.log('=====additional=====');
        console.log(a.fields[0].value, a.fields[1].value);
    }
    return function (arrowModel, arrowView, additional) {
        additional.fields[0].change = function (v) {
            console.log(v);
            //arrowModel.point2.x = v;
        };
        additional.fields[1].change = function (v) {
            //arrowModel.point2.y = v;
        };

        function updateModel() {
            arrowModel.point1.x = arrowView.from.x;
            arrowModel.point1.y = arrowView.from.y;
            arrowModel.point2.x = arrowView.to.x;
            arrowModel.point2.y = arrowView.to.y;
            updateAdditional();
            logger(arrowModel, arrowView, additional);
        }
        function updateView() {
            arrowView.from.x = arrowModel.point1.x;
            arrowView.from.y = arrowModel.point1.y;
            arrowView.to.x = arrowModel.point2.x;
            arrowView.to.y = arrowModel.point2.y;
            updateAdditional();
            logger(arrowModel, arrowView, additional);
            requestAnimationFrame(updateView);
        }
        function updateAdditional() {
            additional.fields[0].value = arrowModel.point2.x;
            additional.fields[1].value = arrowModel.point2.y;
        }
        updateView();
    }
});