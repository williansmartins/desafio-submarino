Site._module = function () {
    $("[data-behavior=flightfilter]").each(function (index, element) {
        Flightfilter.init(element)
    })
    $("button[type=reset]").click(function () {
        Flightfilter.reset($("[data-behavior=flightfilter]"));
    })

    $("[data-behavior='multiple-destination']").each(function (index, element) {
        MultipleDestination.Init(element);
    });

    $("[data-behavior='marquee']").each(function (index, element) {
        Marquee.Init(element);
    });

    $(".switch").each(function (index, Element) {
        var $Element = $(Element),
            $toggleSwitchComponet = $Element.closest(".toggle-switch");

        $Element.bootstrapSwitch();

        $("button", $toggleSwitchComponet).eq(0).click(function () {
            $Element.bootstrapSwitch('state', false);
        });


        $("button", $toggleSwitchComponet).eq(1).click(function () {
            $Element.bootstrapSwitch('state', true);
        });
    });
    if ($('html').hasClass('no-touch')) {
        $('.bootstrap-switch').each(function () {
            $(this).on('click', function () {
                var elem = $(this);
                if (elem.hasClass('bootstrap-switch-on')) {
                    $(this).find('input').prop('checked', false);
                    elem.removeClass('bootstrap-switch-on').addClass('bootstrap-switch-off');
                } else {
                    $(this).find('input').prop('checked', true);
                    elem.removeClass('bootstrap-switch-off').addClass('bootstrap-switch-on');
                }
            });
        })
    }

    //$(".spinner").spinner();

    $('.tooltip-toggler').tooltip();

    var $goTo = $("[data-behavior=goto]");
    if ($goTo.size() > 0) {
        ScrollTo.init($goTo);
    }

    $("[data-behavior=goto]").each(function (index, element) {
        var goTo = $($(element).data("goto")).offset().top - 180;
        $(this).bind("click", function () {
            $(window).scrollTop(goTo);
        });

    })
    var $slideToggle = $("[data-behavior=slidetoggle]");
    if ($slideToggle.size() > 0) {
        SlideToggle.init($slideToggle);
    }
    //$('.popover-hover').popover({ trigger: "hover" });

    $('.popover-hover').popover({
        //selector: '.popover-hover',
        html: true,
        //trigger: "manual",
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
    }).on('show.bs.popover', function (e) {
        var $popover = $(e.target);
        $('.popover-hover').not($popover).popover('hide');
        var width = $popover.data('width');
        if (width) {
            $($popover.data('container')).css("width", width);
        }
        var $popoverContainer = $($popover.data('container'));
        $(".seat-number", $popoverContainer).text($popover.data('seat'));
        $(".seat-description", $popoverContainer).text($popover.data('seatLocation'));
    }).on('shown.bs.popover', function (e) {
        var $popover = $(e.target);
        var cssClass = $popover.data('css-class');

        var $popoverContainer = $($popover.data('container'));

        $(".popover", $popoverContainer).on("mouseleave", function () {
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $popover.popover("hide")
                }
            }, 100);
        })
        $(".popover button", $popoverContainer).click(function () {
            // Retira classe dos outros botoes
            $popover.closest(".content").find(".popover-hover").removeClass("choice");
            // Adiciona classe ao botao
            $popover.addClass("choice");

            // Retorna as linhas dos assentos
            var airplaneSeats = $('#airplane-seats').find('.airplane-seats-line');
            // Retorna o box que mostra as posicoes selecionadas
            var airplaneSeatChoosed = $('.info-seats-selecteds').find('.on');

            // Retorna a posicao do assento
            var seatPosition = $popover.data('seat');
            // E a localizacao
            var seatText = $popover.data('seatLocation');

            // Atualiza o box
            airplaneSeatChoosed.find('.position').text(seatPosition);
            airplaneSeatChoosed.find('.location').text(seatText);
        })
        var cssClass = $popover.data("css-class");
        if (cssClass) {
            $popoverContainer.addClass(cssClass);
        }
        //$(".seat-number", $popoverContainer).text($popover.text());
        $(".seat-number", $popoverContainer).text($popover.data('seat'));
        $(".seat-description", $popoverContainer).text($popover.data('seatLocation'));

        $popoverContainer.find('.close').on('click', function (e) {
            $popover.popover('hide');
        });
    });
    $('body').popover({
        selector: '.popover-toggler',
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
    }).on('show.bs.popover', function (e) {
        var $popover = $(e.target);
        var width = $popover.data('width');
        if (width) {
            $($popover.data('container')).css("width", width);
        }
    }).on('shown.bs.popover', function (e) {
        var $popover = $(e.target);
        var cssClass = $popover.data('css-class');

        var $popoverContainer = $($popover.data('container'));

        var cssClass = $popover.data("css-class");
        if (cssClass) {
            $popoverContainer.addClass(cssClass);
        }

        $popoverContainer.find('.close').on('click', function (e) {
            $popover.popover('hide');
        });
    });

    $("[data-container='.container-how-to-add-insurance']").on('shown.bs.popover', function () {
        $(this).hide().next().show();
    });
    CardInformation.init();
};
var MultipleDestination = {
    Init: function (element) {
        this.container = element;
        this.BindClick();
    },
    container: null,
    BindClick: function (context) {
        var context = context || this.container,
            self = this;
        $("[data-behavior='add-fligth']", context).unbind("click").click(function () {
            self.AddFlight(false);
        });
        $("[data-behavior='add-return-fligth']", context).unbind("click").click(function () {
            self.AddFlight(true);
        });
        $(".expanded-area .flight > button", context).unbind("click").click(function () {
            self.DeleteFlight($(this).parent());
        });
        Site._calendar();
        Site._applyAutoComplete();
    },
    AddFlight: function (isFlightBack) {

        var quantidade = $(".flight.clearfix").length;
        if( quantidade < 6 ){
            var isFlightBack = isFlightBack || false;
            var sourceFlightStretch = $("#tmplFlightStretch").html();
            var sourceFlight = $("#tmplFlight").html();
            var templateFlightStretch = Handlebars.compile(sourceFlightStretch);
            var templateFlight = Handlebars.compile(sourceFlight);
            var context = { Index: $(".expanded-area .flight", this.container).size() + 1, Back: isFlightBack }
            var htmlFlightStretch = templateFlightStretch(context);
            var htmlFlight = templateFlight(context);
            $(".multiple-destination tr", this.container).append(htmlFlightStretch);
            $(htmlFlight).insertBefore($(".expanded-area footer", this.container));
            Site._multiExpandedSearchResize();
            this.BindClick();
            quantidade ++;
        }
    },
    DeleteFlight: function (flight) {
        var $flight = $(flight),
            order = $flight.data("flight-order"),
            $flightStretch = $(".flight-stretch", this.container);
        $flight.remove();

        $flightStretch.find("td").eq(order - 1).remove();

        $flightStretch.find("td").each(function (index, element) {
            $(element).find(".title").text("VOO " + (index + 1));
        });
        $(".expanded-area .flight", this.container).each(function (index, element) {
            $(element).data("flight-order", (index + 1)).find("button span").text("VOO " + (index + 1));
        });
        Site._multiExpandedSearchResize();
    }

}
var CardInformation = {
    init: function () {
        this.radio($(".card-information"));
    },
    radio: function ($container) {
        var $inputs = $("input:radio", $container);
        $inputs.each(function (index, element) {
            $(element).click(function () {
                $(this).closest("li").addClass("active").siblings().removeClass("active");
            });
        });
    }
};
var Flightfilter = {
    init: function (element) {
        var $element = $(element),
            $buttons = $("button", $element),
            flightsSelector = $($element).data("target-selector");
        $buttons.on("click", function () {           

            if ($(this).hasClass('on')) {
                Flightfilter.reset($("[data-behavior=flightfilter]"));
                $(this).removeClass('on')
            } else {
                Flightfilter.reset($("[data-behavior=flightfilter]"));
                Flightfilter.selection($(this).data("flight-number"), flightsSelector)
                $(this).addClass('on')
            }
        })

    },
    reset: function (element) {
        var $element = $(element),
            $buttons = $("button", $element),
            flightsSelector = $($element).data("target-selector");
            $(".on", $element).removeClass("on");
            Flightfilter.selection(0, flightsSelector);
    },
    selection: function (index, flightsSelector) {
        var eleIndex = index - 1;
        $(flightsSelector).each(function () {
            if (eleIndex == -1) {
                $("> table", this).removeClass("disable").removeClass("active");
                $('[data-behavior=flightfilter] label').removeClass("active");
                console.log('clean');
                return;
            }
            console.log('do');
            $("> table", this).addClass("disable").removeClass("active").eq(eleIndex).addClass("active").removeClass("disable");
        })
    }
}
var SlideToggle = {
    init: function ($elenments) {
        $elenments.each(function (index, element) {
            var $this = $(element),
                $target = $($this.data("target"));
            $this.click(function () {
                $this.toggleClass("closed")
                $target.slideToggle();
            })

        });
    }
}

var ScrollTo = {
    init: function ($elenments) {
        $elenments.each(function (index, element) {
            var goTo = $($(element).data("goto")).offset().top - 180;
            $(this).bind("click", function () {
                $(window).scrollTop(goTo);
            });
        });
        var $hideAfter = $elenments.filter("[data-show-after=true]");
        if ($hideAfter.size() > 0) {
            ScrollTo.showAfter($hideAfter);
        }
    },
    showAfter: function ($elements) {
        $(window).scroll(function () {
            var windowScrollTop = $(window).scrollTop();
            $elements.each(function (index, element) {
                var $element = $(element),
                    $target = $($element.data("show-after-target")),
                    targetOffsetTop = $target.offset().top - 185;
                if (windowScrollTop > targetOffsetTop) {
                    $elements.hide();
                    $element.show();
                } else {
                    $element.hide();
                }
            });
        });
    }
};
var Marquee = {
    Init: function (element) {
        Marquee.element = element;
        Marquee.GetData();
        Marquee.ApplyItem(0,true);
        Marquee.BindClick();
    },
    element: null,
    itens: [],
    currentItem: 0,
    GetData: function () {
        var $itens = $(".itens > .item", Marquee.element);
        $itens.each(function (index, element) {
            Marquee.itens.push({
                html: $(".detail", element).html(),
                image: $(".image", element).prop("src")
            });
        })
    },
    ApplyItem: function (item, isFirstLoad) {
        var item = (item != undefined) ? item : Marquee.currentItem;
        var nextItem = (Marquee.itens[item + 1] != undefined) ? item + 1 : 0;
        var $current = $(".current", Marquee.element);
        Marquee.currentItem = item;
        
        $current.css({
            "background-image": "url(" + Marquee.itens[item].image + ")"
        });
        $(".detail", $current).html(Marquee.itens[item].html);
        if (isFirstLoad) {
            $(".tab, .tab button", $current).css({
                "background-image": "url(" + Marquee.itens[nextItem].image + ")"
            });
            return
        }
        var $Marquee = $(Marquee.element);
        $(".current, .tab, .tab button", $Marquee).removeClass("transition");
        $Marquee.removeClass("moved").addClass("still");

        setTimeout(function () {
            $(".tab, .tab button", $current).css({
                "background-image": "url(" + Marquee.itens[nextItem].image + ")"
            });
            $(".current, .tab, .tab button", $Marquee).addClass("transition");

        }, 100);

    },
    BindClick: function () {
        $(".tab", Marquee.element).click(function () {
            Marquee.ShowNextItem()
        });
    },
    ShowNextItem: function () {
        var nextItem = (Marquee.itens[Marquee.currentItem + 1] != undefined) ? Marquee.currentItem + 1 : 0;
        var $Marquee = $(Marquee.element);
        $Marquee.removeClass("still").addClass("moved");
        setTimeout(function () {
           Marquee.ApplyItem(nextItem);
        }, 1500);
    }
}