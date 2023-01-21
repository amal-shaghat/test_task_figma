$(document).ready(function () {
    var allCountries = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
        'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
        'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Côte d\'Ivoire', 'Cabo Verde',
        'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo',
        'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
        'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
        'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
        'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
        'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
        'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
        'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
        'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
        'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
        'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
        'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
        'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
        'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
        'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
        'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu',
        'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ];
    var list = '';
    for (j = 0; j < allCountries.length; j++) {
        var countryName = allCountries[j].toLowerCase().replace(/\s+/g, '_');
        list += '<li class="country_name">' +
            '     <span class="check" id="country_' + countryName + '">' +
            '         <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.5656 2.38749L6.19322 9.75932C5.64729 10.3054 4.76171 10.3054 4.21526 9.75932L0.409603 5.95339C-0.136534 5.40735 -0.136534 4.52166 0.409603 3.97553C0.955845 3.42928 1.84136 3.42928 2.38736 3.97532L5.20453 6.79253L11.5875 0.409526C12.1337 -0.136716 13.0193 -0.136302 13.5654 0.409526C14.1114 0.955664 14.1114 1.84104 13.5656 2.38749Z" fill="white"/></svg>' +
            '     </span>' +
            '     <label class="label" for="' + countryName + '">' + allCountries[j] + '</label>' +
            '</li>'
    }
    $('.countries_list').html(list);

    var searchStr;

    var savedCountries = localStorage.getItem('countries');
    if (savedCountries) {
        savedCountries = savedCountries.split(',');
        for (i = 0; i < savedCountries.length; i++) {
            $('#country_' + savedCountries[i]).addClass('saved active');
        }
    }

    $(document).on('click', '.countries_list li', function () {
        $(this).children('span').toggleClass('active');
    });

    $(document).on('click', '#switch', function () {
        if ($(this).val() == 0) {
            $(this).val(1);
            $('.check').parents('li').css('display', 'none');
            $('.check.active').parents('li').css('display', 'flex');
        } else {
            $(this).val(0);
            $('.check').parents('li').css('display', 'flex');
        }
        if (searchStr) {
            searchCountries();
        }
    });

    $(document).on('keyup', '#search', function () {
        searchCountries();
    });

    $(document).on('click', '#submit', function (e) {
        $('.check.active').addClass('saved');
        var selectedCountries = $('.check.active');
        var countriesArray = [];
        $(selectedCountries).each(function () {
            countriesArray.push($(this).attr('id').replace('country_', ''));
        });
        localStorage.setItem('countries', countriesArray.toString());
    });

    $(document).on('click', '.clear_all', function () {
        $('.check.active').removeClass('active');
        $('.check.saved').removeClass('saved');
        localStorage.setItem('countries', '');
        searchStr = '';
        $('#search').val('');
        searchCountries();
        if ($('#switch').val() == 1) {
            $('#switch').trigger('click');
        }
    });

    function searchCountries() {
        searchStr = $('#search').val().toUpperCase();
        var labels = $('.label');
        if ($('#switch').val() == 1) {
            labels = $('.check.active').parents('li').children('.label');
        }
        labels.each(function () {
            if ($(this).text().toUpperCase().indexOf(searchStr) > -1) {
                $(this).parents('li').css('display', '');
            } else {
                $(this).parents('li').css('display', 'none');
            }
        });
    }
})
