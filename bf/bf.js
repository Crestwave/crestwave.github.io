var program;
var translation = {
    '>': '++ptr;',
    '<': '--ptr;',
    '+': 'tape[ptr] = (tape[ptr]||0)+1 & 255;',
    '-': 'tape[ptr] = (tape[ptr]||0)-1 & 255;',
    '.': 'output.innerHTML += (String.fromCharCode(tape[ptr]));',
    ',': 'if (input.length > 0) { tape[ptr] = input.charCodeAt(0); input = input.slice(1); } else if (document.getElementById("EOF").checked == true) { output.scrollTop = output.scrollHeight; throw new Error("EOF"); }',
    '[': 'while (tape[ptr]) {',
    ']': '}'
};

function compile() {
    program = document.getElementById("Program").value;
    program = program.replace(/[^><+\-.,[\]]/g, '');
    program = program.replace(/./g, m => translation[m]);
}

function execute() {
    var output = document.getElementById("output");
    var input = document.getElementById("Input").value;
    var tape = [];
    var ptr = 0;

    output.innerHTML = "Output<hr>";
    eval(program);
}

function run() {
    compile();
    execute();
}

function main() {
    document.getElementById("Compile").onclick = compile;
    document.getElementById("Execute").onclick = execute;
    document.getElementById("Run").onclick = run;
}
