import getClient from "./client";
import parseError from "./parseError";

interface Problem {
    title: string;
    img: string;
    subtitle: string;
    problemtype: boolean;
    answer: any | any[];
    category: string;
}
interface Problems {
    pid: string;
    title: string;
    img: string;
}
interface Answers {
    Sortanswer?: string;
    answers?: string[5];
}
interface Workbook {
    title: string;
    problems: Problems[];
    answers: Answers[];
    category: string;
}
function Make() {
    const Makeproblem = async ({ title, subtitle, img, answer, problemtype, category }: Problem) => {
        // alert(category);
        await getClient().post('/problem', { title: title, sub_title: subtitle, image: img, answer: answer, type: problemtype, category: category }).then(res => {
            console.log(res);
            return res.data;
        }).catch(err => {
            throw parseError(err);
        })
    }
    const MakeWorkbook = async ({ title, problems, answers, category }: Workbook) => {
        await getClient().post('/problem', {}).then(res => {
            console.log(res);
            return res.data;
        }).catch(err => {
            throw parseError(err);
        })
    }
    return { Makeproblem, MakeWorkbook };
}

export default Make;