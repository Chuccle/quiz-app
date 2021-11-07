import { useState } from "react";
import useToken from '../App/useToken';
import Fetch from '../res/FetchFunc'



export function QuestionsetCreator({ quizname, quizdifficulty, quizlength }) {



    console.log(quizname, quizdifficulty, quizlength)
    const { token } = useToken();
    const [questionname, setQuestionName] = useState("");
    const [incorrect1, setIncorrect1] = useState("");
    const [incorrect2, setIncorrect2] = useState("");
    const [incorrect3, setIncorrect3] = useState("");
    const [correct, setCorrect] = useState("");
    const [questionset, SetQuestionSet] = useState([])
    const [questionnumber, setQuestionNumber] = useState(0);




    async function insertDataClearForm() {
        if (quizlength > questionnumber) {

            setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1)
            const quizdata = {
                Quizname: quizname,
                Difficulty: quizdifficulty,
                Questionset: {
                    Questionname: questionname,
                    Options: {
                        Incorrect1: incorrect1,
                        Incorrect2: incorrect2,
                        Incorrect3: incorrect3,
                        Correct: correct
                    }
                }
            }

            SetQuestionSet(questionset => [...questionset, quizdata])

            // TODO reset all fields

        }
        else {

            try {
                var response = await Fetch('http://localhost:8080/insertquiz', { questionset, token });



                if (response.error) {


                    alert("there was an error inserting your quiz")


                }
                else if (response.QuizStatus === "Inserted") {






                }
            } catch {

                alert("A server communication error occurred")


            }
        }
    }

    console.log(questionset)

    //TODO presence check validation

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
                    <button onClick={e => insertDataClearForm()} >Submit</button>
                </div></>


        )
    }


    insertDataClearForm()

    return (<><div>

        <h2>WELL DONE</h2>
    </div></>
    )
}



