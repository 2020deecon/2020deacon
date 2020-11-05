import getClient from "./client";
import parseError from "./parseError";

interface Test {
    id: string;
}

function Get() {
    const GetmyProblems = async () => {
        let data = await getClient().get('/myProblem').then(res => {
            // console.log(res.data.data);
            return res.data.data;
        }).catch(err => {
            throw parseError(err);
        })
        return data
    }
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
        let data = await getClient().get('/detailProblem?id=' + id).then(res => {
            console.log(res);
            return res.data.data;
        }).catch(err => {
            throw parseError(err);
        })
        return data
    }

    const GetallWorkbooks = async () => {
        let data = await getClient().get('/sendWorkbook').then(res => {
            // console.log(res.data.data);
            return res.data.data;
        }).catch(err => {
            throw parseError(err);
        })
        return data
    }
    const GetsomeofWorkbooks = async ({ id }: Test) => {
        let data = await getClient().get('/detailWorkbook?id=' + id).then(res => {
            console.log(res);
            return res.data.data;
        }).catch(err => {
            throw parseError(err);
        })
        return data
    }

    return { GetmyProblems, GetallProblems, GetsomeofProblems, GetallWorkbooks, GetsomeofWorkbooks };

}

export default Get;