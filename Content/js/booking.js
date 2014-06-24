$(document).ready(function () {
    $("#insurePassagerAll").on("click", function () {
        var $element = $(this);
        $('input', $element.parent().parent().next()).each(function () {
            if ($element.is(":checked")) {
                if ($(this).prop("disabled") == false) {
                    $(this).prop("checked", "checked");
                }
            } else {
                $(this).prop("checked", null);
            }
        });
    });

    $("#buttomAdd").on("click", function () {
        var index = parseInt($('#hdnCountItens').val()) + 1;
        $('#hdnCountItens').val(index);
        var parameters = { 'Index': index };
        var source = $('#tmplPhones').html();
        template = Handlebars.compile(source);
        var html = template(parameters);
        $('#itemsPhone').append(html);
        $('input[data-mask="phone"]').mask('(00) 0000-0000', {
           onKeyPress: function (phone, e, currentField, options) {
               var new_sp_phone = phone.match(/^(\(11\) 9(5[0-9]|6[0-9]|7[01234569]|8[0-9]|9[0-9])[0-9]{1})/g);
               new_sp_phone ? $(currentField).mask('(00) 00000-0000', options) : $(currentField).mask('(00) 0000-0000', options)
           }
       });
    });

    $("input:radio[name=payment-type]").change(function () {
        var value = $("input:radio[name=payment-type]:checked").val();
        console.log(value);
        if (value == "card-1") {
            $("#secondCard").hide();
        } else if (value == "card-2") {
            $("#secondCard").show();
        }
    });
    $("#buttomRemoveCard").on("click", function () {
        $("#paymentType1").prop('checked', true);
        $("#secondCard").hide();
    });
});

function itemsRemove(index) {
    $("#item_" + index).remove();
}