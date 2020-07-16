
(function () {
'use strict';

    let draggedEl;
    let onDragStart;
    let onDrag;
    let onDragEnd;
    let grabPointX;
    let grabPointY;


    onDragStart = function (ev) {
    let boundingClientRect;
    //move by bar
    if (ev.target.className.indexOf('bar') === -1){
        return;
    }

    draggedEl = this;

    boundingClientRect = draggedEl.getBoundingClientRect();

    grabPointX = boundingClientRect.left - ev.clientX;
    grabPointY = boundingClientRect.top - ev.clientY;
};

onDrag =function (event) {
    if (!draggedEl) {
        return;
    }

    let posX = event.clientX + grabPointX;
    let posY = event.clientY + grabPointY;

    //can't moves bound of left and up side
    if (posX < 0) {
        posX = 0;
    }
    if (posY < 0) {
        posY = 0;
    }

    draggedEl.style.transform = "translateX(" +posX + "px)translateY(" + posY + "px)";
};

onDragEnd = function (){
    draggedEl = null;
    grabPointY = null;
    grabPointX = null;
}
    document.addEventListener('mousemove', onDrag, false);
    document.querySelector('.sticker').addEventListener('mousedown', onDragStart, false);
    document.addEventListener('mouseup', onDragEnd, false);
})();