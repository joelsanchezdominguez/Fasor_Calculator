// RETANGULAR CLASS
class Retangular {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }
}

// POLAR CLASS
class Polar {
    constructor(len, deg) {
        this.len = len;
        this.deg = deg;
    }
}

// CHANGE BASE
document.getElementById("base").addEventListener("change", (e) => {
    document.getElementById("retangular-container").style.display = "none";
    document.getElementById("polar-container").style.display = "none";
    if (e.target.value == 'retangular') {
        document.querySelectorAll(".polar").forEach(e => {
            e.style.display = "none";
        });
        document.querySelectorAll(".retangular").forEach(e => {
            e.style.display = "block";
        });
    }
    else {
        document.querySelectorAll(".retangular").forEach(e => {
            e.style.display = "none";
        });
        document.querySelectorAll(".polar").forEach(e => {
            e.style.display = "block";
        });
    }
});

// CONVERTIR
document.getElementById("convertir").onclick = () => {
    const base = document.getElementById("base");
    if (base.value == "retangular") {
        // REAL AND IMAGINARY
        const re = parseFloat(document.getElementById("c-rect-re").value);
        const im = parseFloat(document.getElementById("c-rect-im").value);
        // CONVERT
        let polar = conv(re, im, "retangular");
        // PRINT RESULTS
        printConv(re, im, polar.len, polar.deg, "polar");
    }
    else {
        // REAL AND IMAGINARY
        const len = parseFloat(document.getElementById("c-polar-len").value);
        const deg = parseFloat(document.getElementById("c-polar-deg").value);
        // CONVERT
        let ret = conv(len, deg, "polar");
        // PRINT RESULTS
        printConv(ret.re, ret.im, len, deg, "retangular");
    }
};

// CONVERSOR FUNCTION
function conv(n1, n2, base) {
    if (base == 'retangular') {
        let len = Math.sqrt(n1*n1 + n2*n2);
        let deg = Math.atan(n2/n1) * 180 / Math.PI;
        if (n1 > 0 && n2 > 0) deg = deg + 0;
        else if (n1 < 0 && n2 > 0) deg = deg + 90;
        else if (n1 < 0 && n2 < 0) deg = deg + 180;
        else if (n1 > 0 && n2 < 0) deg = deg + 270;
        let polar = new Polar(len, deg);
        return polar;
    }
    else {
        let re = n1 * Math.cos(n2 * Math.PI / 180);
        let im = n1 * Math.sin(n2 * Math.PI / 180);
        let ret = new Retangular(re, im);
        return ret;
    }
}

// PRINT CONVERSION
function printConv(re, im, len, deg, base) {
    const registro = document.getElementById("registro");
    if (base == "polar"){
        const result = document.createElement("div");
        result.innerHTML = `${re.toFixed(5)} + j${im.toFixed(5)} = ${len.toFixed(5)} &#60 ${deg.toFixed(0)} &#176`;
        registro.prepend(result);
    }
    else {
        const result = document.createElement("div");
        result.innerHTML = `${len.toFixed(5)} &#60 ${deg.toFixed(0)} &#176 = ${re.toFixed(5)} + j${im.toFixed(5)}`;
        registro.prepend(result);
    }
    
}


// CALCULATE
document.getElementById("calculate").onclick = () => {
    const base = document.getElementById("base");
    if (base.value == "retangular") {
        // NUMBER 1
        const n1_re = parseFloat(document.getElementById("n1-rect-re").value);
        const n1_im = parseFloat(document.getElementById("n1-rect-im").value);
        const n1 = new Retangular(n1_re, n1_im);
        // OPERATION
        const op = document.getElementById("op-rect");
        // NUMBER 2
        const n2_re = parseFloat(document.getElementById("n2-rect-re").value);
        const n2_im = parseFloat(document.getElementById("n2-rect-im").value);
        const n2 = new Retangular(n2_re, n2_im);
        // RESULT
        if (op.value == "plus") {
            const r_re = n1.re + n2.re;
            const r_im = n1.im + n2.im;
            const r = new Retangular(r_re, r_im);
            displayResults(n1, n2, r, "retangular", "plus");
        }
        else if (op.value == "minus") {
            const r_re = n1.re - n2.re;
            const r_im = n1.im - n2.im;
            const r = new Retangular(r_re, r_im);
            displayResults(n1, n2, r, "retangular", "minus");
        }
        else if (op.value == "multiplication") {
            const p1 = conv(n1.re, n1.im, "retangular");
            const p2 = conv(n2.re, n2.im, "retangular");
            const r_len = p1.len * p2.len;
            const r_deg = p1.deg + p2.deg;
            const r = conv(r_len, r_deg, "polar");
            displayResults(n1, n2, r, "retangular", "multiplication");
        }
        else if (op.value == "division") {
            const p1 = conv(n1.re, n1.im, "retangular");
            const p2 = conv(n2.re, n2.im, "retangular");
            const r_len = p1.len / p2.len;
            const r_deg = p1.deg - p2.deg;
            const r = conv(r_len, r_deg, "polar");
            displayResults(n1, n2, r, "retangular", "division");
        }
    }
    else {
        // NUMBER 1
        const n1_len = parseFloat(document.getElementById("n1-polar-len").value);
        const n1_deg = parseFloat(document.getElementById("n1-polar-deg").value);
        const n1 = new Polar(n1_len, n1_deg);
        // OPERATION
        const op = document.getElementById("op-polar");
        // NUMBER 2
        const n2_len = parseFloat(document.getElementById("n2-polar-len").value);
        const n2_deg = parseFloat(document.getElementById("n2-polar-deg").value);
        const n2 = new Polar(n2_len, n2_deg);
        // RESULT
        if (op.value == "plus") {
            const p1 = conv(n1.len, n1.deg, "polar");
            const p2 = conv(n2.len, n2.deg, "polar");
            const r_re = p1.re + p2.re;
            const r_im = p1.im + p2.im;
            const r = conv(r_re, r_im, "retangular");
            displayResults(n1, n2, r, "polar", "plus");
        }
        else if (op.value == "minus") {
            const p1 = conv(n1.len, n1.deg, "polar");
            const p2 = conv(n2.len, n2.deg, "polar");
            const r_re = p1.re - p2.re;
            const r_im = p1.im - p2.im;
            const r = conv(r_re, r_im, "retangular");
            displayResults(n1, n2, r, "polar", "minus");
        }
        else if (op.value == "multiplication") {
            const r_len = n1.len * n2.len;
            const r_deg = n1.deg + n2.deg;
            const r = new Polar(r_len, r_deg);
            displayResults(n1, n2, r, "polar", "multiplication");
        }
        else if (op.value == "division") {
            const r_len = n1.len / n2.len;
            const r_deg = n1.deg - n2.deg;
            const r = new Polar(r_len, r_deg);
            displayResults(n1, n2, r, "polar", "division");
        }
    }
};

// DISPLAY RESULTS FUNCTION
function displayResults(n1, n2, r, base, op) {
    const registro = document.getElementById("registro");
    if (base == "retangular") {
        const result = document.createElement("div");
        if (op == "plus"){
            result.innerHTML = `(${n1.re.toFixed(5)} + j${n1.im.toFixed(5)}) &#43 (${n2.re.toFixed(5)} + j${n2.im.toFixed(5)}) = ${r.re.toFixed(5)} + j${r.im.toFixed(5)}`;
        }
        else if (op == "minus"){
            result.innerHTML = `(${n1.re.toFixed(5)} + j${n1.im.toFixed(5)}) &#45 (${n2.re.toFixed(5)} + j${n2.im.toFixed(5)}) = ${r.re.toFixed(5)} + j${r.im.toFixed(5)}`;
        }
        else if (op == "multiplication"){
            result.innerHTML = `(${n1.re.toFixed(5)} + j${n1.im.toFixed(5)}) &#42 (${n2.re.toFixed(5)} + j${n2.im.toFixed(5)}) = ${r.re.toFixed(5)} + j${r.im.toFixed(5)}`;
        }
        else if (op == "division"){
            result.innerHTML = `(${n1.re.toFixed(5)} + j${n1.im.toFixed(5)}) &#47 (${n2.re.toFixed(5)} + j${n2.im.toFixed(5)}) = ${r.re.toFixed(5)} + j${r.im.toFixed(5)}`;
        }
        registro.prepend(result);
    }
    else {
        const result = document.createElement("div");
        if (op == "plus"){
            result.innerHTML = `(${n1.len.toFixed(5)} &#60 ${n1.deg.toFixed(0)})&#176 &#43 (${n2.len.toFixed(5)} &#60 ${n2.deg.toFixed(0)}&#176) = ${r.len.toFixed(5)} &#60 ${r.deg.toFixed(0)}&#176`;
        }
        else if (op == "minus"){
            result.innerHTML = `(${n1.len.toFixed(5)} &#60 ${n1.deg.toFixed(0)})&#176 &#45 (${n2.len.toFixed(5)} &#60 ${n2.deg.toFixed(0)}&#176) = ${r.len.toFixed(5)} &#60 ${r.deg.toFixed(0)}&#176`;
        }
        else if (op == "multiplication"){
            result.innerHTML = `(${n1.len.toFixed(5)} &#60 ${n1.deg.toFixed(0)})&#176 &#42 (${n2.len.toFixed(5)} &#60 ${n2.deg.toFixed(0)}&#176) = ${r.len.toFixed(5)} &#60 ${r.deg.toFixed(0)}&#176`;
        }
        else if (op == "division"){
            result.innerHTML = `(${n1.len.toFixed(5)} &#60 ${n1.deg.toFixed(0)})&#176 &#47 (${n2.len.toFixed(5)} &#60 ${n2.deg.toFixed(0)}&#176) = ${r.len.toFixed(5)} &#60 ${r.deg.toFixed(0)}&#176`;
        }
        registro.prepend(result);
    }
}

// CLEAN REGISTRY
document.getElementById("limpar").onclick = () => {
    document.getElementById("registro").innerHTML = "";
};