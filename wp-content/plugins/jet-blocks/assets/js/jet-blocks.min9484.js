!function(v,b,i){"use strict";var j={addedScripts:{},addedStyles:{},addedAssetsPromises:[],init:function(){var e={"jet-nav-menu.default":j.navMenu,"jet-search.default":j.searchBox,"jet-auth-links.default":j.authLinks,"jet-hamburger-panel.default":j.hamburgerPanel,"jet-blocks-cart.default":j.wooCard,"jet-register.default":j.userRegistration,"jet-reset.default":j.userResetPassword,"jet-login.default":j.userLogin};v.each(e,function(e,t){b.hooks.addAction("frontend/element_ready/"+e,t)}),v(document).on("click.jetBlocks",".jet-search__popup-trigger",j.searchPopupSwitch).on("click.jetBlocks",".jet-search__popup-close",j.searchPopupSwitch),v(window).on("jet-menu/ajax/frontend-init/before",function(){v(document.body).trigger("wc_fragment_refresh")}),b.hooks.addAction("frontend/element_ready/section",j.setStickySection),b.hooks.addAction("frontend/element_ready/container",j.setStickySection),v(j.stickySection)},wooCard:function(e){(window.JetBlocksEditor&&window.JetBlocksEditor.activeSection||j.isEditMode())&&(i=window.JetBlocksEditor.activeSection,["cart_list_style","cart_list_items_style","cart_buttons_style"].indexOf(i),v(".widget_shopping_cart_content").empty(),v(document.body).trigger("wc_fragment_refresh"));var t=v(".jet-blocks-cart",e),n=v(".jet-blocks-cart__heading-link",t),i=t.data("settings"),o=v("html, body");switch(t.hasClass("jet-blocks-cart--slide-out-layout")&&(n.on("touchend",function(e){"hidden"==o.css("overflow")?o.css({overflow:""}):o.css({overflow:"hidden"})}),v(".jet-blocks-cart__close-button",t).on("touchend",function(e){o.css({overflow:""})})),i.triggerType){case"hover":"ontouchend"in window||"ontouchstart"in window?(t.on("touchstart",function(e){scrollOffset=v(window).scrollTop()}),t.on("touchend",function(e){if(scrollOffset!==v(window).scrollTop())return!1;var t=v(this);t.hasClass("jet-cart-open-proccess")||setTimeout(function(){t.toggleClass("jet-cart-open")},10)}),v(document).on("touchend",function(e){v(e.target).closest(t).length||t.hasClass("jet-cart-open-proccess")||t.hasClass("jet-cart-open")&&t.removeClass("jet-cart-open")})):t.on("mouseenter mouseleave",function(e){v(this).hasClass("jet-cart-open-proccess")||"mouseenter"!==e.type||v(this).addClass("jet-cart-open"),v(this).hasClass("jet-cart-open-proccess")||"mouseleave"!==e.type||v(this).removeClass("jet-cart-open")});break;case"click":n.on("click",function(e){e.preventDefault(),t.hasClass("jet-cart-open-proccess")||t.toggleClass("jet-cart-open")})}v(".jet-blocks-cart__close-button",t).on("click touchend",function(e){t.hasClass("jet-cart-open-proccess")||t.removeClass("jet-cart-open")})},userRegistration:function(e){var t=v(".jet-register",e),n=v(".pw-validation",t),i=v("button.jet-register__submit",e);n.length&&j.strongPasswordValidation(e,i),j.togglePasswordVisibility(e),w.googleRecaptcha(t)},userResetPassword:function(e){var t=v(".jet-reset",e),n=v(".jet-reset__form",e),t=v(".pw-validation",t),i=v("button.jet-reset__button",e);t.length&&j.strongPasswordValidation(e,i),j.togglePasswordVisibility(e),w.googleRecaptcha(n)},userLogin:function(e){e=v("#loginform",e);w.googleRecaptcha(e)},navMenu:function(r){var c,i,l,e,n,t,o,s,a,d,u,p;function h(e){var t,n=r.find(".jet-nav");"touchend"===e.type&&u!==v(window).scrollTop()||"touchend"===e.type||!v(e.target).parent().hasClass("jet-nav-arrow")&&v(e.target).closest(n).length||(t=v(".menu-item-has-children."+c,n))[0]&&(t.removeClass(c),t.addClass(i),setTimeout(function(){t.removeClass(i)},200),n.hasClass("jet-nav--vertical-sub-bottom")&&v(".jet-nav__sub",t).slideUp(200),e.stopPropagation())}function m(e){r.find(".jet-nav").hasClass("jet-nav--vertical-sub-bottom")&&h(e)}function f(e){var t=r.find(".jet-nav-wrap").data("mobile-layout"),n=r.find(".jet-nav-wrap"),i=r.find(".jet-nav__mobile-trigger"),o=r.find(".jet-nav");"left-side"!==t&&"right-side"!==t||"touchend"===e.type&&u!==v(window).scrollTop()||v(e.target).closest(i).length||v(e.target).closest(o).length||n.hasClass(l)&&(n.removeClass(l),e.stopPropagation())}function g(){var e,t;"full-width"===r.find(".jet-nav-wrap").data("mobile-layout")&&(e=r.find(".jet-nav"),t=b.getCurrentDeviceMode(),n.indexOf(t)<o?p&&(e.css({left:""}),p=!1):(p&&e.css({left:""}),t=-e.offset().left,e.css({left:t}),p=!0))}r.data("initialized")||(r.data("initialized",!0),c="jet-nav-hover",i="jet-nav-hover-out",l="jet-mobile-menu-active",e=b.getCurrentDeviceMode(),n=["tablet_extra","tablet","mobile_extra","mobile"],t=v.inArray(e,["widescreen","desktop","laptop"]),d=null!=v(".jet-nav-wrap",r).data("mobile-trigger-device")?v(".jet-nav-wrap",r).data("mobile-trigger-device"):"",o=null,s=n.indexOf(e),a="ontouchend"in window?"touchend.jetNavMenu":"click.jetNavMenu",""!=d&&(o=n.indexOf(d)),r.find(".jet-nav:not(.jet-nav--vertical-sub-bottom)").hoverIntent({over:function(){v(this).addClass(c)},out:function(){var e=v(this);e.removeClass(c),e.addClass(i),setTimeout(function(){e.removeClass(i)},200)},timeout:200,selector:".menu-item-has-children"}),-1===t?(r.find(".jet-nav:not(.jet-nav--vertical-sub-bottom)").on("touchstart.jetNavMenu",".menu-item > a",function(e){e=v(e.currentTarget).closest(".menu-item");e.data("offset",v(window).scrollTop()),e.data("elemOffset",e.offset().top)}),r.find(".jet-nav:not(.jet-nav--vertical-sub-bottom)").on("touchend.jetNavMenu",".menu-item > a",function(e){var t,n,i,o,s,a;if(e.preventDefault(),e=v(e.currentTarget),e=e.closest(".menu-item"),t=e.siblings(".menu-item.menu-item-has-children"),n=v("> a",e),i=v(".jet-nav__sub:first",e),o=e.data("offset"),s=e.data("elemOffset"),a=e.closest(".jet-hamburger-panel"),o!==v(window).scrollTop()||s!==e.offset().top)return!1;t[0]&&(t.removeClass(c),v(".menu-item-has-children",t).removeClass(c));if(!v(".jet-nav__sub",e)[0]||e.hasClass(c))return n.trigger("click"),window.location.href=n.attr("href"),r.find(".jet-nav-wrap").hasClass(l)&&r.find(".jet-nav-wrap").removeClass(l),a[0]&&a.hasClass("open-state")&&(a.removeClass("open-state"),v("html").removeClass("jet-hamburger-panel-visible")),!1;i[0]&&e.addClass(c)}),o<=s&&v(".jet-mobile-menu.jet-nav-wrap",r).addClass("jet-mobile-menu-trigger-active"),v(document).on("touchstart.jetNavMenu",function(e){u=v(window).scrollTop()}),v(document).on("touchend.jetNavMenu",h)):r.find(".jet-nav:not(.jet-nav--vertical-sub-bottom)").on("click.jetNavMenu",".menu-item > a",function(e){var e=v(e.currentTarget).closest(".menu-item"),t=e.closest(".jet-hamburger-panel");e.hasClass("menu-item-has-children")&&!e.hasClass(c)||t[0]&&t.hasClass("open-state")&&(t.removeClass("open-state"),v("html").removeClass("jet-hamburger-panel-visible"))}),v(window).on("resize.jetNavMenu orientationchange.jetNavMenu",w.debounce(50,function(){e=b.getCurrentDeviceMode(),s=n.indexOf(e),o<=s?v(".jet-mobile-menu.jet-nav-wrap",r).addClass("jet-mobile-menu-trigger-active"):v(".jet-mobile-menu.jet-nav-wrap",r).removeClass("jet-mobile-menu-trigger-active")})),j.isEditMode()||(d=r.find('.menu-item-link[href*="#"]'))[0]&&d.each(function(){if(""!==this.hash&&location.pathname===this.pathname){var e,t=v(this),n=t[0].hash,i="current-menu-item",o="-50% 0% -50%";try{e=v(decodeURIComponent(n))}catch(e){return}e[0]&&(e.hasClass("elementor-menu-anchor")&&(o="300px 0% -300px"),new IntersectionObserver(function(e){e[0].isIntersecting?t.parent(".menu-item").addClass(i):t.parent(".menu-item").removeClass(i)},{rootMargin:o}).observe(e[0]))}}),r.find(".jet-nav--vertical-sub-bottom").on("click.jetNavMenu",".menu-item > a",function(e){var t=v(e.currentTarget).closest(".menu-item"),n=t.siblings(".menu-item.menu-item-has-children"),i=v(".jet-nav__sub:first",t),o=t.closest(".jet-hamburger-panel");!t.hasClass("menu-item-has-children")||t.hasClass(c)?(r.find(".jet-nav-wrap").hasClass(l)&&r.find(".jet-nav-wrap").removeClass(l),o[0]&&o.hasClass("open-state")&&(o.removeClass("open-state"),v("html").removeClass("jet-hamburger-panel-visible"))):(e.preventDefault(),e.stopPropagation(),n[0]&&(n.removeClass(c),v(".menu-item-has-children",n).removeClass(c),v(".jet-nav__sub",n).slideUp(200)),i[0]&&(i.slideDown(200),t.addClass(c)))}),v(document).on(a,m),r.find(".jet-nav--vertical-sub-bottom").on("click.jetNavMenu",".menu-item",m),v(".jet-nav__mobile-trigger",r).on("click.jetNavMenu",function(e){v(this).closest(".jet-nav-wrap").toggleClass(l)}),"ontouchend"in window?v(document).on("touchend.jetMobileNavMenu",f):v(document).on("click.jetMobileNavMenu",f),v(".jet-nav__mobile-close-btn",r).on("click.jetMobileNavMenu",function(e){v(this).closest(".jet-nav-wrap").removeClass(l)}),p=!1,g(),v(window).on("resize.jetMobileNavMenu",g),j.isEditMode()&&r.data("initialized",!1))},searchBox:function(a){j.onSearchSectionActivated(a),v(document).on("click.jetBlocks",function(e){var t=a.find(".jet-search"),n=v(".jet-search__popup-trigger",t),i=v(".jet-search__popup-content",t),o="jet-search-popup-active",s="jet-transition-out";v(e.target).closest(n).length||v(e.target).closest(i).length||t.hasClass(o)&&(t.removeClass(o),t.addClass(s),setTimeout(function(){t.removeClass(s)},300),e.stopPropagation())})},onSearchSectionActivated:function(e){var t;i&&window.JetBlocksEditor&&window.JetBlocksEditor.activeSection&&(t=window.JetBlocksEditor.activeSection,-1!==["section_popup_style","section_popup_close_style","section_form_style"].indexOf(t)?e.find(".jet-search").addClass("jet-search-popup-active"):e.find(".jet-search").removeClass("jet-search-popup-active"))},authLinks:function(e){var t,n;i&&window.JetBlocksEditor&&(window.JetBlocksEditor.activeSection?(n=window.JetBlocksEditor.activeSection,t=-1!==["section_logout_link","section_logout_link_style"].indexOf(n),n=-1!==["section_registered_link","section_registered_link_style"].indexOf(n),(t?e.find(".jet-auth-links__login"):e.find(".jet-auth-links__logout")).css("display","none"),n?e.find(".jet-auth-links__register"):e.find(".jet-auth-links__registered")):(e.find(".jet-auth-links__logout").css("display","none"),e.find(".jet-auth-links__registered"))).css("display","none")},hamburgerPanel:function(e){var t,n,i,d=v(".jet-hamburger-panel",e),o=v(".jet-hamburger-panel__toggle",e),s=v(".jet-hamburger-panel__instance",e),a=v(".jet-hamburger-panel__cover",e),r=v(".jet-hamburger-panel__inner",e),c=v(".jet-hamburger-panel__close-button",e),l=v(".jet-hamburger-panel__content",e),u=(Boolean(b.isEditMode()),v("html")),p=d.data("settings")||{},h=e.parents(".e-container");function m(e,t=!0){t?(h.css("z-index",999),e.parent(".e-container").css("z-index",999)):!1===t&&(h.css("z-index",""),e.parent(".e-container").css("z-index",""))}function f(e,t){var c=e,e=c.data("template-loaded")||!1,n=c.data("template-id"),l=v(".jet-hamburger-panel-loader",c),t=t.ajaxTemplateCache;e||(v(window).trigger("jet-blocks/ajax-load-template/before",{target:d,contentHolder:c}),c.data("template-loaded",!0),v.ajax({type:"GET",url:window.JetHamburgerPanelSettings.templateApiUrl,dataType:"json",data:{id:n,dev:window.JetHamburgerPanelSettings.devMode,cachedTemplate:t},beforeSend:function(e){e.setRequestHeader("X-WP-Nonce",window.JetHamburgerPanelSettings.restNonce)},success:function(t,e,n){var i,o,s=t.template_content,a=t.template_scripts,r=t.template_styles;for(i in a)j.addedAssetsPromises.push(j.loadScriptAsync(i,a[i]));for(o in r)j.addedAssetsPromises.push(j.loadStyle(o,r[o]));Promise.all(j.addedAssetsPromises).then(function(e){l.remove(),c.append(s),j.elementorFrontendInit(c),v(window).trigger("jet-blocks/ajax-load-template/after",{target:d,contentHolder:c,responce:t})},function(e){console.log("Script Loaded Error")})}}))}"ontouchend"in window||"ontouchstart"in window?(o.on("touchstart",function(e){t=v(window).scrollTop()}),o.on("touchend",function(e){if(t!==v(window).scrollTop())return!1;n&&clearTimeout(n),i&&clearTimeout(i),d.hasClass("open-state")?(d.removeClass("open-state"),u.removeClass("jet-hamburger-panel-visible"),i=setTimeout(function(){m(v(this),!1)},400)):(n=setTimeout(function(){m(v(this)),d.addClass("open-state")},10),u.addClass("jet-hamburger-panel-visible"),j.initAnimationsHandlers(r),p.ajaxTemplate&&f(l,p))})):(o.on("click",function(e){n&&clearTimeout(n),d.hasClass("open-state")?(d.removeClass("open-state"),u.removeClass("jet-hamburger-panel-visible"),n=setTimeout(function(){m(v(this),!1)},400)):(m(v(this)),d.addClass("open-state"),u.addClass("jet-hamburger-panel-visible"),j.initAnimationsHandlers(r),p.ajaxTemplate&&f(l,p))}),o.on("keydown",function(e){"Enter"===e.key&&(n&&clearTimeout(n),d.hasClass("open-state")?(d.removeClass("open-state"),u.removeClass("jet-hamburger-panel-visible"),n=setTimeout(function(){m(v(this),!1)},400)):(m(v(this)),d.addClass("open-state"),u.addClass("jet-hamburger-panel-visible"),j.initAnimationsHandlers(r),p.ajaxTemplate&&f(l,p)))})),c.on("click",function(e){n&&clearTimeout(n),d.hasClass("open-state")?(d.removeClass("open-state"),u.removeClass("jet-hamburger-panel-visible"),n=setTimeout(function(){m(v(this),!1)},400)):(d.addClass("open-state"),u.addClass("jet-hamburger-panel-visible"),j.initAnimationsHandlers(r))}),v(document).on("click.JetHamburgerPanel",function(e){(!v(e.target).closest(o).length&&!v(e.target).closest(s).length||v(e.target).closest(a).length)&&d.hasClass("open-state")&&(d.removeClass("open-state"),v(e.target).closest(".jet-hamburger-panel__toggle").length||u.removeClass("jet-hamburger-panel-visible"),e.stopPropagation())})},loadStyle:function(i,o){return j.addedStyles.hasOwnProperty(i)&&j.addedStyles[i]===o?i:o?(j.addedStyles[i]=o,new Promise(function(e,t){var n=document.createElement("link");n.id=i,n.rel="stylesheet",n.href=o,n.type="text/css",n.media="all",n.onload=function(){e(i)},document.head.appendChild(n)})):void 0},loadScriptAsync:function(i,o){return j.addedScripts.hasOwnProperty(i)?i:o?(j.addedScripts[i]=o,new Promise(function(e,t){var n=document.createElement("script");n.src=o,n.async=!0,n.onload=function(){e(i)},document.head.appendChild(n)})):void 0},initAnimationsHandlers:function(e){e.find("[data-element_type]").each(function(){var e=v(this);e.data("element_type")&&window.elementorFrontend.hooks.doAction("frontend/element_ready/global",e,v)})},searchPopupSwitch:function(e){var t=v(this).closest(".jet-search"),n=v(".jet-search__field",t),i="jet-search-popup-active",o="jet-transition-in",s="jet-transition-out";t.hasClass(i)?(t.removeClass(i),t.addClass(s),setTimeout(function(){t.removeClass(s)},300)):(t.addClass(o),setTimeout(function(){t.removeClass(o),t.addClass(i)},300),n.focus())},stickySection:function(){({isEditMode:Boolean(b.isEditMode()),correctionSelector:v("#wpadminbar"),initWidescreen:!1,initDesktop:!1,initLaptop:!1,initTabletExtra:!1,initTablet:!1,initMobileExtra:!1,initMobile:!1,init:function(){var e=this;this.isEditMode||(v(document).ready(function(){e.run()}),v(window).on("resize.JetStickySection orientationchange.JetStickySection",this.run.bind(this)))},getOffset:function(){var e=0;return e=this.correctionSelector[0]&&"fixed"===this.correctionSelector.css("position")?this.correctionSelector.outerHeight(!0):e},run:function(){var e=b.getCurrentDeviceMode(),i="jet-sticky-transition-in",o="jet-sticky-transition-out",s={stickyClass:"jet-sticky-section--stuck",topSpacing:this.getOffset()};function t(e,t){t.initWidescreen&&"widescreen"!==e&&(j.getStickySectionsWidescreen.forEach(function(e,t){e.trigger("jetStickySection:detach")}),t.initWidescreen=!1),t.initDesktop&&"desktop"!==e&&(j.getStickySectionsDesktop.forEach(function(e,t){e.trigger("jetStickySection:detach")}),t.initDesktop=!1),t.initLaptop&&"laptop"!==e&&(j.getStickySectionsLaptop.forEach(function(e,t){e.trigger("jetStickySection:detach")}),t.initLaptop=!1),t.initTabletExtra&&"tablet_extra"!==e&&(j.getStickySectionsTabletExtra.forEach(function(e,t){e.trigger("jetStickySection:detach")}),t.initTabletExtra=!1),t.initTablet&&"tablet"!==e&&(j.getStickySectionsTablet.forEach(function(e,t){e.trigger("jetStickySection:detach")}),t.initTablet=!1),t.initMobiletExtra&&"mobile_extra"!==e&&(j.getStickySectionsMobiletExtra.forEach(function(e,t){e.trigger("jetStickySection:detach")}),t.initMobiletExtra=!1),t.initMobile&&"mobile"!==e&&(j.getStickySectionsMobile.forEach(function(e,t){e.trigger("jetStickySection:detach")}),t.initMobile=!1)}function n(n){n.forEach(function(e,t){n[t+1]?s.stopper=n[t+1]:s.stopper="",(t=e).jetStickySection(s).on("jetStickySection:stick",function(e){v(e.target).addClass(i),setTimeout(function(){v(e.target).removeClass(i)},3e3)}).on("jetStickySection:unstick",function(e){v(e.target).addClass(o),setTimeout(function(){v(e.target).removeClass(o)},3e3)}),t.trigger("jetStickySection:activated")})}"widescreen"!==e||this.initWidescreen||(t(e,this),j.getStickySectionsWidescreen[0]&&(n(j.getStickySectionsWidescreen),this.initWidescreen=!0)),"desktop"!==e||this.initDesktop||(t(e,this),j.getStickySectionsDesktop[0]&&(n(j.getStickySectionsDesktop),this.initDesktop=!0)),"laptop"!==e||this.initLaptop||(t(e,this),j.getStickySectionsLaptop[0]&&(n(j.getStickySectionsLaptop),this.initLaptop=!0)),"tablet_extra"!==e||this.initTabletExtra||(t(e,this),j.getStickySectionsTabletExtra[0]&&(n(j.getStickySectionsTabletExtra),this.initTabletExtra=!0)),"tablet"!==e||this.initTablet||(t(e,this),j.getStickySectionsTablet[0]&&(n(j.getStickySectionsTablet),this.initTablet=!0)),"mobile_extra"!==e||this.initMobileExtra||(t(e,this),j.getStickySectionsMobileExtra[0]&&(n(j.getStickySectionsMobileExtra),this.initMobileExtra=!0)),"mobile"!==e||this.initMobile||(t(e,this),j.getStickySectionsMobile[0]&&(n(j.getStickySectionsMobile),this.initMobile=!0))}}).init()},getStickySectionsWidescreen:[],getStickySectionsDesktop:[],getStickySectionsLaptop:[],getStickySectionsTabletExtra:[],getStickySectionsTablet:[],getStickySectionsMobileExtra:[],getStickySectionsMobile:[],setStickySection:function(t){({target:t,isEditMode:Boolean(b.isEditMode()),init:function(){var e;this.isEditMode||"yes"===this.getSectionSetting("jet_sticky_section")&&(e=this.getSectionSetting("jet_sticky_section_visibility")||[])[0]&&(-1!==e.indexOf("widescreen")&&j.getStickySectionsWidescreen.push(t),-1!==e.indexOf("desktop")&&j.getStickySectionsDesktop.push(t),-1!==e.indexOf("laptop")&&j.getStickySectionsLaptop.push(t),-1!==e.indexOf("tablet_extra")&&j.getStickySectionsTabletExtra.push(t),-1!==e.indexOf("tablet")&&j.getStickySectionsTablet.push(t),-1!==e.indexOf("mobile_extra")&&j.getStickySectionsMobileExtra.push(t),-1!==e.indexOf("mobile"))&&j.getStickySectionsMobile.push(t)},getSectionSetting:function(e){var t={};if(Boolean(b.isEditMode())){if(!b.hasOwnProperty("config"))return;if(!b.config.hasOwnProperty("elements"))return;if(!b.config.elements.hasOwnProperty("data"))return;var n=this.target.data("model-cid"),n=b.config.elements.data[n];if(!n)return;if(!n.hasOwnProperty("attributes"))return;t=n.attributes||{}}else t=this.target.data("settings")||{};if(t[e])return t[e]}}).init()},isEditMode:function(){return Boolean(b.isEditMode())},elementorFrontendInit:function(e){e.find("[data-element_type]").each(function(){var t=v(this),e=t.data("element_type");if(e)try{"widget"===e&&(e=t.data("widget_type"),window.elementorFrontend.hooks.doAction("frontend/element_ready/widget",t,v)),window.elementorFrontend.hooks.doAction("frontend/element_ready/global",t,v),window.elementorFrontend.hooks.doAction("frontend/element_ready/"+e,t,v)}catch(e){return console.log(e),t.remove(),!1}})},togglePasswordVisibility:function(e){var t=v("input:password",e);v(".password-visibility__icon",e).on("click",function(){"password"===t.attr("type")?(t.attr("type","text"),v(".password-visibility__icon--show",e).removeClass("show"),v(".password-visibility__icon--hide",e).addClass("show")):(t.attr("type","password"),v(".password-visibility__icon--show",e).addClass("show"),v(".password-visibility__icon--hide",e).removeClass("show"))})},strongPasswordValidation:function(e,t){var o=v("input.pw-validation",e),n=v(".jet-reset",e),i=v(".jet-password-requirements",e),s=v(".jet-password-requirements-length",i),a=v(".jet-password-requirements-lowercase",i),r=v(".jet-password-requirements-uppercase",i),c=v(".jet-password-requirements-number",i),l=v(".jet-password-requirements-special",i),d=n.data("option")||{};function u(){var e,t=o.val(),n=0,i={};return 0<s.length&&((e=t.length>=d)?s.addClass("success").removeClass("error"):s.removeClass("success"),i.length=e),0<a.length&&((e=/[a-z]/.test(t))?a.addClass("success").removeClass("error"):a.removeClass("success"),i.lowercase=e),0<r.length&&((e=/[A-Z]/.test(t))?r.addClass("success").removeClass("error"):r.removeClass("success"),i.uppercase=e),0<c.length&&((e=/[0-9]/.test(t))?c.addClass("success").removeClass("error"):c.removeClass("success"),i.number=e),0<l.length&&((e=/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(t))?l.addClass("success").removeClass("error"):l.removeClass("success"),i.special=e),Object.keys(i).forEach(function(e){!1===i[e]&&n++}),!(0<n)}o.on("input",u),o.keydown(function(e){if(13==e.keyCode&&!1===u())return e.preventDefault(),!1}),t.on("click touchend",function(e){if(!1===u())return e.preventDefault(),i.find("li:not(.success)").each(function(){v(this).addClass("error")}),!1})}},w=(v(window).on("elementor/frontend/init",j.init),{debounce:function(t,n){var i;return function(e){i&&clearTimeout(i),i=setTimeout(function(){n.call(this,e),i=null},t)}},googleRecaptcha:function(t){"true"===window.jetBlocksData.recaptchaConfig.enable&&""!=window.jetBlocksData.recaptchaConfig.site_key&&""!=window.jetBlocksData.recaptchaConfig.secret_key&&window.grecaptcha.ready(function(){grecaptcha.execute(window.jetBlocksData.recaptchaConfig.site_key,{action:"submit"}).then(function(e){t.append('<input type="hidden" name="token" value="'+e+'">'),t.append('<input type="hidden" name="action" value="submit">')})})}})}(jQuery,window.elementorFrontend,window.elementor,window.JetHamburgerPanelSettings);