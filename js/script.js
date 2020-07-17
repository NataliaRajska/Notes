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
        loadNotes,
        getNoteObject,
        onAddNoteBtnClick;


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

    getNoteObject = function (el) {
        const textarea = el.querySelector('textarea');
        return {
            //field:
            content: textarea.value,
            //key for localStorage
            id: el.id,
            //note position
            transformCSSValue: el.style.transform,
            //sizing style
            textarea: {
                width: textarea.style.width,
                height: textarea.style.height
            }
        };
    };
    //with parameter will be call in loadNotes without parameter will be call on click
    createNote = function (options) {
        const stickerEL = document.createElement('div'),
            barEl = document.createElement('div'),
            textareaEl = document.createElement('textarea'),
            saveBtnEl = document.createElement('button'),
            deleteBtnEl = document.createElement('button');
            let onSave, onDelete,
            BOUNDARIES = 400,
            noteConfig = options || {
            content: '',
            id:"sticker_" + new Date().getTime(),
            transformCSSValue: "translateX(" + Math.random() + BOUNDARIES + "px) translateY(" + Math.random() + BOUNDARIES + "px)"
        };

        onDelete = function () {
            deleteNote(getNoteObject(stickerEL));
            document.body.removeChild(stickerEL);
        };

        onSave = function () {
            saveNote(getNoteObject(stickerEL));
        };

        if (noteConfig.textarea) {
            textareaEl.style.width = noteConfig.style.width;
            textareaEl.style.height = noteConfig.style.height;
            //after saving you can't resizing note
            textareaEl.style.resize = 'none';
        }

        stickerEL.id = noteConfig.id;
        textareaEl.value = noteConfig.content;

        deleteBtnEl.addEventListener('click', onDelete);
        saveBtnEl.addEventListener('click', onSave);

        //for stylesheet
        saveBtnEl.classList.add('saveButton');
        deleteBtnEl.classList.add('deleteButton');

        stickerEL.transform = noteConfig.transformCSSValue;


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

    onAddNoteBtnClick =function(){
        createNote();
    };

    init = function () {
        if (!testLocalStorage()) {
            const message = "Sorry you can't use localStorage";
        } else {
            saveNote = function (note) {
                localStorage.setItem(note.id, JSON.stringify(note));
            };
            deleteNote = function (note) {
            localStorage.removeItem(note.id);
            };
            loadNotes = function () {
            for(let i=0; i< localStorage.length;i++){
                const noteObject = JSON.parse(localStorage.getItem(localStorage.key(i)));
                console.log(localStorage.key(i));
                createNote(noteObject);
            }
            };

        }

        addNoteBtnEL = document.querySelector('.addNoteBtn');
        addNoteBtnEL.addEventListener('click', onAddNoteBtnClick, false);

        document.addEventListener('mousemove', onDrag, false);
        document.addEventListener('mouseup', onDragEnd, false);
    };


    init();
    // createNote();
})();