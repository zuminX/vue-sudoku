(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5170b6e3"],{"379e":function(t,e,a){"use strict";a.r(e);var i=a("5530"),n=a("2f62"),s=(a("4de4"),a("d81d"),a("13d5"),a("d3b7"),a("b85c")),c=(a("96cf"),a("1da1")),r=a("8c5d"),u=a("37a2");a.e("chunk-2d0ce84f").then(a.t.bind(null,"6098",7));var l={name:"UserGameInformationList",data:function(){return{gameInformationList:[],overviewGameInformation:{total:0,correctNumber:0,averageSpendTime:null,minSpendTime:null,maxSpendTime:null}}},updated:function(){Object(r.f)(".menu .item")},mounted:function(){this.initGameInformation()},methods:{initGameInformation:function(){var n=this;return Object(c.a)(regeneratorRuntime.mark(function t(){var e,a,i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(u.b)();case 2:e=t.sent,a=e.success,i=e.data,a&&(n.overviewGameInformation=n.calculateOverviewGameInformation(i),n.gameInformationList=n.formatSpendTime(i));case 6:case"end":return t.stop()}},t)}))()},calculateOverviewGameInformation:function(t){return{total:this.calculateTotal(t),correctNumber:this.calculateCorrectNumber(t),averageSpendTime:Object(r.c)(this.calculateAverageSpendTime(t)),minSpendTime:Object(r.c)(this.calculateMinSpendTime(t)),maxSpendTime:Object(r.c)(this.calculateMaxSpendTime(t))}},formatSpendTime:function(t){var e,a=Object(s.a)(t);try{for(a.s();!(e=a.n()).done;){var i=e.value;i.averageSpendTime=Object(r.c)(i.averageSpendTime),i.minSpendTime=Object(r.c)(i.minSpendTime),i.maxSpendTime=Object(r.c)(i.maxSpendTime)}}catch(t){a.e(t)}finally{a.f()}return t},calculateAverageSpendTime:function(t){var e=t.map(function(t){return t.averageSpendTime}).filter(function(t){return null!==t}),a=e.length;return 0===a?null:e.reduce(function(t,e){return t+e},0)/a},calculateMinSpendTime:function(t){var e=t.map(function(t){return t.minSpendTime}).filter(function(t){return null!==t});return Math.min.apply(null,e)},calculateMaxSpendTime:function(t){var e=t.map(function(t){return t.maxSpendTime}).filter(function(t){return null!==t});return Math.max.apply(null,e)},calculateTotal:function(t){return t.map(function(t){return t.total}).reduce(function(t,e){return t+e},0)},calculateCorrectNumber:function(t){return t.map(function(t){return t.correctNumber}).reduce(function(t,e){return t+e},0)}}},o=(a("c4ff"),a("2877")),m={name:"UserInformationModal",components:{UserGameInformationList:Object(o.a)(l,function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",[i("div",{staticClass:"ui top attached tabular menu"},[i("a",{staticClass:"item active",attrs:{"data-tab":"-1"}},[a._v("总览")]),a._l(a.gameInformationList,function(t,e){return i("a",{key:e,staticClass:"item",attrs:{"data-tab":e}},[a._v(" "+a._s(t.sudokuLevelName)+" ")])})],2),i("div",{staticClass:"ui bottom attached tab segment active",attrs:{"data-tab":"-1"}},[i("div",{staticClass:"ui five statistics"},[i("div",{staticClass:"statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(a.overviewGameInformation.total)+" ")]),i("div",{staticClass:"label"},[a._v(" 总局数(次) ")])]),i("div",{staticClass:"statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(a.overviewGameInformation.correctNumber)+" ")]),i("div",{staticClass:"label"},[a._v(" 提交正确的局数(次) ")])]),i("div",{staticClass:"ui statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(a.overviewGameInformation.averageSpendTime)+" ")]),i("div",{staticClass:"label"},[a._v(" 各模式的平均用时(秒) ")])]),i("div",{staticClass:"ui statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(a.overviewGameInformation.minSpendTime)+" ")]),i("div",{staticClass:"label"},[a._v(" 最短用时(秒) ")])]),i("div",{staticClass:"statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(a.overviewGameInformation.maxSpendTime)+" ")]),i("div",{staticClass:"label"},[a._v(" 最长用时(秒) ")])])])]),a._l(a.gameInformationList,function(t,e){return i("div",{key:e,staticClass:"ui bottom attached tab segment",attrs:{"data-tab":e}},[i("div",{staticClass:"ui five statistics"},[i("div",{staticClass:"statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(t.total)+" ")]),i("div",{staticClass:"label"},[a._v(" 局数(次) ")])]),i("div",{staticClass:"statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(t.correctNumber)+" ")]),i("div",{staticClass:"label"},[a._v(" 提交正确的局数(次) ")])]),i("div",{staticClass:"statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(t.averageSpendTime)+" ")]),i("div",{staticClass:"label"},[a._v(" 平均用时(秒) ")])]),i("div",{staticClass:"statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(t.minSpendTime)+" ")]),i("div",{staticClass:"label"},[a._v(" 最短用时(秒) ")])]),i("div",{staticClass:"statistic"},[i("div",{staticClass:"value"},[a._v(" "+a._s(t.maxSpendTime)+" ")]),i("div",{staticClass:"label"},[a._v(" 最长用时(秒) ")])])])])})],2)},[],!1,null,"9cf9f866",null).exports},computed:Object(i.a)({},Object(n.b)(["user"]))},v=Object(o.a)(m,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"ui segment"},[a("p",[t._v("用户名："+t._s(t.user.username))]),a("p",[t._v("昵称："+t._s(t.user.nickname))])]),a("UserGameInformationList")],1)},[],!1,null,null,null);e.default=v.exports},"37a2":function(t,e,a){"use strict";a.d(e,"c",function(){return s}),a.d(e,"b",function(){return c}),a.d(e,"a",function(){return r});var i=a("4337"),n="/user",s=function(t){return Object(i.b)("".concat(n,"/register"),t)},c=function(){return Object(i.a)("".concat(n,"/gameInformation"))},r=function(t,e){return Object(i.a)("".concat(n,"/historyGameRecord"),{page:t,pageSize:e})}},"948f":function(t,e,a){},c4ff:function(t,e,a){"use strict";a("948f")}}]);