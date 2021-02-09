async function loginUser(email, password) {
    const result = await fetch( "https://health-tracker-cet.herokuapp.com/"+'api/login-user', {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            email, password
        })
    });
    const response = await result.json();
    console.log(response);
    if(response.error) {
        // User failed to login
        return Promise.reject(response.message);
    } else {
        // Login success
        return Promise.resolve(response.message);
    }

}


async function registerUser(name, email, password) {
    const result = await fetch('https://health-tracker-cet.herokuapp.com/api/create-user', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name, email, password
        })
    });
    const response = await result.json();
    if(response.error) {
        // User failed to login
        return Promise.reject(response.message);
    } else {
        // Login success
        return Promise.resolve(response.message);
    }
}

async function getUsers(name, uid) {
        const result = await fetch('https://health-tracker-cet.herokuapp.com/api/get-users', {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                name, uid
            })
        });

        const response = await result.json();

        if(!response.error) {
            return Promise.resolve(response.message);
            
        } else {
            return Promise.reject(response.message);
        }
    
    
    
}


export {
    loginUser,
    registerUser,
    getUsers
}