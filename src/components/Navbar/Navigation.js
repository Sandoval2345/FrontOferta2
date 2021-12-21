
import styled from 'styled-components';
import {NavLink as Link} from 'react-router-dom';
import {FaBars} from 'react-icons/fa'; /*iconos de reaccion*/


/*definicion de variables utilizada en indexNav (por eso uso export)*/ 
export const Nav = styled.nav`
    background: #23415B;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem ;
    z-index: 10;
`

export const NavLink = styled(Link)`
    color: #FFF;
    display: flex;
    align-text: center;
    text-decoration: none;
    padding: 1rem;
    height:100%;
    cursor: pointer;

    /* color al pasar el cursor por encima de las palabras del menu */
    &.active{ 
        color: #15cdfc;
    }
`

export const Bars = styled(FaBars)`
    display: none;
    color: $fff;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pinter;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -450px;
    
    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin_right: 24px;

    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 25px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606
    }
`