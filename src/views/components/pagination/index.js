import './style.scss'
import {useState} from "react";

export const Pagination = ({arr}) => {
    return (
        <div className={'page-btns'}>
            <button className={'prev-next'}>Prev</button>
            {arr.map((elem, index) => {
                return (
                    <button key={index} className={'number'}>{elem}</button>
                )
            })}
            <button className={'prev-next'}>Next</button>
        </div>
    )
}