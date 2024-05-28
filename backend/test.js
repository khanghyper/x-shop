fetch('http://localhost:4014/api/v1/auth/login',{
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({username: 'admin', password: 'khang123'})
}).then(res => res.json()).then(data => {
    localStorage.setItem('user', data.data.accessToken);
})

async function test() {
    const token = localStorage.getItem('user');
    await fetch('http://localhost:4014/api/v1/user', {
        // method: "GET", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
            token: `Bearer ${token}`
        },
    }).then(res => res.json()).then(data => console.log(data))
}