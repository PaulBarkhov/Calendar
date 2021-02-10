document.addEventListener("DOMContentLoaded", () => {
    //MENU
    const menu = document.querySelector("menu");
    const menuButton = document.querySelector("#menuButton");

    menuButton.addEventListener("click", () => {
        menu.classList.toggle("expanded");
    })

    //ADD TASK
    const addButton = document.querySelector("#addButton"),
          main = document.querySelector("main"),
          content = document.querySelector(".content"),
          add__task__window__wrapper = document.querySelector(".add__task__window__wrapper"),
          
          set__task__name = document.querySelector(".set__task__name"),
          task__name__OK__button = document.querySelector("#task__name__OK__button"),
          task__name__input = document.querySelector("#name"),

          set__task__color = document.querySelector(".set__task__color"),
          task__colors = document.querySelectorAll("th"),
          task__color__back__button = document.querySelector("#task__color__back__button"),

          set__task__time = document.querySelector(".set__task__time"),
          clock = document.querySelector(".clock"),
          clockHours = clock.querySelector(".hours"),
          clockMinutes = clock.querySelector(".minutes"),
          task__time__back__button = document.querySelector("#task__time__back__button"),
          task__time__OK__button = document.querySelector("#task__time__OK__button");

    let object = {
        id: "",
        name: "New task",
        color: "blue",
        date: "",
        time: "",
        notification_10min: "checked",
        notification_1hour: "",
        notification_1day: ""
    }

        let localData = [];
        const updateLocalData = () => {
            localData = [];
            for (let i = 0; i <= localStorage.getItem('index'); i++) {
                if (JSON.parse(localStorage.getItem(`task${i}`))) {
                    localData.push(JSON.parse(localStorage.getItem(`task${i}`)));
                }
            }
        }
        updateLocalData();


        let day = new Date().getDate(),
        month = new Date().getMonth() + 1;
        year = new Date().getFullYear();

        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }

        object.date = day + "." + month + "." + year;

    // CLOCK
    let hours = 8,
        minutes = 0;

    const buildClock = () => {
        clockHours.querySelectorAll(".hour").forEach(item => {item.remove()});
        for (let i = -2; i <= 26; i++) {
            if (i == -2) {
                clockHours.innerHTML += `<div class="hour">22</div>`;
            }
            if (i == -1) {
                clockHours.innerHTML += `<div class="hour">23</div>`;
            }
            if (i > -1 && i < 24) {
                clockHours.innerHTML += `<div class="hour">${i < 10 ? "0" + i : i}</div>`;
            }
            if (i == 24) {
                clockHours.innerHTML += `<div class="hour">00</div>`;
            }
            if (i == 25) {
                clockHours.innerHTML += `<div class="hour">01</div>`;
            }
            if (i == 26) {
                clockHours.innerHTML += `<div class="hour">02</div>`;
            }
        }

        clockMinutes.querySelectorAll(".minute").forEach(item => {item.remove()});
        for (let i = -2; i <= 62; i++) {
            if (i == -2) {
                clockMinutes.innerHTML += `<div class="minute">58</div>`;
            }
            if (i == -1) {
                clockMinutes.innerHTML += `<div class="minute">59</div>`;
            }
            if (i > -1 && i < 60) {
                clockMinutes.innerHTML += `<div class="minute">${i < 10 ? "0" + i : i}</div>`;
            }
            if (i == 60) {
                clockMinutes.innerHTML += `<div class="minute">00</div>`;
            }
            if (i == 61) {
                clockMinutes.innerHTML += `<div class="minute">01</div>`;
            }
            if (i == 62) {
                clockMinutes.innerHTML += `<div class="minute">02</div>`;
            }
        }

        clockHours.scrollTo(0,720);
        clockMinutes.scrollTo(0,80);
    }

    buildClock();

    clockHours.addEventListener("scroll", () => {
        hours = Math.floor(clockHours.scrollTop / 80 - 1);
        if (hours == -1) {
            clockHours.scrollTo(0,1920);
        }
        if (hours == 24) {
            clockHours.scrollTo(0,80);
        }
    });

    clockMinutes.addEventListener("scroll", () => {
        minutes = Math.floor(clockMinutes.scrollTop / 80 - 1);
        if (minutes == -1) {
            clockMinutes.scrollTo(0,4800);
        }
        if (minutes == 60) {
            clockMinutes.scrollTo(0,80);
        }
    });

    const buildTask = (clickedDay) => {
        updateLocalData();
        document.querySelectorAll(".task").forEach(item => {item.remove()});
        localData.forEach(({date, time, name, color, notification_10min, notification_1hour, notification_1day, id}) => {        
            if (date == clickedDay) {
                task = document.createElement("div");
                task.setAttribute("class", "task");
                task.innerHTML = `
            
                    <div class="header">
                        <div class="id hide">${id}</div>
                        <div class="taskColor" style="background: ${color}"></div>
                        <div class="taskName">${name}</div>
                        <div class="taskTime">${time}</div>
                    </div>
        
                    <div class="main">
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <div class="buttons">
                            <button class="done">✔</button>
                            <button>🖊</button>
                            <button class="delete">❌</button>
                        </div>
                    </div>
        
                    <div class="right">
                        <div class="notifications">
                            <div>
                                <p>1 day</p>
    
                                <label class="switch">
                                    <input type="checkbox" ${notification_1day}>
                                    <span class="slider"></span>
                                </label>
                                <hr>
                            </div>
    
                            <div>
                                <p>1 hour</p>
                                
                                <label class="switch">
                                    <input type="checkbox" ${notification_1hour}>
                                    <span class="slider"></span>
                                </label>
                                <hr>
                            </div>
                            
                            <div>
                                <p>10 min</p>
            
                                <label class="switch">
                                    <input type="checkbox" ${notification_10min}>
                                    <span class="slider"></span>
                                </label> 
                            </div>
                        </div>`
        
                content.append(task);
    
                task.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (event.target.classList.contains("taskName") || event.target.classList.contains("taskColor") || event.target.classList.contains("taskDate") || event.target.classList.contains("taskTime")) {
                        event.target.parentElement.parentElement.classList.toggle("taskExpanded");
                    }
                    if (event.target.classList.contains("done")) {
                        event.target.parentElement.parentElement.parentElement.classList.toggle("taskExpanded");
                    }
                    else {
                        event.target.parentElement.classList.toggle("taskExpanded");
                    }
                });        

                task.querySelector(".delete").addEventListener("click", (event) => {
                    localData.forEach(({id}) => {
                        if (id == task.querySelector(".id").innerHTML) {
                            localStorage.removeItem(`task${id}`);
                            updateLocalData();
                        }
                    });
                    const parent = event.target.parentElement.parentElement.parentElement;
                    parent.classList.remove("taskExpanded");
                    parent.addEventListener("transitionend", () => {
                        parent.style.transition = ".3s linear";
                        parent.style.transform = "translate(-120%)";
                        parent.addEventListener("transitionend", () => {
                            parent.style.maxHeight = "0px";
                            parent.addEventListener("transitionend", () => {
                                buildCalendar(monthIndex);
                            });
                        });
                    });
                });
            }
        });
    }

    addButton.addEventListener("click", () => { 
        if (main.querySelector(".main__inner").classList.contains("active")) {
            main.querySelector(".main__inner").style.transform="translate(0,0)";
            main.querySelector(".main__inner").classList.remove("active");
    
            menu.classList.remove("expanded");
    
            object.name = "";
            object.color = "";
            object.date = "";
            object.time = "";
            object.notification_10min = "";
            object.notification_1hour = "";
            object.notification_1day = "";

            addButton.style.transform = "rotate(0deg)";
        }
        else {
            main.querySelector(".main__inner").style.transform="translate(-50%,0)";
            main.querySelector(".main__inner").classList.add("active");
            addButton.style.transform = "rotate(45deg)";
                setTimeout(() => {
                    task__name__input.focus();
                    add__task__window__wrapper.scrollTo(0,0);

                },300)
        }
    });

    task__name__OK__button.addEventListener("click", () => {
        if (task__name__input.value == "") {
            object.name = "New task";
        }
        else {
            object.name = task__name__input.value;
        }

        add__task__window__wrapper.scrollBy((add__task__window__wrapper.scrollWidth / 3), 0)
    });

    task__time__OK__button.addEventListener("click", () => {
        object.time = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);

        add__task__window__wrapper.scrollBy((add__task__window__wrapper.scrollWidth / 3), 0)
    });

    task__colors.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            object.color = event.target.style.backgroundColor;

            let index = localStorage.getItem('index');

            if (index != null) {
                index++;
            }
            else {
                index = 0;
            }
            localStorage.setItem('index', index);

            object.id = index;

            localStorage.setItem(`task${index}`, JSON.stringify(object));

            buildCalendar(monthIndex);

            main.querySelector(".main__inner").style.transform="translate(0,0)";
            main.querySelector(".main__inner").classList.remove("active");
            add__task__window__wrapper.scrollTo(0,0);
    
            menu.classList.remove("expanded");
    
            object.name = "";
            object.color = "";
            object.date = "";
            object.time = "";
            object.notification_10min = "";
            object.notification_1hour = "";
            object.notification_1day = "";

            addButton.style.transform = "rotate(0deg)";
        });
    });

    //CALENDAR 
    const calendar = document.querySelector(".calendar"),
          calendarBody = document.querySelector(".calendarBody"),
          months = ["Januar", "Februar", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
          let clickedDay;

    function buildCalendar (n) {
        updateLocalData();

        document.querySelectorAll(".block").forEach(item => {item.remove()});
    
        for (let j = -1; j < 2; j++) {
            let d = new Date();
    
            d.setDate(1);
            d.setMonth(d.getMonth() + n + j);
    
            const month = months[d.getMonth()],
                  year = d.getFullYear();   
        
            const firstDayIndex = d.getDay() == 0 ? 7 : d.getDay();
        
            const previousMonthLastDay = d.getDate(d.setDate(0));
                  d.setDate(1);
        
                  d.setMonth(d.getMonth() + 2);
            const currentMonthLastDay = d.getDate(d.setDate(0));
        
            const block = document.createElement("div");
            block.classList.add("block");
            block.innerHTML = `<div><h2>${month} ${year}</h2></div>`;
            calendarBody.append(block);
    
            const days = document.createElement("div");
            days.classList.add("days");
            block.append(days);
    
            if (firstDayIndex == 1) {
                for (i = 7; i > 0; i--) {
                    days.innerHTML += `<div><p class="calendar__previousMonthDay day">${previousMonthLastDay - i + 1}</p></div>`;
                };
            }
        
            for (let i = firstDayIndex - 1; i > 0; i--) {
                days.innerHTML += `<div><p class="day calendar__previousMonthDay">${previousMonthLastDay - i + 1}</p></div>`;
            }
        
            for (let i = 1; i <= currentMonthLastDay; i++) {
                if (i == new Date().getDate() && block.querySelector("h2").innerHTML == `${months[new Date().getMonth()]} ${new Date().getFullYear()}`) {
                    days.innerHTML += `<div class="today"> <p class="day calendar__actualMonth">${i}</p></div>`;
                }
                else {
                    days.innerHTML += `<div> <p class="day calendar__actualMonth">${i}</p></div>`;
                }
            }
    
           if (days.querySelectorAll("div").length < 42) {
               let x = 42 - days.querySelectorAll("div").length;
               for (i = 1; i <= x; i++) {
                   days.innerHTML += `<div><p class="calendar__nextMonthDay day">${i}</p></div>`;
               }
            }
    
            let array = days.querySelectorAll("div");
    
            for (let index = 5; index < 42;) {        // red color for weekends
                if (!array[index].classList.contains("today")) {
                    array[index].style.color = "red";     
                }
                if (!array[index + 1].classList.contains("today")) {
                    array[index + 1].style.color = "red";     
                }
    
                index += 7;
            }

            days.querySelectorAll(".day").forEach(item => {
                let itemDay = item.innerHTML < 10 ? "0" + item.innerHTML : item.innerHTML;
                    itemMonth = d.getMonth() + 1;
                    itemYear = d.getFullYear();

                    if (item.classList.contains("calendar__previousMonthDay")) {
                        itemMonth--;
                    }
                    if (item.classList.contains("calendar__nextMonthDay")) {
                        itemMonth++;
                    }

                    itemMonth = itemMonth < 10 ? "0" + itemMonth : itemMonth;

                if (clickedDay == (`${itemDay}.${itemMonth}.${itemYear}`)) {
                    item.classList.add("calendar__activeDay");
                }
            });


    

            days.addEventListener("click", (event) => {
                let target = event.target;
        
                if (!target.classList.contains("day")) {
                    target = target.querySelector(".day");
                }
                if (target.classList.contains("day")) {                
                    let dd = +target.innerHTML < 10 ? "0" + target.innerHTML : target.innerHTML,
                        m = d.getMonth() + 1, 
                        y = d.getFullYear();
        
                    // if (target.classList.contains("calendar__previousMonthDay")) {
                    //     m = d.getMonth();
                    // }

                    if (target.classList.contains("calendar__previousMonthDay")) {
                        m--;
                    }
        
                    if (target.classList.contains("calendar__nextMonthDay")) {
                        m++;
                    }
        
                    if (m == 0) {
                        m = 12;
                        y -= 1;
                    }
        
                    if (m == 13) {
                        m = 1;
                        y += 1;
                    }
        
                    m = m < 10 ? "0" + m : m;
        
                    clickedDay = `${dd}.${m}.${y}`;

                    object.date = clickedDay;

                    buildTask(clickedDay);

                    if (target.classList.contains("calendar__previousMonthDay")) {
                        calendar.scrollTo(0,0);
                        calendar.addEventListener("transitionend", () => {
                            monthIndex--;
                            buildCalendar(monthIndex);
                        });
                    }

                    if (target.classList.contains("calendar__nextMonthDay")) {
                        calendar.scrollTo(calendar.scrollWidth,0);
                        calendar.addEventListener("transitionend", () => {
                            monthIndex++;
                            buildCalendar(monthIndex);
                        });
                    }
        
                    days.querySelectorAll("p").forEach(item => {
                        item.classList.remove("calendar__activeDay");
                    })
                    target.classList.add("calendar__activeDay");        
                }
            });
    
            localData.forEach(({date, color}) => { 
                let day = date.split(".")[0];
                let month = date.split(".")[1];
                let year = date.split(".")[2];
    
                if (d.getMonth() + 1 == month && d.getFullYear() == year) {
                    days.querySelectorAll(".calendar__actualMonth").forEach(item => {
                        if (+item.innerHTML == day) {
                            let line = document.createElement("div");
                            line.setAttribute("class", "line");
                            line.setAttribute("style", `background-color: ${color}`);
                            item.parentElement.append(line);
                        }
                    })
                }
                if (d.getMonth() == month && d.getFullYear() == year) {
                    days.querySelectorAll(".calendar__previousMonthDay").forEach(item => {
                        if (+item.innerHTML == day) {
                            let line = document.createElement("div");
                            line.setAttribute("class", "line");
                            line.setAttribute("style", `background-color: ${color}`);
                            item.parentElement.append(line);
                        }
                    }) 
                }
                if (d.getMonth() + 2 == month && d.getFullYear() == year) {
                    days.querySelectorAll(".calendar__nextMonthDay").forEach(item => {
                        if (+item.innerHTML == day) {
                            let line = document.createElement("div");
                            line.setAttribute("class", "line");
                            line.setAttribute("style", `background-color: ${color}`);
                            item.parentElement.append(line);
                        }
                    });
                }
            });
        }
        calendar.style.scrollBehavior = "";
        calendar.scrollTo((calendar.scrollWidth / 3), 0);
        calendar.style.scrollBehavior = "smooth";

        buildTask(object.date);
    };

    let monthIndex = 0;

    buildCalendar(monthIndex);

    calendar.addEventListener("scroll", () => {
        if (calendar.scrollLeft == 0) {
            monthIndex--;
            buildCalendar(monthIndex);
        }
        if (calendar.scrollLeft == calendar.scrollWidth - calendar.scrollWidth / 3) {
            monthIndex++;
            buildCalendar(monthIndex);
        }
    });         

});  