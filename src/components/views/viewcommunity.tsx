import React from 'react';
import styled, { css } from "styled-components";
import color from "../../constants/colors";
type sizeType = "small" | "medium" | "large";
type WrittenType = "debate" | "question";

interface communityProps {
    title: string;
    contents: string;
    Written?: WrittenType;
    src?: string;
    size?: sizeType;
    writer?: string;
    CommentItem?: any[];
}
function viewcommunity({ title, src, size = "small", contents, Written = "debate", CommentItem }: communityProps) {
    return (
        <Wrap size={size} Written={Written}>
            <div>
                <Title className={size === "small" ? "textsmall" : ""} size={size}>{title}</Title>
                <Img className={size === "small" ? "delect" : ""} src={src || "https://via.placeholder.com/500x250.png/e5c7ff/ffffff/?text=grap Img"} size={size} />
                <Contents className={size === "small" ? "textsmall" : ""} size={size}>{contents}</Contents>
                <Comments className={size === "small" ? "delect" : ""} size={size}>
                    <div style={{
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}>댓글</div>
                    <div className="contents">
                        {CommentItem?.map(data => <CommentItems writer={data.writer} contents={data.comment} />)}

                        {/* <CommentItems writer="writer" contents="ㅋㅋㅋㅋ 그렇게 하는거 아닌데" />
                        <CommentItems writer="writer" contents="ㅋㅋㅋㅋ 그렇게 하는거 아닌데" />
                        <CommentItems writer="writer" contents="ㅋㅋㅋㅋ 그렇게 하는거 아닌데" />
                        <CommentItems writer="writer" contents="ㅋㅋㅋㅋ 그렇게 하는거 아닌데" />
                        <CommentItems writer="writer" contents="ㅋㅋㅋㅋ 그렇게 하는거 아닌데" />
                        <CommentItems writer="writer" contents="ㅋㅋㅋㅋ 그렇게 하는거 아닌데" />
                        <CommentItems writer="writer" contents="ㅋㅋㅋㅋ 그렇게 하는거 아닌데" /> */}
                    </div>
                </Comments>
            </div>
        </Wrap>
    );
}
interface CommentItemType {
    writer: string;
    contents: string;
};

function CommentItems({ writer, contents }: CommentItemType) {
    return (
        <CommentItem>
            <div className="writer">{writer}</div>
            <div className="contents">{contents}</div>
        </CommentItem>
    )
}
const Wrap = styled.div<{ size: sizeType, Written: WrittenType }>`
display: flex;
align-items: center;
justify-content:center;
padding:1% 0px;
height: 100%;
width: 100%;
    &>div {
    ${({ size, Written }) => size === "small" && css`padding: 0px 40px;
    color: ${color.white};
    max-height:50px;
    display: flex;
    align-items: center;
    border-radius:20px;

    ${Written === "debate" ? css`
                background: ${color.gray};
            ` : css`
                background: ${color.primary};
    `}
    `}
    ${({ size }) => size !== "small" && css`
    display:flex;
    flex-direction: column;
    align-items: center;
    `}
        height: 100%;  
        width: 100%;
        max-width:80%;
        &>.textsmall{
            overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        }

    }
`;

const Img = styled.img<{ size: sizeType }>`
    ${({ size }) => size === "small" && css`
    display:none;
    `}
    width:100%;
    height:100%;
    max-width:500px;
    max-height:250px;
    margin-top:10px;
`;

const Title = styled.div<{ size: sizeType }>`
font-size:30px;
font-weight: 600;
width:100%;
text-align:center;

${({ size }) => size === "small" && css`
max-width:300px;
margin-right:20px;
    `}

`;

const Contents = styled.div<{ size: sizeType }>`
max-width:250px;
${({ size }) => size !== "small" && css`
    margin-top:30px;
    max-width:500px;
    width:100%;
    display:flex;
    flex-flow:row wrap;
    justify-content: center;
`}

`;

const Comments = styled.div<{ size: sizeType }>`
        ${({ size }) => size === "small" && css`
            display:none;
`       }
margin-top:20px;
        width: 100%;
    &>.contents{
        border-top: 1px solid ${color.black};
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
    }
`;

const CommentItem = styled.div`
    display:flex;
    flex-direction: column;
    &>.writer{
        font-weight:400px;
        font-size:16px;
        margin-bottom:1px;
    }
    &>.contents{
        border-radius:20px;
        background:${color.gray};
        padding:8px 10px;
    }
    
    /* &::before {
        
        position: absolute;
        left:0;
        top:0;
        font-weight:bold;
        background:white;
    } */
`;
export default viewcommunity;