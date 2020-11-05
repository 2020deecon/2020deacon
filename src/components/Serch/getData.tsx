import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Item from '../views/viewproblem';
import Get from '../../lib/api/get';

interface Drage {
    pid: string;
    title: string;
    img: string;
}

interface GetProps {
    User?: boolean;
    update: ({ pid, title, img }: Drage) => void;
    delupdate: (pid: string) => void;
}
let key = 0;
function SearchData({ User, update, delupdate }: GetProps) {

    //내꺼 인지 전체 인지 검사
    // const [on,off]

    // Itmes();

    const [test, seTest] = useState<any[]>([]);
    // async function test() {
    useEffect(() => {
        Get().GetallProblems().then(res => {
            // console.log(res);
            seTest(res);
        }).catch(err => console.log(err))
    }, [])
    // const [Checkeded, setchecked] = useState(false);
    // console.log(test);

    return (
        <Wrap>
            {
                test.map(
                    (data) =>
                        <SerachItem key={key++}
                            onChange={(e) => {
                                e.target.checked ? update({ pid: data._id, title: data.title, img: data.image }) : delupdate(String(data.id))
                            }
                            }
                            title={data.title} img={data.image} />
                )
            }
        </Wrap>
    );
}

interface SerachProps {
    title: string;
    img: string;
    // Checked: boolean;
    onChange: (e: any) => void;
}
function SerachItem({ title, img, onChange }: SerachProps) {
    return (
        <IWrap>
            <Item title={title} src={img} estext />
            <input type="checkbox" onClick={(e) => onChange(e)} />
        </IWrap>
    )
};
const Wrap = styled.div`
display: flex;
flex-direction: column;
padding-top:30px;
max-width:250px;
width:100%;
max-height:400px;
overflow-y:scroll;
overflow-x:hidden;

`;
const IWrap = styled.label`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &>input{
        
        display:none;
    }
    &:hover{
        &>input{
            display:block;
            position: absolute;
        top: 0;
        left: 20%;
        }
    }
`;

export default SearchData;