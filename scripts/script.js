document.addEventListener("DOMContentLoaded", () => {
    let currentDate = new Date(),
        months = ["Januar", "Februar", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const body = document.querySelector("body"),
          glass = document.querySelectorAll(".glass");

    //ADD TASK
    const addButton = document.querySelector("#addButton"),
          closeButton = document.querySelector("#closeButton"),
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

    const buildClock = () => {

        let hours = new Date(),
            minutes = new Date();

        hours.setHours(8);
        minutes.setMinutes(0);

        const updateClock = () => {
            clockHours.innerHTML = hours.getHours() < 10 ? "0" + hours.getHours() : hours.getHours();
            clockMinutes.innerHTML = minutes.getMinutes() < 10 ? "0" + minutes.getMinutes() : minutes.getMinutes();
        }

        updateClock();

        clockHours.addEventListener("click", () => {
            hours.setHours(hours.getHours() + 1);
            updateClock();
        });

        clockMinutes.addEventListener("click", () => {
            minutes.setMinutes(minutes.getMinutes() + 1);
            updateClock();
        });
    }

    const buildTask = (clickedDay) => {
        updateLocalData();
        document.querySelectorAll(".task").forEach(item => {
            item.remove();
        });
        // getResource('http://localhost:3000/requests')
        // .then(data => {
        //     data.forEach(({date, time, name, color, notification_10min, notification_1hour, notification_1day, id}) => {
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
                            event.target.parentElement.parentElement.classList.toggle("expanded");
                        }
                        if (event.target.classList.contains("done")) {
                            event.target.parentElement.parentElement.parentElement.classList.toggle("expanded");
                        }
                        else {
                            event.target.parentElement.classList.toggle("expanded");
                        }
                    });        

                    task.querySelector(".delete").addEventListener("click", () => {
                        localData.forEach(({id}) => {
                            if (id == task.querySelector(".id").innerHTML) {
                                localStorage.removeItem(`task${id}`);
                                //task.remove();
                                updateLocalData();
                                buildCalendar();
                                console.log(localData);
                            }
                        })
                        // fetch(`http://localhost:3000/requests/${id}/`, {
                        //     method: 'DELETE',
                        // });
                        // task.remove();
                        // buildCalendar();
                    });
                }
            });
        //};
    }

    addButton.addEventListener("click", () => {    
        main.classList.toggle("hide");
        add__task__window__wrapper.classList.toggle("hide");
        set__task__name.classList.toggle("hide");

        task__name__input.focus();
    });

    closeButton.addEventListener("click", () => {
        main.classList.toggle("hide");
        add__task__window__wrapper.classList.toggle("hide");

        set__task__name.classList.add("hide");
        set__task__color.classList.add("hide");
        set__task__time.classList.add("hide");

        object.name = "";
        object.color = "";
        object.date = "";
        object.time = "";
        object.notification_10min = "";
        object.notification_1hour = "";
        object.notification_1day = "";
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
        buildClock();
    });

    task__color__back__button.addEventListener("click", () => {
        set__task__color.classList.toggle("hide");
        set__task__time.classList.toggle("hide");
    });

    task__time__OK__button.addEventListener("click", () => {
        object.time = clockHours.innerHTML + ":" + clockMinutes.innerHTML;

        set__task__time.classList.toggle("hide");
        set__task__color.classList.toggle("hide");
    });

    task__colors.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            object.color = event.target.style.backgroundColor;

            //BACKEND
            const postData = async (url, data) => {
                const res = await fetch (url, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: data
                });
            }

            // let task = {
            //     "name": "New task",
            //     "color": "blue",
            //     "date": "20.01.2021",
            //     "time": "08:00",
            //     "notification_10min": "checked",
            //     "notification_1hour": "",
            //     "notification_1day": "",
            //     "id": 16
            // }

            // let localData = JSON.parse(localStorage.getItem('tasks'));
            // if (localData != null) {
            //     localData.push(object);
            // }
            // else {
            //     localData = [object];
            // }
            // localStorage.setItem("tasks", JSON.stringify(localData));

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

            buildCalendar();

            set__task__color.classList.toggle("hide");
            add__task__window__wrapper.classList.toggle("hide");
            main.classList.toggle("hide");


            // postData("http://localhost:3000/requests", JSON.stringify(object))
            // .then(() => {
            //     buildCalendar();
    
            //     set__task__color.classList.toggle("hide");
            //     add__task__window__wrapper.classList.toggle("hide");
            //     main.classList.toggle("hide");
            // })

        });

    });







    //CALENDAR 
    const calendar__currentMonth = document.querySelector(".calendar__currentMonth"),
          calendar__previousMonth = document.querySelector(".calendar__previousMonth"),
          calendar__nextMonth = document.querySelector(".calendar__nextMonth"),
          days = document.querySelector(".days");

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    function buildCalendar () {
        updateLocalData();

        // getResource('http://localhost:3000/requests')
        // .then(data => {
            let mm = currentDate.getMonth(),
            yy = currentDate.getFullYear(),
            dd = currentDate.getDate(),

            currentMonth = months[mm];

            let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
                lastDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay(),
                firstDayIndex = currentDate;
                                firstDayIndex.setDate(1); 
                                firstDayIndex = firstDayIndex.getDay();

            let prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

            nextMonth = months[months.indexOf(currentMonth) + 1];
            previousMonth = months[months.indexOf(currentMonth) - 1];

            if (currentMonth == "Januar") {
                previousMonth = months[11];
            }
            if (currentMonth == "December") {
                nextMonth = months[0];
            }

            calendar__currentMonth.innerHTML = `${currentMonth} ${yy}`;
            calendar__previousMonth.innerHTML = `< ${previousMonth.slice(0,3)}`;
            calendar__nextMonth.innerHTML = `${nextMonth.slice(0,3)} >`;

            days.querySelectorAll("div").forEach(item => {item.remove()});

            if (firstDayIndex == 0) { firstDayIndex = 7};

            if (firstDayIndex == 1) {
                for (i = 7; i > 0; i--) {
                    days.innerHTML += `<div><p class="calendar__previousMonthDay day">${prevMonthLastDay - i + 1}</p></div>`;
                };
            }
            else {
                for (i = firstDayIndex - 1; i > 0; i--) {
                    days.innerHTML += `<div><p class="calendar__previousMonthDay day">${prevMonthLastDay - i + 1}</p></div>`;
                }; // adds previous month`s days to start
            }

            for (i = 1; i <= lastDay; i++) {
                days.innerHTML += `<div><p class="calendar__actualMonth day">${i}</p></div>`;
            };  // add all days

            if (days.querySelectorAll("div").length < 42) {
                let x = 42 - days.querySelectorAll("div").length;
                for (i = 1; i <= x; i++) {
                    days.innerHTML += `<div><p class="calendar__nextMonthDay day">${i}</p></div>`;
                }
            }

            document.querySelectorAll(".calendar__actualMonth").forEach(item => {
                if (item.innerHTML == new Date().getDate() && mm == new Date().getMonth()) {
                    item.classList.add("today");
                }
            });

            let array = days.querySelectorAll("div");

            for (let index = 5; index < 42;) {        // red color for weekends
                array[index].style.color = "red";     
                array[index + 1].style.color = "red";
    
                index += 7;
            }

            days.addEventListener("click", (event) => {
                let target = event.target;
        
                if (!target.classList.contains("day")) {
                    target = target.querySelector(".day");
                }
                if (target.classList.contains("day")) {
        
                    document.querySelectorAll(".task").forEach(item => {item.remove()});
        
                    let d = +target.innerHTML < 10 ? "0" + target.innerHTML : target.innerHTML,
                        m = currentDate.getMonth() + 1, 
                        y = currentDate.getFullYear();
        
                    if (target.classList.contains("calendar__previousMonthDay")) {
                        m = currentDate.getMonth();
                    }
        
                    if (target.classList.contains("calendar__nextMonthDay")) {
                        m = currentDate.getMonth() + 2;
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
        
                    let clickedDay = `${d}.${m}.${y}`;
                
                    object.date = clickedDay;
        
                    buildTask(clickedDay);
                
                    days.querySelectorAll("p").forEach(item => {
                        item.classList.remove("calendar__activeDay");
                    })
                    target.classList.add("calendar__activeDay");        
                }
            });
        
            //BACKEND
            // data.forEach(({date, time, name, color, notification_10min, notification_1hour, notification_1day}) => {
            localData.forEach(({date, time, name, color, notification_10min, notification_1hour, notification_1day}) => { 
                let day = date.split(".")[0];
                //day = +day < 10 ? "0" + day : day;
                let month = date.split(".")[1];
                //month = +month < 10 ? "0" + month : month;
                let year = date.split(".")[2];

                if (mm + 1 == month && currentDate.getFullYear() == year) {
                    days.querySelectorAll(".calendar__actualMonth").forEach(item => {
                        if (+item.innerHTML == day) {
                            let line = document.createElement("div");
                            line.setAttribute("class", "line");
                            line.setAttribute("style", `background-color: ${color}`);
                            item.parentElement.append(line);

                            //item.style.borderBottom = `2px solid ${color}`;
                            //item.style.backgroundColor = color;
                        }
                    })
                }
                if (mm == month && currentDate.getFullYear() == year) {
                    days.querySelectorAll(".calendar__previousMonthDay").forEach(item => {
                        if (+item.innerHTML == day) {
                            let line = document.createElement("div");
                            line.setAttribute("class", "line");
                            line.setAttribute("style", `background-color: ${color}`);
                            item.parentElement.append(line);

                            //item.style.borderBottom = `2px solid ${color}`;
                            //item.style.backgroundColor = color;
                        }
                    }) 
                }
                if (mm + 2 == month && currentDate.getFullYear() == year) {
                    days.querySelectorAll(".calendar__nextMonthDay").forEach(item => {
                        if (+item.innerHTML == day) {
                            let line = document.createElement("div");
                            line.setAttribute("class", "line");
                            line.setAttribute("style", `background-color: ${color}`);
                            item.parentElement.append(line);

                            //item.style.borderBottom = `2px solid ${color}`;
                            //item.style.backgroundColor = color;
                        }
                    }) 
                }
            });

            buildTask(object.date);
            console.log();
        //});


    };

    buildCalendar();

    calendar__nextMonth.addEventListener("click", () => {

        let mm = currentDate.getMonth();
        currentDate.setMonth(mm + 1);

        currentMonth = months[currentDate.getMonth()];

        buildCalendar();
    });

    calendar__previousMonth.addEventListener("click", () => {

        let mm = currentDate.getMonth();
        currentDate.setMonth(mm - 1);

        currentMonth = months[currentDate.getMonth()];

        buildCalendar();
    });



    //DEVICE COLOR THEME
    // function checkSystemColorScheme() {
    //     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            
    //         body.classList.remove("bright");
    //         body.classList.add("dark");

    //         document.querySelectorAll(".glass").forEach(item => {
    //             item.classList.add("darkGlass");
    //         });

    //         document.querySelectorAll("button").forEach(item => {
    //             item.style.color = "white";
    //         });

    //         document.querySelector("#name").classList.remove("blackPlaceholder");
    //         document.querySelector("#name").classList.add("whitePlaceholder");
    //     }
    //     else {
    //         body.classList.remove("dark");
    //         body.classList.add("bright");

    //         document.querySelectorAll(".glass").forEach(item => {
    //             item.classList.remove("darkGlass");
    //         });

    //         document.querySelectorAll("button").forEach(item => {
    //             item.style.color = "black";
    //         });

    //         document.querySelector("#name").classList.remove("whitePlaceholder");
    //         document.querySelector("#name").classList.add("blackPlaceholder");
    //     }
    // }

    // checkSystemColorScheme();

    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    //     checkSystemColorScheme();
    // });
         
    


});  