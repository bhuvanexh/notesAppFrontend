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
            <Link to={'/'} className="text-xl absolute left-4 top-4 text-blue-300">&lt;-- back</Link>
            <section className="flex bg-[#151515] items-center justify-center h-screen">
                <div className="login--form flex bg-gray-800 border-gray-600 border flex-col w-[90%] sm:min-w-[550px] sm:w-[40%] px-6 py-8 rounded-xl gap-2 text-white">
                    <h1 className="text-2xl sm:text-4xl font-roboto mb-5 font-bold tracking-tight">Register</h1>
                    <Form method="post" className="flex flex-col w-full gap-2">
                        <label className="font-openSans" htmlFor={'username'}>Username</label>
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="px-2 py-2 border border-gray-500 mb-1 w-full bg-gray-700 rounded-lg sm:text-lg"
                            required
                        />
                        <label className="font-openSans" htmlFor={'email'}>Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            className="px-2 py-2 border border-gray-500 mb-1 w-full bg-gray-700 rounded-lg sm:text-lg"
                            required
                        />
                        <label className="font-openSans" htmlFor={'password'}>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="px-2 py-2 mb-4 border border-gray-500 w-full bg-gray-700 rounded-lg text-lg"
                        />
                        <button className="w-[200px] bg-blue-400 self-center py-2 rounded-lg" disabled={state === "submitting"}>
                            {state === "submitting" ? "Registering..." : "Register"}
                        </button>
                    </Form>
                    {actionData?.msg && <span className="text-red-400">{actionData.msg}</span>}
                </div>
            </section>

        </>
    );
}
