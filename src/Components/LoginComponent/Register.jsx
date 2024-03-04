import { Form, Link, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { RegisterUser } from "../../utils/util";

export async function registerAction({ request }) {
    let formData = await request.formData()
    let body = {}
    body.username = formData.get('username')
    body.email = formData.get('email')
    body.password = formData.get('password')
    let res = await RegisterUser(body)
    if (res.data.user) {
        return redirect(`/login?user=${res.data.user.username}`)
    }
    return res.data
}


export default function Register() {
    const navigate = useNavigate();
    const status = useNavigation();

    let actionData = useActionData()


    let state = status.state
    return (
        <>
            <Link to={'/'}>back</Link>

            <div className="login--form">
                <h1>Register</h1>
                <Form method="post" replace>
                    <input
                        name="username"
                        type="text"
                        placeholder="username"
                        required
                    />
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
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
                </Form>
                {actionData?.msg && <span>{actionData.msg}</span>}
            </div>
        </>
    );
}
