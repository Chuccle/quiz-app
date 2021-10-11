import { useState } from "react";




async function insertquestionset(questiondata) {

    return fetch('http://localhost:8080/insertquestionset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },

        body: JSON.stringify(questiondata)

    })

        .then(data => data.json())

}




export function QuestionsetCreator({quizid}) {
    

    const [questionname, setQuestionName] = useState("");
    const [incorrect1, setIncorrect1] = useState("");
    const [incorrect2, setIncorrect2] = useState("");
    const [incorrect3, setIncorrect3] = useState("");
    const [correct, setCorrect] = useState("");

 

    async function insertDataClearForm() {
        var response = await insertquestionset({ quizid, questionname, incorrect1, incorrect2, incorrect3, correct });

        try {

            if (response.error) {


                alert("there was an error inserting your quiz")


            }
            else if (response.ok) {

                //reset all fields and increment question number 


            }
        } catch {

            alert("A server communication error occurred")


        }
    }





    return (
        <><div>
            <p>What will be the name of your questionname</p>
            <input type="text" onChange={e => setQuestionName(e.target.value)} />
        </div>
        <div>
            <p>What will be the first incorrect option</p>
            <input type="text" onChange={e => setIncorrect1(e.target.value)} />
        </div>
        <div>
            <p>What will be the second incorrect {quizid}</p>
            <input type="text" onChange={e => setIncorrect2(e.target.value)} />
        </div>
        <div>
            <p>What will be the third incorrect option</p>
            <input type="text" onChange={e => setIncorrect3(e.target.value)} />
        </div>
        <div>
            <p>What will be the correct option</p>
            <input type="text" onChange={e => setCorrect(e.target.value)} />
        </div>
            <div className="insertQuizdatabutton">
                <button onClick={e => insertDataClearForm()}>slub</button>
            </div></>


    )

}



