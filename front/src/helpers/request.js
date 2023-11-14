import Notification from "@/components/Notifier/Notification"

export default async function request(endpoint="", method='GET', body={}, bearer='null'){
    if(method === 'GET' || method === 'get'){
        try{  
            const data = await fetch(`http://localhost:3001/${endpoint}`, {
                headers: {
                    'Authorization': `${bearer}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(async response=>{
                    if(response.ok){
                        const result = await response.json()
                        result.ok = true
                        return result
                    }else{
                        const result = await response.json()
                        result.ok = false
                        return result
                    }
                })

            return data
        }catch(err){
            Notification('error', err.message)
        }

    }

    else if(method === 'POST' || method === 'post'){
        try{
            const data = await fetch(`http://localhost:3001/${endpoint}`,{
                method: 'POST',
                headers: {
                    'Authorization': `${bearer}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(async response=>{
                    if(response.ok){
                        const result = await response.json()
                        result.ok = true
                        return result
                    }else{
                        const result = await response.json()
                        result.ok = false
                        return result
                    }
                })

            return data
        }catch(err){
            Notification('error', err.message)
        }
    }else if(method == 'PUT' || method == 'put'){
        try{
            const data = await fetch(`http://localhost:3001/${endpoint}`,{
                method: 'PUT',
                headers: {
                    'Authorization': `${bearer}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(async response=>{
                    if(response.ok){
                        const result = await response.json()
                        result.ok = true
                        return result
                    }else{
                        const result = await response.json()
                        result.ok = false
                        return result
                    }
                })

            return data
        }catch(err){
            Notification('error', err.message)
        }
    }
}