Site = {}

Site._init = function () {
    $(window).scroll(function () {
        Site._menu();
        Site._stickBookingAside();
        Site._stickStep();
        Site._stepsPackage();
    })
    Site._setTouch();
    Site._bookingDetail();
    Site._bookingAside();
    Site._flightAside();
    Site._module();
    Site._mask();
    Site.ShowEarnMiles();
    Site.ShowDetailInfo();
    Site._spinner();
    Site._optionBox();
    Site._tripChange();
    Site._slideUp();
    Site._hotelAside();
    Site._compareHotel();
    Site._checkOptionSize();
    Site._openRecentSearches();
    Site._animateHotelTooltips();
    Site._openRooms();
    Site._scrollPage();
    Site._galeries();
    Site._applyAutoComplete();
    $(window).resize(function () {
        Site._bookingAside();
        Site._stickBookingAside();
        Site._checkOptionSize();
        $(".suggestions").autocomplete("close");
    });
    $('.has-error').tooltip();

    $('.spanInfo').on('click', function () {
        $(".popover").hide();
    });
}
Site._menu = function () {
    var top = $(window).scrollTop();        
    $('body')[top > 1 ? 'addClass' : 'removeClass']('collapsed'); 
}
Site._stickStep = function () {
    $(".float-step").each(function () {
        var headerHeight = $(".flow-navigation").outerHeight() + $(".main-header").outerHeight(),
            windowScrollTop = $(window).scrollTop();
        var $this = $(this),
            parentPos = $this.parent().offset(),
            minPos = parentPos.top - 30,
            $wrapper = $($this.data("wrapper")),
            wrapperTop = $wrapper.offset().top,
            wrapperHeight = $wrapper.height();
        if (windowScrollTop < (minPos)) {
            $this.css({
                "top": 0
            })
        }
        if (windowScrollTop > (minPos - headerHeight) && windowScrollTop < (wrapperHeight + wrapperTop) - 250) {
            $this.css({
                "top": (windowScrollTop - wrapperTop) + headerHeight
            })
        }
    });
}
Site._bookingDetail = function () {
    $('.more-info-link').on('click', function () {
        if ($(this).hasClass('less')) {
            $(this)
                .removeClass('less')
                .text('Mais informações')
                .prev('.more-info').fadeOut('fast', function () {
                    Site._bookingAside();
                });
        } else {
            $(this)
                .addClass('less')
                .html('Menos informações')
                .prev('.more-info').fadeIn('fast', function () {
                    Site._bookingAside();
                });
        }
    });
    $('.aside-details > .btn-black').on('click', function () {
        if ($(this).hasClass('closed')) {
            $(this).removeClass('closed');
            $('.scroll-list .dropdown-list:first-child').slideDown('fast', function () {
                Site._fixAsideButton();
                Site._bookingAside();
            });
        } else {
            $(this).addClass('closed');
            Site._fixAsideButton();
            $('.scroll-list .dropdown-list:first-child').slideUp('fast', function () {
                Site._fixAsideButton();
                Site._bookingAside();
            });
        }
    })
    $('.aside-details .scroll-list .btn-black').on('click', function () {
        if ($(this).hasClass('closed')) {
            $(this).removeClass('closed');
            $(this).next('.dropdown-list').slideDown('fast', function () {
                Site._fixAsideButton();
                Site._bookingAside();
            });
        } else {
            $(this).addClass('closed').removeAttr('style')
            $(this).next('.dropdown-list').slideUp('fast', function () {
                Site._fixAsideButton();
                Site._bookingAside();
            });
        }
    })
    if ($('.aside-details .btn-black[data-aside=bottom]').length > 0) {
        $('.aside-details .scroll-list').scroll(function () {
            Site._fixAsideButton();
        })
    }
    function getBillingValue() {
        $('#billingCPF2').val($('#billingCPF').val());
        $('#billingPhone2').val($('#billingPhone').val());
        $('#billingPhoneType2').val($('#billingPhoneType').val());
        $('#billingCEP2').val($('#billingCEP').val());
        $('#billingAddress2').val($('#billingAddress').val());
        $('#billingAddressNumber2').val($('#billingAddressNumber').val());
        $('#billingAddressDetails2').val($('#billingAddressDetails').val());
        $('#billingCity2').val($('#billingCity').val());
        $('#billingState2').val($('#billingState').val());
        $('#billingCountry2').val($('#billingCountry').val());
    }
    $('#copyBillingAddress').on('click', function () {
        if ($(this).prop('checked') == true) {
            getBillingValue();
            $("#billingInformation2").find('input').prop('disabled', true);
            $("#billingInformation2").find('select').prop('disabled', true);
        } else {
            $("#billingInformation2").find('input').prop('disabled', false);
            $("#billingInformation2").find('select').prop('disabled', false);

        }
    })
    $('#billingInformation').find('input').on('blur', function () {
        if ($('#copyBillingAddress').prop('checked') == true) {
            getBillingValue();
        }
    })
    $('#billingInformation').find('select').on('change', function () {
        if ($('#copyBillingAddress').prop('checked') == true) {
            getBillingValue();
        }
    })
}
Site._openRooms = function () {
    $('button[data-click=room-detail]').on('click', function(){
        window.location = '/hotel/detail'
    });
    $('button[data-click=room-detail-package]').on('click', function () {
        window.location = '/Packages/Detail'
    });
}
Site._scrollPage = function () {
    $('.scroll-quartos').on('click', function(e){
        e.preventDefault();
        $('html,body').animate({scrollTop: $('.hotel-detail-wrapper .select-room h2').offset().top-150},'slow');
    });    
    $('.scroll-quartos-packages').on('click', function(e){
        e.preventDefault();
        $('html,body').animate({scrollTop: $('.hotel-detail-wrapper .select-room h2').offset().top-200},'slow');
    });
}
Site._galeries = function () {
    $( '.slideshow' ).cycle({
        manualSpeed: 100,
        slides:  '> a'
    });
    $("a.grouped_elements").fancybox();
}
Site._fixAsideButton = function () {
    if ($('.aside-details .btn-black[data-aside=top]').length > 0) {
        var menuTop = $('.aside-details .btn-black[data-aside=top]');
        var menuBottom = $('.aside-details .btn-black[data-aside=bottom]');
        var top = $('.aside-details .scroll-list').scrollTop();
        var menuPosition = $('.aside-details .dropdown-list.list-bottom').position().top - 80;
        if (!$('.aside-details .btn-black[data-aside=bottom]').hasClass('closed')) {
            if (menuPosition < 0) {
                $(menuBottom).css({
                    position: 'absolute',
                    top: top + 40
                }).next().css('padding-top', 40);
            } else {
                $(menuBottom).removeAttr('style').next().css('padding-top', 0);
            }
        }
        $(menuTop).css({
            top: top
        })
    }
}
Site._setTouch = function () {
    if ($('html').hasClass('touch')) {
        $(window).scroll(function () {
            var top = $(window).scrollTop();
            var off = $('.main-menu-wrapper').height() + $('form.search').height();
            $('.aside-details').css('top', top).addClass('smallResolution');
            $('.keepadjust').css({
                position: 'absolute',
                top: top
            });
        })
        var $body = $('body');
        /* bind events */
        $(document)
        .on('focus', 'input', function (e) {
            $body.addClass('fixfixed');
        })
        .on('blur', 'input', function (e) {
            $body.removeClass('fixfixed');
        });
        $('.search')
        .on('focus', 'input', function (e) {
            $('html, body').scrollTop(0);
        })
    }
}
Site._stickBookingAside = function () {
    if ($(window).width() <= 985) {
        var top = $(window).scrollTop();
        $('.aside-details').css('top', top).addClass('smallResolution');
        $('.main-header').css({
            position: 'absolute',
            top: top
        });
        $('.booking .flow-navigation').css({
            position: 'absolute',
            top: top + 80
        });
    } else {
        $('.aside-details').css('top', 90).removeClass('smallResolution');
        $('.main-header').removeAttr('style');
        $('.booking .flow-navigation').removeAttr('style');
    }
}
Site._bookingAside = function () {
    $('.aside-details').css('width', $('.aside-wrapper').width());
    var wHeight = $(window).height();
    var totalPrice = $('.aside-details .total-price-box').outerHeight();
    $('.aside-details').css('padding-bottom', totalPrice);
    var dif = 140 + totalPrice;
    if ($('.booking').hasClass('package')) {
        dif = 100 + totalPrice;
    }
    var scrollHeight = wHeight - dif;
    if (Site._checkBookingAside()) {
        $('.aside-details').removeClass('smallHeight');
        $('.aside-details .scroll-list').css('height', scrollHeight);
        $('.aside-details .scroll-list').css('max-height', scrollHeight);
    } else {
        $('.aside-details').addClass('smallHeight');
        $('.aside-details .scroll-list').css('height', 'auto');
        $('.aside-details .scroll-list').css('max-height', scrollHeight);
    }
}
Site._checkBookingAside = function () {
    var wHeight = $(window).height();
    var dif = $('.aside-details .total-price-box').outerHeight() + 140;
    if ($('.booking').hasClass('package')) {
        dif = dif - 40;
    }
    $('.aside-details .scroll-list').clone().addClass('clone').removeAttr('style').appendTo('.aside-details');
    var scrollwHeight = $('.aside-details .scroll-list.clone').outerHeight();
    $('.aside-details .scroll-list.clone').remove();
    if (scrollwHeight > (wHeight - dif))
    return true;
}
Site._mask = function () {
    $('input[data-mask="card-number"]').mask('9999');
    $('input[data-mask="card-date"]').mask('99/99', { placeholder: '__/__' });
    $('input[data-mask="card-code"]').mask('999');
    $('input[data-mask="passengerDate"]').mask('99/99/9999');
    $('input[data-mask="card-monetary"]').mask('000.000.000.000.000,00', { reverse: true });
    $('input[data-mask="cpf"]').mask('000.000.000-00');
    $('input[data-mask="cep"]').mask('00000-000');
    $('input[data-mask="only-number"]').mask('0000000000000', { 'translation': { 0: { pattern: /[0-9]/ } } });
    $('input[data-mask="phone"]').mask('(00) 0000-0000', {
       onKeyPress: function (phone, e, currentField, options) {
           var new_sp_phone = phone.match(/^(\(11\) 9(5[0-9]|6[0-9]|7[01234569]|8[0-9]|9[0-9])[0-9]{1})/g);
           new_sp_phone ? $(currentField).mask('(00) 00000-0000', options) : $(currentField).mask('(00) 0000-0000', options)
       }
   });
}
Site._animateHotelTooltips = function() {
    $('.booking-alert').addClass('in');
    $('.browsing-alert').addClass('in');
    $('.accommodation .dates').data('select-dates', true);
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        var init = $('.accommodation .date-init').html() == "Entrada";
        var end = $('.accommodation .date-end').html() == "Saída";
        if (top > 250 ) {
            if ($('.accommodation .dates').data('select-dates') && (init || end)) {
                $('.accommodation .dates').popover({
                    html: true,
                    content: function () {
                        return $($(this).data('target-selector')).html();
                },
                    title: function () {
                        var title = $(this).data('title');
                        if (title) {
                            return $(this).data('title') + '<span class="close">&times;</span>';
                }
                        return "";
                }
                }).popover('show');
                $('.accommodation .dates').data('select-dates', false);
            }
            $('.container-trip-advisor-review').fadeOut();
        }
    })
    $('.container-trip-advisor-review button').on('click', function () {
        var position = $('.review.row').eq(0).offset().top - 300;
        $('html, body').animate({
            scrollTop: position
        }, 700)
    })
}
Site._compareHotel = function () {
    $('input[name=opt-comparar]').on('click', function () {
        var txt = "<li>Selecione mais um hotel</li>";
        var hotel = "<li class='on'>Ric Palace Hotel</li>"
        var hotel1 = "<li class='on'>Promenade Casa del Mar</li>";
        if ($(this).prop('checked') == true) {
            $('div.compare').fadeIn();
        }
        if ($('input[name=opt-comparar]:checked').length == 0) {
            $('.compare ul li').remove();
            $('.compare ul').append(txt);
            $('.compare ul').append(txt);
            $('.compare ul').append(txt);
        }
        if ($('input[name=opt-comparar]:checked').length == 1) {
            $('.compare ul li').remove();
            $('.compare ul').append(hotel1);
            $('.compare ul').append(txt);
            $('.compare ul').append(txt);
        }
        if ($('input[name=opt-comparar]:checked').length == 2) {
            $('.compare ul li').remove();
            $('.compare ul').append(hotel1);
            $('.compare ul').append(hotel);
            $('.compare ul').append(txt);
        }
        if ($('input[name=opt-comparar]:checked').length == 3) {
            $('.compare ul li').remove();
            $('.compare ul').append(hotel1);
            $('.compare ul').append(hotel);
            $('.compare ul').append(hotel);
        }
    })
}
Site._fieldChange = function (obj, nextFieldId) {
    var maxlength = $(obj).attr('maxlength');
    var length = $(obj).val().length;
      
    if (length == maxlength){
        $('#' + nextFieldId).focus();
    }
}
Site._validNumber = function (obj) {
    var valor = $(obj).val().replace(/[^0-9]+/g, '');
    $(obj).val(valor);
}
Site.PassengerName = function (part, objAppendPassenger) {
    var name = $('#name-passenger-' + part).val();
    var middleName = ($('#middleName-passenger-' + part).val()) ? $('#middleName-passenger-' + part).val() : '';
    var lastName = $('#lastName-passenger-' + part).val();

    var fullName = name + ' ' + middleName + ' ' + lastName;
    if (!name.trim()) {
        $('#for-insurePassager-' + part).text('Passageiro ' + part);
        $('#spn-passenger-' + part).text('Passageiro ' + part);
    } else {
        $('#for-insurePassager-' + part).text(fullName);
        $('#spn-passenger-' + part).text(fullName);
    }
}
Site._flightAside = function () {
    $('a[data-click=show-companies]').on('click', function () {
        if ($(this).hasClass('minus')) {
            $(this).prev('.opts').find('.hidden-item').hide();
            $(this).find('i').removeClass('glyphicon-minus-white').addClass('glyphicon-plus-white');
            $(this).find('span').html('Mostrar todas Cias Aéreas');
            $(this).removeClass('minus');
        } else {
            $(this).prev('.opts').find('.hidden-item').show();
            $(this).find('i').removeClass('glyphicon-plus-white').addClass('glyphicon-minus-white');
            $(this).find('span').html('Mostrar menos Cias Aéreas');
            $(this).addClass('minus');
        }
    })
    $('label[data-click=check-destiny-airport]').on('click', function () {
        $(this).prev().prop('checked');
        if ($(this).prev().prop('checked') == false) {
            $('input[name=opt-destino]').prop('disabled', true).parent('.checkbox').addClass('disabled');
            $('input[name=opt-destino]').eq(0).prop('disabled', false).prop('checked', true).parent('.checkbox').removeClass('disabled');
        } else {
           $('input[name=opt-destino]').prop('disabled', false).prop('checked', false).parent('.checkbox').removeClass('disabled');
        }
    })
}
// Disabilita ou habilita o botao de comprar depois de uma busca
Site.ShowSelectButtom = function (obj, buttom) {
    // Retorna a area de resultado
    var tableArea = $(obj).closest('.results');

    tableArea.find('.table-result').each(function () {
     if ($(this).find(':checked').length == 2) {
         var buttonTickets = $(this).closest('.wrap-fixed').find('.btn-tickets-flights');
         buttonTickets.parent().popover('disable')
            buttonTickets.text('Comprar');
            buttonTickets.removeAttr('disabled');
            buttonTickets.removeClass('btn-tertiary').addClass('btn-default');
        } else {
         var buttonTickets = $(this).closest('.wrap-fixed').find('.btn-tickets-flights');
         buttonTickets.parent().popover('enable')
            buttonTickets.text('Selecione e Compre');
            buttonTickets.attr('disabled','disabled');
            buttonTickets.removeClass('btn-default').addClass('btn-tertiary');
        }
    });   
}

Site.ShowEarnMiles = function () {
    $("[data-toggle-visibility]").each(function (index, element) {        
        var elemVisibility = $(element).data("toggleVisibility");        
        $(this).on("click", function () {
            $(this).next(elemVisibility).toggleClass('hidden');
        });
    });
}

Site.ShowDetailInfo = function () {
    $("[data-show-info]").each(function (index, element) {        
        var elemVisibility = $(this).data("showInfo");
        $(this).on("click", function () {
            if (!$(this).hasClass('open')) {
                $(this).addClass('open');
                $(this).find('b').text('Fechar');
                $(this).find('i').removeClass('glyphicon-icon-info');
                $(this).closest('.room-detail').find(elemVisibility).toggleClass('hidden');
            } else {
                $(this).removeClass('open');
                $(this).find('b').text('Info');
                $(this).find('i').addClass('glyphicon-icon-info');
                $(this).closest('.room-detail').find(elemVisibility).toggleClass('hidden');
            }
        });
    });
}

Site._slideUp = function (obj) {
    $('.main-aside .filters h4 .glyphicon').each(function () {
        $(this).on('click', function () {
            var obj = $(this).parents('.filters').find('.opts');
            if ($(obj).is(":hidden")) {
                $(obj).show("slow");
            } else {
                $(obj).slideUp()
            }
        })
    })
}

Site.CloseCompare = function () {
    $(".compare").hide("slow");    
}

Site.CheckAll = function (obj) {
    if ($("#" + obj.id).is(':checked')) {
        $(".optionClass").prop("checked", "checked");
    } else {
        $(".optionClass").prop("checked", null);
    }
}

Site._spinner = function () {
    $(".spinner-simple").TouchSpin({
        verticalbuttons: true,
        min: 0,
        verticalupclass: 'glyphicon glyphicon-plus',
        verticaldownclass: 'glyphicon glyphicon-minus',
        buttondown_class: 'btn',
        buttonup_class: 'btn',
        change: Site._spinnerAgeChild
    }).change(Site._spinnerAgeChild);
    $(".spinner-age").TouchSpin({
        verticalbuttons: true,
        min: 1,
        max: 11,
        verticalupclass: 'glyphicon glyphicon-plus',
        verticaldownclass: 'glyphicon glyphicon-minus',
        buttondown_class: 'btn',
        buttonup_class: 'btn'
    });
}
Site.roomNumbers = 1;
Site._optionBox = function () {
    $('.search .options .click').on('click', function () {
        $('.wrap-dates.active').trigger('click');
        $(".options-pop").toggle();
        Site._checkOptionSize();
        $(this).parent().toggleClass('active');
    })
    $('.add-room').on('click', function () {
        var numberTxt = $('.row-room tr td').length + 1;
        Site.roomNumbers = Site.roomNumbers + 1;
        var number = Site.roomNumbers;
        var source = $('#option-room-button').html();
        var templateButton = Handlebars.compile(source);
        var html = templateButton({ 'number': number, 'number-txt': numberTxt });
        $('.row-room tr').append(html);
        var sourceCol = $('#option-room-col').html();
        var templateCol = Handlebars.compile(sourceCol);
        html = templateCol({ 'number': number, 'type': 'Adulto'});
        $('.room-people tr').eq(0).append(html);
        html = templateCol({ 'number': number, 'type': 'Criança', 'classe': 'spinner-child' });
        $('.room-people tr').eq(1).append(html);
        $('<td>').attr('data-room', 'room-' + number).appendTo('tr.age');
        Site._spinner();
        Site._removeRoomOption();
        $('.options-pop .scroll').show();
        Site._checkSizeRoom();
        Site._checkOptionSize();
    })
    Site._removeRoomOption();
}
Site._spinnerAgeChild = function () {
    if ($(this).hasClass('spinner-child')) {
        var value = $(this).val();
        var colnumber = $(this).parents('td').attr('data-room');
        var col;
        $('.room-people .age td').each(function () {
            if ($(this).attr('data-room') == colnumber) {
                col = $(this);
            }
        })
        var spinnerQnt = $(col).find('.spinner-age').length;
        if (value == 0) {
            var check = true;
            $(col).html('');
            Site._checkChildAge();

        } else {
            if (value > spinnerQnt) {
                $('tr.age').removeClass('hidden');
                if (value == 1 && value > spinnerQnt) {
                    $('<label>').addClass('label-age').html('Idade da Criança').appendTo(col);
                }
                var source = $('#option-child-age').html();
                var template = Handlebars.compile(source);
                html = template();
                var diff = value - spinnerQnt;
                for (i = 0; i < diff; i++) {
                    $(col).append(html);
                }
                Site._spinner();
            } else {
                var diff = spinnerQnt - value;
                for (i = 0; i < diff; i++) {
                    $(col).find('.spinner-box').last().remove();
                }
            }
        }
    }
}
Site._checkChildAge = function () {
    var check = true;
    $('.spinner-child').each(function () {
        if ($(this).val() != 0) {
            check = false;
        }
    })
    if (check) {
        $('tr.age').addClass('hidden');
    }
}
Site._checkSizeRoom = function () {
    var number = $('.row-room tr td').length;
    if (number == 1) {
        $('.room-people').removeClass('content-2');
        $('.room-people').addClass('content-1');
    } else if (number == 2) {
        $('.room-people').removeClass('content-1');
        $('.room-people').addClass('content-2');
    } else {
        $('.room-people').removeClass('content-2');
        $('.room-people').removeClass('content-1');
    }
    $('.options-button .number').html(number);
    if (number == 1) {
        $('.options-button .txt').html('Quarto');
    } else {
        $('.options-button .txt').html('Quartos');
    }
}
Site._checkOptionSize = function () {
    if ($('.options-pop .scroll').length > 0) {
        var windowHeight = $(window).height();
        var scrollTop = $('.options-pop .scroll').offset().top;        
        var windowTop = $(window).scrollTop();
        var height = (scrollTop - windowTop + 60 - windowHeight) * -1;
        $('.options-pop .scroll').css('max-height', height);
    }
}
Site._removeRoomOption = function () {
    $('.th-room button').on('click', function () {
        var item = $(this).parents('.th-room').attr('data-room');
        $('.room-people td, .row-room td').each(function () {
            if ($(this).attr('data-room') == item) {
                $(this).remove();
            }
        });
        Site._checkChildAge();
        if ($('.row-room tr td').length == 0) {
            $('.options-pop .scroll').hide();
            $('.room-people .age').addClass('hidden');
        }
        Site._checkSizeRoom();
        $('.row-room td').each(function () {
            var position = $(this).index() + 1;            
            if ($(this).hasClass('th-room')) {
                $(this).find('button .text').text('Quarto ' + position);
            }
        });
    })
}
Site._legendToggle = function (item) {
    $(item).toggleClass('closed');
    var legend = $(item).parents('.legend').find('ul');
    $(legend).slideToggle();
}
Site._closeMap = function (item) {
    $(item).toggleClass('closed');
    var map = $(item).parents('.mapa');
    $(map).slideUp(function () {
        utils.resize();
    });
    return false;
}
Site._openMap = function () {
    $("html, body").animate({
        scrollTop: 0
    }, function () {
        $('.mapa').slideDown(function () {
            utils.resize();
        });
    });
}
Site._applyAutoComplete = function () {
    $(".suggestions").each(function () {
        var item = $(this).parent();
        $(this).autocomplete({ source: Site._getAutoComplete(), appendTo: $(item) });
    })
    
}
Site._getAutoComplete = function () {
     json = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];
     return json;
     }
Site._openRecentSearches = function () {
    $('.btn-recent-serches').on('click', function () {
        $('.main-aside .expanded .item').slideDown();
    })
}
Site._multiExpandedSearch = function (button) {
    $('.search .container-fluid').toggleClass('expanded-open');
    if ($('.search .container-fluid').hasClass('expanded-open')) {
        $('.search .btn-expand.expand span').html('Fechar');
        Site._multiExpandedSearchResize();
        $('.search .dates').each(function () {
            var wrapper = $(this).find('.wrap-dates');
            $(this).find('.calendar').show().position({
                my: 'center bottom',
                at: 'center top',
                of: $(wrapper)
            }).hide();
        })
    } else {
        $('.search .btn-expand.expand span').html('Expandir');
        $(".search .container-fluid .btn-expand, .search .click").attr("style","")
        $('.wrap-dates.active').each(function () {
            $(this).trigger('click');
        })
    }
}
Site._multiExpandedSearchResize = function () {
    var heightExpandedArea = $(".expanded-area").outerHeight(),
        heightFooter = $(".expanded-area footer").outerHeight();
    $(".search .container-fluid .btn-expand, .search .click").height(heightExpandedArea - heightFooter - 2);
}
Site._hotelAside = function () {
    $('.expanded .item').each(function () {
        $(this).find('.glyphicon-btn-close').on('click', function () {
            $(this).parent('.item').slideUp();
        })
    })
    $('.btn-see-map').on('click', function () {
        Site._openMap();
    })
    $('.mapa .popover-title .close').on('click', function () {
        $(this).parents('.popover').fadeOut();
    })
}
Site._tripChange = function () {
    if ($('.search-result').hasClass('pgflight') || $('.search-result').hasClass('packages')) {
        $(".search input:radio[name=typeTrip]").change(function () {
            check();
        });

        function check() {
            var trip = $(".search input:radio[name=typeTrip]:checked").val();
            if ($('.search-result').hasClass('pgflight')) {
                var jrange = '<div class="col dates jrange"><div class="wrap-dates"><div class="data date-init"></div> <i></i> <div class="data date-end"></div> </div><div class="calendar"></div></div>';
                var oneway = '<div class="col dates one-way"><div class="wrap-dates"><div class="data date-init"></div></div><div class="calendar"></div></div>';
            }
            if ($('.packages').hasClass('packages')) {
                var jrange = '<div class="col dates jrange"><div class="wrap-dates"><label>Voo</label><div class="data date-init"></div> <i></i> <div class="data date-end"></div> </div><div class="calendar"></div></div>';
                var oneway = '<div class="col dates one-way"><div class="wrap-dates"><label>Voo</label><div class="data date-init"></div></div><div class="calendar"></div></div>';
            }
            if (trip == 'roundTrip') {
                $('.search .flight .dates').remove();
                $('.search .flight').append(jrange);
            } else if (trip == 'onewWayTrip') {
                $('.search .flight .dates').remove();
                $('.search .flight').append(oneway);
            } else {
                $('.search .flight .dates').remove();
                $('.search .flight').append(jrange);
            }
            Site._calendar();
        }
        check();
    }
    else {
        Site._calendar();
    }
}
Site._selectHotel = function () {
     window.location = '/Packages/Detail';
}
Site._selectRoom = function () {
    window.location = '/Packages/FlightSearchResult';
}
Site._stepsPackage = function () {
    if ($('.steps.hotel-steps').length > 0) {
        var stepHeight = $('.steps.hotel-steps').height();
        var topDiff = $('.main-menu-wrapper').height() + $('.search').height();
        var top = $(window).scrollTop() + topDiff;
        var max = parseInt($('.container-fluid.detail').css('padding-top').replace(/[^-\d\.]/g, '')) + topDiff - stepHeight;
        if (top < max) {
            $('.steps.hotel-steps').css('top', top);
        } else {
            $('.steps.hotel-steps').css('top', max);
        }
    }
}
Site._calendar = function () {
    $.datepicker.regional['pt-BR'] = {
        closeText: 'Fechar',
        prevText: '&#x3c;Anterior',
        nextText: 'Pr&oacute;ximo&#x3e;',
        currentText: 'Hoje',
        monthNames: ['Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda-feira', 'Ter&ccedil;a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional['pt-BR']);

    if ($('.dates.one-way').size() > 0) {
            $('.one-way').each(function (index) {
                if ($(this).data('calendarActive') != true) {
                    $(this).data('calendarActive', true);
                    var wrapper = $(this);
                    var calendar = $(this).find('.calendar');
                    $(wrapper).data("clickCalendar", false);
                    $(calendar).datepicker({
                        inline: false,
                        minDate: 0,
                        numberOfMonths: 2,
                        beforeShow: function () {
                            $(calendar).find('.date-range-first a').css('background-color', '#ebeef0');
                        },
                        beforeShowDay: function (date) {
                            var classe = '';
                            if (date.getTime() == $(wrapper).data("cur")) {
                                classe = 'date-range-unique';
                            } else {
                                classe = '';
                            }
                            return [true, classe];
                        },
                        onSelect: function (dateText, inst) {
                            var date = $(this).datepicker('getDate');
                            $(wrapper).data("cur", (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime());
                            $(wrapper).find('.date-init').html($.datepicker.formatDate('<span>d</span> M', new Date(date), {}));
                            $(wrapper).data("clickCalendar", true);
                            $(wrapper).find('.calendar').addClass('init');
                            $(wrapper).find('.calendar').hide();
                            $(wrapper).find('.wrap-dates').removeClass('active');
                        }
                    })
                   .position({
                       my: 'center bottom',
                       at: 'center top',
                       of: $(wrapper).find('.wrap-dates')
                   }).hide();
                    $(wrapper).find('.wrap-dates').on('click', function (e) {
                        $('.dates').popover('destroy');
                        if ($('.options').hasClass('active')) {
                            $('.search .click').trigger('click');
                        }
                        if ($(this).hasClass('active')) {
                            $(wrapper).find('.calendar').hide();
                            $(wrapper).find('.wrap-dates').removeClass('active');
                            $(wrapper).data("clickCalendar", false);
                        } else {
                            $('.wrap-dates.active').each(function () {
                                $(this).trigger('click');
                            })
                            $(this).addClass('active');
                            $(wrapper).find('.calendar').datepicker('refresh').show();
                        }
                    });
                }
            })
    }
    if ($('.jrange').size() > 0) {
        $('.jrange').each(function (index) {            
            if ($(this).data('calendarActive') != true) {
                $(this).data('calendarActive', true);
                var wrapper = $(this);
                var calendar = $(this).find('.calendar');
                $(wrapper).data("cur", -1);
                $(wrapper).data("prv", -1);
                $(wrapper).data("clickCalendar", false);
                $(wrapper).data("endDate", false);
                $(calendar).datepicker({
                    numberOfMonths: 2,
                    inline: false,
                    minDate: 0,
                    beforeShow: function () {
                        $(calendar).find('.date-range-first a').css('background-color', '#ebeef0');
                    },
                    beforeShowDay: function (date) {
                        var classe = '';
                        if (date.getTime() == $(wrapper).data("prv") && $(wrapper).data("prv") == $(wrapper).data("cur")) {
                            classe = 'date-range-unique';
                        } else if (date.getTime() == $(wrapper).data("prv")) {
                            classe = 'date-range-first';
                        } else if (date.getTime() == $(wrapper).data("cur")) {
                            classe = 'date-range-last';
                        } else if (date.getTime() > $(wrapper).data("prv") && date.getTime() < $(wrapper).data("cur")) {
                            classe = 'date-range-selected';
                        } else {
                            classe = '';
                        }
                        return [true, classe];
                    },

                    onSelect: function (dateText, inst) {
                        var d1, d2;
                        var temp = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay).getTime();
                        if ($(wrapper).data("clickCalendar") == false && $(wrapper).data("endDate") == false) {
                            //console.log('1 click');
                            $(wrapper).data("prv", temp);
                            $(wrapper).find('.date-init').data("dateVal", dateText);
                            $(wrapper).find('.date-init').html($.datepicker.formatDate('<span>d</span> M', new Date($(wrapper).data("prv")), {}));
                            $(this).datepicker('option', 'minDate', new Date($(wrapper).data("prv")));
                            $(wrapper).data("clickCalendar", true);
                            $(wrapper).find('.calendar').addClass('init');
                            $(wrapper).find('.date-end').html('');
                            $(wrapper).find('.date-end').data("dateVal", '');
                            $(wrapper).data("cur", -1);
                            $(wrapper).find('.calendar').addClass('end-date');
                        } else {
                            if ($(wrapper).data("endDate") == true) {
                                //console.log('click final');
                                $(wrapper).data("clickCalendar", true);
                                $(wrapper).data("cur", temp);
                                d2 = $.datepicker.formatDate('dd/mm/yy', new Date(temp), {});
                                $(wrapper).find('.date-end').data("dateVal", d2);
                                d2 = $.datepicker.formatDate('<span>d</span> M', new Date(temp), {});
                                $(wrapper).find('.date-end').html(d2);
                                $(wrapper).data("endDate", false);
                                $(wrapper).find('.calendar').removeClass('init');
                                $(wrapper).find('.calendar').removeClass('end-date');
                            } else {
                                //console.log('2 click');
                                $(wrapper).data("cur" , temp);
                                $(wrapper).find('.calendar').removeClass('init');
                                d1 = $.datepicker.formatDate('dd/mm/yy', new Date($(wrapper).data("prv")), {});
                                d2 = $.datepicker.formatDate('dd/mm/yy', new Date($(wrapper).data("cur")), {});
                                $(wrapper).find('.date-init').data("dateVal", d1);
                                $(wrapper).find('.date-end').data("dateVal", d2);
                                d1 = $.datepicker.formatDate('<span>d</span> M', new Date($(wrapper).data("prv")), {});
                                d2 = $.datepicker.formatDate('<span>d</span> M', new Date($(wrapper).data("cur")), {});
                                $(wrapper).find('.date-init').html(d1);
                                $(wrapper).find('.date-end').html(d2);
                                $(wrapper).find('.calendar').removeClass('end-date');
                            }
                            $(this).datepicker('option', 'minDate', 0);
                            if ($(wrapper).data("clickCalendar") == true) {
                                $(wrapper).data("clickCalendar", false);
                                $(wrapper).find('.calendar').hide();
                                $(wrapper).find('.wrap-dates').removeClass('active');
                            } else {
                                $(wrapper).data("clickCalendar", true);
                            }
                        }
                    },

                    onChangeMonthYear: function (year, month, inst) {
                        //prv = cur = -1;
                    }
                })
               .position({
                   my: 'center bottom',
                   at: 'center top',
                   of: $(wrapper).find('.wrap-dates')
               })
               .hide();
                
                
                $(wrapper).find('.wrap-dates').on('click', function (e) {
                    $('.dates').popover('destroy');
                    if ($('.options').hasClass('active')) {
                        $('.search .click').trigger('click');
                    }
                    if ($(this).hasClass('active')) {
                        $(wrapper).find('.calendar').hide();
                        $(wrapper).find('.wrap-dates').removeClass('active');
                        $(wrapper).data("clickCalendar", false);
                        $(wrapper).data("endDate", false);
                        $(calendar).datepicker('option', 'minDate', 0);
                        if ($(wrapper).data("cur") == -1) {
                            $(wrapper).find('.date-init').html('');
                            $(wrapper).find('.date-init').data("dateVal", '');
                            $(wrapper).data("prv", -1);
                        }
                    } else {
                        $('.wrap-dates.active').each(function () {
                            $(this).trigger('click');
                        })
                        $(this).addClass('active');
                        var v = $(wrapper).find('.date-init').data("dateVal"),
                            d,
                            input;

                        try {
                            if ($(wrapper).find('.date-init').data("dateVal") && $(wrapper).find('.date-end').data("dateVal")) {
                                $(wrapper).data("prv", $.datepicker.parseDate('dd/mm/yy', $(wrapper).find('.date-init').data("dateVal")).getTime());
                                if ($(wrapper).data("endDate") == true) {
                                    $(wrapper).find('.date-end').html('');
                                } else {
                                    $(wrapper).data("cur", $.datepicker.parseDate('dd/mm/yy', $(wrapper).find('.date-end').data("dateVal")).getTime());
                                }
                            } else if (v.length > 0) {
                                $(wrapper).data("prv", $(wrapper).data("cur"));
                                $(wrapper).data("cur", $.datepicker.parseDate('mm/dd/yy', v).getTime());
                            }
                        } catch (e) {
                            cur = prv = -1;
                        }

                        input = $(this).attr('class');
                        if (v > -1)
                            $(wrapper).find('.calendar').datepicker('setDate', new Date(cur));

                        $(wrapper).find('.calendar').datepicker('refresh').show();
                    }
                });
                $(wrapper).find('.date-end').on('click', function (e) {
                    if ($(wrapper).data("prv") != -1 && !$('.wrap-dates').hasClass('active')) {
                        $(calendar).datepicker('option', 'minDate', new Date($(wrapper).data("prv")));
                        $(wrapper).data("endDate", true);
                        $(wrapper).find('.calendar').addClass('end-date');
                    }
                });
            }

        })
    }
}
$(window).on('load', function () {
    Site._init();
});
(function (window, $) {
    var utils = function () {
        return {
            init: function () {
                // executa todos os eventos
                this.events.init.call(this);
            },

            events: {
                init: function () {
                    var self = this;

                    // fn que mantém largura e altura dos elementos fixed
                    self.keepadjust.call(self);

                    // fn que volta ao topo do módulo
                    self.backtop.call(self);

                    // eventos da pagina de busca
                    self.results.init.call(self);

                    // atualiza as informações dos boxes que serão movidos conforme o scroll
                    self.scroll.fixed.save();

                    // atualiza as informações do body e dos elementos
                    self.scroll.moveOne.init();

                    // força o scroll "iniciar do começo :)"
                    setTimeout(function () { window.scrollTo(0, 1); }, 0);

                    $(window)
                        .on('scroll', function () {
                            // fn que mantém largura e altura dos elementos fixed
                            self.keepadjust.call(self);

                            // oculta todos os popover                
                            $('.fixed .popover-toggler').next('.popover:visible').prev().trigger('click');

                            /* Apaga os boxes que estão abertos no scroll */
                            $('.container-installments-available .popover, .container-how-to-select-flights .popover').fadeOut(300);
                        })
                        // metodo que movem os elementos fixos
                        .on('scroll fixed', function () {
                            self.scroll.fixed.move.call(self.scroll.fixed);
                        })
                        // executa a função
                        .trigger('fixed')
                        // evento que define um box fixo sem movimento no restante da página							
                        .on('scroll moveOne', function () {
                            // atualiza informações do item que ficará fixo na tela
                            self.scroll.moveOne.update.call(self.scroll.moveOne);
                        })
                        // atualiza os dados conforme os resize da página
                        .on('resize', function () {
                            self.resize.call(self);
                        });

                    // evento que seleciona as linhas e colunas das tabelas
                    $('.fare-matrix').on({ 'mouseenter': this.table.on, 'mouseleave': this.table.off }, 'td:not(.date)');

                    $('.fare-toogle').on('click', function () {
                        $('.fare-matrix').toggle();
                        $('.fare-matrix').toggleClass('visible');
                        if ($('.fare-matrix').hasClass('visible')) {
                            var top = $('.fare-matrix').offset().top;
                            $('html, body').animate({
                                scrollTop: top - 300
                            })
                        }
                        $(window).trigger("resize");
                    });

                }
            },

            results: {
                init : function() {
                    this.results.ticket.call(this);
                },
                ticket: function () {
                    $('.box-result .info').on('click', '> span', function () {
                        var
                            // obj selecionado
                            self = $(this),
                            // linha selecionada
                            row = self.parents('tr');

                        self.find('b').text('Fechar');

                        // verifica se o item está aberto 
                        if (self.hasClass('open')) {
                            // remove classe open
                            self.removeClass('open').find('b').text('Info');

                            // remove elemento (indicações do ticket da linha)
                            row.next().remove();
                        // verifica se o item está fechado
                        } else {
                            var
                                // clone o objeto que contém as informações
                                ticket = self.addClass('open').next().clone(true),
                                // cria uma nova linha
                                newrow = $('<tr/>').addClass('newrow');

                            // cria novas colunas para cada div 
                            ticket.children('div').each(function (i) {
                                newrow.append($('<td valign="top" colspan="' + (!i ? '' : '5') + '"/>').append($(this)));
                            });

                            // insere e exibe informações do ticket
                            newrow.insertAfter(row).show();
                        }

                        // recalcula posicionamento dos boxes fixos laterais
                        $(window).trigger('resize');
                    });
                }
            },

            keepadjust: function () {
                $('.keepadjust').each(function () {
                    var w = $(this).parent().width(),
                        h = $(window).height() - ($('.main-menu-wrapper').height() + $('form.search').height());
                    $(this).css({ 'width': w, 'height': h });
                });
            },

            backtop: function () {
                $('.icon-back').on('click', function (e) {
                    e.preventDefault();                    
                    $(this).parents('.aside').scrollTop(0);
                });                
            },

            resize: function () {
                // atualiza as informações dos boxes que serão movidos conforme o scroll
                this.scroll.fixed.save.call(this.scroll.fixed);

                // metodo que movem os elementos fixos
                this.scroll.fixed.move.call(this.scroll.fixed);

                // atualiza informações do item que ficará fixo na tela
                this.scroll.moveOne.update.call(this.scroll.moveOne);                

                // fn que mantém largura dos elementos fixed
                this.keepadjust.call(this.resize);

                // oculta todos os popover                
                $('.fixed .popover-toggler').next('.popover:visible').prev().trigger('click');
            },

            scroll: {
                moveOne: {
                    just: '.just-move',
                    dont: '.dont-move',
                    init: function () {
                        // elemento
                        var dont = $(this.dont);

                        // verifica se existe elemento
                        if (!dont.length)
                            return;

                        // ajusta altura do body
                        $('body').css('min-height', 'inherit').css('min-height', $(document).height());

                        // redefine largura e posicionamento do elemento
                        dont.width(dont.width()).data('left', dont.offset().left);
                    },
                    update: function () {
                        var
                            // item que não será movido
                            dont = $(this.dont),
                            // item que será movido
                            just = $(this.just);

                        // verifica se existe elemento
                        if (!dont.length || !just.length)
                            return;

                        // calculo limite do scroll
                        var fim = just.offset().top + just.height() - $(window).height();

                        // verifica se é necessário haver o scroll
                        if (fim < 0) {
                            dont.removeAttr('style');
                            return;
                        }
                            // verifica se chegou ao fim
                        else if ($(window).scrollTop() > fim) {
                            dont.css({ position: 'static', paddingTop: fim, marginLeft: 0 });
                            // deixa fixo o elemento na tela
                        } else {
                            dont.css({ position: 'fixed', top: 0, paddingTop: 0, marginLeft: -$(window).scrollLeft() });
                        }
                    }
                },

                fixed: {
                    save: function () {
                        // objeto da função
                        var obj = this;

                        // remove todos os styles
                        $('.wrap-fixed .fixed').removeAttr('style');

                        // zera as variaveis
                        // dados do elemento que será movido
                        obj.dados = [];

                        // item que estará se movendo ([elemento, inicio, fim])
                        obj.ativo = null;

                        // define o sentido que irá o scroll
                        obj.pos = -1;

                        // loop de todos os itens que serão movidos dinamicamente
                        $('.wrap-fixed').each(function () {
                            var
                                // obj
                                self = $(this),
                                // elemento que será movido
                                fixed = $('.fixed', this);

                            // se não existir itens
                            if (!fixed.length)
                                return;

                            fixed
                                // guarda informações iniciais do left
                                .data('left', fixed.position().left)
                                // guarda informações iniciais do top
                                .data('top', fixed.position().top)
                                // guarda informações iniciais da largura
                                .data('width', fixed.width())
                                // guarda informações iniciais do marginTop
                                .data('marginTop', parseFloat(fixed.css('margin-top')));

                            // guarda informações dos objetos [elemento, inicio, fim]
                            
                            obj.dados.push([fixed, fixed.offset().top, self.offset().top + self.height() - fixed.height()]);
                        });

                        // reverte objeto de dados
                        obj.dados.reverse();
                    },

                    move: function () {
                        var
                            // altura dos itens que não contabilizaram no scroll
                            off = $('.main-menu-wrapper').height() + $('form.search').height() + 20,
                            // posição do scroll
                            y = $(window).scrollTop() + off,
                            // obj da função scroll
                            scroll = this;
                        // item que estará se movendo ([elemento, inicio, fim])
                        ativo = scroll.ativo,
                        // dados do elemento que será movido
                        ini = scroll.dados,
                        // sentido do scroll
                        pos = scroll.pos;

 
                        for (var i = 0; i < ini.length; i++) {
                            // ativa o elemento que será movido
                            if (y >= ini[i][1] && y < ini[i][2]) {
                                // atualiza objeto
                                scroll.ativo = ini[i];
                                var topIni = y - ini[i][1];

                                // define a configuração do elemento que será movido                                                                   
                                ini[i][0].css({ position: 'relative', top: topIni });
                                break;
                            } else {
                                if (y < ini[i][1]) {
                                    ini[i][0].removeAttr('style')
                                }
                                if (y > ini[i][2]) {
                                    var topIni = ini[i][2] - ini[i][1];
                                    ini[i][0].css({ position: 'relative', top: topIni });
                                }
                            }
                        }

                        // atualiza o sentido do scroll
                        scroll.pos = y;
                    }
                }
            },

            table: {
                on: function () {
                    var
                        // item selecionado
                        self = $(this),
                        // linha selecionada
                        row = self.parents('tr');

                    // seleciona os itens com base no item selecionado
                    self.parents('.fare-matrix').find('td:nth-child(' + (self.index() + 1) + ')').slice(0, row.index() + 1).add(row.find('td').not($(this).nextAll())).addClass('highlight');
                },
                off: function () {
                    // remove todo os highlight
                    $(this).parents('.fare-matrix').find('.highlight').removeClass('highlight');
                }
            }
        }
    }();    

    window.utils = utils;

    $(window).on('load', function () {
        utils.init.call(utils);
    });
})(window, jQuery);