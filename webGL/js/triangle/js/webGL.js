var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    '   fragColor = vertColor;',
    '   gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');

var fragmentShaderText = [
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
//    '   gl_FragColor = vec4(1.0,0.0,0.0,1.0);',
    '   gl_FragColor = vec4(fragColor,1.0);',
    '}'
].join('\n');


let initDemo = function () {
    let canvas = document.getElementById('game-surface');
    let gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('no webGL');
        gl = canvas.getContect('expermental-webgl');
    }

    if (!gl) {
        console.log('no support');
    }

    //    canvas.width = window.innerWidth;
    //    canvas.height = window.innerHeight;
    //    gl.viewport(0,0,window.innerWidth,window.innerHeight);
    //    
    //    

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertexShader!', gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragmentShader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR LINK-program!', gl.getProgramInfoLog(program));
        return;
    }

    //expensive testing check::
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('Error Validating', gl.getProgramInfoLog(program));
        return;
    }

    // END PIPE LINE FOUNDATION-=-=-=-=-=

    //DO STUFF WITH IT:: TRIANGLE::

    var triangleVertices = [
        //x,y
        0.0, 0.5, 1.0,0.0,0.0,
        -0.5, -0.5,0.0,1.0,0.0,
        0.5, -0.5,0.0,0.0,1.0
        ];


    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);


    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);


    //targets line in shader rather than using string indexes that could shift::
    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

    gl.vertexAttribPointer(
    positionAttribLocation, // Attribute Location
        2, // num of elements per attrib
        gl.FLOAT, // type
        gl.FALSE, //normalized?
        5* Float32Array.BYTES_PER_ELEMENT,// Size of individual vert
        0// Offest from being 
    );
    
    gl.vertexAttribPointer(
    colorAttribLocation, // Attribute Location
        3, // num of elements per attrib
        gl.FLOAT, // type
        gl.FALSE, //normalized?
        5* Float32Array.BYTES_PER_ELEMENT,// Size of individual vert
        2* Float32Array.BYTES_PER_ELEMENT,// Size of individual vert
    );
    
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}


//
//function vertexShader(vertPosition, vertColor){
//    return {
//        
//    }
//}
