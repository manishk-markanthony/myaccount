import { Suspense } from "react";
import CreateAccount from "./create-account";
import Loading from "../loading/loading";

export default function Page() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <CreateAccount />
            </Suspense>
        </>
    );

}