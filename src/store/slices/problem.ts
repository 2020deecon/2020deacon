import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Get from "../../lib/api/get";
interface problem {
    subject?: string;
    title?: string;
    img?: string;
    answer?: string;
}

const initialState = {
    Problems: []
}
const Problem = createSlice({
    name: "Problem",
    initialState,
    reducers: {
        getData(state, action) {
            Get().GetallProblems();
        }
    }
});

export default Problem;