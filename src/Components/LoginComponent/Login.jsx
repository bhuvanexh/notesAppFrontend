import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Link, useActionData, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { setNotesStatus } from "../../features/notesSlice";
import { setUser } from "../../features/usersSlice";
import { LoginUser } from "../../utils/util";

export async function loginAction({ request }) {

    let formData = await request.formData()
    let body = {}
    body.username = formData.get('username')
    body.password = formData.get('password')
    let res = await LoginUser(body)
    if (res.data.user) {
        localStorage.removeItem('user')
        return res.data
    }
    return res.data
}





export default function Login() {
    const navigate = useNavigate();
    const status = useNavigation();
    let state = status.state

    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    let user = searchParams.get('user')

    const [usernameValue, setUsernameValue] = useState('')

    useEffect(() => {
        if (user) {
            setUsernameValue(user);
        }
    }, [user]);


    let actionData = useActionData()

    useEffect(() => {
        if (actionData?.user) {
            dispatch(setUser(actionData.user))
            dispatch(setNotesStatus('idle'))
            navigate('/')
        }
    }, [actionData])

    return (
        <>
            <Link className="text-xl absolute left-4 top-4 text-blue-300" to={'/'}> {`<-- back`}</Link>
            <section className="flex bg-[#151515] items-center justify-center h-full">
                <div className="login--form flex bg-gray-800 border-gray-600 border flex-col w-[90%] sm:min-w-[550px] sm:w-[40%] px-6 py-8 rounded-xl gap-2">
                    <h1 className="text-white text-2xl sm:text-4xl font-roboto mb-5 font-bold tracking-tight">Sign in to your account</h1>
                    <Form method="post" className="flex flex-col w-full gap-2 text-white" replace>
                        <label className="font-openSans" htmlFor={'username'}>Your email/username</label>
                        <input
                            name="username"
                            type="text"
                            id="username"
                            placeholder="Username or Email"
                            className="px-2 py-2 border border-gray-500 mb-1 w-full bg-gray-700 rounded-lg sm:text-lg"
                            value={usernameValue}
                            onChange={(e) => {
                                setUsernameValue(e.target.value)
                            }}
                            required
                        />
                        <label className="font-openSans" htmlFor={'password'}>Password</label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="px-2 py-2 mb-4 border border-gray-500 w-full bg-gray-700 rounded-lg sm:text-lg"
                            placeholder="Password"
                        />
                        <button className="w-[200px] bg-blue-400 self-center py-2 rounded-lg" disabled={state === "submitting"}>
                            {state === "submitting" ? "Logging in..." : "Log in"}
                        </button>
                        {!user && <>
                            <div className="self-center flex items-center gap-1">
                                <span>Don't have an account yet?</span>
                                <button
                                    className="text-blue-400"
                                    onClick={() => {
                                        navigate(`/register`);
                                    }}
                                >
                                    SignUp
                                </button>
                            </div>
                        </>
                        }
                    </Form>
                    {actionData?.msg && <span className="text-red-400">{actionData.msg}</span>}
                </div>
            </section>
        </>
    );
}
