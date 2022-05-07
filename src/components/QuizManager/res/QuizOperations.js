import AuthFetch from '../../res/FetchFunc.js';

export default async function QuizOperations(address, token, primaryKeyId, optionalValue1, optionalValue2) {

    const response = await AuthFetch(address, { token, primaryKeyId, optionalValue1, optionalValue2 });

    if (response.error) {

        alert("A server error has occurred");

    }
};