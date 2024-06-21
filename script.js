const form = document.forms.namedItem("todo");
let inp = document.querySelector(".input");
let create_but = document.querySelector(".but");
let container = document.querySelector(".container");
let todos = []

reload(todos, container)


form.onsubmit = (e) => {
    e.preventDefault();

    const fm = new FormData(form);

    const task = {
        id: crypto.randomUUID(),
        title: fm.get("title"),
        time: new Date(Date.now()).toISOString(),
        isDone: false,
    };

    fetch('http://localhost:8080/todos' , {
        method: 'post',
        body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(res => console.log(res))

    console.log(task);

    todos.push(task)
    reload(todos, container)
};

function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {


        let item_glav = document.createElement("div");
        let top_side = document.createElement("div");
        let span = document.createElement("span");
        let button = document.createElement("button");
        let time_span = document.createElement("span");



        item_glav.classList.add("item");
        top_side.classList.add("top-side");
        time_span.classList.add("time");

        span.innerHTML = item.title;
        button.innerHTML = "x";

        span.onclick = () => {
            let update = prompt('Write update');
            fetch('http://localhost:8080/todos/' + item.id, {
                method: 'PATCH',
                body: JSON.stringify({ title:update })
            })
            .then(res => console.log(res))
            span.textContent = update
           
                
            
        };
        

        time_span.innerHTML = item.time

        let idx = arr[item]
        button.onclick = () => {
            arr.splice(idx, 1)
            item_glav.remove();
            fetch('http://localhost:8080/todos/' + item.id, {
                method: 'DELETE'
            })
            .then(res =>  console.log(res))
        };
        top_side.append(span, button);
        item_glav.append(top_side, time_span);
        container.append(item_glav);
    }
}