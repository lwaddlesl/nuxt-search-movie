(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{114:function(e,t,n){"use strict";var r=n(115),c=n.n(r);t.default=c.a},115:function(e,t){},146:function(e,t,n){"use strict";var r=n(0),c=n(210),o=n.n(c);n(294);r.default.use(o.a)},147:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return c}));var r=function(){var e=this.$createElement,t=this._self._c||e;return t("v-app",{attrs:{dark:""}},[t("Nuxt")],1)},c=[]},189:function(e,t,n){var content=n(255);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(76).default)("7388ab72",content,!0,{sourceMap:!1})},208:function(e,t,n){"use strict";var r=n(147),c=n(114),o=n(65),l=n(92),f=n.n(l),d=n(297),component=Object(o.a)(c.default,r.a,r.b,!1,null,null,null);t.default=component.exports,f()(component,{VApp:d.a})},222:function(e,t,n){n(223),e.exports=n(224)},254:function(e,t,n){"use strict";n(189)},255:function(e,t,n){var r=n(75)(!1);r.push([e.i,"h1[data-v-bfedb7fe]{font-size:20px}",""]),e.exports=r},260:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return l})),n.d(t,"getters",(function(){return f})),n.d(t,"actions",(function(){return d})),n.d(t,"mutations",(function(){return v}));var r=n(7),c=(n(69),n(30),n(121),n(32),n(44)),o=n.n(c),l=function(){return{URL:"https://api.themoviedb.org/3",APIKEY:"f1dfea0ae51d06d0af3e583914087e6c",curPage:1,movies:[],search:"",searchedMovies:[],maxPages:0,isMoviesLoading:!0,selectFilter:"popular"}},f={},d={getMovies:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,c,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.state,r=e.commit,t.prev=1,r("setPage",n.curPage),r("setSelectFilter",n.selectFilter),r("moviesClear"),r("setLoading",!0),n.search){t.next=15;break}return t.next=9,o.a.get("".concat(n.URL,"/movie/").concat(n.selectFilter,"?api_key=").concat(n.APIKEY,"&language=en-US&page=").concat(n.curPage));case 9:c=t.sent,r("setLoading",!1),r("setMovies",c.data.results),r("setMaxPages",c.data.total_pages),t.next=19;break;case 15:return t.next=17,o.a.get("".concat(n.URL,"/search/movie/?api_key=").concat(n.APIKEY,"&language=en-US&page=").concat(n.curPage,"&query=").concat(n.search));case 17:l=t.sent,r("setSearchedMovies",l.data.results);case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(1),console.log(t.t0);case 24:return t.prev=24,r("setLoading",!1),t.finish(24);case 27:case"end":return t.stop()}}),t,null,[[1,21,24,27]])})))()},searchMovies:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.state,r=e.commit,t.prev=1,r("getSearch",n.search),r("searchClear"),r("setLoading",!0),t.next=7,o.a.get("".concat(n.URL,"/search/movie/?api_key=").concat(n.APIKEY,"&language=en-US&page=").concat(n.curPage,"&query=").concat(n.search));case 7:c=t.sent,r("setSearchedMovies",c.data.results),r("setMaxPages",c.data.total_pages),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(1),console.log(t.t0);case 15:return t.prev=15,r("setLoading",!1),t.finish(15);case 18:case"end":return t.stop()}}),t,null,[[1,12,15,18]])})))()}},v={setLoading:function(e,t){e.isMoviesLoading=t},moviesClear:function(e){e.movies=[],e.searchedMovies=[]},setMaxPages:function(e,t){e.maxPages=t},setMovies:function(e,t){e.movies=t},setSearchedMovies:function(e,t){e.searchedMovies=t},setPage:function(e,t){e.curPage=t},setSelectFilter:function(e,t){e.selectFilter=t},getSearch:function(e,t){e.search=t},updateFilter:function(e,t){e.selectFilter=t,e.curPage=1},filter:function(e){e.movies=[],e.curPage=1},searchClear:function(e){e.searchedMovies=[],e.curPage=1},clear:function(e){e.search="",e.searchedMovies=[],e.curPage=1}}},52:function(e,t,n){"use strict";var r={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},c=(n(254),n(65)),o=n(92),l=n.n(o),f=n(297),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{dark:""}},[404===e.error.statusCode?n("h1",[e._v("\n    "+e._s(e.pageNotFound)+"\n  ")]):n("h1",[e._v("\n    "+e._s(e.otherError)+"\n  ")]),e._v(" "),n("NuxtLink",{attrs:{to:"/"}},[e._v("\n    Home page\n  ")])],1)}),[],!1,null,"bfedb7fe",null);t.a=component.exports;l()(component,{VApp:f.a})}},[[222,13,5,14]]]);