(function(c, a) {
    var b = {};
    b.name = "Strategic Partnerships namespace";
    b.gElm = function(d) {
        return (d) ? c.getElementById(d) : false;
    };
    b.gSelA = function(d) {
        return (d) ? c.querySelectorAll(d) : false;
    };
    b.gSel = function(d) {
        return (d) ? c.querySelector(d) : false;
    };
    b.example = {
        calendarStyling: function() {
            var f = b.gSel,
                h = b.gSelA,
                d = b.gElm,
                calSelBg = f('.bos-calendar__date--b_calSelected'),
                calSelTxt = f('.bos-calendar__date--b_calSelected a'),
                calDayNms = h('.bos_calendar_day-name');

                calDayNms.forEach(function(elm) {
                    elm.style.color = d('calendar_daynames_color').value;
                });
                calSelBg.style.background = d('calendar_selected_bgcolor').value;
                calSelTxt.style.color = d('calendar_selected_textcolor').value;
        }
    };

    b.starting = {
        defaultSettings: function() {
            var d = b.gElm,
                f = b.gSelA,
                sb_width = d('flexi_searchbox'),
                date_text = f('.bos-date-field__display'),
                date_wrapper = f('.bos-dates__col');
            if (sb_width && sb_width.offsetWidth < 280) {

                date_text.forEach(function(elm) {
                    elm.style.fontSize = '12px';
                });
            };
            if (sb_width && sb_width.offsetWidth < 260) {
                sb_width.classList.add('smaller');
                date_wrapper.forEach((elm, index) => {
                    elm.style.width = '100%';
                    if (index == 0) {
                        elm.style.marginBottom = '10px';
                    }
                });
            }
        }
    };

    b.validation = {
        validSearch: function() {
            var idf = jQuery('#b_idf:checked').val();
            //alert(idf);
            if (idf != 'on') { // check if idf checkbox is checked and exclude date validation
                if (!this.checkDestination() || !this.checkDates()) {
                    return false;
                }
            }
        },
        checkDestination: function() {
            var d = b.gElm("b_destination").value || "";
            if (d) {
                return true;
            }
            this.showFormError(b.vars.errors.destinationErrorMsg,
                "searchBox_error_msg");
            return false;
        },
        checkDates: function() {
            var j = b.gElm,
                // k = parseInt(j("checkin").value),
                f = j("checkin").value,
                p = f.split(/-/),
                g = new Date(p[0], p[1] - 1, p[2]),
                // h = parseInt(j("b_checkout_day").value),
                l = j("checkout").value,
                i = l.split(/-/),
                n = new Date(i[0], i[1] - 1, i[2]),
                o = b.vars.gen.b_todays_date.split(/-/),
                m = j("b_checkin_input") || false,
                d = m && m.offsetWidth ? true : false;
            textCheckOut = j("b_checkout_input") || false;
            textCheckOutShown = m && m.offsetWidth ? true : false;
            if (parseInt(i[1]) === parseInt(o[1]) && k < parseInt(o[2])) {
                this.showFormError(b.vars.errors.dateInThePast,
                    "searchBox_dates_error_msg");
                return false;
            }
            if (n.getTime() <= g.getTime()) {
                this.showFormError(b.vars.errors.cObeforeCI, "searchBox_dates_error_msg");
                return false;
            }
            if ((n - g) / (1000 * 60 * 60 * 24) > 30) {
                this.showFormError(b.vars.errors.tooManyDays,
                    "searchBox_dates_error_msg");
                return false;
            }
            return true;
        },
        showFormError: function(f, d) {
            if (!f || !d) {
                return false;
            }
            var e = c.getElementById(d),
                g = function() {
                    jQuery(e).fadeOut("default");
                };
            e.innerHTML = f;
            e.style.cursor = "pointer";
            jQuery(e).fadeIn("default", function() {
                var h = this;
                if (h.addEventListener) {
                    h.addEventListener("click", g, false);
                }
                if (h.attachEvent) {
                    h.attachEvent("onclick", g);
                }
                setTimeout(g, 5000);
            });
        }
    };
    a.sp = b;
    a.e = b.gElm;
})(document, window);

(function($) {
    $(function() {
        sp.starting.defaultSettings();

        $(document).on('click', '#b_searchCheckInDate, #b_searchCheckOutDate', function() {
            var $datesVar = $(this).data('dates');
            showCalendar('b_calendarPopup', $datesVar, 'b_frm');
        });

        $(document).on('click', '#b_dest_unlocker', function(event){       
            event.preventDefault();
            $("#b_dest_type, #b_dest_id, #b_open_search").remove(); 
            $("#b_destination").removeAttr("readonly");
            $("#b_destination").val('');
            $("#b_destination").attr("placeholder", objectL10n.placeholder);
            $("#b_dest_unlocker").remove();
            // $("#b_destination").css({
            //     "background": "#FFFFFF",
            //     "color": "#003580"
            // });
            
        });

        $(document).on('hover', '#b_dest_unlocker', function(event){  
        //$("#b_dest_unlocker").hover(function() {
            $("#b_open_search").toggle();
        });

        $("#bos_info_displayer").click(function(event) {
            event.preventDefault();
            $("#bos_info_box").toggle();
        });

    });
})(jQuery);