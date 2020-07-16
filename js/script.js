
(function () {
'use strict';

    let draggedEl;
    let onDragStart;
    let onDrag;
    let onDragEnd;
    let grabPointX;
    let grabPointY;
    let createNote;


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
};

createNote = function (){
    const stickerEL = document.createElement('div'),
        barEl = document.createElement('div'),
        textareaEl = document.createElement('textarea');

    // name for class
    barEl.classList.add('bar');
    stickerEL.classList.add('sticker');

    stickerEL.appendChild(barEl);
    stickerEL.appendChild(textareaEl);

    stickerEL.addEventListener('mousedown', onDragStart, false);

    document.body.appendChild(stickerEL);
};

createNote();

    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);
})();