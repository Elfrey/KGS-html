/**
 * @description Объект с датами событий
 * @type {Object}
 */
var todayEvents = {
    2012: {
        1: {
            4: [
                {
                    time: "8:00",
                    title: "Пора на работу",
                    desc: ""
                }//event end
            ]//day end
        },//month end
        3: {
            19: [
                {
                    time: "9:30",
                    title: "Совещание у директора",
                    desc: "<p>Над таблицей указано общее количество найденных строк, а также даются ссылки для перехода на следующие страницы (если список объектов не уместился в одном окне).</p>" +
                        "<p>Для работы с конкретным объектом его нужно выделить (щелкнуть мышкой в крайнем левом поле соответствующей строки – поставить флажок). Нажатием на кнопку «Действия» открывается список возможных операций  </p>"
                },//event end
                {
                    time: "11:30",
                    title: "Планерка",
                    desc: ""
                }//event end
            ],//day end
            8: [
                {
                    time: "9:30",
                    title: "Совещание у директора",
                    desc: "<p>Над таблицей указано общее количество найденных строк, а также даются ссылки для перехода на следующие страницы (если список объектов не уместился в одном окне).</p>" +
                        "<p>Для работы с конкретным объектом его нужно выделить (щелкнуть мышкой в крайнем левом поле соответствующей строки – поставить флажок). Нажатием на кнопку «Действия» открывается список возможных операций  </p>"
                }
            ],//day end
            14: [
                {
                    time: "9:30",
                    title: "Совещание у директора",
                    desc: "<p>Над таблицей указано общее количество найденных строк, а также даются ссылки для перехода на следующие страницы (если список объектов не уместился в одном окне).</p>" +
                        "<p>Для работы с конкретным объектом его нужно выделить (щелкнуть мышкой в крайнем левом поле соответствующей строки – поставить флажок). Нажатием на кнопку «Действия» открывается список возможных операций  </p>"
                },//event end
                {
                    time: "11:30",
                    title: "Планерка",
                    desc: ""
                },//event end
                {
                    time: "17:00",
                    title: "Вечерняя встреча руководителей",
                    desc: ""
                },//event end
                {
                    time: "19:30",
                    title: "Встреча по внедрению КГС",
                    desc: "<p>Над таблицей указано общее количество найденных строк, а также даются ссылки для перехода на следующие страницы (если список объектов не уместился в одном окне).</p>"
                }//event end
            ],//day end
            20: [
                {
                    time: "9:30",
                    title: "Совещание у директора",
                    desc: "<p>Над таблицей указано общее количество найденных строк, а также даются ссылки для перехода на следующие страницы (если список объектов не уместился в одном окне).</p>" +
                        "<p>Для работы с конкретным объектом его нужно выделить (щелкнуть мышкой в крайнем левом поле соответствующей строки – поставить флажок). Нажатием на кнопку «Действия» открывается список возможных операций  </p>"
                },//event end
                {
                    time: "11:30",
                    title: "Планерка",
                    desc: ""
                },//event end
                {
                    time: "12:30",
                    title: "Планерка",
                    desc: ""
                }//event end
            ]//day end
        },//month end
        4: {
            3: [
                {
                    time: "8:00",
                    title: "Пора на работу",
                    desc: ""
                }//event end
            ]//day end
        }//month end
    }//year end
};


$(function(){

    // @TODO тут возможно необходимо написать контроллер на получение списка событий через ajax
    /**
     * @description получение и генерация списка событий
     *
     * @param {JSON} events  - объект с событиями
     * @param {Number} day  - День  (по умолчанию сегодня)
     * @param {Number} month - Месяц (по умолчанию текущий)
     * @param {Number} year - Год  (по умолчанию текущий)
     */
    var calendar = {
        today: new Date(),

        curDate: new Date(), // Текущая дата, для инициализации
        $calendar: $("#calendar-block .calendar-month"), //{jQuery} объект календаря
        $eventContainer: $("#calendar-block .events"), //{jQuery} объект списка событий
        $monthNavigate: $(".month-navigate"), //{jQuery} объект с заголовком и кнопками переключения месяцев
        $prevMonthButton: function(){ //{jQuery} объект кнопки переключения на предыдущий месяц
            return this.$monthNavigate.find("#prev-month");
        },
        $nextMonthButton: function(){ //{jQuery} объект кнопки переключения на следующий месяц
            return this.$monthNavigate.find("#next-month");
        },

        templates: { //Щаблоны
            eventHeadTemplate: '<script id="eventHeadTemplate" type="text/x-jQuery-tmpl">' + //шаблон шапки событий
                '<h2 class="event-day-title">${day} ${month} <span>${dayName}</span></h2>' +
                '<ul class="event-list"></ul>' +
                '</script>',

            eventsTemplate: '<script id="eventsTemplate" type="text/x-jQuery-tmpl">' + //Шаблон события
                '<li data-time="${time}">' +
                '   <h3>${title}</h3>' +
                '   {{if desc}}<div>{{html desc}}</div>{{/if}}' +
                '</li>' +
                '</script>',

            noEvents: '<li>На этот день нет записей</li>', //Когда событий нет
            calendarTdTemplate: '<script id="calendarTdTemplate" type="text/x-jQuery-tmpl">' + //шаблон ячеек календаря
                '{{each td}}' +
                '{{if $value.first}}<tr>{{/if}}' +
                '<td class="${$value.tdClass}" data-day="${$value.day}" data-month="${$value.month}" data-year="${$value.year}"></td>' +
                '{{if $value.last}}</tr>{{/if}}' +
                '{{/each}}' +
                '</script>',
            mothesSelecter: '<script id="calendarTdTemplate" type="text/x-jQuery-tmpl">' +
                '<ul>' +
                '{{each month}}' +
                '<li data-month="${$value.id}">${value.title}</li>' +
                '{{/each}}' +
                '</ul>' +
                '</script>'
        },

        classes: { //Классы
            curDay: "current-day", //Класс текущего дня
            activeMonth: "active-month", //Класс активного месяцы
            otherMonth: "inactive-day", //Класс предыдущего и следующего месяца
            weekend: "weekend" //Класс конца недели(не выходных)
        },

        monthesR: ["января","февраля","марта","апреля","майя","июня","июля","августа","сентября", "октября", "ноября", "декабря"], //масисв месяцев в родительном падеже
        eventsCountText: ["встреча","встречи","встреч"],
        daysAr:  $.datepicker.regional['ru'].dayNames, //массив дней, берем из дейтпикера, все равно он подключен
        monthAr: $.datepicker.regional['ru'].monthNames, //массив месяцев
        daysInMonth: [31,28,31,30,31,30,31,31,30,31,30,31], //Массив количества дней в месцах


        /**
         * @description - инициализация объекта
         */
        init: function(){

            this.curDay = this.curDate.getDate();
            this.curMonth = this.curDate.getMonth();
            this.curYear = this.curDate.getFullYear();

            this.generateCalendar(this.curDate);

            this.generateMonthSelector();

            this.prepareCalendar();
            this.updateTitle();
            this.markToday();
            this.getEventsList();
            this.getEventsByDay();
            this.binds();
            this.markEventsOnCalendar();
        },


        /**
         * @description аналогично init()
         */
        changeMonth: function (){

            this.curDay = this.curDate.getDate();
            this.curMonth = this.curDate.getMonth();
            this.curYear = this.curDate.getFullYear();

            this.generateCalendar(this.curDate);

            this.prepareCalendar();
            this.updateTitle();
            this.markToday();
            this.getEventsList();
            this.binds();
            this.markEventsOnCalendar();
        },

        /**
         * @description изменение текущего месяца
         * @param month {INT} - индекс месяца, начинается с 0
         */
        setMonth: function(month){

            this.curMonth = month;
            this.curDate = new Date(this.curYear, month, 1);
            this.changeMonth();
        },
        /**
         * @description Одновляет заголовок с месяцеи
         */
        updateTitle: function(){
            this.$monthNavigate.find("h2").text(this.monthAr[this.curMonth]);
        },



        /**
         * @description Генерация календаря
         */
        generateCalendar: function(){
            var self = this,


                month = self.curMonth,
                year = self.curYear,


                firstDayDate = new Date(year,month,1),
                firstDay = firstDayDate.getDay(),

                prevMonth = month == 0 ? 11 : month-1,
                prevYear = prevMonth == 11 ? year - 1 : year,
                prevDays = self.getDaysInMonth(prevMonth, prevYear),
                curDaysCount = self.getDaysInMonth(month,year),
                i = 0,

                tdData = {
                    td: []
                },
                tmpData;


            // @TODO понять, нахуя я тут это дублирую
            firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay-1;

            for (j=0;j<42;j++){

                if ((j<firstDay)){
                    tdData.td.push({
                        tdClass: self.classes.otherMonth,
                        day: (prevDays-firstDay+j+1),
                        month: prevMonth,
                        year: prevYear
                    });
                } else if ((j>=firstDay+curDaysCount)) {
                    i = i+1;

                    tdData.td.push({
                        tdClass: self.classes.otherMonth,
                        day: i,
                        month: "",
                        year: ""
                    });
                }else{

                    tdData.td.push({
                        tdClass: self.classes.activeMonth,
                        day: (j-firstDay+1),
                        month: month,
                        year: year
                    });
                }
                if ((j+1)%7==1){
                    tdData.td[j].first = true;
                }else if (j%7==6){
                    tdData.td[j].last = true;
                }
            }

            tmpData = $(self.templates.calendarTdTemplate).tmpl(tdData)
            $(tmpData).filter(function(){
                return $(this).find("td."+self.classes.activeMonth).size()==0
            }).hide();

            self.$calendar.find("tbody").html(tmpData);
            delete tmpData;
        },

        /**
         * @description генерация списко месяцев
         */
        generateMonthSelector: function(){
            var pos = this.$monthNavigate.position(),
                monthesSelectorData = "<ul>"
                self = this,
                $monthTitle = self.$monthNavigate.find("h2"),
                curClass = "";

            for (var i=0;i<self.monthAr.length;i++){
                curClass = i==self.curMonth ? curClass = "active" : "";

                monthesSelectorData+='<li><a data-id="'+i+'" href="#'+self.monthAr[i]+'" class="'+curClass+'">'+self.monthAr[i]+'</a></li>';
            }
            monthesSelectorData+="</ul>";

            $monthTitle.kPopup({
                class: "month-selector", //класс самого окна
                container: $monthTitle.parent(),
                itemData: monthesSelectorData, //откуда брать контент
                "styles": { //стили
                    backgroundColor: "#fff",
                    display: "block",
                    zIndex: '102',
                    position: "absolute",
                    top: pos.top+45,
                    left: pos.left+40
                },
                afterOpenCallback: function(popup){
                    var $popup = $(popup);

                    $popup.find("a").on("click",function(event){
                        event.preventDefault();

                        var $this = $(this),
                            month = $this.data("id");

                        $this.parents("ul").find("a.active").removeClass("active");
                        $this.addClass("active");
                        self.setMonth(month);
                        self.changeMonth();

                        $.kPopup.removePopup();
                        return false;
                    });
                }
            });
        },

        /**
         * @description Получаем количество дней в месяце
         *
         * @param {Number} month
         * @param {Number} year
         */
        getDaysInMonth: function (month,year)  {
            var rv = this.daysInMonth[month];
            rv = (month==1)?
                (new Date(year,1,29).getDate() == 29)?29:rv:rv;
            return rv;
        },
        /**
         * @description - установка событий
         */
        binds: function(){
            var self = this;

            /**
             * @description клик на ячейку с событиями
             */
            self.$calendar
                .on("click", "tbody td.active", function(event){
                event.preventDefault();
                var $td = $(this);

                self.curDay = $td.data("day");
                self.getEventsByDay();
            });

            /**
             * @description клик на "Месяц назад"
             */
            self.$prevMonthButton().off(".eCalendar").on("click.eCalendar",function(event){
                event.preventDefault();

                var prev_m = self.curMonth == 0 ? 11 : self.curMonth-1,
                    prev_y = prev_m == 11 ? self.curYear - 1 : self.curYear;

                self.curMonth = prev_m;
                self.curYear = prev_y;
                self.curDate = new Date(prev_y, prev_m, 1);
                self.changeMonth();
            });

            /**
             * @description клик на "Месяц вперед"
             */
            self.$nextMonthButton().off(".eCalendar").on("click.eCalendar",function(event){
                event.preventDefault();

                var next_m = self.curMonth == 11 ? 0 : self.curMonth + 1,
                    next_y = next_m == 0 ? self.curYear + 1 : self.curYear;

                self.curMonth = next_m;
                self.curYear = next_y;
                self.curDate = new Date(next_y, next_m, 1);
                self.changeMonth();
            });
        },

        /**
         * @description Отмечаем текущую дату
         */
        // @TODO в идеале это делает сервер
        markToday: function(){
            var self = this;
            self.$calendar.find("tbody td."+self.classes.activeMonth).filter(function(){
                return parseInt($(this).data('day')) === self.today.getDate()
                    && parseInt($(this).data('month')) === self.today.getMonth()
                    && parseInt($(this).data('year')) === self.today.getFullYear();
            }).addClass(self.classes.curDay);
        },


        /**
         * @description получение списка событий для даты this.curDate
         */
        getEventsByDay: function(){
            var self = this,
                dayTitle = {
                    day: self.curDay,
                    month: self.monthTextByNumber(self.curMonth),
                    dayName: self.dayTextByNumber(self.curDate.getUTCDay())
                };
            var eventList = [];

            if (self.events[self.curYear]){
                if (self.events[self.curYear][self.curMonth]) {
                    if (self.events[self.curYear][self.curMonth][self.curDay]){
                        eventList = self.events[self.curYear][self.curMonth][self.curDay]
                    }
                }
            }

            self.$eventContainer.empty();
            $eventHeadTemplate = $(self.templates.eventHeadTemplate).tmpl(dayTitle).appendTo(self.$eventContainer);

            if (eventList.length>0){
                $(self.templates.eventsTemplate).tmpl(eventList).appendTo($eventHeadTemplate.filter("ul"));
            }else{
                $(".event-list").find("li").remove()
                    .end().append(self.templates.noEvents);
            }
        },

        /**
         * @description - получаем весь список событий.
         */
        //@TODO надо переделать на ajax
        getEventsList: function(){
            var self = this;
            self.events = todayEvents || {};

        },

        /**
         * @description Отмечаем события на календаре кружочками или цифрой, если событий больше 3х
         */
        markEventsOnCalendar: function(){
            var self = this,
                $tbody = self.$calendar.find("tbody");
            var monthEvents = {};

            if (self.events && self.events[self.curYear] && self.events[self.curYear][self.curMonth]) {
                monthEvents = self.events[self.curYear][self.curMonth];

                $.each(monthEvents, function(index, item){
                    var $div = $tbody.find("td."+self.classes.activeMonth+"[data-day="+index+"] div");
                    if (item.length>3) {
                        $div.html("<span>"+item.length+"</span> <br/> "+plural_str(item.length, self.eventsCountText[0], self.eventsCountText[1], self.eventsCountText[2]));
                    } else {
                        for (var i=0, count=item.length;i<count;i++){
                            $div.append("<icon class=\"event-mark\" />");
                        }
                    }
                    $div.parent().addClass("active");
                });
            }
        },

        /**
         * @description оформляем календарь нужными аттрибутами и тегами
         */
        prepareCalendar: function(){

            this.$calendar.find("tbody td").each(function(){
                var $td = $(this)
                day = $td.data("day");
                $td.prepend("<div class=\"events-count\"></div>");
            })

        },

        /**
         * @description получение название месяца по его номеру
         *
         * @param {Number} month - месяц
         * @param {Array} monthArray - массив месяцев, по умолчанию this.morthesR
         */
        monthTextByNumber: function (month, monthArray){
            monthArray = monthArray || this.monthesR;
            return monthArray[month];
        },

        /**
         * @description получаем имя дня
         * @param {Number} day - День
         */
        dayTextByNumber: function(day){
            return this.daysAr[day];
        }
    };


    calendar.init();

});