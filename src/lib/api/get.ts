import getClient from "./client";
import parseError from "./parseError";

interface Test {
    id: string;
}

function Get() {
    const GetallProblems = async () => {
        let data = await getClient().get('/sendProblem').then(res => {
            // console.log(res.data.data);
            return res.data.data;
        }).catch(err => {
            throw parseError(err);
        })
        return data
    }
    const GetsomeofProblems = async ({ id }: Test) => {
        await getClient().get('/detailProblem?id=' + id).then(res => {
            // alert("시벌");
            console.log(res);
            return res.data.data;
        }).catch(err => {
            throw parseError(err);
        })
    }
    return { GetallProblems, GetsomeofProblems };
}

export default Get;