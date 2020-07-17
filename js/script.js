(function () {
    'use strict';

    let draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointX,
        grabPointY,
        createNote,
        addNoteBtnEL,
        init,
        testLocalStorage,
        saveNote,
        deleteNote,
        loadNotes;


    onDragStart = function (ev) {
        let boundingClientRect;
        //move by bar
        if (ev.target.className.indexOf('bar') === -1) {
            return;
        }

        draggedEl = this;

        boundingClientRect = draggedEl.getBoundingClientRect();

        grabPointX = boundingClientRect.left - ev.clientX;
        grabPointY = boundingClientRect.top - ev.clientY;
    };

    onDrag = function (event) {
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

        draggedEl.style.transform = "translateX(" + posX + "px)translateY(" + posY + "px)";
    };

    onDragEnd = function () {
        draggedEl = null;
        grabPointY = null;
        grabPointX = null;
    };

    createNote = function () {
        const stickerEL = document.createElement('div'),
            barEl = document.createElement('div'),
            textareaEl = document.createElement('textarea'),
            saveBtnEl = document.createElement('button'),
            deleteBtnEl = document.createElement('button');
        let onSave, onDelete;

        onDelete = function(){
            const obj = {};
            deleteNote(obj);
        };

        onSave= function(){
            const obj = {};
            saveNote(obj);
        };

        deleteBtnEl.addEventListener('click', onDelete);
        saveBtnEl.addEventListener('click', onSave);

        //for stylesheet
        saveBtnEl.classList.add('saveButton');
        deleteBtnEl.classList.add('deleteButton');


        stickerEL.transform = "translateX(" + Math.random() + 400 + "px) translateY(" + Math.random() + 400 + "px)";


        // name for class
        barEl.classList.add('bar');
        stickerEL.classList.add('sticker');

        barEl.appendChild(saveBtnEl);
        barEl.appendChild(deleteBtnEl);

        stickerEL.appendChild(barEl);
        stickerEL.appendChild(textareaEl);

        stickerEL.addEventListener('mousedown', onDragStart, false);

        document.body.appendChild(stickerEL);
    };

    testLocalStorage = function () {
        const foo = 'foo';
        try {
            localStorage.setItem(foo, foo);
            localStorage.removeItem(foo);
            return true;
        } catch (e) {
            return false;
        }
    };

    init = function () {
        if (!testLocalStorage()) {
            const message = "Sorry you can't use localStorage";
        } else {
            saveNote = function (note) {
                //Here we save note
            };
            deleteNote = function () {
                //Here we delete note
            };
            loadNotes = function () {
                //Here we delete note
            };

        }

        addNoteBtnEL = document.querySelector('.addNoteBtn');
        addNoteBtnEL.addEventListener('click', createNote, false);

        document.addEventListener('mousemove', onDrag, false);
        document.addEventListener('mouseup', onDragEnd, false);
    };


    init();
    // createNote();
})();