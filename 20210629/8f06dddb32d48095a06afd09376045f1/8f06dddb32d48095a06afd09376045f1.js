(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
	["chunk-3d6d7d54"], {
		"0ad9": function(i, t, a) {
			"use strict";
			var e = a("3fa5"),
				s = a.n(e);
			s.a
		},
		"3fa5": function(i, t, a) {},
		"516d": function(i, t, a) {
			i.exports = a.p + "img/jk_img_ewm.643538f2.png"
		},
		"6ec3": function(i, t, a) {
			i.exports = a.p + "img/jk_img_bg.e1033e44.png"
		},
		b64c: function(i, t, a) {
			"use strict";
			a.r(t);
			var e = function() {
					var i = this,
						t = i.$createElement,
						e = i._self._c || t;
					return e("div", [e("div", {
						staticClass: "container",
						class: {
							hover: i.isHover
						},
						on: {
							click: function(t) {
								i.isHover = !i.isHover
							}
						}
					}, [e("div", {
						staticClass: "flip"
					}, [e("div", {
						staticClass: "front"
					}, [e("div", {
						class: {
							"certificate-card-badge-normal": 1 === i.info.hcCValidity, "certificate-card-badge-warning": 2 ===
								i.info.hcCValidity, "certificate-card-badge-invalid": 3 === i.info.hcCValidity
						}
					}, [i._v("\n          " + i._s(i.getValidityText) + "\n        ")]), e("div", {
						staticClass: "certificate-card-photo"
					}, [e("img", {
						attrs: {
							src: i.info.imgUrl,
							alt: ""
						}
					}), e("img", {
						attrs: {
							src: i.info.hcQRCode,
							alt: ""
						}
					})]), e("div", {
						staticClass: "certificate-card-info"
					}, [i._m(0), e("div", {
						staticClass: "flex-row-whole certificate-card-info-detail"
					}, [e("p", [e("span", {
						staticClass: "field-name"
					}, [i._v("编　　号")]), i._v("\n              " + i._s(i.info.HCCode) + "\n            ")])]), e("div", {
						staticClass: "flex-row-whole certificate-card-info-detail"
					}, [e("p", [e("span", {
						staticClass: "field-name"
					}, [i._v("姓　　名")]), i._v("\n              " + i._s(i.info.employeeName) + "\n            ")])]), e(
						"div", {
							staticClass: "flex-row-whole certificate-card-info-detail"
						}, [e("p", {
							staticClass: "flex-row-half"
						}, [e("span", {
							staticClass: "field-name"
						}, [i._v("性　　别")]), i._v("\n                  " + i._s(1 === i.info.employeeSex ? "男" : "女") +
							"\n              ")])]), e("div", {
						staticClass: "flex-row-whole certificate-card-info-detail"
					}, [e("p", {
						staticClass: "flex-row-half"
					}, [e("span", {
						staticClass: "field-name"
					}, [i._v("年　　龄")]), i._v("\n                  " + i._s(i.info.age) + "\n              ")])]), e(
						"div", {
							staticClass: "flex-row-whole certificate-card-info-detail"
						}, [e("p", {
							staticStyle: {
								display: "flex"
							}
						}, [e("span", {
							staticClass: "field-name field-name-special"
						}, [i._v("体检机构")]), e("span", [i._v(i._s(i.info.companyName))])])]), e("div", {
						staticClass: "flex-row-whole certificate-card-info-detail"
					}, [e("p", [e("span", {
						staticClass: "field-name"
					}, [i._v("有效日期")]), i._v("\n                  " + i._s(i.info.validityBeginDate) + " 至 " + i._s(
						i.info.validityEndDate) + "\n              ")])])]), e("img", {
						staticClass: "image",
						attrs: {
							src: a("6ec3"),
							alt: ""
						}
					})]), i._m(1)])])])
				},
				s = [function() {
					var i = this,
						t = i.$createElement,
						a = i._self._c || t;
					return a("div", {
						staticClass: "certificate-card-info-title"
					}, [a("p", [i._v("从 业 人 员 健 康 证 明")])])
				}, function() {
					var i = this,
						t = i.$createElement,
						e = i._self._c || t;
					return e("div", {
						staticClass: "back"
					}, [e("p", {
						staticClass: "title"
					}, [i._v("注意事项")]), e("div", {
						staticStyle: {
							display: "flex"
						}
					}, [e("p", [i._v("1. ")]), e("p", [i._v(
						"本证明材料仅能证明受检者在健康检查时所检项目合格。有效期内，如患伤寒、痢疾、甲型或戊型病毒性肝炎等消化道传染病、活动性肺结核、渗出性化脓性皮肤病等疾病，必须脱离现岗位，直至获得痊愈证明。")])]), e(
						"div", {
							staticStyle: {
								display: "flex"
							}
						}, [e("p", [i._v("2. ")]), e("p", [i._v("请自觉接受监管部门和社会监督。")])]), e("div", {
						staticStyle: {
							display: "flex"
						}
					}, [e("p", [i._v("3. ")]), e("p", [i._v("本电子健康证明和电子健康证明提取码同样有效。")])]), e("div", {
						staticClass: "website"
					}, [e("div", {
						staticClass: "qrcode-image"
					}, [e("img", {
						attrs: {
							src: a("516d"),
							alt: ""
						}
					}), e("p", [i._v("（扫描关注健康证信息）")])])]), e("img", {
						staticClass: "image",
						attrs: {
							src: a("6ec3"),
							alt: ""
						}
					})])
				}],
				c = (a("d4d5"), {
					props: ["hcCertificateInfo"],
					data: function() {
						return {
							info: {
								hcCValidity: Number,
								HCCode: "",
								employeeName: "",
								employeeSex: Number,
								age: Number,
								companyName: "",
								validityBeginDate: "",
								validityEndDate: "",
								personal: Boolean,
								imgUrl: ""
							},
							isHover: !1
						}
					},
					created: function() {
						this.info = Object.assign(this.info, this.hcCertificateInfo)
					},
					computed: {
						getValidityText: function() {
							return 1 === this.info.hcCValidity ? "有效" : 2 === this.info.hcCValidity ? "快过期" : "已过期"
						}
					}
				}),
				l = c,
				n = (a("0ad9"), a("17cc")),
				d = Object(n["a"])(l, e, s, !1, null, "37b67262", null);
			t["default"] = d.exports
		}
	}
]);
//# sourceMappingURL=chunk-3d6d7d54.b583f596.js.map
