import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from 'axios'

export const Signin = () => {

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credential to access your account"} />
                    <InputBox placeholder={"abc@gmail.com"} label={"Email"} />
                    <InputBox placeholder={"1234"} label={"Password"} />
                    <div className='pt-4'>
                        <Button label={"Sign in"} onClick={async () => {
                            const getToken = () => localStorage.getItem("token");
                            const getAuthorization = "Bearer " + getToken;
                            const response = await axios.post(
                                "http://localhost:3000/api/v1/user/signin",
                                {
                                    username,
                                    password,
                                },
                                {
                                    headers: {
                                        "X-Custom-Header": "value",
                                        Authorization: getAuthorization,
                                    },
                                });
                            navigate("/dashboard");
                        }}
                        />
                        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </div>
    )
}