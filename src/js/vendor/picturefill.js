/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
!function (e) {
    var t, s, r, i, n, c, a, u = navigator.userAgent;
    e.HTMLPictureElement && /ecko/.test(u) && u.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", (s = document.createElement("source"), r = function (e) {
        var t, r, i = e.parentNode;
        "PICTURE" === i.nodeName.toUpperCase() ? (t = s.cloneNode(), i.insertBefore(t, i.firstElementChild), setTimeout((function () {
            i.removeChild(t)
        }))) : (!e._pfLastSize || e.offsetWidth > e._pfLastSize) && (e._pfLastSize = e.offsetWidth, r = e.sizes, e.sizes += ",100vw", setTimeout((function () {
            e.sizes = r
        })))
    }, i = function () {
        var e, t = document.querySelectorAll("picture > img, img[srcset][sizes]");
        for (e = 0; e < t.length; e++) r(t[e])
    }, n = function () {
        clearTimeout(t), t = setTimeout(i, 99)
    }, c = e.matchMedia && matchMedia("(orientation: landscape)"), a = function () {
        n(), c && c.addListener && c.addListener(n)
    }, s.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? a() : document.addEventListener("DOMContentLoaded", a), n))
}(window),
    /*! Picturefill - v3.0.2
     * http://scottjehl.github.io/picturefill
     * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
     *  License: MIT
     */
    function (e, t, s) {
        "use strict";
        var r, i, n;
        t.createElement("picture");
        var c = {}, a = !1, u = function () {
            }, o = t.createElement("img"), l = o.getAttribute, f = o.setAttribute, d = o.removeAttribute,
            p = t.documentElement, A = {}, m = {algorithm: ""}, h = navigator.userAgent,
            g = /rident/.test(h) || /ecko/.test(h) && h.match(/rv\:(\d+)/) && RegExp.$1 > 35, v = "currentSrc",
            w = /\s+\+?\d+(e\d+)?w/, S = /(\([^)]+\))?\s*(.+)/, x = e.picturefillCFG, y = "font-size:100%!important;",
            E = !0, z = {}, b = {}, T = e.devicePixelRatio, C = {px: 1, in: 96}, R = t.createElement("a"), L = !1,
            M = /^[ \t\n\r\u000c]+/, P = /^[, \t\n\r\u000c]+/, D = /^[^ \t\n\r\u000c]+/, B = /[,]+$/, I = /^\d+$/,
            U = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, $ = function (e, t, s, r) {
                e.addEventListener ? e.addEventListener(t, s, r || !1) : e.attachEvent && e.attachEvent("on" + t, s)
            }, k = function (e) {
                var t = {};
                return function (s) {
                    return s in t || (t[s] = e(s)), t[s]
                }
            };

        function W(e) {
            return " " === e || "\t" === e || "\n" === e || "\f" === e || "\r" === e
        }

        var Q, G, H, F, N, O, q, j, V, _, K, J, X, Y, Z, ee, te = (Q = /^([\d\.]+)(em|vw|px)$/, G = k((function (e) {
            return "return " + function () {
                for (var e = arguments, t = 0, s = e[0]; ++t in e;) s = s.replace(e[t], e[++t]);
                return s
            }((e || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
        })), function (e, t) {
            var s;
            if (!(e in z)) if (z[e] = !1, t && (s = e.match(Q))) z[e] = s[1] * C[s[2]]; else try {
                z[e] = new Function("e", G(e))(C)
            } catch (e) {
            }
            return z[e]
        }), se = function (e, t) {
            return e.w ? (e.cWidth = c.calcListLength(t || "100vw"), e.res = e.w / e.cWidth) : e.res = e.d, e
        }, re = function (e) {
            if (a) {
                var s, r, i, n = e || {};
                if (n.elements && 1 === n.elements.nodeType && ("IMG" === n.elements.nodeName.toUpperCase() ? n.elements = [n.elements] : (n.context = n.elements, n.elements = null)), i = (s = n.elements || c.qsa(n.context || t, n.reevaluate || n.reselect ? c.sel : c.selShort)).length) {
                    for (c.setupRun(n), L = !0, r = 0; r < i; r++) c.fillImg(s[r], n);
                    c.teardownRun(n)
                }
            }
        };

        function ie(e, t) {
            return e.res - t.res
        }

        function ne(e, t) {
            var s, r, i;
            if (e && t) for (i = c.parseSet(t), e = c.makeUrl(e), s = 0; s < i.length; s++) if (e === c.makeUrl(i[s].url)) {
                r = i[s];
                break
            }
            return r
        }

        e.console && console.warn, v in o || (v = "src"), A["image/jpeg"] = !0, A["image/gif"] = !0, A["image/png"] = !0, A["image/svg+xml"] = t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), c.ns = ("pf" + (new Date).getTime()).substr(0, 9), c.supSrcset = "srcset" in o, c.supSizes = "sizes" in o, c.supPicture = !!e.HTMLPictureElement, c.supSrcset && c.supPicture && !c.supSizes && (H = t.createElement("img"), o.srcset = "data:,a", H.src = "data:,a", c.supSrcset = o.complete === H.complete, c.supPicture = c.supSrcset && c.supPicture), c.supSrcset && !c.supSizes ? (F = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", N = t.createElement("img"), O = function () {
            2 === N.width && (c.supSizes = !0), i = c.supSrcset && !c.supSizes, a = !0, setTimeout(re)
        }, N.onload = O, N.onerror = O, N.setAttribute("sizes", "9px"), N.srcset = F + " 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w", N.src = F) : a = !0, c.selShort = "picture>img,img[srcset]", c.sel = c.selShort, c.cfg = m, c.DPR = T || 1, c.u = C, c.types = A, c.setSize = u, c.makeUrl = k((function (e) {
            return R.href = e, R.href
        })), c.qsa = function (e, t) {
            return "querySelector" in e ? e.querySelectorAll(t) : []
        }, c.matchesMedia = function () {
            return e.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? c.matchesMedia = function (e) {
                return !e || matchMedia(e).matches
            } : c.matchesMedia = c.mMQ, c.matchesMedia.apply(this, arguments)
        }, c.mMQ = function (e) {
            return !e || te(e)
        }, c.calcLength = function (e) {
            var t = te(e, !0) || !1;
            return t < 0 && (t = !1), t
        }, c.supportsType = function (e) {
            return !e || A[e]
        }, c.parseSize = k((function (e) {
            var t = (e || "").match(S);
            return {media: t && t[1], length: t && t[2]}
        })), c.parseSet = function (e) {
            return e.cands || (e.cands = function (e, t) {
                function s(t) {
                    var s, r = t.exec(e.substring(o));
                    if (r) return s = r[0], o += s.length, s
                }

                var r, i, n, c, a, u = e.length, o = 0, l = [];

                function f() {
                    var e, s, n, c, a, u, o, f, d, p = !1, A = {};
                    for (c = 0; c < i.length; c++) u = (a = i[c])[a.length - 1], o = a.substring(0, a.length - 1), f = parseInt(o, 10), d = parseFloat(o), I.test(o) && "w" === u ? ((e || s) && (p = !0), 0 === f ? p = !0 : e = f) : U.test(o) && "x" === u ? ((e || s || n) && (p = !0), d < 0 ? p = !0 : s = d) : I.test(o) && "h" === u ? ((n || s) && (p = !0), 0 === f ? p = !0 : n = f) : p = !0;
                    p || (A.url = r, e && (A.w = e), s && (A.d = s), n && (A.h = n), n || s || e || (A.d = 1), 1 === A.d && (t.has1x = !0), A.set = t, l.push(A))
                }

                function d() {
                    for (s(M), n = "", c = "in descriptor"; ;) {
                        if (a = e.charAt(o), "in descriptor" === c) if (W(a)) n && (i.push(n), n = "", c = "after descriptor"); else {
                            if ("," === a) return o += 1, n && i.push(n), void f();
                            if ("(" === a) n += a, c = "in parens"; else {
                                if ("" === a) return n && i.push(n), void f();
                                n += a
                            }
                        } else if ("in parens" === c) if (")" === a) n += a, c = "in descriptor"; else {
                            if ("" === a) return i.push(n), void f();
                            n += a
                        } else if ("after descriptor" === c) if (W(a)) ; else {
                            if ("" === a) return void f();
                            c = "in descriptor", o -= 1
                        }
                        o += 1
                    }
                }

                for (; ;) {
                    if (s(P), o >= u) return l;
                    r = s(D), i = [], "," === r.slice(-1) ? (r = r.replace(B, ""), f()) : d()
                }
            }(e.srcset, e)), e.cands
        }, c.getEmValue = function () {
            var e;
            if (!r && (e = t.body)) {
                var s = t.createElement("div"), i = p.style.cssText, n = e.style.cssText;
                s.style.cssText = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", p.style.cssText = y, e.style.cssText = y, e.appendChild(s), r = s.offsetWidth, e.removeChild(s), r = parseFloat(r, 10), p.style.cssText = i, e.style.cssText = n
            }
            return r || 16
        }, c.calcListLength = function (e) {
            if (!(e in b) || m.uT) {
                var t = c.calcLength(function (e) {
                    var t, s, r, i, n, a, u,
                        o = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
                        l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
                    for (r = (s = function (e) {
                        var t, s = "", r = [], i = [], n = 0, c = 0, a = !1;

                        function u() {
                            s && (r.push(s), s = "")
                        }

                        function o() {
                            r[0] && (i.push(r), r = [])
                        }

                        for (; ;) {
                            if ("" === (t = e.charAt(c))) return u(), o(), i;
                            if (a) {
                                if ("*" === t && "/" === e[c + 1]) {
                                    a = !1, c += 2, u();
                                    continue
                                }
                                c += 1
                            } else {
                                if (W(t)) {
                                    if (e.charAt(c - 1) && W(e.charAt(c - 1)) || !s) {
                                        c += 1;
                                        continue
                                    }
                                    if (0 === n) {
                                        u(), c += 1;
                                        continue
                                    }
                                    t = " "
                                } else if ("(" === t) n += 1; else if (")" === t) n -= 1; else {
                                    if ("," === t) {
                                        u(), o(), c += 1;
                                        continue
                                    }
                                    if ("/" === t && "*" === e.charAt(c + 1)) {
                                        a = !0, c += 2;
                                        continue
                                    }
                                }
                                s += t, c += 1
                            }
                        }
                    }(e)).length, t = 0; t < r; t++) if (n = (i = s[t])[i.length - 1], u = n, o.test(u) && parseFloat(u) >= 0 || l.test(u) || "0" === u || "-0" === u || "+0" === u) {
                        if (a = n, i.pop(), 0 === i.length) return a;
                        if (i = i.join(" "), c.matchesMedia(i)) return a
                    }
                    return "100vw"
                }(e));
                b[e] = t || C.width
            }
            return b[e]
        }, c.setRes = function (e) {
            var t;
            if (e) for (var s = 0, r = (t = c.parseSet(e)).length; s < r; s++) se(t[s], e.sizes);
            return t
        }, c.setRes.res = se, c.applySetCandidate = function (e, t) {
            if (e.length) {
                var s, r, i, n, a, u, o, l, f, d, p, A, h, w, S, x, y = t[c.ns], E = c.DPR;
                if (u = y.curSrc || t[v], (o = y.curCan || function (e, t, s) {
                    var r;
                    return !s && t && (s = (s = e[c.ns].sets) && s[s.length - 1]), (r = ne(t, s)) && (t = c.makeUrl(t), e[c.ns].curSrc = t, e[c.ns].curCan = r, r.res || se(r, r.set.sizes)), r
                }(t, u, e[0].set)) && o.set === e[0].set && ((f = g && !t.complete && o.res - .1 > E) || (o.cached = !0, o.res >= E && (a = o))), !a) for (e.sort(ie), a = e[(n = e.length) - 1], r = 0; r < n; r++) if ((s = e[r]).res >= E) {
                    a = e[i = r - 1] && (f || u !== c.makeUrl(s.url)) && (d = e[i].res, p = s.res, A = E, h = e[i].cached, w = void 0, S = void 0, x = void 0, "saveData" === m.algorithm ? d > 2.7 ? x = A + 1 : (S = (p - A) * (w = Math.pow(d - .6, 1.5)), h && (S += .1 * w), x = d + S) : x = A > 1 ? Math.sqrt(d * p) : d, x > A) ? e[i] : s;
                    break
                }
                a && (l = c.makeUrl(a.url), y.curSrc = l, y.curCan = a, l !== u && c.setSrc(t, a), c.setSize(t))
            }
        }, c.setSrc = function (e, t) {
            var s;
            e.src = t.url, "image/svg+xml" === t.set.type && (s = e.style.width, e.style.width = e.offsetWidth + 1 + "px", e.offsetWidth + 1 && (e.style.width = s))
        }, c.getSet = function (e) {
            var t, s, r, i = !1, n = e[c.ns].sets;
            for (t = 0; t < n.length && !i; t++) if ((s = n[t]).srcset && c.matchesMedia(s.media) && (r = c.supportsType(s.type))) {
                "pending" === r && (s = r), i = s;
                break
            }
            return i
        }, c.parseSets = function (e, t, s) {
            var r, n, a, u, o = t && "PICTURE" === t.nodeName.toUpperCase(), p = e[c.ns];
            (void 0 === p.src || s.src) && (p.src = l.call(e, "src"), p.src ? f.call(e, "data-pfsrc", p.src) : d.call(e, "data-pfsrc")), (void 0 === p.srcset || s.srcset || !c.supSrcset || e.srcset) && (r = l.call(e, "srcset"), p.srcset = r, u = !0), p.sets = [], o && (p.pic = !0, function (e, t) {
                var s, r, i, n, a = e.getElementsByTagName("source");
                for (s = 0, r = a.length; s < r; s++) (i = a[s])[c.ns] = !0, (n = i.getAttribute("srcset")) && t.push({
                    srcset: n,
                    media: i.getAttribute("media"),
                    type: i.getAttribute("type"),
                    sizes: i.getAttribute("sizes")
                })
            }(t, p.sets)), p.srcset ? (n = {
                srcset: p.srcset,
                sizes: l.call(e, "sizes")
            }, p.sets.push(n), (a = (i || p.src) && w.test(p.srcset || "")) || !p.src || ne(p.src, n) || n.has1x || (n.srcset += ", " + p.src, n.cands.push({
                url: p.src,
                d: 1,
                set: n
            }))) : p.src && p.sets.push({
                srcset: p.src,
                sizes: null
            }), p.curCan = null, p.curSrc = void 0, p.supported = !(o || n && !c.supSrcset || a && !c.supSizes), u && c.supSrcset && !p.supported && (r ? (f.call(e, "data-pfsrcset", r), e.srcset = "") : d.call(e, "data-pfsrcset")), p.supported && !p.srcset && (!p.src && e.src || e.src !== c.makeUrl(p.src)) && (null === p.src ? e.removeAttribute("src") : e.src = p.src), p.parsed = !0
        }, c.fillImg = function (e, t) {
            var s, r = t.reselect || t.reevaluate;
            e[c.ns] || (e[c.ns] = {}), s = e[c.ns], (r || s.evaled !== n) && (s.parsed && !t.reevaluate || c.parseSets(e, e.parentNode, t), s.supported ? s.evaled = n : function (e) {
                var t, s = c.getSet(e), r = !1;
                "pending" !== s && (r = n, s && (t = c.setRes(s), c.applySetCandidate(t, e))), e[c.ns].evaled = r
            }(e))
        }, c.setupRun = function () {
            L && !E && T === e.devicePixelRatio || (E = !1, T = e.devicePixelRatio, z = {}, b = {}, c.DPR = T || 1, C.width = Math.max(e.innerWidth || 0, p.clientWidth), C.height = Math.max(e.innerHeight || 0, p.clientHeight), C.vw = C.width / 100, C.vh = C.height / 100, n = [C.height, C.width, T].join("-"), C.em = c.getEmValue(), C.rem = C.em)
        }, c.supPicture ? (re = u, c.fillImg = u) : (X = e.attachEvent ? /d$|^c/ : /d$|^c|^i/, Y = function () {
            var e = t.readyState || "";
            Z = setTimeout(Y, "loading" === e ? 200 : 999), t.body && (c.fillImgs(), (q = q || X.test(e)) && clearTimeout(Z))
        }, Z = setTimeout(Y, t.body ? 9 : 99), ee = p.clientHeight, $(e, "resize", (j = function () {
            E = Math.max(e.innerWidth || 0, p.clientWidth) !== C.width || p.clientHeight !== ee, ee = p.clientHeight, E && c.fillImgs()
        }, V = 99, J = function () {
            var e = new Date - K;
            e < V ? _ = setTimeout(J, V - e) : (_ = null, j())
        }, function () {
            K = new Date, _ || (_ = setTimeout(J, V))
        })), $(t, "readystatechange", Y)), c.picturefill = re, c.fillImgs = re, c.teardownRun = u, re._ = c, e.picturefillCFG = {
            pf: c,
            push: function (e) {
                var t = e.shift();
                "function" == typeof c[t] ? c[t].apply(c, e) : (m[t] = e[0], L && c.fillImgs({reselect: !0}))
            }
        };
        for (; x && x.length;) e.picturefillCFG.push(x.shift());
        e.picturefill = re, "object" == typeof module && "object" == typeof module.exports ? module.exports = re : "function" == typeof define && define.amd && define("picturefill", (function () {
            return re
        })), c.supPicture || (A["image/webp"] = function (t, s) {
            var r = new e.Image;
            return r.onerror = function () {
                A[t] = !1, re()
            }, r.onload = function () {
                A[t] = 1 === r.width, re()
            }, r.src = s, "pending"
        }("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
    }(window, document);