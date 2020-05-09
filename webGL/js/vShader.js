var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    'uniform mat4 mWorld;',
    'uniform mat4 mView;',
    'uniform mat4 mProj;',
    '',
    'void main()',
    '{',
    '   fragColor = vertColor;',
//transformation happen in reverse order. wpr;d -> view -> proj
    '   gl_Position = mProj * mView * mWorld * vec4(vertPosition,  0.0,1.0);',
    '}'
].join('\n');
