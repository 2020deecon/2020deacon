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
    update: ({ pid, title, img }: Drage) => void;
    delupdate: (pid: string) => void;
    category: string;
    nowids: string[];
    search: string;
}
let key = 0;
function SearchData({ update, delupdate, category, nowids, search }: GetProps) {
    const [test, seTest] = useState<any[]>([]);
    useEffect(() => {
        Get().GetallProblems().then(res => {
            // seTest(res.map((data: any) => { return { ...data, Checkeded: false } }))
            seTest(res);
        }).catch(err => console.log(err))
    }, []);
    // alert("fdas");
    // console.log(search);
    return (
        <Wrap>
            {
                test.map(
                    (data) => {
                        // && data.title.indexof(search) !== -1
                        return data.category === category && data.title.includes(search) ?
                            <SerachItem key={key++}
                                onClick={(e) =>
                                    e.target.checked ? update({ pid: data._id, title: data.title, img: data.image })
                                        : delupdate(String(data.id))
                                }
                                Checkeded={nowids.indexOf(data._id) !== -1}
                                title={data.title} img={data.image} />
                            : ""
                    }
                )
            }
        </Wrap>
    );
}

interface SerachProps {
    title: string;
    img: string;
    Checkeded: boolean;
    onClick: (e: any) => void;
}
function SerachItem({ title, img, onClick, Checkeded }: SerachProps) {
    console.log(Checkeded);

    return (
        <IWrap>
            <Item title={title} src={img} estext />
            <input type="checkbox" onClick={(e) => onClick(e)}
                checked={Checkeded}
            />
        </IWrap>
    )
};
const Wrap = styled.div`
display: flex;
flex-direction: column;
padding-top:30px;
max-width:250px;
width:100%;
height:100%;
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