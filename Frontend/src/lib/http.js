const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8888"

async function http(url, opts={}){ 
    const headers = {
        'Content-Type': 'application/json'
    }

    const token = localStorage.getItem("token") 
    if(token){
        headers.Authorization = "Bearer " + token
    }

    const response = await fetch(BASE_URL + url, {
        method: opts.method || "GET",
        headers: headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined
    })

    return await response.json()
}

export default http