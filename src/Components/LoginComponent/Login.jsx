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
            <Link to={'/'}>back</Link>
            <div className="login--form">
                <h1>Login</h1>
                <Form method="post" replace>
                    <input
                        name="username"
                        type="text"
                        placeholder="username or email"
                        value={usernameValue}
                        onChange={(e) => {
                            setUsernameValue(e.target.value)
                        }}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={state === "submitting"}>
                        {state === "submitting" ? "Logging in..." : "Log in"}
                    </button>
                    {!user && <>
                        <p>New User ?</p>
                        <button
                            onClick={() => {
                                navigate(`/register`);
                            }}
                        >
                            Register
                        </button>
                    </>
                    }
                </Form>
                {actionData?.msg && <span>{actionData.msg}</span>}
            </div>
        </>
    );
}
