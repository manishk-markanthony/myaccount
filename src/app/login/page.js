import { Suspense } from "react";
import Login from "./login";
import Loading from "../loading/loading";
export default function Page() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Login></Login>
            </Suspense>
        </>
    );
}