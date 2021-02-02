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
                                buildCalendar(monthIndex);
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

            buildCalendar(monthIndex);

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
    const calendar = document.querySelector(".calendar"),
          calendarBody = document.querySelector(".calendarBody");


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
            block.innerHTML = `<div><h1>${month} ${year}</h1></div>`;
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
                if (i == new Date().getDate() && block.querySelector("h1").innerHTML == `${months[new Date().getMonth()]} ${new Date().getFullYear()}`) {
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
        
                    //document.querySelectorAll(".task").forEach(item => {item.remove()});
        
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
    
                    console.log(clickedDay);
                
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

    calendar.addEventListener("touchend", () => {
        console.log(calendar.scrollLeft);
        if (calendar.scrollLeft < calendar.scrollWidth / 4.5) {
            calendar.scrollTo(0, 0);
            monthIndex--;
            setTimeout(() => {
                buildCalendar(monthIndex);
            },500);
        }
        else if (calendar.scrollLeft > calendar.scrollWidth / 2.5) {
            calendar.scrollTo(calendar.scrollWidth, 0);
            monthIndex++;
            setTimeout(() => {
                buildCalendar(monthIndex);
            },500);
        }
        else {
            calendar.scrollTo((calendar.scrollWidth / 3), 0);
        }

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