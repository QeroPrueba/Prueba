!function(){const t=()=>{const t=wc_additional_variation_images_local.ajax_url.toString().replace("%%endpoint%%","wc_additional_variation_images_get_images"),i=wc_additional_variation_images_local.ajaxImageSwapNonce,n={},o=function(t){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];jQuery("form.variations_form").trigger(t,i)},a=function(n){return jQuery.ajax({type:"POST",data:{security:i,variation_id:n},url:t})},e=function(){o("wc_additional_variation_images_frontend_lightbox"),"function"==typeof jQuery.fn.prettyPhoto&&jQuery(wc_additional_variation_images_local.lightbox_images).prettyPhoto({hook:"data-rel",social_tools:!1,theme:"pp_woocommerce",horizontal_padding:20,opacity:.8,deeplinking:!1}),o("wc_additional_variation_images_frontend_lightbox_done")},r={message:null,overlayCSS:{background:"#fff",opacity:.6}},c=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1?arguments[1]:void 0;const o=jQuery.Deferred(i);if(n[t]&&"resolved"===n[t].promise.state())return o.resolve(t,n[t].result);if(!n[t]||"rejected"===n[t].promise.state()){const i=a(t);n[t]={promise:i,result:""}}return jQuery.when(n[t].promise).then((function(i){n[t].result=i.main_images||"",o.resolve(t,n[t].result)}),(function(){o.reject()})),o.promise()},l=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1?arguments[1]:void 0;const n=jQuery(i).closest(".product");if(0===n.length)return;const o=n.find(wc_additional_variation_images_local.main_images_class),a=n.find(wc_additional_variation_images_local.main_images_class+":not(.woocommerce-product-gallery--wcavi)"),l=function(t){const i=n.find(wc_additional_variation_images_local.main_images_class+":visible");(t.is(":hidden")||i.length>1)&&(i.hide(),t.show())},d=function(t){return n.find(".woocommerce-product-gallery--variation-"+t)},_=function(t){return d(t).length>0},s=function(t){const i=d(t);i.length&&(i.wc_product_gallery(),e())},u=function(t,i){o.first().after(i),s(t)};if(n.data("currentVariationId",t),0===t)return l(a);c(t,(function(){o.block(r)})).then((function(t,i){_(t)||u(t,i),t===n.data("currentVariationId")&&l(d(t))})).always((function(){o.unblock()}))};jQuery("form.variations_form").on("reset_data",(function(t,i){l(0,t.target)})).on("show_variation",(function(t,i){o("wc_additional_variation_images_frontend_before_show_variation"),l(parseInt(i.variation_id,10),t.target)})),o("wc_additional_variation_images_frontend_init")};"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?t():document.addEventListener("DOMContentLoaded",t)}();