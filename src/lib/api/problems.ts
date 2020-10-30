import getClient from "./client";
import parseError from "./parseError";
interface Problem {
    title: string;
    subtitle: string;
    img: string;
    answer: string | Array<string>;
}
function Problems() {
    const CreateProblem = async ({ title, subtitle, img, answer }: Problem) => {
        try {
            return await getClient().post("/problem", { params: {} });
        }
        catch (e) {
            throw parseError(e);
        }
    }

    return {
        CreateProblem
    }
}

export default Problems;