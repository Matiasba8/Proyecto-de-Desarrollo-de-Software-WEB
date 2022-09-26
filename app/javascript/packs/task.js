// -***- Listas -***-


var abcdario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]
var wrongTries = 0;

const fabric = require("fabric").fabric;

// -***- Render Objects -***-

function loadCanvas(canvas) {
    //Load canvas
    $.ajax({
        type: "POST",
        url: $('#load-canvas').val(),
        dataType: 'json',
        data: {id: $('#task-copy-select').val()},
        success: function(data){
            canvas.loadFromJSON(data, function(){
                canvas.renderAll();
                canvas.forEachObject(function(object){
                    if (object.type == "line"){
                        object.selectable = false
                    }
                    else if (object.object_type == "apoyo-fijo"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }
                    else if (object.object_type == "apoyo-deslizante"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    } else if (object.object_type == "empotramiento"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }else if (object.object_type == "fuerza"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }else if (object.object_type == "momentum"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }else if (object.object_type == "circle"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }
                })
            })
            solver(canvas)
        }
    })
}

function renderRectangle(canvas, left, top, width, height, angle, scaleX, scaleY) {
    var rect = new fabric.Rect({
        object_type: "bar",
        left: left,//90,
        top: top,//60,
        fill: '#999999',
        width: width,//180,
        height: height,//30,
        objectCaching: false,
        stroke: 'black',
        strokeWidth: 0,
        angle: angle,
        scaleX: scaleX,
        scaleY: scaleY
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    return rect;
}

function renderText(canvas, left, top, width, height, angle, scaleX, scaleY) {
    canvas.add(new fabric.IText('Tap and Type', {
        fontFamily: 'arial black',
        fontSize: 12,
        object_type: "text",
        left: left,//50,
        top: top,//100 ,
        width: width,
        height: height,
        angle: angle,
        scaleX: scaleX,
        scaleY: scaleY,
    }));
}

function renderCircle(canvas, left, top, width, height, angle, scaleX, scaleY){
    var circle = new fabric.Circle({
        top: 30,
        left: 30,
        object_type: "circle",
        radius: 15,
        fill: "red",
        stroke: "red",
        strokeWidth: 3
    });

    circle.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        bl: false,
        br: false,
        tl: false,
        tr: false,
        mtr: false,
    });

    canvas.add(circle)
}

function renderVector(canvas, left, top, width, height, angle, scaleX, scaleY, force) {
    fabric.Image.fromURL('https://cdn-icons-png.flaticon.com/512/664/664866.png', (img) => {
        img.set({
            object_type: "vector",
            force: force,

            scaleX: scaleX,//1/4,
            scaleY: scaleY,//1/4,
            top: top,//100,
            left: left,//50,
            
        });
        img.rotate(angle)
        canvas.add(img)

        console.log(`Img_id: ${img.id}`)
    });
}

function renderApoyoFijo(canvas, scaleX, scaleY, top, left, angle ){

    fabric.Image.fromURL('https://svgshare.com/i/mt6.svg', (img) => {
        img.set({
            object_type: "apoyo-fijo",
            scaleX: scaleX,
            scaleY: scaleY,
            top: top,
            left: left,
            angle: angle,
        });
        img.scaleToWidth(60);
        //img.scaleToHeight(60);

        img.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mtr: false,
        });
        canvas.add(img)

    });
}

function renderApoyoDes(canvas, scaleX, scaleY, top, left, angle ){
    fabric.Image.fromURL('https://svgshare.com/i/msx.svg', (img) => {
        img.set({
            object_type: "apoyo-deslizante",
            scaleX: scaleX,
            scaleY: scaleY,
            top: top,
            left: left,
            angle: angle,
        });
        img.scaleToWidth(60);
        //img.scaleToHeight(60);

        img.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mtr: false,
        });

        canvas.add(img)
    });
}

function renderEmpotramiento(canvas, scaleX, scaleY, top, left, angle ){
    fabric.Image.fromURL('https://svgshare.com/i/mtd.svg', (img) => {
        img.set({
            object_type: "empotramiento",
            scaleX: scaleX,
            scaleY: scaleY,
            top: top,
            left: left,
            angle: angle,
        });

        img.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mtr: false,
        });

       /* img.scaleToWidth(60);
        img.scaleToHeight(60);*/
        canvas.add(img)
    });
}

function renderMomentum(canvas, scaleX, scaleY, top, left, angle, m_force) {
    fabric.Image.fromURL('https://cdn-icons-png.flaticon.com/512/7235/7235860.png', (img) => {
        img.set({
            force: m_force,
            object_type: "momentum",
            scaleX: scaleX,
            scaleY: scaleY,
            top: top,
            left: left,
            angle: angle,
        });

        img.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mtr: false,
        });

        img.scaleToWidth(30);
        img.scaleToHeight(30);
        canvas.add(img)
    });
}

// -***-----------------------------------***-----

// -***---------Ecuación de equilibrio---------***-----

function descomponerFuerzas(canvas, vectors, apoyos, bar) {
    var sum_fx = ""
    var sum_fy = ""

    vectors.some(function(val, index){
        console.log(`Force: ${val.force} * cos(${val.angle}`)

        if ((val.top == (bar.top) || val.top == (bar.top + 30)) && (val.left >= (bar.left)) && ((val.left) <= (bar.left + (bar.width*bar.scaleX)))){
            if (vectors.length === index + 1){
                if (apoyos.length >= 1){
                    if (apoyos[0].object_type == "apoyo-deslizante"){
                        sum_fx = sum_fx + `${val.force}*cos(${val.angle})`
                        sum_fy = sum_fy + `${val.force}*sin(${val.angle}) + `
                    }
                    else{
                        sum_fx = sum_fx + `${val.force}*cos(${val.angle}) + `
                        sum_fy = sum_fy + `${val.force}*sin(${val.angle}) + `
                    }
                }
                else{
                    sum_fx = sum_fx + `${val.force}*cos(${val.angle})`
                    sum_fy = sum_fy + `${val.force}*sin(${val.angle})`
                }
    
            }else{
                sum_fx = sum_fx + `${val.force}*cos(${val.angle}) + `
                sum_fy = sum_fy + `${val.force}*sin(${val.angle}) + `
            }
        }
    })

    apoyos.some(function(val, index){
        if (val.top == (bar.top+30) && (val.left >= (bar.left-30)) && ((val.left + 30) <= (bar.left + (bar.width*bar.scaleX))) && val.object_type != "empotramiento"){
            if (apoyos.length === index + 1){
                if (val.object_type == "apoyo-fijo"){
                    console.log("Apoyo fijo")
                    sum_fx = sum_fx + abcdario[index] + "x"
                    sum_fy = sum_fy + abcdario[index] + "y"
                }
                else if (val.object_type == "apoyo-deslizante"){
                    sum_fy = sum_fy + abcdario[index] + "y"
                }
            }
            else{
                if (val.object_type == "apoyo-fijo"){
                    if (apoyos[index+1].object_type == "apoyo-deslizante"){
                        sum_fx = sum_fx + abcdario[index] + "x"
                        sum_fy = sum_fy + abcdario[index] + "y + "
                    }
                    else{
                        sum_fx = sum_fx + abcdario[index] + "x + "
                        sum_fy = sum_fy + abcdario[index] + "y + "
                    }
                }
                else if (val.object_type == "apoyo-deslizante"){
                    sum_fy = sum_fy + abcdario[index] + "y + "
                }
            }
        }
        else{
            if (val.object_type == "empotramiento"){
                if (val.top == (bar.top) && (val.left == (bar.left))){
                    if (apoyos.length === index + 1){
                        sum_fx = sum_fx + abcdario[index] + "x"
                        sum_fy = sum_fy + abcdario[index] + "y"
                    }
                    else{
                        sum_fx = sum_fx + abcdario[index] + "x + "
                        sum_fy = sum_fy + abcdario[index] + "y + "
                    }
                }
            }
        }
    })

    return [sum_fx, sum_fy]
}

function solver(canvas) {
    var bar;
    var vectors = [];
    var apoyos = [];
    var solve_target;


    var bar_width
    var sum_fx;
    var sum_fy;
    canvas.forEachObject(function(object){
        if (object.type != "line"){
            if (object.object_type == "bar"){
                bar = object
            }
            else if (object.object_type == "fuerza"){
                vectors.push(object)
            }
            else if (object.object_type == "circle"){
                solve_target = object
            }
            else if (object.object_type == "apoyo-fijo"){
                apoyos.push(object)
            }
            else if (object.object_type == "apoyo-deslizante"){
                apoyos.push(object)
            }
            else if (object.object_type == "empotramiento"){
                apoyos.push(object)
            }

        }
    })

    var fx_container = $('#fx-container');
    var fy_container = $('#fy-container');


    if (bar != null){
        bar_width  = Math.round(bar.width*bar.scaleX/30)

        var result = descomponerFuerzas(canvas, vectors, apoyos, bar)
        sum_fx = result[0]
        sum_fy = result[1]

        console.log(`sum_fx: ${sum_fx}`)
        console.log(`sum_fy: ${sum_fy}`)


        fx_container.html("ΣFx = " + sum_fx);
        fy_container.html("ΣFy = " + sum_fy);

        console.log(`Bar: type: ${bar.object_type} top: ${bar.top} left: ${bar.left}`)
        console.log(`bar_width: ${bar_width}`)
    }
}

function get_difficulty(canvas){
    // X: CANTIDAD DE PASOS
    // Y: BARRAS
    // Z: CANTIDAD DE FUERZAS
    // (X + 1)**(Y + Z)

    var difficulty = 0;
    var x = $('#start-stage').val().length >0 ? 4 - parseInt($('#start-stage').val(), 10) : 4 - parseInt($('#start-stage').attr('placeholder'), 10); // pesca el valor del input, si es que es nulo, toma el del placeholder
    var y = 0;
    var z = 0;

    canvas.forEachObject(function(object){
        if (object.object_type == "bar"){
            y += 1
        }
        else if (object.object_type == "fuerza"){
            z += 1
        }
    });

    console.log(`x: ${4 - x}`)
    console.log(`y: ${y}`)
    console.log(`z: ${z}`)

    console.log(`difficulty: ${(x)*(y + z)}`)
    $('#difficulty-container').html(x*(y + z))
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
    $('#submit-answers').on('click', function (){
        solver(canvas);
        var realAnswerX = document.getElementById('fx-container').textContent;
        var realAnswerY = document.getElementById('fy-container').textContent;
        var answerPutX = document.getElementById('task-answerX').value;
        var answerPutY = document.getElementById('task-answerY').value;

        var solArray0X = realAnswerX.split("=")
        var solArrayX = solArray0X[1].split("+")
        solArrayX.some(function(val, index){
            var item = val.replace(/\s+/g, '');
            solArrayX[index] = item;
        });
        
        var ansArrayX = answerPutX.split("+")
        ansArrayX.some(function(val, index){
            var item = val.replace(/\s+/g, '');
            ansArrayX[index] = item;
        });

        var solArray0Y = realAnswerY.split("=")
        var solArrayY = solArray0Y[1].split("+")
        solArrayY.some(function(val, index){
            var item = val.replace(/\s+/g, '');
            solArrayY[index] = item;
        });
        
        var ansArrayY = answerPutY.split("+")
        ansArrayY.some(function(val, index){
            var item = val.replace(/\s+/g, '');
            ansArrayY[index] = item;
        });
        
        var wrongAnswers = 0;
        ansArrayX.some(function(val, index){
            var result = solArrayX.indexOf(val)
            if (result > -1){
                solArrayX.splice(result, 1);
            }
            else{
                wrongAnswers = wrongAnswers + 1;
            }
        })
        ansArrayY.some(function(val, index){
            var result = solArrayY.indexOf(val)
            if (result > -1){
                solArrayY.splice(result, 1);
            }
            else{
                wrongAnswers = wrongAnswers + 1;
            }
        })

        if (wrongAnswers <= 0 && solArrayX.length <= 0 && solArrayY.length <= 0){
            console.log("CORRECT ANSWER");

            var barras = 0;
            var vinculos = 0;
            var fuerzas = 0;

            canvas.forEachObject(function(object){
                if (object.object_type == "bar"){
                    barras = barras + 1;
                }
                else if (object.object_type == "apoyo-fijo" || object.object_type == "apoyo-deslizante" || object.object_type == "empotramiento"){
                    vinculos = vinculos + 1;
                }
                else if (object.object_type == "fuerza"){
                    fuerzas = fuerzas + 1;
                }
            });
            
            var barrasStr = "+ " + barras;
            var vinculosStr = "+ " + vinculos;
            var fuerzasStr = "+ " + fuerzas;

            $.ajax({
                type: "POST",
                url: "/upload_results",
                data: {barras: barras, vinculos: vinculos, fuerzas: fuerzas},
            })

            $('#mBarra').html(barrasStr);
            $('#mFuerza').html(fuerzasStr);
            $('#mMomentum').html("+ 0");
            $('#mVinculos').html(vinculosStr);
            $('#resultModalLabel').html("Resultado: CORRECTO!");
            $('#modalResult').modal("toggle");
        }
        else{
            console.log("INCORRECT ANSWER");
            $('#mBarra').html("+ 0");
            $('#mFuerza').html("+ 0");
            $('#mMomentum').html("+ 0");
            $('#mVinculos').html("+ 0");
            $('#resultModalLabel').html("Resultado: INCORRECTO!");
            $('#modalResult').modal("toggle");
            wrongTries = wrongTries + 1;
        }
    });

    $('#copy-task-btn').on('click', function (){
        loadCanvas(canvas);
    });

    $('#addCircle').on('click', function(){
        renderCircle(canvas,0, 0, 90, 90, 0, 0, 0);
    });

    $('#addBar').on('click', function(){
        renderRectangle(canvas, 90, 60, 180, 30, 0, 1, 1);
    });

    $('#addText').on('click', function(){
        renderText(canvas,50, 100, 0, 0, 0, 1, 1);
    });

    $('#open-vector-modal').on('click', function(){
        $('#exampleModal').modal("toggle")
    });

    $('#addApoyoFijo').on('click', function(){
        renderApoyoFijo(canvas, 1/4, 1/4, 100, 50, 0);
    });

    $('#addApoyoDes').on('click', function(){
        renderApoyoDes(canvas, 1/4, 1/4, 130, 90, 0);
    });

    $('#addEmpotramiento').on('click', function(){
        renderEmpotramiento(canvas, 1/4, 1/4, 100, 50, 90);
    });

    $('#addMomentum').on('click', function () {
        $('#exampleModalMomentum').modal("toggle")
    });

    $('#guardar').on('click', function(){
        var json = JSON.stringify(canvas.toJSON(['force', 'object_type']));
        console.log(json);
        $.ajax({
            type: "POST",
            url: $('#save-task').val(),
            dataType: 'text',
            data: {canvas_stringify: json, id: $('#task-id').val(), task_name: $('#task-name').val(), instructions: $('#instructions').val(), start_stage: $('#start-stage').val()},
            success: function (data) {
                console.log(data);
            }
        });
    });

    $('#create-momentum').on('click', function(){
       var m_force = $('#momentum-force').val();

       renderMomentum(canvas, 1/4, 1/4, 100, 50, 0, m_force);
    });

    // Al ingresar crear en el modal del vector se crea la imagen con los atributos correspondientes
    $('#create-vector').on("click", function () {
        var v_force = $('#vector-force').val();
        var v_angle = $('#vector-angle').val();


        var circle = new fabric.Circle({
            top: 30,
            left: 30,
            force: v_force,
            angle: v_angle,
            object_type: "fuerza",
            radius: 5,
            fill: "brown",
            stroke: "brown",
            strokeWidth: 2
        });

        circle.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mtr: false,
        });

        canvas.add(circle)

        /*fabric.Image.fromURL('https://cdn-icons-png.flaticon.com/512/664/664866.png', (img) => {
            img.set({
                scaleX: 0.1171875,
                scaleY: 0.1171875,
                top: 100,
                left: 50,

            });
            img['force'] = v_force;
            img.rotate(v_angle)
            canvas.add(img)

            console.log(`Img_id: ${img.id}`)
        });*/
        //Close modal
        $('#exampleModal').modal("toggle");
    })


    $('.close-vector-modal').on("click", function(){
        $('#exampleModal').modal("toggle");
    });
    
    $('.closeResultModal').on("click", function(){
        $('#modalResult').modal("toggle");
    });
}

function setUpDeleteIcon(){

    function deleteObject(eventData, transform) {
        var target = transform.target;
        var canvas = target.canvas;

        //console.log(`item removido id: ${target.id}`)

        //removeObjectFromObjects(target.id)
        //ids_to_delete.push(target.id);

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

$( document ).on('turbolinks:load', common_events)

function common_events(){


    console.log("Common events")

    //Load canvas
    $.ajax({
        type: "POST",
        url: $('#load-canvas').val(),
        dataType: 'json',
        data: {id: $('#task-id').val()},
        success: function(data){
            canvas.loadFromJSON(data, function(){
                canvas.renderAll();
                canvas.forEachObject(function(object){
                    if ($('#rol').val() == 'Estudiante'){
                        object.selectable = false;
                    }
                    if (object.type == "line"){
                        object.selectable = false
                    }
                    else if (object.object_type == "apoyo-fijo"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }
                    else if (object.object_type == "apoyo-deslizante"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    } else if (object.object_type == "empotramiento"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }else if (object.object_type == "fuerza"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }else if (object.object_type == "momentum"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }else if (object.object_type == "circle"){
                        object.setControlsVisibility({
                            mt: false,
                            mb: false,
                            ml: false,
                            mr: false,
                            bl: false,
                            br: false,
                            tl: false,
                            tr: false,
                            mtr: false,
                        });
                    }
                })
            })
            solver(canvas)
        }
    })


    var canvas = this.__canvas = new fabric.Canvas('canvas');
    var json;

    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);

    canvasGridSetUp(canvas)

    var img = setUpDeleteIcon()
    attachButtonsEvents(canvas)

    canvas.on('object:modified', function(e){
        solver(canvas)
        get_difficulty(canvas);
        console.log("ON Modified!");
    })

    canvas.on('object:removed', function(e){
        solver(canvas)
        console.log("ON removed!");
    })


    canvas.on('mouse:down', function(event) {
        var pointer = canvas.getPointer(event.e);
        var posX = Math.round(pointer.x/30)*30;
        var posY = Math.round(pointer.y/30)*30;
        console.log(posX+", "+posY);    // Log to console
    });



    $.ajax({
        url: '/get_task_info',
        type: 'POST',
        dataType: 'script',
        data: {id: $('#task-id').val()}
    });

}