import AuthFetch from '../../res/FetchFunc.js';

export default async function QuizOperations(address, token, primaryKeyId, optionalValue1, optionalValue2) {


    const userStats = await AuthFetch(address, { token, primaryKeyId, optionalValue1, optionalValue2 });

    if (userStats.error) {

        alert("A server error has occurred");

    }

    else if (userStats.results) {

        //   alert("Your quizzes have been updated");

        // window.location.reload();


    };

};