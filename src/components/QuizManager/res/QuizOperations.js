import Fetch from '../../res/FetchFunc.js';

export default async function QuizOperations(address, token, primaryKeyId, optionalValue1, optionalValue2) {

console.log(primaryKeyId)
console.log(optionalValue1)
console.log(optionalValue2)


    try {




        const userStats = await Fetch(address, { token, primaryKeyId, optionalValue1, optionalValue2 });

        if (userStats.error) {

            alert("A server error has occurred");

        }

        else if (userStats.results) {

         //   alert("Your quizzes have been updated");

           // window.location.reload();
        

        };

    } catch {

        alert("A server communication error has occurred");

    };

};