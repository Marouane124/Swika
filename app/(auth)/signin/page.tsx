import SignIn from "./SignIn";
import SuspenseBoundary from "../../../SuspenseBoundary";

export default function Home() {
    return ( 
        <div className="bg-gray-50 min-h-screen">
            <SuspenseBoundary>
                <SignIn /> 
            </SuspenseBoundary>
        </div>
    );
}
