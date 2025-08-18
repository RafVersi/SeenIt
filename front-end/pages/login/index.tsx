import Head from "next/head";
import UserLoginForm from "@/components/users/userLoginForm";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};

export default Login;