import { useState } from "react";
import { QuizCreator } from "./QuizCreator";

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




export function QuestionsetCreator() {

    const { quizid } = QuizCreator();
    const [questionname, setQuestionName] = useState();
    const [incorrect1, setIncorrect1] = useState();
    const [Incorrect2, setIncorrect2] = useState();
    const [Incorrect3, setIncorrect3] = useState();
    const [Correct, setCorrect] = useState();



    async function insertDataClearForm() {
        var response = await insertquestionset({ quizid, questionname, incorrect1, Incorrect2, Incorrect3, Correct });

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

    console.log(quizid)



    return (
        <><div>
            <p>What will be the name of your questionname</p>
            <input type="text" onChange={e => setQuestionName(e.target.value)} />
        </div>
            <div className="insertQuizdatabutton">
                <button onClick={e => insertDataClearForm()}>slub</button>
            </div></>


    )

}




