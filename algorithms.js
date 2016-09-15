"use strict";

function XCase() {
    this.i0 = 0, this.d = [ this ], G(this);
}

function G(a) {}

function F(b, a) {
    return E(b, a);
}

function E(q, o) {
    var label = 0, i = o.length, a = (i >> 0) + 1 >> 0;
    if (!(i >> 0 > 0)) {
        var g = o;
        return g;
    }
    for (var g = aSlot = [ 0 ], h = 0, a = 0; ;) {
        var b = o.charCodeAt(a >> 0);
        g[(h >> 0) + (a >> 0) >> 0] = 65535 & b & 65535;
        var a = (a >> 0) + 1 >> 0;
        if (!(a >> 0 < i >> 0)) break;
    }
    var a = 65535 & g[h >> 0 >> 0];
    if (45 === (65535 & a) || ((a >> 0) + -48 & 65535 & 65535) < 10) {
        var g = o;
        return g;
    }
    var e = aSlot = [ 0 ], f = 0;
    if (i >> 0 === 0) {
        e[f >> 0 >> 0] = 0;
        var g = o;
        return g;
    }
    var c = 0, k = 0, b = 0;
    L39: for (;;) {
        do {
            if (95 !== (65535 & a) && 45 !== (65535 & a) && 32 !== (65535 & a)) {
                if (b >> 0 === 0 && ((a >> 0) + -65 & 65535 & 65535) < 26) {
                    e[(f >> 0) + (c >> 0) >> 0] = (a >> 0) + 32 & 65535 & 65535;
                    var b = 0, k = 1;
                    break;
                }
                e[(f >> 0) + (c >> 0) >> 0] = 65535 & a;
                break;
            }
            var b = (b >> 0) + 1 >> 0, a = 65535 & g[(h >> 0) + (b >> 0) >> 0];
            if (0 === (65535 & a)) {
                label = 17;
                break L39;
            }
            e[(f >> 0) + (c >> 0) >> 0] = 65535 & (((a >> 0) + -97 & 65535 & 65535) < 26 ? (a >> 0) + -32 & 65535 : a);
            var k = 1;
        } while (0);
        var c = (c >> 0) + 1 >> 0, b = (b >> 0) + 1 >> 0;
        if (!(b >>> 0 < i >>> 0)) break;
        var a = 65535 & g[(h >> 0) + (b >> 0) >> 0];
    }
    if (17 === label) {
        var g = o;
        return g;
    }
    if (e[(f >> 0) + (c >> 0) >> 0] = 0, 0 === (1 & k & 255)) {
        var g = o;
        return g;
    }
    var g = p(e, f >> 0);
    return g;
}

function C(b, e, c) {
    var a = c.length;
    if (a >> 0 === 0) var a = 95; else var a = c.charCodeAt(0);
    return B(b, e, a >> 0);
}

function B(H, s, r) {
    var c = s.length, a = (c >> 0) + 1 >> 0;
    if (!(c >> 0 > 0)) {
        var i = s;
        return i;
    }
    for (var i = aSlot = [ 0 ], j = 0, a = 0; ;) {
        var g = s.charCodeAt(a >> 0);
        i[(j >> 0) + (a >> 0) >> 0] = 65535 & g & 65535;
        var a = (a >> 0) + 1 >> 0;
        if (!(a >> 0 < c >> 0)) break;
    }
    var a = 65535 & i[j >> 0 >> 0], q = 65535 & r;
    if (!(((a >> 0) + -97 & 65535 & 65535) < 26)) {
        var i = s;
        return i;
    }
    var e = aSlot = [ 0 ], f = 0;
    if (c >> 0 === 0) {
        e[f >> 0 >> 0] = 0;
        var i = s;
        return i;
    }
    for (var b = 0, k = 0, g = 0; ;) {
        var o = (b >> 0) + 1 >> 0;
        if (((a >> 0) + -65 & 65535 & 65535) < 26) {
            e[(f >> 0) + (b >> 0) >> 0] = 65535 & q;
            var b = (b >> 0) + 2 >> 0;
            e[(f >> 0) + (o >> 0) >> 0] = (a >> 0) + 32 & 65535 & 65535;
            var k = 1;
        } else {
            e[(f >> 0) + (b >> 0) >> 0] = 65535 & a;
            var b = o;
        }
        var g = (g >> 0) + 1 >> 0;
        if (!(g >>> 0 < c >>> 0)) break;
        var a = 65535 & i[(j >> 0) + (g >> 0) >> 0];
    }
    if (e[(f >> 0) + (b >> 0) >> 0] = 0, 0 === (1 & k & 255)) {
        var i = s;
        return i;
    }
    var i = p(e, f >> 0);
    return i;
}

function D(b, a) {
    return y(b, a);
}

function y(q, o) {
    var label = 0, i = o.length, a = (i >> 0) + 1 >> 0;
    if (!(i >> 0 > 0)) {
        var g = o;
        return g;
    }
    for (var g = aSlot = [ 0 ], h = 0, a = 0; ;) {
        var b = o.charCodeAt(a >> 0);
        g[(h >> 0) + (a >> 0) >> 0] = 65535 & b & 65535;
        var a = (a >> 0) + 1 >> 0;
        if (!(a >> 0 < i >> 0)) break;
    }
    var a = 65535 & g[h >> 0 >> 0];
    if (45 === (65535 & a) || ((a >> 0) + -48 & 65535 & 65535) < 10) {
        var g = o;
        return g;
    }
    var e = aSlot = [ 0 ], f = 0;
    if (i >> 0 === 0) {
        e[f >> 0 >> 0] = 0;
        var g = o;
        return g;
    }
    var c = 0, k = 0, b = 0;
    L39: for (;;) {
        do {
            if (95 !== (65535 & a) && 45 !== (65535 & a) && 32 !== (65535 & a)) {
                if (b >> 0 === 0 && ((a >> 0) + -97 & 65535 & 65535) < 26) {
                    e[(f >> 0) + (c >> 0) >> 0] = (a >> 0) + -32 & 65535 & 65535;
                    var b = 0, k = 1;
                    break;
                }
                e[(f >> 0) + (c >> 0) >> 0] = 65535 & a;
                break;
            }
            var b = (b >> 0) + 1 >> 0, a = 65535 & g[(h >> 0) + (b >> 0) >> 0];
            if (0 === (65535 & a)) {
                label = 17;
                break L39;
            }
            e[(f >> 0) + (c >> 0) >> 0] = 65535 & (((a >> 0) + -97 & 65535 & 65535) < 26 ? (a >> 0) + -32 & 65535 : a);
            var k = 1;
        } while (0);
        var c = (c >> 0) + 1 >> 0, b = (b >> 0) + 1 >> 0;
        if (!(b >>> 0 < i >>> 0)) break;
        var a = 65535 & g[(h >> 0) + (b >> 0) >> 0];
    }
    if (17 === label) {
        var g = o;
        return g;
    }
    if (e[(f >> 0) + (c >> 0) >> 0] = 0, 0 === (1 & k & 255)) {
        var g = o;
        return g;
    }
    var g = p(e, f >> 0);
    return g;
}

function x(c, b, e) {
    var a = e.length;
    if (a >> 0 === 0) var a = 95; else var a = e.charCodeAt(0);
    return w(c, b, a >> 0);
}

function w(s, r, q) {
    var g = r.length, a = (g >> 0) + 1 >> 0;
    if (!(g >> 0 > 0)) {
        var k = r;
        return k;
    }
    for (var k = aSlot = [ 0 ], l = 0, a = 0; ;) {
        var e = r.charCodeAt(a >> 0);
        k[(l >> 0) + (a >> 0) >> 0] = 65535 & e & 65535;
        var a = (a >> 0) + 1 >> 0;
        if (!(a >> 0 < g >> 0)) break;
    }
    var a = 65535 & k[l >> 0 >> 0], o = 65535 & q;
    if (!(((a >> 0) + -65 & 65535 & 65535) < 26)) {
        var k = r;
        return k;
    }
    var c = aSlot = [ 0 ], d = 0;
    if (g >> 0 === 0) {
        c[d >> 0 >> 0] = 0;
        var k = r;
        return k;
    }
    for (var b = 0, i = 0, e = 0; ;) {
        if (((a >> 0) + -65 & 65535 & 65535) < 26) {
            if (e >> 0 !== 0) {
                var i = (b >> 0) + 1 >> 0;
                c[(d >> 0) + (b >> 0) >> 0] = 65535 & o;
                var b = i;
            }
            c[(d >> 0) + (b >> 0) >> 0] = (a >> 0) + 32 & 65535 & 65535;
            var i = 1;
        } else c[(d >> 0) + (b >> 0) >> 0] = 65535 & a;
        var b = (b >> 0) + 1 >> 0, e = (e >> 0) + 1 >> 0;
        if (!(e >>> 0 < g >>> 0)) break;
        var a = 65535 & k[(l >> 0) + (e >> 0) >> 0];
    }
    if (c[(d >> 0) + (b >> 0) >> 0] = 0, 0 === (1 & i & 255)) {
        var k = r;
        return k;
    }
    var k = p(c, d >> 0);
    return k;
}

function v() {
    module.exports = new XCase();
}

function p(c, d) {
    var a = String(), b = 65535 & c[d >> 0 >> 0];
    if (0 !== (65535 & b)) for (var e = 0; ;) {
        var g = String.fromCharCode((65535 & b) >> 0), a = a.concat(g), e = (e >> 0) + 1 >> 0, b = 65535 & c[(d >> 0) + (e >> 0) >> 0];
        if (0 === (65535 & b)) break;
    }
    return String(a);
}

XCase.prototype.camelize = function(a0) {
    return F(this, a0);
}, XCase.prototype.decamelize = function(a0, a1) {
    return C(this, a0, a1);
}, XCase.prototype.pascalize = function(a0) {
    return D(this, a0);
}, XCase.prototype.depascalize = function(a0, a1) {
    return x(this, a0, a1);
}, XCase.prototype.xcase = function(a0, a1) {
    return w(this, a0, a1);
}, XCase.prototype.xcase = function(a0) {
    return y(this, a0);
}, XCase.prototype.xcase = function(a0, a1) {
    return B(this, a0, a1);
}, XCase.prototype.xcase = function(a0) {
    return E(this, a0);
};

var aSlot = null, oSlot = 0, nullArray = [ null ], nullObj = {
    d: nullArray,
    o: 0
};

v();
