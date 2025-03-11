import { Suspense } from "react";
import ForgotPassword from "./forgotPassword";
import Loading from "../loading/loading";

export default function Page() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <ForgotPassword />
            </Suspense>
        </>
    );
}