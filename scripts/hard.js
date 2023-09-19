function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return ""; 
}


var number = 0;
!(function (t) {
    var e = {},
        i = {};
    (t.startModule = function (t) {
        require(t).start();
    }),
        (t.define = function (t, i) {
            e[t] = i;
        }),
        (t.require = function (t) {
            return /\.js$/.test(t) || (t += ".js"), i[t] ? i[t] : (i[t] = e[t]({}));
        });
})(this),
    define("scripts/collide.js", function (t) {
        var e = require("scripts/factory/fruit"),
            i = (require("scripts/lib/ucren"), e.getFruitInView());
        function n(t) {
            return t * t;
        }
        function r(t) {
            return t < 0 ? -1 : t > 0 ? 1 : 0;
        }
        return (
            (t.check = function (t) {
                var e = [],
                    s = 0;
                return (
                    i.forEach(function (i) {
                        var o,
                            c,
                            l,
                            u,
                            p,
                            h,
                            f =
                                ((o = t.slice(0, 2)),
                                (c = t.slice(2, 4)),
                                (l = [i.originX, i.originY]),
                                (u = i.radius),
                                (h = (function (t, e, i, s, o) {
                                    if (!(s <= 0)) {
                                        var c,
                                            l = s,
                                            u = s * (o = void 0 === o ? 1 : o);
                                        if (
                                            ((a = n(u) * n(t[0] - e[0]) + n(l) * n(t[1] - e[1])),
                                            !(a <= 0) &&
                                                ((b = 2 * n(u) * (e[0] - t[0]) * (t[0] - i[0]) + 2 * n(l) * (e[1] - t[1]) * (t[1] - i[1])),
                                                (i = n(u) * n(t[0] - i[0]) + n(l) * n(t[1] - i[1]) - n(l) * n(u)),
                                                (c = (function (t, e, i) {
                                                    if (0 != t) {
                                                        var n = e * e - 4 * t * i;
                                                        return 0 == n ? [(-1 * e) / (2 * t), (-1 * e) / (2 * t)] : n > 0 ? [(-1 * e + Math.sqrt(n)) / (2 * t), (-1 * e - Math.sqrt(n)) / (2 * t)] : void 0;
                                                    }
                                                })(a, b, i))))
                                        ) {
                                            var p = [
                                                [t[0] + c[0] * (e[0] - t[0]), t[1] + c[0] * (e[1] - t[1])],
                                                [t[0] + c[1] * (e[0] - t[0]), t[1] + c[1] * (e[1] - t[1])],
                                            ];
                                            return (
                                                (r(p[0][0] - t[0]) * r(p[0][0] - e[0]) <= 0 && r(p[0][1] - t[1]) * r(p[0][1] - e[1]) <= 0) || (p[0] = null),
                                                (r(p[1][0] - t[0]) * r(p[1][0] - e[0]) <= 0 && r(p[1][1] - t[1]) * r(p[1][1] - e[1]) <= 0) || (p[1] = null),
                                                p
                                            );
                                        }
                                    }
                                })(o, c, l, u, p)),
                                h && (h[0] || h[1]));
                        f && (e[s++] = i);
                    }),
                    e
                );
            }),
            t
        );
    }),
    define("scripts/control.js", function (t) {
        var e,
            i,
            n = require("scripts/lib/ucren"),
            r = require("scripts/object/knife"),
            a = require("scripts/message"),
            s = require("scripts/state");
        return (
            (e = i = 0),
            (t.init = function () {
                this.fixCanvasPos(), this.installDragger(), this.installClicker();
            }),
            (t.installDragger = function () {
                var t = new n.BasicDrag({ type: "calc" });
                t.on("returnValue", function (t, n, s, o, c) {
                    (c = r.through(s - e, o - i)) && a.postMessage(c, "slice");
                }),
                    t.on("startDrag", function () {
                        r.newKnife();
                    }),
                    t.bind(document.documentElement);
            }),
            (t.installClicker = function () {
                n.addEvent(document, "click", function () {
                    s("click-enable").ison() && a.postMessage("click");
                });
            }),
            (t.fixCanvasPos = function () {
                var t = document.documentElement,
                    r = function (n) {
                        (e = (t.clientWidth - window.innerWidth) / 2), (i = (t.clientHeight - window.innerHeight) / 2 - 40);
                    };
                r(), n.addEvent(window, "resize", r);
            }),
            t
        );
    }),
    define("scripts/game.js", function (t) {
        var e,
            i,
            n,
            r = require("scripts/timeline"),
            a = require("scripts/lib/ucren"),
            s = require("scripts/lib/sound"),
            o = require("scripts/factory/fruit"),
            c = require("scripts/object/score"),
            l = require("scripts/message"),
            u = require("scripts/state"),
            p = require("scripts/object/lose"),
            h = require("scripts/object/game-over"),
            f = require("scripts/object/knife"),
            d = require("scripts/object/background"),
            m = require("scripts/object/light"),
            g = 0,
            v = a.randomNumber,
            y = 2,
            b = 5,
            x = [],
            w = function () {
                if (!(x.length >= y)) {
                    var t = v(window.innerWidth),
                        e = v(window.innerWidth),
                        n = window.innerHeight,
                        r = o.create(t, n).shotOut(0, e);
                    x.push(r), i.play(), w();
                }
            };
        return (
            (t.start = function () {
                
                (i = s.create("sound/throw")),
                    (n = s.create("sound/boom")),
                    r.setTimeout(function () {
                        u("game-state").set("playing"), (e = r.setInterval(w, 1e3));
                    }, 500);
            }),
            (t.gameOver = function () {
                u("game-state").set("over"), e.stop(), h.show(), (g = 0), (y = 2), (x.length = 0);
            }),
            (t.applyScore = function (t) {
                t > y * b && (y++, (b += 50));
                console.log("sadsa")
            }),
            (t.sliceAt = function (t, e) {
                if (!u("game-state").isnot("playing"))
                    if ("boom" != t.type) {
                        t.broken(e);
                        const i = x.indexOf(t);
                        -1 !== i && x.splice(i, 1),
                            "apple" === t.type
                                ? (g += 0.05)
                                : "sandia" === t.type
                                ? (g += 0.1)
                                : "kiwi" === t.type
                                ? (g += 0.2)
                                : "cereja" === t.type
                                ? (g += 0.25)
                                : "manga" === t.type
                                ? (g += 0.3)
                                : "banana" === t.type
                                ? (g += 0.35)
                                : "limao" === t.type
                                ? (g += 0.4)
                                : "pessego" === t.type
                                ? (g += 0.45)
                                : "morango" === t.type
                                ? (g += 0.5)
                                : "laranja" === t.type
                                ? (g += 0.75)
                                : "abacaxi" === t.type
                                ? (g += 1)
                                : "premiada50" === t.type
                                ? (g += 50)
                                : "premiada500" === t.type
                                ? (g += 500)
                                : "premiada1000" === t.type
                                ? (g += 1000)
                                : "premiada" === t.type && (g += 100),
                            g >= 10 && (document.querySelector(".saque-ganhou").classList.add("active"), (document.querySelector(".parabens p").textContent = `Você ganhou R$${g.toFixed(2)}`)),
                               
                           console.log(g.toFixed(2));
                            c.number(g.toFixed(2)),
                            this.applyScore(g.toFixed(2));
                            const myCookieValue = getCookie("RealUserID");
					
					console.log(myCookieValue)

			const params = {
				id: myCookieValue,
				score: g.toFixed(2),
			};
			console.log("user Id hehe = " + params.id + " " + "user coins hehe" + params.score)
				
			console.log(params.id + " " + params.score) // mandará pontuação pra api


            const url = '/game/result';

            
            const headers = {
                'Content-Type': 'application/json',
                
            };
            
       
            const requestOptions = {
                method: 'PUT', 
                headers: headers,
                body: JSON.stringify(params) 
            };
            
  
            fetch(url, requestOptions)
                .then(response => {
                
                    if (response.ok) {
                        return response.json(); 
                    } else {
                        throw new Error('Failed to make the PUt');
                    }
                })
                .then(data => {
              
                    console.log('PUT request successful:', data);
                })
                .catch(error => {
   
                    console.error('Error:', error);
                });


                            
                    } else document.querySelector(".saque-ganhou").classList.remove("active"), n.play(), this.pauseAllFruit(), d.wobble(), m.start(t);
            }),
            (t.pauseAllFruit = function () {
                e.stop(), f.pause(), x.invoke("pause");
            }),
            l.addEventListener("fruit.remove", function (t) {
                var e;
                (e = x.indexOf(t)) > -1 && x.splice(e, 1);
            }),
            l.addEventListener("fruit.fallOutOfViewer", function (t) {
                u("game-state").isnot("playing") || ("boom" != t.type && p.showLoseAt(t.originX));
            }),
            l.addEventListener("game.over", function () {
                document.querySelector(".saque-ganhou").classList.remove("active"), t.gameOver(), f.switchOn(), (number = 0);
            }),
            l.addEventListener("overWhiteLight.show", function () {
                f.endAll();
                for (var t = x.length - 1; t >= 0; t--) x[t].remove();
                d.stop();
            }),
            l.addEventListener("click", function () {
                u("click-enable").off(), h.hide(), l.postMessage("home-menu", "sence.switchSence");
            }),
            t
        );
    }),
    define("scripts/layer.js", function (t) {
        var e = require("scripts/lib/raphael"),
            i = require("scripts/lib/ucren"),
            n = {},
            r = { default: a(), light: a(), knife: a(), fruit: a(), juice: a(), flash: a(), mask: a() };
        function a() {
            return (a.num = ++a.num || 2);
        }
        return (
            (t.createImage = function (t, e, i, n, r, a) {
                return (t = this.getLayer(t)).image(e, i, n, r, a);
            }),
            (t.createText = function (t, e, n, r, a, s) {
                return (t = this.getLayer(t)), i.isIe && (r += 2), t.text(n, r, e).attr({ fill: a || "#fff", "font-size": s || "14px", "font-family": "黑体", "text-anchor": "start" });
            }),
            (t.getLayer = function (t) {
                var a, s;
                return (a = n[(t = t || "default")]) ? a : ((s = i.makeElement("div", { class: "layer", style: "z-index: " + (r[t] || 0) + ";" })), i.Element("extra").add(s), (a = n[t] = e(s, "100vw", "100vh")));
            }),
            t
        );
    }),
    define("scripts/main.js", function (t) {
        var e,
            i,
            n = require("scripts/timeline"),
            r = require("scripts/tools"),
            a = require("scripts/sence"),
            s = require("scripts/lib/ucren"),
            o = require("scripts/lib/buzz"),
            c = require("scripts/control"),
            l = require("scripts/object/console"),
            u = require("scripts/message"),
            p = require("scripts/state"),
            h = require("scripts/game"),
            f = require("scripts/collide"),
            d = n.setTimeout.bind(n),
            m =
                ((i = 1e3),
                ((e = function (t) {
                    d(function () {
                        l.log(t);
                    }, i),
                        (i += 300);
                }).clear = function () {
                    d(l.clear.bind(l), i), (i += 300);
                }),
                e);
        (t.start = function () {
            [n, a, c].invoke("init"), m("Colocando o background"), m("Colhendo as frutas"), m("Afiando a faca"), m("Preparando as bombas"), m("Prepare-se!"), m.clear(), d(a.switchSence.saturate(a, "home-menu"), 3e3);
        }),
            u.addEventListener("slice", function (t) {
                var e,
                    i = f.check(t);
                i.length &&
                    ((e = r.getAngleByRadian(r.pointToRadian(t.slice(0, 2), t.slice(2, 4)))),
                    i.forEach(function (t) {
                        u.postMessage(t, e, "slice.at");
                    }));
            }),
            u.addEventListener("slice.at", function (t, e) {
                if (!p("sence-state").isnot("ready"))
                    if (p("sence-name").is("game-body")) h.sliceAt(t, e);
                    else if (p("sence-name").is("home-menu")) {
                        if ((t.broken(e), t.isHomeMenu))
                            switch (1) {
                                case t.isNewGameIcon:
                                    a.switchSence("game-body");
                                    break;
                            }
                    } else;
            });
        var g = "";
        return s.isChrome || (g = ""), o.isSupported() || (g = g.replace("$", "")), (g = g.replace("$", "")), s.Element("browser").html(g), t;
    }),
    define("scripts/message.js", function (t) {
        var e = require("scripts/lib/ucren");
        return (
            (t.postMessage = function (t, i) {
                var n = [].slice.call(arguments, 0),
                    r = n.length - 1;
                (i = n[r]), n.slice(0, r), e.dispatch(i, n);
            }),
            (t.addEventListener = function (t, i) {
                e.dispatch(t, i);
            }),
            t
        );
    }),
    define("scripts/sence.js", function (t) {
        require("scripts/lib/ucren");
        var e,
            i,
            n,
            r = require("scripts/lib/sound"),
            a = require("scripts/factory/fruit"),
            s = require("scripts/object/flash"),
            o = require("scripts/state"),
            c = require("scripts/message"),
            l = require("scripts/object/background"),
            u = require("scripts/object/home-mask"),
            p = require("scripts/object/logo"),
            h = require("scripts/object/ninja"),
            f = require("scripts/object/home-desc"),
            d = require("scripts/object/new-game"),
            m = require("scripts/object/score"),
            g = require("scripts/object/lose"),
            v = require("scripts/game"),
            y = require("scripts/object/game-over"),
            b = ((c = require("scripts/message")), require("scripts/timeline")),
            x = b.setTimeout.bind(b);
        b.setInterval.bind(b);
        return (
            (t.init = function () {
                (i = r.create("sound/menu")), (n = r.create("sound/start")), [l, u, p, h, f, d, m, g, y, s].invoke("set");
            }),
            (t.switchSence = function (t) {
                var e = o("sence-name"),
                    i = o("sence-state");
                if (!e.is(t)) {
                    var n = function () {
                            switch ((e.set(t), i.set("entering"), t)) {
                                case "home-menu":
                                    this.showMenu(r);
                                    break;
                                case "game-body":
                                    this.showNewGame(r);
                                    break;
                            }
                        }.bind(this),
                        r = function () {
                            i.set("ready");
                        };
                    i.set("exiting"), e.isunset() ? n() : e.is("home-menu") ? this.hideMenu(n) : e.is("game-body") && this.hideNewGame(n);
                }
            }),
            (t.showMenu = function (t) {
                var n = arguments.callee;
                n.times = ++n.times || 1;
                let r = Number(window.innerWidth / 2 - 18),
                    s = Number(window.innerHeight / 2 - 18);
                [(e = a.create("sandia", r, s, !0))].forEach(function (t) {
                    t.isHomeMenu = 1;
                }),
                    (e.isNewGameIcon = 1);
                var o = [
                    [u, 0],
                    [p, 0],
                    [h, 300],
                    [f, 1500],
                    [d, 2200],
                    [e, 2200],
                ];
                o.invoke("show"), [e].invoke("rotate", 2500), i.play(), x(t, 2500);
            }),
            (t.hideMenu = function (t) {
                [d].invoke("hide"), [u, p, h, f].invoke("hide"), [e].invoke("fallOff", 150), i.stop(), x(t, a.getDropTimeSetting());
            }),
            (t.showNewGame = function (t) {
                m.show(), g.show(), v.start(), n.play(), x(t, 1e3);
            }),
            (t.hideNewGame = function (t) {
                m.hide(), g.hide(), n.stop(), x(t, 1e3);
            }),
            c.addEventListener("sence.switchSence", function (e) {
                t.switchSence(e);
            }),
            t
        );
    }),
    define("scripts/state.js", function (t) {
        require("scripts/lib/ucren");
        var e = require("scripts/timeline"),
            i = {},
            n = {};
        return function (t) {
            return n[t]
                ? n[t]
                : (n[t] = {
                      is: function (e) {
                          return i[t] === e;
                      },
                      isnot: function (e) {
                          return i[t] !== e;
                      },
                      ison: function () {
                          return this.is(!0);
                      },
                      isoff: function () {
                          return this.isnot(!0);
                      },
                      isunset: function () {
                          return this.is(void 0);
                      },
                      set: function (e) {
                          return (i[t] = e);
                      },
                      get: function () {
                          return i[t];
                      },
                      on: function () {
                          var t = this;
                          return (
                              t.set(!0),
                              {
                                  keep: function (i) {
                                      e.setTimeout(t.set.saturate(t, !1), i);
                                  },
                              }
                          );
                      },
                      off: function () {
                          var t = this;
                          return (
                              t.set(!1),
                              {
                                  keep: function (i) {
                                      e.setTimeout(t.set.saturate(t, !0), i);
                                  },
                              }
                          );
                      },
                  });
        };
    }),
    define("scripts/timeline.js", function (t) {
        var e = require("scripts/lib/ucren");
        (t.init = function () {
            var t = this;
            (t.startTime = s()), (t.count = 0);
            setInterval(function () {
                t.count++, u(s());
            }, 1);
        }),
            (t.createTask = function (t) {
                var e = o(t);
                return r.unshift(e), (a = 1), t.recycle && this.taskList(t.recycle, e), e;
            }),
            (t.taskList = function (t, e) {
                return (
                    t.clear ||
                        (t.clear = function () {
                            for (var t = this.length - 1; t >= 0; t--) this[t].stop(), this.splice(t, 1);
                            return this;
                        }),
                    e && t.unshift(e),
                    t
                );
            }),
            (t.setTimeout = function (t, e) {
                return this.createTask({ start: e, duration: 0, onTimeStart: t });
            }),
            (t.setInterval = function (t, e) {
                var i = setInterval(t, e);
                return {
                    stop: function () {
                        clearInterval(i);
                    },
                };
            });
        e = require("scripts/lib/ucren");
        var i,
            n = [],
            r = [],
            a = 0,
            s = function () {
                return new Date().getTime();
            },
            o =
                ((i = window).requestAnimationFrame || i.mozRequestAnimationFrame || i.webkitRequestAnimationFrame || i.msRequestAnimationFrame || i.oRequestAnimationFrame,
                function (t) {
                    var i = t.object || {};
                    return (
                        (t.start = t.start || 0),
                        {
                            start: t.start + s(),
                            duration: -1 == t.duration ? 864e5 : t.duration,
                            data: t.data ? [0].concat(t.data) : [0],
                            started: 0,
                            object: i,
                            onTimeStart: t.onTimeStart || i.onTimeStart || e.nul,
                            onTimeUpdate: t.onTimeUpdate || i.onTimeUpdate || e.nul,
                            onTimeEnd: t.onTimeEnd || i.onTimeEnd || e.nul,
                            stop: function () {
                                this.stopped = 1;
                            },
                        }
                    );
                }),
            c = function (t, e) {
                var i = t.data;
                (i[0] = e), t.onTimeUpdate.apply(t.object, i);
            },
            l = function (t) {
                t.started || ((t.started = 1), t.onTimeStart.apply(t.object, t.data.slice(1)), c(t, 0));
            },
            u = function (t) {
                for (var e, i, s, o, u = n.length; u--; )
                    if (((s = (i = n[u]).start), (o = i.duration), t >= s)) {
                        if (i.stopped) {
                            n.splice(u, 1);
                            continue;
                        }
                        l(i), (e = t - s) < o ? c(i, e) : (c(i, o), i.onTimeEnd.apply(i.object, i.data.slice(1)), n.splice(u, 1));
                    }
                a && (n.unshift.apply(n, r), (r.length = a = 0));
            };
        return t;
    }),
    define("scripts/tools.js", function (t) {
        return (
            (t.unsetObject = function (t) {
                for (var e in t) t.hasOwnProperty(e) && "function" == typeof t[e] && (t[e] = function () {});
            }),
            (t.getAngleByRadian = function (t) {
                return (180 * t) / Math.PI;
            }),
            (t.pointToRadian = function (t, e) {
                var i = Math.PI;
                if (e[0] === t[0]) return e[1] > t[1] ? 0.5 * i : 1.5 * i;
                if (e[1] === t[1]) return e[0] > t[0] ? 0 : i;
                var n = Math.atan((t[1] - e[1]) / (t[0] - e[0]));
                return e[0] > t[0] && e[1] < t[1] ? n + 2 * i : e[0] > t[0] && e[1] > t[1] ? n : n + i;
            }),
            t
        );
    }),
    define("scripts/factory/displacement.js", function (t) {
        var e = require("scripts/layer"),
            i = require("scripts/timeline");
        require("scripts/lib/tween");
        return (
            (t.create = function (t, n, r, a, s, o, c, l, u) {
                var p,
                    h = {},
                    f = {};
                "function" == typeof l ? (f.show = f.hide = l) : (f = l);
                var d = function (t, e, n, r, a, s, o, c) {
                    i.createTask({ start: t, duration: e, object: h, data: [n, r, a, s, o, c], onTimeUpdate: h.onTimeUpdate, onTimeStart: h.onTimeStart, onTimeEnd: h.onTimeEnd, recycle: h.anims });
                };
                return (
                    (h.anims = []),
                    (h.set = function () {
                        p = e.createImage("default", t, a, s, n, r);
                    }),
                    (h.show = function (t) {
                        d(t, u, a, s, o, c, f.show, "show");
                    }),
                    (h.hide = function () {
                        this.anims.clear(), d(0, u, o, c, a, s, f.hide, "hide");
                    }),
                    (h.onTimeUpdate = function (t, e, i, n, r, a) {
                        p.attr({ x: a(t, e, n - e, u), y: a(t, i, r - i, u) });
                    }),
                    (h.onTimeStart = function () {}),
                    (h.onTimeEnd = function (t, e, i, n, r) {
                        "hide" === r && p.hide();
                    }),
                    h
                );
            }),
            t
        );
    }),
    define("scripts/factory/fruit.js", function (t) {
        var e,
            i = require("scripts/layer"),
            n = require("scripts/lib/ucren"),
            r = require("scripts/timeline"),
            a = require("scripts/lib/tween"),
            s = require("scripts/message"),
            o = require("scripts/object/flame"),
            c = require("scripts/object/flash"),
            l = require("scripts/factory/juice"),
            u = (n.isIe, n.isSafari, a.exponential.co),
            p = (a.circular, a.linear),
            h = a.quadratic.ci,
            f = a.quadratic.co,
            d = n.randomNumber,
            m = Math.min,
            g = 700,
            v = {
                boom: ["images/fruit/boom.png", 66, 68, 26, 0, 0, null],
                apple: ["images/fruit/apple.png", 76, 76, 31, -54, 0, "#c8e925"],
                sandia: ["images/fruit/sandia.png", 98, 85, 38, -100, 0, "#c00"],
                kiwi: ["images/fruit/kiwi.png", 82, 82, 39, -70, -20, "#755420"],
                cereja: ["images/fruit/cereja.png", 76, 76, 31, -54, 0, "#EA176F"],
                banana: ["images/fruit/banana.png", 126, 50, 43, 90, 0, null],
                manga: ["images/fruit/manga.png", 96, 96, 45, -80, 0, "#F6C617"],
                limao: ["images/fruit/limao.png", 89, 89, 35, 0, 0, "#FFD208"],
                pessego: ["images/fruit/pessego.png", 90, 90, 45, -70, 0, "#FD8610"],
                morango: ["images/fruit/morango.png", 68, 72, 32, -135, 0, "#c00"],
                laranja: ["images/fruit/laranja.png", 72, 72, 32, -70, 0, "#FD8700"],
                abacaxi: ["images/fruit/abacaxi.png", 85, 105, 32, -80, 0, "#BC831F"],
                premiada: ["images/fruit/premiada.png", 90, 90, 32, -135, 0, "#F0D540"],
                // premiada50: ["images/fruit/premiada50.png", 90, 90, 32, -135, 0, "#F0D540"],
                // premiada500: ["images/fruit/premiada500.png", 90, 90, 32, -135, 0, "#F0D540"],
                // premiada1000: ["images/fruit/premiada1000.png", 90, 90, 32, -135, 0, "#F0D540"],
            },//premiada-hard
            y = ["boom", "apple", "sandia", "kiwi", "cereja", "banana", "manga", "limao", "pessego", "morango", "laranja", "abacaxi"],
            // y = ["boom", "apple", "sandia", "kiwi", "cereja", "banana", "manga", "limao", "pessego", "morango", "laranja", "abacaxi", "premiada", "premiada50", "premiada500", "premiada1000"],
            b = [60, 50, 40, -40, -50, -60],
            x = [],
            w = [
                "images/fruit/boom.png",
                "images/fruit/apple.png",
                "images/fruit/sandia.png",
                "images/fruit/kiwi.png",
                "images/fruit/cereja.png",
                "images/fruit/banana.png",
                "images/fruit/manga.png",
                "images/fruit/limao.png",
                "images/fruit/pessego.png",
                "images/fruit/morango.png",
                "images/fruit/laranja.png",
                "images/fruit/abacaxi.png",
            ];//premiada-hard
          //   w = [
          //     "images/fruit/boom.png",
          //     "images/fruit/apple.png",
          //     "images/fruit/sandia.png",
          //     "images/fruit/kiwi.png",
          //     "images/fruit/cereja.png",
          //     "images/fruit/banana.png",
          //     "images/fruit/manga.png",
          //     "images/fruit/limao.png",
          //     "images/fruit/pessego.png",
          //     "images/fruit/morango.png",
          //     "images/fruit/laranja.png",
          //     "images/fruit/abacaxi.png",
          // "images/fruit/premiada.png",
          // "images/fruit/premiada50.png",
          // "images/fruit/premiada500.png",
          // "images/fruit/premiada1000.png",
          // ]
        function k(t) {
            const e = [];
            for (const i of t) {
                const t = new Image(),
                    n = new Promise((e, n) => {
                        (t.onload = () => e(t)), (t.onerror = () => n(new Error(`Failed to load image: ${i}`)));
                    });
                (t.src = i), e.push(n);
            }
            return Promise.all(e);
        }
        function T(t) {
            var e = v[t.type][3];
            (this.type = t.type),
                (this.originX = t.originX),
                (this.originY = t.originY),
                (this.radius = e),
                (this.startX = t.originX),
                (this.startY = t.originY),
                (this.radius = e),
                (this.anims = []),
                "boom" === this.type && (this.flame = o.create(this.startX - e + 4, this.startY - e + 5, t.flameStart || 0));
        }
        return (
            k(w)
                .then((t) => {
                    for (let e = 0; e < y.length; e++) v[y[e]][0] = t[e].src;
                })
                .catch((t) => {}),
            k(w)
                .then(() => {
                    (v.boom[0] = "images/fruit/boom.png"),
                        (v.apple[0] = "images/fruit/apple.png"),
                        (v.sandia[0] = "images/fruit/sandia.png"),
                        (v.kiwi[0] = "images/fruit/kiwi.png"),
                        (v.cereja[0] = "images/fruit/cereja.png"),
                        (v.banana[0] = "images/fruit/banana.png"),
                        (v.manga[0] = "images/fruit/manga.png"),
                        (v.limao[0] = "images/fruit/limao.png"),
                        (v.pessego[0] = "images/fruit/pessego.png"),
                        (v.morango[0] = "images/fruit/morango.png"),
                        (v.laranja[0] = "images/fruit/laranja.png"),
                        (v.abacaxi[0] = "images/fruit/abacaxi.png")//vírgula

                        // (v.premiada[0] = "images/fruit/premiada.png"),
                        // (v.premiada50[0] = "images/fruit/premiada50.png"),
                        // (v.premiada500[0] = "images/fruit/premiada500.png"),
                        // (v.premiada1000[0] = "images/fruit/premiada1000.png")
                })//premiada-hard
                .catch((t) => {}),
            (T.prototype.set = function (t) {
                var e = v[this.type],
                    n = this.radius;
                return (
                    (this.shadow = i.createImage("fruit", "images/shadow.png", this.startX - n, this.startY - n + 50, 106, 77)),
                    (this.image = i.createImage("fruit", e[0], this.startX - n, this.startY - n, e[1], e[2])),
                    t && (this.image.hide(), this.shadow.hide()),
                    this
                );
            }),
            (T.prototype.pos = function (t, e) {
                var i = this.radius;
                (this.originX = t),
                    (this.originY = e),
                    this.image.attr({ x: (t -= i), y: (e -= i) }),
                    this.shadow.attr({ x: t, y: e + 50 }),
                    "boom" === this.type && this.flame.pos(t + 4, e + 5),
                    this.fallOffing && !this.fallOutOfViewerCalled && e > 480 + this.radius && ((this.fallOutOfViewerCalled = 1), s.postMessage(this, "fruit.fallOutOfViewer"));
            }),
            (T.prototype.show = function (t) {
                r.createTask({ start: t, duration: 500, data: [1e-5, 1, "show"], object: this, onTimeUpdate: this.onScaling, onTimeStart: this.onShowStart, recycle: this.anims });
            }),
            (T.prototype.hide = function (t) {
                "boom" === this.type &&
                    (this.anims.clear(), this.flame.remove(), r.createTask({ start: t, duration: 500, data: [1, 1e-5, "hide"], object: this, onTimeUpdate: this.onScaling, onTimeEnd: this.onHideEnd, recycle: this.anims }));
            }),
            (T.prototype.rotate = function (t, e) {
                (this.rotateSpeed = e || b[d(6)]), r.createTask({ start: t, duration: -1, object: this, onTimeUpdate: this.onRotating, recycle: this.anims });
            }),
            (T.prototype.broken = function (t) {
                var e;
                this.brokend ||
                    ((this.brokend = !0), (e = x.indexOf(this)) > -1 && x.splice(e, 1), "boom" !== this.type ? (c.showAt(this.originX, this.originY, t), l.create(this.originX, this.originY, v[this.type][6]), this.apart(t)) : this.hide());
            }),
            (T.prototype.pause = function () {
                this.brokend || (this.anims.clear(), "boom" == this.type && this.flame.remove());
            }),
            (T.prototype.apart = function (t) {
                this.anims.clear(), this.image.hide(), this.shadow.hide(), (this.aparted = !0);
                var e = v[this.type],
                    n = e[0].replace(".png", ""),
                    a = this.radius,
                    s = i.createImage.saturate(i, this.startX - a, this.startY - a, e[1], e[2]);
                (t = ((t % 180) + 360 + e[4]) % 360),
                    (this.bImage1 = s("fruit", n + "-1.png")),
                    (this.bImage2 = s("fruit", n + "-2.png")),
                    [this.bImage1, this.bImage2].invoke("rotate", t),
                    (this.apartAngle = t),
                    r.createTask({ start: 0, duration: g, object: this, onTimeUpdate: this.onBrokenDropUpdate, onTimeStart: this.onBrokenDropStart, onTimeEnd: this.onBrokenDropEnd, recycle: this.anims });
            }),
            (T.prototype.shotOut =
                ((e = [-1, 1]),
                function (t, i) {
                    return (
                        (this.shotOutStartX = this.originX),
                        (this.shotOutStartY = this.originY),
                        (this.shotOutEndX = (function (t, e) {
                            return ((t + e) / 2) >> 0;
                        })(this.originX, i)),
                        (this.shotOutEndY = m(this.startY - d(this.startY - 100), 200)),
                        (this.fallOffToX = i),
                        r.createTask({ start: t, duration: g, object: this, onTimeUpdate: this.onShotOuting, onTimeStart: this.onShotOutStart, onTimeEnd: this.onShotOutEnd, recycle: this.anims }),
                        "boom" != this.type && this.rotate(0, (d(180) + 90) * e[d(200)]),
                        this
                    );
                })),
            (T.prototype.fallOff = (function () {
                var t = [-1, 1],
                    e = 0;
                return function (i, n) {
                    if (!this.aparted && !this.brokend) {
                        this.fallOffing = 1;
                        "number" != typeof n && (n = this.originX + d(200) * t[e++ % 2]),
                            (this.fallTargetX = n),
                            (this.fallTargetY = 600),
                            r.createTask({ start: i, duration: g, object: this, onTimeUpdate: this.onFalling, onTimeStart: this.onFallStart, onTimeEnd: this.onFallEnd, recycle: this.anims });
                    }
                };
            })()),
            (T.prototype.remove = function () {
                var t;
                for (var e in (this.anims.clear(),
                this.image && (this.image.remove(), this.shadow.remove()),
                this.bImage1 && (this.bImage1.remove(), this.bImage2.remove()),
                "boom" === this.type && this.flame.remove(),
                (t = x.indexOf(this)) > -1 && x.splice(t, 1),
                this))
                    "function" == typeof this[e]
                        ? (this[e] = (function (t) {
                              return function () {
                                  throw new Error("method " + t + " has been removed");
                              };
                          })(e))
                        : delete this[e];
                s.postMessage(this, "fruit.remove");
            }),
            (T.prototype.onShowStart = function () {
                this.image.show();
            }),
            (T.prototype.onScaling = function (t, e, i, n) {
                this.image.scale((n = u(t, e, i - e, 500)), n), this.shadow.scale(n, n);
            }),
            (T.prototype.onHideEnd = function () {
                this.remove();
            }),
            (T.prototype.onRotateStart = function () {}),
            (T.prototype.onRotating = function (t) {
                this.image.rotate(((this.rotateSpeed * t) / 1e3) % 360, !0);
            }),
            (T.prototype.onBrokenDropUpdate = function (t) {
                var e = this.radius;
                this.bImage1.attr({ x: p(t, this.brokenPosX - e, this.brokenTargetX1, g), y: h(t, this.brokenPosY - e, this.brokenTargetY1 - this.brokenPosY + e, g) }).rotate(p(t, this.apartAngle, this.bImage1RotateAngle, g), !0),
                    this.bImage2.attr({ x: p(t, this.brokenPosX - e, this.brokenTargetX2, g), y: h(t, this.brokenPosY - e, this.brokenTargetY2 - this.brokenPosY + e, g) }).rotate(p(t, this.apartAngle, this.bImage2RotateAngle, g), !0);
            }),
            (T.prototype.onBrokenDropStart = function () {
                (this.brokenTargetX1 = -(d(200) + 75)),
                    (this.brokenTargetX2 = d(275)),
                    (this.brokenTargetY1 = 600),
                    (this.brokenTargetY2 = 600),
                    (this.brokenPosX = this.originX),
                    (this.brokenPosY = this.originY),
                    (this.bImage1RotateAngle = -d(150) - 50),
                    (this.bImage2RotateAngle = d(150) + 50);
                for (var t = x.length - 1; t >= 0; t--) x[t] === this && x.splice(t, 1);
            }),
            (T.prototype.onBrokenDropEnd = function () {
                this.remove();
            }),
            (T.prototype.onShotOuting = function (t) {
                this.pos(p(t, this.shotOutStartX, this.shotOutEndX - this.shotOutStartX, g), f(t, this.shotOutStartY, this.shotOutEndY - this.shotOutStartY, g));
            }),
            (T.prototype.onShotOutStart = function () {}),
            (T.prototype.onShotOutEnd = function () {
                this.fallOff(0, this.fallOffToX);
            }),
            (T.prototype.onFalling = function (t) {
                this.pos(p(t, this.brokenPosX, this.fallTargetX - this.brokenPosX, g), h(t, this.brokenPosY, this.fallTargetY - this.brokenPosY, g));
            }),
            (T.prototype.onFallStart = function () {
                (this.brokenPosX = this.originX), (this.brokenPosY = this.originY);
            }),
            (T.prototype.onFallEnd = function () {
                s.postMessage(this, "fruit.fallOff"), this.remove();
            }),//premiada-hard: alterar a quantidade com as metas da casa
            (t.create = function (t, e, i, n, r) {
                "number" == typeof t &&
                    ((n = i),
                    (i = e),
                    (e = t),
                    (t = (function () {
                        let t = d(13),
                            e = y[d(13)],
                            i = [
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "kiwi",
                                "abacaxi",
                            ][d(130)],
                            n = [
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "laranja",
                            ][d(115)],
                            r = [
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "morango",
                            ][d(85)],
                            a = [
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "pessego",
                            ][d(75)],
                            s = [
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "limao",
                            ][d(65)],
                            o = [
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "banana",
                            ][d(50)],
                            c = [
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "manga",
                            ][d(40)],
                            l = [
                                "apple",
                                "sandia",
                                "kiwi",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "sandia",
                                "apple",
                                "apple",
                                "cereja",
                            ][d(30)];
                        if (t <= 4) return "boom";
                        if (t <= 12) return "abacaxi" === e ? i : "laranja" === e ? n : "morango" === e ? r : "pessego" === e ? a : "limao" === e ? s : "banana" === e ? o : "manga" === e ? c : "cereja" === e ? l : e;
                    })()));
                var a = new T({ type: t, originX: e, originY: i, flameStart: r }).set(n);
                return x.unshift(a), a;
            }),
            (t.getFruitInView = function () {
                return x;
            }),
            (t.getDropTimeSetting = function () {
                return g;
            }),
            t
        );
    }),
    define("scripts/factory/juice.js", function (t) {
        var e = require("scripts/lib/ucren"),
            i = require("scripts/layer").getLayer("juice"),
            n = require("scripts/timeline"),
            r = require("scripts/lib/tween"),
            a = require("scripts/tools"),
            s = e.randomNumber,
            o = 1500,
            c = r.exponential.co,
            l = r.quadratic.co,
            u = Math.sin,
            p = Math.cos,
            h = 10;
        function f(t, e, i) {
            (this.originX = t), (this.originY = e), (this.color = i), (this.distance = s(200) + 100), (this.radius = 10), (this.dir = (s(360) * Math.PI) / 180);
        }
        return (
            (e.isIe || e.isSafari) && (h = 7),
            (f.prototype.render = function () {
                this.circle = i.circle(this.originX, this.originY, this.radius).attr({ fill: this.color, stroke: "none" });
            }),
            (f.prototype.sputter = function () {
                n.createTask({ start: 0, duration: o, object: this, onTimeUpdate: this.onTimeUpdate, onTimeEnd: this.onTimeEnd });
            }),
            (f.prototype.onTimeUpdate = function (t) {
                var e, i, n, r;
                (e = c(t, 0, this.distance, o)), (i = this.originX + e * p(this.dir)), (n = this.originY + e * u(this.dir) + l(t, 0, 200, o)), (r = c(t, 1, -1, o)), this.circle.attr({ cx: i, cy: n }).scale(r, r);
            }),
            (f.prototype.onTimeEnd = function () {
                this.circle.remove(), a.unsetObject(this);
            }),
            (t.create = function (t, e, i) {
                for (var n = 0; n < h; n++) this.createOne(t, e, i);
            }),
            (t.createOne = function (t, e, i) {
                if (i) {
                    var n = new f(t, e, i);
                    n.render(), n.sputter();
                }
            }),
            t
        );
    }),
    define("scripts/factory/rotate.js", function (t) {
        var e = require("scripts/layer"),
            i = require("scripts/timeline"),
            n = require("scripts/lib/ucren");
        return (
            (t.create = function (t, r, a, s, o, c, l, u) {
                var p,
                    h,
                    f,
                    d = {},
                    m = [12, -12][n.randomNumber(2)],
                    g = n.randomNumber(360);
                return (
                    (d.anims = []),
                    (d.set = function () {
                        p = e.createImage("default", t, r, a, s, o).scale(c, c).rotate(g, !0);
                    }),
                    (d.show = function (t) {
                        i.createTask({ start: t, duration: u, object: this, data: [c, 1], onTimeUpdate: this.onZooming, onTimeEnd: this.onShowEnd, recycle: this.anims });
                    }),
                    (d.hide = function (t) {
                        this.anims.clear(), i.createTask({ start: t, duration: u, object: this, data: [1, c], onTimeUpdate: this.onZooming, recycle: this.anims });
                    }),
                    (d.onShowEnd = function (t) {
                        this.anims.clear(), i.createTask({ start: 0, duration: -1, object: this, onTimeUpdate: d.onRotating, recycle: this.anims });
                    }),
                    (d.onZooming = (function () {
                        var t;
                        return function (e, i, n) {
                            p.scale((t = l(e, i, n - i, u)), t);
                        };
                    })()),
                    (d.onRotating =
                        ((h = 0),
                        (f = g),
                        function (t, e, i, n) {
                            (f = (f + ((t - h) / 1e3) * m) % 360), p.rotate(f, !0), (h = t);
                        })),
                    d
                );
            }),
            t
        );
    }),
    define("scripts/lib/buzz.js", function (t) {
        var e = {
            defaults: { autoplay: !1, duration: 5e3, formats: [], loop: !1, placeholder: "--", preload: "metadata", volume: 80 },
            types: { mp3: "audio/mpeg", ogg: "audio/ogg", wav: "audio/wav", aac: "audio/aac", m4a: "audio/x-m4a" },
            sounds: [],
            el: document.createElement("audio"),
            sound: function (t, i) {
                i = i || {};
                var n = 0,
                    r = [],
                    a = {},
                    s = e.isSupported();
                function o(t) {
                    for (var e = [], i = t.length - 1, n = 0; n <= i; n++) e.push({ start: t.start(i), end: t.end(i) });
                    return e;
                }
                function c(t) {
                    return t.split(".").pop();
                }
                function l(t, i) {
                    var n = document.createElement("source");
                    (n.src = i), e.types[c(i)] && (n.type = e.types[c(i)]), t.appendChild(n);
                }
                if (
                    ((this.load = function () {
                        return s ? (this.sound.load(), this) : this;
                    }),
                    (this.play = function () {
                        return s ? (this.sound.play(), this) : this;
                    }),
                    (this.togglePlay = function () {
                        return s ? (this.sound.paused ? this.sound.play() : this.sound.pause(), this) : this;
                    }),
                    (this.pause = function () {
                        return s ? (this.sound.pause(), this) : this;
                    }),
                    (this.isPaused = function () {
                        return s ? this.sound.paused : null;
                    }),
                    (this.stop = function () {
                        return s ? (this.setTime(this.getDuration()), this.sound.pause(), this) : this;
                    }),
                    (this.isEnded = function () {
                        return s ? this.sound.ended : null;
                    }),
                    (this.loop = function () {
                        return s
                            ? ((this.sound.loop = "loop"),
                              this.bind("ended.buzzloop", function () {
                                  (this.currentTime = 0), this.play();
                              }),
                              this)
                            : this;
                    }),
                    (this.unloop = function () {
                        return s ? (this.sound.removeAttribute("loop"), this.unbind("ended.buzzloop"), this) : this;
                    }),
                    (this.mute = function () {
                        return s ? ((this.sound.muted = !0), this) : this;
                    }),
                    (this.unmute = function () {
                        return s ? ((this.sound.muted = !1), this) : this;
                    }),
                    (this.toggleMute = function () {
                        return s ? ((this.sound.muted = !this.sound.muted), this) : this;
                    }),
                    (this.isMuted = function () {
                        return s ? this.sound.muted : null;
                    }),
                    (this.setVolume = function (t) {
                        return s ? (t < 0 && (t = 0), t > 100 && (t = 100), (this.volume = t), (this.sound.volume = t / 100), this) : this;
                    }),
                    (this.getVolume = function () {
                        return s ? this.volume : this;
                    }),
                    (this.increaseVolume = function (t) {
                        return this.setVolume(this.volume + (t || 1));
                    }),
                    (this.decreaseVolume = function (t) {
                        return this.setVolume(this.volume - (t || 1));
                    }),
                    (this.setTime = function (t) {
                        return s
                            ? (this.whenReady(function () {
                                  this.sound.currentTime = t;
                              }),
                              this)
                            : this;
                    }),
                    (this.getTime = function () {
                        if (!s) return null;
                        var t = Math.round(100 * this.sound.currentTime) / 100;
                        return isNaN(t) ? e.defaults.placeholder : t;
                    }),
                    (this.setPercent = function (t) {
                        return s ? this.setTime(e.fromPercent(t, this.sound.duration)) : this;
                    }),
                    (this.getPercent = function () {
                        if (!s) return null;
                        var t = Math.round(e.toPercent(this.sound.currentTime, this.sound.duration));
                        return isNaN(t) ? e.defaults.placeholder : t;
                    }),
                    (this.setSpeed = function (t) {
                        if (!s) return this;
                        this.sound.playbackRate = t;
                    }),
                    (this.getSpeed = function () {
                        return s ? this.sound.playbackRate : null;
                    }),
                    (this.getDuration = function () {
                        if (!s) return null;
                        var t = Math.round(100 * this.sound.duration) / 100;
                        return isNaN(t) ? e.defaults.placeholder : t;
                    }),
                    (this.getPlayed = function () {
                        return s ? o(this.sound.played) : null;
                    }),
                    (this.getBuffered = function () {
                        return s ? o(this.sound.buffered) : null;
                    }),
                    (this.getSeekable = function () {
                        return s ? o(this.sound.seekable) : null;
                    }),
                    (this.getErrorCode = function () {
                        return s && this.sound.error ? this.sound.error.code : 0;
                    }),
                    (this.getErrorMessage = function () {
                        if (!s) return null;
                        switch (this.getErrorCode()) {
                            case 1:
                                return "MEDIA_ERR_ABORTED";
                            case 2:
                                return "MEDIA_ERR_NETWORK";
                            case 3:
                                return "MEDIA_ERR_DECODE";
                            case 4:
                                return "MEDIA_ERR_SRC_NOT_SUPPORTED";
                            default:
                                return null;
                        }
                    }),
                    (this.getStateCode = function () {
                        return s ? this.sound.readyState : null;
                    }),
                    (this.getStateMessage = function () {
                        if (!s) return null;
                        switch (this.getStateCode()) {
                            case 0:
                                return "HAVE_NOTHING";
                            case 1:
                                return "HAVE_METADATA";
                            case 2:
                                return "HAVE_CURRENT_DATA";
                            case 3:
                                return "HAVE_FUTURE_DATA";
                            case 4:
                                return "HAVE_ENOUGH_DATA";
                            default:
                                return null;
                        }
                    }),
                    (this.getNetworkStateCode = function () {
                        return s ? this.sound.networkState : null;
                    }),
                    (this.getNetworkStateMessage = function () {
                        if (!s) return null;
                        switch (this.getNetworkStateCode()) {
                            case 0:
                                return "NETWORK_EMPTY";
                            case 1:
                                return "NETWORK_IDLE";
                            case 2:
                                return "NETWORK_LOADING";
                            case 3:
                                return "NETWORK_NO_SOURCE";
                            default:
                                return null;
                        }
                    }),
                    (this.set = function (t, e) {
                        return s ? ((this.sound[t] = e), this) : this;
                    }),
                    (this.get = function (t) {
                        return s ? (t ? this.sound[t] : this.sound) : null;
                    }),
                    (this.bind = function (t, e) {
                        if (!s) return this;
                        t = t.split(" ");
                        for (
                            var i = this,
                                n = function (t) {
                                    e.call(i, t);
                                },
                                a = 0;
                            a < t.length;
                            a++
                        ) {
                            var o = t[a],
                                c = o;
                            (o = c.split(".")[0]), r.push({ idx: c, func: n }), this.sound.addEventListener(o, n, !0);
                        }
                        return this;
                    }),
                    (this.unbind = function (t) {
                        if (!s) return this;
                        t = t.split(" ");
                        for (var e = 0; e < t.length; e++)
                            for (var i = t[e], n = i.split(".")[0], a = 0; a < r.length; a++) {
                                var o = r[a].idx.split(".");
                                (r[a].idx == i || (o[1] && o[1] == i.replace(".", ""))) && (this.sound.removeEventListener(n, r[a].func, !0), r.splice(a, 1));
                            }
                        return this;
                    }),
                    (this.bindOnce = function (t, e) {
                        if (!s) return this;
                        var i = this;
                        (a[n++] = !1),
                            this.bind(n + t, function () {
                                a[n] || ((a[n] = !0), e.call(i)), i.unbind(n + t);
                            });
                    }),
                    (this.trigger = function (t) {
                        if (!s) return this;
                        t = t.split(" ");
                        for (var e = 0; e < t.length; e++)
                            for (var i = t[e], n = 0; n < r.length; n++) {
                                var a = r[n].idx.split(".");
                                if (r[n].idx == i || (a[0] && a[0] == i.replace(".", ""))) {
                                    var o = document.createEvent("HTMLEvents");
                                    o.initEvent(a[0], !1, !0), this.sound.dispatchEvent(o);
                                }
                            }
                        return this;
                    }),
                    (this.fadeTo = function (t, i, n) {
                        if (!s) return this;
                        i instanceof Function ? ((n = i), (i = e.defaults.duration)) : (i = i || e.defaults.duration);
                        var r = this.volume,
                            a = i / Math.abs(r - t),
                            o = this;
                        function c() {
                            setTimeout(function () {
                                r < t && o.volume < t ? (o.setVolume((o.volume += 1)), c()) : r > t && o.volume > t ? (o.setVolume((o.volume -= 1)), c()) : n instanceof Function && n.apply(o);
                            }, a);
                        }
                        return (
                            this.play(),
                            this.whenReady(function () {
                                c();
                            }),
                            this
                        );
                    }),
                    (this.fadeIn = function (t, e) {
                        return s ? this.setVolume(0).fadeTo(100, t, e) : this;
                    }),
                    (this.fadeOut = function (t, e) {
                        return s ? this.fadeTo(0, t, e) : this;
                    }),
                    (this.fadeWith = function (t, e) {
                        return s
                            ? (this.fadeOut(e, function () {
                                  this.stop();
                              }),
                              t.play().fadeIn(e),
                              this)
                            : this;
                    }),
                    (this.whenReady = function (t) {
                        if (!s) return null;
                        var e = this;
                        0 === this.sound.readyState
                            ? this.bind("canplay.buzzwhenready", function () {
                                  t.call(e);
                              })
                            : t.call(e);
                    }),
                    s && t)
                ) {
                    for (var u in e.defaults) e.defaults.hasOwnProperty(u) && (i[u] = i[u] || e.defaults[u]);
                    if (((this.sound = document.createElement("audio")), t instanceof Array)) for (var p in t) t.hasOwnProperty(p) && l(this.sound, t[p]);
                    else if (i.formats.length) for (var h in i.formats) i.formats.hasOwnProperty(h) && l(this.sound, t + "." + i.formats[h]);
                    else l(this.sound, t);
                    i.loop && this.loop(),
                        i.autoplay && (this.sound.autoplay = "autoplay"),
                        !0 === i.preload ? (this.sound.preload = "auto") : !1 === i.preload ? (this.sound.preload = "none") : (this.sound.preload = i.preload),
                        this.setVolume(i.volume),
                        e.sounds.push(this);
                }
            },
            group: function (t) {
                function e() {
                    for (var e = i(null, arguments), n = e.shift(), r = 0; r < t.length; r++) t[r][n].apply(t[r], e);
                }
                function i(t, e) {
                    return t instanceof Array ? t : Array.prototype.slice.call(e);
                }
                (t = i(t, arguments)),
                    (this.getSounds = function () {
                        return t;
                    }),
                    (this.add = function (e) {
                        e = i(e, arguments);
                        for (var n = 0; n < e.length; n++) t.push(e[n]);
                    }),
                    (this.remove = function (e) {
                        e = i(e, arguments);
                        for (var n = 0; n < e.length; n++)
                            for (var r = 0; r < t.length; r++)
                                if (t[r] == e[n]) {
                                    delete t[r];
                                    break;
                                }
                    }),
                    (this.load = function () {
                        return e("load"), this;
                    }),
                    (this.play = function () {
                        return e("play"), this;
                    }),
                    (this.togglePlay = function () {
                        return e("togglePlay"), this;
                    }),
                    (this.pause = function (t) {
                        return e("pause", t), this;
                    }),
                    (this.stop = function () {
                        return e("stop"), this;
                    }),
                    (this.mute = function () {
                        return e("mute"), this;
                    }),
                    (this.unmute = function () {
                        return e("unmute"), this;
                    }),
                    (this.toggleMute = function () {
                        return e("toggleMute"), this;
                    }),
                    (this.setVolume = function (t) {
                        return e("setVolume", t), this;
                    }),
                    (this.increaseVolume = function (t) {
                        return e("increaseVolume", t), this;
                    }),
                    (this.decreaseVolume = function (t) {
                        return e("decreaseVolume", t), this;
                    }),
                    (this.loop = function () {
                        return e("loop"), this;
                    }),
                    (this.unloop = function () {
                        return e("unloop"), this;
                    }),
                    (this.setTime = function (t) {
                        return e("setTime", t), this;
                    }),
                    (this.setduration = function (t) {
                        return e("setduration", t), this;
                    }),
                    (this.set = function (t, i) {
                        return e("set", t, i), this;
                    }),
                    (this.bind = function (t, i) {
                        return e("bind", t, i), this;
                    }),
                    (this.unbind = function (t) {
                        return e("unbind", t), this;
                    }),
                    (this.bindOnce = function (t, i) {
                        return e("bindOnce", t, i), this;
                    }),
                    (this.trigger = function (t) {
                        return e("trigger", t), this;
                    }),
                    (this.fade = function (t, i, n, r) {
                        return e("fade", t, i, n, r), this;
                    }),
                    (this.fadeIn = function (t, i) {
                        return e("fadeIn", t, i), this;
                    }),
                    (this.fadeOut = function (t, i) {
                        return e("fadeOut", t, i), this;
                    });
            },
            all: function () {
                return new e.group(e.sounds);
            },
            isSupported: function () {
                return !!e.el.canPlayType;
            },
            isOGGSupported: function () {
                return !!e.el.canPlayType && e.el.canPlayType('audio/ogg; codecs="vorbis"');
            },
            isWAVSupported: function () {
                return !!e.el.canPlayType && e.el.canPlayType('audio/wav; codecs="1"');
            },
            isMP3Supported: function () {
                return !!e.el.canPlayType && e.el.canPlayType("audio/mpeg;");
            },
            isAACSupported: function () {
                return !!e.el.canPlayType && (e.el.canPlayType("audio/x-m4a;") || e.el.canPlayType("audio/aac;"));
            },
            toTimer: function (t, e) {
                var i, n, r;
                return (
                    (i = Math.floor(t / 3600)),
                    (i = isNaN(i) ? "--" : i >= 10 ? i : "0" + i),
                    (n = e ? Math.floor((t / 60) % 60) : Math.floor(t / 60)),
                    (n = isNaN(n) ? "--" : n >= 10 ? n : "0" + n),
                    (r = Math.floor(t % 60)),
                    (r = isNaN(r) ? "--" : r >= 10 ? r : "0" + r),
                    e ? i + ":" + n + ":" + r : n + ":" + r
                );
            },
            fromTimer: function (t) {
                var e = t.toString().split(":");
                return e && 3 == e.length && (t = 3600 * parseInt(e[0], 10) + 60 * parseInt(e[1], 10) + parseInt(e[2], 10)), e && 2 == e.length && (t = 60 * parseInt(e[0], 10) + parseInt(e[1], 10)), t;
            },
            toPercent: function (t, e, i) {
                var n = Math.pow(10, i || 0);
                return Math.round(((100 * t) / e) * n) / n;
            },
            fromPercent: function (t, e, i) {
                var n = Math.pow(10, i || 0);
                return Math.round((e / 100) * t * n) / n;
            },
        };
        return e;
    }),
    define("scripts/lib/raphael.js", function (t) {
        var e,
            i = {};
        return (
            (function () {
                function t() {
                    if (t.is(arguments[0], O)) {
                        for (var e = arguments[0], i = Gt[d](t, e.splice(0, 3 + t.is(e[0], C))), n = i.set(), r = 0, s = e[E]; r < s; r++) {
                            var o = e[r] || {};
                            a[c](o.type) && n[P](i[o.type]().attr(o));
                        }
                        return n;
                    }
                    return Gt[d](t, arguments);
                }
                t.version = "1.5.2";
                var n,
                    r = /[, ]+/,
                    a = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 },
                    s = /\{(\d+)\}/g,
                    o = "prototype",
                    c = "hasOwnProperty",
                    l = document,
                    u = i,
                    p = { was: Object[o][c].call(u, "Raphael"), is: u.Raphael },
                    h = function () {
                        this.customAttributes = {};
                    },
                    f = "appendChild",
                    d = "apply",
                    m = "concat",
                    g = "createTouch" in l,
                    v = "",
                    y = " ",
                    b = String,
                    x = "split",
                    w = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[x](y),
                    k = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" },
                    T = "join",
                    E = "length",
                    S = b[o].toLowerCase,
                    q = Math,
                    j = q.max,
                    A = q.min,
                    M = q.abs,
                    N = q.pow,
                    U = q.PI,
                    C = "number",
                    I = "string",
                    O = "array",
                    _ = "toString",
                    B = "fill",
                    L = Object[o][_],
                    P = "push",
                    R = /^url\(['"]?([^\)]+?)['"]?\)$/i,
                    X = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
                    D = { NaN: 1, Infinity: 1, "-Infinity": 1 },
                    Y = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
                    V = q.round,
                    H = "setAttribute",
                    z = parseFloat,
                    F = parseInt,
                    G = " progid:DXImageTransform.Microsoft",
                    W = b[o].toUpperCase,
                    $ = {
                        blur: 0,
                        "clip-rect": "0 0 1e9 1e9",
                        cursor: "default",
                        cx: 0,
                        cy: 0,
                        fill: "#fff",
                        "fill-opacity": 1,
                        font: '10px "Arial"',
                        "font-family": '"Arial"',
                        "font-size": "10",
                        "font-style": "normal",
                        "font-weight": 400,
                        gradient: 0,
                        height: 0,
                        href: "http://raphaeljs.com/",
                        opacity: 1,
                        path: "M0,0",
                        r: 0,
                        rotation: 0,
                        rx: 0,
                        ry: 0,
                        scale: "1 1",
                        src: "",
                        stroke: "#000",
                        "stroke-dasharray": "",
                        "stroke-linecap": "butt",
                        "stroke-linejoin": "butt",
                        "stroke-miterlimit": 0,
                        "stroke-opacity": 1,
                        "stroke-width": 1,
                        target: "_blank",
                        "text-anchor": "middle",
                        title: "Raphael",
                        translation: "0 0",
                        width: 0,
                        x: 0,
                        y: 0,
                    },
                    Z = {
                        along: "along",
                        blur: C,
                        "clip-rect": "csv",
                        cx: C,
                        cy: C,
                        fill: "colour",
                        "fill-opacity": C,
                        "font-size": C,
                        height: C,
                        opacity: C,
                        path: "path",
                        r: C,
                        rotation: "csv",
                        rx: C,
                        ry: C,
                        scale: "csv",
                        stroke: "colour",
                        "stroke-opacity": C,
                        "stroke-width": C,
                        translation: "csv",
                        width: C,
                        x: C,
                        y: C,
                    },
                    K = "replace",
                    Q = /^(from|to|\d+%?)$/,
                    J = /\s*,\s*/,
                    tt = { hs: 1, rg: 1 },
                    et = /,?([achlmqrstvxz]),?/gi,
                    it = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/gi,
                    nt = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/gi,
                    rt = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,
                    at = function (t, e) {
                        return t.key - e.key;
                    };
                if (((t.type = u.SVGAngle || l.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML"), "VML" == t.type)) {
                    var st,
                        ot = l.createElement("div");
                    if (((ot.innerHTML = '<v:shape adj="1"/>'), ((st = ot.firstChild).style.behavior = "url(#default#VML)"), !st || "object" != typeof st.adj)) return (t.type = null);
                    ot = null;
                }
                function ct() {
                    for (var t = [], e = 0; e < 32; e++) t[e] = (~~(16 * q.random()))[_](16);
                    return (t[12] = 4), (t[16] = ((3 & t[16]) | 8)[_](16)), "r-" + t[T]("");
                }
                (t.svg = !(t.vml = "VML" == t.type)),
                    (h[o] = t[o]),
                    (n = h[o]),
                    (t._id = 0),
                    (t._oid = 0),
                    (t.fn = {}),
                    (t.is = function (t, e) {
                        return "finite" == (e = S.call(e))
                            ? !D[c](+t)
                            : ("null" == e && null === t) || e == typeof t || ("object" == e && t === Object(t)) || ("array" == e && Array.isArray && Array.isArray(t)) || L.call(t).slice(8, -1).toLowerCase() == e;
                    }),
                    (t.angle = function (e, i, n, r, a, s) {
                        if (null == a) {
                            var o = e - n,
                                c = i - r;
                            return o || c ? (180 * (o < 0) + (180 * q.atan(-c / -o)) / U + 360) % 360 : 0;
                        }
                        return t.angle(e, i, a, s) - t.angle(n, r, a, s);
                    }),
                    (t.rad = function (t) {
                        return ((t % 360) * U) / 180;
                    }),
                    (t.deg = function (t) {
                        return ((180 * t) / U) % 360;
                    }),
                    (t.snapTo = function (e, i, n) {
                        if (((n = t.is(n, "finite") ? n : 10), t.is(e, O))) {
                            for (var r = e.length; r--; ) if (M(e[r] - i) <= n) return e[r];
                        } else {
                            var a = i % (e = +e);
                            if (a < n) return i - a;
                            if (a > e - n) return i - a + e;
                        }
                        return i;
                    }),
                    (t.setWindow = function (t) {
                        l = (u = t).document;
                    });
                var lt = function (e) {
                        if (t.vml) {
                            var i,
                                n = /^\s+|\s+$/g;
                            try {
                                var r = new ActiveXObject("htmlfile");
                                r.write("<body>"), r.close(), (i = r.body);
                            } catch (t) {
                                i = createPopup().document.body;
                            }
                            var a = i.createTextRange();
                            lt = ft(function (t) {
                                try {
                                    i.style.color = b(t)[K](n, v);
                                    var e = a.queryCommandValue("ForeColor");
                                    return "#" + ("000000" + (e = ((255 & e) << 16) | (65280 & e) | ((16711680 & e) >>> 16))[_](16)).slice(-6);
                                } catch (t) {
                                    return "none";
                                }
                            });
                        } else {
                            var s = l.createElement("i");
                            (s.title = "Raphaël Colour Picker"),
                                (s.style.display = "none"),
                                l.body[f](s),
                                (lt = ft(function (t) {
                                    return (s.style.color = t), l.defaultView.getComputedStyle(s, v).getPropertyValue("color");
                                }));
                        }
                        return lt(e);
                    },
                    ut = function () {
                        return "hsb(" + [this.h, this.s, this.b] + ")";
                    },
                    pt = function () {
                        return "hsl(" + [this.h, this.s, this.l] + ")";
                    },
                    ht = function () {
                        return this.hex;
                    };
                function ft(t, e, i) {
                    return function n() {
                        var r = Array[o].slice.call(arguments, 0),
                            a = r[T]("►"),
                            s = (n.cache = n.cache || {}),
                            l = (n.count = n.count || []);
                        return s[c](a) || (l[E] >= 1e3 && delete s[l.shift()], l[P](a), (s[a] = t[d](e, r))), i ? i(s[a]) : s[a];
                    };
                }
                (t.hsb2rgb = function (e, i, n, r) {
                    return t.is(e, "object") && "h" in e && "s" in e && "b" in e && ((n = e.b), (i = e.s), (r = (e = e.h).o)), t.hsl2rgb(e, i, n / 2, r);
                }),
                    (t.hsl2rgb = function (e, i, n, r) {
                        t.is(e, "object") && "h" in e && "s" in e && "l" in e && ((n = e.l), (i = e.s), (e = e.h)), (e > 1 || i > 1 || n > 1) && ((e /= 360), (i /= 100), (n /= 100));
                        var a,
                            s,
                            o,
                            c = {},
                            l = ["r", "g", "b"];
                        if (i) {
                            s = 2 * n - (a = n < 0.5 ? n * (1 + i) : n + i - n * i);
                            for (var u = 0; u < 3; u++) (o = e + (1 / 3) * -(u - 1)) < 0 && o++, o > 1 && o--, (c[l[u]] = 6 * o < 1 ? s + 6 * (a - s) * o : 2 * o < 1 ? a : 3 * o < 2 ? s + (a - s) * (2 / 3 - o) * 6 : s);
                        } else c = { r: n, g: n, b: n };
                        return (c.r *= 255), (c.g *= 255), (c.b *= 255), (c.hex = "#" + (16777216 | c.b | (c.g << 8) | (c.r << 16)).toString(16).slice(1)), t.is(r, "finite") && (c.opacity = r), (c.toString = ht), c;
                    }),
                    (t.rgb2hsb = function (e, i, n) {
                        if ((null == i && t.is(e, "object") && "r" in e && "g" in e && "b" in e && ((n = e.b), (i = e.g), (e = e.r)), null == i && t.is(e, I))) {
                            var r = t.getRGB(e);
                            (e = r.r), (i = r.g), (n = r.b);
                        }
                        (e > 1 || i > 1 || n > 1) && ((e /= 255), (i /= 255), (n /= 255));
                        var a,
                            s = j(e, i, n),
                            o = A(e, i, n);
                        if (o == s) return { h: 0, s: 0, b: s, toString: ut };
                        var c = s - o;
                        return (a = e == s ? (i - n) / c : i == s ? 2 + (n - e) / c : 4 + (e - i) / c), (a /= 6) < 0 && a++, a > 1 && a--, { h: a, s: c / s, b: s, toString: ut };
                    }),
                    (t.rgb2hsl = function (e, i, n) {
                        if ((null == i && t.is(e, "object") && "r" in e && "g" in e && "b" in e && ((n = e.b), (i = e.g), (e = e.r)), null == i && t.is(e, I))) {
                            var r = t.getRGB(e);
                            (e = r.r), (i = r.g), (n = r.b);
                        }
                        (e > 1 || i > 1 || n > 1) && ((e /= 255), (i /= 255), (n /= 255));
                        var a,
                            s,
                            o = j(e, i, n),
                            c = A(e, i, n),
                            l = (o + c) / 2;
                        if (c == o) s = { h: 0, s: 0, l: l };
                        else {
                            var u = o - c;
                            (a = e == o ? (i - n) / u : i == o ? 2 + (n - e) / u : 4 + (e - i) / u), (a /= 6) < 0 && a++, a > 1 && a--, (s = { h: a, s: l < 0.5 ? u / (o + c) : u / (2 - o - c), l: l });
                        }
                        return (s.toString = pt), s;
                    }),
                    (t._path2string = function () {
                        return this.join(",")[K](et, "$1");
                    }),
                    (t.getRGB = ft(function (e) {
                        if (!e || (e = b(e)).indexOf("-") + 1) return { r: -1, g: -1, b: -1, hex: "none", error: 1 };
                        if ("none" == e) return { r: -1, g: -1, b: -1, hex: "none" };
                        !tt[c](e.toLowerCase().substring(0, 2)) && "#" != e.charAt() && (e = lt(e));
                        var i,
                            n,
                            r,
                            a,
                            s,
                            o,
                            l = e.match(X);
                        return l
                            ? (l[2] && ((r = F(l[2].substring(5), 16)), (n = F(l[2].substring(3, 5), 16)), (i = F(l[2].substring(1, 3), 16))),
                              l[3] && ((r = F((s = l[3].charAt(3)) + s, 16)), (n = F((s = l[3].charAt(2)) + s, 16)), (i = F((s = l[3].charAt(1)) + s, 16))),
                              l[4] &&
                                  ((o = l[4][x](J)),
                                  (i = z(o[0])),
                                  "%" == o[0].slice(-1) && (i *= 2.55),
                                  (n = z(o[1])),
                                  "%" == o[1].slice(-1) && (n *= 2.55),
                                  (r = z(o[2])),
                                  "%" == o[2].slice(-1) && (r *= 2.55),
                                  "rgba" == l[1].toLowerCase().slice(0, 4) && (a = z(o[3])),
                                  o[3] && "%" == o[3].slice(-1) && (a /= 100)),
                              l[5]
                                  ? ((o = l[5][x](J)),
                                    (i = z(o[0])),
                                    "%" == o[0].slice(-1) && (i *= 2.55),
                                    (n = z(o[1])),
                                    "%" == o[1].slice(-1) && (n *= 2.55),
                                    (r = z(o[2])),
                                    "%" == o[2].slice(-1) && (r *= 2.55),
                                    ("deg" == o[0].slice(-3) || "°" == o[0].slice(-1)) && (i /= 360),
                                    "hsba" == l[1].toLowerCase().slice(0, 4) && (a = z(o[3])),
                                    o[3] && "%" == o[3].slice(-1) && (a /= 100),
                                    t.hsb2rgb(i, n, r, a))
                                  : l[6]
                                  ? ((o = l[6][x](J)),
                                    (i = z(o[0])),
                                    "%" == o[0].slice(-1) && (i *= 2.55),
                                    (n = z(o[1])),
                                    "%" == o[1].slice(-1) && (n *= 2.55),
                                    (r = z(o[2])),
                                    "%" == o[2].slice(-1) && (r *= 2.55),
                                    ("deg" == o[0].slice(-3) || "°" == o[0].slice(-1)) && (i /= 360),
                                    "hsla" == l[1].toLowerCase().slice(0, 4) && (a = z(o[3])),
                                    o[3] && "%" == o[3].slice(-1) && (a /= 100),
                                    t.hsl2rgb(i, n, r, a))
                                  : (((l = { r: i, g: n, b: r }).hex = "#" + (16777216 | r | (n << 8) | (i << 16)).toString(16).slice(1)), t.is(a, "finite") && (l.opacity = a), l))
                            : { r: -1, g: -1, b: -1, hex: "none", error: 1 };
                    }, t)),
                    (t.getColor = function (t) {
                        var e = (this.getColor.start = this.getColor.start || { h: 0, s: 1, b: t || 0.75 }),
                            i = this.hsb2rgb(e.h, e.s, e.b);
                        return (e.h += 0.075), e.h > 1 && ((e.h = 0), (e.s -= 0.2), e.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: e.b })), i.hex;
                    }),
                    (t.getColor.reset = function () {
                        delete this.start;
                    }),
                    (t.parsePathString = ft(function (e) {
                        if (!e) return null;
                        var i = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 },
                            n = [];
                        return (
                            t.is(e, O) && t.is(e[0], O) && (n = mt(e)),
                            n[E] ||
                                b(e)[K](it, function (t, e, r) {
                                    var a = [],
                                        s = S.call(e);
                                    for (
                                        r[K](nt, function (t, e) {
                                            e && a[P](+e);
                                        }),
                                            "m" == s && a[E] > 2 && (n[P]([e][m](a.splice(0, 2))), (s = "l"), (e = "m" == e ? "l" : "L"));
                                        a[E] >= i[s] && (n[P]([e][m](a.splice(0, i[s]))), i[s]);

                                    );
                                }),
                            (n[_] = t._path2string),
                            n
                        );
                    })),
                    (t.findDotsAtSegment = function (t, e, i, n, r, a, s, o, c) {
                        var l = 1 - c,
                            u = N(l, 3) * t + 3 * N(l, 2) * c * i + 3 * l * c * c * r + N(c, 3) * s,
                            p = N(l, 3) * e + 3 * N(l, 2) * c * n + 3 * l * c * c * a + N(c, 3) * o,
                            h = t + 2 * c * (i - t) + c * c * (r - 2 * i + t),
                            f = e + 2 * c * (n - e) + c * c * (a - 2 * n + e),
                            d = i + 2 * c * (r - i) + c * c * (s - 2 * r + i),
                            m = n + 2 * c * (a - n) + c * c * (o - 2 * a + n),
                            g = (1 - c) * t + c * i,
                            v = (1 - c) * e + c * n,
                            y = (1 - c) * r + c * s,
                            b = (1 - c) * a + c * o,
                            x = 90 - (180 * q.atan((h - d) / (f - m))) / U;
                        return (h > d || f < m) && (x += 180), { x: u, y: p, m: { x: h, y: f }, n: { x: d, y: m }, start: { x: g, y: v }, end: { x: y, y: b }, alpha: x };
                    });
                var dt = ft(function (t) {
                        if (!t) return { x: 0, y: 0, width: 0, height: 0 };
                        for (var e, i = 0, n = 0, r = [], a = [], s = 0, o = (t = Tt(t))[E]; s < o; s++)
                            if ("M" == (e = t[s])[0]) (i = e[1]), (n = e[2]), r[P](i), a[P](n);
                            else {
                                var c = kt(i, n, e[1], e[2], e[3], e[4], e[5], e[6]);
                                (r = r[m](c.min.x, c.max.x)), (a = a[m](c.min.y, c.max.y)), (i = e[5]), (n = e[6]);
                            }
                        var l = A[d](0, r),
                            u = A[d](0, a);
                        return { x: l, y: u, width: j[d](0, r) - l, height: j[d](0, a) - u };
                    }),
                    mt = function (e) {
                        var i = [];
                        (t.is(e, O) && t.is(e && e[0], O)) || (e = t.parsePathString(e));
                        for (var n = 0, r = e[E]; n < r; n++) {
                            i[n] = [];
                            for (var a = 0, s = e[n][E]; a < s; a++) i[n][a] = e[n][a];
                        }
                        return (i[_] = t._path2string), i;
                    },
                    gt = ft(
                        function (e) {
                            (t.is(e, O) && t.is(e && e[0], O)) || (e = t.parsePathString(e));
                            var i = [],
                                n = 0,
                                r = 0,
                                a = 0,
                                s = 0,
                                o = 0;
                            "M" == e[0][0] && ((a = n = e[0][1]), (s = r = e[0][2]), o++, i[P](["M", n, r]));
                            for (var c = o, l = e[E]; c < l; c++) {
                                var u = (i[c] = []),
                                    p = e[c];
                                if (p[0] != S.call(p[0]))
                                    switch (((u[0] = S.call(p[0])), u[0])) {
                                        case "a":
                                            (u[1] = p[1]), (u[2] = p[2]), (u[3] = p[3]), (u[4] = p[4]), (u[5] = p[5]), (u[6] = +(p[6] - n).toFixed(3)), (u[7] = +(p[7] - r).toFixed(3));
                                            break;
                                        case "v":
                                            u[1] = +(p[1] - r).toFixed(3);
                                            break;
                                        case "m":
                                            (a = p[1]), (s = p[2]);
                                        default:
                                            for (var h = 1, f = p[E]; h < f; h++) u[h] = +(p[h] - (h % 2 ? n : r)).toFixed(3);
                                    }
                                else {
                                    (u = i[c] = []), "m" == p[0] && ((a = p[1] + n), (s = p[2] + r));
                                    for (var d = 0, m = p[E]; d < m; d++) i[c][d] = p[d];
                                }
                                var g = i[c][E];
                                switch (i[c][0]) {
                                    case "z":
                                        (n = a), (r = s);
                                        break;
                                    case "h":
                                        n += +i[c][g - 1];
                                        break;
                                    case "v":
                                        r += +i[c][g - 1];
                                        break;
                                    default:
                                        (n += +i[c][g - 2]), (r += +i[c][g - 1]);
                                }
                            }
                            return (i[_] = t._path2string), i;
                        },
                        0,
                        mt
                    ),
                    vt = ft(
                        function (e) {
                            (t.is(e, O) && t.is(e && e[0], O)) || (e = t.parsePathString(e));
                            var i = [],
                                n = 0,
                                r = 0,
                                a = 0,
                                s = 0,
                                o = 0;
                            "M" == e[0][0] && ((a = n = +e[0][1]), (s = r = +e[0][2]), o++, (i[0] = ["M", n, r]));
                            for (var c = o, l = e[E]; c < l; c++) {
                                var u = (i[c] = []),
                                    p = e[c];
                                if (p[0] != W.call(p[0]))
                                    switch (((u[0] = W.call(p[0])), u[0])) {
                                        case "A":
                                            (u[1] = p[1]), (u[2] = p[2]), (u[3] = p[3]), (u[4] = p[4]), (u[5] = p[5]), (u[6] = +(p[6] + n)), (u[7] = +(p[7] + r));
                                            break;
                                        case "V":
                                            u[1] = +p[1] + r;
                                            break;
                                        case "H":
                                            u[1] = +p[1] + n;
                                            break;
                                        case "M":
                                            (a = +p[1] + n), (s = +p[2] + r);
                                        default:
                                            for (var h = 1, f = p[E]; h < f; h++) u[h] = +p[h] + (h % 2 ? n : r);
                                    }
                                else for (var d = 0, m = p[E]; d < m; d++) i[c][d] = p[d];
                                switch (u[0]) {
                                    case "Z":
                                        (n = a), (r = s);
                                        break;
                                    case "H":
                                        n = u[1];
                                        break;
                                    case "V":
                                        r = u[1];
                                        break;
                                    case "M":
                                        (a = i[c][i[c][E] - 2]), (s = i[c][i[c][E] - 1]);
                                    default:
                                        (n = i[c][i[c][E] - 2]), (r = i[c][i[c][E] - 1]);
                                }
                            }
                            return (i[_] = t._path2string), i;
                        },
                        null,
                        mt
                    ),
                    yt = function (t, e, i, n) {
                        return [t, e, i, n, i, n];
                    },
                    bt = function (t, e, i, n, r, a) {
                        var s = 1 / 3,
                            o = 2 / 3;
                        return [s * t + o * i, s * e + o * n, s * r + o * i, s * a + o * n, r, a];
                    },
                    xt = function (t, e, i, n, r, a, s, o, c, l) {
                        var u,
                            p = (120 * U) / 180,
                            h = (U / 180) * (+r || 0),
                            f = [],
                            d = ft(function (t, e, i) {
                                return { x: t * q.cos(i) - e * q.sin(i), y: t * q.sin(i) + e * q.cos(i) };
                            });
                        if (l) (A = l[0]), (N = l[1]), (S = l[2]), (j = l[3]);
                        else {
                            (t = (u = d(t, e, -h)).x), (e = u.y), (o = (u = d(o, c, -h)).x), (c = u.y);
                            q.cos((U / 180) * r), q.sin((U / 180) * r);
                            var g = (t - o) / 2,
                                v = (e - c) / 2,
                                y = (g * g) / (i * i) + (v * v) / (n * n);
                            y > 1 && ((i *= y = q.sqrt(y)), (n *= y));
                            var b = i * i,
                                w = n * n,
                                k = (a == s ? -1 : 1) * q.sqrt(M((b * w - b * v * v - w * g * g) / (b * v * v + w * g * g))),
                                S = (k * i * v) / n + (t + o) / 2,
                                j = (k * -n * g) / i + (e + c) / 2,
                                A = q.asin(((e - j) / n).toFixed(9)),
                                N = q.asin(((c - j) / n).toFixed(9));
                            (A = t < S ? U - A : A) < 0 && (A = 2 * U + A), (N = o < S ? U - N : N) < 0 && (N = 2 * U + N), s && A > N && (A -= 2 * U), !s && N > A && (N -= 2 * U);
                        }
                        var C = N - A;
                        if (M(C) > p) {
                            var I = N,
                                O = o,
                                _ = c;
                            (N = A + p * (s && N > A ? 1 : -1)), (o = S + i * q.cos(N)), (c = j + n * q.sin(N)), (f = xt(o, c, i, n, r, 0, s, O, _, [N, I, S, j]));
                        }
                        C = N - A;
                        var B = q.cos(A),
                            L = q.sin(A),
                            P = q.cos(N),
                            R = q.sin(N),
                            X = q.tan(C / 4),
                            D = (4 / 3) * i * X,
                            Y = (4 / 3) * n * X,
                            V = [t, e],
                            H = [t + D * L, e - Y * B],
                            z = [o + D * R, c - Y * P],
                            F = [o, c];
                        if (((H[0] = 2 * V[0] - H[0]), (H[1] = 2 * V[1] - H[1]), l)) return [H, z, F][m](f);
                        for (var G = [], W = 0, $ = (f = [H, z, F][m](f)[T]()[x](","))[E]; W < $; W++) G[W] = W % 2 ? d(f[W - 1], f[W], h).y : d(f[W], f[W + 1], h).x;
                        return G;
                    },
                    wt = function (t, e, i, n, r, a, s, o, c) {
                        var l = 1 - c;
                        return { x: N(l, 3) * t + 3 * N(l, 2) * c * i + 3 * l * c * c * r + N(c, 3) * s, y: N(l, 3) * e + 3 * N(l, 2) * c * n + 3 * l * c * c * a + N(c, 3) * o };
                    },
                    kt = ft(function (t, e, i, n, r, a, s, o) {
                        var c,
                            l = r - 2 * i + t - (s - 2 * r + i),
                            u = 2 * (i - t) - 2 * (r - i),
                            p = t - i,
                            h = (-u + q.sqrt(u * u - 4 * l * p)) / 2 / l,
                            f = (-u - q.sqrt(u * u - 4 * l * p)) / 2 / l,
                            m = [e, o],
                            g = [t, s];
                        return (
                            M(h) > "1e12" && (h = 0.5),
                            M(f) > "1e12" && (f = 0.5),
                            h > 0 && h < 1 && ((c = wt(t, e, i, n, r, a, s, o, h)), g[P](c.x), m[P](c.y)),
                            f > 0 && f < 1 && ((c = wt(t, e, i, n, r, a, s, o, f)), g[P](c.x), m[P](c.y)),
                            (l = a - 2 * n + e - (o - 2 * a + n)),
                            (p = e - n),
                            (h = (-(u = 2 * (n - e) - 2 * (a - n)) + q.sqrt(u * u - 4 * l * p)) / 2 / l),
                            (f = (-u - q.sqrt(u * u - 4 * l * p)) / 2 / l),
                            M(h) > "1e12" && (h = 0.5),
                            M(f) > "1e12" && (f = 0.5),
                            h > 0 && h < 1 && ((c = wt(t, e, i, n, r, a, s, o, h)), g[P](c.x), m[P](c.y)),
                            f > 0 && f < 1 && ((c = wt(t, e, i, n, r, a, s, o, f)), g[P](c.x), m[P](c.y)),
                            { min: { x: A[d](0, g), y: A[d](0, m) }, max: { x: j[d](0, g), y: j[d](0, m) } }
                        );
                    }),
                    Tt = ft(
                        function (t, e) {
                            for (
                                var i = vt(t),
                                    n = e && vt(e),
                                    r = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
                                    a = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
                                    s = function (t, e) {
                                        if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                                        switch ((!(t[0] in { T: 1, Q: 1 }) && (e.qx = e.qy = null), t[0])) {
                                            case "M":
                                                (e.X = t[1]), (e.Y = t[2]);
                                                break;
                                            case "A":
                                                t = ["C"][m](xt[d](0, [e.x, e.y][m](t.slice(1))));
                                                break;
                                            case "S":
                                                t = ["C", e.x + (e.x - (e.bx || e.x)), e.y + (e.y - (e.by || e.y))][m](t.slice(1));
                                                break;
                                            case "T":
                                                (e.qx = e.x + (e.x - (e.qx || e.x))), (e.qy = e.y + (e.y - (e.qy || e.y))), (t = ["C"][m](bt(e.x, e.y, e.qx, e.qy, t[1], t[2])));
                                                break;
                                            case "Q":
                                                (e.qx = t[1]), (e.qy = t[2]), (t = ["C"][m](bt(e.x, e.y, t[1], t[2], t[3], t[4])));
                                                break;
                                            case "L":
                                                t = ["C"][m](yt(e.x, e.y, t[1], t[2]));
                                                break;
                                            case "H":
                                                t = ["C"][m](yt(e.x, e.y, t[1], e.y));
                                                break;
                                            case "V":
                                                t = ["C"][m](yt(e.x, e.y, e.x, t[1]));
                                                break;
                                            case "Z":
                                                t = ["C"][m](yt(e.x, e.y, e.X, e.Y));
                                                break;
                                        }
                                        return t;
                                    },
                                    o = function (t, e) {
                                        if (t[e][E] > 7) {
                                            t[e].shift();
                                            for (var r = t[e]; r[E]; ) t.splice(e++, 0, ["C"][m](r.splice(0, 6)));
                                            t.splice(e, 1), (u = j(i[E], (n && n[E]) || 0));
                                        }
                                    },
                                    c = function (t, e, r, a, s) {
                                        t && e && "M" == t[s][0] && "M" != e[s][0] && (e.splice(s, 0, ["M", a.x, a.y]), (r.bx = 0), (r.by = 0), (r.x = t[s][1]), (r.y = t[s][2]), (u = j(i[E], (n && n[E]) || 0)));
                                    },
                                    l = 0,
                                    u = j(i[E], (n && n[E]) || 0);
                                l < u;
                                l++
                            ) {
                                (i[l] = s(i[l], r)), o(i, l), n && (n[l] = s(n[l], a)), n && o(n, l), c(i, n, r, a, l), c(n, i, a, r, l);
                                var p = i[l],
                                    h = n && n[l],
                                    f = p[E],
                                    g = n && h[E];
                                (r.x = p[f - 2]),
                                    (r.y = p[f - 1]),
                                    (r.bx = z(p[f - 4]) || r.x),
                                    (r.by = z(p[f - 3]) || r.y),
                                    (a.bx = n && (z(h[g - 4]) || a.x)),
                                    (a.by = n && (z(h[g - 3]) || a.y)),
                                    (a.x = n && h[g - 2]),
                                    (a.y = n && h[g - 1]);
                            }
                            return n ? [i, n] : i;
                        },
                        null,
                        mt
                    ),
                    Et = ft(function (e) {
                        for (var i = [], n = 0, r = e[E]; n < r; n++) {
                            var a = {},
                                s = e[n].match(/^([^:]*):?([\d\.]*)/);
                            if (((a.color = t.getRGB(s[1])), a.color.error)) return null;
                            (a.color = a.color.hex), s[2] && (a.offset = s[2] + "%"), i[P](a);
                        }
                        for (n = 1, r = i[E] - 1; n < r; n++)
                            if (!i[n].offset) {
                                for (var o = z(i[n - 1].offset || 0), c = 0, l = n + 1; l < r; l++)
                                    if (i[l].offset) {
                                        c = i[l].offset;
                                        break;
                                    }
                                c || ((c = 100), (l = r));
                                for (var u = ((c = z(c)) - o) / (l - n + 1); n < l; n++) (o += u), (i[n].offset = o + "%");
                            }
                        return i;
                    }),
                    St = function (e, i, n, r) {
                        var a;
                        return t.is(e, I) || t.is(e, "object")
                            ? (a = t.is(e, I) ? l.getElementById(e) : e).tagName
                                ? null == i
                                    ? { container: a, width: a.style.pixelWidth || a.offsetWidth, height: a.style.pixelHeight || a.offsetHeight }
                                    : { container: a, width: i, height: n }
                                : void 0
                            : { container: 1, x: e, y: i, width: n, height: r };
                    },
                    qt = function (t, e) {
                        var i = this;
                        for (var n in e)
                            if (e[c](n) && !(n in t))
                                switch (typeof e[n]) {
                                    case "function":
                                        !(function (e) {
                                            t[n] =
                                                t === i
                                                    ? e
                                                    : function () {
                                                          return e[d](i, arguments);
                                                      };
                                        })(e[n]);
                                        break;
                                    case "object":
                                        (t[n] = t[n] || {}), qt.call(this, t[n], e[n]);
                                        break;
                                    default:
                                        t[n] = e[n];
                                        break;
                                }
                    },
                    jt = function (t, e) {
                        t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next);
                    },
                    At = function (t, e) {
                        e.top !== t && (jt(t, e), (t.next = null), (t.prev = e.top), (e.top.next = t), (e.top = t));
                    },
                    Mt = function (t, e) {
                        e.bottom !== t && (jt(t, e), (t.next = e.bottom), (t.prev = null), (e.bottom.prev = t), (e.bottom = t));
                    },
                    Nt = function (t, e, i) {
                        jt(t, i), e == i.top && (i.top = t), e.next && (e.next.prev = t), (t.next = e.next), (t.prev = e), (e.next = t);
                    },
                    Ut = function (t, e, i) {
                        jt(t, i), e == i.bottom && (i.bottom = t), e.prev && (e.prev.next = t), (t.prev = e.prev), (e.prev = t), (t.next = e);
                    },
                    Ct = function (t) {
                        return function () {
                            throw new Error("Raphaël: you are calling to method “" + t + "” of removed object");
                        };
                    };
                if (((t.pathToRelative = gt), t.svg)) {
                    (n.svgns = "http://www.w3.org/2000/svg"),
                        (n.xlink = "http://www.w3.org/1999/xlink"),
                        (V = function (t) {
                            return +t + 0.5 * (~~t === t);
                        });
                    var It = function (t, e) {
                        if (!e) return ((t = l.createElementNS(n.svgns, t)).style.webkitTapHighlightColor = "rgba(0,0,0,0)"), t;
                        for (var i in e) e[c](i) && t[H](i, b(e[i]));
                    };
                    t[_] = function () {
                        return "Your browser supports SVG.\nYou are running Raphaël " + this.version;
                    };
                    var Ot = function (t, e) {
                            var i = It("path");
                            e.canvas && e.canvas[f](i);
                            var n = new Rt(i, e);
                            return (n.type = "path"), Lt(n, { fill: "none", stroke: "#000", path: t }), n;
                        },
                        _t = function (t, e, i) {
                            var n = "linear",
                                r = 0.5,
                                a = 0.5,
                                s = t.style;
                            if (
                                ((e = b(e)[K](rt, function (t, e, i) {
                                    if (((n = "radial"), e && i)) {
                                        r = z(e);
                                        var s = 2 * ((a = z(i)) > 0.5) - 1;
                                        N(r - 0.5, 2) + N(a - 0.5, 2) > 0.25 && (a = q.sqrt(0.25 - N(r - 0.5, 2)) * s + 0.5) && 0.5 != a && (a = a.toFixed(5) - 1e-5 * s);
                                    }
                                    return v;
                                })),
                                (e = e[x](/\s*\-\s*/)),
                                "linear" == n)
                            ) {
                                var o = e.shift();
                                if (((o = -z(o)), isNaN(o))) return null;
                                var c = [0, 0, q.cos((o * U) / 180), q.sin((o * U) / 180)],
                                    u = 1 / (j(M(c[2]), M(c[3])) || 1);
                                (c[2] *= u), (c[3] *= u), c[2] < 0 && ((c[0] = -c[2]), (c[2] = 0)), c[3] < 0 && ((c[1] = -c[3]), (c[3] = 0));
                            }
                            var p = Et(e);
                            if (!p) return null;
                            var h = t.getAttribute(B);
                            (h = h.match(/^url\(#(.*)\)$/)) && i.defs.removeChild(l.getElementById(h[1]));
                            var d = It(n + "Gradient");
                            (d.id = ct()), It(d, "radial" == n ? { fx: r, fy: a } : { x1: c[0], y1: c[1], x2: c[2], y2: c[3] }), i.defs[f](d);
                            for (var m = 0, g = p[E]; m < g; m++) {
                                var y = It("stop");
                                It(y, { offset: p[m].offset ? p[m].offset : m ? "100%" : "0%", "stop-color": p[m].color || "#fff" }), d[f](y);
                            }
                            return It(t, { fill: "url(#" + d.id + ")", opacity: 1, "fill-opacity": 1 }), (s.fill = v), (s.opacity = 1), (s.fillOpacity = 1), 1;
                        },
                        Bt = function (e) {
                            var i = e.getBBox();
                            It(e.pattern, { patternTransform: t.format("translate({0},{1})", i.x, i.y) });
                        },
                        Lt = function (e, i) {
                            var n = {
                                    "": [0],
                                    none: [0],
                                    "-": [3, 1],
                                    ".": [1, 1],
                                    "-.": [3, 1, 1, 1],
                                    "-..": [3, 1, 1, 1, 1, 1],
                                    ". ": [1, 3],
                                    "- ": [4, 3],
                                    "--": [8, 3],
                                    "- .": [4, 3, 1, 3],
                                    "--.": [8, 3, 1, 3],
                                    "--..": [8, 3, 1, 3, 1, 3],
                                },
                                a = e.node,
                                s = e.attrs,
                                o = e.rotate(),
                                u = function (t, e) {
                                    if ((e = n[S.call(e)])) {
                                        for (var r = t.attrs["stroke-width"] || "1", s = { round: r, square: r, butt: 0 }[t.attrs["stroke-linecap"] || i["stroke-linecap"]] || 0, o = [], c = e[E]; c--; )
                                            o[c] = e[c] * r + (c % 2 ? 1 : -1) * s;
                                        It(a, { "stroke-dasharray": o[T](",") });
                                    }
                                };
                            i[c]("rotation") && (o = i.rotation);
                            var p = b(o)[x](r);
                            for (var h in (p.length - 1 ? ((p[1] = +p[1]), (p[2] = +p[2])) : (p = null), z(o) && e.rotate(0, !0), i))
                                if (i[c](h)) {
                                    if (!$[c](h)) continue;
                                    var d = i[h];
                                    switch (((s[h] = d), h)) {
                                        case "blur":
                                            e.blur(d);
                                            break;
                                        case "rotation":
                                            e.rotate(d, !0);
                                            break;
                                        case "href":
                                        case "title":
                                        case "target":
                                            var m = a.parentNode;
                                            if ("a" != S.call(m.tagName)) {
                                                var g = It("a");
                                                m.insertBefore(g, a), g[f](a), (m = g);
                                            }
                                            "target" == h && "blank" == d ? m.setAttributeNS(e.paper.xlink, "show", "new") : m.setAttributeNS(e.paper.xlink, h, d);
                                            break;
                                        case "cursor":
                                            a.style.cursor = d;
                                            break;
                                        case "clip-rect":
                                            var w = b(d)[x](r);
                                            if (4 == w[E]) {
                                                e.clip && e.clip.parentNode.parentNode.removeChild(e.clip.parentNode);
                                                var k = It("clipPath"),
                                                    q = It("rect");
                                                (k.id = ct()), It(q, { x: w[0], y: w[1], width: w[2], height: w[3] }), k[f](q), e.paper.defs[f](k), It(a, { "clip-path": "url(#" + k.id + ")" }), (e.clip = q);
                                            }
                                            if (!d) {
                                                var j = l.getElementById(a.getAttribute("clip-path")[K](/(^url\(#|\)$)/g, v));
                                                j && j.parentNode.removeChild(j), It(a, { "clip-path": v }), delete e.clip;
                                            }
                                            break;
                                        case "path":
                                            "path" == e.type && It(a, { d: d ? (s.path = vt(d)) : "M0,0" });
                                            break;
                                        case "width":
                                            if ((a[H](h, d), !s.fx)) break;
                                            (h = "x"), (d = s.x);
                                        case "x":
                                            s.fx && (d = -s.x - (s.width || 0));
                                        case "rx":
                                            if ("rx" == h && "rect" == e.type) break;
                                        case "cx":
                                            p && ("x" == h || "cx" == h) && (p[1] += d - s[h]), a[H](h, d), e.pattern && Bt(e);
                                            break;
                                        case "height":
                                            if ((a[H](h, d), !s.fy)) break;
                                            (h = "y"), (d = s.y);
                                        case "y":
                                            s.fy && (d = -s.y - (s.height || 0));
                                        case "ry":
                                            if ("ry" == h && "rect" == e.type) break;
                                        case "cy":
                                            p && ("y" == h || "cy" == h) && (p[2] += d - s[h]), a[H](h, d), e.pattern && Bt(e);
                                            break;
                                        case "r":
                                            "rect" == e.type ? It(a, { rx: d, ry: d }) : a[H](h, d);
                                            break;
                                        case "src":
                                            "image" == e.type && a.setAttributeNS(e.paper.xlink, "href", d);
                                            break;
                                        case "stroke-width":
                                            (a.style.strokeWidth = d), a[H](h, d), s["stroke-dasharray"] && u(e, s["stroke-dasharray"]);
                                            break;
                                        case "stroke-dasharray":
                                            u(e, d);
                                            break;
                                        case "translation":
                                            var A = b(d)[x](r);
                                            (A[0] = +A[0] || 0), (A[1] = +A[1] || 0), p && ((p[1] += A[0]), (p[2] += A[1])), Se.call(e, A[0], A[1]);
                                            break;
                                        case "scale":
                                            (A = b(d)[x](r)), e.scale(+A[0] || 1, +A[1] || +A[0] || 1, isNaN(z(A[2])) ? null : +A[2], isNaN(z(A[3])) ? null : +A[3]);
                                            break;
                                        case B:
                                            var M = b(d).match(R);
                                            if (M) {
                                                k = It("pattern");
                                                var N = It("image");
                                                (k.id = ct()), It(k, { x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1 }), It(N, { x: 0, y: 0 }), N.setAttributeNS(e.paper.xlink, "href", M[1]), k[f](N);
                                                var U = l.createElement("img");
                                                (U.style.cssText = "position:absolute;left:-9999em;top-9999em"),
                                                    (U.onload = function () {
                                                        It(k, { width: this.offsetWidth, height: this.offsetHeight }), It(N, { width: this.offsetWidth, height: this.offsetHeight }), l.body.removeChild(this), e.paper.safari();
                                                    }),
                                                    l.body[f](U),
                                                    (U.src = M[1]),
                                                    e.paper.defs[f](k),
                                                    (a.style.fill = "url(#" + k.id + ")"),
                                                    It(a, { fill: "url(#" + k.id + ")" }),
                                                    (e.pattern = k),
                                                    e.pattern && Bt(e);
                                                break;
                                            }
                                            var C = t.getRGB(d);
                                            if (C.error) {
                                                if (({ circle: 1, ellipse: 1 }[c](e.type) || "r" != b(d).charAt()) && _t(a, d, e.paper)) {
                                                    (s.gradient = d), (s.fill = "none");
                                                    break;
                                                }
                                                delete i.gradient,
                                                    delete s.gradient,
                                                    !t.is(s.opacity, "undefined") && t.is(i.opacity, "undefined") && It(a, { opacity: s.opacity }),
                                                    !t.is(s["fill-opacity"], "undefined") && t.is(i["fill-opacity"], "undefined") && It(a, { "fill-opacity": s["fill-opacity"] });
                                            }
                                            C[c]("opacity") && It(a, { "fill-opacity": C.opacity > 1 ? C.opacity / 100 : C.opacity });
                                        case "stroke":
                                            (C = t.getRGB(d)), a[H](h, C.hex), "stroke" == h && C[c]("opacity") && It(a, { "stroke-opacity": C.opacity > 1 ? C.opacity / 100 : C.opacity });
                                            break;
                                        case "gradient":
                                            (({ circle: 1, ellipse: 1 }[c](e.type) || "r" != b(d).charAt()) && _t(a, d, e.paper));
                                            break;
                                        case "opacity":
                                            s.gradient && !s[c]("stroke-opacity") && It(a, { "stroke-opacity": d > 1 ? d / 100 : d });
                                        case "fill-opacity":
                                            if (s.gradient) {
                                                var I = l.getElementById(a.getAttribute(B)[K](/^url\(#|\)$/g, v));
                                                if (I) {
                                                    var O = I.getElementsByTagName("stop");
                                                    O[O[E] - 1][H]("stop-opacity", d);
                                                }
                                                break;
                                            }
                                        default:
                                            "font-size" == h && (d = F(d, 10) + "px");
                                            var _ = h[K](/(\-.)/g, function (t) {
                                                return W.call(t.substring(1));
                                            });
                                            (a.style[_] = d), a[H](h, d);
                                            break;
                                    }
                                }
                            Pt(e, i), p ? e.rotate(p.join(y)) : z(o) && e.rotate(o, !0);
                        },
                        Pt = function (e, i) {
                            if ("text" == e.type && (i[c]("text") || i[c]("font") || i[c]("font-size") || i[c]("x") || i[c]("y"))) {
                                var n = e.attrs,
                                    r = e.node,
                                    a = r.firstChild ? F(l.defaultView.getComputedStyle(r.firstChild, v).getPropertyValue("font-size"), 10) : 10;
                                if (i[c]("text")) {
                                    for (n.text = i.text; r.firstChild; ) r.removeChild(r.firstChild);
                                    for (var s = b(i.text)[x]("\n"), o = 0, u = s[E]; o < u; o++)
                                        if (s[o]) {
                                            var p = It("tspan");
                                            o && It(p, { dy: 1.2 * a, x: n.x }), p[f](l.createTextNode(s[o])), r[f](p);
                                        }
                                } else for (o = 0, u = (s = r.getElementsByTagName("tspan"))[E]; o < u; o++) o && It(s[o], { dy: 1.2 * a, x: n.x });
                                It(r, { y: n.y });
                                var h = e.getBBox(),
                                    d = n.y - (h.y + h.height / 2);
                                d && t.is(d, "finite") && It(r, { y: n.y + d });
                            }
                        },
                        Rt = function (e, i) {
                            (this[0] = e),
                                (this.id = t._oid++),
                                (this.node = e),
                                (e.raphael = this),
                                (this.paper = i),
                                (this.attrs = this.attrs || {}),
                                (this.transformations = []),
                                (this._ = { tx: 0, ty: 0, rt: { deg: 0, cx: 0, cy: 0 }, sx: 1, sy: 1 }),
                                !i.bottom && (i.bottom = this),
                                (this.prev = i.top),
                                i.top && (i.top.next = this),
                                (i.top = this),
                                (this.next = null);
                        },
                        Xt = Rt[o];
                    (Rt[o].rotate = function (e, i, n) {
                        if (this.removed) return this;
                        if (null == e) return this._.rt.cx ? [this._.rt.deg, this._.rt.cx, this._.rt.cy][T](y) : this._.rt.deg;
                        var a = this.getBBox();
                        return (
                            (e = b(e)[x](r))[E] - 1 && ((i = z(e[1])), (n = z(e[2]))),
                            (e = z(e[0])),
                            null != i && !1 !== i ? (this._.rt.deg = e) : (this._.rt.deg += e),
                            null == n && (i = null),
                            (this._.rt.cx = i),
                            (this._.rt.cy = n),
                            (i = null == i ? a.x + a.width / 2 : i),
                            (n = null == n ? a.y + a.height / 2 : n),
                            this._.rt.deg
                                ? ((this.transformations[0] = t.format("rotate({0} {1} {2})", this._.rt.deg, i, n)), this.clip && It(this.clip, { transform: t.format("rotate({0} {1} {2})", -this._.rt.deg, i, n) }))
                                : ((this.transformations[0] = v), this.clip && It(this.clip, { transform: v })),
                            It(this.node, { transform: this.transformations[T](y) }),
                            this
                        );
                    }),
                        (Rt[o].hide = function () {
                            return !this.removed && (this.node.style.display = "none"), this;
                        }),
                        (Rt[o].show = function () {
                            return !this.removed && (this.node.style.display = ""), this;
                        }),
                        (Rt[o].remove = function () {
                            if (!this.removed) {
                                for (var t in (jt(this, this.paper), this.node.parentNode.removeChild(this.node), this)) delete this[t];
                                this.removed = !0;
                            }
                        }),
                        (Rt[o].getBBox = function () {
                            if (this.removed) return this;
                            if ("path" == this.type) return dt(this.attrs.path);
                            if ("none" == this.node.style.display) {
                                this.show();
                                var t = !0;
                            }
                            var e = {};
                            try {
                                e = this.node.getBBox();
                            } catch (t) {
                            } finally {
                                e = e || {};
                            }
                            if ("text" == this.type) {
                                e = { x: e.x, y: 1 / 0, width: 0, height: 0 };
                                for (var i = 0, n = this.node.getNumberOfChars(); i < n; i++) {
                                    var r = this.node.getExtentOfChar(i);
                                    r.y < e.y && (e.y = r.y), r.y + r.height - e.y > e.height && (e.height = r.y + r.height - e.y), r.x + r.width - e.x > e.width && (e.width = r.x + r.width - e.x);
                                }
                            }
                            return t && this.hide(), e;
                        }),
                        (Rt[o].attr = function (e, i) {
                            if (this.removed) return this;
                            if (null == e) {
                                var n = {};
                                for (var r in this.attrs) this.attrs[c](r) && (n[r] = this.attrs[r]);
                                return this._.rt.deg && (n.rotation = this.rotate()), (1 != this._.sx || 1 != this._.sy) && (n.scale = this.scale()), n.gradient && "none" == n.fill && (n.fill = n.gradient) && delete n.gradient, n;
                            }
                            if (null == i && t.is(e, I))
                                return "translation" == e ? Se.call(this) : "rotation" == e ? this.rotate() : "scale" == e ? this.scale() : e == B && "none" == this.attrs.fill && this.attrs.gradient ? this.attrs.gradient : this.attrs[e];
                            if (null == i && t.is(e, O)) {
                                for (var a = {}, s = 0, o = e.length; s < o; s++) a[e[s]] = this.attr(e[s]);
                                return a;
                            }
                            if (null != i) {
                                var l = {};
                                l[e] = i;
                            } else null != e && t.is(e, "object") && (l = e);
                            for (var u in this.paper.customAttributes)
                                if (this.paper.customAttributes[c](u) && l[c](u) && t.is(this.paper.customAttributes[u], "function")) {
                                    var p = this.paper.customAttributes[u].apply(this, [][m](l[u]));
                                    for (var h in ((this.attrs[u] = l[u]), p)) p[c](h) && (l[h] = p[h]);
                                }
                            return Lt(this, l), this;
                        }),
                        (Rt[o].toFront = function () {
                            if (this.removed) return this;
                            this.node.parentNode[f](this.node);
                            var t = this.paper;
                            return t.top != this && At(this, t), this;
                        }),
                        (Rt[o].toBack = function () {
                            if (this.removed) return this;
                            if (this.node.parentNode.firstChild != this.node) {
                                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), Mt(this, this.paper);
                                this.paper;
                            }
                            return this;
                        }),
                        (Rt[o].insertAfter = function (t) {
                            if (this.removed) return this;
                            var e = t.node || t[t.length - 1].node;
                            return e.nextSibling ? e.parentNode.insertBefore(this.node, e.nextSibling) : e.parentNode[f](this.node), Nt(this, t, this.paper), this;
                        }),
                        (Rt[o].insertBefore = function (t) {
                            if (this.removed) return this;
                            var e = t.node || t[0].node;
                            return e.parentNode.insertBefore(this.node, e), Ut(this, t, this.paper), this;
                        }),
                        (Rt[o].blur = function (t) {
                            var e = this;
                            if (0 != +t) {
                                var i = It("filter"),
                                    n = It("feGaussianBlur");
                                (e.attrs.blur = t), (i.id = ct()), It(n, { stdDeviation: +t || 1.5 }), i.appendChild(n), e.paper.defs.appendChild(i), (e._blur = i), It(e.node, { filter: "url(#" + i.id + ")" });
                            } else e._blur && (e._blur.parentNode.removeChild(e._blur), delete e._blur, delete e.attrs.blur), e.node.removeAttribute("filter");
                        });
                    var Dt = function (t, e, i, n) {
                            var r = It("circle");
                            t.canvas && t.canvas[f](r);
                            var a = new Rt(r, t);
                            return (a.attrs = { cx: e, cy: i, r: n, fill: "none", stroke: "#000" }), (a.type = "circle"), It(r, a.attrs), a;
                        },
                        Yt = function (t, e, i, n, r, a) {
                            var s = It("rect");
                            t.canvas && t.canvas[f](s);
                            var o = new Rt(s, t);
                            return (o.attrs = { x: e, y: i, width: n, height: r, r: a || 0, rx: a || 0, ry: a || 0, fill: "none", stroke: "#000" }), (o.type = "rect"), It(s, o.attrs), o;
                        },
                        Vt = function (t, e, i, n, r) {
                            var a = It("ellipse");
                            t.canvas && t.canvas[f](a);
                            var s = new Rt(a, t);
                            return (s.attrs = { cx: e, cy: i, rx: n, ry: r, fill: "none", stroke: "#000" }), (s.type = "ellipse"), It(a, s.attrs), s;
                        },
                        Ht = function (t, e, i, n, r, a) {
                            var s = It("image");
                            It(s, { x: i, y: n, width: r, height: a, preserveAspectRatio: "none" }), s.setAttributeNS(t.xlink, "href", e), t.canvas && t.canvas[f](s);
                            var o = new Rt(s, t);
                            return (o.attrs = { x: i, y: n, width: r, height: a, src: e }), (o.type = "image"), o;
                        },
                        zt = function (t, e, i, n) {
                            var r = It("text");
                            It(r, { x: e, y: i, "text-anchor": "middle" }), t.canvas && t.canvas[f](r);
                            var a = new Rt(r, t);
                            return (a.attrs = { x: e, y: i, "text-anchor": "middle", text: n, font: $.font, stroke: "none", fill: "#000" }), (a.type = "text"), Lt(a, a.attrs), a;
                        },
                        Ft = function (t, e) {
                            return (this.width = t || this.width), (this.height = e || this.height), this.canvas[H]("width", this.width), this.canvas[H]("height", this.height), this;
                        },
                        Gt = function () {
                            var e = St[d](0, arguments),
                                i = e && e.container,
                                n = e.x,
                                r = e.y,
                                a = e.width,
                                s = e.height;
                            if (!i) throw new Error("SVG container not found.");
                            var o = It("svg");
                            return (
                                (n = n || 0),
                                (r = r || 0),
                                It(o, { xmlns: "http://www.w3.org/2000/svg", version: 1.1, width: (a = a || 512), height: (s = s || 342) }),
                                1 == i ? ((o.style.cssText = "position:absolute;left:" + n + "px;top:" + r + "px"), l.body[f](o)) : i.firstChild ? i.insertBefore(o, i.firstChild) : i[f](o),
                                ((i = new h()).width = a),
                                (i.height = s),
                                (i.canvas = o),
                                qt.call(i, i, t.fn),
                                i.clear(),
                                i
                            );
                        };
                    (n.clear = function () {
                        for (var t = this.canvas; t.firstChild; ) t.removeChild(t.firstChild);
                        (this.bottom = this.top = null), (this.desc = It("desc"))[f](l.createTextNode("Created with Raphaël")), t[f](this.desc), t[f]((this.defs = It("defs")));
                    }),
                        (n.remove = function () {
                            for (var t in (this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this)) this[t] = Ct(t);
                        });
                }
                if (t.vml) {
                    var Wt,
                        $t = { M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x" },
                        Zt = /([clmz]),?([^clmz]*)/gi,
                        Kt = / progid:\S+Blur\([^\)]+\)/g,
                        Qt = /-?[^,\s-]+/g,
                        Jt = "1000 1000",
                        te = 10,
                        ee = { path: 1, rect: 1 },
                        ie = function (t) {
                            var e = /[ahqstv]/gi,
                                i = vt;
                            if ((b(t).match(e) && (i = Tt), (e = /[clmz]/g), i == vt && !b(t).match(e))) {
                                var n = b(t)[K](Zt, function (t, e, i) {
                                    var n = [],
                                        r = "m" == S.call(e),
                                        a = $t[e];
                                    return (
                                        i[K](Qt, function (t) {
                                            r && 2 == n[E] && ((a += n + $t["m" == e ? "l" : "L"]), (n = [])), n[P](V(t * te));
                                        }),
                                        a + n
                                    );
                                });
                                return n;
                            }
                            var r,
                                a,
                                s = i(t);
                            n = [];
                            for (var o = 0, c = s[E]; o < c; o++) {
                                (r = s[o]), "z" == (a = S.call(s[o][0])) && (a = "x");
                                for (var l = 1, u = r[E]; l < u; l++) a += V(r[l] * te) + (l != u - 1 ? "," : v);
                                n[P](a);
                            }
                            return n[T](y);
                        };
                    function ne(e, i, n, r, a) {
                        return a
                            ? t.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", e + a, i, n - 2 * a, a, -a, r - 2 * a, 2 * a - n, 2 * a - r)
                            : t.format("M{0},{1}l{2},0,0,{3},{4},0z", e, i, n, r, -n);
                    }
                    (t[_] = function () {
                        return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version;
                    }),
                        (Ot = function (t, e) {
                            var i = Wt("group");
                            (i.style.cssText = "position:absolute;left:0;top:0;width:" + e.width + "px;height:" + e.height + "px"), (i.coordsize = e.coordsize), (i.coordorigin = e.coordorigin);
                            var n = Wt("shape"),
                                r = n.style;
                            (r.width = e.width + "px"), (r.height = e.height + "px"), (n.coordsize = Jt), (n.coordorigin = e.coordorigin), i[f](n);
                            var a = new Rt(n, i, e),
                                s = { fill: "none", stroke: "#000" };
                            return t && (s.path = t), (a.type = "path"), (a.path = []), (a.Path = v), Lt(a, s), e.canvas[f](i), a;
                        }),
                        (Lt = function (e, i) {
                            e.attrs = e.attrs || {};
                            var n,
                                a = e.node,
                                s = e.attrs,
                                o = a.style,
                                u = (i.x != s.x || i.y != s.y || i.width != s.width || i.height != s.height || i.r != s.r) && "rect" == e.type,
                                p = e;
                            for (var h in i) i[c](h) && (s[h] = i[h]);
                            if (
                                (u && ((s.path = ne(s.x, s.y, s.width, s.height, s.r)), (e.X = s.x), (e.Y = s.y), (e.W = s.width), (e.H = s.height)),
                                i.href && (a.href = i.href),
                                i.title && (a.title = i.title),
                                i.target && (a.target = i.target),
                                i.cursor && (o.cursor = i.cursor),
                                "blur" in i && e.blur(i.blur),
                                ((i.path && "path" == e.type) || u) && (a.path = ie(s.path)),
                                null != i.rotation && e.rotate(i.rotation, !0),
                                i.translation && ((n = b(i.translation)[x](r)), Se.call(e, n[0], n[1]), null != e._.rt.cx && ((e._.rt.cx += +n[0]), (e._.rt.cy += +n[1]), e.setBox(e.attrs, n[0], n[1]))),
                                i.scale && ((n = b(i.scale)[x](r)), e.scale(+n[0] || 1, +n[1] || +n[0] || 1, +n[2] || null, +n[3] || null)),
                                "clip-rect" in i)
                            ) {
                                var d = b(i["clip-rect"])[x](r);
                                if (4 == d[E]) {
                                    (d[2] = +d[2] + +d[0]), (d[3] = +d[3] + +d[1]);
                                    var m = a.clipRect || l.createElement("div"),
                                        g = m.style,
                                        y = a.parentNode;
                                    (g.clip = t.format("rect({1}px {2}px {3}px {0}px)", d)),
                                        a.clipRect || ((g.position = "absolute"), (g.top = 0), (g.left = 0), (g.width = e.paper.width + "px"), (g.height = e.paper.height + "px"), y.parentNode.insertBefore(m, y), m[f](y), (a.clipRect = m));
                                }
                                i["clip-rect"] || (a.clipRect && (a.clipRect.style.clip = v));
                            }
                            if (
                                ("image" == e.type && i.src && (a.src = i.src),
                                "image" == e.type && i.opacity && ((a.filterOpacity = G + ".Alpha(opacity=" + 100 * i.opacity + ")"), (o.filter = (a.filterMatrix || v) + (a.filterOpacity || v))),
                                i.font && (o.font = i.font),
                                i["font-family"] && (o.fontFamily = '"' + i["font-family"][x](",")[0][K](/^['"]+|['"]+$/g, v) + '"'),
                                i["font-size"] && (o.fontSize = i["font-size"]),
                                i["font-weight"] && (o.fontWeight = i["font-weight"]),
                                i["font-style"] && (o.fontStyle = i["font-style"]),
                                null != i.opacity ||
                                    null != i["stroke-width"] ||
                                    null != i.fill ||
                                    null != i.stroke ||
                                    null != i["stroke-width"] ||
                                    null != i["stroke-opacity"] ||
                                    null != i["fill-opacity"] ||
                                    null != i["stroke-dasharray"] ||
                                    null != i["stroke-miterlimit"] ||
                                    null != i["stroke-linejoin"] ||
                                    null != i["stroke-linecap"])
                            ) {
                                var w = (a = e.shape || a).getElementsByTagName(B) && a.getElementsByTagName(B)[0],
                                    k = !1;
                                if ((!w && (k = w = Wt(B)), "fill-opacity" in i || "opacity" in i)) {
                                    var T = ((+s["fill-opacity"] + 1 || 2) - 1) * ((+s.opacity + 1 || 2) - 1) * ((+t.getRGB(i.fill).o + 1 || 2) - 1);
                                    (T = A(j(T, 0), 1)), (w.opacity = T);
                                }
                                if ((i.fill && (w.on = !0), (null != w.on && "none" != i.fill) || (w.on = !1), w.on && i.fill)) {
                                    var S = i.fill.match(R);
                                    S
                                        ? ((w.src = S[1]), (w.type = "tile"))
                                        : ((w.color = t.getRGB(i.fill).hex),
                                          (w.src = v),
                                          (w.type = "solid"),
                                          t.getRGB(i.fill).error && (p.type in { circle: 1, ellipse: 1 } || "r" != b(i.fill).charAt()) && _t(p, i.fill) && ((s.fill = "none"), (s.gradient = i.fill)));
                                }
                                k && a[f](w);
                                var q = a.getElementsByTagName("stroke") && a.getElementsByTagName("stroke")[0],
                                    M = !1;
                                !q && (M = q = Wt("stroke")),
                                    ((i.stroke && "none" != i.stroke) || i["stroke-width"] || null != i["stroke-opacity"] || i["stroke-dasharray"] || i["stroke-miterlimit"] || i["stroke-linejoin"] || i["stroke-linecap"]) && (q.on = !0),
                                    ("none" == i.stroke || null == q.on || 0 == i.stroke || 0 == i["stroke-width"]) && (q.on = !1);
                                var N = t.getRGB(i.stroke);
                                q.on && i.stroke && (q.color = N.hex), (T = ((+s["stroke-opacity"] + 1 || 2) - 1) * ((+s.opacity + 1 || 2) - 1) * ((+N.o + 1 || 2) - 1));
                                var U = 0.75 * (z(i["stroke-width"]) || 1);
                                if (
                                    ((T = A(j(T, 0), 1)),
                                    null == i["stroke-width"] && (U = s["stroke-width"]),
                                    i["stroke-width"] && (q.weight = U),
                                    U && U < 1 && (T *= U) && (q.weight = 1),
                                    (q.opacity = T),
                                    i["stroke-linejoin"] && (q.joinstyle = i["stroke-linejoin"] || "miter"),
                                    (q.miterlimit = i["stroke-miterlimit"] || 8),
                                    i["stroke-linecap"] && (q.endcap = "butt" == i["stroke-linecap"] ? "flat" : "square" == i["stroke-linecap"] ? "square" : "round"),
                                    i["stroke-dasharray"])
                                ) {
                                    var C = {
                                        "-": "shortdash",
                                        ".": "shortdot",
                                        "-.": "shortdashdot",
                                        "-..": "shortdashdotdot",
                                        ". ": "dot",
                                        "- ": "dash",
                                        "--": "longdash",
                                        "- .": "dashdot",
                                        "--.": "longdashdot",
                                        "--..": "longdashdotdot",
                                    };
                                    q.dashstyle = C[c](i["stroke-dasharray"]) ? C[i["stroke-dasharray"]] : v;
                                }
                                M && a[f](q);
                            }
                            if ("text" == p.type)
                                switch (
                                    ((o = p.paper.span.style),
                                    s.font && (o.font = s.font),
                                    s["font-family"] && (o.fontFamily = s["font-family"]),
                                    s["font-size"] && (o.fontSize = s["font-size"]),
                                    s["font-weight"] && (o.fontWeight = s["font-weight"]),
                                    s["font-style"] && (o.fontStyle = s["font-style"]),
                                    p.node.string && (p.paper.span.innerHTML = b(p.node.string)[K](/</g, "&#60;")[K](/&/g, "&#38;")[K](/\n/g, "<br>")),
                                    (p.W = s.w = p.paper.span.offsetWidth),
                                    (p.H = s.h = p.paper.span.offsetHeight),
                                    (p.X = s.x),
                                    (p.Y = s.y + V(p.H / 2)),
                                    s["text-anchor"])
                                ) {
                                    case "start":
                                        (p.node.style["v-text-align"] = "left"), (p.bbx = V(p.W / 2));
                                        break;
                                    case "end":
                                        (p.node.style["v-text-align"] = "right"), (p.bbx = -V(p.W / 2));
                                        break;
                                    default:
                                        p.node.style["v-text-align"] = "center";
                                        break;
                                }
                        }),
                        (_t = function (t, e) {
                            t.attrs = t.attrs || {};
                            t.attrs;
                            var i,
                                n = "linear",
                                r = ".5 .5";
                            if (
                                ((t.attrs.gradient = e),
                                (e = b(e)[K](rt, function (t, e, i) {
                                    return (n = "radial"), e && i && ((e = z(e)), (i = z(i)), N(e - 0.5, 2) + N(i - 0.5, 2) > 0.25 && (i = q.sqrt(0.25 - N(e - 0.5, 2)) * (2 * (i > 0.5) - 1) + 0.5), (r = e + y + i)), v;
                                })),
                                (e = e[x](/\s*\-\s*/)),
                                "linear" == n)
                            ) {
                                var a = e.shift();
                                if (((a = -z(a)), isNaN(a))) return null;
                            }
                            var s = Et(e);
                            if (!s) return null;
                            if ((!(i = (t = t.shape || t.node).getElementsByTagName(B)[0] || Wt(B)).parentNode && t.appendChild(i), s[E])) {
                                (i.on = !0), (i.method = "none"), (i.color = s[0].color), (i.color2 = s[s[E] - 1].color);
                                for (var o = [], c = 0, l = s[E]; c < l; c++) s[c].offset && o[P](s[c].offset + y + s[c].color);
                                i.colors && (i.colors.value = o[E] ? o[T]() : "0% " + i.color),
                                    "radial" == n ? ((i.type = "gradientradial"), (i.focus = "100%"), (i.focussize = r), (i.focusposition = r)) : ((i.type = "gradient"), (i.angle = (270 - a) % 360));
                            }
                            return 1;
                        }),
                        (Rt = function (e, i, n) {
                            (this[0] = e),
                                (this.id = t._oid++),
                                (this.node = e),
                                (e.raphael = this),
                                (this.X = 0),
                                (this.Y = 0),
                                (this.attrs = {}),
                                (this.Group = i),
                                (this.paper = n),
                                (this._ = { tx: 0, ty: 0, rt: { deg: 0 }, sx: 1, sy: 1 }),
                                !n.bottom && (n.bottom = this),
                                (this.prev = n.top),
                                n.top && (n.top.next = this),
                                (n.top = this),
                                (this.next = null);
                        }),
                        ((Xt = Rt[o]).rotate = function (t, e, i) {
                            return this.removed
                                ? this
                                : null == t
                                ? this._.rt.cx
                                    ? [this._.rt.deg, this._.rt.cx, this._.rt.cy][T](y)
                                    : this._.rt.deg
                                : ((t = b(t)[x](r))[E] - 1 && ((e = z(t[1])), (i = z(t[2]))),
                                  (t = z(t[0])),
                                  null != e ? (this._.rt.deg = t) : (this._.rt.deg += t),
                                  null == i && (e = null),
                                  (this._.rt.cx = e),
                                  (this._.rt.cy = i),
                                  this.setBox(this.attrs, e, i),
                                  (this.Group.style.rotation = this._.rt.deg),
                                  this);
                        }),
                        (Xt.setBox = function (t, e, i) {
                            if (this.removed) return this;
                            var n = this.Group.style,
                                r = (this.shape && this.shape.style) || this.node.style;
                            for (var a in (t = t || {})) t[c](a) && (this.attrs[a] = t[a]);
                            (e = e || this._.rt.cx), (i = i || this._.rt.cy);
                            var s,
                                o,
                                l,
                                u,
                                p = this.attrs;
                            switch (this.type) {
                                case "circle":
                                    (s = p.cx - p.r), (o = p.cy - p.r), (l = u = 2 * p.r);
                                    break;
                                case "ellipse":
                                    (s = p.cx - p.rx), (o = p.cy - p.ry), (l = 2 * p.rx), (u = 2 * p.ry);
                                    break;
                                case "image":
                                    (s = +p.x), (o = +p.y), (l = p.width || 0), (u = p.height || 0);
                                    break;
                                case "text":
                                    (this.textpath.v = ["m", V(p.x), ", ", V(p.y - 2), "l", V(p.x) + 1, ", ", V(p.y - 2)][T](v)), (s = p.x - V(this.W / 2)), (o = p.y - this.H / 2), (l = this.W), (u = this.H);
                                    break;
                                case "rect":
                                case "path":
                                    if (this.attrs.path) {
                                        var h = dt(this.attrs.path);
                                        (s = h.x), (o = h.y), (l = h.width), (u = h.height);
                                    } else (s = 0), (o = 0), (l = this.paper.width), (u = this.paper.height);
                                    break;
                                default:
                                    (s = 0), (o = 0), (l = this.paper.width), (u = this.paper.height);
                                    break;
                            }
                            i = null == i ? o + u / 2 : i;
                            var f,
                                d = (e = null == e ? s + l / 2 : e) - this.paper.width / 2,
                                m = i - this.paper.height / 2;
                            n.left != (f = d + "px") && (n.left = f),
                                n.top != (f = m + "px") && (n.top = f),
                                (this.X = ee[c](this.type) ? -d : s),
                                (this.Y = ee[c](this.type) ? -m : o),
                                (this.W = l),
                                (this.H = u),
                                ee[c](this.type)
                                    ? (r.left != (f = -d * te + "px") && (r.left = f), r.top != (f = -m * te + "px") && (r.top = f))
                                    : "text" == this.type
                                    ? (r.left != (f = -d + "px") && (r.left = f), r.top != (f = -m + "px") && (r.top = f))
                                    : (n.width != (f = this.paper.width + "px") && (n.width = f),
                                      n.height != (f = this.paper.height + "px") && (n.height = f),
                                      r.left != (f = s - d + "px") && (r.left = f),
                                      r.top != (f = o - m + "px") && (r.top = f),
                                      r.width != (f = l + "px") && (r.width = f),
                                      r.height != (f = u + "px") && (r.height = f));
                        }),
                        (Xt.hide = function () {
                            return !this.removed && (this.Group.style.display = "none"), this;
                        }),
                        (Xt.show = function () {
                            return !this.removed && (this.Group.style.display = "block"), this;
                        }),
                        (Xt.getBBox = function () {
                            return this.removed ? this : ee[c](this.type) ? dt(this.attrs.path) : { x: this.X + (this.bbx || 0), y: this.Y, width: this.W, height: this.H };
                        }),
                        (Xt.remove = function () {
                            if (!this.removed) {
                                for (var t in (jt(this, this.paper), this.node.parentNode.removeChild(this.node), this.Group.parentNode.removeChild(this.Group), this.shape && this.shape.parentNode.removeChild(this.shape), this))
                                    delete this[t];
                                this.removed = !0;
                            }
                        }),
                        (Xt.attr = function (e, i) {
                            if (this.removed) return this;
                            if (null == e) {
                                var n = {};
                                for (var r in this.attrs) this.attrs[c](r) && (n[r] = this.attrs[r]);
                                return this._.rt.deg && (n.rotation = this.rotate()), (1 != this._.sx || 1 != this._.sy) && (n.scale = this.scale()), n.gradient && "none" == n.fill && (n.fill = n.gradient) && delete n.gradient, n;
                            }
                            if (null == i && t.is(e, "string"))
                                return "translation" == e ? Se.call(this) : "rotation" == e ? this.rotate() : "scale" == e ? this.scale() : e == B && "none" == this.attrs.fill && this.attrs.gradient ? this.attrs.gradient : this.attrs[e];
                            if (this.attrs && null == i && t.is(e, O)) {
                                var a,
                                    s = {};
                                for (r = 0, a = e[E]; r < a; r++) s[e[r]] = this.attr(e[r]);
                                return s;
                            }
                            var o;
                            if ((null != i && ((o = {})[e] = i), null == i && t.is(e, "object") && (o = e), o)) {
                                for (var l in this.paper.customAttributes)
                                    if (this.paper.customAttributes[c](l) && o[c](l) && t.is(this.paper.customAttributes[l], "function")) {
                                        var u = this.paper.customAttributes[l].apply(this, [][m](o[l]));
                                        for (var p in ((this.attrs[l] = o[l]), u)) u[c](p) && (o[p] = u[p]);
                                    }
                                o.text && "text" == this.type && (this.node.string = o.text),
                                    Lt(this, o),
                                    o.gradient && ({ circle: 1, ellipse: 1 }[c](this.type) || "r" != b(o.gradient).charAt()) && _t(this, o.gradient),
                                    (!ee[c](this.type) || this._.rt.deg) && this.setBox(this.attrs);
                            }
                            return this;
                        }),
                        (Xt.toFront = function () {
                            return !this.removed && this.Group.parentNode[f](this.Group), this.paper.top != this && At(this, this.paper), this;
                        }),
                        (Xt.toBack = function () {
                            return this.removed || (this.Group.parentNode.firstChild != this.Group && (this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild), Mt(this, this.paper))), this;
                        }),
                        (Xt.insertAfter = function (t) {
                            return (
                                this.removed ||
                                    (t.constructor == Ae && (t = t[t.length - 1]), t.Group.nextSibling ? t.Group.parentNode.insertBefore(this.Group, t.Group.nextSibling) : t.Group.parentNode[f](this.Group), Nt(this, t, this.paper)),
                                this
                            );
                        }),
                        (Xt.insertBefore = function (t) {
                            return this.removed || (t.constructor == Ae && (t = t[0]), t.Group.parentNode.insertBefore(this.Group, t.Group), Ut(this, t, this.paper)), this;
                        }),
                        (Xt.blur = function (e) {
                            var i = this.node.runtimeStyle,
                                n = i.filter;
                            (n = n.replace(Kt, v)),
                                0 != +e
                                    ? ((this.attrs.blur = e), (i.filter = n + y + G + ".Blur(pixelradius=" + (+e || 1.5) + ")"), (i.margin = t.format("-{0}px 0 0 -{0}px", V(+e || 1.5))))
                                    : ((i.filter = n), (i.margin = 0), delete this.attrs.blur);
                        }),
                        (Dt = function (t, e, i, n) {
                            var r = Wt("group"),
                                a = Wt("oval");
                            a.style;
                            (r.style.cssText = "position:absolute;left:0;top:0;width:" + t.width + "px;height:" + t.height + "px"), (r.coordsize = Jt), (r.coordorigin = t.coordorigin), r[f](a);
                            var s = new Rt(a, r, t);
                            return (s.type = "circle"), Lt(s, { stroke: "#000", fill: "none" }), (s.attrs.cx = e), (s.attrs.cy = i), (s.attrs.r = n), s.setBox({ x: e - n, y: i - n, width: 2 * n, height: 2 * n }), t.canvas[f](r), s;
                        }),
                        (Yt = function (t, e, i, n, r, a) {
                            var s = ne(e, i, n, r, a),
                                o = t.path(s),
                                c = o.attrs;
                            return (o.X = c.x = e), (o.Y = c.y = i), (o.W = c.width = n), (o.H = c.height = r), (c.r = a), (c.path = s), (o.type = "rect"), o;
                        }),
                        (Vt = function (t, e, i, n, r) {
                            var a = Wt("group"),
                                s = Wt("oval");
                            s.style;
                            (a.style.cssText = "position:absolute;left:0;top:0;width:" + t.width + "px;height:" + t.height + "px"), (a.coordsize = Jt), (a.coordorigin = t.coordorigin), a[f](s);
                            var o = new Rt(s, a, t);
                            return (o.type = "ellipse"), Lt(o, { stroke: "#000" }), (o.attrs.cx = e), (o.attrs.cy = i), (o.attrs.rx = n), (o.attrs.ry = r), o.setBox({ x: e - n, y: i - r, width: 2 * n, height: 2 * r }), t.canvas[f](a), o;
                        }),
                        (Ht = function (t, e, i, n, r, a) {
                            var s = Wt("group"),
                                o = Wt("image");
                            (s.style.cssText = "position:absolute;left:0;top:0;width:" + t.width + "px;height:" + t.height + "px"), (s.coordsize = Jt), (s.coordorigin = t.coordorigin), (o.src = e), s[f](o);
                            var c = new Rt(o, s, t);
                            return (c.type = "image"), (c.attrs.src = e), (c.attrs.x = i), (c.attrs.y = n), (c.attrs.w = r), (c.attrs.h = a), c.setBox({ x: i, y: n, width: r, height: a }), t.canvas[f](s), c;
                        }),
                        (zt = function (e, i, n, r) {
                            var a = Wt("group"),
                                s = Wt("shape"),
                                o = s.style,
                                c = Wt("path"),
                                l = (c.style, Wt("textpath"));
                            (a.style.cssText = "position:absolute;left:0;top:0;width:" + e.width + "px;height:" + e.height + "px"),
                                (a.coordsize = Jt),
                                (a.coordorigin = e.coordorigin),
                                (c.v = t.format("m{0},{1}l{2},{1}", V(10 * i), V(10 * n), V(10 * i) + 1)),
                                (c.textpathok = !0),
                                (o.width = e.width),
                                (o.height = e.height),
                                (l.string = b(r)),
                                (l.on = !0),
                                s[f](l),
                                s[f](c),
                                a[f](s);
                            var u = new Rt(l, a, e);
                            return (
                                (u.shape = s),
                                (u.textpath = c),
                                (u.type = "text"),
                                (u.attrs.text = r),
                                (u.attrs.x = i),
                                (u.attrs.y = n),
                                (u.attrs.w = 1),
                                (u.attrs.h = 1),
                                Lt(u, { font: $.font, stroke: "none", fill: "#000" }),
                                u.setBox(),
                                e.canvas[f](a),
                                u
                            );
                        }),
                        (Ft = function (t, e) {
                            var i = this.canvas.style;
                            return t == +t && (t += "px"), e == +e && (e += "px"), (i.width = t), (i.height = e), (i.clip = "rect(0 " + t + " " + e + " 0)"), this;
                        }),
                        l.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                    try {
                        !l.namespaces.rvml && l.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                            (Wt = function (t) {
                                return l.createElement("<rvml:" + t + ' class="rvml">');
                            });
                    } catch (t) {
                        Wt = function (t) {
                            return l.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                        };
                    }
                    (Gt = function () {
                        var e = St[d](0, arguments),
                            i = e.container,
                            n = e.height,
                            r = e.width,
                            a = e.x,
                            s = e.y;
                        if (!i) throw new Error("VML container not found.");
                        var o = new h(),
                            c = (o.canvas = l.createElement("div")),
                            u = c.style;
                        return (
                            (a = a || 0),
                            (s = s || 0),
                            (r = r || 512) == +r && (r += "px"),
                            (n = n || 342) == +n && (n += "px"),
                            (o.width = 1e3),
                            (o.height = 1e3),
                            (o.coordsize = "10000 10000"),
                            (o.coordorigin = "0 0"),
                            (o.span = l.createElement("span")),
                            (o.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;"),
                            c[f](o.span),
                            (u.cssText = t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", r, n)),
                            1 == i ? (l.body[f](c), (u.left = a + "px"), (u.top = s + "px"), (u.position = "absolute")) : i.firstChild ? i.insertBefore(c, i.firstChild) : i[f](c),
                            qt.call(o, o, t.fn),
                            o
                        );
                    }),
                        (n.clear = function () {
                            (this.canvas.innerHTML = v),
                                (this.span = l.createElement("span")),
                                (this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;"),
                                this.canvas[f](this.span),
                                (this.bottom = this.top = null);
                        }),
                        (n.remove = function () {
                            for (var t in (this.canvas.parentNode.removeChild(this.canvas), this)) this[t] = Ct(t);
                            return !0;
                        });
                }
                var re = navigator.userAgent.match(/Version\\x2f(.*?)\s/);
                "Apple Computer, Inc." == navigator.vendor && ((re && re[1] < 4) || "iP" == navigator.platform.slice(0, 2))
                    ? (n.safari = function () {
                          var t = this.rect(-99, -99, this.width + 99, this.height + 99).attr({ stroke: "none" });
                          u.setTimeout(function () {
                              t.remove();
                          });
                      })
                    : (n.safari = function () {});
                for (
                    var ae = function () {
                            this.returnValue = !1;
                        },
                        se = function () {
                            return this.originalEvent.preventDefault();
                        },
                        oe = function () {
                            this.cancelBubble = !0;
                        },
                        ce = function () {
                            return this.originalEvent.stopPropagation();
                        },
                        le = l.addEventListener
                            ? function (t, e, i, n) {
                                  var r = g && k[e] ? k[e] : e,
                                      a = function (r) {
                                          if (g && k[c](e))
                                              for (var a = 0, s = r.targetTouches && r.targetTouches.length; a < s; a++)
                                                  if (r.targetTouches[a].target == t) {
                                                      var o = r;
                                                      ((r = r.targetTouches[a]).originalEvent = o), (r.preventDefault = se), (r.stopPropagation = ce);
                                                      break;
                                                  }
                                          return i.call(n, r);
                                      };
                                  return (
                                      t.addEventListener(r, a, !1),
                                      function () {
                                          return t.removeEventListener(r, a, !1), !0;
                                      }
                                  );
                              }
                            : l.attachEvent
                            ? function (t, e, i, n) {
                                  var r = function (t) {
                                      return ((t = t || u.event).preventDefault = t.preventDefault || ae), (t.stopPropagation = t.stopPropagation || oe), i.call(n, t);
                                  };
                                  return (
                                      t.attachEvent("on" + e, r),
                                      function () {
                                          return t.detachEvent("on" + e, r), !0;
                                      }
                                  );
                              }
                            : void 0,
                        ue = [],
                        pe = function (t) {
                            for (var e, i = t.clientX, n = t.clientY, r = l.documentElement.scrollTop || l.body.scrollTop, a = l.documentElement.scrollLeft || l.body.scrollLeft, s = ue.length; s--; ) {
                                if (((e = ue[s]), g)) {
                                    for (var o, c = t.touches.length; c--; )
                                        if ((o = t.touches[c]).identifier == e.el._drag.id) {
                                            (i = o.clientX), (n = o.clientY), (t.originalEvent ? t.originalEvent : t).preventDefault();
                                            break;
                                        }
                                } else t.preventDefault();
                                (i += a), (n += r), e.move && e.move.call(e.move_scope || e.el, i - e.el._drag.x, n - e.el._drag.y, i, n, t);
                            }
                        },
                        he = function (e) {
                            t.unmousemove(pe).unmouseup(he);
                            for (var i, n = ue.length; n--; ) ((i = ue[n]).el._drag = {}), i.end && i.end.call(i.end_scope || i.start_scope || i.move_scope || i.el, e);
                            ue = [];
                        },
                        fe = w[E];
                    fe--;

                )
                    !(function (e) {
                        (t[e] = Rt[o][e] = function (i, n) {
                            return t.is(i, "function") && ((this.events = this.events || []), this.events.push({ name: e, f: i, unbind: le(this.shape || this.node || l, e, i, n || this) })), this;
                        }),
                            (t["un" + e] = Rt[o]["un" + e] = function (t) {
                                for (var i = this.events, n = i[E]; n--; ) if (i[n].name == e && i[n].f == t) return i[n].unbind(), i.splice(n, 1), !i.length && delete this.events, this;
                                return this;
                            });
                    })(w[fe]);
                function de() {
                    return this.x + y + this.y;
                }
                (Xt.hover = function (t, e, i, n) {
                    return this.mouseover(t, i).mouseout(e, n || i);
                }),
                    (Xt.unhover = function (t, e) {
                        return this.unmouseover(t).unmouseout(e);
                    }),
                    (Xt.drag = function (e, i, n, r, a, s) {
                        return (
                            (this._drag = {}),
                            this.mousedown(function (o) {
                                (o.originalEvent || o).preventDefault();
                                var c = l.documentElement.scrollTop || l.body.scrollTop,
                                    u = l.documentElement.scrollLeft || l.body.scrollLeft;
                                (this._drag.x = o.clientX + u),
                                    (this._drag.y = o.clientY + c),
                                    (this._drag.id = o.identifier),
                                    i && i.call(a || r || this, o.clientX + u, o.clientY + c, o),
                                    !ue.length && t.mousemove(pe).mouseup(he),
                                    ue.push({ el: this, move: e, end: n, move_scope: r, start_scope: a, end_scope: s });
                            }),
                            this
                        );
                    }),
                    (Xt.undrag = function (e, i, n) {
                        for (var r = ue.length; r--; ) ue[r].el == this && ue[r].move == e && ue[r].end == n && ue.splice(r++, 1);
                        !ue.length && t.unmousemove(pe).unmouseup(he);
                    }),
                    (n.circle = function (t, e, i) {
                        return Dt(this, t || 0, e || 0, i || 0);
                    }),
                    (n.rect = function (t, e, i, n, r) {
                        return Yt(this, t || 0, e || 0, i || 0, n || 0, r || 0);
                    }),
                    (n.ellipse = function (t, e, i, n) {
                        return Vt(this, t || 0, e || 0, i || 0, n || 0);
                    }),
                    (n.path = function (e) {
                        return e && !t.is(e, I) && !t.is(e[0], O) && (e += v), Ot(t.format[d](t, arguments), this);
                    }),
                    (n.image = function (t, e, i, n, r) {
                        return Ht(this, t || "about:blank", e || 0, i || 0, n || 0, r || 0);
                    }),
                    (n.text = function (t, e, i) {
                        return zt(this, t || 0, e || 0, b(i));
                    }),
                    (n.set = function (t) {
                        return arguments[E] > 1 && (t = Array[o].splice.call(arguments, 0, arguments[E])), new Ae(t);
                    }),
                    (n.setSize = Ft),
                    (n.top = n.bottom = null),
                    (n.raphael = t),
                    (Xt.resetScale = function () {
                        if (this.removed) return this;
                        (this._.sx = 1), (this._.sy = 1), (this.attrs.scale = "1 1");
                    }),
                    (Xt.scale = function (t, e, i, n) {
                        if (this.removed) return this;
                        if (null == t && null == e) return { x: this._.sx, y: this._.sy, toString: de };
                        !+(e = e || t) && (e = t);
                        var r,
                            a,
                            s = this.attrs;
                        if (0 != t) {
                            var o = this.getBBox(),
                                c = o.x + o.width / 2,
                                l = o.y + o.height / 2,
                                u = M(t / this._.sx),
                                p = M(e / this._.sy);
                            (i = +i || 0 == i ? i : c), (n = +n || 0 == n ? n : l);
                            var h = this._.sx > 0,
                                f = this._.sy > 0,
                                d = ~~(t / M(t)),
                                g = ~~(e / M(e)),
                                b = u * d,
                                x = p * g,
                                w = this.node.style,
                                k = i + M(c - i) * b * (c > i == h ? 1 : -1),
                                S = n + M(l - n) * x * (l > n == f ? 1 : -1),
                                q = t * d > e * g ? p : u;
                            switch (this.type) {
                                case "rect":
                                case "image":
                                    var j = s.width * u,
                                        A = s.height * p;
                                    this.attr({ height: A, r: s.r * q, width: j, x: k - j / 2, y: S - A / 2 });
                                    break;
                                case "circle":
                                case "ellipse":
                                    this.attr({ rx: s.rx * u, ry: s.ry * p, r: s.r * q, cx: k, cy: S });
                                    break;
                                case "text":
                                    this.attr({ x: k, y: S });
                                    break;
                                case "path":
                                    for (var N = gt(s.path), U = !0, C = h ? b : u, I = f ? x : p, O = 0, _ = N[E]; O < _; O++) {
                                        var B = N[O],
                                            L = W.call(B[0]);
                                        if ("M" != L || !U)
                                            if (((U = !1), "A" == L)) (B[N[O][E] - 2] *= C), (B[N[O][E] - 1] *= I), (B[1] *= u), (B[2] *= p), (B[5] = +(d + g ? !!+B[5] : !+B[5]));
                                            else if ("H" == L) for (var P = 1, R = B[E]; P < R; P++) B[P] *= C;
                                            else if ("V" == L) for (P = 1, R = B[E]; P < R; P++) B[P] *= I;
                                            else for (P = 1, R = B[E]; P < R; P++) B[P] *= P % 2 ? C : I;
                                    }
                                    var X = dt(N);
                                    (r = k - X.x - X.width / 2), (a = S - X.y - X.height / 2), (N[0][1] += r), (N[0][2] += a), this.attr({ path: N });
                                    break;
                            }
                            !(this.type in { text: 1, image: 1 }) || (1 == d && 1 == g)
                                ? this.transformations
                                    ? ((this.transformations[2] = v), this.node[H]("transform", this.transformations[T](y)), (s.fx = 0), (s.fy = 0))
                                    : ((this.node.filterMatrix = v), (w.filter = (this.node.filterMatrix || v) + (this.node.filterOpacity || v)))
                                : this.transformations
                                ? ((this.transformations[2] = "scale("[m](d, ",", g, ")")),
                                  this.node[H]("transform", this.transformations[T](y)),
                                  (r = -1 == d ? -s.x - (j || 0) : s.x),
                                  (a = -1 == g ? -s.y - (A || 0) : s.y),
                                  this.attr({ x: r, y: a }),
                                  (s.fx = d - 1),
                                  (s.fy = g - 1))
                                : ((this.node.filterMatrix = G + ".Matrix(M11="[m](d, ", M12=0, M21=0, M22=", g, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')")),
                                  (w.filter = (this.node.filterMatrix || v) + (this.node.filterOpacity || v))),
                                (s.scale = [t, e, i, n][T](y)),
                                (this._.sx = t),
                                (this._.sy = e);
                        }
                        return this;
                    }),
                    (Xt.clone = function () {
                        if (this.removed) return null;
                        var t = this.attr();
                        return delete t.scale, delete t.translation, this.paper[this.type]().attr(t);
                    });
                var me = {},
                    ge = function (e, i, n, r, a, s, o, c, l) {
                        var u,
                            p,
                            h = 0,
                            f = 100,
                            d = [e, i, n, r, a, s, o, c].join(),
                            m = me[d];
                        (!m && (me[d] = m = { data: [] }),
                        m.timer && clearTimeout(m.timer),
                        (m.timer = setTimeout(function () {
                            delete me[d];
                        }, 2e3)),
                        null != l) && (f = 10 * ~~ge(e, i, n, r, a, s, o, c));
                        for (var g = 0; g < f + 1; g++) {
                            if ((m.data[l] > g ? (p = m.data[g * f]) : ((p = t.findDotsAtSegment(e, i, n, r, a, s, o, c, g / f)), (m.data[g] = p)), g && (h += N(N(u.x - p.x, 2) + N(u.y - p.y, 2), 0.5)), null != l && h >= l)) return p;
                            u = p;
                        }
                        if (null == l) return h;
                    },
                    ve = function (e, i) {
                        return function (n, r, a) {
                            for (var s, o, c, l, u, p = "", h = {}, f = 0, d = 0, m = (n = Tt(n)).length; d < m; d++) {
                                if ("M" == (c = n[d])[0]) (s = +c[1]), (o = +c[2]);
                                else {
                                    if (f + (l = ge(s, o, c[1], c[2], c[3], c[4], c[5], c[6])) > r) {
                                        if (i && !h.start) {
                                            if (((p += ["C", (u = ge(s, o, c[1], c[2], c[3], c[4], c[5], c[6], r - f)).start.x, u.start.y, u.m.x, u.m.y, u.x, u.y]), a)) return p;
                                            (h.start = p), (p = ["M", u.x, u.y + "C", u.n.x, u.n.y, u.end.x, u.end.y, c[5], c[6]][T]()), (f += l), (s = +c[5]), (o = +c[6]);
                                            continue;
                                        }
                                        if (!e && !i) return { x: (u = ge(s, o, c[1], c[2], c[3], c[4], c[5], c[6], r - f)).x, y: u.y, alpha: u.alpha };
                                    }
                                    (f += l), (s = +c[5]), (o = +c[6]);
                                }
                                p += c;
                            }
                            return (h.end = p), (u = e ? f : i ? h : t.findDotsAtSegment(s, o, c[1], c[2], c[3], c[4], c[5], c[6], 1)).alpha && (u = { x: u.x, y: u.y, alpha: u.alpha }), u;
                        };
                    },
                    ye = ve(1),
                    be = ve(),
                    xe = ve(0, 1);
                (Xt.getTotalLength = function () {
                    if ("path" == this.type) return this.node.getTotalLength ? this.node.getTotalLength() : ye(this.attrs.path);
                }),
                    (Xt.getPointAtLength = function (t) {
                        if ("path" == this.type) return be(this.attrs.path, t);
                    }),
                    (Xt.getSubpath = function (t, e) {
                        if ("path" == this.type) {
                            if (M(this.getTotalLength() - e) < "1e-6") return xe(this.attrs.path, t).end;
                            var i = xe(this.attrs.path, e, 1);
                            return t ? xe(i, t).end : i;
                        }
                    }),
                    (t.easing_formulas = {
                        linear: function (t) {
                            return t;
                        },
                        "<": function (t) {
                            return N(t, 3);
                        },
                        ">": function (t) {
                            return N(t - 1, 3) + 1;
                        },
                        "<>": function (t) {
                            return (t *= 2) < 1 ? N(t, 3) / 2 : (N((t -= 2), 3) + 2) / 2;
                        },
                        backIn: function (t) {
                            var e = 1.70158;
                            return t * t * ((e + 1) * t - e);
                        },
                        backOut: function (t) {
                            var e = 1.70158;
                            return (t -= 1) * t * ((e + 1) * t + e) + 1;
                        },
                        elastic: function (t) {
                            if (0 == t || 1 == t) return t;
                            return N(2, -10 * t) * q.sin((2 * U * (t - 0.075)) / 0.3) + 1;
                        },
                        bounce: function (t) {
                            var e = 7.5625,
                                i = 2.75;
                            return t < 1 / i ? e * t * t : t < 2 / i ? e * (t -= 1.5 / i) * t + 0.75 : t < 2.5 / i ? e * (t -= 2.25 / i) * t + 0.9375 : e * (t -= 2.625 / i) * t + 0.984375;
                        },
                    });
                var we = [],
                    ke = function () {
                        for (var e = +new Date(), i = 0; i < we[E]; i++) {
                            var n = we[i];
                            if (!n.stop && !n.el.removed) {
                                var r,
                                    a = e - n.start,
                                    s = n.ms,
                                    o = n.easing,
                                    l = n.from,
                                    u = n.diff,
                                    p = n.to,
                                    h = n.t,
                                    f = n.el,
                                    d = {};
                                if (a < s) {
                                    var m = o(a / s);
                                    for (var g in l)
                                        if (l[c](g)) {
                                            switch (Z[g]) {
                                                case "along":
                                                    (r = m * s * u[g]), p.back && (r = p.len - r);
                                                    var b = be(p[g], r);
                                                    f.translate(u.sx - u.x || 0, u.sy - u.y || 0), (u.x = b.x), (u.y = b.y), f.translate(b.x - u.sx, b.y - u.sy), p.rot && f.rotate(u.r + b.alpha, b.x, b.y);
                                                    break;
                                                case C:
                                                    r = +l[g] + m * s * u[g];
                                                    break;
                                                case "colour":
                                                    r = "rgb(" + [Ee(V(l[g].r + m * s * u[g].r)), Ee(V(l[g].g + m * s * u[g].g)), Ee(V(l[g].b + m * s * u[g].b))][T](",") + ")";
                                                    break;
                                                case "path":
                                                    r = [];
                                                    for (var x = 0, w = l[g][E]; x < w; x++) {
                                                        r[x] = [l[g][x][0]];
                                                        for (var k = 1, S = l[g][x][E]; k < S; k++) r[x][k] = +l[g][x][k] + m * s * u[g][x][k];
                                                        r[x] = r[x][T](y);
                                                    }
                                                    r = r[T](y);
                                                    break;
                                                case "csv":
                                                    switch (g) {
                                                        case "translation":
                                                            var q = m * s * u[g][0] - h.x,
                                                                j = m * s * u[g][1] - h.y;
                                                            (h.x += q), (h.y += j), (r = q + y + j);
                                                            break;
                                                        case "rotation":
                                                            (r = +l[g][0] + m * s * u[g][0]), l[g][1] && (r += "," + l[g][1] + "," + l[g][2]);
                                                            break;
                                                        case "scale":
                                                            r = [+l[g][0] + m * s * u[g][0], +l[g][1] + m * s * u[g][1], 2 in p[g] ? p[g][2] : v, 3 in p[g] ? p[g][3] : v][T](y);
                                                            break;
                                                        case "clip-rect":
                                                            for (r = [], x = 4; x--; ) r[x] = +l[g][x] + m * s * u[g][x];
                                                            break;
                                                    }
                                                    break;
                                                default:
                                                    var A = [].concat(l[g]);
                                                    for (r = [], x = f.paper.customAttributes[g].length; x--; ) r[x] = +A[x] + m * s * u[g][x];
                                                    break;
                                            }
                                            d[g] = r;
                                        }
                                    f.attr(d), f._run && f._run.call(f);
                                } else
                                    p.along && ((b = be(p.along, p.len * !p.back)), f.translate(u.sx - (u.x || 0) + b.x - u.sx, u.sy - (u.y || 0) + b.y - u.sy), p.rot && f.rotate(u.r + b.alpha, b.x, b.y)),
                                        (h.x || h.y) && f.translate(-h.x, -h.y),
                                        p.scale && (p.scale += v),
                                        f.attr(p),
                                        we.splice(i--, 1);
                            }
                        }
                        t.svg && f && f.paper && f.paper.safari(), we[E] && setTimeout(ke);
                    },
                    Te = function (e, i, n, r, a) {
                        var s = n - r;
                        i.timeouts.push(
                            setTimeout(function () {
                                t.is(a, "function") && a.call(i), i.animate(e, s, e.easing);
                            }, r)
                        );
                    },
                    Ee = function (t) {
                        return j(A(t, 255), 0);
                    },
                    Se = function (t, e) {
                        if (null == t) return { x: this._.tx, y: this._.ty, toString: de };
                        switch (((this._.tx += +t), (this._.ty += +e), this.type)) {
                            case "circle":
                            case "ellipse":
                                this.attr({ cx: +t + this.attrs.cx, cy: +e + this.attrs.cy });
                                break;
                            case "rect":
                            case "image":
                            case "text":
                                this.attr({ x: +t + this.attrs.x, y: +e + this.attrs.y });
                                break;
                            case "path":
                                var i = gt(this.attrs.path);
                                (i[0][1] += +t), (i[0][2] += +e), this.attr({ path: i });
                                break;
                        }
                        return this;
                    };
                function qe(e) {
                    return function (i, n, r, a) {
                        var s = { back: e };
                        return t.is(r, "function") ? (a = r) : (s.rot = r), i && i.constructor == Rt && (i = i.attrs.path), i && (s.along = i), this.animate(s, n, a);
                    };
                }
                function je(t, e, i, n, r, a) {
                    var s = 3 * e,
                        o = 3 * (n - e) - s,
                        c = 1 - s - o,
                        l = 3 * i,
                        u = 3 * (r - i) - l,
                        p = 1 - l - u;
                    function h(t) {
                        return ((c * t + o) * t + s) * t;
                    }
                    return (function (t, e) {
                        var i = (function (t, e) {
                            var i, n, r, a, l, u;
                            for (r = t, u = 0; u < 8; u++) {
                                if (((a = h(r) - t), M(a) < e)) return r;
                                if (M((l = (3 * c * r + 2 * o) * r + s)) < 1e-6) break;
                                r -= a / l;
                            }
                            if (((n = 1), (r = t) < (i = 0))) return i;
                            if (r > n) return n;
                            for (; i < n; ) {
                                if (((a = h(r)), M(a - t) < e)) return r;
                                t > a ? (i = r) : (n = r), (r = (n - i) / 2 + i);
                            }
                            return r;
                        })(t, e);
                        return ((p * i + u) * i + l) * i;
                    })(t, 1 / (200 * a));
                }
                (Xt.animateWith = function (t, e, i, n, r) {
                    for (var a = 0, s = we.length; a < s; a++) we[a].el.id == t.id && (e.start = we[a].start);
                    return this.animate(e, i, n, r);
                }),
                    (Xt.animateAlong = qe()),
                    (Xt.animateAlongBack = qe(1)),
                    (Xt.onAnimation = function (t) {
                        return (this._run = t || 0), this;
                    }),
                    (Xt.animate = function (e, i, n, a) {
                        var s = this;
                        if (((s.timeouts = s.timeouts || []), (!t.is(n, "function") && n) || (a = n || null), s.removed)) return a && a.call(s), s;
                        var o = {},
                            l = {},
                            u = !1,
                            p = {};
                        for (var h in e)
                            if (e[c](h) && (Z[c](h) || s.paper.customAttributes[c](h)))
                                switch (((u = !0), (o[h] = s.attr(h)), null == o[h] && (o[h] = $[h]), (l[h] = e[h]), Z[h])) {
                                    case "along":
                                        var f = ye(e[h]),
                                            d = be(e[h], f * !!e.back),
                                            m = s.getBBox();
                                        (p[h] = f / i), (p.tx = m.x), (p.ty = m.y), (p.sx = d.x), (p.sy = d.y), (l.rot = e.rot), (l.back = e.back), (l.len = f), e.rot && (p.r = z(s.rotate()) || 0);
                                        break;
                                    case C:
                                        p[h] = (l[h] - o[h]) / i;
                                        break;
                                    case "colour":
                                        o[h] = t.getRGB(o[h]);
                                        var g = t.getRGB(l[h]);
                                        p[h] = { r: (g.r - o[h].r) / i, g: (g.g - o[h].g) / i, b: (g.b - o[h].b) / i };
                                        break;
                                    case "path":
                                        var v = Tt(o[h], l[h]);
                                        o[h] = v[0];
                                        var y = v[1];
                                        p[h] = [];
                                        for (var w = 0, k = o[h][E]; w < k; w++) {
                                            p[h][w] = [0];
                                            for (var T = 1, S = o[h][w][E]; T < S; T++) p[h][w][T] = (y[w][T] - o[h][w][T]) / i;
                                        }
                                        break;
                                    case "csv":
                                        var q = b(e[h])[x](r),
                                            j = b(o[h])[x](r);
                                        switch (h) {
                                            case "translation":
                                                (o[h] = [0, 0]), (p[h] = [q[0] / i, q[1] / i]);
                                                break;
                                            case "rotation":
                                                (o[h] = j[1] == q[1] && j[2] == q[2] ? j : [0, q[1], q[2]]), (p[h] = [(q[0] - o[h][0]) / i, 0, 0]);
                                                break;
                                            case "scale":
                                                (e[h] = q), (o[h] = b(o[h])[x](r)), (p[h] = [(q[0] - o[h][0]) / i, (q[1] - o[h][1]) / i, 0, 0]);
                                                break;
                                            case "clip-rect":
                                                for (o[h] = b(o[h])[x](r), p[h] = [], w = 4; w--; ) p[h][w] = (q[w] - o[h][w]) / i;
                                                break;
                                        }
                                        l[h] = q;
                                        break;
                                    default:
                                        for (q = [].concat(e[h]), j = [].concat(o[h]), p[h] = [], w = s.paper.customAttributes[h][E]; w--; ) p[h][w] = ((q[w] || 0) - (j[w] || 0)) / i;
                                        break;
                                }
                        if (u) {
                            var A = t.easing_formulas[n];
                            if (!A)
                                if ((A = b(n).match(Y)) && 5 == A[E]) {
                                    var M = A;
                                    A = function (t) {
                                        return je(t, +M[1], +M[2], +M[3], +M[4], i);
                                    };
                                } else
                                    A = function (t) {
                                        return t;
                                    };
                            we.push({ start: e.start || +new Date(), ms: i, easing: A, from: o, diff: p, to: l, el: s, t: { x: 0, y: 0 } }),
                                t.is(a, "function") &&
                                    (s._ac = setTimeout(function () {
                                        a.call(s);
                                    }, i)),
                                1 == we[E] && setTimeout(ke);
                        } else {
                            var N,
                                U = [];
                            for (var I in e) e[c](I) && Q.test(I) && ((h = { value: e[I] }), "from" == I && (I = 0), "to" == I && (I = 100), (h.key = F(I, 10)), U.push(h));
                            for (U.sort(at), U[0].key && U.unshift({ key: 0, value: s.attrs }), w = 0, k = U[E]; w < k; w++)
                                Te(U[w].value, s, (i / 100) * U[w].key, (i / 100) * ((U[w - 1] && U[w - 1].key) || 0), U[w - 1] && U[w - 1].value.callback);
                            (N = U[U[E] - 1].value.callback) &&
                                s.timeouts.push(
                                    setTimeout(function () {
                                        N.call(s);
                                    }, i)
                                );
                        }
                        return this;
                    }),
                    (Xt.stop = function () {
                        for (var t = 0; t < we.length; t++) we[t].el.id == this.id && we.splice(t--, 1);
                        for (t = 0, ii = this.timeouts && this.timeouts.length; t < ii; t++) clearTimeout(this.timeouts[t]);
                        return (this.timeouts = []), clearTimeout(this._ac), delete this._ac, this;
                    }),
                    (Xt.translate = function (t, e) {
                        return this.attr({ translation: t + " " + e });
                    }),
                    (Xt[_] = function () {
                        return "Raphaël’s object";
                    }),
                    (t.ae = we);
                var Ae = function (t) {
                    if (((this.items = []), (this[E] = 0), (this.type = "set"), t))
                        for (var e = 0, i = t[E]; e < i; e++) !t[e] || (t[e].constructor != Rt && t[e].constructor != Ae) || ((this[this.items[E]] = this.items[this.items[E]] = t[e]), this[E]++);
                };
                for (var Me in ((Ae[o][P] = function () {
                    for (var t, e, i = 0, n = arguments[E]; i < n; i++) !(t = arguments[i]) || (t.constructor != Rt && t.constructor != Ae) || ((this[(e = this.items[E])] = this.items[e] = t), this[E]++);
                    return this;
                }),
                (Ae[o].pop = function () {
                    return delete this[this[E]--], this.items.pop();
                }),
                Xt))
                    Xt[c](Me) &&
                        (Ae[o][Me] = (function (t) {
                            return function () {
                                for (var e = 0, i = this.items[E]; e < i; e++) this.items[e][t][d](this.items[e], arguments);
                                return this;
                            };
                        })(Me));
                (Ae[o].attr = function (e, i) {
                    if (e && t.is(e, O) && t.is(e[0], "object")) for (var n = 0, r = e[E]; n < r; n++) this.items[n].attr(e[n]);
                    else for (var a = 0, s = this.items[E]; a < s; a++) this.items[a].attr(e, i);
                    return this;
                }),
                    (Ae[o].animate = function (e, i, n, r) {
                        (t.is(n, "function") || !n) && (r = n || null);
                        var a,
                            s,
                            o = this.items[E],
                            c = o,
                            l = this;
                        for (
                            r &&
                                (s = function () {
                                    !--o && r.call(l);
                                }),
                                n = t.is(n, I) ? n : s,
                                a = this.items[--c].animate(e, i, n, s);
                            c--;

                        )
                            this.items[c] && !this.items[c].removed && this.items[c].animateWith(a, e, i, n, s);
                        return this;
                    }),
                    (Ae[o].insertAfter = function (t) {
                        for (var e = this.items[E]; e--; ) this.items[e].insertAfter(t);
                        return this;
                    }),
                    (Ae[o].getBBox = function () {
                        for (var t = [], e = [], i = [], n = [], r = this.items[E]; r--; ) {
                            var a = this.items[r].getBBox();
                            t[P](a.x), e[P](a.y), i[P](a.x + a.width), n[P](a.y + a.height);
                        }
                        return { x: (t = A[d](0, t)), y: (e = A[d](0, e)), width: j[d](0, i) - t, height: j[d](0, n) - e };
                    }),
                    (Ae[o].clone = function (t) {
                        t = new Ae();
                        for (var e = 0, i = this.items[E]; e < i; e++) t[P](this.items[e].clone());
                        return t;
                    }),
                    (t.registerFont = function (t) {
                        if (!t.face) return t;
                        this.fonts = this.fonts || {};
                        var e = { w: t.w, face: {}, glyphs: {} },
                            i = t.face["font-family"];
                        for (var n in t.face) t.face[c](n) && (e.face[n] = t.face[n]);
                        if ((this.fonts[i] ? this.fonts[i][P](e) : (this.fonts[i] = [e]), !t.svg))
                            for (var r in ((e.face["units-per-em"] = F(t.face["units-per-em"], 10)), t.glyphs))
                                if (t.glyphs[c](r)) {
                                    var a = t.glyphs[r];
                                    if (
                                        ((e.glyphs[r] = {
                                            w: a.w,
                                            k: {},
                                            d:
                                                a.d &&
                                                "M" +
                                                    a.d[K](/[mlcxtrv]/g, function (t) {
                                                        return { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[t] || "M";
                                                    }) +
                                                    "z",
                                        }),
                                        a.k)
                                    )
                                        for (var s in a.k) a[c](s) && (e.glyphs[r].k[s] = a.k[s]);
                                }
                        return t;
                    }),
                    (n.getFont = function (e, i, n, r) {
                        if (((r = r || "normal"), (n = n || "normal"), (i = +i || { normal: 400, bold: 700, lighter: 300, bolder: 800 }[i] || 400), t.fonts)) {
                            var a,
                                s = t.fonts[e];
                            if (!s) {
                                var o = new RegExp("(^|\\s)" + e[K](/[^\w\d\s+!~.:_-]/g, v) + "(\\s|$)", "i");
                                for (var l in t.fonts)
                                    if (t.fonts[c](l) && o.test(l)) {
                                        s = t.fonts[l];
                                        break;
                                    }
                            }
                            if (s) for (var u = 0, p = s[E]; u < p && ((a = s[u]).face["font-weight"] != i || (a.face["font-style"] != n && a.face["font-style"]) || a.face["font-stretch"] != r); u++);
                            return a;
                        }
                    }),
                    (n.print = function (e, i, n, a, s, o, c) {
                        (o = o || "middle"), (c = j(A(c || 0, 1), -1));
                        var l,
                            u = this.set(),
                            p = b(n)[x](v),
                            h = 0;
                        if ((t.is(a, n) && (a = this.getFont(a)), a)) {
                            l = (s || 16) / a.face["units-per-em"];
                            for (var f = a.face.bbox.split(r), d = +f[0], m = +f[1] + ("baseline" == o ? f[3] - f[1] + +a.face.descent : (f[3] - f[1]) / 2), g = 0, y = p[E]; g < y; g++) {
                                var w = (g && a.glyphs[p[g - 1]]) || {},
                                    k = a.glyphs[p[g]];
                                (h += g ? (w.w || a.w) + ((w.k && w.k[p[g]]) || 0) + a.w * c : 0), k && k.d && u[P](this.path(k.d).attr({ fill: "#000", stroke: "none", translation: [h, 0] }));
                            }
                            u.scale(l, l, d, m).translate(e - d, i - m);
                        }
                        return u;
                    }),
                    (t.format = function (e, i) {
                        var n = t.is(i, O) ? [0][m](i) : arguments;
                        return (
                            e &&
                                t.is(e, I) &&
                                n[E] - 1 &&
                                (e = e[K](s, function (t, e) {
                                    return null == n[++e] ? v : n[e];
                                })),
                            e || v
                        );
                    }),
                    (t.ninja = function () {
                        return p.was ? (u.Raphael = p.is) : delete e, t;
                    }),
                    (t.el = Xt),
                    (t.st = Ae[o]),
                    p.was ? (u.Raphael = t) : (e = t);
            })(),
            e
        );
    }),
    define("scripts/lib/sound.js", function (t) {
        var e = require("scripts/lib/buzz");
        function i(t) {
            this.sound = new e.sound(t, { formats: ["ogg", "mp3"], preload: !0, autoload: !0, loop: !1 });
        }
        return (
            (i.prototype.play = function () {
                this.sound.setPercent(0), this.sound.setVolume(8), this.sound.play();
            }),
            (i.prototype.stop = function () {
                this.sound.fadeOut(0, function () {
                    this.pause();
                });
            }),
            (t.create = function (t) {
                return new i(t);
            }),
            t
        );
    }),
    define("scripts/lib/tween.js", function (t) {
        return (
            (t.exponential = function () {}),
            (t.exponential.co = function (t, e, i, n) {
                return t == n ? e + i : i * (1 - Math.pow(2, (-10 * t) / n)) + e;
            }),
            (t.bounce = function () {}),
            (t.bounce.co = function (t, e, i, n) {
                return (t /= n) < 1 / 2.75
                    ? i * (7.5625 * t * t) + e
                    : t < 2 / 2.75
                    ? i * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + e
                    : t < 2.5 / 2.75
                    ? i * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + e
                    : i * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + e;
            }),
            (t.quadratic = function () {}),
            (t.quadratic.ci = function (t, e, i, n) {
                return i * (t /= n) * t + e;
            }),
            (t.quadratic.co = function (t, e, i, n) {
                return -i * (t /= n) * (t - 2) + e;
            }),
            (t.quadratic.cio = function (t, e, i, n) {
                return (t /= n / 2) < 1 ? (i / 2) * t * t + e : (-i / 2) * (--t * (t - 2) - 1) + e;
            }),
            (t.circular = function (t, e, i, n) {
                return (t /= n / 2) < 1 ? (-i / 2) * (Math.sqrt(1 - t * t) - 1) + e : (i / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + e;
            }),
            (t.linear = function (t, e, i, n) {
                return (i * t) / n + e;
            }),
            (t.back = function () {}),
            (t.back.ci = function (t, e, i, n, r) {
                return i * (t /= n) * t * (((r = 1.70158) + 1) * t - r) + e;
            }),
            (t.back.co = function (t, e, i, n, r) {
                return i * ((t = t / n - 1) * t * (((r = 1.70158) + 1) * t + r) + 1) + e;
            }),
            t
        );
    }),
    define("scripts/lib/ucren.js", function (exports) {
        var Ucren,
            blankArray = [],
            slice = blankArray.slice,
            join = blankArray.join,
            div,
            send,
            incept,
            map,
            reOpacity,
            getStyle;
        for (var i in (String.prototype.trim ||
            (String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/, "");
            }),
        (String.prototype.format = function (t) {
            var e = this;
            return (
                Ucren.each(t, function (t, i) {
                    (t = t.toString().replace(/\$/g, "$$$$")), (e = e.replace(RegExp("@{" + i + "}", "g"), t));
                }),
                e.toString()
            );
        }),
        (String.prototype.htmlEncode =
            ((div = document.createElement("div")),
            function () {
                var t;
                return div.appendChild(document.createTextNode(this)), (t = div.innerHTML), (div.innerHTML = ""), t;
            })),
        (String.prototype.byteLength = function () {
            return this.replace(/[^\x00-\xff]/g, "  ").length;
        }),
        (String.prototype.subByte = function (t, e) {
            var i = this;
            return i.byteLength() <= t
                ? i
                : ((t -= (e = e || "").byteLength()),
                  (i =
                      i
                          .slice(0, t)
                          .replace(/([^\x00-\xff])/g, "$1 ")
                          .slice(0, t)
                          .replace(/[^\x00-\xff]$/, "")
                          .replace(/([^\x00-\xff]) /g, "$1") + e));
        }),
        (Function.prototype.defer = function (t, e) {
            var i = this;
            return setTimeout(function () {
                i.apply(t, arguments);
            }, e);
        }),
        Function.prototype.bind ||
            (Function.prototype.bind = function (t) {
                var e = this;
                return function () {
                    return e.apply(t, arguments);
                };
            }),
        (Function.prototype.saturate = function (t) {
            var e = this,
                i = slice.call(arguments, 1);
            return function () {
                return e.apply(t, slice.call(arguments, 0).concat(i));
            };
        }),
        (Array.prototype.indexOf = function (t, e) {
            var i = this.length;
            for (e || (e = 0), e < 0 && (e = i + e); e < i; e++) if (this[e] === t) return e;
            return -1;
        }),
        (Array.prototype.every = function (t, e) {
            for (var i = 0, n = this.length; i < n; i++) if (!t.call(e, this[i], i, this)) return !1;
            return !0;
        }),
        (Array.prototype.filter = function (t, e) {
            for (var i, n = [], r = 0, a = this.length; r < a; r++) (i = this[r]), t.call(e, i, r, this) && n.push(i);
            return n;
        }),
        (Array.prototype.forEach = function (t, e) {
            for (var i = 0, n = this.length; i < n; i++) t.call(e, this[i], i, this);
        }),
        (Array.prototype.map = function (t, e) {
            for (var i = [], n = 0, r = this.length; n < r; n++) i[n] = t.call(e, this[n], n, this);
            return i;
        }),
        (Array.prototype.some = function (t, e) {
            for (var i = 0, n = this.length; i < n; i++) if (t.call(e, this[i], i, this)) return !0;
            return !1;
        }),
        (Array.prototype.invoke = function (t) {
            var e = slice.call(arguments, 1);
            return (
                this.forEach(function (i) {
                    i instanceof Array ? i[0][t].apply(i[0], i.slice(1)) : i[t].apply(i, e);
                }),
                this
            );
        }),
        (Array.prototype.random = function () {
            for (var t = this.slice(0), e = [], i = t.length; i--; ) e.push(t.splice(Ucren.randomNumber(i + 1), 1)[0]);
            return e;
        }),
        (Ucren = {
            isIe: /msie/i.test(navigator.userAgent),
            isIe6: /msie 6/i.test(navigator.userAgent),
            isFirefox: /firefox/i.test(navigator.userAgent),
            isSafari: /version\/[\d\.]+\s+safari/i.test(navigator.userAgent),
            isOpera: /opera/i.test(navigator.userAgent),
            isChrome: /chrome/i.test(navigator.userAgent),
            isStrict: "CSS1Compat" == document.compatMode,
            tempDom: document.createElement("div"),
            apply: function (t, e, i) {
                return (
                    e || (e = {}),
                    i
                        ? Ucren.each(t, function (t, n) {
                              n in i || (e[n] = t);
                          })
                        : Ucren.each(t, function (t, i) {
                              e[i] = t;
                          }),
                    e
                );
            },
            appendStyle: function (t) {
                var e;
                arguments.length > 1 && (t = join.call(arguments, "")),
                    document.createStyleSheet
                        ? ((e = document.createStyleSheet()).cssText = t)
                        : (((e = document.createElement("style")).type = "text/css"), e.appendChild(document.createTextNode(t)), document.getElementsByTagName("head")[0].appendChild(e));
            },
            addEvent: function (t, e, i) {
                var n = function () {
                    i.apply(t, arguments);
                };
                return t.dom && (t = t.dom), window.attachEvent ? t.attachEvent("on" + e, n) : window.addEventListener ? t.addEventListener(e, n, !1) : (t["on" + e] = n), n;
            },
            delEvent: function (t, e, i) {
                window.detachEvent ? t.detachEvent("on" + e, i) : window.removeEventListener ? t.removeEventListener(e, i, !1) : t["on" + e] == i && (t["on" + e] = null);
            },
            Class: function (t, e, i, n) {
                var r, a;
                return (
                    (t = t || function () {}),
                    (e = e || {}),
                    {},
                    (r = function () {
                        (this.instanceId = Ucren.id()), t.apply(this, arguments);
                    }),
                    (a = r.prototype),
                    Ucren.registerClassEvent.call(a),
                    Ucren.each(e, function (t, e) {
                        var r, s;
                        a[e] =
                            ((s = e),
                            "function" == typeof (r = t)
                                ? function () {
                                      var t, e;
                                      if (((t = slice.call(arguments, 0)), !i || !1 !== i.apply(this, [s].concat(t))))
                                          return this.fireEvent("before" + s, t), (e = r.apply(this, t)), n && n.apply(this, [s].concat(t)), this.fireEvent(s, t), e;
                                  }
                                : r);
                    }),
                    (a.getOriginMethod = function (t) {
                        return e[t];
                    }),
                    r
                );
            },
            registerClassEvent: function () {
                (this.on = function (t, e) {
                    var i = this.instanceId;
                    Ucren.dispatch(i + t, e.bind(this));
                }),
                    (this.onbefore = function (t, e) {
                        var i = this.instanceId;
                        Ucren.dispatch(i + "before" + t, e.bind(this));
                    }),
                    (this.un = function (t, e) {}),
                    (this.fireEvent = function (t, e) {
                        var i = this.instanceId;
                        Ucren.dispatch(i + t, e);
                    });
            },
            createFuze: function () {
                var t, e, i;
                return (
                    (t = []),
                    ((e = function (e) {
                        i ? e() : t.push(e);
                    }).fire = function () {
                        for (; t.length; ) t.shift()();
                        i = !0;
                    }),
                    (e.extinguish = function () {
                        i = !1;
                    }),
                    (e.wettish = function () {
                        t.length && t.shift()();
                    }),
                    e
                );
            },
            dispatch:
                ((map = {}),
                (send = function (t, e, i) {
                    var n;
                    (n = map[t]) &&
                        Ucren.each(n, function (t) {
                            t.apply(i, e);
                        });
                }),
                (incept = function (t, e) {
                    map[t] || (map[t] = []), map[t].push(e);
                }),
                function (t, e, i) {
                    void 0 === e && (e = []), e instanceof Array ? send.apply(this, arguments) : "function" == typeof e && incept.apply(this, arguments);
                }),
            each: function (t, e) {
                if (t instanceof Array || ("object" == typeof t && void 0 !== t[0] && t.length)) "object" == typeof t && Ucren.isSafari && (t = slice.call(t)), t.forEach(e);
                else if ("object" == typeof t) {
                    var i = {};
                    for (var n in t) if (!i[n] && !1 === e(t[n], n)) break;
                } else if ("number" == typeof t) for (n = 0; n < t && !1 !== e(n, n); n++);
                else if ("string" == typeof t) {
                    n = 0;
                    for (var r = t.length; n < r && !1 !== e(t.charAt(n), n); n++);
                }
            },
            Element: function (t, e) {
                var i, n;
                return t && t.isUcrenElement
                    ? e
                        ? t.dom
                        : t
                    : (t = "string" == typeof t ? document.getElementById(t) : t)
                    ? e
                        ? t
                        : "string" == typeof (n = t.getAttribute("handleId"))
                        ? Ucren.handle(n - 0)
                        : ((i = new Ucren.BasicElement(t)), (n = Ucren.handle(i)), t.setAttribute("handleId", n + ""), i)
                    : null;
            },
            Event: function (t) {
                if (!(t = t || window.event)) for (var e = arguments.callee.caller; e && (!(t = e.arguments[0]) || "boolean" != typeof t.altKey); ) (e = e.caller), (t = null);
                return t;
            },
            fixNumber: function (t, e) {
                return "number" == typeof t ? t : e;
            },
            fixString: function (t, e) {
                return "string" == typeof t ? t : e;
            },
            fixConfig: function (t) {
                return void 0 === t ? {} : "function" == typeof t ? new t() : t;
            },
            handle: function (t) {
                var e, i, n;
                return (
                    (e = arguments.callee).cache || (e.cache = {}),
                    void 0 === e.number && (e.number = 0),
                    "number" == (i = typeof t) ? e.cache[t.toString()] : "object" == i || "function" == i ? ((n = e.number++), (e.cache[n.toString()] = t), n) : void 0
                );
            },
            id: function () {
                var t = arguments.callee;
                return (t.number = ++t.number || 0), "_" + t.number;
            },
            loadImage: function (t, e) {
                var i = t.length,
                    n = 0;
                Ucren.each(t, function (t) {
                    var r = document.createElement("img");
                    (r.onload = r.onerror = function () {
                        (this.onload = this.onerror = null), ++n == i && e && e();
                    }),
                        Ucren.tempDom.appendChild(r),
                        (r.src = t);
                });
            },
            loadScript: function (src, callback) {
                Ucren.request(src, function (text) {
                    eval(text), callback && callback(text);
                });
            },
            makeElement: function (t, e) {
                var i,
                    n = document.createElement(t);
                for (var r in e) "class" === r ? (n.className = e[r]) : "for" === r ? (n.htmlFor = e[r]) : "style" === r ? ("string" == typeof (i = e[r]) ? (n.style.cssText = i) : Ucren.apply(i, n.style)) : n.setAttribute(r, e[r]);
                return n;
            },
            nul: function () {
                return !1;
            },
            randomNumber: function (t) {
                return Math.floor(Math.random() * t);
            },
            randomWord: function (t, e) {
                var i,
                    n = [];
                return (
                    (i = e || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"),
                    Ucren.each(
                        t,
                        function (t) {
                            n[t] = i.charAt(this.randomNumber(i.length));
                        }.bind(this)
                    ),
                    n.join("")
                );
            },
            request: function (t, e) {
                request = Ucren.request;
                var i = request.xhr;
                request.xhr || (i = window.XMLHttpRequest ? (request.xhr = new XMLHttpRequest()) : (request.xhr = new ActiveXObject("Microsoft.XMLHTTP"))),
                    i.open("GET", t, !0),
                    (i.onreadystatechange = function () {
                        4 == i.readyState && 200 == i.status && e(i.responseText);
                    }),
                    i.send(null);
            },
        }),
        (Ucren.BasicDrag = Ucren.Class(
            function (t) {
                (t = Ucren.fixConfig(t)), (this.type = Ucren.fixString(t.type, "normal"));
                var e = (this.isTouch = "ontouchstart" in window);
                (this.TOUCH_START = e ? "touchstart" : "mousedown"), (this.TOUCH_MOVE = e ? "touchmove" : "mousemove"), (this.TOUCH_END = e ? "touchend" : "mouseup");
            },
            {
                bind: function (t, e) {
                    (t = Ucren.Element(t)), (e = Ucren.Element(e) || t);
                    var i = {};
                    (i[this.TOUCH_START] = function (t) {
                        return (t = Ucren.Event(t)), this.startDrag(), (t.cancelBubble = !0), t.stopPropagation && t.stopPropagation(), (t.returnValue = !1);
                    }.bind(this)),
                        e.addEvents(i),
                        (this.target = t);
                },
                getCoors: function (t) {
                    var e = [];
                    if (t.targetTouches && t.targetTouches.length) {
                        var i = t.targetTouches[0];
                        (e[0] = i.clientX), (e[1] = i.clientY);
                    } else (e[0] = t.clientX), (e[1] = t.clientY);
                    return e;
                },
                startDrag: function () {
                    var t, e, i;
                    (e = (t = this.target).draging = {}), (this.isDraging = !0), (e.x = parseInt(t.style("left"), 10) || 0), (e.y = parseInt(t.style("top"), 10) || 0), (i = Ucren.Event());
                    var n = this.getCoors(i);
                    (e.mouseX = n[0]), (e.mouseY = n[1]), this.registerDocumentEvent();
                },
                endDrag: function () {
                    (this.isDraging = !1), this.unRegisterDocumentEvent();
                },
                registerDocumentEvent: function () {
                    var t, e;
                    (t = this.target),
                        ((e = t.draging).documentSelectStart = Ucren.addEvent(document, "selectstart", function (t) {
                            return (t = t || event).stopPropagation && t.stopPropagation(), (t.cancelBubble = !0), (t.returnValue = !1);
                        })),
                        (e.documentMouseMove = Ucren.addEvent(
                            document,
                            this.TOUCH_MOVE,
                            function (t) {
                                var i, n;
                                (t = t || event), (i = Ucren.isIe && 1 != t.button), (n = !Ucren.isIe && 0 != t.button), (!i && !n) || this.isTouch || this.endDrag();
                                var r = this.getCoors(t);
                                return (e.newMouseX = r[0]), (e.newMouseY = r[1]), t.stopPropagation && t.stopPropagation(), (t.returnValue = !1);
                            }.bind(this)
                        )),
                        (e.documentMouseUp = Ucren.addEvent(
                            document,
                            this.TOUCH_END,
                            function () {
                                this.endDrag();
                            }.bind(this)
                        )),
                        clearInterval(e.timer),
                        (e.timer = setInterval(
                            function () {
                                var i, n, r, a;
                                e.newMouseX && ((r = e.newMouseX - e.mouseX), (a = e.newMouseY - e.mouseY), (i = e.x + r), (n = e.y + a), "calc" == this.type ? this.returnValue(r, a, e.newMouseX, e.newMouseY) : t.left(i).top(n));
                            }.bind(this),
                            10
                        ));
                },
                unRegisterDocumentEvent: function () {
                    var t = this.target.draging;
                    Ucren.delEvent(document, this.TOUCH_MOVE, t.documentMouseMove), Ucren.delEvent(document, this.TOUCH_END, t.documentMouseUp), Ucren.delEvent(document, "selectstart", t.documentSelectStart), clearInterval(t.timer);
                },
                returnValue: function (t, e, i, n) {},
            }
        )),
        (Ucren.Template = Ucren.Class(
            function () {
                this.string = join.call(arguments, "");
            },
            {
                apply: function (t) {
                    return this.string.format(t);
                },
            }
        )),
        (Ucren.BasicElement = Ucren.Class(
            function (t) {
                (this.dom = t), (this.countMapping = {});
            },
            {
                isUcrenElement: !0,
                attr: function (t, e) {
                    return "string" != typeof e ? this.dom.getAttribute(t) : (this.dom.setAttribute(t, e), this);
                },
                style:
                    ((getStyle = Ucren.isIe
                        ? function (t) {
                              return this.dom.currentStyle[t];
                          }
                        : function (t) {
                              return document.defaultView.getComputedStyle(this.dom, null).getPropertyValue(t);
                          }),
                    function (t, e) {
                        if ("object" == typeof t)
                            Ucren.each(
                                t,
                                function (t, e) {
                                    this[e] = t;
                                }.bind(this.dom.style)
                            );
                        else {
                            if ("string" == typeof t && void 0 === e) return getStyle.call(this, t);
                            "string" == typeof t && void 0 !== e && (this.dom.style[t] = e);
                        }
                        return this;
                    }),
                hasClass: function (t) {
                    return (" " + this.dom.className + " ").indexOf(" " + t + " ") > -1;
                },
                setClass: function (t) {
                    return "string" == typeof t && (this.dom.className = t.trim()), this;
                },
                addClass: function (t) {
                    var e, i;
                    return -1 == (i = " " + (e = this.dom).className + " ").indexOf(" " + t + " ") && ((i = (i = (i += t).trim()).replace(/ +/g, " ")), (e.className = i)), this;
                },
                delClass: function (t) {
                    var e, i;
                    return (i = " " + (e = this.dom).className + " ").indexOf(" " + t + " ") > -1 && ((i = (i = (i = i.replace(" " + t + " ", " ")).trim()).replace(/ +/g, " ")), (e.className = i)), this;
                },
                html: function (t) {
                    var e = this.dom;
                    if ("string" == typeof t) e.innerHTML = t;
                    else {
                        if (!(t instanceof Array)) return e.innerHTML;
                        e.innerHTML = t.join("");
                    }
                    return this;
                },
                left: function (t) {
                    var e = this.dom;
                    return "number" != typeof t ? this.getPos().x : ((e.style.left = t + "px"), this.fireEvent("infect", [{ left: t }]), this);
                },
                top: function (t) {
                    var e = this.dom;
                    return "number" != typeof t ? this.getPos().y : ((e.style.top = t + "px"), this.fireEvent("infect", [{ top: t }]), this);
                },
                width: function (t) {
                    var e = this.dom;
                    if ("number" == typeof t) (e.style.width = t + "px"), this.fireEvent("infect", [{ width: t }]);
                    else {
                        if ("string" != typeof t) return this.getSize().width;
                        (e.style.width = t), this.fireEvent("infect", [{ width: t }]);
                    }
                    return this;
                },
                height: function (t) {
                    var e = this.dom;
                    if ("number" == typeof t) (e.style.height = t + "px"), this.fireEvent("infect", [{ height: t }]);
                    else {
                        if ("string" != typeof t) return this.getSize().height;
                        (e.style.height = t), this.fireEvent("infect", [{ height: t }]);
                    }
                    return this;
                },
                count: function (t) {
                    return (this.countMapping[t] = ++this.countMapping[t] || 1);
                },
                display: function (t) {
                    var e = this.dom;
                    return "boolean" != typeof t ? "none" != this.style("display") : ((e.style.display = t ? "block" : "none"), this.fireEvent("infect", [{ display: t }]), this);
                },
                first: function () {
                    for (var t = this.dom.firstChild; t && !t.tagName && t.nextSibling; ) t = t.nextSibling;
                    return t;
                },
                add: function (t) {
                    var e;
                    return (e = Ucren.Element(t)), this.dom.appendChild(e.dom), this;
                },
                remove: function (t) {
                    var e;
                    return t ? ((e = Ucren.Element(t)).html(""), this.dom.removeChild(e.dom)) : (e = Ucren.Element(this.dom.parentNode)).remove(this), this;
                },
                insert: function (t) {
                    var e;
                    return (e = this.dom).firstChild ? e.insertBefore(t, e.firstChild) : this.add(t), this;
                },
                addEvents: function (t) {
                    var e, i;
                    return (
                        {},
                        (i = {}),
                        (e = this.dom),
                        Ucren.each(t, function (t, n) {
                            i[n] = Ucren.addEvent(e, n, t);
                        }),
                        i
                    );
                },
                removeEvents: function (t) {
                    var e;
                    return (
                        {},
                        (e = this.dom),
                        Ucren.each(t, function (t, i) {
                            Ucren.delEvent(e, i, t);
                        }),
                        this
                    );
                },
                getPos: function () {
                    var t, e, i, n, r;
                    if (((i = {}), (t = this.dom).getBoundingClientRect)) {
                        (n = t.getBoundingClientRect()), (r = Ucren.isIe ? 2 : 0);
                        var a = document,
                            s = Math.max(a.documentElement.scrollTop, a.body.scrollTop),
                            o = Math.max(a.documentElement.scrollLeft, a.body.scrollLeft);
                        return { x: n.left + o - r, y: n.top + s - r };
                    }
                    if (((i = { x: t.offsetLeft, y: t.offsetTop }), (e = t.offsetParent) != t)) for (; e; ) (i.x += e.offsetLeft), (i.y += e.offsetTop), (e = e.offsetParent);
                    for (
                        Ucren.isSafari && "absolute" == this.style("position") && ((i.x -= document.body.offsetLeft), (i.y -= document.body.offsetTop)), e = t.parentNode ? t.parentNode : null;
                        e && "BODY" != e.tagName.toUpperCase() && "HTML" != e.tagName.toUpperCase();

                    )
                        (i.x -= e.scrollLeft), (i.y -= e.scrollTop), (e = e.parentNode ? e.parentNode : null);
                    return i;
                },
                getSize: function () {
                    var t = this.dom,
                        e = this.style("display");
                    if (e && "none" !== e) return { width: t.offsetWidth, height: t.offsetHeight };
                    var i = t.style,
                        n = { visibility: i.visibility, position: i.position, display: i.display },
                        r = { visibility: "hidden", display: "block" };
                    "fixed" !== n.position && (r.position = "absolute"), this.style(r);
                    var a = { width: t.offsetWidth, height: t.offsetHeight };
                    return this.style(n), a;
                },
                observe: function (t, e) {
                    return (t = Ucren.Element(t)).on("infect", e.bind(this)), this;
                },
                usePNGbackground: function (t) {
                    var e;
                    return (
                        (e = this.dom), /\.png$/i.test(t) && Ucren.isIe6 ? (e.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t + "',sizingMethod='scale');") : (e.style.backgroundImage = "url(" + t + ")"), this
                    );
                },
                setAlpha:
                    ((reOpacity = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/),
                    function (t) {
                        var e = this.dom,
                            i = e.style;
                        return (
                            Ucren.isIe
                                ? (e.currentStyle && !e.currentStyle.hasLayout && (i.zoom = 1),
                                  reOpacity.test(i.filter) ? ((t = t >= 99.99 ? "" : "alpha(opacity=" + t + ")"), (i.filter = i.filter.replace(reOpacity, t))) : (i.filter += " alpha(opacity=" + t + ")"))
                                : (i.opacity = t / 100),
                            this
                        );
                    }),
                fadeIn: function (t) {
                    void 0 === this.fadingNumber && (this.fadingNumber = 0), this.setAlpha(this.fadingNumber);
                    var e = function () {
                        this.setAlpha(this.fadingNumber), 100 == this.fadingNumber ? (clearInterval(this.fadingInterval), t && t()) : (this.fadingNumber += 10);
                    }.bind(this);
                    return this.display(!0), clearInterval(this.fadingInterval), (this.fadingInterval = setInterval(e, Ucren.isIe ? 20 : 30)), this;
                },
                fadeOut: function (t) {
                    void 0 === this.fadingNumber && (this.fadingNumber = 100), this.setAlpha(this.fadingNumber);
                    var e = function () {
                        this.setAlpha(this.fadingNumber), 0 == this.fadingNumber ? (clearInterval(this.fadingInterval), this.display(!1), t && t()) : (this.fadingNumber -= 10);
                    }.bind(this);
                    return clearInterval(this.fadingInterval), (this.fadingInterval = setInterval(e, Ucren.isIe ? 20 : 30)), this;
                },
                useMouseAction: function (t, e) {
                    return this.MouseAction || (this.MouseAction = new Ucren.MouseAction({ element: this })), this.MouseAction.use(t, e), this;
                },
            }
        )),
        Ucren.isIe && document.execCommand("BackgroundImageCache", !1, !0),
        Ucren))
            exports[i] = Ucren[i];
        return exports;
    }),
    define("scripts/object/background.js", function (t) {
        var e,
            i,
            n = require("scripts/lib/ucren"),
            r = require("scripts/layer"),
            a = require("scripts/timeline"),
            s = n.randomNumber;
        function o() {
            var t, i;
            (t = s(12) - 6), (i = s(12) - 6), e.attr({ x: t, y: i });
        }
        return (
            (t.set = function () {
                e = r.createImage("default", "images/background.jpg", 0, 0, "100vw", "100vh");
            }),
            (t.wobble = function () {
                i = a.setInterval(o, 50);
            }),
            (t.stop = function () {
                i.stop(), e.attr({ x: 0, y: 0 });
            }),
            t
        );
    }),
    define("scripts/object/console.js", function (t) {
        var e = require("scripts/layer"),
            i = 0,
            n = [];
        return (
            (t.set = function () {}),
            (t.clear = function () {
                for (var t = 0, e = n.length; t < e; t++) n[t].remove();
                n.length = i = 0;
            }),
            (t.log = function (t) {
                (i += 20), n.push(e.createText("default", t, 16, i));
            }),
            t
        );
    }),
    define("scripts/object/developing.js", function (t) {
        require("scripts/layer");
        var e = require("scripts/lib/tween"),
            i = require("scripts/timeline"),
            n = (require("scripts/message"), e.exponential.co);
        return (
            (t.anims = []),
            (t.show = function (t) {
                i.createTask({ start: t, duration: 500, data: [1e-5, 1, "show"], object: this, onTimeUpdate: this.onZooming, onTimeStart: this.onZoomStart, onTimeEnd: this.onZoomEnd, recycle: this.anims }), this.hide(2e3);
            }),
            (t.hide = function (t) {
                i.createTask({ start: t, duration: 500, data: [1, 1e-5, "hide"], object: this, onTimeUpdate: this.onZooming, onTimeStart: this.onZoomStart, onTimeEnd: this.onZoomEnd, recycle: this.anims });
            }),
            (t.onZoomStart = function () {
                this.image.show();
            }),
            (t.onZooming = function (t, e, i, r) {
                this.image.scale((r = n(t, e, i - e, 500)), r);
            }),
            (t.onZoomEnd = function (t, e, i) {
                "hide" === i && this.image.hide();
            }),
            t
        );
    }),
    define("scripts/object/flame.js", function (t) {
        var e = require("scripts/layer").getLayer("fruit"),
            i = require("scripts/timeline"),
            n = require("scripts/lib/ucren"),
            r = Math,
            a = r.cos,
            s = r.sin,
            o = parseInt,
            c = r.random,
            l = r.PI,
            u = 0;
        var p = 15;
        function h(t, e) {
            var i = t[e];
            if (i) {
                var n, r, c, u, h, f, d, m, g;
                if ((n = 1 - (new Date() - i.birthday) / i.life) <= 0) return i.path.remove(), void delete t[i.id];
                (d = i.angle),
                    (m = i.center),
                    (g = i.length),
                    (r = [o(m[0] + a(d) * g * (1 - n)), o(m[1] + s(d) * g * (1 - n))]),
                    (c = [o(r[0] - a(d) * p * n), o(r[1] - s(d) * p * n)]),
                    (u = [o(r[0] + a(d) * p * n), o(r[1] + s(d) * p * n)]),
                    (h = [o(r[0] - a(d + 0.5 * l) * p * 0.4 * n), o(r[1] - s(d + 0.5 * l) * p * 0.4 * n)]),
                    (f = [o(r[0] - a(d - 0.5 * l) * p * 0.4 * n), o(r[1] - s(d - 0.5 * l) * p * 0.4 * n)]),
                    i.path.attr({ path: "M" + c + " Q" + [h, u, f, c].join(" ") });
            }
        }
        function f(t, e) {
            var i = t[e];
            i && (i.path.remove(), delete t[e]);
        }
        return (
            (t.create = function (t, r, a) {
                var s,
                    p,
                    d = {
                        pos: function (t, e) {
                            (m = t), (g = e), v.attr("x", m - 21).attr("y", g - 21);
                        },
                        remove: function () {
                            for (var t in ([s, p].invoke("stop"), v.remove(), y)) f(y, t);
                        },
                    },
                    m = t,
                    g = r,
                    v = e.image("images/smoke.png", m - 21, g - 21, 43, 43).hide(),
                    y = {};
                return (
                    (s = i.setTimeout(function () {
                        v.show(),
                            (p = i.setInterval(
                                function () {
                                    for (var t in (c() < 0.9 &&
                                        (function (t, i, n, r, a) {
                                            a[u] = { id: u++, birthday: new Date(), center: t, angle: i, length: n, life: r, path: e.path().attr({ stroke: "none", fill: o((180 * i) / l) + "-#fafad9-#f0ef9c" }) };
                                        })([m, g], 2 * l * c(), 60, 200 + 500 * c(), y),
                                    y))
                                        h(y, t);
                                },
                                n.isIe ? 20 : 40
                            ));
                    }, a || 0)),
                    d
                );
            }),
            t
        );
    }),
    define("scripts/object/flash.js", function (t) {
        var e,
            i,
            n = require("scripts/layer"),
            r = require("scripts/timeline"),
            a = require("scripts/lib/tween"),
            s = (require("scripts/lib/ucren"), require("scripts/lib/sound")),
            o = a.quadratic.cio,
            c = [],
            l = 100;
        return (
            (t.set = function () {
                (e = n.createImage("flash", "images/flash.png", 0, 0, 358, 20).hide()), (i = s.create("sound/splatter"));
            }),
            (t.showAt = function (t, n, a) {
                e
                    .rotate(a, !0)
                    .scale(1e-5, 1e-5)
                    .attr({ x: t + 0, y: n + 0 })
                    .show(),
                    c.clear && c.clear(),
                    i.play(),
                    r.createTask({ start: 0, duration: l, data: [1e-5, 1], object: this, onTimeUpdate: this.onTimeUpdate, recycle: c }),
                    r.createTask({ start: l, duration: l, data: [1, 1e-5], object: this, onTimeUpdate: this.onTimeUpdate, recycle: c });
            }),
            (t.onTimeUpdate = function (t, i, n, r) {
                e.scale((r = o(t, i, n - i, l)), r);
            }),
            t
        );
    }),
    define("scripts/object/game-over.js", function (t) {
        var e = require("scripts/layer"),
            i = require("scripts/lib/tween"),
            n = require("scripts/timeline"),
            r = (require("scripts/message"), require("scripts/state")),
            a = i.exponential.co;
        return (
            (t.anims = []),
            (t.set = function () {
                let t = Number(window.innerWidth / 2 - 130),
                    i = Number(window.innerHeight / 2 - 50);
                this.image = e.createImage("default", "images/game-over.png", t, i, 250, 60).hide().scale(1e-5, 1e-5);
            }),
            (t.show = function (t) {
                n.createTask({ start: t, duration: 500, data: [1e-5, 1, "show"], object: this, onTimeUpdate: this.onZooming, onTimeStart: this.onZoomStart, onTimeEnd: this.onZoomEnd, recycle: this.anims });
            }),
            (t.hide = function (t) {
                n.createTask({ start: t, duration: 500, data: [1, 1e-5, "hide"], object: this, onTimeUpdate: this.onZooming, onTimeStart: this.onZoomStart, onTimeEnd: this.onZoomEnd, recycle: this.anims });
            }),
            (t.onZoomStart = function (t, e, i) {
                "show" == i && this.image.show();
            }),
            (t.onZooming = function (t, e, i, n) {
                this.image.scale((n = a(t, e, i - e, 500)), n);
            }),
            (t.onZoomEnd = function (t, e, i) {
                "show" == i ? r("click-enable").on() : "hide" === i && this.image.hide();
            }),
            t
        );
    }),
    define("scripts/object/home-desc.js", function (t) {
        var e = require("scripts/factory/displacement"),
            i = require("scripts/lib/tween");
        return e.create("images/home-desc.png", 141, 81, -161, 140, 7, 80, i.exponential.co, 500);
    }),
    define("scripts/object/home-mask.js", function (t) {
        var e = require("scripts/factory/displacement"),
            i = require("scripts/lib/tween");
        return e.create("images/home-mask.png", window.innerWidth, 103, 0, -183, 0, 0, i.exponential.co, 1e3);
    }),
    define("scripts/object/knife.js", function (t) {
        var e = require("scripts/timeline"),
            i = require("scripts/layer").getLayer("knife"),
            n = (require("scripts/lib/ucren"), null),
            r = null,
            a = Math.abs,
            s = [],
            o = !0,
            c = [];
        function l(t) {
            (this.sx = t.sx), (this.sy = t.sy), (this.ex = t.ex), (this.ey = t.ey), c.push(this);
        }
        return (
            (l.prototype.set = function () {
                var t, n, r, o, c, l, u, p;
                return (
                    (t = this.sx),
                    (n = this.sy),
                    (r = this.ex),
                    (l = n - (o = this.ey)),
                    (u = a((c = t - r))) > (p = a(l)) ? ((t += c < 0 ? -1 : 1), (n += l < 0 ? (-1 * p) / u : (1 * p) / u)) : ((t += c < 0 ? (-1 * u) / p : (1 * u) / p), (n += l < 0 ? -1 : 1)),
                    (this.line = i.path("M" + t + "," + n + "L" + r + "," + o).attr({ stroke: "#cbd3db", "stroke-width": "10px" })),
                    e.createTask({ start: 0, duration: 200, object: this, onTimeUpdate: this.update, onTimeEnd: this.end, recycle: s }),
                    this
                );
            }),
            (l.prototype.update = function (t) {
                this.line.attr("stroke-width", 10 * (1 - t / 200) + "px");
            }),
            (l.prototype.end = function () {
                var t;
                this.line.remove(), (t = c.indexOf(this)) && c.splice(t, 1);
            }),
            (t.newKnife = function () {
                n = r = null;
            }),
            (t.through = function (t, e) {
                if (o) {
                    var i = null;
                    return null === n || (n == t && r == e) || (new l({ sx: n, sy: r, ex: t, ey: e }).set(), (i = [n, r, t, e])), (n = t), (r = e), i;
                }
            }),
            (t.pause = function () {
                s.clear(), this.switchOff();
            }),
            (t.switchOff = function () {
                o = !1;
            }),
            (t.switchOn = function () {
                (o = !0), this.endAll();
            }),
            (t.endAll = function () {
                for (var t = c.length - 1; t >= 0; t--) c[t].end();
            }),
            t
        );
    }),
    define("scripts/object/light.js", function (t) {
        var e = require("scripts/layer"),
            i = e.getLayer("mask");
        e = e.getLayer("light");
        for (var n = require("scripts/lib/ucren"), r = require("scripts/timeline"), a = require("scripts/message"), s = n.randomNumber, o = Math.PI, c = Math.sin, l = Math.cos, u = [], p = [], h = 0; h < 10; h++) p[h] = h;
        return (
            (t.start = function (t) {
                for (
                    var i = t.originX,
                        n = t.originY,
                        a = 0,
                        h = p.random(),
                        f = function () {
                            !(function (t, i, n) {
                                var r, a, p, h, f, d;
                                (r = 36 * n + s(10)), (a = (o * (a = r + 5)) / 180), (p = t + 640 * l((r = (o * r) / 180))), (h = i + 640 * c(r)), (f = t + 640 * l(a)), (d = i + 640 * c(a));
                                var m = e.path(["M", t, i, "L", p, h, "L", f, d, "Z"]).attr({ stroke: "none", fill: "#fff" });
                                u.push(m);
                            })(i, n, h[this]);
                        },
                        d = 0;
                    d < 10;
                    d++
                )
                    r.setTimeout(f.bind(d), (a += 200));
                r.setTimeout(
                    function () {
                        this.overWhiteLight();
                    }.bind(this),
                    a + 200
                );
            }),
            (t.overWhiteLight = function () {
                a.postMessage("overWhiteLight.show"), this.removeLights();
                var t = i.rect(0, 0, window.innerWidth, window.innerHeight).attr({ fill: "#fff", stroke: "none" }),
                    e = {
                        onTimeUpdate: function (e) {
                            t.attr("opacity", 1 - e / 4e3);
                        },
                        onTimeEnd: function () {
                            document.querySelector(".saque-ganhou").classList.remove("active"), t.remove(), a.postMessage("game.over"), (number = 0);
                        },
                    };
                r.createTask({ start: 0, duration: 4e3, object: e, onTimeUpdate: e.onTimeUpdate, onTimeEnd: e.onTimeEnd });
            }),
            (t.removeLights = function () {
                for (var t = 0, e = u.length; t < e; t++) u[t].remove();
                u.length = 0;
            }),
            t
        );
    }),
    define("scripts/object/logo.js", function (t) {
        var e = require("scripts/factory/displacement"),
            i = require("scripts/lib/tween");
        return e.create("images/logo.png", 150, 80, 17, -182, 5, 0, i.exponential.co, 1e3);
    }),
    define("scripts/object/lose.js", function (t) {
        var e,
            i,
            n,
            r = require("scripts/layer"),
            a = require("scripts/lib/tween"),
            s = require("scripts/timeline"),
            o = (require("scripts/lib/ucren"), require("scripts/message")),
            c = a.exponential.co,
            l = a.back.co,
            u = 500;
        let p = window.innerWidth;
        var h = { src: "images/x.png", sx: 650, ex: Number(p - 93), y: 6, w: 22, h: 19 },
            f = { src: "images/xx.png", sx: 671, ex: Number(p - 68), y: 6, w: 27, h: 26 },
            d = { src: "images/xxx.png", sx: 697, ex: Number(p - 37), y: 8, w: 31, h: 32 };
        return (
            (t.anims = []),
            (t.set = function () {
                (e = r.createImage("default", h.src, h.sx, h.y, h.w, h.h).hide()), (i = r.createImage("default", f.src, f.sx, f.y, f.w, f.h).hide()), (n = r.createImage("default", d.src, d.sx, d.y, d.w, d.h).hide());
            }),
            (t.show = function (t) {
                s.createTask({ start: t, duration: u, data: ["show", h.sx, h.ex, f.sx, f.ex, d.sx, d.ex], object: this, onTimeUpdate: this.onTimeUpdate, onTimeStart: this.onTimeStart, onTimeEnd: this.onTimeEnd, recycle: this.anims });
            }),
            (t.hide = function (t) {
                s.createTask({ start: t, duration: u, data: ["hide", h.ex, h.sx, f.ex, f.sx, d.ex, d.sx], object: this, onTimeUpdate: this.onTimeUpdate, onTimeStart: this.onTimeStart, onTimeEnd: this.onTimeEnd, recycle: this.anims });
            }),
            (t.showLoseAt = function (t) {
                const c = [
                    [e, h],
                    [i, f],
                    [n, d],
                ];
                !(function (t) {
                    var e = r.createImage("default", "images/lose.png", t - 27, 406, 54, 50).scale(1e-5, 1e-5),
                        i = 500,
                        n = {
                            show: function (t) {
                                s.createTask({ start: t, duration: i, data: [a.back.co, 1e-5, 1], object: this, onTimeUpdate: this.onScaling, onTimeEnd: this.onShowEnd });
                            },
                            hide: function (t) {
                                s.createTask({ start: t, duration: i, data: [a.back.ci, 1, 1e-5], object: this, onTimeUpdate: this.onScaling, onTimeEnd: this.onHideEnd });
                            },
                            onScaling: function (t, n, r, a, s) {
                                e.scale((s = n(t, r, a - r, i)), s);
                            },
                            onShowEnd: function () {
                                this.hide(1500);
                            },
                            onHideEnd: function () {
                                e.remove();
                            },
                        };
                    n.show(200);
                })(t);
                if (number >= 0 && number <= 3) {
                    const t = c[(++number - 1) % c.length],
                        e = t[1].src.replace("x.png", "xf.png");
                    t[0].attr("src", e), this.scaleImage(t[0]), 3 === number && (document.querySelector(".saque-ganhou").classList.remove("active"), (number = 0), o.postMessage("game.over"));
                }
            }),
            (t.scaleImage = function (t) {
                (t.myOnScaling =
                    t.myOnScaling ||
                    function (t, e) {
                        this.scale((e = l(t, 1e-5, 0.99999, 500)), e);
                    }),
                    (t.myOnScaleEnd =
                        t.myOnScaleEnd ||
                        function () {
                            this.scale(1, 1);
                        }),
                    s.createTask({ start: 0, duration: 500, object: t, onTimeUpdate: t.myOnScaling, onTimeEnd: t.myOnScaleEnd, recycle: this.anims });
            }),
            (t.onTimeUpdate = function (t, r, a, s, o, l, p, h) {
                e.attr("x", c(t, a, s - a, u)), i.attr("x", c(t, o, l - o, u)), n.attr("x", c(t, p, h - p, u));
            }),
            (t.onTimeStart = function (t) {
                "show" == t && [e, i, n].invoke("show");
            }),
            (t.onTimeEnd = function (t) {
                "hide" == t &&
                    ([e, i, n].invoke("hide"),
                    [
                        [e, h],
                        [i, f],
                        [n, d],
                    ].forEach(function (t) {
                        t[0].attr("src", t[1].src.replace("xf.png", "x.png"));
                    }));
            }),
            t
        );
    }),
    define("scripts/object/new-game.js", function (t) {
        var e = require("scripts/factory/rotate"),
            i = require("scripts/lib/tween");
        let n = Number(window.innerWidth / 2 - 88),
            r = Number(window.innerHeight / 2 - 93);
        return e.create("images/new-game.png", n, r, 160, 160, 1e-5, i.exponential.co, 500);
    }),
    define("scripts/object/new.js", function (t) {
        var e,
            i = require("scripts/layer"),
            n = require("scripts/lib/tween"),
            r = require("scripts/timeline"),
            a = (require("scripts/lib/ucren"), 300),
            s = n.exponential.co,
            o = n.quadratic.ci;
        return (
            (t.anims = []),
            (t.set = function () {
                e = i.createImage("default", "images/new.png", 129, 328, 0, 0);
            }),
            (t.unset = function () {}),
            (t.show = function (t) {
                r.createTask({ start: t, duration: 500, data: [129, 170, 328, 221, 0, 70, 0, 42], object: this, onTimeUpdate: this.onShowing, onTimeStart: this.onShowStart, onTimeEnd: this.onShowEnd, recycle: this.anims });
            }),
            (t.hide = function (t) {
                this.anims.clear(), r.createTask({ start: t, duration: 500, data: [170, 129, 221, 328, 70, 0, 42, 0], object: this, onTimeUpdate: this.onShowing, recycle: this.anims });
            }),
            (t.jump = function () {
                this.anims.clear(), r.createTask({ start: 0, duration: -1, object: this, onTimeUpdate: this.onJumping, recycle: this.anims });
            }),
            (t.onShowStart = function () {}),
            (t.onShowing = function (t, i, n, r, a, o, c, l, u) {
                e.attr({ x: s(t, i, n - i, 500), y: s(t, r, a - r, 500), width: s(t, o, c - o, 500), height: s(t, l, u - l, 500) });
            }),
            (t.onShowEnd = function () {
                this.jump();
            }),
            (t.onJumping = function (t) {
                var i = parseInt(t / a);
                (t %= a), i % 2 && (t = a - t), e.attr("y", o(t, 221, 8, a));
            }),
            t
        );
    }),
    define("scripts/object/ninja.js", function (t) {
        var e = require("scripts/factory/displacement"),
            i = require("scripts/lib/tween");
        return e.create("images/ninja.png", 120, 66, 315, -140, 147, 19, { show: i.bounce.co, hide: i.exponential.co }, 1e3);
    }),
    define("scripts/object/score.js", function (t) {
        var e,
            i,
            n,
            r = require("scripts/layer"),
            a = require("scripts/lib/tween"),
            s = require("scripts/timeline"),
            o = (require("scripts/lib/ucren"), s.setTimeout.bind(s)),
            c = a.exponential.co,
            l = (require("scripts/message"), 500);
        return (
            (t.anims = []),
            (t.set = function () {
                (e = r.createImage("default", "images/score.png", -94, 8, 29, 31).hide()),
                    (i = r.createText("default", "0", -59, 24, "90-#fc7f0c-#ffec53", "30px").hide()),
                    (n = r.createText("default", "Meta: R$ 10", -93, 48, "#FBFBFB", "14px").hide());
            }),
            (t.show = function (t) {
                s.createTask({ start: t, duration: l, data: ["show", -94, 6, -59, 41, -93, 7], object: this, onTimeUpdate: this.onTimeUpdate, onTimeStart: this.onTimeStart, onTimeEnd: this.onTimeEnd, recycle: this.anims });
            }),
            (t.hide = function (t) {
                s.createTask({ start: t, duration: l, data: ["hide", 6, -94, 41, -59, 7, -93], object: this, onTimeUpdate: this.onTimeUpdate, onTimeStart: this.onTimeStart, onTimeEnd: this.onTimeEnd, recycle: this.anims });
            }),
            (t.number = function (t) {
                i.attr("text", t || 0),
                    e.scale(1.2, 1.2),
                    o(function () {
                        e.scale(1, 1);
                    }, 190);
            }),
            (t.onTimeUpdate = function (t, r, a, s, o, u, p, h) {
                e.attr("x", c(t, a, s - a, l)), i.attr("x", c(t, o, u - o, l)), n.attr("x", c(t, p, h - p, l));
            }),
            (t.onTimeStart = function (t) {
                "show" === t && [e, i, n].invoke("show");
            }),
            (t.onTimeEnd = function (t) {
                "hide" === t && ([e, i, n].invoke("hide"), i.attr("text", 0));
            }),
            t
        );
    }),
    startModule("scripts/main");
