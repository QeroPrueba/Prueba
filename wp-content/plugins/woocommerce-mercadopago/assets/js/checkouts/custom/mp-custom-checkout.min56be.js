var cardForm,hasToken=!1,mercado_pago_submit=!1,triggeredPaymentMethodSelectedEvent=!1,cardFormMounted=!1,threedsTarget="mp_custom_checkout_security_fields_client",mpCheckoutForm=document.querySelector("form[name=checkout]"),mpFormId="checkout";function mercadoPagoFormHandler(){if(document.querySelector("form[id=order_review]")){document.querySelector(".mp-checkout-custom-container").querySelectorAll("input-helper").forEach((e=>{"none"!==e.querySelector("div").style.display&&removeBlockOverlay()}))}return setMercadoPagoSessionId(),!!mercado_pago_submit||("wallet_button"===jQuery("#mp_checkout_type").val()||(jQuery("#mp_checkout_type").val("custom"),!(!CheckoutPage.validateInputsCreateToken()||hasToken)&&createToken()))}function createToken(){return cardForm.createCardToken().then((e=>{if(!e.token)throw new Error("cardToken is empty");if(!hasToken)return document.querySelector("#cardTokenId").value=e.token,mercado_pago_submit=!0,hasToken=!0,"order_review"===mpFormId?(handle3dsPayOrderFormSubmission(),!1):void jQuery("form.checkout").submit()})).catch((e=>{console.warn("Token creation error: ",e)})),!1}function initCardForm(e=getAmount()){var o=new MercadoPago(wc_mercadopago_custom_checkout_params.public_key);return new Promise(((t,r)=>{cardForm=o.cardForm({amount:e,iframe:!0,form:{id:mpFormId,cardNumber:{id:"form-checkout__cardNumber-container",placeholder:"0000 0000 0000 0000",style:{"font-size":"16px",height:"40px",padding:"14px"}},cardholderName:{id:"form-checkout__cardholderName",placeholder:"Ex.: María López"},cardExpirationDate:{id:"form-checkout__expirationDate-container",placeholder:wc_mercadopago_custom_checkout_params.placeholders.cardExpirationDate,mode:"short",style:{"font-size":"16px",height:"40px",padding:"14px"}},securityCode:{id:"form-checkout__securityCode-container",placeholder:"123",style:{"font-size":"16px",height:"40px",padding:"14px"}},identificationType:{id:"form-checkout__identificationType"},identificationNumber:{id:"form-checkout__identificationNumber"},issuer:{id:"form-checkout__issuer",placeholder:wc_mercadopago_custom_checkout_params.placeholders.issuer},installments:{id:"form-checkout__installments",placeholder:wc_mercadopago_custom_checkout_params.placeholders.installments}},callbacks:{onReady:()=>{removeLoadSpinner(),t()},onFormMounted:function(e){cardFormMounted=!0,e&&console.log("Callback to handle the error: creating the CardForm",e)},onFormUnmounted:function(e){cardFormMounted=!1,CheckoutPage.clearInputs(),e&&console.log("Callback to handle the error: unmounting the CardForm",e)},onInstallmentsReceived:(e,o)=>{e?console.warn("Installments handling error: ",e):CheckoutPage.setChangeEventOnInstallments(CheckoutPage.getCountry(),o)},onCardTokenReceived:e=>{e&&console.warn("Token handling error: ",e)},onPaymentMethodsReceived:(e,o)=>{try{if(o){CheckoutPage.setValue("paymentMethodId",o[0].id),CheckoutPage.setCvvHint(o[0].settings[0].security_code),CheckoutPage.changeCvvPlaceHolder(o[0].settings[0].security_code.length),CheckoutPage.clearInputs(),CheckoutPage.setDisplayOfError("fcCardNumberContainer","remove","mp-error"),CheckoutPage.setDisplayOfInputHelper("mp-card-number","none"),CheckoutPage.setImageCard(o[0].secure_thumbnail||o[0].thumbnail),CheckoutPage.installment_amount(o[0].payment_type_id);const e=CheckoutPage.loadAdditionalInfo(o[0].additional_info_needed);CheckoutPage.additionalInfoHandler(e)}else CheckoutPage.setDisplayOfError("fcCardNumberContainer","add","mp-error"),CheckoutPage.setDisplayOfInputHelper("mp-card-number","flex")}catch(e){CheckoutPage.setDisplayOfError("fcCardNumberContainer","add","mp-error"),CheckoutPage.setDisplayOfInputHelper("mp-card-number","flex")}},onSubmit:function(e){e.preventDefault()},onValidityChange:function(e,o){if(e){let t=CheckoutPage.getHelperMessage(o),r=wc_mercadopago_custom_checkout_params.input_helper_message[o][e[0].code];t.innerHTML=r||wc_mercadopago_custom_checkout_params.input_helper_message[o].invalid_length,"cardNumber"===o&&"invalid_length"!==e[0].code&&(CheckoutPage.setBackground("fcCardNumberContainer","no-repeat #fff"),CheckoutPage.removeAdditionFields(),CheckoutPage.clearInputs());let a=CheckoutPage.findContainerField(o);return CheckoutPage.setDisplayOfError(a,"add","mp-error"),CheckoutPage.setDisplayOfInputHelper(CheckoutPage.inputHelperName(o),"flex")}let t=CheckoutPage.findContainerField(o);return CheckoutPage.setDisplayOfError(t,"removed","mp-error"),CheckoutPage.setDisplayOfInputHelper(CheckoutPage.inputHelperName(o),"none")},onError:function(e){e.forEach((e=>(removeBlockOverlay(),e.message.includes("timed out")?r(e):e.message.includes("cardNumber")?(CheckoutPage.setDisplayOfError("fcCardNumberContainer","add","mp-error"),CheckoutPage.setDisplayOfInputHelper("mp-card-number","flex")):e.message.includes("cardholderName")?(CheckoutPage.setDisplayOfError("fcCardholderName","add","mp-error"),CheckoutPage.setDisplayOfInputHelper("mp-card-holder-name","flex")):e.message.includes("expirationMonth")||e.message.includes("expirationYear")?(CheckoutPage.setDisplayOfError("fcCardExpirationDateContainer","add","mp-error"),CheckoutPage.setDisplayOfInputHelper("mp-expiration-date","flex")):e.message.includes("securityCode")?(CheckoutPage.setDisplayOfError("fcSecurityNumberContainer","add","mp-error"),CheckoutPage.setDisplayOfInputHelper("mp-security-code","flex")):e.message.includes("identificationNumber")?(CheckoutPage.setDisplayOfError("fcIdentificationNumberContainer","add","mp-error"),CheckoutPage.setDisplayOfInputHelper("mp-doc-number","flex")):r(e))))}}})}))}function getAmount(){const e=parseFloat(document.getElementById("mp-amount").value.replace(",","."));return String(e)}function setMercadoPagoSessionId(){try{document.querySelector("#mpCardSessionId").value=MP_DEVICE_SESSION_ID}catch(e){console.warn(e)}}function removeBlockOverlay(){jQuery("form#order_review").length>0&&jQuery(".blockOverlay").css("display","none")}function cardFormLoad(){const e=document.getElementById("payment_method_woo-mercado-pago-custom");e&&e.checked?setTimeout((()=>{cardFormMounted||(createLoadSpinner(),handleCardFormLoad())}),2500):cardFormMounted&&cardForm.unmount()}function setCardFormLoadInterval(){var e=setInterval((()=>{const o=document.getElementById("payment_method_woo-mercado-pago-custom"),t=document.getElementById("form-checkout__cardNumber-container");o&&o.checked?t&&t.childElementCount>0?clearInterval(e):cardFormMounted&&(cardForm.unmount(),cardFormLoad()):clearInterval(e)}),1e3)}function handleCardFormLoad(){initCardForm().then((()=>{sendMetric("MP_CARDFORM_SUCCESS","Security fields loaded",threedsTarget)})).catch((e=>{const o=handleCardFormErrors(e);sendMetric("MP_CARDFORM_ERROR",o,threedsTarget),console.error("Mercado Pago cardForm error: ",o)}))}function handleCardFormErrors(e){if(e.length){const o=[];return e.forEach((e=>{o.push(e.description||e.message)})),o.join(",")}return e.description||e.message}function createLoadSpinner(){document.querySelector(".mp-checkout-custom-container").style.display="none",document.querySelector(".mp-checkout-custom-load").style.display="flex"}function removeLoadSpinner(){document.querySelector(".mp-checkout-custom-container").style.display="block",document.querySelector(".mp-checkout-custom-load").style.display="none"}function removeLoadSpinner3ds(){var e=document.getElementById("mp-loading-container-3ds");e&&e.remove()}function addLoadSpinner3dsSubmit(){document.getElementById("mp-3ds-modal-content").innerHTML='<div id="mp-loading-container-3ds">   <div>     <div class="mp-spinner-3ds"></div>       <div class="mp-loading-text-3ds">         <p>'+wc_mercadopago_custom_checkout_params.threeDsText.title_loading_response+"          </p>       </div>   </div> <div>"}function removeModal3ds(){CheckoutPage.clearInputs(),document.getElementById("mp-3ds-modal-container").remove()}function threeDSHandler(e,o){try{if(null==e||null==o)return removeModal3ds(),sendMetric("MP_THREE_DS_ERROR","3DS URL or CRED not set",threedsTarget),void console.log("Invalid parameters for 3ds");var t=document.createElement("div");t.className="mp-card-info",t.innerHTML='<div class="mp-alert-color-success"></div><div class="mp-card-body-3ds"><div class="mp-icon-badge-info"></div><div><span class="mp-text-subtitle">'+wc_mercadopago_custom_checkout_params.threeDsText.title_frame+"</span></div></div>";var r=document.getElementById("mp-3ds-modal-content"),a=document.createElement("iframe");a.name="mp-3ds-frame",a.id="mp-3ds-frame",a.onload=()=>removeLoadSpinner3ds(),document.getElementById("mp-3ds-title").innerText=wc_mercadopago_custom_checkout_params.threeDsText.tooltip_frame,r.appendChild(t),r.appendChild(a);var n=a.contentWindow.document,c=n.createElement("form");c.name="mp-3ds-frame",c.className="mp-modal",c.setAttribute("target","mp-3ds-frame"),c.setAttribute("method","post"),c.setAttribute("action",e);var d=n.createElement("input");d.setAttribute("type","hidden"),d.setAttribute("name","creq"),d.setAttribute("value",o),c.appendChild(d),a.appendChild(c),c.submit()}catch(e){console.log(e),sendMetric("MP_THREE_DS_ERROR","3DS Loading error: "+e,threedsTarget),alert("Error doing Challenge, try again later.")}}function load3DSFlow(e){var o=document.createElement("div");o.setAttribute("id","mp-3ds-modal-container"),o.className="mp-3ds-modal";var t=document.createElement("div");t.id="mp-3ds-modal-content",t.innerHTML='<div><div id="mp-modal-3ds-title"><span id="mp-3ds-title"></span><span id="mp-3ds-modal-close" >&times;</span></div><div id="mp-loading-container-3ds">   <div>     <div class="mp-spinner-3ds"></div>       <div class="mp-loading-text-3ds">         <p>'+wc_mercadopago_custom_checkout_params.threeDsText.title_loading+"<br>           ("+document.getElementById("paymentMethodId").value+"****"+e+") "+wc_mercadopago_custom_checkout_params.threeDsText.title_loading2+'          </p>       </div>       <p class="mp-normal-text-3ds">'+wc_mercadopago_custom_checkout_params.threeDsText.text_loading+"</p>   </div> <div></div>",o.appendChild(t),document.body.appendChild(o),document.querySelector("#mp-3ds-modal-close").addEventListener("click",(function(){setDisplayOfErrorCheckout(wc_mercadopago_custom_checkout_params.threeDsText.message_close),removeModal3ds()})),jQuery.post(woocommerce_params.wc_ajax_url.replace("%%endpoint%%","mp_get_3ds_from_session")).done((function(e){e.success?threeDSHandler(e.data.data["3ds_url"],e.data.data["3ds_creq"]):(console.error("Error POST:",e),window.dispatchEvent(new CustomEvent("completed_3ds",{detail:{error:!0}})),removeModal3ds())})).fail((function(e,o,t){console.error("Failed to make POST:",o,t),window.dispatchEvent(new CustomEvent("completed_3ds",{detail:{error:!0}})),removeModal3ds()}))}function redirectAfter3dsChallenge(){jQuery.post(woocommerce_params.wc_ajax_url.replace("%%endpoint%%","mp_redirect_after_3ds_challenge")).done((function(e){e.data.redirect?(window.dispatchEvent(new CustomEvent("completed_3ds",{detail:{error:!1}})),sendMetric("MP_THREE_DS_SUCCESS","3DS challenge complete",threedsTarget),removeModal3ds(),window.location.href=e.data.redirect):(window.dispatchEvent(new CustomEvent("completed_3ds",{detail:{error:e.data.data.error}})),setDisplayOfErrorCheckout(e.data.data.error),removeModal3ds())}))}function handle3dsPayOrderFormSubmission(){var e=jQuery("#order_review").serialize();jQuery.post("#",e).done((function(e){e.three_ds_flow?load3DSFlow(e.last_four_digits):(e.redirect&&(window.location.href=e.redirect),window.location.reload())})).error((function(){window.location.reload()}))}function setDisplayOfErrorCheckout(e){if(sendMetric("MP_THREE_DS_ERROR",e,threedsTarget),"blocks_checkout_form"!==window.mpFormId){removeElementsByClass("woocommerce-NoticeGroup-checkout");var o=document.createElement("div");o.className="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout",o.innerHTML='<ul class="woocommerce-error" role="alert">'+"<li>".concat(e).concat("<li>")+"</ul>",mpCheckoutForm.prepend(o),window.scrollTo(0,0)}}function removeElementsByClass(e){const o=document.getElementsByClassName(e);for(;o.length>0;)o[0].parentNode.removeChild(o[0])}function sendMetric(e,o,t){const r={name:e,message:o,target:t,plugin:{version:wc_mercadopago_custom_checkout_params.plugin_version},platform:{name:"woocommerce",uri:window.location.href,version:wc_mercadopago_custom_checkout_params.platform_version,location:`${wc_mercadopago_custom_checkout_params.location}_${wc_mercadopago_custom_checkout_params.theme}`}};navigator.sendBeacon("https://api.mercadopago.com/v1/plugins/melidata/errors",JSON.stringify(r))}mpCheckoutForm?mpCheckoutForm.id=mpFormId:mpFormId="order_review",jQuery("form.checkout").on("checkout_place_order_woo-mercado-pago-custom",mercadoPagoFormHandler),jQuery("body").on("payment_method_selected",(function(){triggeredPaymentMethodSelectedEvent||cardFormLoad()})),jQuery("form#order_review").submit((function(e){const o=document.getElementById("payment_method_woo-mercado-pago-custom");if(o&&o.checked)return e.preventDefault(),mercadoPagoFormHandler();cardFormLoad()})),jQuery(document.body).on("checkout_error",(()=>{hasToken=!1,mercado_pago_submit=!1})),jQuery(document).on("updated_checkout",(function(){const e=document.getElementById("payment_method_woo-mercado-pago-custom");if(e&&e.checked)return cardFormMounted&&cardForm.unmount(),void handleCardFormLoad()})),jQuery(document).ready((()=>{setCardFormLoadInterval()})),triggeredPaymentMethodSelectedEvent||jQuery("body").trigger("payment_method_selected"),window.addEventListener("message",(e=>{"COMPLETE"===e.data.status&&(sendMetric("MP_THREE_DS_SUCCESS","3DS iframe Closed",threedsTarget),document.getElementById("mp-3ds-modal-content").innerHTML="",addLoadSpinner3dsSubmit(),redirectAfter3dsChallenge())}));