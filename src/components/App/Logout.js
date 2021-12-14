
export default function Logout() {

// remove token form local storage and redirect to default path
    sessionStorage.clear()
    window.location.replace('/')

    return (<>
       
        <div>
            <h1>successful logout</h1>

        </div>

    </>)

}