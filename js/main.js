function filterFunction() {
    var input, filter, ul, label;
    input = $('#search');
    filter = input.val().toUpperCase();
    label = $('.label');
    for (i = 0; i < label.length; i++) {
        txtValue = label[i].textContent || label[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            label[i].parentElement.style.display = "";
        } else {
            label[i].parentElement.style.display = "none";
        }
    }
}
$(document).ready(function () {
    var countries = localStorage.getItem('countries');
    countries = countries.split(',');
    for (i = 0; i < countries.length; i++) {
        $('.checking').each(function () {
            if ($(this).attr('id') == countries[i] + '_') {
                $(this).addClass('saved active');
                console.log($(this))
            }
        });
    }

    $(document).on('click', '.countries_list li', function () {
        $(this).children('span').toggleClass('active');
    });

    $(document).on('click', '#switch', function () {
        if ($(this).val() == 0) {
            $(this).val(1);
            $('.checking').parents('li').css('display', 'none');
            $('.checking.active').parents('li').css('display', 'flex');
        } else {
            $(this).val(0);
            $('.checking').parents('li').css('display', 'flex');
        }
    });

    $(document).on('click', '.clear_all', function () {
        $('.checking.active').removeClass('active');
        $('.checking.saved').removeClass('saved');
    });

    $(document).on('click', '#submit', function (e) {
        $('.checking.active').addClass('saved');
        var selectedCountries = $('.checking.active');
        var countriesArray = [];
        $(selectedCountries).each(function () {
            countriesArray.push($(this).attr('id').replace('_', ''));
        });
        localStorage.setItem('countries', countriesArray.toString());
    })
})