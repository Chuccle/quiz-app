
export default function Logout() {


    sessionStorage.clear()
    window.location.replace('/')

    return (<>
       
        <div>
            <h1>successful logout</h1>

        </div>

    </>)

}