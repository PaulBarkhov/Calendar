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

        clockHours.scrollTo(0,450);
        clockMinutes.scrollTo(0,50);
    }

    buildClock();

    clockHours.addEventListener("scroll", () => {
        hours = Math.floor(clockHours.scrollTop / 50 - 1);
        if (hours == -1) {
            clockHours.scrollTo(0,1250);
        }
        if (hours == 24) {
            clockHours.scrollTo(0,50);
        }
    });

    clockMinutes.addEventListener("scroll", () => {
        minutes = Math.floor(clockMinutes.scrollTop / 50 - 1);
        if (minutes == -1) {
            clockMinutes.scrollTo(0,3050);
        }
        if (minutes == 60) {
            clockMinutes.scrollTo(0,50);
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

                task.querySelector(".delete").addEventListener("click", () => {
                    localData.forEach(({id}) => {
                        if (id == task.querySelector(".id").innerHTML) {
                            localStorage.removeItem(`task${id}`);
                            updateLocalData();
                            buildCalendar(monthIndex);
                        }
                    });
                });
            }
        });
    }

    addButton.addEventListener("click", () => { 
        if (main.classList.contains("hide")) {
            main.classList.toggle("hide");
            add__task__window__wrapper.classList.toggle("hide");
            main.style.opacity = "1"; 
    
            set__task__name.classList.add("hide");
            set__task__color.classList.add("hide");
            set__task__time.classList.add("hide");
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
            main.style.opacity = "0";   
            setTimeout(() => {
                main.classList.toggle("hide");
                add__task__window__wrapper.classList.toggle("hide");
                set__task__name.classList.toggle("hide");
                task__name__input.focus();
            },300)
            addButton.style.transform = "rotate(45deg)";
        }

    });
    
    task__time__back__button.addEventListener("click", () => {
        set__task__time.classList.toggle("hide");
        set__task__name.classList.toggle("hide");
    });

    task__name__OK__button.addEventListener("click", () => {
        if (task__name__input.value == "") {
            object.name = "New task";
        }
        else {
            object.name = task__name__input.value;
        }

        set__task__name.classList.toggle("hide");
        set__task__time.classList.toggle("hide");
    });

    task__color__back__button.addEventListener("click", () => {
        set__task__color.classList.toggle("hide");
        set__task__time.classList.toggle("hide");
    });

    task__time__OK__button.addEventListener("click", () => {
        object.time = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
        buildClock();

        set__task__time.classList.toggle("hide");
        set__task__color.classList.toggle("hide");
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

            addButton.style.transform = "rotate(0deg)";
            set__task__color.classList.toggle("hide");
            add__task__window__wrapper.classList.toggle("hide");
            main.classList.toggle("hide");
            main.style.opacity = 1;
        });
    });

    //CALENDAR 
    const calendar = document.querySelector(".calendar"),
          calendarBody = document.querySelector(".calendarBody"),
          months = ["Januar", "Februar", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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

            days.addEventListener("click", (event) => {
                let target = event.target;
        
                if (!target.classList.contains("day")) {
                    target = target.querySelector(".day");
                }
                if (target.classList.contains("day")) {
                
                    let dd = +target.innerHTML < 10 ? "0" + target.innerHTML : target.innerHTML,
                        m = d.getMonth() + 1, 
                        y = d.getFullYear();
        
                    if (target.classList.contains("calendar__previousMonthDay")) {
                        m = d.getMonth();
                    }
        
                    if (target.classList.contains("calendar__nextMonthDay")) {
                        m = d.getMonth() + 2;
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
        
                    let clickedDay = `${dd}.${m}.${y}`;
                    
                    object.date = clickedDay;
        
                    buildTask(clickedDay);
                
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