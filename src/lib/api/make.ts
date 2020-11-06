import getClient from "./client";
import parseError from "./parseError";

interface Problem {
    title: string;
    img: string;
    subtitle: string;
    problemtype: boolean;
    answer: any;
    category: string;
    view?: any[];
}
interface Workbook {
    title: string;
    category: string;
    problems: any[];
}
interface Community {
    title: string;
    image: string;
    text: string;
    type: string;
}
interface Comment {
    id: string;
    text: string;
}
function Make() {
    const Makeproblem = async ({ title, subtitle, img, answer, problemtype, category, view }: Problem) => {
        // alert(category);
        await getClient().post('/problem', { title: title, sub_title: subtitle, image: img, answer: answer, type: problemtype, category: category, view: view }).then(res => {
            console.log(res);
            return res.data;
        }).catch(err => {
            throw parseError(err);
        })
    }
    const MakeWorkbook = async ({ title, problems, category }: Workbook) => {
        await getClient().post('/workbookProblem', { title: title, problem_id: problems, category: category }).then(res => {
            console.log(res);
            return res.data;
        }).catch(err => {
            throw parseError(err);
        })
    }

    const MakeCommunity = async ({ title, image, text, type }: Community) => {
        console.log(title, image, text, type);
        await getClient().post('/makePost', { title: title, image: image, text: text, type: type }).then(res => {
            console.log(res);
            return res.data;
        }).catch(err => {
            throw parseError(err);
        })
    }
    const MakeCommented = async ({ id, text }: Comment) => {
        await getClient().post('/makeComment', { project_id: id, comment: text }).then(res => {
            console.log(res);
            return res.data;
        }).catch(err => {
            throw parseError(err);
        })
    }

    return { Makeproblem, MakeWorkbook, MakeCommunity, MakeCommented };
}

export default Make;