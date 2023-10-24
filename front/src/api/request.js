export default async function request(method='GET', endpoint, body={}, bearer='null'){

    if(method === 'GET' || method === 'get'){
        try{   
            const data = await fetch(`http://localhost:3001/${endpoint}`, {
                body: JSON.stringify(body),
                headers: {
                    'Authorization': `Bearer ${bearer}`,
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
            const result = response.json()
            result.ok = false
            return result
        }

    }

    else if(method === 'POST' || method === 'post'){
        try{
            console.log(JSON.stringify(body));
            const data = await fetch(`http://localhost:3001/${endpoint}`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${bearer}`,
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
            const result = response.json()
            result.ok = false
            return result
        }
    }
}