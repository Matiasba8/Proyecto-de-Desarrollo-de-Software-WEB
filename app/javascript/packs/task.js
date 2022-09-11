// -***- Listas -***-


const fabric = require("fabric").fabric;
var id_counter = 0;
var ids_to_delete = [];
var objects = [];

var data_to_send = []
// Elimina un objecto por su id a objects
function removeObjectFromObjects(id){
    objects.some(function(object){
        if (id === object["id"]){
            objects.splice(objects.indexOf(object),1)
            return true;
        }
    })
}

// -***- Render Objects -***-



function AddRectangle(canvas) {

    id_counter += 1

    var rect = new fabric.Rect({
        id: id_counter,
        left: 90,
        top: 60,
        fill: '#999999',
        width: 180,
        height: 30,
        objectCaching: false,
        stroke: 'black',
        strokeWidth: 0,
    });

    objects.push({
        "id": id_counter,
        "width": 180,
        "height": 30,
        "canvas_type": "rect",
        "object_type": "bar",
        "force": 0,
        "angle": 0,
        "scaleX": 0, //Cambiar al valor default
        "scaleY": 0,
        "top": 100,
        "left": 50
    })

    canvas.add(rect);
    canvas.setActiveObject(rect);
    return rect;
}

function canvasGridSetUp(canvas){
    var grid = 30;
    for (var i = 0; i <= (1800 / grid); i++) {
        canvas.add(new fabric.Line([ i * grid, 0, i * grid, 810], { stroke: '#ccc', selectable: false }));
    }

    for (var i = 0; i <= (810 / grid); i++) {
        canvas.add(new fabric.Line([ 0, i * grid, 1800, i * grid], { stroke: '#ccc', selectable: false }));
    }

    canvas.on('object:moving', function(options) {
        options.target.set({
            left: Math.round(options.target.left / grid) * grid,
            top: Math.round(options.target.top / grid) * grid
        });
    });

    canvas.on('object:scaling', options => {
        var target = options.target,
            w = target.width * target.scaleX,
            h = target.height * target.scaleY,
            snap = { // Closest snapping points
                top: Math.round(target.top / grid) * grid,
                left: Math.round(target.left / grid) * grid,
                bottom: Math.round((target.top + h) / grid) * grid,
                right: Math.round((target.left + w) / grid) * grid
            },
            threshold = grid,
            dist = { // Distance from snapping points
                top: Math.abs(snap.top - target.top),
                left: Math.abs(snap.left - target.left),
                bottom: Math.abs(snap.bottom - target.top - h),
                right: Math.abs(snap.right - target.left - w)
            },
            attrs = {
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                top: target.top,
                left: target.left
            };
        switch (target.__corner) {
            case 'tl':
                if (dist.left < dist.top && dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.top = target.top + (h - target.height * attrs.scaleY);
                    attrs.left = snap.left;
                } else if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.left = attrs.left + (w - target.width * attrs.scaleX);
                    attrs.top = snap.top;
                }
                break;
            case 'mt':
                if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.top = snap.top;
                }
                break;
            case 'tr':
                if (dist.right < dist.top && dist.right < threshold) {
                    attrs.scaleX = (snap.right - target.left) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.top = target.top + (h - target.height * attrs.scaleY);
                } else if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.top = snap.top;
                }
                break;
            case 'ml':
                if (dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.left = snap.left;
                }
                break;
            case 'mr':
                if (dist.right < threshold) attrs.scaleX = (snap.right - target.left) / target.width;
                break;
            case 'bl':
                if (dist.left < dist.bottom && dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.left = snap.left;
                } else if (dist.bottom < threshold) {
                    attrs.scaleY = (snap.bottom - target.top) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.left = attrs.left + (w - target.width * attrs.scaleX);
                }
                break;
            case 'mb':
                if (dist.bottom < threshold) attrs.scaleY = (snap.bottom - target.top) / target.height;
                break;
            case 'br':
                if (dist.right < dist.bottom && dist.right < threshold) {
                    attrs.scaleX = (snap.right - target.left) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                } else if (dist.bottom < threshold) {
                    attrs.scaleY = (snap.bottom - target.top) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                }
                break;
        }
        target.set(attrs);
    });
}

function attachButtonsEvents(canvas){
    $('#addBar').on('click', function(){
        AddRectangle(canvas);
    });

    $('#addText').on('click', function(){

        id_counter += 1

        canvas.add(new fabric.IText('Tap and Type', {
            id: id_counter,
            fontFamily: 'arial black',
            left: 50,
            top: 100 ,
        }));
        objects.push({
            "id": id_counter,
            "width": 0,
            "height": 0,
            "canvas_type": "i-text",
            "object_type": "text",
            "force": 0,
            "angle": 0,
            "scaleX": 0, //Cambiar al valor default
            "scaleY": 0,
            "top": 100,
            "left": 50
        })
    });

    $('#open-vector-modal').on('click', function(){
        $('#exampleModal').modal("toggle")
    });

    $('#addApoyoFijo').on('click', function(){

        id_counter += 1

        fabric.Image.fromURL('https://www.pngmart.com/files/4/Triangle-PNG-Clipart.png', (img) => {
            img.set({
                "id": id_counter,
                scaleX: 1/4,
                scaleY: 1/4,
                top: 100,
                left: 50,
                angle: 0,
            });
            img.scaleToWidth(30);
            img.scaleToHeight(30);
            canvas.add(img)
        });

        objects.push({
            "id": id_counter,
            "width": 0,
            "height": 0,
            "canvas_type": "image",
            "object_type": "apoyo-fijo",
            "force": 0,
            "angle": 0,
            "scaleX": 1/4,
            "scaleY": 1/4,
            "top": 100,
            "left": 50
        })
    });

    $('#addApoyoDes').on('click', function(){

        id_counter += 1

        fabric.Image.fromURL('https://www.pngmart.com/files/4/Triangle-PNG-Clipart.png', (img) => {
            img.set({
                "id": id_counter,
                scaleX: 1/4,
                scaleY: 1/4,
                top: 100,
                left: 50,
                angle: 0,
            });
            img.scaleToWidth(30);
            img.scaleToHeight(30);
            canvas.add(img)
        });

        objects.push({
            "id": id_counter,
            "width": 0,
            "height": 0,
            "canvas_type": "image",
            "object_type": "apoyo-deslizante",
            "force": 0,
            "angle": 0,
            "scaleX": 1/4,
            "scaleY": 1/4,
            "top": 100,
            "left": 50
        })

    });

    $('#addEmpotramiento').on('click', function(){

        id_counter += 1

        fabric.Image.fromURL('https://www.pngmart.com/files/4/Triangle-PNG-Clipart.png', (img) => {
            img.set({
                "id": id_counter,
                scaleX: 1/4,
                scaleY: 1/4,
                top: 100,
                left: 50,
                angle: 0,
             });
            img.scaleToWidth(30);
            img.scaleToHeight(30);
            canvas.add(img)
        });

        objects.push({
            "id": id_counter,
            "canvas_type": "image",
            "width": 0,
            "height": 0,
            "object_type": "empotramiento",
            "force": 0,
            "angle": 0,
            "scaleX": 1/4,
            "scaleY": 1/4,
            "top": 100,
            "left": 50
        })

    });

    $('#guardar').on('click', function(){
        json = JSON.stringify(canvas);
        console.log(json)
        $.ajax({
            type: "POST",
            url: $('#save-task').val(),
            dataType: 'text',
            data: {canvas_stringify: json, id: $('#task-id').val()},
            success: function (data) {
                console.log(data);
            }
        });
        data_to_send.push(objects)
        data_to_send.push({task_id: $('#task-id').val()})
        $.ajax({
            type: "POST",
            url: "/save2",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data_to_send),
            success: function (data) {
                console.log(data);
            }
        });

    });
}

function setUpDeleteIcon(){

    function deleteObject(eventData, transform) {
        var target = transform.target;
        var canvas = target.canvas;

        console.log(`item removido id: ${target.id}`)

        removeObjectFromObjects(target.id)
        ids_to_delete.push(target.id);

        canvas.remove(target);
        canvas.requestRenderAll();
    }

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size/2, -size/2, size, size);
        ctx.restore();
    }

    var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    var img = document.createElement('img');
    img.src = deleteIcon;

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24
    });

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerStyle = 'circle';

    return img
}

//Object Modified Event
var onObjectModified = function(e) {
    console.log(e.target.id)

    alert(this.getActiveObject().id);
    objects.some(function(object){
        if (e.target.id === object["id"]){
            console.log(`Before: ${object["angle"]}`)
            object["angle"] = e.target.angle
            object["scaleX"] = e.target.scaleX
            object["scaleY"] = e.target.scaleY
            object["top"] = e.target.top
            object["left"] = e.target.left
            console.log(`after: ${object["angle"]}`)
        }
    })

};
//Object Removed Event
var onObjectRemoved = function (e){
};


$( document ).on('turbolinks:load', common_events)

function common_events(){

    console.log("Common events")

    //Load canvas from server
    $.ajax({
        type: "POST",
        url: $('#load-canvas').val(),
        dataType: 'json',
        data: {id: $('#task-id').val()},
        success: function (data) {
            console.log(`data: ${data}`)
            /*canvas.loadFromJSON(data, function(){
                canvas.renderAll();
                canvas.forEachObject(function(object){
                    if (object.type === "line"){
                        object.selectable = false
                    }
                });
            });*/
        }
    });

    //Load canvas from server
    $.ajax({
        type: "POST",
        url: "/load2",
        dataType: 'json',
        data: {id: $('#task-id').val()},
        success: function (data) {
            canvas.loadFromJSON(data, function(){
                canvas.renderAll();
                canvas.forEachObject(function(object){
                    if (object.type === "line"){
                        object.selectable = false
                    }
                });
            });
        }
    });

    console.log("It executes!");

    var canvas = this.__canvas = new fabric.Canvas('canvas');
    var json;



    canvas.on('object:removed', onObjectRemoved);
    canvas.on('object:modified', onObjectModified);

    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);

    canvasGridSetUp(canvas)

    // canvas.on('object:scaling', function(options) {
    //     options.target.set({
    //       left: Math.round(options.target.left / grid) * grid,
    //       top: Math.round(options.target.top / grid) * grid
    //     });
    // });

    var img = setUpDeleteIcon()
    attachButtonsEvents(canvas)

    // Al ingresar crear en el modal del vector se crea la imagen con los atributos correspondientes
    $('#create-vector').on("click", function () {
        var v_force = $('#vector-force').val();
        var v_angle = $('#vector-angle').val();

        id_counter += 1

        fabric.Image.fromURL('https://cdn-icons-png.flaticon.com/512/664/664866.png', (img) => {
            img.set({
                id: id_counter,
                scaleX: 1/4,
                scaleY: 1/4,
                top: 100,
                left: 50,

            });
            img.rotate(v_angle)
            canvas.add(img)

            console.log(`Img_id: ${img.id}`)
        });
        objects.push({
            "id": id_counter,
            "width": 0,
            "height": 0,
            "canvas_type": "image",
            "object_type": "vector",
            "force": v_force,
            "angle": v_angle,
            "scaleX": 1/4,
            "scaleY": 1/4,
            "top": 100,
            "left": 50
        })
        //Close modal
        $('#exampleModal').modal("toggle");
    })


    $('.close-vector-modal').on("click", function(){
        $('#exampleModal').modal("toggle");
    });

    console.log("test")
}

