const backendDomain: string = import.meta.env.VITE_backendDomain

const SummaryApi = {
    SignUp : {
        url: `${backendDomain}/api/auth/register`,
        method: `post`
    }
}

export default SummaryApi;