const assetsUrl = str => 'https://ecovasos.com/qero/assets/site/' + str;
const newUnix = () => new Date().getTime();

const heightResumo = $('.container-resumo').css('height');
const posicaoResumo = parseInt(heightResumo.replace('px', '')) + 40;

const id_carrinho = $('input#id_carrinho').val() || null;
const id_arte = $('input#id_arte').val() || null;

const purchaseDataInitialValues = {
    id_cor: null,
    toques: null,
    id_arte: null,
    id_tipo: null,
    id_medida: null,
    id_produto: null,
    quantidade: 0,
    id_carrinho: null,
    id_cor_tampa: null,
    id_tipo_tampa: null,
    id_medida_tampa: null,
    id_atendente: null,
    observacoes: null,
}

const purchaseData = { ...purchaseDataInitialValues }

const getSizeName = () => {
    const sizes = {
        '1': '360cc',
        '2': '500cc',
        '3': '750cc',
        '4': '290cc',
    }

    return sizes[purchaseData.id_medida] || ''
}

const prazosPorMedida = [
    { id_medida: 1, toques: 1, dias: 3 },
    { id_medida: 1, toques: 2, dias: 4 },
    { id_medida: 1, toques: 3, dias: 5 },
    { id_medida: 1, toques: 4, dias: 6 },

    { id_medida: 2, toques: 1, dias: 2 },
    { id_medida: 2, toques: 2, dias: 3 },
    { id_medida: 2, toques: 3, dias: 4 },
    { id_medida: 2, toques: 4, dias: 5 },

    { id_medida: 3, toques: 1, dias: 5 },
    { id_medida: 3, toques: 2, dias: 6 },
    { id_medida: 3, toques: 3, dias: 7 },
    { id_medida: 3, toques: 4, dias: 8 },

    { id_medida: 4, toques: 1, dias: 6 },
    { id_medida: 4, toques: 2, dias: 7 },
    { id_medida: 4, toques: 3, dias: 8 },
    { id_medida: 4, toques: 4, dias: 9 },
]

const prazosPorToquesEcovasos = [
    { toques: 1, dias: 5 },
    { toques: 2, dias: 13 },
    { toques: 3, dias: 15 },
    { toques: 4, dias: 18 },
]

const prazosPorToquesTermico = [
    { toques: 1, dias: 11 },
    { toques: 2, dias: 19 },
    { toques: 3, dias: 21 },
    { toques: 4, dias: 24 },
]

const divInfoPrazos = `
    <div class="info-prazo">
        <p></p>
    </div>
`;

// const prazosPorToquesTermico = [
//     { toques: 1, dias: 16 },
//     { toques: 2, dias: 20 },
//     { toques: 3, dias: 24 },
//     { toques: 4, dias: 28 },
// ]

document.addEventListener('DOMContentLoaded', () => {
    $('.slider').slick({
        dots: false,
        infinite: false,
        arrows: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: true
    });

    fillByParams();
});

$(document).on("keyup", ({ keyCode }) => keyCode == 27 && $("#loader").hide());

$('.tooltip').tooltip({
    content: function (callback) {
        const idx = parseInt($(this).prop('title')) - 1

        const textos = [
            ` Alto: 8,8cm <br> Peso: 22g <br> Parte superior del ecovaso: 6,8cm <br> Fondo del ecovaso: 5,2cm <br> Volumen: 232ml `,
            ` Alto: 11,7cm <br> Peso: 30g <br> Parte superior del ecovaso: 7,1cm <br> Fondo del ecovaso: 5,2cm <br> Volumen: 336ml `,
            ` Alto: 14cm  <br> Peso: 39g <br> Parte superior del ecovaso: 7,5cm <br> Fondo del ecovaso: 5,4cm <br> Volumen: 412ml `,
            ` Alto: 16cm  <br> Peso: 54g <br> Parte superior del ecovaso: 8,1cm <br> Fondo del ecovaso: 5,8cm <br> Volumen: 578ml `,
            ` <strong> Impresión HD sin límites de color</strong>. Diseños personalizados con fotos, degradados, logos, ilustraciones, textos y otros elementos en ilimitados colores. Tecnología de etiquetado en molde. Acabado brillante. `,
            ` Impresión en un color sólido. Diseño de ecovasos personalizados con logotipos, ilustraciones, textos y demás elementos vectorizados. No es posible incluir fotos. `,
            ` Impresión en dos colores sólido. Diseño de ecovasos personalizados con logotipos, ilustraciones, textos y demás elementos vectorizados. No es posible incluir fotos. `,
            ` Impresión en tres colores sólido. Diseño de ecovasos personalizados con logotipos, ilustraciones, textos y demás elementos vectorizados. No es posible incluir fotos. `,
            ` Impresión en cuatro colores sólido. Diseño de ecovasos personalizados con logotipos, ilustraciones, textos y demás elementos vectorizados. No es posible incluir fotos. `,
            ` <strong>Impresión HD sin límites de color</strong>. Diseños personalizados con fotos, degradados, logotipos, ilustraciones, textos y otros elementos en ilimitados colores.<strong>Información personalizada de cada Ecovaso®</strong>, como nombre, apellido, cargo, empresa, nacionalidad y foto. `,
            ` Material translúcido, permite la visualización de líquido dentro del ecovaso. `,
            ` Material translúcido de colores vivos, que brillan al exponerse a la luz negra. `,
            ` Material opaco, no permite la visualización del líquido dentro del ecovaso. `,
            ` Porta Copo Eco® Personalizado com gancho, permite levar o Copo Eco® pendurado na bolsa, mochila ou onde o cliente quiser. `,
            ` Porta Copo Eco® Personalizado. Permite levar o Copo Eco® pendurado no pescoço. `,
            ` Alto: 12,5cm  <br> Peso: 60g <br> Boca da caneca: 8,0cm <br> Fondo del ecovaso: 8,0cm <br> Volumen: 500ml `,
        ]

        const texto = textos[idx] || '';

        callback(texto)
    },
    tooltipClass: 'tooltip-padrao'
});

$("#choose-type .tipo-produto").click(function () {
    zerar();

    $("#choose-type .tipo-produto").removeClass('active');
    $(".tipo-produto .selected-div").remove();

    purchaseData.id_produto = $(this).data('id_produto');

    if (purchaseData.id_produto == 5) {
        purchaseData.toques = 99

        $('.menor2500').hide()
        $('.a-partir').hide();
    } else {
        $('.menor2500').show()
        $('.a-partir').show();
    }

    $(".sum-val-copo").show();

    const prazos = prazosPorMedida;

    $('div.tamanho div.info-prazo').remove();

    if(purchaseData.id_produto == 1) {
        prazos.forEach(({ id_medida, toques, dias }) => {
            if(toques == 1) {
                $(`div.tamanho[data-id_medida="${id_medida}"]`).append(divInfoPrazos);
                $(`div.tamanho[data-id_medida="${id_medida}"] div.info-prazo p`).html(`Desde ${dias} días hábiles`);
            }
        });
    }

    console.log('teste 2 ');
    scrollNextStep('#tamanhos');
    setResumeInfos('product-type')
});

$("#tamanhos .tamanho").click(function () {
    zerar(true);

    $("#tamanhos .tamanho").removeClass('active');
    $(".tamanho .selected-div").remove();

    const { id_medida } = $(this).data();

    purchaseData.id_medida = id_medida;

    if (id_medida == 4 && purchaseData.id_produto != 5) {
        purchaseData.id_produto = 2;
    } else if (purchaseData.id_produto != 5) {
        purchaseData.id_produto = 1;
    }

    $(".cover-colors").hide();

    const prazos = prazosPorMedida;

    $('div.toque div.info-prazo').remove();

    prazos.forEach(({ id_medida, toques, dias }) => {
        if(id_medida == purchaseData.id_medida) {
            $(`div.toque[data-toque="${toques}"]`).append(divInfoPrazos);
            $(`div.toque[data-toque="${toques}"] div.info-prazo p`).html(`Desde ${dias} días hábiles`);
        }
    });

    // const prazos = id_medida == 4 ? prazosPorToquesTermico : prazosPorToquesEcovasos;

    // prazos.forEach(({ dias, toques }) => {
    //     $(`div[data-toque="${toques}"] div.info-prazo p`).html(`Desde ${dias} días hábiles`);
    //     $(`div[data-toque="${toques}"]`).attr('data-prazo', dias);
    // });

    $(".opcao.cor").show();
    $(".opcao-cores").show();

    setResumeInfos('product-size');

    let nextCard = '#toques'

    if (id_medida == 4 && purchaseData.id_produto == 5) {
        nextCard = '#cores-termico'
    } else if (purchaseData.id_produto == 5) {
        nextCard = '#cores'
    }

    scrollNextStep(nextCard);

    if (id_medida == 1) { // 360cc
        $(".opcao.cor[data-id_tipo='2']").hide();

        [2, 3, 4, 7, 9].forEach(id_cor => $(`.opcao.cor[data-id_cor='${id_cor}']`).show());

        $("#com-tampa-preta").show();
    } else if (id_medida == 2) { // 500cc
        $(".opcao.cor[data-id_tipo='2']").hide();

        [1, 3, 6, 7, 8].forEach(id_cor => $(`.opcao.cor[data-id_cor='${id_cor}']`).show());
    } else if (id_medida == 3) { // 750cc
        $(".opcao.cor[data-id_tipo='2']").hide();
        $(".opcao.cor[data-id_cor='3']").show();

        [1, 2, 6, 8, 11].forEach(id_cor => $(`.opcao.cor[data-id_cor='${id_cor}']`).hide());
    }

    $(".resumo-tamanho").html(getSizeName());

    if (purchaseData.id_produto == 5) return;

    const id_produto = purchaseData.id_medida == 4 ? 2 : 1

    $.ajax({
        url: `https://ecovasos.com/qero/valoresTamanho/${id_medida}/25?id_produto=${id_produto}&v=${newUnix()}`,
        context: document.body,
        success: result => {
            $("span.valor-s1").html(number_format(result.s1, 2, '.', ''));
            $("span.valor-s2").html(number_format(result.s2, 2, '.', ''));
            $("span.valor-s3").html(number_format(result.s3, 2, '.', ''));
            $("span.valor-s4").html(number_format(result.s4, 2, '.', ''));
        }
    });
});

$("#toques .toque").click(function () {
    $("#toques .toque").removeClass('active');
    $(".toque .selected-div").remove();
    $('.exemplo-tampa').hide();

    purchaseData.toques = $(this).data('toque');

    const { toques, id_medida } = purchaseData;

    $('.exemplo-impressoes-resumo')
        .attr('src', assetsUrl(`images/impressoes/${getSizeName()}/${toques}.png`))
        .show();

    if (id_medida == 4) {
        $("#cores").slideUp();
        scrollNextStep('#cores-termico')
    } else {
        scrollNextStep('#cores')
    }

    $(".resumo-toques").html($(this).data('nome'));
});

$("#cores .cor").click(function () {
    $(".colors-card .selected-div").remove();
    $("#cores .cor").removeClass('active');
    $(".colors-card .card-imgs").css('opacity', '0.5');
    $(`.colors-cups`).hide();
    $(`.colors-banner`).fadeIn();

    const { classe_cor, id_tipo, id_cor, nome: nome_cor } = $(this).data();

    purchaseData.id_tipo = id_tipo;
    purchaseData.id_cor = id_cor;

    $(".resumo-cor").html(nome_cor + ' <br />');
    $(`.color-name`).empty();
    $(`.cores-${classe_cor}`).html($(this).attr('title'));

    const nextCard = purchaseData.id_produto == 5 ? '#div-grandes-quantidades' : '#div-quantidade';
    scrollNextStep(nextCard);
    setResumeInfos('product-color')

    $(`.colors-banner[data-classe_cor='${classe_cor}']`).hide().parent().css('opacity', '1');
    $(`.colors-cups[data-classe_cor='${classe_cor}']`).fadeIn().attr('src', assetsUrl(`images/ecovasos/${id_cor}.png`));
});

$("#cores-termico .cor").click(function () {
    $("#cores-termico .cor").removeClass('active');
    $("#cores-termico .selected-div").remove();

    const { id_tipo, id_cor, classe_cor, nome: nome_cor_copo } = $(this).data();

    purchaseData.id_tipo = id_tipo;
    purchaseData.id_cor = id_cor;

    $(`.colors-banner[data-classe_cor='${classe_cor}']`).hide();
    $(`.colors-cups[data-classe_cor='${classe_cor}']`).fadeIn().attr('src', assetsUrl(`images/ecovasos/termicos/${id_cor}.png`));

    $(".resumo-cor").html(nome_cor_copo);

    $('#cor-tampa').css('display') == 'none' && $('.exemplo-tampa-resumo')
        .attr('src', assetsUrl(`images/ecovasos/tampas/${id_cor}.png`))
        .css({ width: 80, height: 'auto', top: 18 });

    scrollNextStep('#cor-tampa')
    setResumeInfos('product-color')
});

$("#cor-tampa .cor").click(function () {
    $("#cor-tampa .cor").removeClass('active');
    $("#cor-tampa .selected-div").remove();

    const { nome: nome_cor_tampa, id_cor, id_tipo, classe_cor } = $(this).data();

    purchaseData.id_cor_tampa = id_cor;
    purchaseData.id_tipo_tampa = id_tipo;
    purchaseData.id_medida_tampa = purchaseData.id_medida;

    $(`.colors-banner[data-classe_cor='${classe_cor}']`).hide();
    $(`.colors-tampa[data-classe_cor='${classe_cor}']`).fadeIn().attr('src', assetsUrl(`images/ecovasos/tampas/${id_cor}.png`));

    $('.exemplo-tampa-resumo')
        .attr('src', assetsUrl(`images/ecovasos/tampas/${id_cor}.png`))
        .css({ width: 80, height: 'auto', top: 18 });

    $('.resumo-tampa').html(` + tapa ${nome_cor_tampa}`).show();

    const nextCard = purchaseData.id_produto == 5 ? '#div-grandes-quantidades' : '#div-quantidade';
    scrollNextStep(nextCard);
});

$("div.custom-select").click(({ currentTarget }) => {
    $('.custom-select').css({ 'z-index': 2 })
    $('.custom-select .inside-select').hide()

    $(currentTarget).css({ 'z-index': 3 })
    $(currentTarget).children('.inside-select').show()
})

$("#select-quantidade .option-select").click(function () {
    const quantidade = $(this).data('value');

    const isGrandesQuantidades = quantidade > 2000

    $("#select-quantidade .changed-label").html(quantidade + ' und');
    $('#select-quantidade .inside-select').fadeOut();

    if (isGrandesQuantidades) {
        scrollNextStep('#div-grandes-quantidades')

        $("#select-quantidade .changed-label").html('+ 2000 unidades');
    } else {
        purchaseData.quantidade = quantidade;

        $("#select-quantidade .changed-label").html(quantidade + ' und');
        $('.unidades-resumo').html(quantidade + ' unidades');
        $('div.up-resumo').css({ border: 'unset', 'border-radius': 'unset' });
        $('.shadow-background').fadeIn(200);
        $('.arrow-up').addClass('arrow-down');

        calculaValor();

        isCotacao() && scrollNextStep('#div-atendentes');

        $('.container-resumo').addClass('aparece').css('top', `calc(100% - ${posicaoResumo}px)`);
    }

    setTimeout(() => $('.custom-select').css({ 'z-index': 2 }), 555);

    (isGrandesQuantidades)
        ? $('.around-ul').hide()
        : $('.around-ul').show();
})

$("#select-grandes-quantidades .option-select").click(function () {
    const quantidade = $(this).data('value');

    purchaseData.quantidade = quantidade;

    $("#select-grandes-quantidades .changed-label").html(quantidade + ' und');
    $('.unidades-resumo').html(quantidade + ' unidades');

    isCotacao() && scrollNextStep('#div-atendentes');

    $('#select-grandes-quantidades .inside-select').fadeOut();
    $('.container-resumo').addClass('aparece').css('top', `calc(100% - ${posicaoResumo}px)`);

    setTimeout(() => $('.custom-select').css({ 'z-index': 2 }), 555);

    $('div.up-resumo').css({ border: 'unset', 'border-radius': 'unset' });
    $('.shadow-background').fadeIn(200);
    $('.arrow-up').addClass('arrow-down');

    quantidade && $('button.continuar').prop('disabled', false);
})

$("#select-atendentes .option-select").click(function() {
    const { value, label } = $(this).data();

    purchaseData.id_atendente = value;

    $("#select-atendentes .changed-label").html(label);
    $('#select-atendentes .inside-select').fadeOut();

    scrollNextStep('#div-observacoes');
})

$("#observacoes").change(function() {
    const value = $(this).val() || null;

    purchaseData.observacoes = value;
})

$('div.up-resumo').click(() => {
    const containerResumo = $('.container-resumo');

    if (containerResumo.hasClass('aparece')) {
        containerResumo
            .removeAttr('style')
            .removeClass('aparece');

        $('.page-compra').width() <= 1000 && $('.shadow-background').fadeOut(200);
        $('.arrow-up').removeClass('arrow-down');

        return false;
    }

    containerResumo
        .css('top', `calc(100% - ${posicaoResumo.toString()}px)`)
        .addClass('aparece');

    $('div.up-resumo').css({ border: 'unset', 'border-radius': 'unset' });

    $('.shadow-background').fadeIn(200);
    $('.arrow-up').addClass('arrow-down');
})

$(".continuar").click(() => {
    $('.loader').show();

    if (!validateCupData()) {
        alert('Producto no disponible')
        window.location.reload()
        return;
    }
    const formData = new FormData();

    const { id_produto, toques, ...data } = purchaseData

    const isDigital = id_produto == 5;

    Object
        .keys(data)
        .forEach(key => data[key] && formData.append(key, data[key]))

    let idProduto = (isDigital && purchaseData.id_medida == 4)
        ? 2
        : id_produto

    formData.append('id_produto', idProduto);
    formData.append('toques', isDigital ? 99 : toques);
    
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        url: '/qero/setCheckout',
        data: formData,
        success: result => {
            if (!result) return;

            let href = '/qero/personalizacion-productos'

            isCotacao() && (href += '?version=cotacao');
            
            window.location.href = href;
        }
    });
});

$(".opcao").click(function () {
    const selectedImg = `<img class="selected-div" src="${assetsUrl('images/icons/check-circle.svg')}">`;

    const { id_tipo = null, id_cor = null } = $(this).data();

    (id_tipo && id_cor)
        ? $(this).addClass('active').parent().parent().append(selectedImg)
        : $(this).addClass('active').append(selectedImg);

    calculaValor();
});

$(".produtos-container").click(() => $(".informacao-arte").fadeOut());

function zerar(bySizes = false) {
    const noHide = ['choose-type'];
    bySizes && noHide.push('tamanhos');

    $('div.box').each(function () {
        const idBox = $(this).attr('id');

        if (noHide.includes(idBox)) return;

        $(this).slideUp();
        $(this).find('.opcao').removeClass('active');
        $(this).find('.selected-div').remove();
    })

    Object
        .keys(purchaseDataInitialValues)
        .forEach(key => {
            if ((bySizes && key === 'id_produto') || ['id_carrinho', 'id_arte'].includes(key)) return;

            purchaseData[key] = purchaseDataInitialValues[key];
        })

    $('span.resumo-tampa').hide();
    $('.exemplo-tampa-resumo').hide();
    $('.exemplo-porta-copo').hide();
    $('.exemplo-tampa').hide()
    $('.valor-unidade-antigo').fadeOut();
    $('.valor-total-antigo').fadeOut();
    $('.valor-unidade-antigo span').html('0,00');
    $('.valor-total-antigo span').html('0,00');
    $('.valor-unidade span').html('0,00');
    $('.valor-total span').html('0,00');
    $("#select-quantidade .changed-label").html('Cantidad');
    $("#select-grandes-quantidades .changed-label").html('Cantidad');
    $('span.com').empty();
    $(".colors-card .card-imgs").css('opacity', '1');

    $('span.resumo-tamanho').empty();
    $('span.resumo-toques').empty();
    $('span.resumo-tampa').empty();
    $('span.resumo-cor').empty();

    if (bySizes) {
        $(`.colors-cups`).hide();
        $(`.colors-banner`).fadeIn();
        $('div.arrival-deadline').slideUp();
        $('.color-name').empty();
    } else {
        $('span.resumo-produto').empty();
    }
}

function calculaValor() {

    const { id_produto, quantidade, toques, id_medida, id_cor_tampa  } = purchaseData

    if (!id_produto || quantidade <= 0 || quantidade > 2000) return;

    setTimeout(() => {
        $.ajax({
            url: `https://ecovasos.com/qero/valores/${id_produto}/${id_medida || 0}/${toques || 0}/${quantidade}?v=${newUnix()}&id_cor_tampa=${id_cor_tampa}`,
            context: document.body,
            success: result => {
                let valor = parseFloat(result.valor)

                if (result.valor_tampa) {
                    valor += parseFloat(result.valor_tampa);
                }

                $('.valor-unidade span').html(number_format(valor, 2, ".", ""));
                $('.valor-total span').html(number_format(valor * quantidade, 2, ".", ""));

                $('li.frete').fadeIn();

                valor && $('button.continuar').prop('disabled', false);
            }
        });
    }, 500);

}

const showTooltip = () => $("button.continuar").prop('disabled') && $("small.tooltip-continuar").css('opacity', 1);
const hideTooltip = () => $("small.tooltip-continuar").css('opacity', 0);

function checkOffset() {
    const divResume = $('div.resumo');
    const divAreaDisabled = $('div#area-disabled');
    const footerOffsetTop = $('#footer').offset().top;
    const windowHeight = window.innerHeight;
    const scrollTop = $(document).scrollTop();
    const documentWidth = $(document).width();

    const setAbsolutePosition = (element, top) => element.css({ position: 'absolute', top: top });
    const setFixedPosition = (element, top) => element.css({ position: 'fixed', top: top });

    const pageHeight = documentWidth < 1450 ? 825 : 1000;

    if (scrollTop + windowHeight > pageHeight) {
        if (scrollTop + windowHeight < footerOffsetTop) {
            setFixedPosition(divResume, 110);
            setFixedPosition(divAreaDisabled, 505);
        }
    } else {
        setAbsolutePosition(divResume, 50);
        setAbsolutePosition(divAreaDisabled, 395);
    }

    if (divResume.offset().top + divResume.height() >= footerOffsetTop - 100) {
        setAbsolutePosition(divResume, `calc(100% - ${divResume.height() + 55}px)`);
    }

    if (divAreaDisabled.offset().top + divAreaDisabled.height() >= footerOffsetTop - 150) {
        setAbsolutePosition(divAreaDisabled, `calc(100% - -${divAreaDisabled.height() - 15}px)`);
    }
}

$(document).scroll(checkOffset);

const setResumeInfos = (step = '') => {
    const productName = 'Ecovaso' +
        (purchaseData.id_medida === 4 ? ' Térmico' : '') +
        (purchaseData.id_produto === 5 ? ' Full Color HD' : '')

    $(".resumo-produto, .nome-produto-copo").html(productName);

    const isDigital = purchaseData.id_produto == 5;

    const updateVirtualImage = (src, css) => {
        $('.exemplo-virtual').show().attr('src', assetsUrl(src));
        css && $('.exemplo-virtual').css(css);
    }

    if (step === 'product-type') {
        $('.exemplo-impressoes-resumo').hide();

        updateVirtualImage('images/ecovasos/9.png', { width: 76, height: 123, top: 0, left: 0, position: 'unset' });
        $('.exemplo-sombra').css({ width: 174, left: 49, top: 13 });

        isDigital && $('.exemplo-impressoes-resumo')
            .attr('src', assetsUrl(`images/ecovasos-digital/FC-1.png`))
            .css({ width: 76, top: 30 })
            .show();
    }

    if (step === 'product-size') {
        $('.resumo-tampa').empty();
        $('.exemplo-impressoes-resumo').hide();
        $(".exemplo-sombra").show();

        if (purchaseData.id_medida == 4) {

            $('.exemplo-impressoes-resumo').css({ width: 59, top: 53 });
            $('.exemplo-sombra').css({ width: 153, left: 63, top: 33 });

            updateVirtualImage('images/ecovasos/termicos/16.png', { height: 128, width: 79, top: 0, left: 0, position: 'unset' });

            isDigital && $('.exemplo-impressoes-resumo')
                .attr('src', assetsUrl(`images/ecovasos-digital/FC-4.png`))
                .css({ width: 78, top: 38 })
                .show();

            $('.exemplo-serigrafia')
                .attr('src', assetsUrl('images/ecovasos/termicos/16.png'))
                .css({ width: 79, height: 128 });

            $('.exemplo-impressoes').css({ top: 61 });

            $('img.exemplo-tampa').css({ display: 'none' });

            $('.tampa-toques')
                .attr('src', assetsUrl('images/ecovasos/tampas/16.png'))
                .css({ width: 80, top: 30 })
                .show();

            $('.exemplo-tampa-resumo')
                .show()
                .attr('src', assetsUrl('images/ecovasos/tampas/16.png'))
                .css({ width: 80, height: 'auto', top: 18 });
        } else {
            $('.exemplo-serigrafia')
                .attr('src', assetsUrl('images/ecovasos/9.png'))
                .css({ width: 76, height: 123 });

            $('.exemplo-tampa-resumo').hide();
            $('.tampa-toques').hide();
            $('img.exemplo-tampa').css('display', 'none');
            $('.exemplo-impressoes').css({ top: 61 });

            updateVirtualImage('images/ecovasos/9.png')

            const exemplosCss = {
                '1': {
                    virtual: { height: 123, width: 76, position: 'relative', top: 0 },
                    impressoes: {
                        serigrafia: { width: 60, top: 48 },
                        digital: { width: 76, top: 30 },
                    },
                    sombra: { width: 155, left: 59, top: 26 },
                },
                '2': {
                    virtual: { height: 137, width: 84, position: 'relative', top: 0 },
                    impressoes: {
                        serigrafia: { width: 65, top: 45 },
                        digital: { width: 85, top: 23 },
                    },
                    sombra: { width: 174, left: 49, top: 17 },
                },
                '3': {
                    virtual: { height: 150, width: 90, position: 'relative', top: 0 },
                    impressoes: {
                        serigrafia: { width: 70, top: 38 },
                        digital: { width: 92, top: 18 },
                    },
                    sombra: { width: 179, left: 49, top: 20 },
                },
            }

            const exemploCss = exemplosCss[purchaseData.id_medida];

            if (purchaseData.id_produto == 5) {
                $('.exemplo-impressoes-resumo').show();
                $('.exemplo-impressoes-resumo').attr('src', assetsUrl(`images/ecovasos-digital/FC-${purchaseData.id_medida}.png`));
            }

            if (exemploCss) {
                updateVirtualImage('images/ecovasos/9.png', exemploCss.virtual);
                $('.exemplo-impressoes-resumo').css(exemploCss.impressoes[isDigital ? 'digital' : 'serigrafia']);
                $('.exemplo-sombra').css(exemploCss.sombra);
            }
        }

    }

    if (step === 'product-color') {
        purchaseData.id_medida == 4
            ? updateVirtualImage(`images/ecovasos/termicos/${purchaseData.id_cor}.png`)
            : updateVirtualImage(`images/ecovasos/${purchaseData.id_cor}.png`);
    }

    if (step === 'product-cover') {
        $('img.exemplo-tampa').css({ display: 'unset' }).attr('src', assetsUrl(`images/tampas/${purchaseData.id_cor_tampa}.png`))
    }

    (isDigital || purchaseData.quantidade > 2000)
        ? $('.around-ul').hide()
        : $('.around-ul').show();
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const fillByParams = async () => {
    if (!id_carrinho && !id_arte) return;
    id_carrinho && (purchaseData.id_carrinho = id_carrinho);
    id_arte && (purchaseData.id_arte = id_arte);
    const url = new URL(window.location.href);

    const get_id_produto = url.searchParams.get("id_produto");
    const get_id_medida = url.searchParams.get("id_medida");
    const get_impressoes = url.searchParams.get("impressoes");
    const get_id_cor = url.searchParams.get("id_cor");
    const get_id_cor_tampa = url.searchParams.get("cor_tampa");

    const isDigital = get_impressoes == 99;

    $('#loader').fadeIn();

    await sleep(800);

    $(`.tipo-produto[data-id_produto="${isDigital ? 5 : 1}"]`).trigger('click');

    await sleep(800);

    $(`.tamanho[data-id_medida="${get_id_medida}"]`).trigger('click');

    await sleep(800);

    if (get_impressoes >= 1 && get_impressoes <= 4) {
        $(`.toque[data-toque="${get_impressoes}"]`).trigger('click');
    
        await sleep(800);
    }

    if (get_id_cor) {
        (get_id_produto == 1 || get_id_produto == 5) && $(`#cores .cor[data-id_cor="${get_id_cor}"]`).trigger('click');
        get_id_produto == 2 && $(`#cores-termico .cor[data-id_cor="${get_id_cor}"]`).trigger('click');
    }

    if(get_id_cor_tampa && get_id_produto == 2) {
        $(`#cor-tampa .opcao.cor[data-id_cor="${get_id_cor_tampa}"]`).trigger('click');
    }

    if (id_arte || id_carrinho) {
        $('.cor').addClass('bloqueado');
        (get_id_produto == 2) && $('#cor-tampa .cor').removeClass('bloqueado');
        $('.toque').addClass('bloqueado');
        $('.tamanho').addClass('bloqueado');
        $('.tipo-produto').addClass('bloqueado');
        $('.opcao-cores').addClass('bloqueado');
    }

    await sleep(800);

    $('#loader').fadeOut();
}

const fixStepsNumbers = () => {
    let n = 1;

    $('div.box').each(function () {
        $(this).css('display') != 'none' && $(this).find('span.countNumber').html(n++);
    })
}

const scrollNextStep = async (selector, topVariation = 150) => {
    $(selector).slideDown();

    await sleep(300);

    const scrollTop = $(selector).offset().top - topVariation;

    $("html, body").animate({ scrollTop }, 600);

    fixStepsNumbers();
}

const validateCupData = () => {

    const { id_medida, id_tipo, id_cor } = purchaseData

    const id_produto = purchaseData.id_medida == 4 ? 2 : 1

    if (id_produto == 1) {
        if (id_medida == 1) {
            if (id_tipo == 1) {
                return [1, 2, 4, 6, 8, 9, 10, 11].includes(parseInt(id_cor))
            } else if (id_tipo == 2) {
                return [3, 7].includes(parseInt(id_cor))
            }
        } else if (id_medida == 2) {
            if (id_tipo == 1) {
                return [1, 2, 4, 6, 8, 9, 10, 11].includes(parseInt(id_cor))
            } else if (id_tipo == 2) {
                return [3, 7].includes(parseInt(id_cor))
            }
        } else if (id_medida == 3) {
            if (id_tipo == 1) {
                return [4, 9, 10].includes(parseInt(id_cor))
            } else if (id_tipo == 2) {
                return [3].includes(parseInt(id_cor))
            }
        }
    } else if (id_produto == 2) {
        if (id_medida == 4) {
            if (id_tipo == 2) {
                return [3, 7, 12, 13, 14, 15, 28].includes(parseInt(id_cor))
            }
        }
    }

    return false
}

const isCotacao = () => {
    const url = new URL(window.location.href);

    const version = url.searchParams.get("version");

    return version === 'cotacao'
}