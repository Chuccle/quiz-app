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




export function QuestionsetCreator({ quizname, quizdifficulty, quizlength }) {



    console.log(quizname, quizdifficulty, quizlength)

    const [questionname, setQuestionName] = useState("");
    const [incorrect1, setIncorrect1] = useState("");
    const [incorrect2, setIncorrect2] = useState("");
    const [incorrect3, setIncorrect3] = useState("");
    const [correct, setCorrect] = useState("");
    const [questionnumber, setQuestionNumber] = useState(0);


    async function insertDataClearForm() {
        setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1)
var response = await insertquestionset({ quizname, quizdifficulty, questionname, incorrect1, incorrect2, incorrect3, correct });

        try {

            if (response.error) {


                alert("there was an error inserting your quiz")


            }
            else if (response.ok) {

                setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1)
                //reset all fields and increment question number 


            }
        } catch {

            alert("A server communication error occurred")


        }
    }


    while (quizlength > questionnumber) {
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
                    <p>What will be the second incorrect {quizname}</p>
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
                    <button onClick={e => insertDataClearForm()} >slub</button>
                </div></>


        )
    }
    return (<><div>
        <p>Quiz successfully created!</p>
    </div></>
    )
}



