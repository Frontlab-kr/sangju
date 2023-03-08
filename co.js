/**
  stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
  @version v3.7.9
  @link https://github.com/yowainwright/stickybits#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
  @license MIT
**/
!(function (t, s) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = s())
		: "function" == typeof define && define.amd
		? define(s)
		: ((t = t || self).stickybits = s());
})(this, function () {
	"use strict";
	function b() {
		return (b =
			Object.assign ||
			function (t) {
				for (var s = 1; s < arguments.length; s++) {
					var e = arguments[s];
					for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
				}
				return t;
			}).apply(this, arguments);
	}
	var e = (function () {
		function t(t, s) {
			var e = this,
				i = void 0 !== s ? s : {};
			(this.version = "3.7.9"),
				(this.userAgent = window.navigator.userAgent || "no `userAgent` provided by the browser"),
				(this.props = {
					customStickyChangeNumber: i.customStickyChangeNumber || null,
					noStyles: i.noStyles || !1,
					stickyBitStickyOffset: i.stickyBitStickyOffset || 0,
					parentClass: i.parentClass || "js-stickybit-parent",
					scrollEl: "string" == typeof i.scrollEl ? document.querySelector(i.scrollEl) : i.scrollEl || window,
					stickyClass: i.stickyClass || "js-is-sticky",
					stuckClass: i.stuckClass || "js-is-stuck",
					stickyChangeClass: i.stickyChangeClass || "js-is-sticky--change",
					useStickyClasses: i.useStickyClasses || !1,
					useFixed: i.useFixed || !1,
					useGetBoundingClientRect: i.useGetBoundingClientRect || !1,
					verticalPosition: i.verticalPosition || "top",
					applyStyle:
						i.applyStyle ||
						function (t, s) {
							return e.applyStyle(t, s);
						},
				}),
				(this.props.positionVal = this.definePosition() || "fixed"),
				(this.instances = []);
			var n = this.props,
				o = n.positionVal,
				a = n.verticalPosition,
				l = n.noStyles,
				r = n.stickyBitStickyOffset,
				c = "top" !== a || l ? "" : r + "px",
				p = "fixed" !== o ? o : "";
			(this.els = "string" == typeof t ? document.querySelectorAll(t) : t), "length" in this.els || (this.els = [this.els]);
			for (var f = 0; f < this.els.length; f++) {
				var u,
					y = this.els[f],
					h = this.addInstance(y, this.props);
				this.props.applyStyle({ styles: (((u = {})[a] = c), (u.position = p), u), classes: {} }, h), this.manageState(h), this.instances.push(h);
			}
		}
		var s = t.prototype;
		return (
			(s.definePosition = function () {
				var t;
				if (this.props.useFixed) t = "fixed";
				else {
					for (var s = ["", "-o-", "-webkit-", "-moz-", "-ms-"], e = document.head.style, i = 0; i < s.length; i += 1) e.position = s[i] + "sticky";
					(t = e.position ? e.position : "fixed"), (e.position = "");
				}
				return t;
			}),
			(s.addInstance = function (t, s) {
				var e = this,
					i = { el: t, parent: t.parentNode, props: s };
				if ("fixed" === s.positionVal || s.useStickyClasses) {
					this.isWin = this.props.scrollEl === window;
					var n = this.isWin ? window : this.getClosestParent(i.el, i.props.scrollEl);
					this.computeScrollOffsets(i),
						this.toggleClasses(i.parent, "", s.parentClass),
						(i.state = "default"),
						(i.stateChange = "default"),
						(i.stateContainer = function () {
							return e.manageState(i);
						}),
						n.addEventListener("scroll", i.stateContainer);
				}
				return i;
			}),
			(s.getClosestParent = function (t, s) {
				var e = s,
					i = t;
				if (i.parentElement === e) return e;
				for (; i.parentElement !== e; ) i = i.parentElement;
				return e;
			}),
			(s.getTopPosition = function (t) {
				if (this.props.useGetBoundingClientRect) return t.getBoundingClientRect().top + (this.props.scrollEl.pageYOffset || document.documentElement.scrollTop);
				for (var s = 0; (s = t.offsetTop + s), (t = t.offsetParent); );
				return s;
			}),
			(s.computeScrollOffsets = function (t) {
				var s = t,
					e = s.props,
					i = s.el,
					n = s.parent,
					o = !this.isWin && "fixed" === e.positionVal,
					a = "bottom" !== e.verticalPosition,
					l = o ? this.getTopPosition(e.scrollEl) : 0,
					r = o ? this.getTopPosition(n) - l : this.getTopPosition(n),
					c = null !== e.customStickyChangeNumber ? e.customStickyChangeNumber : i.offsetHeight,
					p = r + n.offsetHeight;
				(s.offset = o ? 0 : l + e.stickyBitStickyOffset),
					(s.stickyStart = a ? r - s.offset : 0),
					(s.stickyChange = s.stickyStart + c),
					(s.stickyStop = a ? p - (i.offsetHeight + s.offset) : p - window.innerHeight);
			}),
			(s.toggleClasses = function (t, s, e) {
				var i = t,
					n = i.className.split(" ");
				e && -1 === n.indexOf(e) && n.push(e);
				var o = n.indexOf(s);
				-1 !== o && n.splice(o, 1), (i.className = n.join(" "));
			}),
			(s.manageState = function (r) {
				function t(t) {
					t();
				}
				var c = this,
					p = r,
					f = p.props,
					s = p.state,
					e = p.stateChange,
					i = p.stickyStart,
					n = p.stickyChange,
					o = p.stickyStop,
					u = f.positionVal,
					a = f.scrollEl,
					y = f.stickyClass,
					h = f.stickyChangeClass,
					d = f.stuckClass,
					g = f.verticalPosition,
					l = "bottom" !== g,
					k = f.applyStyle,
					m = f.noStyles,
					v =
						(this.isWin &&
							(window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame)) ||
						t,
					C = this.isWin ? window.scrollY || window.pageYOffset : a.scrollTop,
					S = l && C <= i && ("sticky" === s || "stuck" === s),
					w = o <= C && "sticky" === s;
				i < C && C < o && ("default" === s || "stuck" === s) ? (p.state = "sticky") : S ? (p.state = "default") : w && (p.state = "stuck");
				var x = n <= C && C <= o;
				C < n / 2 || o < C ? (p.stateChange = "default") : x && (p.stateChange = "sticky"),
					(s === p.state && e === p.stateChange) ||
						v(function () {
							var t,
								s,
								e,
								i,
								n,
								o,
								a = {
									sticky: { styles: (((t = { position: u, top: "", bottom: "" })[g] = f.stickyBitStickyOffset + "px"), t), classes: (((s = {})[y] = !0), s) },
									default: { styles: (((e = {})[g] = ""), e), classes: {} },
									stuck: {
										styles: b((((i = {})[g] = ""), i), ("fixed" === u && !m) || !c.isWin ? { position: "absolute", top: "", bottom: "0" } : {}),
										classes: (((n = {})[d] = !0), n),
									},
								};
							"fixed" === u && (a.default.styles.position = "");
							var l = a[p.state];
							(l.classes = (((o = {})[d] = !!l.classes[d]), (o[y] = !!l.classes[y]), (o[h] = x), o)), k(l, r);
						});
			}),
			(s.applyStyle = function (t, s) {
				var e = t.styles,
					i = t.classes,
					n = s.el,
					o = s.props,
					a = n.style,
					l = o.noStyles,
					r = n.className.split(" ");
				for (var c in i) {
					if (i[c]) -1 === r.indexOf(c) && r.push(c);
					else {
						var p = r.indexOf(c);
						-1 !== p && r.splice(p, 1);
					}
				}
				if (((n.className = r.join(" ")), e.position && (a.position = e.position), !l)) for (var f in e) a[f] = e[f];
			}),
			(s.update = function (e) {
				var i = this;
				return (
					void 0 === e && (e = null),
					this.instances.forEach(function (t) {
						if ((i.computeScrollOffsets(t), e)) for (var s in e) t.props[s] = e[s];
					}),
					this
				);
			}),
			(s.removeInstance = function (t) {
				var s,
					e,
					i = t.el,
					n = t.props;
				this.applyStyle(
					{ styles: (((s = { position: "" })[n.verticalPosition] = ""), s), classes: (((e = {})[n.stickyClass] = ""), (e[n.stuckClass] = ""), e) },
					t
				),
					this.toggleClasses(i.parentNode, n.parentClass);
			}),
			(s.cleanup = function () {
				for (var t = 0; t < this.instances.length; t += 1) {
					var s = this.instances[t];
					s.stateContainer && s.props.scrollEl.removeEventListener("scroll", s.stateContainer), this.removeInstance(s);
				}
				(this.manageState = !1), (this.instances = []);
			}),
			t
		);
	})();
	return function (t, s) {
		return new e(t, s);
	};
});

//시작
$(document).ready(function () {
	var agent = navigator.userAgent.toLowerCase();
	if ((navigator.appName == "Netscape" && agent.indexOf("trident") != -1) || agent.indexOf("msie") != -1) {
		$("html").addClass("ie");
	} else {
		// ie가 아닐 경우
	}

	//header,footer include
	var testMode = true;
	var url = location.href;

	if (url.match("127.0.0.1") || url.match("192.168.170.137") || url.match("leeko.eldestbro.synology.me")) {
		if ($(".leeko-404").length > 0) {
		} else {
			$.ajax({
				url: "partials/header.html",
				dataType: "html",
				success: function (data) {
					$(".leeko-header").html(data);
				},
			});
			$.ajax({
				url: "partials/footer.html",
				dataType: "html",
				success: function (data) {
					$(".leeko-footer").html(data);
				},
			});
		}

		setTimeout(function () {
			if (url.match("index")) {
				if (url.match("kor")) {
					$(".leeko-header__logo a").attr("href", "/kor");
				}
				if (url.match("eng")) {
					$(".leeko-header__logo a").attr("href", "/eng");
				}
				if (url.match("chn")) {
					$(".leeko-header__logo a").attr("href", "/chn");
				}
				if (url.match("jpn")) {
					$(".leeko-header__logo a").attr("href", "/jpn");
				}
			}
			if ($(".leeko--url").length > 0) {
				$(".leeko-header__logo a").attr("href", "/");
			}
		}, 1000);
	}

	//pc mo
	var windowWidth = $(window).width();
	if (windowWidth > 1024) {
		$("html").removeClass("mo");
		$("html").removeClass("pc");
		$("html").addClass("pc");
	}
	if (windowWidth < 1025) {
		$("html").removeClass("mo");
		$("html").removeClass("pc");
		$("html").addClass("mo");
	}
	$(window).resize(function () {
		var windowWidth = $(window).width();
		if (windowWidth > 1024) {
			$("html").removeClass("mo");
			$("html").removeClass("pc");
			$("html").addClass("pc");
		}
		if (windowWidth < 1025) {
			$("html").removeClass("mo");
			$("html").removeClass("pc");
			$("html").addClass("mo");
		}
	});

	//layout
	if (url.match("kor") || url.match("lang=KR")) {
		$("html").addClass("lang--kor");
		$(".leeko").addClass("leeko--kor");
	}
	if (url.match("eng") || url.match("lang=EN")) {
		$("html").addClass("lang--eng");
		$(".leeko").addClass("leeko--eng");
	}
	if (url.match("chn") || url.match("lang=CH")) {
		$("html").addClass("lang--chn");
		$(".leeko").addClass("leeko--chn");
	}
	if (url.match("jpn") || url.match("lang=JP")) {
		$("html").addClass("lang--jpn");
		$(".leeko").addClass("leeko--jpn");
	}
	if ($(".leeko-contents--mai00100").length > 0) {
		$(".leeko").addClass("leeko--main");
		$(".leeko").addClass("leeko--header-white");
		//램덤 bg
		var num = Math.floor(Math.random() * 3);
		$(".leeko").addClass("leeko--main--bg" + num);

		//램덤 bg
		var num02 = Math.floor(Math.random() * 5);
		$(".leeko-main-recruit").addClass("leeko-main-recruit--bg" + num02);
	}
	if ($(".leeko-contents--fot00300").length > 0) {
		if ($(".leeko").hasClass("leeko--public") === true) {
			$(".leeko").addClass("leeko--public--sitemap");
			$(".leeko").addClass("leeko--main");
			$(".leeko").addClass("leeko--header-white");
		}
	}

	if ($(".leeko-contents--mem00300").length > 0) {
		var windowWidth = $(window).width();
		var lkInner = $(".leeko-inner").width();
		var lkInnerMargin = (windowWidth - lkInner) / 2;
		var lkwidth = lkInner + lkInnerMargin;

		$(".leeko-member-detail__inner > div").each(function (idx) {
			if (idx % 2 === 1) {
				$(this).append("<div class='leeko-member-detail__bg'></div>");
			}
		});

		$(".leeko-member-detail__img-text").width(lkwidth);
		$(".leeko-member-detail__bg").width(lkInnerMargin);

		$(window).resize(function () {
			windowWidth = $(window).width();
			lkInner = $(".leeko-inner").width();
			lkInnerMargin = (windowWidth - lkInner) / 2;
			lkwidth = lkInner + lkInnerMargin;

			$(".leeko-member-detail__img-text").width(lkwidth);
			$(".leeko-member-detail__bg").width(lkInnerMargin);
		});

		//stickybits(".ie .leeko-member-detail__quick-inner", { stickyBitStickyOffset: 0 });
	}

	//header
	$(document).on("click", ".leeko-header__gnb-open", function () {
		$(".leeko-header").addClass("leeko-header--opengnb");
		$(".leeko-header").removeClass("leeko-header--opensearch");
		return false;
	});
	$(document).on("click", ".leeko-header__gnb-close, .leeko-header__gnb-inner-bg", function () {
		$(".leeko-header").removeClass("leeko-header--opengnb");
		return false;
	});
	$(document).on("click", ".leeko-header__search-open", function () {
		$(".leeko-header").addClass("leeko-header--opensearch");
		$(".leeko-header").removeClass("leeko-header--opengnb");
		return false;
	});
	$(document).on("click", ".leeko-header__search-close, .leeko-header__search-bg", function () {
		$(".leeko-header").removeClass("leeko-header--opensearch");
		return false;
	});
	$(document).keydown(function (event) {
		if (event.keyCode == 27 || event.which == 27) {
			$(".leeko-header").removeClass("leeko-header--opengnb");
			$(".leeko-header").removeClass("leeko-header--opensearch");
		}
	});

	$(document).on("click", ".leeko-header__gnb-list-item strong", function () {
		if ($(this).parents(".leeko-header__gnb-list-item").hasClass("leeko-header__gnb-list-item--active")) {
			$(".leeko-header__gnb-list-item").removeClass("leeko-header__gnb-list-item--active");
		} else {
			$(".leeko-header__gnb-list-item").removeClass("leeko-header__gnb-list-item--active");
			$(this).parents(".leeko-header__gnb-list-item").addClass("leeko-header__gnb-list-item--active");
		}
		// $(".leeko-header__gnb-list-item").each(function () {
		// 	if ($(this).hasClass("leeko-header__gnb-list-item--active")) {
		// 		console.log(1);
		// 	} else {
		// 		console.log(2);
		// 		$(this).removeClass("leeko-header__gnb-list-item--active");
		// 	}
		// });
	});
	$(document).on("click", ".leeko-header__gnb-select-title", function () {
		$(".leeko-header__gnb-select").toggleClass("leeko-header__gnb-select--active");
	});

	$("#schKeyword, #schMainKeyword, #schNameKeyword").attr("autocomplete", "off");

	//board
	setTimeout(function () {
		$(".leeko-header__logo p").html($(".leeko-board-detail__head-title h1").text());
	}, 1000);

	//head
	$(".leeko-head__select strong").on("click", function () {
		$(this).parents(".leeko-head__select").toggleClass("leeko-head__select--active");
	});
	$(".leeko-head__select-bg").on("click", function () {
		$(this).parents(".leeko-head__select").toggleClass("leeko-head__select--active");
	});

	//cursor black

	$("body").append('<div class="cursorBlack"></div>');
	var cursorBlack = $(".cursorBlack");
	gsap.set(cursorBlack, {
		xPercent: -45,
		yPercent: -45,
	});
	document.addEventListener("pointermove", movecursorBlack);
	function movecursorBlack(e) {
		gsap.to(cursorBlack, {
			duration: 0.2,
			x: e.clientX,
			y: e.clientY,
		});
	}
	$(".pc .leeko-public-report .swiper").on("mouseenter", function () {
		cursorBlack.addClass("active");
		$(".swiper-drag *").css({ cursorBlack: "none" });
	});
	$(".pc .leeko-public-report .swiper").on("mouseleave", function () {
		cursorBlack.removeClass("active");
		$(".swiper-drag *").css({ cursorBlack: "default" });
	});

	//cursor orange
	$("body").append('<div class="cursorOrange"></div>');
	var cursorOrange = $(".cursorOrange");
	gsap.set(cursorOrange, {
		xPercent: -45,
		yPercent: -45,
	});
	document.addEventListener("pointermove", movecursorOrange);
	function movecursorOrange(e) {
		gsap.to(cursorOrange, {
			duration: 0.2,
			x: e.clientX,
			y: e.clientY,
		});
	}
	$(".pc .leeko-new-news .swiper, .pc .leeko-new-dc .swiper").on("mouseenter", function () {
		cursorOrange.addClass("active");
		$(".swiper-drag *").css({ cursorOrange: "none" });
	});
	$(".pc .leeko-new-news .swiper, .pc .leeko-new-dc .swiper").on("mouseleave", function () {
		cursorOrange.removeClass("active");
		$(".swiper-drag *").css({ cursorOrange: "default" });
	});

	//cursor thumb
	if ($(".pc .leeko .leeko-contents--pos00200").length > 0) {
		// $("body").append('<div class="cursor-thumb"></div>');
		// var cursorThumb = $(".cursor-thumb");
		// gsap.set(cursorThumb, {
		// 	xPercent: -45,
		// 	yPercent: -45,
		// });
		// document.addEventListener("pointermove", movecursor);
		// function movecursor(e) {
		// 	gsap.to(cursorThumb, {
		// 		duration: 0.2,
		// 		x: e.clientX,
		// 		y: e.clientY,
		// 	});
		// }
		// $(".leeko-accordion-item").on("mouseenter", function () {
		// 	cursorThumb.addClass("active");
		// 	$("*").css({ cursorThumb: "none" });
		// });
		// $(".leeko-accordion-item").on("mouseleave", function () {
		// 	cursorThumb.removeClass("active");
		// 	$("*").css({ cursorThumb: "default" });
		// });
		// $(".leeko-accordion-item").hover(
		// 	function () {
		// 		// over
		// 		var idx = $(this).index() + 1;
		// 		$("html").removeClass("thumb1");
		// 		$("html").removeClass("thumb2");
		// 		$("html").removeClass("thumb3");
		// 		$("html").removeClass("thumb4");
		// 		$("html").removeClass("thumb5");
		// 		$("html").removeClass("thumb6");
		// 		$("html").removeClass("thumb7");
		// 		$("html").removeClass("thumb8");
		// 		$("html").removeClass("thumb9");
		// 		$("html").removeClass("thumb10");
		// 		$("html").removeClass("thumb11");
		// 		$("html").removeClass("thumb12");
		// 		$("html").removeClass("thumb13");
		// 		$("html").removeClass("thumb14");
		// 		$("html").removeClass("thumb15");
		// 		$("html").addClass("thumb" + idx);
		// 	},
		// 	function () {
		// 		// out
		// 	}
		// );
	}

	//file
	$(document).on("change", ".leeko__file-file", function () {
		var cur = $(this)
			.val()
			.replace(/C:\\fakepath\\/i, "");
		$(this).parents(".leeko__file-item").toggleClass("active");
		$(this).parents(".leeko__file-item").find(".leeko__file-text").html(cur);
	});
	var fileItem = 1;
	$(document).on("click", ".leeko__file-item-btn .plus", function () {
		var limit = $(this).parents(".leeko__file-item-btn").attr("data-limit");
		var textFile = "파일 선택";
		var textDel = "삭제";
		if ($(".leeko").hasClass("leeko--eng")) {
			textFile = "Choose file to upload";
			textDel = "Del";
		}

		var fileItemLeng = $(".leeko__file-item").length;
		if (fileItemLeng > limit) {
			return false;
		}
		fileItem++;
		//     var html =
		//       '<div class="ic-contents-board__file-item">\
		//   <div class="ic-contents-board__file-item-form">\
		//     <label for="file0' +
		//       fileItem +
		//       '" class="ic-btn ic-btn--small"><span>파일 선택</span></label>\
		//     <input type="file" id="file0' +
		//       fileItem +
		//       '" name="attachFiles" class="ic-contents-board__file-file" onchange="fileCheck(this)" />\
		//     <span class="ic-contents-board__file-text"></span>\
		//     <p>※ 500MB까지 가능</p>\
		//     <div class="ic-contents-board__file-item-reset">x</div>\
		//   </div>\
		//   <div class="ic-contents-board__file-item-btn">\
		//     <a href="" class="minus"><i class="ico-minus">삭제</i></a>\
		//     <a href="" class="plus"><i class="ico-plus">추가</i></a>\
		//   </div>\
		// </div>';
		var html =
			'<div class="leeko__file-item">\
        <div class="leeko__file-item-form">\
          <input type="file" id="file0' +
			fileItem +
			'" class="leeko__file-file" name="attachFiles" onchange="fileCheck(this)" />\
          <span class="leeko__file-text"></span>\
          <label for="file0' +
			fileItem +
			'" class="leeko-btn leeko-btn--circle"><span>' +
			textFile +
			'</span></label>\
        </div>\
        <div class="leeko__file-item-btn">\
          <a href="" class="minus">' +
			textDel +
			"</a>\
        </div>\
        </div>";

		$(this).parents(".leeko__file").append(html);
		return false;
	});
	$(document).on("click", ".leeko__file-item-btn .minus", function () {
		$(this).parents(".leeko__file-item").remove();
		return false;
	});
	$(document).on("click", ".leeko__file-item-reset", function () {
		$(this).parents(".leeko__file-item").toggleClass("active");
		$(this).parents(".leeko__file-item").find(".leeko__file-file").val("");
		$(this).parents(".leeko__file-item").find(".leeko__file-text").text("");

		return false;
	});

	//detail
	$(".leeko-board-detail__member-title,.leeko-board-detail__team-title").on("click", function () {
		$(this).toggleClass("active");
	});

	// var sumW = 0;
	// $(".leeko-member__category-inner a").each(function () {
	// 	var w = $(this).width();
	// 	sumW += w;
	// 	$(".leeko-member__category-inner").width(sumW + 30);
	// });

	$(".leeko-new-news__item-text ,.leeko-new-pr__item-text, .leeko-new-dc__item-text, .leeko-recruit-list__item-text").each(function () {
		var target = $(this).text();
		var text = target.replace(/&nbsp;/g, "");
		$(this).text(text);
	});

	$(".leeko-awards-list__item-thumb").each(function () {
		$(this).removeClass("trophy-3");
		var num = Math.floor(Math.random() * 3) + 1;
		$(this).addClass("trophy-" + num);
	});
	$(".leeko-pos-introduce__career-item").each(function () {
		$(this).removeClass("trophy-3");
		var num = Math.floor(Math.random() * 3) + 1;
		$(this).addClass("trophy-" + num);
	});

	$(".leeko-head__search").each(function () {
		if ($(this).find(".leeko-head__search-form").length > 0) {
			$(this).addClass("leeko-head__search--select");
			$(".leeko-head--search").addClass("leeko-head--select");
		}
	});

	//임시

	//pdf
	$(".leeko-member-detail__util-item--pdf").click(function () {
		var agent = navigator.userAgent.toLowerCase();

		var frm = document.form1;
		frm.content.value = document.getElementById("tags").innerHTML;
		$("#tags .biography p br").remove();
		frm.action = "/ko/professionals/pdf/송지연";
		if ("true" == "false" && navigator.userAgent.match(/Android/i) != null) {
			frm.submit();
			setTimeout(function () {
				window.open("/pdf/professionals_ko_2069.pdf", "_self");
			}, 3000);
		} else {
			frm.target = "_blank";
			frm.submit();
		}
	});

	// print
	$(".leeko-member-detail__util-item--print").on("click", function () {
		//window.print();
	});

	//accordion
	var acc = document.getElementsByClassName("leeko-accordion-item__title");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			var panel = this.nextElementSibling;
			$(".leeko-accordion-item").removeClass("leeko-accordion-item--active");
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
				$(this).parents(".leeko-accordion-item").addClass("leeko-accordion-item--active");
			}
		});
	}

	//sns
	$(".leeko-member-detail__util-item--share strong").on("click", function () {
		$(".leeko-member-detail__util-item--share").toggleClass("leeko-member-detail__util-item--active");
		$(".leeko-member-detail__head").toggleClass("active");
	});

	//layer popup
	$(".leeko-member-detail__news-item, .leeko-pos-introduce__news-item").on("click", function () {
		if ($(this).hasClass("outlink") === false) {
			$(".leeko-contents").append("<div class='leeko-popup__dim'></div>");
			$(".leeko-member-detail__popup").fadeIn(200);
			target = $(".leeko-member-detail__popup").offset().top - 100;
			$("html, body").stop().animate({ scrollTop: target });
			$(".leeko-pos-introduce__news").addClass("active");
		}
	});
	$(document).on("click", ".leeko-member-detail__popup .popup-close, .leeko-popup__dim", function () {
		$(".leeko-member-detail__popup").fadeOut(200);
		$(".leeko-pos-introduce__news").removeClass("active");
		$(".leeko-popup__dim").remove();
	});

	//footer
	$(document).on("click", ".leeko-footer__btn", function () {
		$("html, body").stop().animate({ scrollTop: "0" });
		return false;
	});
	$(document).on("click", ".leeko-footer__link", function () {
		$(this).toggleClass("active");
	});

	//more
	$(".leeko-member-detail .leeko-btn--plus, .leeko-pos  .leeko-btn--plus").on("click", function () {
		$(this).prev(".leeko-more-contents").toggleClass("active");

		$(this).toggleClass("active");
		if ($(this).hasClass("active")) {
			if (url.match("kor") || url.match("lang=KR")) {
				$(this).find("strong").html("접기");
			}
			if (url.match("eng") || url.match("lang=EN")) {
				$(this).find("strong").html("FOLD");
			}
			if (url.match("chn") || url.match("lang=CH")) {
				$(this).find("strong").html("FOLD");
			}
			if (url.match("jpn") || url.match("lang=JP")) {
				$(this).find("strong").html("FOLD");
			}
		} else {
			if (url.match("kor") || url.match("lang=KR")) {
				$(this).find("strong").html("더보기");
			}
			if (url.match("eng") || url.match("lang=EN")) {
				$(this).find("strong").html("LOAD MORE");
			}
			if (url.match("chn") || url.match("lang=CH")) {
				$(this).find("strong").html("LOAD MORE");
			}
			if (url.match("jpn") || url.match("lang=JP")) {
				$(this).find("strong").html("LOAD MORE");
			}
			target = $(this).prev(".leeko-more-contents").parent().offset().top - $(".leeko-header").height();
			$("html, body").stop().animate({ scrollTop: target });
		}
		return false;
	});

	//more type table
	$(".leeko-member-detail__table").each(function () {
		if ($(this).find("table tr").length < 4) {
			$(this).find(".leeko-btn--plus").hide();
		}
	});

	//more type list
	$(".leeko-member-detail__list").each(function () {
		if ($(this).find("dl dt").length + $(this).find("dl dd").length < 11) {
			$(this).find(".leeko-btn--plus").hide();
		}
	});
	var memberDetailDdLength = 0;
	$(".leeko-member-detail__list dl > *").each(function () {
		if ($(this).is("dd")) {
			memberDetailDdLength++;
		}
		if ($(this).index() === 0) {
			memberDetailDdLength = 0;
		}
		if (memberDetailDdLength < 11) {
			$(this).show();
		}
	});

	//more type news
	$(".leeko-member-detail__news").each(function () {
		if ($(this).find(".leeko-member-detail__news-item").length < 5) {
			$(this).find(".leeko-btn--plus").hide();
		}
	});

	//more type field
	$(".leeko-pos-introduce__field .leeko-more-contents-inner").each(function () {
		$(this).parents(".leeko-pos-introduce__field").find(".leeko-btn--plus").hide();
	});

	//more type case
	$(".leeko-pos-introduce__case .leeko-more-contents-inner").each(function () {
		if ($(this).outerHeight() + 40 < 500) {
			$(this).parents(".leeko-pos-introduce__case").find(".leeko-btn--plus").hide();
		}
		//$(this).parents(".leeko-pos-introduce__case").find(".leeko-btn--plus").hide();
	});

	//mail
	// if ($(".leeko-member-detail__info").length > 0) {
	// 	var mailUrl = $(".leeko-member-detail__info p:eq(1) a").html().split("@");
	// 	$(".leeko-member-detail__info p:eq(1) a").html(mailUrl[0] + "<br class='mo' />@" + mailUrl[1]);
	// }

	//select

	$("select").niceSelect();
	$(".nice-select .list").mCustomScrollbar({
		theme: "dark-thin",
	});

	setTimeout(function () {
		$("select").niceSelect();
		$(".nice-select .list").mCustomScrollbar({
			theme: "dark-thin",
		});
	}, 1000);
	setTimeout(function () {
		$(".nice-select").each(function () {
			var heightSum = 0;
			for (let index = 0; index < $(this).find(".option.selected").index(); index++) {
				heightSum += $(this)
					.find(".option:eq(" + index + ")")
					.outerHeight();
			}
			$(this).find(".list").mCustomScrollbar("scrollTo", heightSum, {
				scrollInertia: 0,
			});
		});
	}, 500);

	$(document).on("click", ".nice-select", function () {
		var heightSum = 0;
		for (let index = 0; index < $(this).find(".option.selected").index(); index++) {
			heightSum += $(this)
				.find(".option:eq(" + index + ")")
				.outerHeight();
		}
		$(this).find(".list").mCustomScrollbar("scrollTo", heightSum, {
			scrollInertia: 0,
		});
	});

	//search
	$(".leeko-member-search__form input").focus(function (e) {
		e.preventDefault();
		$(this).parents(".leeko-member-search__form").addClass("active");
	});
	$(".leeko-member-search__form-list-btn").on("click", function () {
		$(".leeko-member-search__form").toggleClass("active");
	});
	$("html").on("click", function (e) {
		if ($(e.target).parents(".leeko-member-search__form").hasClass("active")) {
		} else {
			$(".leeko-member-search__form").removeClass("active");
		}
	});

	//main
	$(".leeko-main-head__banner-title").on("click", function () {
		$(".leeko-main-head__banner").toggleClass("active");
	});
	$(".leeko-main-head__form-search input").focus(function (e) {
		e.preventDefault();
		$(this).parents(".leeko-main-head__form").addClass("active");
	});

	$("html").on("click", function (e) {
		if ($(e.target).parents(".leeko-main-head__form").hasClass("active")) {
		} else {
			$(".leeko-main-head__form").removeClass("active");
		}
	});

	$(".leeko-tabs-head__item").on("click", function () {
		var target = $(this).attr("href");
		var number = target.replace(/[^0-9]/g, "");
		$(".leeko-tabs-head__item").removeClass("active");
		$(this).addClass("active");
		$(".leeko-tabs-contents").removeClass("active");
		$(target).addClass("active");
		$(".leeko-covid").removeClass("leeko-covid--01");
		$(".leeko-covid").removeClass("leeko-covid--02");
		$(".leeko-covid").removeClass("leeko-covid--03");
		$(".leeko-covid").addClass("leeko-covid--" + number);
		return false;
	});
	stickybits(".ie .leeko-main-RI .leeko-btn--more", { stickyBitStickyOffset: 0 });

	//recuit

	$(".leeko-contact__form-row--sum").each(function () {
		$(this).addClass("idx" + $(this).index());
	});

	//REmai00100
	$(".leeko-main-recruit__item dt").on("click", function () {
		$(".leeko-main-recruit__item-wrap").addClass("active");
		$(".leeko-main-recruit__item").removeClass("active");
		$(this).parents(".leeko-main-recruit__item").addClass("active");
	});

	//REsup00100
	$(".leeko-apply-intro-list__item dt").on("click", function () {
		if ($(this).parents(".leeko-apply-intro-list__item").hasClass("active")) {
			$(".leeko-apply-intro-list__item").removeClass("active");
		} else {
			$(".leeko-apply-intro-list__item").removeClass("active");
			$(this).parents(".leeko-apply-intro-list__item").addClass("active");
		}
	});

	//popup
	$(document).on("click", ".leeko-popup__bg", function () {
		$("body").removeClass("leeko--popup");
		$(".leeko-popup").hide();
	});

	//quick
	var positionTarget;
	$(".leeko-pos-introduce__quick-item").on("click", function () {
		if (windowWidth > 1024) {
			positionTarget = $($(this).attr("href")).offset().top - $(".leeko-header").outerHeight();
		}
		if (windowWidth < 1025) {
			positionTarget = $($(this).attr("href")).offset().top - $(".leeko-header").outerHeight() - $(".leeko-pos-introduce__quick.mo").outerHeight() + 10;
			if ($(this).attr("href") === "#leeko-pos-introduce01") {
				positionTarget = $($(this).attr("href")).offset().top - $(".leeko-header").outerHeight() - $(".leeko-pos-introduce__quick.mo").outerHeight() + 15;
			}
			if ($(this).attr("href") === "#leeko-pos-introduce06") {
				positionTarget = $($(this).attr("href")).offset().top - $(".leeko-header").outerHeight() - $(".leeko-pos-introduce__quick.mo").outerHeight() + 150;
			}
		}

		$("html, body").stop().animate({ scrollTop: positionTarget });
		return false;
	});

	setTimeout(function () {
		$(".leeko-pos-introduce__quick a").each(function () {
			var idx = $(this).index() + 1;
			$(this)
				.find("strong")
				.text("0" + idx);
		});
	}, 500);

	//select
	$(".leeko-title .chosen-select").change(function (e) {
		e.preventDefault();
		location.href = this.value;
	});

	// $(".leeko-title__breadcrumbs .chosen-select").on("click", function () {
	// 	target = $(".leeko-title").offset().top - $(".leeko-header").outerHeight();
	// 	$("html, body").stop().animate({ scrollTop: target });
	// });

	//scroll
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	let mainNavLinks = document.querySelectorAll(".leeko-pos-introduce__quick-item");

	mainNavLinks.forEach(function (link) {
		if ($(link.hash).length < 1) {
			link.remove();
		}
	});
	window.addEventListener("scroll", function (event) {
		let fromTop = window.scrollY;

		mainNavLinks.forEach(function (link) {
			let section = document.querySelector(link.hash);
			if (section != null) {
				if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
					link.classList.add("leeko-pos-introduce__quick-item--active");
				} else {
					link.classList.remove("leeko-pos-introduce__quick-item--active");
				}
			}
		});
	});

	$(window).scroll(function () {
		if ($(".leeko-contents--mai00100").length > 0) {
			$(".leeko-main-head__banner").removeClass("active");
		}
		if ($(".leeko-board-detail").length > 0) {
			boardScroll();
		}
		$(".leeko-location__head-bg").css("background-position", "50% -" + $(this).scrollTop() / 3.4 + "px");
		var wh = $(window).height();
		var currentScroll = $(this).scrollTop();

		// if (currentScroll > wh) {
		// 	$(".leeko-footer__btn").fadeIn();
		// } else {
		// 	$(".leeko-footer__btn").fadeOut();
		// }

		if ($(".leeko-board-detail__head-title").length > 0) {
			var boardStartPosition = $(".leeko-board-detail__head-title").offset().top + $(".leeko-board-detail__head-title").height() - 96;
			var boardEndPosition = $(".leeko-board-detail .leeko-inner").offset().top + $(".leeko-board-detail .leeko-inner").height() - 96;
			if (currentScroll > boardStartPosition) {
				$(".leeko-header").addClass("active");
			} else if (currentScroll < boardStartPosition) {
				$(".leeko-header").removeClass("active");
			}
			if (currentScroll > boardEndPosition) {
				$(".leeko-header").removeClass("active");
			}
		}

		if ($(".leeko-contents--mai00100").length > 0) {
			if ($(".leeko--public").length > 0) {
			} else {
				if (currentScroll > wh) {
					$(".leeko").removeClass("leeko--header-white");
				} else {
					$(".leeko").addClass("leeko--header-white");
				}
				if ($(".leeko--recruit").length > 0 || $(".leeko--ip-recruit").length > 0) {
					if (currentScroll > 0) {
						$(".leeko").removeClass("leeko--header-white");
					} else {
						$(".leeko").addClass("leeko--header-white");
					}
				}
			}
		}
	});

	//contact
	$(".leeko-contact__form-row").each(function () {
		if ($(this).find(".leeko-contact__form-contents").hasClass("leeko-contact__form-contents--full")) {
			$(this).addClass("full");
		}
	});
	//mcs
	$(".leeko-header__gnb-scroll").mCustomScrollbar({
		theme: "dark-thin",
	});
	$(".leeko-popup__agree-text").mCustomScrollbar({
		theme: "dark-thin",
	});
	$(".leeko-contact__agree-contents").mCustomScrollbar({
		theme: "dark-thin",
	});
	$(".leeko-member-search__form-list-scroll").mCustomScrollbar({
		theme: "dark-thin",
	});

	$(document).on("click", ".leeko-member-detail__news-item, .leeko-pos-introduce__news-item", function () {
		$(".leeko-member-detail__popup-text").mCustomScrollbar({
			theme: "dark-thin",
		});
	});

	//메인 검색
	$("#mainKeywordList").remove();
	$(".leeko-main-head__form-list").append("<div class='leeko-main-head__form-list-scroll'><ol id='mainKeywordList'></ol></div>");
	setTimeout(function () {
		$(".leeko-main-head__form-list-scroll").mCustomScrollbar({
			theme: "dark-thin",
		});
	}, 500);
	$("#keywordList").remove();
	$(".leeko-header__search-form-list").append("<div class='leeko-header__search-form-list-scroll'><ol id='keywordList'></ol></div>");
	setTimeout(function () {
		$(".leeko-header__search-form-list-scroll").mCustomScrollbar({
			theme: "dark-thin",
		});
	}, 500);

	// $("#schMainKeyword").on("click", function () {
	// 	//$(".leeko-main-head__form-list ol").mCustomScrollbar("update");
	// 	setTimeout(function () {
	// 		$(".leeko-main-head__form-list ol").mCustomScrollbar({
	// 			theme: "dark-thin",
	// 		});
	// 		console.log("11");
	// 	}, 1200);
	// });

	// $(".leeko-pos-introduce__quick.mo").mCustomScrollbar({
	//   theme: "dark-thin",
	//   axis: "x",
	//   autoHideScrollbar: true,
	// });
	// $(".leeko-tabs-head").mCustomScrollbar({
	//   theme: "dark-thin",
	//   axis: "x",
	//   autoHideScrollbar: true,
	// });

	//정보입력
	$(document).on("click", ".leeko-apply h5 .leeko-btn--sm-plus", function () {
		if ($(this).hasClass("exception")) {
			return false;
		} else {
			if ($(this).parents("h5").next(".leeko-contact__form-head-text").length > 0) {
				var textDel = "삭제";
				if ($(".leeko").hasClass("leeko--eng")) {
					textDel = "Del";
				}
				var target = $(this).parents("h5").next().next(".leeko-contact__form").html();
				var btn =
					'<div class="leeko-contact__form-head">\
	        <a href="" class="leeko-btn leeko-btn--outline leeko-btn--sm leeko-btn--sm-minus">' +
					textDel +
					"</a>\
	      </div>";
				$(this).parents("h5").next().next(".leeko-contact__form").next(".leeko-contact__form-wrap").append(btn);
				$(this)
					.parents("h5")
					.next()
					.next(".leeko-contact__form")
					.next(".leeko-contact__form-wrap")
					.append("<section>" + target + "</section>");

				$(this).parents("h5").next().next(".leeko-contact__form").next(".leeko-contact__form-wrap").find("section:last-child").find("input").val("");
				$(this).parents("h5").next().next(".leeko-contact__form").next(".leeko-contact__form-wrap").find("section:last-child").find("textarea").html("");
				var moveTarget =
					$(this).parents("h5").next().next(".leeko-contact__form").next(".leeko-contact__form-wrap").find("section:last-child").offset().top - 196;
				console.log(moveTarget);
				//$("html, body").stop().animate({ scrollTop: moveTarget });
			} else {
				var textDel = "삭제";
				if ($(".leeko").hasClass("leeko--eng")) {
					textDel = "Del";
				}
				var target = $(this).parents("h5").next(".leeko-contact__form").html();
				var btn =
					'<div class="leeko-contact__form-head">\
	        <a href="" class="leeko-btn leeko-btn--outline leeko-btn--sm leeko-btn--sm-minus">' +
					textDel +
					"</a>\
	      </div>";
				$(this).parents("h5").next(".leeko-contact__form").next(".leeko-contact__form-wrap").append(btn);
				$(this)
					.parents("h5")
					.next(".leeko-contact__form")
					.next(".leeko-contact__form-wrap")
					.append("<section>" + target + "</section>");

				$(this).parents("h5").next(".leeko-contact__form").next(".leeko-contact__form-wrap").find("section:last-child").find("input").val("");
				$(this).parents("h5").next(".leeko-contact__form").next(".leeko-contact__form-wrap").find("section:last-child").find("textarea").html("");
				var moveTarget = $(this).parents("h5").next(".leeko-contact__form").next(".leeko-contact__form-wrap").find("section:last-child").offset().top - 196;
				console.log(moveTarget);
				//$("html, body").stop().animate({ scrollTop: moveTarget });
			}
		}

		return false;
	});
	$(document).on("click", ".leeko-apply .leeko-btn--sm-minus", function () {
		$(this).parents(".leeko-contact__form-head").next("section").remove();
		$(this).parents(".leeko-contact__form-head").remove();
		return false;
	});
});

function searchMove() {
	var target = $(".leeko-member").offset().top - $(".leeko-header").outerHeight();
	$("html, body").stop().animate({ scrollTop: target });
	return false;
}

function boardScroll() {
	var winScroll =
		document.body.scrollTop || document.documentElement.scrollTop - ($(".leeko-board-detail__head-info").offset().top - $(".leeko-header").height());
	var height = $(".leeko-board-detail__contents").outerHeight() + $(".leeko-board-detail__head-info").outerHeight();
	var scrolled = (winScroll / height) * 100;

	$(".leeko-header__logo-border").css("width", scrolled + "%");
}

//func
function alertOpen(target) {
	$("body").addClass("leeko--alert");
	$("#" + target).fadeIn(200);
	$("body").append('<div class="leeko-alert__bg"></div>');
}
function alertClose(target) {
	$("body").removeClass("leeko--alert");
	$(".leeko-alert").hide();
	$(".leeko-alert__bg").remove();
	return false;
}
function popupOpen(target) {
	$("body").addClass("leeko--popup");
	$("#" + target).fadeIn(200);
	$("body").append('<div class="leeko-popup__bg"></div>');
}
function popupClose(target) {
	$("body").removeClass("leeko--popup");
	$(".leeko-popup").hide();
	$(".leeko-popup__bg").remove();
	return false;
}

//swiper
$(document).ready(function () {
	if ($(".leeko-member__category").length > 0) {
		var swiperCategory = new Swiper(".leeko-member__category .swiper", {
			slidesPerView: "auto",
			freeMode: true,
			scrollbar: {
				el: ".leeko-member__category .swiper-scrollbar",
			},
			mousewheel: true,
		});
	}

	if ($(".leeko-main-head").length > 0) {
		var swiperMainHead = new Swiper(".leeko-main-head .swiper", {
			loop: true,
			effect: "fade",
			speed: 1000,
			navigation: {
				nextEl: ".leeko-main-head .swiper-button-next",
				prevEl: ".leeko-main-head .swiper-button-prev",
			},
			pagination: {
				el: ".leeko-main-head .swiper-pagination",
				clickable: true,
			},
			autoplay: {
				delay: 6000,
				disableOnInteraction: false,
			},
		});
	}

	//mai0001
	if ($(".leeko-main-public-head").length > 0) {
		var swiperPublicMain = new Swiper(".leeko-main-public-head .swiper", {
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			speed: 500,
			loop: true,
			//effect: "fade",
			navigation: {
				nextEl: ".leeko-main-public-head .swiper-button-next",
				prevEl: ".leeko-main-public-head .swiper-button-prev",
			},
			pagination: {
				el: ".leeko-main-public-head .swiper-pagination",
				clickable: true,
			},
			on: {
				init: function () {
					// $(".leeko-main-public-head .swiper-progress-bar").removeClass("animate");
					// $(".leeko-main-public-head .swiper-progress-bar").removeClass("active");
					// $(".leeko-main-public-head .swiper-progress-bar").eq(0).addClass("animate");
					// $(".leeko-main-public-head .swiper-progress-bar").eq(0).addClass("active");
					// TweenMax.set(".leeko-main-public-head__title > strong", { autoAlpha: 0, y: 60 });
					// TweenMax.set(".leeko-main-public-head__title p", { autoAlpha: 0, y: 60 });
					// TweenMax.set(".leeko-main-public-head__text", { autoAlpha: 0 });
					// let swiperPublicMainTl = gsap.timeline({});
					// swiperPublicMainTl
					// 	.to(".swiper-slide-active .leeko-main-public-head__title > strong", 1.0, { autoAlpha: 1, y: 0, ease: Circ.easeOut }, "+=1.0")
					// 	.to(".swiper-slide-active .leeko-main-public-head__title p", 1.0, { autoAlpha: 1, y: 0, ease: Circ.easeOut }, "-=0.8")
					// 	.to(".swiper-slide-active .leeko-main-public-head__text", { autoAlpha: 1 }, "-=0");
				},
				slideChangeTransitionStart: function () {
					$(".leeko-main-public-head .swiper-progress-bar").removeClass("animate");
					$(".leeko-main-public-head .swiper-progress-bar").removeClass("active");
					$(".leeko-main-public-head .swiper-progress-bar").eq(0).addClass("active");

					TweenMax.set(".leeko-main-public-head__title > strong", { autoAlpha: 0, y: 60 });
					TweenMax.set(".leeko-main-public-head__title p", { autoAlpha: 0, y: 60 });
					TweenMax.set(".leeko-main-public-head__text", { autoAlpha: 0 });

					let swiperPublicMainTl = gsap.timeline({});

					swiperPublicMainTl
						.to(".swiper-slide-active .leeko-main-public-head__title > strong", 1.0, { autoAlpha: 1, y: 0, ease: Circ.easeOut }, "+=1.0")
						.to(".swiper-slide-active .leeko-main-public-head__title p", 1.0, { autoAlpha: 1, y: 0, ease: Circ.easeOut }, "-=0.8")
						.to(".swiper-slide-active .leeko-main-public-head__text", { autoAlpha: 1 }, "-=0");
				},
				slideChangeTransitionEnd: function () {
					$(".leeko-main-public-head .swiper-progress-bar").eq(0).addClass("animate");
				},
				slideChange: function () {},
			},
		});
	}
	if ($(".leeko-main-public-news").length > 0) {
		var swiperPublicMainNews = new Swiper(".leeko-main-public-news .swiper", {
			slidesPerView: 3,
			spaceBetween: 24,
			freeMode: true,
			breakpoints: {
				1025: {
					slidesPerView: 1,
					spaceBetween: 20,
					freeMode: false,
				},
			},
		});
	}
	if ($(".leeko-main-newsletter").length > 0) {
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);
		$(".leeko-main-newsletter__bg .swiper-wrapper").append(
			'<div class="swiper-slide"><img src="/images/main_newsletter_img01.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img02.png" alt="" /></div><div class="swiper-slide"><img src="/images/main_newsletter_img03.png" alt="" /></div>'
		);

		var swiperMainNewsletterBg = new Swiper(".leeko-main-newsletter .leeko-main-newsletter__bg .swiper", {
			loop: true,
			effect: "fade",
			speed: 1200,
			watchSlidesProgress: true,
		});
		var swiperMainNewsletter = new Swiper(".leeko-main-newsletter .leeko-main-newsletter__swiper .swiper", {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 36,
			navigation: {
				nextEl: ".leeko-main-newsletter .leeko-main-newsletter__swiper .swiper-button-next",
				prevEl: ".leeko-main-newsletter .leeko-main-newsletter__swiper .swiper-button-prev",
			},
			thumbs: {
				swiper: swiperMainNewsletterBg,
			},
			breakpoints: {
				1025: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
			},
		});
	}
	if ($(".leeko-main-RI").length > 0) {
		var swiperMainRecentInsight = new Swiper(".leeko-main-RI .swiper", {
			//autoHeight: true,
			slidesPerView: 2,
			spaceBetween: 142,
			// pagination: {
			// 	el: ".leeko-main-RI .swiper-pagination",
			// 	type: "progressbar",
			// },
			scrollbar: {
				el: ".leeko-main-RI .swiper-scrollbar",
				hide: false,
				draggable: true,
			},
			breakpoints: {
				1025: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
			},
		});
	}
	if ($(".leeko-main-recruits").length > 0) {
		var swiperRecruits = new Swiper(".leeko-main-recruits .swiper", {
			loop: true,
			effect: "fade",
			speed: 1200,
			navigation: {
				nextEl: ".leeko-main-recruits .swiper-button-next",
				prevEl: ".leeko-main-recruits .swiper-button-prev",
			},
			pagination: {
				el: ".leeko-main-recruits .swiper-pagination",
				type: "fraction",
			},
		});
	}
	if ($(".leeko-main-awards").length > 0) {
		var swiperMainAwardsBg = new Swiper(".leeko-main-awards .leeko-main-awards__bg .swiper", {
			loop: true,
			effect: "fade",
			speed: 1200,
			watchSlidesProgress: true,
		});
	}
	if ($(".leeko-main-awards").length > 0) {
		var swiperMainAwards = new Swiper(".leeko-main-awards .leeko-main-awards__contents .swiper", {
			loop: true,
			speed: 1200,
			navigation: {
				nextEl: ".leeko-main-awards__contents .swiper-button-next",
				prevEl: ".leeko-main-awards__contents .swiper-button-prev",
			},
			pagination: {
				el: ".leeko-main-awards__contents .swiper-pagination",
				type: "fraction",
			},
			thumbs: {
				swiper: swiperMainAwardsBg,
			},
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				1025: {
					speed: 400,
				},
			},
		});
	}

	//lknew00100
	if ($(".leeko-new-news").length > 0) {
		var swiperNews = new Swiper(".leeko-new-news .swiper", {
			//loop:true,
			slidesPerView: "auto",
			spaceBetween: 24,
			breakpoints: {
				1025: {
					spaceBetween: 20,
				},
			},
		});
	}
	if ($(".leeko-new-dc").length > 0) {
		var swiperDC = new Swiper(".leeko-new-dc .swiper", {
			slidesPerView: "auto",
			spaceBetween: 54,
			breakpoints: {
				1025: {
					spaceBetween: 24,
				},
			},
		});
	}

	//lknew00220
	// var swiperBoardLately = new Swiper(".leeko-board-detail__lately .swiper", {
	// 	//loop: true,
	// 	slidesPerView: 3,
	// 	spaceBetween: 24,
	// 	navigation: {
	// 		nextEl: ".leeko-board-detail__lately .swiper-button-next",
	// 		prevEl: ".leeko-board-detail__lately .swiper-button-prev",
	// 	},
	// 	breakpoints: {
	// 		1025: {
	// 			slidesPerView: 1,
	// 			loop: true,
	// 		},
	// 	},
	// });

	//pos00110
	if ($(".leeko-pos-introduce__career").length > 0) {
		var swiperIntroduceCareer = new Swiper(".leeko-pos-introduce__career .swiper", {
			//loop:true,
			slidesPerView: "auto",
			spaceBetween: 242,
			scrollbar: {
				el: ".leeko-pos-introduce__career .swiper-scrollbar",
				hide: false,
				draggable: true,
			},
			breakpoints: {
				1025: {
					spaceBetween: 71,
				},
			},
		});
	}
	if ($(".leeko-pos-introduce__news").length > 0) {
		var swiperIntroduceNews = new Swiper(".leeko-pos-introduce__news .swiper", {
			//loop:true,
			slidesPerView: "auto",
			spaceBetween: 24,
			scrollbar: {
				el: ".leeko-pos-introduce__news .swiper-scrollbar",
				hide: false,
				draggable: true,
			},
			breakpoints: {
				1025: {
					spaceBetween: 20,
				},
			},
		});
	}

	var pufilSwiper = $(".leeko-public-report .swiper-wrapper").html();

	$(".leeko-public-report .swiper-wrapper").append(pufilSwiper);
	$(".leeko-public-report .swiper-wrapper").append(pufilSwiper);
	$(".leeko-public-report .swiper-wrapper").append(pufilSwiper);

	//pufil00100
	if ($(".leeko-public-report").length > 0) {
		var swiperPublicReport = new Swiper(".leeko-public-report .swiper", {
			loop: true,
			slidesPerView: "auto",
			centeredSlides: true,
			spaceBetween: 0,
			navigation: {
				nextEl: ".leeko-public-report .swiper-button-next",
				prevEl: ".leeko-public-report .swiper-button-prev",
			},
			on: {
				// activeIndexChange: function () {
				// 	var title = $("[data-swiper-slide-index=" + this.realIndex + "]").attr("data-title");
				// 	var link = $("[data-swiper-slide-index=" + this.realIndex + "]").attr("data-pdf");
				// 	$(".leeko-public-report__title p strong").html(title);
				// 	$(".leeko-public-report__title p a").attr("href", link);
				// },
				activeIndexChange: function () {
					var title = $("[data-swiper-slide-index=" + this.realIndex + "]").attr("data-title");
					/*var link = $("[data-swiper-slide-index=" + this.realIndex + "]").attr("data-pdf");*/
					var folder = $("[data-swiper-slide-index=" + this.realIndex + "]").attr("data-folder");
					var filenm = $("[data-swiper-slide-index=" + this.realIndex + "]").attr("data-filenm");
					$(".leeko-public-report__title p strong").html(title);
					/*$(".leeko-public-report__title p a").attr("href", link);*/
					$(".leeko-public-report__title p a").attr("data-folder", folder);
					$(".leeko-public-report__title p a").attr("data-filenm", filenm);
				},
				click: function () {
					swiperPublicReport.slideTo(swiperPublicReport.clickedIndex);
				},
			},
			breakpoints: {
				1025: {
					//spaceBetween: 16,
				},
			},
		});
	}
});

//animate
$(document).ready(function () {
	if ($(".leeko--public").length < 1) {
		//leeko,ip 광장소개 pc
		if ($(".pc .leeko-contents--inf00100").length > 0) {
			//section01
			TweenMax.set(".leeko-inf-section--01 .leeko-inf-text", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--01 .leeko-inf-img", { autoAlpha: 0, y: 30 });

			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--01",
					scrub: false,
					//markers: true,
					start: "-=100 center",
					end: "+=400",
				},
			});

			tl1.to(".leeko-inf-section--01 .leeko-inf-text", { autoAlpha: 0.5, y: 0 }).to(".leeko-inf-section--01 .leeko-inf-img", { autoAlpha: 1, y: 0 });

			//section02
			TweenMax.set(".leeko-inf-section--02 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--02 p", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--02 .leeko-inf-text", { autoAlpha: 0, x: "-20%" });
			TweenMax.set(".leeko-inf-section--02 .leeko-inf-img", { autoAlpha: 0, y: 50 });

			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--02",
					scrub: false,
					//markers: true,
					start: "-=300 center",
					end: "+=400",
				},
			});

			tl2
				.to(".leeko-inf-section--02 .leeko-inf-img", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--02 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--02 p", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--02 .leeko-inf-text", { autoAlpha: 0.5, x: 0 });

			//section03
			TweenMax.set(".leeko-inf-section--03 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--03 p", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--03 .leeko-inf-bg", { autoAlpha: 0, x: "-20%" });
			TweenMax.set(".leeko-inf-section--03 .leeko-inf-text", { autoAlpha: 0, x: "20%" });
			TweenMax.set(".leeko-inf-section--03 .leeko-inf-img", { autoAlpha: 0, y: 50 });

			let tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--03",
					scrub: false,
					//markers: true,
					start: "-=200 center",
					end: "+=600",
				},
			});

			tl3
				.to(".leeko-inf-section--03 .leeko-inf-bg", { autoAlpha: 1, x: 0 })
				.to(".leeko-inf-section--03 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--03 p", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--03 .leeko-inf-img", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--03 .leeko-inf-text", { autoAlpha: 0.5, x: 0 });

			//section04
			TweenMax.set(".leeko-inf-section--04 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--04 p", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--04 .leeko-inf-img", { autoAlpha: 0, y: 30 });

			let tl4 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--04",
					scrub: false,
					//markers: true,
					start: "-=0 center",
					end: "+=400",
				},
			});

			tl4
				.to(".leeko-inf-section--04 .leeko-inf-img", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--04 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--04 p", { autoAlpha: 1, y: 0 });

			//section05
			TweenMax.set(".leeko-inf-section--05 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--05 p", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--05 .leeko-inf-bg", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--05 .leeko-inf-text", { autoAlpha: 0, x: "-20%" });
			TweenMax.set(".leeko-inf-section--05 .leeko-inf-img", { autoAlpha: 0, y: 30 });

			let tl5 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--05",
					scrub: false,
					//markers: true,
					start: "-=300 center",
					end: "+=600",
				},
			});

			tl5
				.to(".leeko-inf-section--05 .leeko-inf-bg", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--05 .leeko-inf-text", { autoAlpha: 0.5, x: 0 })
				.to(".leeko-inf-section--05 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--05 p", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--05 .leeko-inf-img", { autoAlpha: 1, y: 0 });
		}

		//leeko,ip 광장소개 mo
		if ($(".mo .leeko-contents--inf00100").length > 0) {
			//section01
			//TweenMax.set(".leeko-inf-section--01 .leeko-inf-img", { autoAlpha: 0, y: 30 });
			//TweenMax.set(".leeko-inf-section--01 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--01 p", { autoAlpha: 0, y: 30 });

			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--01",
					scrub: false,
					//markers: true,
					start: "50% center",
					end: "0%",
				},
			});

			tl1
				.to(".leeko-inf-section--01 .leeko-inf-img", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--01 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--01 p", { autoAlpha: 1, y: 0 });

			//section02
			TweenMax.set(".leeko-inf-section--02 .leeko-inf-img", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-inf-section--02 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--02 p", { autoAlpha: 0, y: 30 });

			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--02",
					scrub: false,
					//markers: true,
					start: "50% center",
					end: "0%",
				},
			});

			tl2
				.to(".leeko-inf-section--02 .leeko-inf-img", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--02 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--02 p", { autoAlpha: 1, y: 0 });

			//section03
			TweenMax.set(".leeko-inf-section--03 .leeko-inf-img", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-inf-section--03 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--03 p", { autoAlpha: 0, y: 30 });

			let tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--03",
					scrub: false,
					//markers: true,
					start: "50% center",
					end: "0%",
				},
			});

			tl3
				.to(".leeko-inf-section--03 .leeko-inf-img", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--03 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--03 p", { autoAlpha: 1, y: 0 });

			//section04
			TweenMax.set(".leeko-inf-section--04 .leeko-inf-img", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--04 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--04 p", { autoAlpha: 0, y: 30 });

			let tl4 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--04",
					scrub: false,
					//markers: true,
					start: "50% center",
					end: "0%",
				},
			});

			tl4
				.to(".leeko-inf-section--04 .leeko-inf-img", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--04 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--04 p", { autoAlpha: 1, y: 0 });

			//section05
			TweenMax.set(".leeko-inf-section--05 .leeko-inf-img", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--05 h3", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-inf-section--05 p", { autoAlpha: 0, y: 30 });

			let tl5 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-inf-section--05",
					scrub: false,
					//markers: true,
					start: "50% center",
					end: "0%",
				},
			});

			tl5
				.to(".leeko-inf-section--05 .leeko-inf-img", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--05 h3", { autoAlpha: 1, y: 0 })
				.to(".leeko-inf-section--05 p", { autoAlpha: 1, y: 0 });
		}

		//leeko 연혁
		if ($(".pc .leeko-contents--inf00200").length > 0) {
			//section01
			TweenMax.set(".leeko-history__section.idx01 .leeko-history__section-title", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx01 ul", { autoAlpha: 0, y: 30 });

			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-history__section.idx01",
					scrub: false,
					//markers: true,
					start: "-=100 center",
					end: "+=400",
				},
			});

			tl1
				.to(".leeko-history__section.idx01 .leeko-history__section-title", { autoAlpha: 1, y: 0 }, "-=0.2")
				.to(".leeko-history__section.idx01 ul", { autoAlpha: 1, y: 0 }, "-=0.1");

			//section02
			TweenMax.set(".leeko-history__section.idx02 .leeko-history__section-year", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx02 .leeko-history__section-img", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx02 .leeko-history__section-title", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx02 ul", { autoAlpha: 0, y: 30 });

			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-history__section.idx02",
					scrub: false,
					//markers: true,
					start: "-=100 center",
					end: "+=400",
				},
			});

			tl2
				.to(".leeko-history__section.idx02 .leeko-history__section-year", { autoAlpha: 1, y: 0 }, "-=0.4")
				.to(".leeko-history__section.idx02 .leeko-history__section-title", { autoAlpha: 1, y: 0 }, "-=0.3")
				.to(".leeko-history__section.idx02 .leeko-history__section-img", { autoAlpha: 1, y: 0 }, "-=0.2")
				.to(".leeko-history__section.idx02 ul", { autoAlpha: 1, y: 0 }, "-=0.1");

			//section03
			TweenMax.set(".leeko-history__section.idx03 .leeko-history__section-year", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx03 .leeko-history__section-img", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx03 .leeko-history__section-title", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx03 ul", { autoAlpha: 0, y: 30 });

			let tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-history__section.idx03",
					scrub: false,
					//markers: true,
					start: "-=100 center",
					end: "+=400",
				},
			});

			tl3
				.to(".leeko-history__section.idx03 .leeko-history__section-year", { autoAlpha: 1, y: 0 }, "-=0.4")
				.to(".leeko-history__section.idx03 .leeko-history__section-title", { autoAlpha: 1, y: 0 }, "-=0.3")
				.to(".leeko-history__section.idx03 .leeko-history__section-img", { autoAlpha: 1, y: 0 }, "-=0.2")
				.to(".leeko-history__section.idx03 ul", { autoAlpha: 1, y: 0 }, "-=0.1");

			//section04
			TweenMax.set(".leeko-history__section.idx04 .leeko-history__section-year", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx04 .leeko-history__section-img", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx04 .leeko-history__section-title", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx04 ul", { autoAlpha: 0, y: 30 });

			let tl4 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-history__section.idx04",
					scrub: false,
					//markers: true,
					start: "-=100 center",
					end: "+=400",
				},
			});

			tl4
				.to(".leeko-history__section.idx04 .leeko-history__section-year", { autoAlpha: 1, y: 0 }, "-=0.4")
				.to(".leeko-history__section.idx04 .leeko-history__section-title", { autoAlpha: 1, y: 0 }, "-=0.3")
				.to(".leeko-history__section.idx04 .leeko-history__section-img", { autoAlpha: 1, y: 0 }, "-=0.2")
				.to(".leeko-history__section.idx04 ul", { autoAlpha: 1, y: 0 }, "-=0.1");
		}
		if ($(".mo .leeko-contents--inf00200").length > 0) {
			//section01
			TweenMax.set(".leeko-history__section.idx01 .leeko-history__section-title", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx01 ul", { autoAlpha: 0, y: 30 });

			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-history__section.idx01",
					scrub: false,
					//markers: true,
					start: "20% center",
					end: "0%",
				},
			});

			tl1
				.to(".leeko-history__section.idx01 .leeko-history__section-title", { autoAlpha: 1, y: 0 }, "-=0.2")
				.to(".leeko-history__section.idx01 ul", { autoAlpha: 1, y: 0 }, "-=0.1");

			//section02
			TweenMax.set(".leeko-history__section.idx02 .leeko-history__section-img", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx02 .leeko-history__section-year", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx02 .leeko-history__section-title", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx02 ul", { autoAlpha: 0, y: 30 });

			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-history__section.idx02",
					scrub: false,
					//markers: true,
					start: "0% center",
					end: "0%",
				},
			});

			tl2
				.to(".leeko-history__section.idx02 .leeko-history__section-img", { autoAlpha: 1, y: 0 }, "-=0.4")
				.to(".leeko-history__section.idx02 .leeko-history__section-year", { autoAlpha: 1, y: 0 }, "-=0.3")
				.to(".leeko-history__section.idx02 .leeko-history__section-title", { autoAlpha: 1, y: 0 }, "-=0.2")
				.to(".leeko-history__section.idx02 ul", { autoAlpha: 1, y: 0 }, "-=0.1");

			//section03
			TweenMax.set(".leeko-history__section.idx03 .leeko-history__section-img", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx03 .leeko-history__section-year", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx03 .leeko-history__section-title", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx03 ul", { autoAlpha: 0, y: 30 });

			let tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-history__section.idx03",
					scrub: false,
					//markers: true,
					start: "10% center",
					end: "0%",
				},
			});

			tl3
				.to(".leeko-history__section.idx03 .leeko-history__section-img", { autoAlpha: 1, y: 0 }, "-=0.4")
				.to(".leeko-history__section.idx03 .leeko-history__section-year", { autoAlpha: 1, y: 0 }, "-=0.3")
				.to(".leeko-history__section.idx03 .leeko-history__section-title", { autoAlpha: 1, y: 0 }, "-=0.2")
				.to(".leeko-history__section.idx03 ul", { autoAlpha: 1, y: 0 }, "-=0.1");

			//section04
			TweenMax.set(".leeko-history__section.idx04 .leeko-history__section-img", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx04 .leeko-history__section-year", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx04 .leeko-history__section-title", { autoAlpha: 0, y: 30 });
			TweenMax.set(".leeko-history__section.idx04 ul", { autoAlpha: 0, y: 30 });

			let tl4 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-history__section.idx04",
					scrub: false,
					//markers: true,
					start: "20% center",
					end: "0%",
				},
			});

			tl4
				.to(".leeko-history__section.idx04 .leeko-history__section-img", { autoAlpha: 1, y: 0 }, "-=0.4")
				.to(".leeko-history__section.idx04 .leeko-history__section-year", { autoAlpha: 1, y: 0 }, "-=0.3")
				.to(".leeko-history__section.idx04 .leeko-history__section-title", { autoAlpha: 1, y: 0 }, "-=0.2")
				.to(".leeko-history__section.idx04 ul", { autoAlpha: 1, y: 0 }, "-=0.1");
		}
	}

	//메인
	if ($(".leeko-contents--mai00100").length > 0) {
		//leeko 메인
		if ($(".pc .leeko-main-head__title").length > 0) {
			//section01
			TweenMax.set(".leeko-main-head__title", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-main-head__form", { autoAlpha: 0 });
			TweenMax.set(".swiper-button-next, .swiper-button-prev", { autoAlpha: 0 });
			TweenMax.set(".swiper-pagination", { autoAlpha: 0 });
			TweenMax.set(".leeko-main-head__banner", { x: -70 });

			tl0 = new TimelineLite();

			tl0
				.to(".leeko-main-head__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "+=1.0")
				.to(".leeko-main-head__form", 1, { autoAlpha: 1 }, "-=0.5")
				.to(".swiper-button-next, .swiper-button-prev", 1, { autoAlpha: 1 }, "-=0.5")
				.to(".swiper-pagination", 1, { autoAlpha: 1 }, "-=0.5")
				.to(".leeko-main-head__banner", 0, { autoAlpha: 1, x: 0 }, "-=1.5");

			setTimeout(function () {
				$(".leeko-main-head__banner").toggleClass("active");
			}, 2000);
			// setTimeout(() => {
			// 	$(".leeko-main-head__banner").toggleClass("active");
			// }, 6000);

			//section02
			TweenMax.set(".leeko-main-RI__title", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-RI-list__item", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-RI .leeko-btn--more", { autoAlpha: 0, y: 0 });

			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-RI",
					scrub: false,
					//markers: true,
					start: "-=10 center",
					end: "bottom center",
				},
			});

			tl1
				.to(".leeko-main-RI__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				.to(".leeko-main-RI-list__item", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8")
				.to(".leeko-main-RI-list__item", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.7")
				.to(".leeko-main-RI .leeko-btn--more", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.6")
				.to(".leeko-main-RI-list__item", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.5")
				.to(".leeko-main-RI-list__item", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.4");

			//section03
			TweenMax.set(".leeko-main-newsletter__title", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-newsletter .leeko-btn--more", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-newsletter__bg", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-newsletter__swiper", { autoAlpha: 0, y: 100 });

			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-newsletter",
					scrub: false,
					//markers: true,
					start: "-=200 center",
					end: "+=1000",
				},
			});

			tl2
				.to(".leeko-main-newsletter__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				.to(".leeko-main-newsletter .leeko-btn--more", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8")
				.to(".leeko-main-newsletter__bg", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.7")
				.to(".leeko-main-newsletter__swiper", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.7");

			//section04
			TweenMax.set(".leeko-main-recruits__title", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-recruits__item", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-recruits__item-img", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-recruits__item section", { autoAlpha: 0, y: 100 });

			let tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-recruits__item",
					scrub: false,
					//markers: true,
					start: "-=500 center",
					end: "+=600",
				},
			});

			tl3
				.to(".leeko-main-recruits__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				.to(".leeko-main-recruits__item", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.9")
				.to(".leeko-main-recruits__item-img", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8")
				.to(".leeko-main-recruits__item section", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8");

			//section05
			TweenMax.set(".leeko-main-recruits__next-line", { autoAlpha: 0, y: -60, height: 100 });
			TweenMax.set(".leeko-main-recruits__next-eyebrow", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-main-recruits__next-title", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-main-recruits__next-text", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-main-recruits__next-btn", { autoAlpha: 0, y: 50 });

			let tl4 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-recruits__next",
					scrub: false,
					//markers: true,
					start: "-=100 center",
					end: "+=700",
				},
			});

			tl4
				.to(".leeko-main-recruits__next-line", 3, { autoAlpha: 1, y: 0, height: 326, ease: Back.easeOut })
				.to(".leeko-main-recruits__next-eyebrow", 2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=1.9")
				.to(".leeko-main-recruits__next-title", 2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=1.85")
				.to(".leeko-main-recruits__next-text", 2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=1.8")
				.to(".leeko-main-recruits__next-btn", 2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=1.75");

			//section06
			TweenMax.set(".leeko-main-awards", { autoAlpha: 0 });
			TweenMax.set(".leeko-main-awards__title", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-awards__bg", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-awards__contents", { autoAlpha: 0, y: 100 });

			let tl5 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-awards",
					scrub: false,
					//markers: true,
					start: "-=300 center",
					end: "+=600",
				},
			});

			tl5
				.to(".leeko-main-awards", 1, { autoAlpha: 1 })
				.to(".leeko-main-awards__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.9")
				.to(".leeko-main-awards__bg", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.85")
				.to(".leeko-main-awards__contents", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8");
		}
		if ($(".mo .leeko-main-head__title").length > 0) {
			//section01
			TweenMax.set(".leeko-main-head__title", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-main-head__form", { autoAlpha: 0 });
			TweenMax.set(".swiper-button-next, .swiper-button-prev", { autoAlpha: 0 });
			TweenMax.set(".swiper-pagination", { autoAlpha: 0 });
			TweenMax.set(".leeko-main-head__banner", { x: -70 });

			tl0 = new TimelineLite();

			tl0
				.to(".leeko-main-head__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "+=1.0")
				.to(".leeko-main-head__form", 1, { autoAlpha: 1 }, "-=0.5")
				.to(".swiper-button-next, .swiper-button-prev", 1, { autoAlpha: 1 }, "-=0.5")
				.to(".swiper-pagination", 1, { autoAlpha: 1 }, "-=0.5")
				.to(".leeko-main-head__banner", 0, { autoAlpha: 1, x: 0 }, "-=1.5");

			setTimeout(function () {
				$(".leeko-main-head__banner").toggleClass("active");
			}, 2000);
			setTimeout(function () {
				$(".leeko-main-head__banner").toggleClass("active");
			}, 6000);

			//section02
			TweenMax.set(".leeko-main-RI__title", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-RI-list__item", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-RI .leeko-btn--more", { autoAlpha: 0, y: 0 });

			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-RI",
					scrub: false,
					//markers: true,
					start: "-10% center",
					end: "100%",
				},
			});

			tl1
				.to(".leeko-main-RI__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				.to(".leeko-main-RI-list__item, .leeko-main-RI-list__item", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8")
				.to(".leeko-main-RI-list__item, .leeko-main-RI-list__item", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.7")
				.to(".leeko-main-RI .leeko-btn--more", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.6");

			//section03
			TweenMax.set(".leeko-main-newsletter__title", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-newsletter__bg", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-newsletter__swiper", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-newsletter .leeko-btn--more", { autoAlpha: 0, y: 0 });

			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-newsletter",
					scrub: false,
					//markers: true,
					start: "-20% center",
					end: "40%",
				},
			});

			tl2
				.to(".leeko-main-newsletter__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				.to(".leeko-main-newsletter__bg", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8")
				.to(".leeko-main-newsletter__swiper", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.7")
				.to(".leeko-main-newsletter .leeko-btn--more", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.6");

			//section04
			TweenMax.set(".leeko-main-recruits__title", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-recruits__item", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-recruits__item-img", { autoAlpha: 0, y: 0 });
			TweenMax.set(".leeko-main-recruits__item section", { autoAlpha: 0, y: 0 });

			let tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-recruits__item",
					scrub: false,
					//markers: true,
					start: "-40% center",
					end: "20%",
				},
			});

			tl3
				.to(".leeko-main-recruits__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				.to(".leeko-main-recruits__item", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.9")
				.to(".leeko-main-recruits__item-img", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8")
				.to(".leeko-main-recruits__item section", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8");

			//section05
			TweenMax.set(".leeko-main-recruits__next-line", { autoAlpha: 0, y: -60, height: 100 });
			TweenMax.set(".leeko-main-recruits__next-eyebrow", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-main-recruits__next-title", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-main-recruits__next-text", { autoAlpha: 0, y: 50 });
			TweenMax.set(".leeko-main-recruits__next-btn", { autoAlpha: 0, y: 50 });

			let tl4 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-recruits__next",
					scrub: false,
					//markers: true,
					start: "-40% center",
					end: "20%",
				},
			});

			tl4
				.to(".leeko-main-recruits__next-line", 3, { autoAlpha: 1, y: 0, height: 140, ease: Back.easeOut })
				.to(".leeko-main-recruits__next-eyebrow", 2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=1.9")
				.to(".leeko-main-recruits__next-title", 2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=1.85")
				.to(".leeko-main-recruits__next-text", 2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=1.8")
				.to(".leeko-main-recruits__next-btn", 2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=1.75");

			//section06
			TweenMax.set(".leeko-main-awards", { autoAlpha: 0 });
			TweenMax.set(".leeko-main-awards__title", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-awards__bg", { autoAlpha: 0, y: 100 });
			TweenMax.set(".leeko-main-awards__contents", { autoAlpha: 0, y: 100 });

			let tl5 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-awards",
					scrub: false,
					//markers: true,
					start: "-60% center",
					end: "10%",
				},
			});

			tl5
				.to(".leeko-main-awards", 1, { autoAlpha: 1 })
				.to(".leeko-main-awards__title", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.9")
				.to(".leeko-main-awards__bg", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.85")
				.to(".leeko-main-awards__contents", 1, { autoAlpha: 1, y: 0, ease: Back.easeOut }, "-=0.8");
		}
		//공익 메인
		if ($(".pc .leeko--public").length > 0) {
			//section01
			TweenMax.set(".leeko-main-public-activities__title .text01", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-activities__title .text02", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-activities__text", { autoAlpha: 0, y: 60 });
			// TweenMax.set(".leeko-main-public-activities__list .idx01", { autoAlpha: 0, y: 20 });
			// TweenMax.set(".leeko-main-public-activities__list .idx02", { autoAlpha: 0, y: 290 });
			// TweenMax.set(".leeko-main-public-activities__list .idx03", { autoAlpha: 0, y: 560 });
			// TweenMax.set(".leeko-main-public-activities__list .idx04", { autoAlpha: 0, y: 20 });
			// TweenMax.set(".leeko-main-public-activities__list .idx05", { autoAlpha: 0, y: 290 });
			// TweenMax.set(".leeko-main-public-activities__list .idx06", { autoAlpha: 0, y: 560 });
			TweenMax.set(".leeko-main-public-activities__list .idx00", { autoAlpha: 0, y: 0 });
			TweenMax.set(".leeko-main-public-activities__list .idx01", { autoAlpha: 0, y: 20 });
			TweenMax.set(".leeko-main-public-activities__list .idx02", { autoAlpha: 0, y: 40 });
			TweenMax.set(".leeko-main-public-activities__list .idx03", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-activities__list .idx04", { autoAlpha: 0, y: 20 });
			TweenMax.set(".leeko-main-public-activities__list .idx05", { autoAlpha: 0, y: 40 });
			TweenMax.set(".leeko-main-public-activities__list .idx06", { autoAlpha: 0, y: 60 });
			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-public-activities",
					scrub: false,
					//markers: true,
					start: "-=150 center",
					end: "+=1600",
				},
			});

			tl1
				.to(".leeko-main-public-activities__title .text01", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__title .text02", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__text", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx00", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx01", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx02", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx03", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx04", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx05", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx06", { autoAlpha: 1, y: 0 });

			//section02
			TweenMax.set(".leeko-main-public-news__title", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-news__text", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-news .swiper", { autoAlpha: 0, y: 40 });

			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-public-news",
					scrub: false,
					//markers: true,
					start: "-=150 center",
					end: "+=800",
				},
			});

			tl2
				.to(".leeko-main-public-news__title", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-news__text", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-news .swiper", { autoAlpha: 1, y: 0 });

			//section03
			TweenMax.set(".leeko-main-public-report__title", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-report__img", { autoAlpha: 0, y: 150 });
			TweenMax.set(".leeko-main-public-report__text", { autoAlpha: 0, y: 100 });

			let tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-public-report",
					scrub: false,
					//markers: true,
					start: "+=100 center",
					end: "+=200",
				},
			});

			tl3
				.to(".leeko-main-public-report__title", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-report__text", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-report__img", { autoAlpha: 1, y: 0 });
		}
		if ($(".mo .leeko--public").length > 0) {
			//section01
			TweenMax.set(".leeko-main-public-activities__title .text01", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-activities__title .text02", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-activities__text", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-activities__list .idx01", { autoAlpha: 0, y: 20 });
			TweenMax.set(".leeko-main-public-activities__list .idx02", { autoAlpha: 0, y: 290 });
			TweenMax.set(".leeko-main-public-activities__list .idx03", { autoAlpha: 0, y: 560 });
			TweenMax.set(".leeko-main-public-activities__list .idx04", { autoAlpha: 0, y: 20 });
			TweenMax.set(".leeko-main-public-activities__list .idx05", { autoAlpha: 0, y: 290 });
			TweenMax.set(".leeko-main-public-activities__list .idx06", { autoAlpha: 0, y: 560 });

			let tl1 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-public-activities",
					scrub: false,
					//markers: true,
					start: "-20% center",
					end: "60%",
				},
			});

			tl1
				.to(".leeko-main-public-activities__title .text01", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__title .text02", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__text", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx01", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx02", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx03", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx04", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx05", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-activities__list .idx06", { autoAlpha: 1, y: 0 });

			//section02
			TweenMax.set(".leeko-main-public-news__title", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-news__text", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-news .swiper", { autoAlpha: 0, y: 40 });

			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-public-news",
					scrub: false,
					//markers: true,
					start: "-20% center",
					end: "-20%",
				},
			});

			tl2
				.to(".leeko-main-public-news__title", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-news__text", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-news .swiper", { autoAlpha: 1, y: 0 });

			//section03
			TweenMax.set(".leeko-main-public-report__img", { autoAlpha: 0, y: 150 });
			TweenMax.set(".leeko-main-public-report__title", { autoAlpha: 0, y: 60 });
			TweenMax.set(".leeko-main-public-report__text", { autoAlpha: 0, y: 100 });

			let tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: ".leeko-main-public-report",
					scrub: false,
					//markers: true,
					start: "-20% center",
					end: "-50%",
				},
			});

			tl3
				.to(".leeko-main-public-report__img", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-report__title", { autoAlpha: 1, y: 0 })
				.to(".leeko-main-public-report__text", { autoAlpha: 1, y: 0 });
		}
	}

	//공익활동위원회 소개
	if ($(".pc .leeko-contents--inf00100").length > 0) {
		//section02
		TweenMax.set(".leeko-greeting__img", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-greeting__text dl ", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-greeting__sign", { autoAlpha: 0, y: 30 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-greeting__img",
				scrub: false,
				//markers: true,
				start: "-=300 center",
				end: "+=0",
			},
		});

		tl2
			.to(".leeko-greeting__img", { autoAlpha: 1, y: 0 })
			.to(".leeko-greeting__text dl ", { autoAlpha: 1, y: 0 })
			.to(".leeko-greeting__sign", { autoAlpha: 1, y: 0 });
	}
	if ($(".mo .leeko-contents--inf00100").length > 0) {
		//section02
		//TweenMax.set(".leeko-greeting__img", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-greeting__text dl ", { autoAlpha: 0, y: 30 });

		TweenMax.set(".leeko-greeting__sign", { autoAlpha: 0, y: 30 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-greeting__img",
				scrub: false,
				//markers: true,
				start: "20% center",
				end: "60%",
			},
		});

		tl2
			.to(".leeko-greeting__img", { autoAlpha: 1, y: 0 })
			.to(".leeko-greeting__text dl ", { autoAlpha: 1, y: 0 })
			.to(".leeko-greeting__sign", { autoAlpha: 1, y: 0 });
	}

	if ($(".pc .leeko-contents--inf00200").length > 0) {
		//section02
		//TweenMax.set(".leeko-ideology__title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--01 .idx01", { autoAlpha: 0, height: 0 });
		TweenMax.set(".leeko-ideology__item--01 .idx02", { autoAlpha: 0, height: 0 });
		TweenMax.set(".leeko-ideology__item--01 .idx03", { autoAlpha: 0, height: 0 });
		TweenMax.set(".leeko-ideology__item--01 dl dt", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--01 dl dd", { autoAlpha: 0, y: 30 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-ideology__item--01",
				scrub: false,
				//markers: true,
				start: "-=400 center",
				end: "+=1200",
			},
		});

		tl2
			.to(".leeko-ideology__title", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--01 .idx01", { autoAlpha: 1, height: "100%" })
			.to(".leeko-ideology__item--01 .idx02", { autoAlpha: 1, height: "100%" })
			.to(".leeko-ideology__item--01 .idx03", { autoAlpha: 1, height: "100%" })
			.to(".leeko-ideology__item--01 dl dt", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--01 dl dd", { autoAlpha: 1, y: 0 });

		//section03
		TweenMax.set(".leeko-ideology__item--02 .leeko-ideology__item-text--01", { autoAlpha: 0, x: "-10%" });
		TweenMax.set(".leeko-ideology__item--02 .leeko-ideology__item-pic--01", { autoAlpha: 0, x: "10%" });
		TweenMax.set(".leeko-ideology__item--02 dl dt", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--02 dl dd.idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--02 dl dd.idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--02 .leeko-ideology__item-text--02", { autoAlpha: 0, x: "10%" });
		TweenMax.set(".leeko-ideology__item--02 .leeko-ideology__item-pic--02 p", { autoAlpha: 0, height: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-ideology__item--02",
				scrub: false,
				//markers: true,
				start: "-=400 center",
				end: "+=1400",
			},
		});

		tl3
			.to(".leeko-ideology__item--02 .leeko-ideology__item-text--01", { autoAlpha: 1, x: "0%" })
			.to(".leeko-ideology__item--02 .leeko-ideology__item-pic--01", { autoAlpha: 1, x: "0%" })
			.to(".leeko-ideology__item--02 dl dt", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--02 dl dd.idx01", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--02 dl dd.idx02", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--02 .leeko-ideology__item-text--02", { autoAlpha: 1, x: "0%" })
			.to(".leeko-ideology__item--02 .leeko-ideology__item-pic--02 p", { autoAlpha: 1, height: "100%" });

		//section04
		TweenMax.set(".leeko-ideology__foot > p", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__foot > span", { autoAlpha: 0, y: 30 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-ideology__foot",
				scrub: false,
				//markers: true,
				start: "-=100 center",
				end: "+=200",
			},
		});

		tl4.to(".leeko-ideology__foot > p", { autoAlpha: 1, y: 0 }).to(".leeko-ideology__foot > span", { autoAlpha: 1, y: 0 });
	}
	if ($(".mo .leeko-contents--inf00200").length > 0) {
		//section02
		//TweenMax.set(".leeko-ideology__title", { autoAlpha: 0, y: 30 });
		//TweenMax.set(".leeko-ideology__item--01 .idx01", { autoAlpha: 0, y: -30 });
		TweenMax.set(".leeko-ideology__item--01 .idx02", { autoAlpha: 0, y: -30 });
		TweenMax.set(".leeko-ideology__item--01 .idx03", { autoAlpha: 0, y: -30 });
		TweenMax.set(".leeko-ideology__item--01 dl dt", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--01 dl dd", { autoAlpha: 0, y: 30 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-ideology__item--01",
				scrub: false,
				//markers: true,
				start: "0% center",
				end: "20%",
			},
		});

		tl2
			.to(".leeko-ideology__title", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--01 .idx01", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--01 .idx02", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--01 .idx03", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--01 dl dt", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--01 dl dd", { autoAlpha: 1, y: 0 });

		//section03
		TweenMax.set(".leeko-ideology__item--02 .leeko-ideology__item-pic--01", { autoAlpha: 0, x: "10%" });
		TweenMax.set(".leeko-ideology__item--02 dl dt", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--02 dl dd.idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--02 dl dd.idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__item--02 .leeko-ideology__item-pic--02 p", { autoAlpha: 0, height: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-ideology__item--02",
				scrub: false,
				//markers: true,
				start: "-20% center",
				end: "60%",
			},
		});

		tl3
			.to(".leeko-ideology__item--02 .leeko-ideology__item-pic--01", { autoAlpha: 1, x: "0%" })
			.to(".leeko-ideology__item--02 dl dt", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--02 dl dd.idx01", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--02 dl dd.idx02", { autoAlpha: 1, y: 0 })
			.to(".leeko-ideology__item--02 .leeko-ideology__item-pic--02 p", { autoAlpha: 1, height: "100%" });

		//section04
		TweenMax.set(".leeko-ideology__foot > p", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-ideology__foot > span", { autoAlpha: 0, y: 30 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-ideology__foot",
				scrub: false,
				//markers: true,
				start: "10% center",
				end: "0%",
			},
		});

		tl4.to(".leeko-ideology__foot > p", { autoAlpha: 1, y: 0 }).to(".leeko-ideology__foot > span", { autoAlpha: 1, y: 0 });
	}

	if ($(".pc .leeko-contents--inf00300").length > 0) {
		TweenMax.set(".leeko-introduction__item.idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx03", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__text", { autoAlpha: 0, x: "20%" });
		TweenMax.set(".leeko-introduction__item.idx04", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx05", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx06", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx07", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl1.to(".leeko-introduction__item.idx01", { autoAlpha: 1, y: 0 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl2.to(".leeko-introduction__item.idx02", { autoAlpha: 1, y: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl3.to(".leeko-introduction__item.idx03", { autoAlpha: 1, y: 0 });

		let tltext = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__text",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tltext.to(".leeko-introduction__text", { autoAlpha: 1, x: "-20%" });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl4.to(".leeko-introduction__item.idx04", { autoAlpha: 1, y: 0 });

		let tl5 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx05",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl5.to(".leeko-introduction__item.idx05", { autoAlpha: 1, y: 0 });

		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx06",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl6.to(".leeko-introduction__item.idx06", { autoAlpha: 1, y: 0 });

		let tl7 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx07",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl7.to(".leeko-introduction__item.idx07", { autoAlpha: 1, y: 0 });
	}
	if ($(".mo .leeko-contents--inf00300").length > 0) {
		TweenMax.set(".leeko-introduction__item.idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx03", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__text", { autoAlpha: 0, x: "20%" });
		TweenMax.set(".leeko-introduction__item.idx04", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx05", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx06", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-introduction__item.idx07", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl1.to(".leeko-introduction__item.idx01", { autoAlpha: 1, y: 0 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl2.to(".leeko-introduction__item.idx02", { autoAlpha: 1, y: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl3.to(".leeko-introduction__item.idx03", { autoAlpha: 1, y: 0 });

		let tltext = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__text",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tltext.to(".leeko-introduction__text", { autoAlpha: 1, x: "-20%" });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl4.to(".leeko-introduction__item.idx04", { autoAlpha: 1, y: 0 });

		let tl5 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx05",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl5.to(".leeko-introduction__item.idx05", { autoAlpha: 1, y: 0 });

		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx06",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl6.to(".leeko-introduction__item.idx06", { autoAlpha: 1, y: 0 });

		let tl7 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-introduction__item.idx07",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});
		tl7.to(".leeko-introduction__item.idx07", { autoAlpha: 1, y: 0 });
	}

	if ($(".pc .leeko-contents--inf00400").length > 0) {
		TweenMax.set(".leeko-history-public__section.idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx03", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx04", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx05", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx06", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl1.to(".leeko-history-public__section.idx01", { autoAlpha: 1, y: 0 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl2.to(".leeko-history-public__section.idx02", { autoAlpha: 1, y: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl3.to(".leeko-history-public__section.idx03", { autoAlpha: 1, y: 0 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl4.to(".leeko-history-public__section.idx04", { autoAlpha: 1, y: 0 });

		let tl5 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx05",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl5.to(".leeko-history-public__section.idx05", { autoAlpha: 1, y: 0 });

		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx06",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl6.to(".leeko-history-public__section.idx06", { autoAlpha: 1, y: 0 });
	}
	if ($(".mo .leeko-contents--inf00400").length > 0) {
		TweenMax.set(".leeko-history-public__section.idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx03", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx04", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx05", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-history-public__section.idx06", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl1.to(".leeko-history-public__section.idx01", { autoAlpha: 1, y: 0 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl2.to(".leeko-history-public__section.idx02", { autoAlpha: 1, y: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl3.to(".leeko-history-public__section.idx03", { autoAlpha: 1, y: 0 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl4.to(".leeko-history-public__section.idx04", { autoAlpha: 1, y: 0 });

		let tl5 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx05",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl5.to(".leeko-history-public__section.idx05", { autoAlpha: 1, y: 0 });

		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-history-public__section.idx06",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl6.to(".leeko-history-public__section.idx06", { autoAlpha: 1, y: 0 });
	}

	if ($(".pc .leeko-contents--inf00500").length > 0) {
		//TweenMax.set(".leeko-organization__title p", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-organization__title span", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-organization__chart h5", { autoAlpha: 0, y: 0 });
		TweenMax.set(".leeko-organization__chart .line01", { autoAlpha: 0, y: 0 });
		TweenMax.set(".leeko-organization__chart h6", { autoAlpha: 0, y: 0 });
		TweenMax.set(".leeko-organization__chart .line02", { autoAlpha: 0, y: 0 });
		TweenMax.set(".leeko-organization__chart-list .pc .idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-organization__chart-list .pc .idx02", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-organization",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=800",
			},
		});

		tl1
			.to(".leeko-organization__title p", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__title span", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart h5", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart .line01", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart h6", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart .line02", { autoAlpha: 1, y: 0 })

			.to(".leeko-organization__chart-list .pc .idx01", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart-list .pc .idx02", { autoAlpha: 1, y: 0 });
	}
	if ($(".mo .leeko-contents--inf00500").length > 0) {
		//TweenMax.set(".leeko-organization__title p", { autoAlpha: 0, y: 30 });
		//TweenMax.set(".leeko-organization__title span", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-organization__chart h5", { autoAlpha: 0, y: 0 });
		TweenMax.set(".leeko-organization__chart .line01", { autoAlpha: 0, y: 0 });
		TweenMax.set(".leeko-organization__chart h6", { autoAlpha: 0, y: 0 });
		TweenMax.set(".leeko-organization__chart-list", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-organization",
				scrub: false,
				//markers: true,
				start: "11% center",
				end: "55%",
			},
		});

		tl1
			.to(".leeko-organization__title p", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__title span", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart h5", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart .line01", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart h6", { autoAlpha: 1, y: 0 })
			.to(".leeko-organization__chart-list", { autoAlpha: 1, y: 0 });
	}

	if ($(".pc .leeko-contents--inf00600").length > 0) {
		//TweenMax.set(".idx01 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		//TweenMax.set(".idx01 ul", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=300",
			},
		});

		tl1.to(".idx01 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx01 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".idx02 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".idx02 ul", { autoAlpha: 0, y: 30 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=300",
			},
		});

		tl2.to(".idx02 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx02 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".idx03 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".idx03 ul", { autoAlpha: 0, y: 30 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=300",
			},
		});

		tl3.to(".idx03 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx03 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".idx04 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".idx04 ul", { autoAlpha: 0, y: 30 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=300",
			},
		});

		tl4.to(".idx04 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx04 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".idx05 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".idx05 ul", { autoAlpha: 0, y: 30 });

		let tl5 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx05",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=300",
			},
		});

		tl5.to(".idx05 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx05 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".leeko-partners__table .leeko-partners__table-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-partners__table table", { autoAlpha: 0, y: 30 });

		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-partners__table",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=300",
			},
		});

		tl6.to(".leeko-partners__table .leeko-partners__table-title", { autoAlpha: 1, y: 0 }).to(".leeko-partners__table table", { autoAlpha: 1, y: 0 });
	}
	if ($(".mo .leeko-contents--inf00600").length > 0) {
		//TweenMax.set(".idx01 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		//TweenMax.set(".idx01 ul", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx01",
				scrub: false,
				//markers: true,
				start: "40% center",
				end: "-70%",
			},
		});

		tl1.to(".idx01 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx01 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".idx02 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".idx02 ul", { autoAlpha: 0, y: 30 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx02",
				scrub: false,
				//markers: true,
				start: "-10% center",
				end: "-70%",
			},
		});

		tl2.to(".idx02 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx02 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".idx03 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".idx03 ul", { autoAlpha: 0, y: 30 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx03",
				scrub: false,
				//markers: true,
				start: "-20% center",
				end: "-50%",
			},
		});

		tl3.to(".idx03 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx03 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".idx04 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".idx04 ul", { autoAlpha: 0, y: 30 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx04",
				scrub: false,
				//markers: true,
				start: "-20% center",
				end: "-50%",
			},
		});

		tl4.to(".idx04 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx04 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".idx05 .leeko-partners__item-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".idx05 ul", { autoAlpha: 0, y: 30 });

		let tl5 = gsap.timeline({
			scrollTrigger: {
				trigger: ".idx05",
				scrub: false,
				//markers: true,
				start: "-20% center",
				end: "-50%",
			},
		});

		tl5.to(".idx05 .leeko-partners__item-title", { autoAlpha: 1, y: 0 }).to(".idx05 ul", { autoAlpha: 1, y: 0 });

		TweenMax.set(".leeko-partners__table .leeko-partners__table-title", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-partners__table table", { autoAlpha: 0, y: 30 });

		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-partners__table",
				scrub: false,
				//markers: true,
				start: "-20% center",
				end: "-50%",
			},
		});

		tl6.to(".leeko-partners__table .leeko-partners__table-title", { autoAlpha: 1, y: 0 }).to(".leeko-partners__table table", { autoAlpha: 1, y: 0 });
	}

	//주요활동
	if ($(".pc .leeko-contents--maj00100").length > 0) {
		TweenMax.set(".leeko-activities .idx00", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx03", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx04", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx05", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx06", { autoAlpha: 0, y: 30 });

		let tl0 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx00",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl0.to(".leeko-activities .idx00", { autoAlpha: 1, y: 0 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl1.to(".leeko-activities .idx01", { autoAlpha: 1, y: 0 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl2.to(".leeko-activities .idx02", { autoAlpha: 1, y: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl3.to(".leeko-activities .idx03", { autoAlpha: 1, y: 0 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl4.to(".leeko-activities .idx04", { autoAlpha: 1, y: 0 });

		let tl5 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx05",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl5.to(".leeko-activities .idx05", { autoAlpha: 1, y: 0 });

		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx06",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl6.to(".leeko-activities .idx06", { autoAlpha: 1, y: 0 });
	}
	if ($(".mo .leeko-contents--maj00100").length > 0) {
		TweenMax.set(".leeko-activities .idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx03", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx04", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx05", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx06", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl1.to(".leeko-activities .idx01", { autoAlpha: 1, y: 0 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl2.to(".leeko-activities .idx02", { autoAlpha: 1, y: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl3.to(".leeko-activities .idx03", { autoAlpha: 1, y: 0 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl4.to(".leeko-activities .idx04", { autoAlpha: 1, y: 0 });

		let tl5 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx05",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl5.to(".leeko-activities .idx05", { autoAlpha: 1, y: 0 });

		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx06",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl6.to(".leeko-activities .idx06", { autoAlpha: 1, y: 0 });
	}

	if ($(".pc .leeko-contents--maj00200").length > 0) {
		TweenMax.set(".leeko-activities .idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx03", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx04", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl1.to(".leeko-activities .idx01", { autoAlpha: 1, y: 0 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl2.to(".leeko-activities .idx02", { autoAlpha: 1, y: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl3.to(".leeko-activities .idx03", { autoAlpha: 1, y: 0 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl4.to(".leeko-activities .idx04", { autoAlpha: 1, y: 0 });
	}
	if ($(".mo .leeko-contents--maj00200").length > 0) {
		TweenMax.set(".leeko-activities .idx01", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx02", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx03", { autoAlpha: 0, y: 30 });
		TweenMax.set(".leeko-activities .idx04", { autoAlpha: 0, y: 30 });

		let tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx01",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl1.to(".leeko-activities .idx01", { autoAlpha: 1, y: 0 });

		let tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx02",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl2.to(".leeko-activities .idx02", { autoAlpha: 1, y: 0 });

		let tl3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx03",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl3.to(".leeko-activities .idx03", { autoAlpha: 1, y: 0 });

		let tl4 = gsap.timeline({
			scrollTrigger: {
				trigger: ".leeko-activities .idx04",
				scrub: false,
				//markers: true,
				start: "-=150 center",
				end: "+=0",
			},
		});

		tl4.to(".leeko-activities .idx04", { autoAlpha: 1, y: 0 });
	}
});
