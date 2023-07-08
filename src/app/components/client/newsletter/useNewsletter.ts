import {useState} from "react";

type NewsletterState = {
    email: string,
    error: string,
    isSuccess: boolean
}

function isValidEmail(email: string) {
    const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email);
}

export const useNewsletter = () => {
    const [state, setState] = useState<NewsletterState>({email: "", error: "", isSuccess: false})
    const handleSubscribe = () => {
        if (isValidEmail(state.email)) {
            fetch("/api/newsletter/", {method: "POST", body: JSON.stringify({email: state.email})})
                .then(handleSuccess).catch(setErrorMessage)
        } else {
            setErrorMessage("Invalid email")
        }
    }

    const setErrorMessage = (error: string) => {
        setState({...state, error})
    }

    const handleSuccess = () => {
        console.log("success")
        setState({...state, isSuccess: true, error: ""})
    }

    const isSubscribed = () => {
        return state.isSuccess;
    }

    const errorMessage = () => {
        return `Error: ${state.error}`;
    }

    const hasError = () => {
        return state.error !== "";
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setState({...state, email: event.target.value})
    }

    return {handleSubscribe, handleEmailChange, isSubscribed, errorMessage, hasError}
}
