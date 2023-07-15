import {useState} from "react";
import {isValidEmail} from "@/core/models";

type NewsletterState = {
    email: string,
    error: string,
    isSuccess: boolean
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
        setState({...state, email: event.target.value})
    }

    return {handleSubscribe, handleEmailChange, isSubscribed, errorMessage, hasError}
}
